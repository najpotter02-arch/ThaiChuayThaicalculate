import { register } from "./api.js";

const form = document.getElementById("registerForm");

if (!form) {
  console.error("ไม่พบ registerForm");
}

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await register({
      name,
      email,
      password
    });

    await Swal.fire({
      icon: "success",
      title: "สมัครสมาชิกสำเร็จ",
      text: "กำลังไปหน้าเข้าสู่ระบบ",
      timer: 1500,
      showConfirmButton: false
    });

    window.location.href = "login.html";

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "สมัครสมาชิกไม่สำเร็จ",
      text: error.message || "กรุณาลองใหม่อีกครั้ง",
      confirmButtonText: "ตกลง"
    });

  }
});