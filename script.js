// URL Webhook dari n8n
const WEBHOOK_DAFTAR = 'https://n8n-re9macilutpq.kol.sumopod.my.id/webhook-test/Daftar_Anggota';
const WEBHOOK_BAYAR = 'https://n8n-re9macilutpq.kol.sumopod.my.id/webhook-test/bayar-kas';

// Handle Pendaftaran
document.getElementById('formDaftar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nama: document.getElementById('namaDaftar').value,
        email: document.getElementById('emailDaftar').value,
        tipe: 'pendaftaran'
    };
    sendData(WEBHOOK_DAFTAR, data);
});

// Handle Pembayaran
document.getElementById('formBayar').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mengambil elemen tombol dan status untuk feedback visual
    const btn = e.target.querySelector('button');
    const statusMessage = document.getElementById('statusMessage');
    
    const data = {
        nama_bayar: document.getElementById('namaBayar').value,
        email_bayar: document.getElementById('emailBayar').value,
        nominal: document.getElementById('nominal').value,
        tipe: 'pembayaran',
        tanggal_klik: new Date().toISOString() // Tambahan info waktu dari sisi klien
    };

    // Memberi tahu user bahwa proses sedang berjalan
    btn.disabled = true;
    btn.innerText = "Memproses Pembayaran...";
    statusMessage.innerText = "Sedang memvalidasi kas...";

    try {
        // Menggunakan fungsi sendData yang sudah ada
        await sendData(WEBHOOK_BAYAR, data);
        
        // Jika sukses
        statusMessage.innerHTML = `<span style="color: green;">✔️ Sukses! Kas Rp ${data.nominal} telah tercatat. Cek email untuk kwitansi.</span>`;
        e.target.reset(); // Kosongkan form setelah berhasil
    } catch (err) {
        // Jika gagal (misal nominal salah atau server down)
        statusMessage.innerHTML = `<span style="color: red;">❌ Gagal: ${err.message || 'Terjadi kesalahan sistem.'}</span>`;
    } finally {
        btn.disabled = false;
        btn.innerText = "Kirim Bukti Bayar";
    }
});
async function sendData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // Jika n8n mengirim status error (misal 400 atau 500)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengirim data");
    }

    return await response.json();
}