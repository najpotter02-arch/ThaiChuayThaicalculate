import { getUsages, getSummary } from "./api.js";

let todayChart = null;

async function loadToday() {
  try {
    // โหลดข้อมูลพร้อมกัน
    const [usages, summary] = await Promise.all([
      getUsages(),
      getSummary(),
    ]);

    // ==========================
    // วันที่
    // ==========================
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayDate = document.getElementById("todayDate");
    if (todayDate) {
      todayDate.textContent = new Date().toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // ==========================
    // Summary
    // ==========================
    const used = Number(summary.todayUsed);
    const remain = Number(summary.todayRemain);

    const percent = Math.min((used / 200) * 100, 100);

    document.getElementById("todayUsed").textContent =
      `${used.toFixed(2)} บาท`;

    document.getElementById("todayRemain").textContent =
      `${remain.toFixed(2)} บาท`;

    document.getElementById("percentUsed").textContent =
      `${percent.toFixed(0)}%`;

    const percentText =
      document.getElementById("todayPercentText");

    if (percentText) {
      percentText.textContent =
        `${percent.toFixed(0)}%`;
    }

    document.getElementById("progressBar").style.width =
      `${percent}%`;

    // ==========================
    // กรองเฉพาะวันนี้
    // ==========================
    const todayUsages = usages.filter((u) => {
      const d = new Date(u.createdAt);
      return d >= today;
    });

    // ==========================
    // กราฟ
    // ==========================

    const labels = todayUsages.map((u) =>
      new Date(u.createdAt).toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    const data = todayUsages.map(
      (u) => u.governmentAmount
    );

    if (todayChart) {
      todayChart.destroy();
    }

    todayChart = new Chart(
      document.getElementById("todayChart"),
      {
        type: "line",

        data: {
          labels,

          datasets: [
            {
              label: "รัฐช่วย (บาท)",

              data,

              borderWidth: 3,

              fill: true,

              tension: 0.35,

              pointRadius: 5,

              pointHoverRadius: 7,
            },
          ],
        },

        options: {
          responsive: true,

          plugins: {
            legend: {
              display: false,
            },
          },

          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      }
    );

    // ==========================
    // รายการ
    // ==========================

    const list =
      document.getElementById("todayList");

    if (todayUsages.length === 0) {
      list.innerHTML = `
        <div class="empty">
          ยังไม่มีรายการวันนี้
        </div>
      `;
    } else {
      list.innerHTML = todayUsages
        .map(
          (u) => `
        <div class="history-item">

            <div class="history-left">

                <h3>
                    🛒 รายการ
                </h3>

                <p>
                    ${new Date(
                      u.createdAt
                    ).toLocaleTimeString("th-TH")}
                </p>

            </div>

            <div class="history-right">

                <h3>
                    ${u.price.toFixed(2)} บาท
                </h3>

                <p>
                    รัฐช่วย ${u.governmentAmount.toFixed(2)} บาท
                </p>

                <p>
                    คุณจ่าย ${u.userAmount.toFixed(2)} บาท
                </p>

            </div>

        </div>
      `
        )
        .join("");
    }
  } catch (err) {
    console.error(err);
  }
}

// โหลดครั้งแรก
loadToday();

// ปุ่มรีเฟรช
const refreshBtn =
  document.getElementById("refreshBtn");

if (refreshBtn) {
  refreshBtn.addEventListener("click", loadToday);
}