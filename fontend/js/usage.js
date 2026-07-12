import { createUsage } from "./api.js";


export function setupSaveButton(price){

    const btn = document.getElementById("saveBtn");

    if(!btn) return;


    const token = localStorage.getItem("token");


    // ยังไม่ได้ login
    if(!token){
        btn.style.display="none";
        return;
    }


    btn.addEventListener("click", async()=>{


        const result = await createUsage(price);


        if(result.message){

            alert("บันทึกข้อมูลสำเร็จ");

        }else{

            alert(result.error || "เกิดข้อผิดพลาด");

        }


    });

}