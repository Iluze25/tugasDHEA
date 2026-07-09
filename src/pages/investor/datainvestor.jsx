// src/data/investorData.js

// ====================================
// 1. Investors
// ====================================
export const investors = [
    {
        id: "inv-001",
        name: "Budi Santoso",
        email: "budi.santoso@email.com",
        phone: "+6281234567890",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        bio: "Investor retail yang berfokus pada ketahanan pangan nasional dan menyukai model investasi berdampak sosial (impact investing) di sektor hortikultura.",
        location: "Jakarta Selatan, DKI Jakarta",
        joinDate: "2025-05-10",
        accountStatus: "Active",
        kycStatus: "Verified",
        riskPreference: "Moderate",
        totalInvested: 150000000,
        totalProfit: 8900000,
        activeInvestmentCount: 4,
        completedInvestmentCount: 1
    },
    {
        id: "inv-002",
        name: "Siti Rahma",
        email: "siti.rahma@email.com",
        phone: "+6281987654321",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        bio: "Pecinta lingkungan yang aktif mendukung pertanian organik lokal dan perkebunan kopi berkelanjutan di berbagai wilayah Indonesia.",
        location: "Bandung, Jawa Barat",
        joinDate: "2025-08-15",
        accountStatus: "Active",
        kycStatus: "Verified",
        riskPreference: "Aggressive",
        totalInvested: 70000000,
        totalProfit: 4500000,
        activeInvestmentCount: 2,
        completedInvestmentCount: 1
    },
    {
        id: "inv-003",
        name: "Andi Wijaya",
        email: "andi.wijaya@email.com",
        phone: "+6281122334455",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        bio: "Wirausahawan bidang kuliner yang berinvestasi langsung pada rantai pasok bahan baku pangan seperti padi dan jagung berkualitas tinggi.",
        location: "Surabaya, Jawa Timur",
        joinDate: "2025-11-01",
        accountStatus: "Active",
        kycStatus: "Verified",
        riskPreference: "Conservative",
        totalInvested: 100000000,
        totalProfit: 6800000,
        activeInvestmentCount: 1,
        completedInvestmentCount: 1
    }
];

// ====================================
// 2. Farmers
// ====================================
export const farmers = [
    {
        id: "frm-001",
        name: "Pak Joko Susilo",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
        location: "Malang, Jawa Timur",
        phone: "+6282134567811",
        email: "joko.susilo@tani.com",
        bio: "Petani padi dan jagung generasi ketiga yang menerapkan sistem pertanian presisi untuk menghemat air dan meningkatkan produktivitas lahan.",
        farmingExperience: 18,
        specialization: ["Padi", "Jagung"],
        rating: 4.8,
        completedProjects: 12,
        totalManagedFunds: 450000000,
        successRate: 95,
        certificates: [
            { name: "Sertifikasi Pertanian Presisi", issuer: "Kementerian Pertanian RI", year: 2023 },
            { name: "Sertifikasi Organik SNI", issuer: "Lembaga Sertifikasi Organik Seloliman", year: 2024 }
        ],
        reviews: [
            { investorName: "Andi Wijaya", rating: 5, comment: "Hasil panen jagung sangat melimpah dan laporan perkembangan dibagikan sangat berkala.", date: "2026-04-12" },
            { investorName: "Budi Santoso", rating: 4, comment: "Responsif saat diajak diskusi lewat chat dashboard. Sangat tepercaya.", date: "2026-05-20" }
        ]
    },
    {
        id: "frm-002",
        name: "Bu Sri Utami",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
        location: "Sukabumi, Jawa Barat",
        phone: "+6281356789122",
        email: "sri.utami@tani.com",
        bio: "Pakar hortikultura yang berfokus pada budidaya sayuran premium berbasis greenhouse dan hidroponik ramah lingkungan.",
        farmingExperience: 12,
        specialization: ["Sayuran Organik", "Tomat"],
        rating: 4.9,
        completedProjects: 8,
        totalManagedFunds: 310000000,
        successRate: 98,
        certificates: [
            { name: "Global G.A.P. Hortikultura", issuer: "Control Union Certification", year: 2022 },
            { name: "Sertifikat Hidroponik Modern", issuer: "Pusat Pelatihan Pertanian Lembang", year: 2023 }
        ],
        reviews: [
            { investorName: "Siti Rahma", rating: 5, comment: "Kualitas sayuran hidroponik jempolan. Profit yang dibagikan sesuai dengan estimasi awal.", date: "2026-02-18" }
        ]
    },
    {
        id: "frm-003",
        name: "Pak Wayan Sudarta",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
        location: "Bangli, Bali",
        phone: "+6281723456789",
        email: "wayan.sudarta@tani.com",
        bio: "Pengelola kebun kopi lereng Gunung Batur. Menghasilkan biji kopi Arabika pilihan bersertifikasi Indikasi Geografis.",
        farmingExperience: 22,
        specialization: ["Kopi"],
        rating: 4.7,
        completedProjects: 15,
        totalManagedFunds: 600000000,
        successRate: 92,
        certificates: [
            { name: "Sertifikasi Indikasi Geografis Kopi Kintamani", issuer: "Kemenkumham RI", year: 2019 },
            { name: "Sertifikat Fairtrade Coffee", issuer: "FLOCERT", year: 2021 }
        ],
        reviews: [
            { investorName: "Budi Santoso", rating: 5, comment: "Kopi berkualitas ekspor. Manajemen pasca-panen rapi sekali.", date: "2026-06-15" }
        ]
    },
    {
        id: "frm-004",
        name: "Pak Ahmad Fauzi",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
        location: "Brebes, Jawa Tengah",
        phone: "+6281909876543",
        email: "ahmad.fauzi@tani.com",
        bio: "Spesialis budidaya bawang merah dan cabai merah skala besar dengan mengandalkan sistem irigasi hemat air drip line.",
        farmingExperience: 15,
        specialization: ["Bawang Merah", "Cabai"],
        rating: 4.6,
        completedProjects: 10,
        totalManagedFunds: 380000000,
        successRate: 90,
        certificates: [
            { name: "Sertifikat Keamanan Pangan Prima 3", issuer: "Dinas Pertanian Jawa Tengah", year: 2023 }
        ],
        reviews: [
            { investorName: "Budi Santoso", rating: 4, comment: "Sempat ada kendala cuaca tapi Pak Ahmad cepat mengantisipasi risiko.", date: "2026-05-10" }
        ]
    },
    {
        id: "frm-005",
        name: "Bu Endang Rahayu",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        location: "Cianjur, Jawa Barat",
        phone: "+6285211223344",
        email: "endang.rahayu@tani.com",
        bio: "Pelopor kelompok tani wanita yang fokus pada padi organik lokal seperti Pandanwangi dan sayuran berumur pendek.",
        farmingExperience: 10,
        specialization: ["Padi", "Sayuran Organik"],
        rating: 4.8,
        completedProjects: 9,
        totalManagedFunds: 250000000,
        successRate: 96,
        certificates: [
            { name: "Sertifikasi Padi Organik", issuer: "LSO Inofice", year: 2024 }
        ],
        reviews: [
            { investorName: "Budi Santoso", rating: 5, comment: "Pembagian hasil transparan, laporan dikirim beserta nota belanja input tani.", date: "2026-04-16" }
        ]
    },
    {
        id: "frm-006",
        name: "Pak Bambang Hermawan",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
        location: "Garut, Jawa Barat",
        phone: "+6287877665544",
        email: "bambang.h@tani.com",
        bio: "Membudidayakan cabai rawit dan tomat di kawasan dataran tinggi Garut dengan pola rotasi tanaman berkelanjutan.",
        farmingExperience: 14,
        specialization: ["Cabai", "Tomat"],
        rating: 4.5,
        completedProjects: 7,
        totalManagedFunds: 200000000,
        successRate: 88,
        certificates: [
            { name: "Sertifikat Good Agricultural Practices (GAP)", issuer: "Dinas Tanaman Pangan Jabar", year: 2022 }
        ],
        reviews: []
    },
    {
        id: "frm-007",
        name: "Pak Made Wiguna",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150",
        location: "Tabanan, Bali",
        phone: "+6289988776655",
        email: "made.wiguna@tani.com",
        bio: "Pengembang sistem agroforestri kopi robusta terintegrasi dengan peternakan kambing etawa untuk suplai pupuk kompos organik.",
        farmingExperience: 16,
        specialization: ["Kopi", "Padi"],
        rating: 4.7,
        completedProjects: 11,
        totalManagedFunds: 400000000,
        successRate: 93,
        certificates: [
            { name: "Sertifikat Organik Internasional USDA", issuer: "Control Union", year: 2023 }
        ],
        reviews: [
            { investorName: "Siti Rahma", rating: 5, comment: "Inovasi agroforestri yang luar biasa dan ramah lingkungan.", date: "2026-05-16" }
        ]
    },
    {
        id: "frm-008",
        name: "Bu Siti Aminah",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
        location: "Karawang, Jawa Barat",
        phone: "+6281299883344",
        email: "siti.aminah@tani.com",
        bio: "Memiliki keahlian khusus dalam pembenihan padi varietas unggul tahan genangan air di kawasan rawan banjir Karawang.",
        farmingExperience: 11,
        specialization: ["Padi", "Jagung"],
        rating: 4.6,
        completedProjects: 6,
        totalManagedFunds: 180000000,
        successRate: 90,
        certificates: [],
        reviews: []
    }
];

