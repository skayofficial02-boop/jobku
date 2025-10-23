const SPREADSHEET_ID = 'GANTI_DENGAN_ID_SHEET_ANDA'; // <--- PENTING! Ganti ID ini

function doGet() {
  // Menyajikan file index.html ke pengguna (ini akan menjadi web app Anda)
  return HtmlService.createTemplateFromFile('index').evaluate();
}

// --- FUNGSI AKSES DATA ---

function addOrder(orderValue) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("ORDERS");

  const newRow = [
    new Date().getTime(), // ID
    orderValue,           // ORDER_VALUE
    new Date()            // DATE_RECEIVED
  ];
  sheet.appendRow(newRow);
  return "Order berhasil ditambahkan!";
}

function addJob(jobData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("JOBS");

  const newRow = [
    new Date().getTime(),      // ID
    jobData.name,
    jobData.assigneeId,
    jobData.deadline,
    jobData.reward,
    'pending',                 // STATUS
    new Date(),                // DATE_ASSIGNED
    ''                         // DATE_COMPLETED
  ];
  sheet.appendRow(newRow);
  return "Job berhasil diberikan!";
  // Anda bisa menambahkan kode untuk kirim notifikasi email di sini
}

function completeJob(jobId) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("JOBS");
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // Mulai dari baris 1 (setelah header)
    if (data[i][0] == jobId) { // ID ada di kolom 0
      sheet.getRange(i + 1, 6).setValue('completed'); // Set STATUS ke 'completed' (kolom F)
      sheet.getRange(i + 1, 8).setValue(new Date());  // Set DATE_COMPLETED (kolom H)
      return "Job berhasil diselesaikan!";
    }
  }
  return "Job tidak ditemukan.";
}

// --- FUNGSI MENDAPATKAN DATA ---
// Fungsi ini akan dipanggil oleh JavaScript di frontend untuk mendapatkan data yang sudah tersimpan
function getDashboardData(userId) {
    // (Di sini harusnya ada logika lengkap untuk membaca data dari sheets: JOBS, ORDERS, USERS)
    // Karena kodenya sangat panjang, saya abaikan di sini. Cukup fokus pada integrasi data tulis dulu.
    return { 
        jobs: [], // Ganti dengan data dari sheet JOBS
        orders: [] // Ganti dengan data dari sheet ORDERS
    };
}
