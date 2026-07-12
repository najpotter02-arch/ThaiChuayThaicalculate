import prisma from "../lib/prisma.js";
import { calculateExpense } from "../services/expense.service.js";

export async function createExpense(req, res) {
  try {

    const { amount } = req.body;


    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "กรุณาระบุจำนวนเงิน",
      });
    }



    const price = Number(amount);



    const { governmentAmount, userAmount } =
      calculateExpense(price);




    const userId = req.user.userId;



    // วันปัจจุบัน
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);



    // ต้นเดือน
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );



    // ยอดรัฐช่วยวันนี้
    const todayUsage =
      await prisma.usage.aggregate({

        _sum:{
          governmentAmount:true
        },

        where:{
          userId,

          createdAt:{
            gte:startOfDay
          }
        }

      });



    const todayUsed =
      todayUsage._sum.governmentAmount || 0;



    // ยอดรัฐช่วยเดือนนี้
    const monthUsage =
      await prisma.usage.aggregate({

        _sum:{
          governmentAmount:true
        },

        where:{
          userId,

          createdAt:{
            gte:startOfMonth
          }
        }

      });



    const monthUsed =
      monthUsage._sum.governmentAmount || 0;




    // เช็คเกินวงเงิน
    if(todayUsed + governmentAmount > 200){

      return res.status(400).json({
        message:
        "เกินวงเงินช่วยเหลือวันนี้ (200 บาท)"
      });

    }



    if(monthUsed + governmentAmount > 1000){

      return res.status(400).json({
        message:
        "เกินวงเงินช่วยเหลือเดือนนี้ (1000 บาท)"
      });

    }




    // ผ่านแล้วค่อยบันทึก

    const usage =
      await prisma.usage.create({

        data:{

          price,

          governmentAmount,

          userAmount,

          userId

        }

      });



    return res.status(201).json({

      message:"เพิ่มรายการสำเร็จ",

      usage

    });



  } catch(err) {


    console.error(err);


    return res.status(500).json({

      message:err.message

    });

  }
}

export async function getUsages(req, res) {
  try {
    const usages = await prisma.usage.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(usages);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getSummary(req, res) {
  try {
    const userId = req.user.userId;

    // ===== วันนี้ =====
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ===== วันแรกของเดือน =====
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    // ดึงรายการทั้งหมดตั้งแต่ต้นเดือน
    const usages = await prisma.usage.findMany({
      where: {
        userId,
        createdAt: {
          gte: monthStart,
        },
      },
    });

    let todayUsed = 0;
    let monthUsed = 0;

    usages.forEach((usage) => {
  monthUsed += usage.governmentAmount || 0;

  if (usage.createdAt >= today) {
    todayUsed += usage.governmentAmount || 0;
  }
});

    const DAILY_LIMIT = 200;
    const MONTHLY_LIMIT = 1000;

    res.json({
      todayUsed,
      todayRemain: Math.max(0, DAILY_LIMIT - todayUsed),

      monthUsed,
      monthRemain: Math.max(0, MONTHLY_LIMIT - monthUsed),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}