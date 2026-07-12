import { getSummary } from "./api.js";

export async function loadDashboard() {
  try {
    const summary = await getSummary();

    document.getElementById("todayUsed").textContent =
      `${Number(summary.todayUsed).toFixed(2)} / 200 บาท`;

    document.getElementById("monthUsed").textContent =
      `${Number(summary.monthUsed).toFixed(2)} / 1000 บาท`;

  } catch (err) {
    console.error(err);
  }
}

loadDashboard();