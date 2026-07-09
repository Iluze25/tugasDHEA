Analisis mendalam mengenai file dummy data investorData.js untuk platform
Investor Dashboard Pertanian disajikan secara objektif di bawah ini. Dokumentasi
ini disusun untuk mempermudah integrasi data ke dalam komponen UI React JSX
Anda.

1. Daftar Semua Entity / Data yang Tersedia

Berikut adalah tabel ringkasan variabel yang di-export, fungsinya, serta
pemetaannya ke halaman aplikasi:

| Nama Variable Export    | Fungsi Utama Data                                                                           | Digunakan untuk Halaman                                           |
| :---------------------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------- |
| `investors`             | Menyimpan informasi profil dasar dan statistik performa investor global.                    | Profile Settings, Admin Dashboard, Header/Sidebar (Avatar & Nama) |
| `farmers`               | Menyimpan profil petani, keahlian, ulasan, rating, sertifikasi, dan reputasi.               | Farmer Profile, Project Detail (Informasi Petani)                 |
| `farmingProjects`       | Menyimpan detail proyek pertanian, target pendanaan, kemajuan, ROI, dan timeline.           | Marketplace, Project Detail, Dashboard (Rekomendasi Proyek)       |
| `investments`           | Menyimpan kepemilikan saham/investasi aktif maupun selesai milik investor.                  | My Investments, Dashboard, Project Detail (Status Investasi Anda) |
| `investmentPerformance` | Menyimpan histori bulanan pertumbuhan dana investasi untuk visualisasi tren.                | Dashboard (Grafik Tren), Portfolio Analytics (Grafik Performa)    |
| `portfolioSummary`      | Menyimpan rekap aset, total keuntungan, rata-rata ROI, dan diversifikasi kategori.          | Portfolio Analytics, Dashboard                                    |
| `portfolioDistribution` | Menyimpan data persentase distribusi investasi berdasarkan komoditas dan wilayah geografis. | Portfolio Analytics (Donut/Pie Chart)                             |
| `chats`                 | Menyimpan log percakapan antara investor dan petani lengkap dengan pesan dan lampiran.      | Chat Room / Messaging Page                                        |
| `notifications`         | Menyimpan riwayat aktivitas penting (pembayaran, panen, update lapangan, pesan baru).       | Notification Center / Dropdown Bell                               |
| `transactions`          | Menyimpan catatan transaksi finansial (deposit, penarikan, investasi, bagi hasil).          | Transaction History / Riwayat Transaksi                           |
| `wallet`                | Menyimpan saldo aktif, total dana masuk/keluar, dan detail rekening bank terikat.           | Wallet / Cash-out Page, Top-up Page                               |
| `walletHistory`         | Menyimpan catatan mutasi kas internal (arus keluar masuk uang di platform).                 | Wallet Page (Riwayat Mutasi Saldo)                                |
| `investorSettings`      | Menyimpan konfigurasi akun, preferensi privasi, dan notifikasi untuk investor.              | Settings Page                                                     |

2. Penjelasan Struktur Setiap Object

Bagian ini memaparkan spesifikasi teknis dari setiap struktur data yang ada di
dalam file dummy.

