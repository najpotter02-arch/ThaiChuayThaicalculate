import { register } from "./api.js";


const form = document.getElementById("registerForm");


if (!form) {
  console.error("ไม่พบ registerForm");
}



form.addEventListener("submit", async (event) => {

  event.preventDefault();


  const name =
    document.getElementById("name").value;


  const email =
    document.getElementById("email").value;


  const password =
    document.getElementById("password").value;



  try {


    const res = await register({

      name,
      email,
      password

    });



    console.log(res);



    alert("สมัครสมาชิกสำเร็จ");


    window.location.href = "login.html";



  } catch (error) {


    console.error(error);


    alert(
      error.message ||
      "สมัครสมาชิกไม่สำเร็จ"
    );


  }


});