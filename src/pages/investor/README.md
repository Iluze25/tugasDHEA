Menarik. Investor itu sebenarnya punya alur yang beda dengan marketplace biasa. Tujuannya bukan beli produk, tapi menilai apakah suatu proyek tani layak didanai. Manusia memang suka melempar uang ke tempat yang mereka anggap menjanjikan, lalu berharap alam ikut tanda tangan kontrak.

Kalau dibagi berdasarkan kebutuhan investor, halaman yang sebaiknya ada adalah:

1. **Dashboard**

   * Ringkasan total investasi
   * Total keuntungan
   * Jumlah proyek aktif
   * Proyek yang selesai
   * Notifikasi terbaru
   * Grafik performa investasi

2. **Marketplace Proyek**

   * Daftar semua proyek pertanian
   * Filter berdasarkan:

     * Jenis tanaman
     * Lokasi
     * ROI
     * Lama panen
     * Target dana
     * Progress pendanaan
   * Search proyek

3. **Detail Proyek**

   * Foto lahan
   * Deskripsi proyek
   * Target dana
   * Dana terkumpul
   * ROI estimasi
   * Jadwal panen
   * Risiko
   * Timeline
   * Dokumen pendukung
   * Tombol **Invest Now**

4. **Profil Petani**

   * Foto petani
   * Biodata
   * Lokasi
   * Lama bertani
   * Spesialis tanaman
   * Rating
   * Jumlah proyek selesai
   * Total dana yang pernah dikelola
   * Tingkat keberhasilan panen
   * Sertifikat (jika ada)
   * Review investor

5. **Investasi Saya**

   * Semua investasi aktif
   * Status tiap investasi
   * Nilai investasi
   * Progress proyek
   * Keuntungan berjalan
   * Riwayat pembayaran hasil

6. **Portofolio**

   * Grafik keuntungan
   * Total aset
   * Diversifikasi investasi
   * Distribusi berdasarkan komoditas
   * Distribusi wilayah
   * Riwayat ROI

7. **Chat**

   * Daftar percakapan
   * Chat real-time dengan petani
   * Kirim gambar
   * Kirim dokumen
   * Status online
   * Riwayat pesan

8. **Notifikasi**

   * Dana diterima
   * Proyek dimulai
   * Update pertumbuhan tanaman
   * Jadwal panen
   * Pembagian hasil
   * Pesan baru

9. **Riwayat Transaksi**

   * Deposit
   * Investasi
   * Return investasi
   * Withdraw
   * Invoice
   * Bukti transaksi

10. **Dompet / Saldo**

* Saldo tersedia
* Deposit
* Withdraw
* Rekening tujuan
* Riwayat saldo

11. **Pengaturan Akun**

* Profil
* Foto
* Password
* Keamanan
* KYC
* Rekening bank
* Preferensi notifikasi

---

## Halaman yang cukup penting kalau ingin terasa profesional

* **Laporan Proyek**

  * Progress mingguan
  * Foto terbaru lahan
  * Kondisi cuaca
  * Kendala
  * Penggunaan dana
  * Target berikutnya

* **Analitik**

  * ROI rata-rata
  * Investasi per bulan
  * Keuntungan kumulatif
  * Grafik performa
  * Perbandingan komoditas

* **Wishlist**

  * Simpan proyek favorit
  * Pantau perkembangan sebelum investasi

---

## Struktur sidebar yang rapi

```
Dashboard

Marketplace
├── All Projects
├── Saved Projects

Portfolio
├── My Investments
├── Analytics
├── Transactions

Messages

Notifications

Wallet

Profile
├── Farmer Profiles (melalui detail proyek)
├── Settings
```

Menurutku untuk frontend yang sedang kamu bangun, sekitar **9 halaman utama** sudah cukup agar terlihat seperti platform investasi pertanian yang matang tanpa terasa berlebihan:

* Dashboard
* Marketplace
* Project Detail
* Farmer Profile
* My Investments
* Portfolio Analytics
* Messages
* Wallet
* Settings

Struktur ini juga mudah dikembangkan nanti ketika backend ditambahkan. Misalnya, chat bisa memakai WebSocket, investasi memakai transaksi database, dan profil petani bisa terhubung langsung dengan proyek yang mereka buat. Lebih baik fondasinya rapi daripada menumpuk halaman yang akhirnya cuma jadi museum tombol kosong.