1. investors (Object dalam Array)

  - id (String): "inv-001" — Identifier unik investor. (UI: ID rujukan di
    URL/routing).
  - name (String): "Budi Santoso" — Nama lengkap investor. (UI: Tampilan profil
    & kartu).
  - email (String): "budi.santoso@email.com" — Alamat email. (UI: Formulir
    kontak & akun).
  - phone (String): "+6281234567890" — Nomor telepon. (UI: Verifikasi akun).
  - avatar (String): URL — Tautan foto profil. (UI: Image element pada
    navbar/sidebar).
  - bio (String): "Investor retail..." — Deskripsi diri. (UI: Halaman profil
    publik).
  - location (String): "Jakarta Selatan..." — Domisili. (UI: Informasi
    demografi).
  - joinDate (String/YYYY-MM-DD): "2025-05-10" — Tanggal registrasi. (UI:
    Lencana member).
  - accountStatus (String): "Active" — Status akun. (UI: Badge status
    aktif/blokir).
  - kycStatus (String): "Verified" — Status verifikasi identitas. (UI: Badge
    tanda centang verifikasi).
  - riskPreference (String): "Moderate" — Profil risiko investor. (UI:
    Rekomendasi proyek yang cocok).
  - totalInvested (Number): 150000000 — Akumulasi nilai investasi dalam Rupiah.
    (UI: Card widget).
  - totalProfit (Number): 8900000 — Akumulasi keuntungan dalam Rupiah. (UI: Card
    widget).
  - activeInvestmentCount (Number): 4 — Jumlah investasi yang sedang berjalan.
    (UI: Badge angka).
  - completedInvestmentCount (Number): 1 — Jumlah investasi yang sudah selesai.
    (UI: Informasi statistik).

2. farmers (Object dalam Array)

  - id (String): "frm-001" — Identifier unik petani. (UI: Link profil petani).
  - name (String): "Pak Joko Susilo" — Nama petani. (UI: Header profil petani).
  - avatar (String): URL — Foto petani. (UI: Thumbnail sirkular).
  - location (String): "Malang, Jawa Timur" — Wilayah operasional lahan petani.
    (UI: Teks lokasi).
  - phone (String) & email (String): Detail kontak petani. (UI: Tombol kontak
    langsung).
  - bio (String): Latar belakang dan visi bertani. (UI: Seksi "Tentang Petani").
  - farmingExperience (Number): 18 — Pengalaman bertani dalam tahun. (UI:
    Lencana kredibilitas).
  - specialization (Array of Strings): ["Padi", "Jagung"] — Komoditas keahlian.
    (UI: Tag/Chips).
  - rating (Number): 4.8 — Rating kumulatif dari investor. (UI: Komponen
    bintang).
  - completedProjects (Number): 12 — Proyek yang sukses diselesaikan. (UI:
    Counter statistik).
  - totalManagedFunds (Number): 450000000 — Total dana yang pernah dikelola.
    (UI: Informasi kredibilitas finansial).
  - successRate (Number): 95 — Persentase keberhasilan proyek. (UI: Progress bar
    keberhasilan).
  - certificates (Array of Objects): Sertifikat keahlian tani (berisi name,
    issuer, year). (UI: Galeri penghargaan).
  - reviews (Array of Objects): Komentar investor lain (berisi investorName,
    rating, comment, date). (UI: List ulasan di profil petani).

3. farmingProjects (Object dalam Array)

  - id (String): "prj-001" — ID unik proyek.
  - farmerId (String): "frm-001" — ID petani pengelola (Relasi ke farmers).
  - title (String): Nama proyek. (UI: Judul card/halaman detail).
  - category (String): Kategori makro (e.g., Pangan, Hortikultura). (UI: Badge
    kategori).
  - cropType (String): Komoditas spesifik (e.g., Padi). (UI: Pencarian
    berdasarkan komoditas).
  - description (String): Rincian proyek. (UI: Paragraf deskripsi).
  - location (String): Lokasi lahan. (UI: Tampilan maps/lokasi).
  - landSize (String): Luas lahan proyek. (UI: Spesifikasi proyek).
  - images (Array of Strings): Kumpulan URL gambar proyek. (UI:
    Carousel/Slideshow gambar).
  - targetFunding (Number): Target total dana. (UI: Batas maksimal bar
    pendanaan).
  - collectedFunding (Number): Dana yang terkumpul saat ini. (UI: Nilai nominal
    terhimpun).
  - fundingProgress (Number): Persentase capaian pendanaan. (UI: Progress bar di
    card proyek).
  - minimumInvestment (Number): Minimum dana untuk berpartisipasi. (UI: Input
    form investasi).
  - estimatedROI (Number): Estimasi persentase bagi hasil (e.g., 14.5
    berarti 14.5%). (UI: Highlight potensi keuntungan).
  - durationMonths (Number): Tenor proyek dalam bulan. (UI: Teks durasi).
  - startDate (String/Date) & harvestDate (String/Date): Estimasi waktu mulai
    dan panen. (UI: Tanggal kalender).
  - status (String): "Funding" | "Running" | "Harvesting" | "Completed". (UI:
    Warna badge status berbeda).
  - riskLevel (String): "Low" | "Medium" | "High". (UI: Indikator tingkat
    risiko).
  - riskDescription (String): Penjelasan mitigasi risiko. (UI: Seksi edukasi
    risiko).
  - timeline (Array of Objects): Langkah operasional proyek (berisi date, title,
    description, status). (UI: Komponen vertical timeline).
  - documents (Array of Objects): Berkas legalitas (berisi name, type, url).
    (UI: List download link).