// ====================================
// 3. Farming Projects
// ====================================
export const farmingProjects = [
    {
        id: "prj-001",
        farmerId: "frm-001",
        title: "Pemberdayaan Sawah Padi Pandanwangi Cianjur",
        category: "Pangan",
        cropType: "Padi",
        description: "Pendanaan untuk sarana produksi, pupuk organik, dan upah tenaga kerja budidaya padi aromatik Pandanwangi di lahan seluas 2 hektar. Menggunakan metode SRI (System of Rice Intensification) guna menghemat air dan benih.",
        location: "Cianjur, Jawa Barat",
        landSize: "2 Hektar",
        images: [
            "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1535242208474-9a2793260ca8?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 100000000,
        collectedFunding: 100000000,
        fundingProgress: 100,
        minimumInvestment: 5000000,
        estimatedROI: 14.5,
        durationMonths: 4,
        startDate: "2026-02-10",
        harvestDate: "2026-06-10",
        status: "Running",
        riskLevel: "Low",
        riskDescription: "Risiko utama adalah perubahan cuaca ekstrim yang diantisipasi dengan asuransi pertanian Tani Mandiri.",
        timeline: [
            { date: "2026-02-12", title: "Pengolahan Lahan", description: "Pembajakan sawah menggunakan traktor dan pemberian pupuk kandang.", status: "Completed" },
            { date: "2026-02-25", title: "Penanaman Bibit", description: "Proses penanaman bibit padi Pandanwangi berumur 15 hari.", status: "Completed" },
            { date: "2026-04-15", title: "Pemupukan Susulan", description: "Aplikasi pupuk organik cair buatan sendiri.", status: "Completed" },
            { date: "2026-06-10", title: "Estimasi Panen", description: "Padi siap dipotong dan dirontokkan.", status: "Pending" }
        ],
        documents: [
            { name: "Proposal Proyek Padi Pandanwangi", type: "PDF", url: "https://example.com/docs/proposal-padi.pdf" },
            { name: "Sertifikat Kepemilikan Lahan Sewa", type: "PDF", url: "https://example.com/docs/sewa-lahan.pdf" }
        ]
    },
    {
        id: "prj-002",
        farmerId: "frm-002",
        title: "Greenhouse Tomat Cherry Premium Sukabumi",
        category: "Hortikutura",
        cropType: "Tomat",
        description: "Pembangunan instalasi fertigasi hidroponik tetes modern di dalam greenhouse seluas 1.000 meter persegi untuk memproduksi Tomat Cherry kelas supermarket.",
        location: "Sukabumi, Jawa Barat",
        landSize: "1.000 m²",
        images: [
            "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 120000000,
        collectedFunding: 45000000,
        fundingProgress: 37.5,
        minimumInvestment: 3000000,
        estimatedROI: 18.0,
        durationMonths: 6,
        startDate: "2026-08-01",
        harvestDate: "2027-02-01",
        status: "Funding",
        riskLevel: "Medium",
        riskDescription: "Kerusakan struktur plastik UV akibat angin kencang dapat diatasi dengan jaring pengaman eksternal.",
        timeline: [
            { date: "2026-08-05", title: "Pembangunan Pondasi", description: "Pemasangan tiang besi baja ringan dan perakitan greenhouse.", status: "Pending" }
        ],
        documents: [
            { name: "Analisa Finansial Tomat Cherry", type: "PDF", url: "https://example.com/docs/tomat-cherry.pdf" }
        ]
    },
    {
        id: "prj-003",
        farmerId: "frm-003",
        title: "Sertifikasi Organik Kopi Arabika Kintamani",
        category: "Perkebunan",
        cropType: "Kopi",
        description: "Pendanaan operasional pemeliharaan pohon kopi, pembelian pupuk kompos organik, dan persiapan audit sertifikasi organik standar Uni Eropa untuk ekspor biji kopi Kintamani.",
        location: "Bangli, Bali",
        landSize: "3 Hektar",
        images: [
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 150000000,
        collectedFunding: 150000000,
        fundingProgress: 100,
        minimumInvestment: 10000000,
        estimatedROI: 16.0,
        durationMonths: 8,
        startDate: "2026-01-15",
        harvestDate: "2026-09-15",
        status: "Running",
        riskLevel: "Low",
        riskDescription: "Faktor fluktuasi harga komoditas kopi global dapat dikurangi dengan kontrak jual (forward contract) bersama pembeli korporasi.",
        timeline: [
            { date: "2026-01-20", title: "Pemangkasan Pohon Naungan", description: "Mengatur intensitas cahaya masuk ke sela pohon kopi.", status: "Completed" },
            { date: "2026-05-10", title: "Audit Lapangan Pertama", description: "Pemeriksaan lahan oleh auditor independen Control Union.", status: "Completed" }
        ],
        documents: [
            { name: "Studi Kelayakan Kopi Organik", type: "PDF", url: "https://example.com/docs/studi-kopi.pdf" }
        ]
    },
    {
        id: "prj-004",
        farmerId: "frm-004",
        title: "Budidaya Bawang Merah Bima Brebes",
        category: "Hortikutura",
        cropType: "Bawang Merah",
        description: "Bawang merah varietas Bima terkenal tahan hama penyakit. Proyek ini membiayai pengolahan tanah bedengan, pembelian mulsa plastik, dan instalasi penyiraman otomatis.",
        location: "Brebes, Jawa Tengah",
        landSize: "1.5 Hektar",
        images: [
            "https://images.unsplash.com/photo-1508747703725-719ae257c84a?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 80000000,
        collectedFunding: 80000000,
        fundingProgress: 100,
        minimumInvestment: 2500000,
        estimatedROI: 15.0,
        durationMonths: 3,
        startDate: "2026-04-01",
        harvestDate: "2026-07-01",
        status: "Harvesting",
        riskLevel: "High",
        riskDescription: "Cuaca hujan terus-menerus memicu penyakit jamur upas. Diantisipasi dengan pestisida organik nabati intensif.",
        timeline: [
            { date: "2026-04-05", title: "Pemasangan Mulsa", description: "Pemasangan mulsa plastik hitam perak di seluruh bedengan.", status: "Completed" },
            { date: "2026-05-15", title: "Pemberantasan Gulma", description: "Penyiangan rumput pengganggu secara manual.", status: "Completed" },
            { date: "2026-06-25", title: "Pengecekan Umbi", description: "Pemeriksaan ukuran umbi menjelang waktu pemanenan.", status: "Completed" }
        ],
        documents: [
            { name: "Panduan Teknis Budidaya Bawang Merah", type: "PDF", url: "https://example.com/docs/panduan-bawang.pdf" }
        ]
    },
    {
        id: "prj-005",
        farmerId: "frm-005",
        title: "Ekspansi Kebun Sayuran Organik",
        category: "Hortikutura",
        cropType: "Sayuran Organik",
        description: "Ekspansi lahan terbuka organik untuk sayuran komersial cepat panen (Pakcoy, Selada, Bayam Merah) guna memenuhi permintaan pasar katering sehat regional.",
        location: "Cianjur, Jawa Barat",
        landSize: "5.000 m²",
        images: [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 50000000,
        collectedFunding: 50000000,
        fundingProgress: 100,
        minimumInvestment: 2000000,
        estimatedROI: 12.0,
        durationMonths: 2,
        startDate: "2026-02-01",
        harvestDate: "2026-04-01",
        status: "Completed",
        riskLevel: "Low",
        riskDescription: "Masa tumbuh yang singkat meminimalisir kegagalan total. Risiko terdistribusi pada beberapa jenis sayuran.",
        timeline: [
            { date: "2026-02-05", title: "Penyemaian Benih", description: "Benih disemai di baki semai steril.", status: "Completed" },
            { date: "2026-03-25", title: "Panen Perdana", description: "Pemanenan bayam merah dan kangkung organik.", status: "Completed" }
        ],
        documents: []
    },
    {
        id: "prj-006",
        farmerId: "frm-006",
        title: "Budidaya Cabai Rawit Merah Dataran Tinggi",
        category: "Hortikutura",
        cropType: "Cabai",
        description: "Mengembangkan penanaman cabai rawit merah varietas kaliber dengan daya tahan penyakit tinggi, membidik harga jual premium saat musim hujan di pasar induk.",
        location: "Garut, Jawa Barat",
        landSize: "1 Hektar",
        images: [
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 75000000,
        collectedFunding: 12000000,
        fundingProgress: 16.0,
        minimumInvestment: 1500000,
        estimatedROI: 17.5,
        durationMonths: 5,
        startDate: "2026-09-01",
        harvestDate: "2027-02-01",
        status: "Funding",
        riskLevel: "High",
        riskDescription: "Harga cabai sangat volatil. Diantisipasi dengan kerja sama langsung ke industri produsen sambal kemasan.",
        timeline: [],
        documents: []
    },
    {
        id: "prj-007",
        farmerId: "frm-007",
        title: "Revitalisasi Kebun Kopi Robusta Tabanan",
        category: "Perkebunan",
        cropType: "Kopi",
        description: "Kegiatan peremajaan pohon kopi yang tua dengan teknik sambung pucuk (grafting) serta pengadaan mesin pengupas biji kopi basah (pulper).",
        location: "Tabanan, Bali",
        landSize: "2 Hektar",
        images: [
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 90000000,
        collectedFunding: 90000000,
        fundingProgress: 100,
        minimumInvestment: 5000000,
        estimatedROI: 15.0,
        durationMonths: 12,
        startDate: "2025-05-01",
        harvestDate: "2026-05-01",
        status: "Completed",
        riskLevel: "Low",
        riskDescription: "Tindakan preventif dilakukan dengan melakukan penyuluhan berkala bersama penyuluh pertanian daerah setempat.",
        timeline: [
            { date: "2025-05-15", title: "Pembersihan Gulma Kakao", description: "Pembersihan lahan sela kopi.", status: "Completed" },
            { date: "2026-05-01", title: "Panen dan Pengolahan Hasil", description: "Pemetikan buah merah ceri dan pengolahan basah.", status: "Completed" }
        ],
        documents: []
    },
    {
        id: "prj-008",
        farmerId: "frm-008",
        title: "Budidaya Padi Hitam Organik Eksklusif",
        category: "Pangan",
        cropType: "Padi",
        description: "Produksi beras hitam organik premium berkhasiat kesehatan tinggi. Pangsa pasar langsung ke rumah sakit mitra, restoran vegan, dan butik organik terkemuka.",
        location: "Karawang, Jawa Barat",
        landSize: "1.5 Hektar",
        images: [
            "https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 110000000,
        collectedFunding: 110000000,
        fundingProgress: 100,
        minimumInvestment: 5000000,
        estimatedROI: 16.5,
        durationMonths: 4,
        startDate: "2026-03-01",
        harvestDate: "2026-07-01",
        status: "Running",
        riskLevel: "Medium",
        riskDescription: "Masa tumbuh padi hitam sedikit lebih panjang. Perlu kontrol intensif terhadap ketersediaan nutrisi organik tanah.",
        timeline: [
            { date: "2026-03-05", title: "Pembersihan Saluran Air", description: "Memastikan debit air irigasi mengalir lancar.", status: "Completed" },
            { date: "2026-05-20", title: "Pemantauan Malai Padi", description: "Padi mulai keluar malai dan dilakukan penutupan jaring anti-burung.", status: "Completed" }
        ],
        documents: []
    },
    {
        id: "prj-009",
        farmerId: "frm-001",
        title: "Tumpang Sari Jagung Hibrida & Kacang Tanah",
        category: "Pangan",
        cropType: "Jagung",
        description: "Optimasi penggunaan lahan tumpang sari guna meningkatkan pendapatan petani per meter persegi lahan. Kacang tanah menyuplai kandungan nitrogen alami ke tanah bagi tanaman jagung.",
        location: "Malang, Jawa Timur",
        landSize: "1.5 Hektar",
        images: [
            "https://images.unsplash.com/photo-1551754625-70c90487530d?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 60000000,
        collectedFunding: 60000000,
        fundingProgress: 100,
        minimumInvestment: 2000000,
        estimatedROI: 13.0,
        durationMonths: 3,
        startDate: "2026-01-10",
        harvestDate: "2026-04-10",
        status: "Completed",
        riskLevel: "Low",
        riskDescription: "Risiko minimal karena kombinasi dua tanaman pangan kuat ini saling menyehatkan unsur mikro di dalam tanah.",
        timeline: [
            { date: "2026-01-15", title: "Penanaman Serentak", description: "Penanaman benih jagung baris ganda berseling kacang tanah.", status: "Completed" },
            { date: "2026-04-10", title: "Panen Bersama", description: "Pencabutan kacang tanah dan pemotongan jagung kering jemur.", status: "Completed" }
        ],
        documents: []
    },
    {
        id: "prj-010",
        farmerId: "frm-002",
        title: "Produksi Sayuran Daun Hidroponik Komersial",
        category: "Hortikutura",
        cropType: "Sayuran Organik",
        description: "Budidaya selada kriting hijau, romaine, dan kale menggunakan sistem air nutrisi tergenang atau NFT (Nutrient Film Technique). Jaminan pasokan stabil sepanjang tahun.",
        location: "Sukabumi, Jawa Barat",
        landSize: "800 m²",
        images: [
            "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 85000000,
        collectedFunding: 85000000,
        fundingProgress: 100,
        minimumInvestment: 5000000,
        estimatedROI: 14.0,
        durationMonths: 3,
        startDate: "2026-05-15",
        harvestDate: "2026-08-15",
        status: "Running",
        riskLevel: "Low",
        riskDescription: "Penyakit akar busuk dapat terjadi jika sirkulasi oksigen air lambat. Dipasang pompa cadangan dan aki baterai otomatis.",
        timeline: [
            { date: "2026-05-18", title: "Sterilisasi Gutter Hidroponik", description: "Pembersihan seluruh pipa paralon dengan cairan khusus.", status: "Completed" },
            { date: "2026-06-15", title: "Pindah Tanam Netpot", description: "Pemindahan bibit semai rockwool ke lubang tanam pipa.", status: "Completed" }
        ],
        documents: []
    },
    {
        id: "prj-011",
        farmerId: "frm-004",
        title: "Intensifikasi Cabai Merah Keriting Brebes",
        category: "Hortikutura",
        cropType: "Cabai",
        description: "Pendanaan untuk pemupukan intensif menggunakan pupuk majemuk kalium tinggi dan kalsium guna meningkatkan ketahanan buah cabai merah dari serangan busuk buah antraknosa.",
        location: "Brebes, Jawa Tengah",
        landSize: "1 Hektar",
        images: [
            "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 70000000,
        collectedFunding: 70000000,
        fundingProgress: 100,
        minimumInvestment: 2500000,
        estimatedROI: 16.0,
        durationMonths: 5,
        startDate: "2026-03-10",
        harvestDate: "2026-08-10",
        status: "Running",
        riskLevel: "Medium",
        riskDescription: "Serangan lalat buah diatasi dengan perangkap lem lalat metil eugenol ramah lingkungan.",
        timeline: [
            { date: "2026-03-15", title: "Penanaman Bibit", description: "Penanaman bibit umur 25 hari dari persemaian.", status: "Completed" },
            { date: "2026-05-20", title: "Pemasangan Ajir (Lanjaran)", description: "Pengikatan batang cabai ke kayu penyangga agar tegak.", status: "Completed" }
        ],
        documents: []
    },
    {
        id: "prj-012",
        farmerId: "frm-008",
        title: "Tani Mandiri Jagung Manis Super",
        category: "Pangan",
        cropType: "Jagung",
        description: "Budidaya jagung manis bertongkol ganda dengan rasa sangat manis dan kadar air tinggi. Pangsa pasar ditargetkan masuk industri jasuke dan lapak penjual jagung bakar perkotaan.",
        location: "Karawang, Jawa Barat",
        landSize: "1.2 Hektar",
        images: [
            "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600"
        ],
        targetFunding: 55000000,
        collectedFunding: 20000000,
        fundingProgress: 36.3,
        minimumInvestment: 2000000,
        estimatedROI: 12.5,
        durationMonths: 3,
        startDate: "2026-08-01",
        harvestDate: "2026-11-01",
        status: "Funding",
        riskLevel: "Low",
        riskDescription: "Hama ulat gerandong daun dapat diantisipasi dengan pemantauan fisik berkala sejak tunas muncul.",
        timeline: [],
        documents: []
    }
];

// ====================================
// 4. Investments
// ====================================
export const investments = [
    {
        id: "ivs-001",
        investorId: "inv-001",
        projectId: "prj-001",
        investmentDate: "2026-02-10",
        amount: 30000000,
        ownershipPercentage: 30.0,
        status: "Active",
        projectProgress: 65,
        estimatedReturn: 34350000, // 30M + 14.5% profit
        currentProfit: 1500000,
        paymentHistory: [
            { date: "2026-04-15", amount: 750000, type: "Dividen Pertama", status: "Paid" },
            { date: "2026-06-15", amount: 750000, type: "Dividen Kedua", status: "Paid" }
        ]
    },
    {
        id: "ivs-002",
        investorId: "inv-001",
        projectId: "prj-003",
        investmentDate: "2026-01-15",
        amount: 50000000,
        ownershipPercentage: 33.3,
        status: "Active",
        projectProgress: 50,
        estimatedReturn: 58000000, // 50M + 16% profit
        currentProfit: 3000000,
        paymentHistory: [
            { date: "2026-05-01", amount: 3000000, type: "Bagi Hasil Kuartalan", status: "Paid" }
        ]
    },
    {
        id: "ivs-003",
        investorId: "inv-001",
        projectId: "prj-004",
        investmentDate: "2026-04-01",
        amount: 25000000,
        ownershipPercentage: 31.25,
        status: "Active",
        projectProgress: 90,
        estimatedReturn: 28750000, // 25M + 15% profit
        currentProfit: 2000000,
        paymentHistory: [
            { date: "2026-05-15", amount: 2000000, type: "Bagi Hasil Awal", status: "Paid" }
        ]
    },
    {
        id: "ivs-004",
        investorId: "inv-001",
        projectId: "prj-005",
        investmentDate: "2026-02-01",
        amount: 20000000,
        ownershipPercentage: 40.0,
        status: "Completed",
        projectProgress: 100,
        estimatedReturn: 22400000, // 20M + 12% profit
        currentProfit: 2400000,
        paymentHistory: [
            { date: "2026-04-15", amount: 22400000, type: "Pengembalian Pokok & Hasil", status: "Paid" }
        ]
    },
    {
        id: "ivs-005",
        investorId: "inv-002",
        projectId: "prj-001",
        investmentDate: "2026-02-10",
        amount: 40000000,
        ownershipPercentage: 40.0,
        status: "Active",
        projectProgress: 65,
        estimatedReturn: 45800000,
        currentProfit: 2000000,
        paymentHistory: [
            { date: "2026-04-15", amount: 2000000, type: "Dividen Pertama", status: "Paid" }
        ]
    },
    {
        id: "ivs-006",
        investorId: "inv-002",
        projectId: "prj-007",
        investmentDate: "2025-05-01",
        amount: 30000000,
        ownershipPercentage: 33.3,
        status: "Completed",
        projectProgress: 100,
        estimatedReturn: 34500000, // 30M + 15%
        currentProfit: 4500000,
        paymentHistory: [
            { date: "2026-05-15", amount: 34500000, type: "Pelunasan Investasi Pokok & Bagi Hasil", status: "Paid" }
        ]
    },
    {
        id: "ivs-007",
        investorId: "inv-002",
        projectId: "prj-008",
        investmentDate: "2026-03-01",
        amount: 30000000,
        ownershipPercentage: 27.27,
        status: "Active",
        projectProgress: 80,
        estimatedReturn: 34950000,
        currentProfit: 0,
        paymentHistory: []
    },
    {
        id: "ivs-008",
        investorId: "inv-003",
        projectId: "prj-009",
        investmentDate: "2026-01-10",
        amount: 60000000,
        ownershipPercentage: 100.0,
        status: "Completed",
        projectProgress: 100,
        estimatedReturn: 67800000, // 60M + 13% profit
        currentProfit: 7800000,
        paymentHistory: [
            { date: "2026-04-10", amount: 67800000, type: "Pelunasan Pokok & Hasil Panen Jagung", status: "Paid" }
        ]
    },
    {
        id: "ivs-009",
        investorId: "inv-003",
        projectId: "prj-010",
        investmentDate: "2026-05-15",
        amount: 40000000,
        ownershipPercentage: 47.05,
        status: "Active",
        projectProgress: 40,
        estimatedReturn: 45600000,
        currentProfit: 1000000,
        paymentHistory: []
    },
    {
        id: "ivs-010",
        investorId: "inv-001",
        projectId: "prj-011",
        investmentDate: "2026-03-10",
        amount: 25000000,
        ownershipPercentage: 35.71,
        status: "Active",
        projectProgress: 75,
        estimatedReturn: 29000000,
        currentProfit: 0,
        paymentHistory: []
    }
];

// ====================================
// 5. Investment Performance (untuk Grafik Chart)
// ====================================
export const investmentPerformance = [
    // Data inv-001
    { id: "perf-001", investorId: "inv-001", period: "Januari", totalInvestment: 50000000, profit: 0, ROI: 0, growthPercentage: 0 },
    { id: "perf-002", investorId: "inv-001", period: "Februari", totalInvestment: 100000000, profit: 0, ROI: 0, growthPercentage: 100.0 },
    { id: "perf-003", investorId: "inv-001", period: "Maret", totalInvestment: 150000000, profit: 0, ROI: 0, growthPercentage: 50.0 },
    { id: "perf-004", investorId: "inv-001", period: "April", totalInvestment: 150000000, profit: 3150000, ROI: 2.1, growthPercentage: 0 },
    { id: "perf-005", investorId: "inv-001", period: "Mei", totalInvestment: 150000000, profit: 8150000, ROI: 5.4, growthPercentage: 0 },
    { id: "perf-006", investorId: "inv-001", period: "Juni", totalInvestment: 150000000, profit: 8900000, ROI: 5.9, growthPercentage: 0 },

    // Data inv-002
    { id: "perf-007", investorId: "inv-002", period: "Januari", totalInvestment: 0, profit: 0, ROI: 0, growthPercentage: 0 },
    { id: "perf-008", investorId: "inv-002", period: "Februari", totalInvestment: 40000000, profit: 0, ROI: 0, growthPercentage: 100.0 },
    { id: "perf-009", investorId: "inv-002", period: "Maret", totalInvestment: 70000000, profit: 0, ROI: 0, growthPercentage: 75.0 },
    { id: "perf-010", investorId: "inv-002", period: "April", totalInvestment: 70000000, profit: 2000000, ROI: 2.85, growthPercentage: 0 },
    { id: "perf-011", investorId: "inv-002", period: "Mei", totalInvestment: 70000000, profit: 6500000, ROI: 9.28, growthPercentage: 0 },

    // Data inv-003
    { id: "perf-012", investorId: "inv-003", period: "Januari", totalInvestment: 60000000, profit: 0, ROI: 0, growthPercentage: 0 },
    { id: "perf-013", investorId: "inv-003", period: "Februari", totalInvestment: 60000000, profit: 0, ROI: 0, growthPercentage: 0 },
    { id: "perf-014", investorId: "inv-003", period: "Maret", totalInvestment: 60000000, profit: 0, ROI: 0, growthPercentage: 0 },
    { id: "perf-015", investorId: "inv-003", period: "April", totalInvestment: 60000000, profit: 7800000, ROI: 13.0, growthPercentage: 0 },
    { id: "perf-016", investorId: "inv-003", period: "Mei", totalInvestment: 100000000, profit: 7800000, ROI: 7.8, growthPercentage: 66.6 }
];

// ====================================
// 6. Portfolio Summary
// ====================================
export const portfolioSummary = [
    {
        investorId: "inv-001",
        totalAssets: 158900000, // totalInvested + totalProfit
        totalInvestment: 150000000,
        totalProfit: 8900000,
        averageROI: 14.8,
        diversification: [
            { category: "Pangan", percentage: 20.0, amount: 30000000 },
            { category: "Perkebunan", percentage: 33.3, amount: 50000000 },
            { category: "Hortikutura", percentage: 46.7, amount: 70000000 }
        ]
    },
    {
        investorId: "inv-002",
        totalAssets: 74500000,
        totalInvestment: 70000000,
        totalProfit: 4500000,
        averageROI: 15.3,
        diversification: [
            { category: "Pangan", percentage: 57.1, amount: 40000000 },
            { category: "Perkebunan", percentage: 42.9, amount: 30000000 }
        ]
    },
    {
        investorId: "inv-003",
        totalAssets: 106800000,
        totalInvestment: 100000000,
        totalProfit: 6800000,
        averageROI: 12.75,
        diversification: [
            { category: "Pangan", percentage: 60.0, amount: 60000000 },
            { category: "Hortikutura", percentage: 40.0, amount: 40000000 }
        ]
    }
];

// ====================================
// 7. Portfolio Distribution
// ====================================
export const portfolioDistribution = [
    {
        investorId: "inv-001",
        commodityDistribution: [
            { commodity: "Padi", percentage: 20.0 },
            { commodity: "Kopi", percentage: 33.3 },
            { commodity: "Bawang Merah", percentage: 16.7 },
            { commodity: "Sayuran Organik", percentage: 13.3 },
            { commodity: "Cabai", percentage: 16.7 }
        ],
        regionDistribution: [
            { region: "Cianjur", percentage: 33.3 },
            { region: "Bangli", percentage: 33.3 },
            { region: "Brebes", percentage: 33.4 }
        ]
    },
    {
        investorId: "inv-002",
        commodityDistribution: [
            { commodity: "Padi", percentage: 57.1 },
            { commodity: "Kopi", percentage: 42.9 }
        ],
        regionDistribution: [
            { region: "Cianjur", percentage: 57.1 },
            { region: "Tabanan", percentage: 42.9 }
        ]
    },
    {
        investorId: "inv-003",
        commodityDistribution: [
            { commodity: "Jagung", percentage: 60.0 },
            { commodity: "Sayuran Organik", percentage: 40.0 }
        ],
        regionDistribution: [
            { region: "Malang", percentage: 60.0 },
            { region: "Sukabumi", percentage: 40.0 }
        ]
    }
];

// ====================================
// 8. Chats (5 Percakapan)
// ====================================
export const chats = [
    {
        id: "chat-001",
        investorId: "inv-001",
        farmerId: "frm-001",
        projectId: "prj-001",
        lastMessage: "Sama-sama pak, semoga hasilnya terus bagus mendekati panen.",
        lastMessageTime: "2026-07-09T14:20:00Z",
        unreadCount: 0,
        onlineStatus: "Online",
        messages: [
            { id: "msg-101", sender: "farmer", message: "Halo pak Budi, berikut saya kirim foto terbaru perkembangan padi Pandanwangi.", timestamp: "2026-07-09T14:15:00Z", attachment: { type: "image", url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600" } },
            { id: "msg-102", sender: "farmer", message: "Tanaman padi sekarang sudah mulai menguning rata pak.", timestamp: "2026-07-09T14:16:00Z", attachment: null },
            { id: "msg-103", sender: "investor", message: "Luar biasa Pak Joko, rapi sekali barisan tanamannya. Terima kasih atas laporannya.", timestamp: "2026-07-09T14:18:00Z", attachment: null },
            { id: "msg-104", sender: "investor", message: "Sama-sama pak, semoga hasilnya terus bagus mendekati panen.", timestamp: "2026-07-09T14:20:00Z", attachment: null }
        ]
    },
    {
        id: "chat-002",
        investorId: "inv-001",
        farmerId: "frm-003",
        projectId: "prj-003",
        lastMessage: "Bagaimana persiapan berkas audit dari dinas setempat?",
        lastMessageTime: "2026-07-09T09:12:00Z",
        unreadCount: 1,
        onlineStatus: "Offline",
        messages: [
            { id: "msg-201", sender: "farmer", message: "Selamat pagi Pak Budi. Terkait pengajuan kelayakan ekspor kopi kita sudah disetujui instansi daerah.", timestamp: "2026-07-09T09:05:00Z", attachment: null },
            { id: "msg-202", sender: "investor", message: "Kabar bagus pak! Bagaimana persiapan berkas audit dari dinas setempat?", timestamp: "2026-07-09T09:12:00Z", attachment: null }
        ]
    },
    {
        id: "chat-003",
        investorId: "inv-001",
        farmerId: "frm-004",
        projectId: "prj-004",
        lastMessage: "Baik pak, besok pagi tim kami akan lakukan proses sortir pasca-panen.",
        lastMessageTime: "2026-07-08T16:30:00Z",
        unreadCount: 0,
        onlineStatus: "Online",
        messages: [
            { id: "msg-301", sender: "investor", message: "Pak Ahmad, apakah bawang merahnya sudah ditiriskan semua?", timestamp: "2026-07-08T16:20:00Z", attachment: null },
            { id: "msg-302", sender: "farmer", message: "Sudah pak, sebagian besar sudah berada di para-para gudang pengasapan.", timestamp: "2026-07-08T16:25:00Z", attachment: null },
            { id: "msg-303", sender: "farmer", message: "Baik pak, besok pagi tim kami akan lakukan proses sortir pasca-panen.", timestamp: "2026-07-08T16:30:00Z", attachment: null }
        ]
    },
    {
        id: "chat-004",
        investorId: "inv-002",
        farmerId: "frm-001",
        projectId: "prj-001",
        lastMessage: "Apakah bagi hasil bulan ini sudah masuk ke saldo?",
        lastMessageTime: "2026-07-09T11:00:00Z",
        unreadCount: 1,
        onlineStatus: "Online",
        messages: [
            { id: "msg-401", sender: "farmer", message: "Ibu Siti, terima kasih sudah mendukung proyek sawah kami.", timestamp: "2026-07-09T10:50:00Z", attachment: null },
            { id: "msg-402", sender: "investor", message: "Sama-sama Bu Sri/Pak Joko. Apakah bagi hasil bulan ini sudah masuk ke saldo?", timestamp: "2026-07-09T11:00:00Z", attachment: null }
        ]
    },
    {
        id: "chat-005",
        investorId: "inv-003",
        farmerId: "frm-002",
        projectId: "prj-010",
        lastMessage: "Nanti saya infokan kembali pas jadwal panen bayam merah.",
        lastMessageTime: "2026-07-08T10:00:00Z",
        unreadCount: 0,
        onlineStatus: "Offline",
        messages: [
            { id: "msg-501", sender: "investor", message: "Bu Sri, bagaimana tumbuh kembang selada hidroponiknya?", timestamp: "2026-07-08T09:45:00Z", attachment: null },
            { id: "msg-502", sender: "farmer", message: "Tumbuh subur pak Andi, daunnya hijau segar bebas pestisida kimia.", timestamp: "2026-07-08T09:55:00Z", attachment: { type: "image", url: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600" } },
            { id: "msg-503", sender: "farmer", message: "Nanti saya infokan kembali pas jadwal panen bayam merah.", timestamp: "2026-07-08T10:00:00Z", attachment: null }
        ]
    }
];

// ====================================
// 9. Notifications (15 Notifikasi)
// ====================================
export const notifications = [
    {
        id: "notif-001",
        investorId: "inv-001",
        type: "FUND_RECEIVED",
        title: "Deposit Berhasil",
        message: "Deposit sebesar Rp 50.000.000 berhasil masuk ke rekening virtual dashboard Anda.",
        relatedId: "tx-001",
        isRead: true,
        createdAt: "2026-01-10T10:15:00Z"
    },
    {
        id: "notif-002",
        investorId: "inv-001",
        type: "PROJECT_STARTED",
        title: "Proyek Padi Dimulai",
        message: "Selamat! Proyek sawah padi Pandanwangi Cianjur telah memulai tahap tanam perdana.",
        relatedId: "prj-001",
        isRead: true,
        createdAt: "2026-02-10T08:00:00Z"
    },
    {
        id: "notif-003",
        investorId: "inv-001",
        type: "FARM_UPDATE",
        title: "Update Perkembangan Lahan",
        message: "Pak Joko mengunggah pembaruan foto pembibitan padi di areal sawah Malang.",
        relatedId: "prj-001",
        isRead: true,
        createdAt: "2026-03-01T14:30:00Z"
    },
    {
        id: "notif-004",
        investorId: "inv-001",
        type: "NEW_MESSAGE",
        title: "Pesan Baru",
        message: "Pak Wayan Sudarta mengirim pesan mengenai progres perkebunan kopi Arabika.",
        relatedId: "chat-002",
        isRead: false,
        createdAt: "2026-07-09T09:12:00Z"
    },
    {
        id: "notif-005",
        investorId: "inv-001",
        type: "HARVEST_SCHEDULE",
        title: "Jadwal Panen Ditetapkan",
        message: "Proyek Bawang Merah Bima Brebes dijadwalkan masuk masa panen pada akhir bulan Juni.",
        relatedId: "prj-004",
        isRead: true,
        createdAt: "2026-06-10T11:00:00Z"
    },
    {
        id: "notif-006",
        investorId: "inv-001",
        type: "PROFIT_SHARED",
        title: "Bagi Hasil Diterima",
        message: "Dana profit sebesar Rp 2.400.000 dari proyek Sayuran Organik Cianjur sudah dikreditkan ke wallet.",
        relatedId: "tx-008",
        isRead: true,
        createdAt: "2026-04-15T17:00:00Z"
    },
    {
        id: "notif-007",
        investorId: "inv-001",
        type: "FARM_UPDATE",
        title: "Laporan Mingguan Masuk",
        message: "Laporan mingguan: Pengendalian hama ulat grayak pada proyek Cabai Merah Brebes berjalan sukses.",
        relatedId: "prj-011",
        isRead: false,
        createdAt: "2026-07-08T16:45:00Z"
    },
    {
        id: "notif-008",
        investorId: "inv-001",
        type: "FUND_RECEIVED",
        title: "Deposit Sukses",
        message: "Deposit dana sebesar Rp 30.000.000 via BCA Virtual Account telah terverifikasi.",
        relatedId: "tx-005",
        isRead: true,
        createdAt: "2026-03-01T09:05:00Z"
    },
    {
        id: "notif-009",
        investorId: "inv-002",
        type: "PROJECT_STARTED",
        title: "Proyek Padi Hitam Berjalan",
        message: "Dana terpenuhi! Proyek Budidaya Padi Hitam Organik kini resmi berstatus Running.",
        relatedId: "prj-008",
        isRead: true,
        createdAt: "2026-03-05T08:15:00Z"
    },
    {
        id: "notif-010",
        investorId: "inv-002",
        type: "PROFIT_SHARED",
        title: "Hasil Panen Dibagi",
        message: "Bagi hasil proyek Kopi Robusta Tabanan sebesar Rp 4.500.000 telah masuk dompet digital.",
        relatedId: "tx-016",
        isRead: true,
        createdAt: "2026-05-15T18:00:00Z"
    },
    {
        id: "notif-011",
        investorId: "inv-003",
        type: "FARM_UPDATE",
        title: "Pemupukan Vegetatif Selesai",
        message: "Pak Joko melakukan pemupukan fase kedua pada tanaman Jagung Hibrida Malang.",
        relatedId: "prj-009",
        isRead: true,
        createdAt: "2026-02-25T10:00:00Z"
    },
    {
        id: "notif-012",
        investorId: "inv-003",
        type: "HARVEST_SCHEDULE",
        title: "Panen Jagung Selesai",
        message: "Proyek Jagung Hibrida Malang telah selesai dipanen dengan tonase hasil memuaskan.",
        relatedId: "prj-009",
        isRead: true,
        createdAt: "2026-04-10T15:30:00Z"
    },
    {
        id: "notif-013",
        investorId: "inv-001",
        type: "NEW_MESSAGE",
        title: "Pesan Baru",
        message: "Pak Joko Susilo mengirim pesan tentang penanganan hujan lebat di Malang.",
        relatedId: "chat-001",
        isRead: false,
        createdAt: "2026-07-09T14:20:00Z"
    },
    {
        id: "notif-014",
        investorId: "inv-001",
        type: "FARM_UPDATE",
        title: "Instalasi Fisik Greenhouse",
        message: "Greenhouse Tomat Sukabumi memasuki tahap akhir instalasi atap plastik UV.",
        relatedId: "prj-002",
        isRead: false,
        createdAt: "2026-07-08T09:00:00Z"
    },
    {
        id: "notif-015",
        investorId: "inv-002",
        type: "NEW_MESSAGE",
        title: "Diskusi Pembagian Hasil",
        message: "Bu Sri Utami mengirimi Anda pesan koordinasi pengiriman laba.",
        relatedId: "chat-004",
        isRead: false,
        createdAt: "2026-07-09T11:00:00Z"
    }
];

// ====================================
// 10. Transactions (20 Transaksi)
// ====================================
export const transactions = [
    // Transaksi Investor 1 (inv-001)
    { id: "tx-001", investorId: "inv-001", type: "Deposit", amount: 50000000, date: "2026-01-10", status: "Success", invoiceNumber: "TXN-20260110-001", paymentMethod: "BCA Transfer", proofUrl: "https://example.com/proofs/tx001.jpg" },
    { id: "tx-002", investorId: "inv-001", type: "Deposit", amount: 100000000, date: "2026-02-05", status: "Success", invoiceNumber: "TXN-20260205-002", paymentMethod: "Mandiri Virtual Account", proofUrl: "https://example.com/proofs/tx002.jpg" },
    { id: "tx-003", investorId: "inv-001", type: "Investment", amount: 30000000, date: "2026-02-10", status: "Success", invoiceNumber: "TXN-20260210-003", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-004", investorId: "inv-001", type: "Investment", amount: 50000000, date: "2026-02-15", status: "Success", invoiceNumber: "TXN-20260215-004", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-005", investorId: "inv-001", type: "Deposit", amount: 30000000, date: "2026-03-01", status: "Success", invoiceNumber: "TXN-20260301-005", paymentMethod: "BCA Virtual Account", proofUrl: "https://example.com/proofs/tx005.jpg" },
    { id: "tx-006", investorId: "inv-001", type: "Investment", amount: 25000000, date: "2026-03-05", status: "Success", invoiceNumber: "TXN-20260305-006", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-007", investorId: "inv-001", type: "Investment", amount: 20000000, date: "2026-03-12", status: "Success", invoiceNumber: "TXN-20260312-007", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-008", investorId: "inv-001", type: "Return", amount: 22400000, date: "2026-04-15", status: "Success", invoiceNumber: "TXN-20260415-008", paymentMethod: "Wallet Balance", proofUrl: null }, // Return Pokok & Hasil prj-005
    { id: "tx-009", investorId: "inv-001", type: "Withdraw", amount: 10000000, date: "2026-04-20", status: "Success", invoiceNumber: "TXN-20260420-009", paymentMethod: "BCA Transfer", proofUrl: null },
    { id: "tx-010", investorId: "inv-001", type: "Investment", amount: 25000000, date: "2026-05-10", status: "Success", invoiceNumber: "TXN-20260510-010", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-011", investorId: "inv-001", type: "Return", amount: 3500000, date: "2026-06-15", status: "Success", invoiceNumber: "TXN-20260615-011", paymentMethod: "Wallet Balance", proofUrl: null }, // Profit share
    { id: "tx-012", investorId: "inv-001", type: "Withdraw", amount: 10000000, date: "2026-06-20", status: "Success", invoiceNumber: "TXN-20260620-012", paymentMethod: "BCA Transfer", proofUrl: null },

    // Transaksi Investor 2 (inv-002)
    { id: "tx-013", investorId: "inv-002", type: "Deposit", amount: 80000000, date: "2026-02-20", status: "Success", invoiceNumber: "TXN-20260220-013", paymentMethod: "BRI Virtual Account", proofUrl: "https://example.com/proofs/tx013.jpg" },
    { id: "tx-014", investorId: "inv-002", type: "Investment", amount: 40000000, date: "2026-02-22", status: "Success", invoiceNumber: "TXN-20260222-014", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-015", investorId: "inv-002", type: "Investment", amount: 30000000, date: "2026-03-10", status: "Success", invoiceNumber: "TXN-20260310-015", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-016", investorId: "inv-002", type: "Return", amount: 34500000, date: "2026-05-15", status: "Success", invoiceNumber: "TXN-20260515-016", paymentMethod: "Wallet Balance", proofUrl: null }, // Return Pokok & Hasil prj-007
    { id: "tx-017", investorId: "inv-002", type: "Withdraw", amount: 5000000, date: "2026-05-20", status: "Success", invoiceNumber: "TXN-20260520-017", paymentMethod: "BNI Transfer", proofUrl: null },

    // Transaksi Investor 3 (inv-003)
    { id: "tx-018", investorId: "inv-003", type: "Deposit", amount: 120000000, date: "2026-01-15", status: "Success", invoiceNumber: "TXN-20260115-018", paymentMethod: "Permata Virtual Account", proofUrl: "https://example.com/proofs/tx018.jpg" },
    { id: "tx-019", investorId: "inv-003", type: "Investment", amount: 60000000, date: "2026-01-20", status: "Success", invoiceNumber: "TXN-20260120-019", paymentMethod: "Wallet Balance", proofUrl: null },
    { id: "tx-020", investorId: "inv-003", type: "Investment", amount: 40000000, date: "2026-05-15", status: "Success", invoiceNumber: "TXN-20260515-020", paymentMethod: "Wallet Balance", proofUrl: null }
];

// ====================================
// 11. Wallet
// ====================================
export const wallet = [
    {
        investorId: "inv-001",
        balance: 15900000, // 180M (Deposit) - 150M (Invest) + 25.9M (Return & Profit) - 20M (Withdraw) = 35.9M - 20M = 15.9M
        totalDeposit: 180000000,
        totalWithdraw: 20000000,
        bankAccount: {
            bankName: "Bank Central Asia (BCA)",
            accountNumber: "8012349000",
            accountHolder: "Budi Santoso"
        }
    },
    {
        investorId: "inv-002",
        balance: 39500000, // 80M (Deposit) - 70M (Invest) + 34.5M (Return) - 5M (Withdraw) = 39.5M
        totalDeposit: 80000000,
        totalWithdraw: 5000000,
        bankAccount: {
            bankName: "Bank Negara Indonesia (BNI)",
            accountNumber: "0998877665",
            accountHolder: "Siti Rahma"
        }
    },
    {
        investorId: "inv-003",
        balance: 20000000, // 120M (Deposit) - 100M (Invest) + 0 (No returns yet) = 20M
        totalDeposit: 120000000,
        totalWithdraw: 0,
        bankAccount: {
            bankName: "Bank Mandiri",
            accountNumber: "1420012345678",
            accountHolder: "Andi Wijaya"
        }
    }
];

// ====================================
// 12. Wallet History (Log Riwayat Wallet)
// ====================================
export const walletHistory = [
    { id: "wh-001", investorId: "inv-001", type: "Deposit", amount: 50000000, description: "Deposit masuk via BCA", date: "2026-01-10T10:15:00Z" },
    { id: "wh-002", investorId: "inv-001", type: "Deposit", amount: 100000000, description: "Deposit masuk via Mandiri", date: "2026-02-05T08:30:00Z" },
    { id: "wh-003", investorId: "inv-001", type: "Investment", amount: -30000000, description: "Investasi pada Proyek Padi Pandanwangi", date: "2026-02-10T09:00:00Z" },
    { id: "wh-004", investorId: "inv-001", type: "Investment", amount: -50000000, description: "Investasi pada Proyek Kopi Arabika", date: "2026-02-15T10:10:00Z" },
    { id: "wh-005", investorId: "inv-001", type: "Deposit", amount: 30000000, description: "Deposit masuk via BCA", date: "2026-03-01T09:00:00Z" },
    { id: "wh-006", investorId: "inv-001", type: "Investment", amount: -25000000, description: "Investasi pada Proyek Bawang Merah Bima", date: "2026-03-05T13:45:00Z" },
    { id: "wh-007", investorId: "inv-001", type: "Investment", amount: -20000000, description: "Investasi pada Proyek Sayuran Organik", date: "2026-03-12T11:20:00Z" },
    { id: "wh-008", investorId: "inv-001", type: "Return", amount: 22400000, description: "Pengembalian dana + bagi hasil proyek Sayuran Organik", date: "2026-04-15T17:00:00Z" },
    { id: "wh-009", investorId: "inv-001", type: "Withdraw", amount: -10000000, description: "Penarikan saldo ke Rekening BCA", date: "2026-04-20T14:00:00Z" },
    { id: "wh-010", investorId: "inv-001", type: "Investment", amount: -25000000, description: "Investasi pada Proyek Cabai Merah Keriting", date: "2026-05-10T16:00:00Z" },
    { id: "wh-011", investorId: "inv-001", type: "Return", amount: 3500000, description: "Pembagian hasil dividen bulanan", date: "2026-06-15T10:00:00Z" },
    { id: "wh-012", investorId: "inv-001", type: "Withdraw", amount: -10000000, description: "Penarikan saldo ke Rekening BCA", date: "2026-06-20T11:15:00Z" }
];

// ====================================
// 13. Investor Settings
// ====================================
export const investorSettings = [
    {
        investorId: "inv-001",
        profileVisibility: "Public",
        emailNotification: true,
        pushNotification: true,
        transactionNotification: true,
        securityLevel: "High",
        twoFactorAuth: true,
        linkedBank: "BCA - 801****000"
    },
    {
        investorId: "inv-002",
        profileVisibility: "Private",
        emailNotification: true,
        pushNotification: false,
        transactionNotification: true,
        securityLevel: "Medium",
        twoFactorAuth: false,
        linkedBank: "BNI - 099****665"
    },
    {
        investorId: "inv-003",
        profileVisibility: "Public",
        emailNotification: false,
        pushNotification: true,
        transactionNotification: true,
        securityLevel: "High",
        twoFactorAuth: true,
        linkedBank: "Mandiri - 1420******678"
    }
];