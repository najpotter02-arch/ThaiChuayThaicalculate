import {
    getUsages,
    getSummary
} from "./api.js";



async function loadMonth(){


    try{


        const [
            usages,
            summary
        ] = await Promise.all([

            getUsages(),

            getSummary()

        ]);



        console.log("USAGES:", usages);

        console.log("SUMMARY:", summary);





        const now = new Date();






        // =====================
        // Summary
        // =====================


        const monthUsed =
        Number(summary.monthUsed ?? 0);



        const limit = 1000;



        const remain =
        Math.max(
            limit - monthUsed,
            0
        );



        const percent =
        Math.min(
            (monthUsed / limit) * 100,
            100
        );







        document
        .getElementById("monthUsed")
        .textContent =
        `${monthUsed.toFixed(2)} บาท`;





        document
        .getElementById("monthRemain")
        .textContent =
        `${remain.toFixed(2)} บาท`;





        document
        .getElementById("percentUsed")
        .textContent =
        `${percent.toFixed(0)}%`;







        const progress =
        document.getElementById(
            "progressBar"
        );



        progress.style.width =
        `${percent}%`;






        document
        .getElementById("monthDate")
        .textContent =
        now.toLocaleDateString(
            "th-TH",
            {

                month:"long",

                year:"numeric"

            }
        );








        // =====================
        // Filter เดือน
        // =====================


        const monthUsages =
        usages.filter(u=>{


            const date =
            new Date(u.createdAt);



            return (

                date.getMonth()
                === now.getMonth()

                &&


                date.getFullYear()
                === now.getFullYear()

            );


        });








        // =====================
        // History
        // =====================


        const list =
        document.getElementById(
            "monthList"
        );




        if(monthUsages.length === 0){


            list.innerHTML = `


            <div class="empty-state">

                ยังไม่มีการใช้สิทธิเดือนนี้

            </div>


            `;


            return;

        }







        list.innerHTML =

        monthUsages.map(u=>`



        <div class="history-item">



            <div class="history-left">


                <strong>

                    🛒 รายการใช้สิทธิ

                </strong>



                <p>

                    ${
                        new Date(
                            u.createdAt
                        )
                        .toLocaleString(
                            "th-TH"
                        )
                    }

                </p>


            </div>






            <div class="history-right">


                <h3>

                    ${Number(
                        u.price
                    ).toFixed(2)}

                    บาท

                </h3>




                <p>

                    รัฐช่วย

                    ${Number(
                        u.governmentAmount
                    ).toFixed(2)}

                    บาท

                </p>





                <p>

                    คุณจ่าย

                    ${Number(
                        u.userAmount
                    ).toFixed(2)}

                    บาท

                </p>



            </div>



        </div>



        `).join("");



    }
    catch(error){


        console.error(
            "โหลดเดือนผิดพลาด:",
            error
        );


    }


}






loadMonth();







// Refresh

const refreshBtn =
document.getElementById(
    "refreshBtn"
);



if(refreshBtn){


    refreshBtn.addEventListener(
        "click",
        loadMonth
    );


}