4. investments (Object dalam Array)

  - id (String): "ivs-001" — ID transaksi investasi.
  - investorId (String): "inv-001" — ID investor (Relasi ke investors).
  - projectId (String): "prj-001" — ID proyek pertanian (Relasi ke
    farmingProjects).
  - investmentDate (String/Date): Tanggal investasi dilakukan.
  - amount (Number): Nominal modal yang ditanamkan. (UI: Nilai investasi Anda).
  - ownershipPercentage (Number): Persentase kepemilikan modal atas total
    proyek. (UI: Nilai porsi saham).
  - status (String): "Active" | "Completed". (UI: Tab filter investasi).
  - projectProgress (Number): Progres riil lapangan dari proyek bersangkutan.
    (UI: Progress bar melingkar).
  - estimatedReturn (Number): Estimasi total pengembalian (Modal + Profit). (UI:
    Proyeksi saldo masuk).
  - currentProfit (Number): Profit yang sudah terealisasi dan dibagikan sejauh
    ini. (UI: Akumulasi dividen).
  - paymentHistory (Array of Objects): Riwayat pencairan dividen berkala (berisi
    date, amount, type, status). (UI: Sub-tabel di detail investasi).

5. investmentPerformance (Object dalam Array)

  - id (String): "perf-001" — ID unik performa bulanan.
  - investorId (String): "inv-001" — ID investor terkait.
  - period (String): Nama bulan (e.g., "Januari"). (UI: Label sumbu X pada
    chart).
  - totalInvestment (Number): Kumulatif saldo aktif terinvestasi di bulan
    tersebut. (UI: Line Chart series 1).
  - profit (Number): Akumulasi profit yang diterima hingga bulan tersebut. (UI:
    Line Chart series 2).
  - ROI (Number): Persentase pengembalian rata-rata di bulan itu. (UI: Tooltip
    chart).
  - growthPercentage (Number): Persentase kenaikan nilai investasi dari bulan
    sebelumnya. (UI: Analitis tren).

6. portfolioSummary (Object dalam Array)

  - investorId (String): ID investor terkait.
  - totalAssets (Number): Total aset gabungan (Modal + Laba). (UI: Teks angka
    besar utama).
  - totalInvestment (Number): Total uang yang sedang terputar. (UI: Teks angka
    pendukung).
  - totalProfit (Number): Total keuntungan bersih terkumpul. (UI: Teks berwarna
    hijau).
  - averageROI (Number): Rata-rata ROI seluruh portofolio. (UI: Badge
    persentase).
  - diversification (Array of Objects): Rincian alokasi per sektor industri
    (berisi category, percentage, amount). (UI: Bar chart horizontal alokasi
    sektor).

7. portfolioDistribution (Object dalam Array)

  - investorId (String): ID investor terkait.
  - commodityDistribution (Array of Objects): Proporsi per komoditas
    pangan/perkebunan (berisi commodity, percentage). (UI: Pie/Donut Chart
    komoditas).
  - regionDistribution (Array of Objects): Proporsi berdasarkan wilayah
    geografis (berisi region, percentage). (UI: Pie/Donut Chart wilayah).

