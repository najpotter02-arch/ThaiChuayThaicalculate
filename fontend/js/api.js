const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://thaichuaythaicalculate.onrender.com";

// export async function register(data) {
//   return fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(res => res.json());
// }

export async function login(data) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export async function getMe(token) {
  return fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}

export async function getSummary() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/usage/summary`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await res.json();
}

export async function getUsages() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/usage`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await res.json();
}
export async function register(data) {

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function createUsage(price) {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/usage`, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      amount:price
    })
  });


  return await res.json();
}