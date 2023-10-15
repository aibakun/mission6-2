// データをクッキーに保存
function saveRecord() {
  const date = document.getElementById("date").value;
  const bodyPart = document.getElementById("body-part").value;
  const exercise = document.getElementById("exercise").value;
  const details = document.getElementById("details").value;

  // データをオブジェクトとして保存
  const recordData = {
    date: date,
    bodyPart: bodyPart,
    exercise: exercise,
    details: details,
  };

  // データをJSON文字列に変換
  const recordDataStr = JSON.stringify(recordData);

  // クッキーにデータを保存
  const recordKey = "record_" + Date.now();
  document.cookie = recordKey + "=" + recordDataStr;

  // フォームをクリア
  document.getElementById("record-form").reset();

  // 保存後、データを再表示
  displayRecords();
}

// 保存した筋トレデータを表示する関数
function displayRecords() {
  const recordTable = document.getElementById("record-table");
  // 既存の行を削除
  while (recordTable.rows.length > 1) {
    recordTable.deleteRow(1);
  }

  // クッキーからデータを読み取り
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const cookieParts = cookie.split("=");
    if (cookieParts.length === 2) {
      const key = cookieParts[0].trim();
      if (key.startsWith("record_")) {
        const recordDataStr = cookieParts[1];
        const recordData = JSON.parse(recordDataStr);
        const row = recordTable.insertRow(-1);
        row.insertCell(0).textContent = recordData.date;
        row.insertCell(1).textContent = recordData.bodyPart;
        row.insertCell(2).textContent = recordData.exercise;
        row.insertCell(3).textContent = recordData.details;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.onclick = function () {
          // クッキーからデータを削除
          document.cookie =
            key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          displayRecords();
        };
        row.insertCell(4).appendChild(deleteButton);
      }
    }
  }
}
// 初回表示
displayRecords();