8. chats (Object dalam Array)

  - id (String): ID ruang obrolan.
  - investorId (String) & farmerId (String): ID pihak yang bertransaksi pesan.
  - projectId (String): Proyek yang sedang didiskusikan (Relasi ke
    farmingProjects). (UI: Header chat menampilkan info mini proyek).
  - lastMessage (String) & lastMessageTime (String/Date): Pesan terakhir dan
    waktunya. (UI: Preview chat di sidebar list).
  - unreadCount (Number): Jumlah pesan belum terbaca. (UI: Badge lingkaran merah
    dengan angka).
  - onlineStatus (String): Status keaktifan petani ("Online" | "Offline"). (UI:
    Indikator lingkaran hijau/abu-abu).
  - messages (Array of Objects): Daftar riwayat balon chat (berisi id, sender
    ("investor" | "farmer"), message, timestamp, attachment ({ type, url })).
    (UI: Balon chat kanan/kiri beserta thumbnail gambar jika ada lampiran).

9. notifications (Object dalam Array)

  - id (String): ID notifikasi.
  - investorId (String): ID penerima notifikasi.
  - type (String): Kategori notifikasi ("FUND_RECEIVED", "PROJECT_STARTED",
    "FARM_UPDATE", dll). (UI: Menentukan pemilihan icon notifikasi).
  - title (String) & message (String): Judul dan isi pesan notifikasi. (UI: Teks
    tebal dan tipis di list notifikasi).
  - relatedId (String): ID entitas terkait (bisa ID proyek, ID transaksi, atau
    ID chat). (UI: Redirect/Routing ketika notifikasi diklik).
  - isRead (Boolean): Status dibaca (true atau false). (UI: Background abu-abu
    tipis untuk yang belum dibaca).
  - createdAt (String/Date): Waktu notifikasi dibuat. (UI: Teks waktu relatif,
    misal "2 jam yang lalu").

