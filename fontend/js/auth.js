const authLink = document.getElementById("authLink");
const token = localStorage.getItem("token");

if (token) {
  authLink.textContent = "Logout";
  authLink.href = "#";

  authLink.onclick = (e) => {
    e.preventDefault();

    if (confirm("ต้องการออกจากระบบใช่หรือไม่?")) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };
} else {
  authLink.textContent = "Login";
  authLink.href = "login.html";
}