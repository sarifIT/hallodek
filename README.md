🤖 KoperAI: Sistem Koperasi Pintar Otomatis
KoperAI adalah solusi manajemen koperasi berbasis no-code (n8n) yang mengintegrasikan pendaftaran anggota, validasi pembayaran kas, dan pengingat tagihan cerdas menggunakan logika AI/Randomized Code.

🚀 Fitur Utama
Pendaftaran Anggota Real-time: Integrasi form website ke Google Sheets dengan email sambutan otomatis.

Validasi Kas & Kwitansi Digital: Memastikan pembayaran tepat Rp 10.000, mencatat histori transaksi, dan mengirim kwitansi HTML profesional.

Smart Reminder (AI-Driven): Pengingat otomatis setiap Senin pagi dengan pesan yang bervariasi (tidak membosankan) untuk meningkatkan kolektibilitas kas.

🛠️ Arsitektur Sistem
Proyek ini terdiri dari 3 alur kerja (workflows) utama di n8n:

1. Workflow Pendaftaran
Trigger: Webhook (POST)

Database: Google Sheets (Tab: Daftar_Anggota)

Output: Gmail (Welcome Email)

2. Workflow Pembayaran
Trigger: Webhook (POST) dari Form Bayar

Validation: If Node (Nominal == 10000)

Database: Google Sheets (Tab: Data_Kas)

Output: Gmail (Digital Receipt) & Respond to Webhook (Status 200/400)

3. Workflow Pengingat (Smart Reminder)
Trigger: Schedule Trigger (Setiap Senin 08:00)

Process: JavaScript Randomizer / AI Text Generator

Output: Blast Email ke seluruh anggota yang belum lunas.

📋 Prasyarat
n8n (Self-hosted atau Cloud)

Google Sheets API (Sebagai database)

Gmail API / SMTP (Sebagai pengirim email)

Web Hosting/Local Server (Untuk front-end HTML/JS)

⚙️ Instalasi & Konfigurasi
1. Persiapan Google Sheets
Buat file Google Sheets dengan dua tab utama:

Daftar_Anggota: Kolom [Nama, Email, Tanggal_Daftar, Status]

Data_Kas: Kolom [Tanggal, Nama, Email, Nominal, ID_Transaksi]

2. Import Workflow n8n
Buka n8n.

Import file .json workflow (Pendaftaran, Pembayaran, Pengingat).

Hubungkan kredensial Google Sheets dan Gmail Anda.

3. Konfigurasi Website
Update file script.js dengan URL Webhook dari n8n:

JavaScript
const WEBHOOK_DAFTAR = "URL_WEBHOOK_PENDAFTARAN_ANDA";
const WEBHOOK_BAYAR = "URL_WEBHOOK_PEMBAYARAN_ANDA";
📄 Struktur Pesan AI/Code
Sistem menggunakan logika pengacak untuk memastikan email pengingat memiliki 64+ kombinasi pesan berbeda, mencakup:

Sapaan hangat yang personal.

Kutipan motivasi tentang gotong royong.

ID Transaksi unik untuk setiap kwitansi.

🤝 Kontribusi
Jika ingin mengembangkan fitur baru seperti Laporan Bulanan Otomatis atau Integrasi WhatsApp, silakan ajukan pull request atau buka issue.

KoperAI - Membangun Ekonomi Bersama dengan Teknologi.