10. transactions (Object dalam Array)

  - id (String): ID transaksi.
  - investorId (String): ID pelaku transaksi.
  - type (String): Jenis transaksi ("Deposit" | "Investment" | "Return" |
    "Withdraw"). (UI: Icon panah atas (merah/keluar) atau panah bawah
    (hijau/masuk)).
  - amount (Number): Nilai transaksi. (UI: Kolom nominal tabel).
  - date (String/Date): Tanggal transaksi. (UI: Kolom tanggal tabel).
  - status (String): Status pengolahan transaksi ("Success" | "Pending" |
    "Failed"). (UI: Badge warna sukses hijau, pending kuning, failed merah).
  - invoiceNumber (String): Nomor invoice unik. (UI: Teks monospace sebagai
    tanda bukti autentik).
  - paymentMethod (String): Metode pembayaran (e.g., "Wallet Balance", "BCA
    Transfer"). (UI: Detail transaksi).
  - proofUrl (String): Tautan berkas unggahan bukti transfer fisik. (UI: Tombol
    "Lihat Bukti Transfer" yang membuka modal gambar).

11. wallet (Object dalam Array)

  - investorId (String): ID pemilik dompet digital.
  - balance (Number): Saldo mengendap yang siap diinvestasikan atau ditarik.
    (UI: Card saldo utama).
  - totalDeposit (Number) & totalWithdraw (Number): Akumulasi aliran kas masuk
    dan keluar. (UI: Sub-informasi di dashboard wallet).
  - bankAccount (Object): Rekening penampung terikat (berisi bankName,
    accountNumber, accountHolder). (UI: Form konfirmasi penarikan dana).

12. walletHistory (Object dalam Array)

  - id (String): ID log kas.
  - investorId (String): ID investor terkait.
  - type (String): Jenis mutasi ("Deposit" | "Investment" | "Return" |
    "Withdraw").
  - amount (Number): Nominal mutasi (negatif untuk uang keluar, positif untuk
    uang masuk). (UI: Format warna merah untuk minus, hijau untuk plus).
  - description (String): Keterangan mutasi (e.g., "Investasi pada Proyek...").
    (UI: Kolom deskripsi mutasi).
  - date (String/Date): Waktu mutasi terjadi.

13. investorSettings (Object dalam Array)

  - investorId (String): ID investor terkait.
  - profileVisibility (String): "Public" | "Private". (UI: Toggle privasi
    profil).
  - emailNotification (Boolean), pushNotification (Boolean),
    transactionNotification (Boolean): Konfigurasi saluran notifikasi. (UI:
    Kumpulan switch toggle di halaman pengaturan).
  - securityLevel (String): "Low" | "Medium" | "High". (UI: Indikator bar
    keamanan akun).
  - twoFactorAuth (Boolean): Status 2FA aktif/tidak. (UI: Switch toggle
    keamanan).
  - linkedBank (String): Akun bank terhubung yang disensor sebagian demi
    keamanan. (UI: Label informasi bank terhubung).

3. Hubungan Antar Data (Relational Schema)

Data-data ini dirancang dengan prinsip relasional menggunakan pengenal unik (ID)
sebagai kunci penghubung (foreign key).

Penggunaan ID Reference Utama:

  - investorId: Mengaitkan data investor ke portofolio, histori performa
    bulanan, transaksi uang, dompet digital, pengaturan keamanan, log obrolan,
    dan notifikasi personal.
  - farmerId: Mengaitkan profil petani secara langsung sebagai penanggung jawab
    proyek pertanian (farmingProjects) serta sebagai lawan bicara di menu
    obrolan (chats).
  - projectId: Menghubungkan transaksi investasi aktif milik investor
    (investments) ke detail proyek (farmingProjects) serta mengaitkan ruang
    obrolan (chats) ke proyek spesifik.
  - relatedId (pada notifications): Menyimpan ID rujukan dinamis untuk memandu
    navigasi otomatis ketika sebuah notifikasi diklik.

Contoh Alur Relasi Terintegrasi:

[Investor] ID: "inv-001" (Budi Santoso)
   │
   └───► Memiliki transaksi di [Investments] ID: "ivs-001"
            │
            └───► Terikat ke Proyek di [FarmingProjects] ID: "prj-001" ("Pemberdayaan Sawah Padi")
                     │
                     ├───► Dikelola oleh Petani di [Farmers] ID: "frm-001" ("Pak Joko Susilo")
                     │
                     └───► Memiliki kanal diskusi di [Chats] ID: "chat-001" (Investor "inv-001" ◄─► Petani "frm-001")

4. Mapping Penggunaan Data ke Halaman React JSX

Halaman Dashboard:

  - Card Statistik: Mengambil data dari portfolioSummary berdasarkan investorId
    aktif (e.g., menampilkan totalAssets, totalInvestment, dan totalProfit).
    Gunakan investors.activeInvestmentCount dan completedInvestmentCount sebagai
    counter ringkasan jumlah proyek.
  - Grafik: Mengambil array dari investmentPerformance yang difilter sesuai
    investorId. Sumbu X memetakan field period, sedangkan grafik garis (line
    chart) menampilkan tren naik-turun dari totalInvestment dan profit.
  - Notifikasi Terbaru: Memakai filter pada data notifications di mana
    investorId cocok dengan user aktif, lalu urutkan secara descending
    berdasarkan createdAt. Ambil 3-5 item teratas untuk ditampilkan di widget
    panel notifikasi ringkas.

Marketplace Project (Daftar Proyek):

  - List Project: Memanfaatkan data dari farmingProjects. Setiap item dipetakan
    ke dalam bentuk Card Component.
  - Filter: Menggunakan field category (Pangan, Hortikultura, Perkebunan),
    status (Funding, Running, Completed), dan riskLevel (Low, Medium, High).
  - Search: Pencarian teks dicocokkan dengan field title, location, atau
    cropType (menggunakan fungsi .toLowerCase()).

Project Detail (Rincian Proyek):

  - Data yang Ditampilkan: Seluruh isi detail farmingProjects (deskripsi,
    spesifikasi luas tanah, target pendanaan, ROI, dokumen proposal, serta
    galeri gambar).
  - Relasi Data: Mengambil data petani pengelola dengan cara mencocokkan
    farmingProjects.farmerId ke farmers.id (untuk menampilkan foto, nama, bio
    singkat, dan reputasi rating pengelola proyek).
  - Informasi Investasi: Menghubungkan investments dengan farmingProjects.id
    milik proyek tersebut untuk mengecek apakah investor aktif sudah pernah
    berinvestasi di proyek tersebut. Jika ada, tampilkan informasi khusus
    "Status Investasi Anda" beserta riwayat pembagian hasil proyek tersebut
    (investments.paymentHistory).

Farmer Profile (Profil Petani):

  - Informasi Petani: Data dari farmers terpilih. Tampilkan profil lengkap, bio,
    wilayah kerja, pengalaman bertani (farmingExperience), serta persentase
    tingkat kesuksesan proyek (successRate).
  - Review, Rating, Sertifikat: Tampilkan rating angka dalam bentuk bintang,
    iterasi daftar array farmers.certificates untuk galeri sertifikat
    kompetensi, dan iterasi farmers.reviews untuk menampilkan testimoni kepuasan
    investor lain.

My Investment (Investasi Saya):

  - Data Investasi: Mengambil data investments yang difilter berdasarkan
    investorId aktif.
  - Progress Proyek: Menampilkan progress bar menggunakan persentase dari
    investments.projectProgress.
  - Return Investasi: Menampilkan estimasi pengembalian modal pada field
    estimatedReturn dan profit berjalan pada currentProfit.
  - Payment History: Merender array investments.paymentHistory ke dalam struktur
    tabel mini di dalam Card Detail Investasi untuk menunjukkan rincian dividen
    yang telah berhasil dikirim ke akun dompet investor.

Portfolio Analytics (Analitik Portofolio):

  - Grafik Keuntungan: Menggunakan representasi line chart dari
    investmentPerformance untuk melacak pertumbuhan profit dari bulan ke bulan.
  - Distribusi Investasi & Komoditas: Menggunakan data dari
    portfolioDistribution berdasarkan investorId aktif. Field
    commodityDistribution dirender ke dalam chart berbentuk donat (Donut Chart)
    untuk persentase komoditas, dan regionDistribution untuk visualisasi sebaran
    geografi modal.
  - ROI: Menampilkan rata-rata performa imbal hasil tahunan menggunakan field
    portfolioSummary.averageROI.

Chat Room (Kanal Diskusi):

  - Struktur Conversation: Mengambil data dari array chats yang difilter sesuai
    investorId aktif. Tampilkan daftar nama petani di panel navigasi samping
    chat.
  - Query Pesan: Ketika baris percakapan diklik, ambil detail obrolan dari objek
    chats yang memiliki farmerId dan investorId yang cocok, lalu urutkan list
    array messages dari yang terlama hingga terbaru berdasarkan field timestamp.
  - Attachment: Cek keberadaan objek attachment pada tiap pesan. Jika attachment
    tidak bernilai null dan bertipe "image", render komponen gambar (<img
    src={attachment.url} />).

Notification Center (Pusat Pemberitahuan):

  - Jenis Notifikasi: Menggunakan field type. Kondisikan UI class berdasarkan
    jenis ini (misal icon koin untuk PROFIT_SHARED atau icon traktat tanah untuk
    FARM_UPDATE).
  - Related Data: Field relatedId dapat dipetakan ke dalam elemen link. Jika
    diklik, arahkan user ke detail halaman transaksi, chat, atau perkembangan
    proyek yang ditunjuk.

Transaction History (Riwayat Transaksi):

  - Jenis Transaksi: Menampilkan string transactions.type dengan indikator warna
    visual (hijau untuk dana masuk, merah untuk dana keluar).
  - Status: Membaca field status (Success / Pending / Failed).
  - Invoice & Bukti Pembayaran: Menampilkan kode unik invoiceNumber. Tombol
    interaktif "Lihat Bukti" hanya aktif jika field proofUrl berisi tautan
    gambar valid (bukan null).

Wallet Page (Dompet Saya):

  - Statistik Saldo: Menampilkan nilai wallet.balance sebagai saldo aktif utama,
    berdampingan dengan total deposit dan withdraw.
  - Deposit & Withdraw: Tombol aksi pemicu modal top-up atau penarikan dana.
  - Rekening Bank: Informasi dalam sub-objek wallet.bankAccount ditampilkan pada
    bagian pengaturan rekening penarikan atau form penarikan cepat.

Settings Page (Pengaturan Akun):

  - Profil: Mengambil detail kontak personal di data investors.
  - Keamanan: Mengambil dan memperbarui visualisasi toggle di
    investorSettings.twoFactorAuth dan securityLevel.
  - Preferensi Notifikasi: Sinkronisasi toggle switch dengan boolean value dari
    emailNotification, pushNotification, dan transactionNotification.

5. Tabel Dokumentasi Data

Tabel di bawah ini merangkum properti penting dari data mock yang dapat
dijadikan panduan pengembangan:

| Data                | Field             | Fungsi                                         | Digunakan Pada Page                |
| :------------------ | :---------------- | :--------------------------------------------- | :--------------------------------- |
| **investors**       | `riskPreference`  | Klasifikasi profil risiko investor             | Dashboard, Rekomendasi Proyek      |
| **investors**       | `totalProfit`     | Total nominal profit yang pernah diperoleh     | Dashboard Card, Portfolio Page     |
| **farmers**         | `successRate`     | Persentase tingkat keberhasilan proyek petani  | Farmer Profile, Project Detail     |
| **farmers**         | `certificates`    | Daftar sertifikasi keahlian yang diakui        | Farmer Profile                     |
| **farmingProjects** | `status`          | Status alur proyek (`Funding`, `Running`, dll) | Marketplace, Project Detail, Admin |
| **farmingProjects** | `timeline`        | Rencana tahapan operasional lapangan proyek    | Project Detail (Timeline Tab)      |
| **investments**     | `projectProgress` | Angka persentase penyelesaian fisik proyek     | My Investment Card, Dashboard      |
| **investments**     | `paymentHistory`  | Riwayat pencairan dana bagi hasil berkala      | My Investment Detail               |
| **chats**           | `onlineStatus`    | Status aktif/tidaknya petani di platform       | Chat Page Header & Sidebar         |
| **notifications**   | `isRead`          | Identifikasi apakah notifikasi sudah dibuka    | Topbar Notification Dropdown       |
| **transactions**    | `invoiceNumber`   | Nomor resi transaksi keuangan                  | Invoice Page, Transaction Table    |
| **wallet**          | `balance`         | Saldo dompet aktif milik investor              | Sidebar Header, Wallet Top-up      |

6. Contoh Query dan Filter Menggunakan JavaScript (ES6 Array Methods)

Berikut adalah contoh fungsi query murni (tanpa JSX) menggunakan method bawaan
JavaScript untuk memanipulasi file data di atas:

import { farmingProjects, investments } from './investorData.js';

// 1. Menampilkan project berdasarkan status (Contoh: mencari proyek yang sedang mencari dana)
export const getProjectsByStatus = (status) => {
  return farmingProjects.filter(project => project.status === status);
};
// Contoh pemanggilan: getProjectsByStatus("Funding");

// 2. Mengambil project berdasarkan farmerId (Melihat portofolio garapan satu petani)
export const getProjectsByFarmer = (farmerId) => {
  return farmingProjects.filter(project => project.farmerId === farmerId);
};
// Contoh pemanggilan: getProjectsByFarmer("frm-001");

// 3. Mengambil investasi berdasarkan investorId (Menampilkan kepemilikan investor tertentu)
export const getInvestmentsByInvestor = (investorId) => {
  return investments.filter(investment => investment.investorId === investorId);
};
// Contoh pemanggilan: getInvestmentsByInvestor("inv-001");

// 4. Menhitung total investasi yang dilakukan oleh investor tertentu
export const calculateTotalInvestment = (investorId) => {
  const investorInvestments = getInvestmentsByInvestor(investorId);
  return investorInvestments.reduce((sum, item) => sum + item.amount, 0);
};
// Contoh pemanggilan: calculateTotalInvestment("inv-001"); // Output: 150000000

// 5. Menghitung total profit yang sudah terealisasi (currentProfit) dari investor tertentu
export const calculateTotalRealizedProfit = (investorId) => {
  const investorInvestments = getInvestmentsByInvestor(investorId);
  return investorInvestments.reduce((sum, item) => sum + item.currentProfit, 0);
};
// Contoh pemanggilan: calculateTotalRealizedProfit("inv-001"); // Output: 8900000

// 6. Menghitung rata-rata estimasi ROI proyek aktif milik investor tertentu
export const calculateAverageROI = (investorId) => {
  const investorInvestments = getInvestmentsByInvestor(investorId);
  if (investorInvestments.length === 0) return 0;

  // Ambil data proyek asli untuk mendapatkan estimasi ROI awal
  const totalROI = investorInvestments.reduce((sum, investment) => {
    const project = farmingProjects.find(p => p.id === investment.projectId);
    return sum + (project ? project.estimatedROI : 0);
  }, 0);

  return parseFloat((totalROI / investorInvestments.length).toFixed(2));
};
// Contoh pemanggilan: calculateAverageROI("inv-001"); // Output: 14.8

7. Rekomendasi Pengembangan Aplikasi

Untuk menjamin skalabilitas aplikasi saat beralih dari fase prototype ke tahap
produksi, berikut beberapa poin rekomendasi teknis:

Data yang Sebaiknya Tetap Berupa Dummy/Statis di Sisi Client:

  - Kategori Proyek & Jenis Komoditas: Pilihan filter kategori ("Pangan",
    "Hortikultura") dan jenis komoditas ("Padi", "Kopi") dapat disimpan sebagai
    konstanta statis di sisi client agar tidak membebani proses request ke
    database.
  - Struktur Metadata Pengaturan: Daftar opsi menu atau bahasa di halaman
    investorSettings.

Data yang Harus Berasal dari API / Backend (Database Dinamis):

  - Transaksi dan Saldo Wallet: Nilai wallet.balance serta daftar transactions
    harus diamankan di sisi server dengan enkripsi database guna mencegah
    manipulasi angka secara langsung di client browser.
  - Kanal Pesan Real-time (Chat): Riwayat chat dan status online petani
    sebaiknya menggunakan kombinasi WebSocket (seperti Socket.io) dan database
    real-time (seperti PostgreSQL/MongoDB) daripada array statis agar pengiriman
    pesan terasa instan.
  - Lokasi Geografis Lahan (Maps): Jika aplikasi berkembang, koordinat presisi
    (Latitude, Longitude) dari proyek pertanian harus dimuat dinamis dari API
    GIS/Mapbox untuk melacak posisi riil lahan tani.

Data Tambahan yang Kemungkinan Dibutuhkan Saat Aplikasi Berkembang:

  - Laporan Keuangan Lahan: Terdiri dari detail arus pengeluaran harian tani
    (Ledger Buku Kas Tani) yang diunggah oleh petani sebagai bentuk transparansi
    penuh kepada investor.
  - Sistem Logistik Pasca-Panen: Data pelacakan pengiriman hasil panen ke
    pembeli korporat/supermarket (status ekspedisi, nomor resi pengiriman, nama
    kurir).
  - Dokumen Kontrak Digital (e-Signature): Penyimpanan sertifikat kepemilikan
    modal resmi berformat PDF yang sah secara hukum, dilengkapi tanda tangan
    digital terenkripsi (seperti PrivyID atau DocuSign).
