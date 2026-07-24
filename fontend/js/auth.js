const authLink = document.getElementById("authLink");

if (authLink) {

    const token = localStorage.getItem("token");

    // ===== ยังไม่ได้ Login =====
    if (!token) {

        authLink.textContent = "🔑 Login";
        authLink.href = "login.html";

    }

    // ===== Login แล้ว =====
    else {

        authLink.textContent = "🚪 Logout";
        authLink.href = "#";

        authLink.addEventListener("click", async (e) => {

            e.preventDefault();

            const result = await Swal.fire({

                title: "ออกจากระบบ",

                text: "คุณต้องการออกจากระบบหรือไม่?",

                icon: "question",

                showCancelButton: true,

                confirmButtonText: "ออกจากระบบ",

                cancelButtonText: "ยกเลิก",

                reverseButtons: true,

                confirmButtonColor: "#2563eb",

                cancelButtonColor: "#6b7280"

            });

            if (!result.isConfirmed) return;

            localStorage.removeItem("token");

            await Swal.fire({

                icon: "success",

                title: "ออกจากระบบสำเร็จ",

                timer: 1200,

                showConfirmButton: false

            });

            window.location.href = "index.html";

        });

    }

}