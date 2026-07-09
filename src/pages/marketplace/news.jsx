import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    Calendar,
    User,
    Eye,
    Tag,
    X,
    Clock,
    Newspaper,
    Sprout,
    TrendingUp,
    Lightbulb,
    Cpu,
    Users,
    Coins,
    ArrowRight,
    ChevronRight,
    TrendingDown
} from 'lucide-react';
import Navbar from '../../components/marketplace/navbar.jsx';

// ==========================================
// DATA DUMMY: 12 ARTIKEL BERITA DETAIL
// ==========================================
const NEWS_DATA = [
    {
        id: 1,
        title: "Teknologi AI Membantu Petani Meningkatkan Hasil Panen",
        image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80",
        category: "Teknologi",
        date: "8 Juli 2026",
        author: "Agrobusiness Team",
        views: 1420,
        summary: "Pelajari bagaimana implementasi kecerdasan buatan (AI) membantu mengoptimalkan sektor pertanian modern melalui deteksi dini kesehatan tanah.",
        content: [
            "Perkembangan teknologi kecerdasan buatan (AI) kini telah merambah sektor pertanian Indonesia, membawa angin segar bagi para petani lokal dalam upaya meningkatkan produktivitas lahan secara eksponensial. Sistem kecerdasan buatan ini bekerja dengan menganalisis data tanah, memprediksi perubahan pola cuaca, hingga mendeteksi keberadaan hama secara dini menggunakan sensor pintar dan citra satelit.",
            "Salah satu kendala utama pertanian tradisional adalah keterlambatan deteksi penyakit tanaman. Melalui implementasi teknologi AI, petani cukup mengarahkan kamera ponsel ke arah daun yang layu, dan aplikasi berbasis AI akan mendiagnosis jenis patogen serta memberikan rekomendasi solusi penanganan yang ramah lingkungan dalam hitungan detik.",
            "Dampak positif langsung dirasakan oleh berbagai kelompok tani di dataran tinggi Jawa. Berdasarkan data evaluasi lapangan, penggunaan sistem rekomendasi pemupukan berbasis sensor AI berhasil memangkas biaya operasional pembelian pupuk hingga 30% sekaligus menaikkan tonase hasil panen bersih hingga mencapai 18% per hektar.",
            "Tentu saja, tantangan terbesar saat ini adalah pemerataan edukasi digital kepada para petani di pelosok daerah. Oleh karena itu, kolaborasi erat antara startup teknologi agribisnis lokal dan penyuluh pertanian pemerintah sangat krusial guna mempercepat adopsi teknologi tepat guna ini secara berkelanjutan.",
            "Ke depan, integrasi kecerdasan buatan diproyeksikan akan dikombinasikan dengan sistem robotika penyiram otomatis dan drone pemantau suhu udara. Transformasi pertanian digital ini diyakini akan memperkuat ketahanan pangan nasional di tengah tantangan pemanasan global."
        ]
    },
    {
        id: 2,
        title: "Kenaikan Harga Cabai Rawit Merah Akibat Dampak Cuaca Ekstrem",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80",
        category: "Harga Pasar",
        date: "7 Juli 2026",
        author: "Rian Hermawan",
        views: 2150,
        summary: "Harga cabai rawit merah merangkak naik secara signifikan di berbagai pasar induk akibat kegagalan panen yang disebabkan oleh tingginya curah hujan.",
        content: [
            "Harga komoditas cabai rawit merah di berbagai daerah kembali mengalami lonjakan tajam dalam sepekan terakhir. Cuaca ekstrem berupa curah hujan tinggi yang terjadi di wilayah-wilayah sentra produksi seperti Jawa Tengah dan Jawa Timur memicu pembusukan akar dini dan kegagalan pembentukan bunga tanaman cabai.",
            "Menurut laporan pedagang di pasar induk, pasokan cabai rawit merah menyusut hingga lebih dari 40% dari kuota pengiriman harian biasa. Kelangkaan barang inilah yang memicu melonjaknya harga di tingkat konsumen hingga menyentuh angka Rp 85.000 per kilogram.",
            "Kondisi ini memberikan pukulan berat bagi pelaku usaha mikro seperti pemilik warung makan katering yang sangat bergantung pada stabilitas bahan baku pedas tersebut. Beberapa pemilik usaha terpaksa mengurangi porsi cabai atau mencampurnya dengan cabai kering demi menjaga keberlangsungan margin keuntungan.",
            "Sebagai langkah penanganan, Kementerian Pertanian menyarankan para petani cabai mulai beralih menggunakan teknologi sungkup plastik penutup bedengan guna meredam benturan tetesan hujan ekstrem langsung ke struktur tanaman muda.",
            "Pemerintah juga berencana mengoptimalkan program cold storage nasional guna menyimpan cadangan pasokan cabai segar dari daerah surplus untuk didistribusikan ke daerah defisit demi menstabilkan grafik fluktuasi harga pasar."
        ]
    },
    {
        id: 3,
        title: "Tips Mengatasi Krisis Air di Lahan Pertanian saat Musim Kemarau",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
        category: "Tips",
        date: "6 Juli 2026",
        author: "Siti Nurjanah",
        views: 980,
        summary: "Temukan kiat praktis pengelolaan sumber air yang efisien melalui teknik mulsa organik dan sistem irigasi tetes mandiri.",
        content: [
            "Memasuki siklus musim kemarau, ketersediaan cadangan air di area persawahan menjadi tantangan krusial yang menuntut perhatian serius dari para petani. Tanpa sistem manajemen air yang cerdas, risiko terjadinya gagal panen akibat dehidrasi akar tanaman akan meningkat drastis.",
            "Salah satu solusi terjangkau yang sangat efektif adalah pengaplikasian teknik mulsa organik dari sisa jerami atau dedaunan kering. Lapisan mulsa ini berfungsi melindungi kelembapan alami tanah dari evaporasi matahari berlebih, sehingga intensitas penyiraman tanaman dapat dipangkas secara signifikan.",
            "Selain mulsa, transisi dari metode penyiraman genang tradisional menuju sistem irigasi tetes (drip irrigation) mandiri sangat disarankan. Sistem ini menyalurkan air secara presisi langsung ke pangkal akar tanaman menggunakan selang berlubang kecil, meniadakan pembuangan air secara sia-sia.",
            "Pemilihan jenis tanaman juga memegang peranan penting. Selama puncak musim kemarau, petani disarankan menanam komoditas palawija seperti kacang hijau, kedelai, atau sorgum yang memiliki daya tahan alami tinggi terhadap kondisi kekeringan.",
            "Dengan mengombinasikan konservasi tanah organik dan pengelolaan air hemat energi, para petani dapat menjaga produktivitas perkebunan mereka tetap stabil meskipun pasokan air dari irigasi bendungan induk menurun."
        ]
    },
    {
        id: 4,
        title: "Peluang Investasi Pertanian Hidroponik Perkotaan yang Menggiurkan",
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop&q=80",
        category: "Investasi",
        date: "5 Juli 2026",
        author: "Budi Wijaya",
        views: 1850,
        summary: "Urban farming berbasis hidroponik kini menjelma menjadi opsi investasi hijau dengan perputaran modal cepat dan pasar konsumen yang luas.",
        content: [
            "Konsep pertanian perkotaan atau urban farming kian diminati oleh para investor muda di kota-kota besar. Dengan keterbatasan lahan pekarangan di wilayah perkotaan, sistem budidaya tanaman hidroponik hadir sebagai jawaban rasional untuk memenuhi kebutuhan pangan sehat harian.",
            "Nilai investasi utama hidroponik terletak pada tingginya harga jual sayuran premium seperti selada romaine, kale, dan pakcoy organik di jaringan supermarket modern. Konsumen urban saat ini sangat peduli pada aspek kebersihan dan riwayat penggunaan pestisida.",
            "Dari sisi operasional, keunggulan hidroponik adalah fleksibilitas tata letak yang dapat menggunakan atap rumah (rooftop) serta efisiensi penggunaan air yang jauh lebih hemat dibanding media tanah konvensional karena air disirkulasikan ulang secara berkala.",
            "Analisis bisnis menunjukkan bahwa modal awal untuk instalasi pipa PVC dan greenhouse mini dapat tertutup dalam jangka waktu 4 hingga 6 kali siklus panen sayuran daun pendek yang relatif cepat (berkisar antara 30-40 hari saja).",
            "Kemitraan dengan platform marketplace agribisnis digital semakin mempercepat jalur rantai pasok pemasaran, memotong peran tengkulak sehingga margin profit langsung mengalir utuh ke saku pengelola kebun urban."
        ]
    },
    {
        id: 5,
        title: "IoT dalam Pertanian: Otomatisasi Irigasi untuk Hemat Air",
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&auto=format&fit=crop&q=80",
        category: "Teknologi",
        date: "4 Juli 2026",
        author: "Ahmad Fauzi",
        views: 1100,
        summary: "Penerapan sensor kelembapan tanah berbasis Internet of Things (IoT) membantu otomatisasi penyiraman guna menghemat penggunaan sumber daya air kebun.",
        content: [
            "Modernisasi sektor agraria kini dipercepat dengan masuknya teknologi Internet of Things (IoT) pada sistem tata kelola air perkebunan. Melalui sensor khusus yang ditancapkan ke tanah, kadar kelembapan dan keasaman tanah dapat terpantau secara real-time via aplikasi.",
            "Sistem otomatisasi ini bekerja secara cerdas: apabila kelembapan tanah terdeteksi di bawah ambang batas yang ditentukan, pompa air akan menyala secara mandiri dan menyiram area kebun. Pompa akan otomatis mati saat tanah mencapai kadar air ideal.",
            "Penerapan teknologi ini terbukti memecahkan masalah kelebihan penyiraman (over-watering) yang sering memicu pembusukan akar tanaman serta pemborosan energi listrik pompa air yang tidak perlu.",
            "Biaya penyediaan modul mikrokontroler sensor IoT kini semakin ekonomis dan dapat dioperasikan menggunakan panel surya mini sebagai sumber energi mandiri di tengah area persawahan terpencil.",
            "Implementasi IoT ini menjadi langkah konkret dalam menyongsong era pertanian cerdas (Smart Agriculture) demi tercapainya efisiensi hulu pertanian nasional yang berkelanjutan."
        ]
    },
    {
        id: 6,
        title: "Kisah Sukses Kelompok Tani Mandiri Membuka Jalur Ekspor",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
        category: "Petani",
        date: "3 Juli 2026",
        author: "Agrobusiness Team",
        views: 1670,
        summary: "Berawal dari koperasi kecil, kelompok tani asal Jawa Barat ini berhasil menembus pasar ekspor Asia dengan komoditas sayuran premium.",
        content: [
            "Sinergi dan kekompakan menjadi kunci sukses Kelompok Tani Mandiri Sejahtera dalam menembus ketatnya standar mutu pasar buah dan sayur mancanegara. Koperasi tani ini membuktikan bahwa produk lokal mampu bersaing di level internasional.",
            "Melalui pendampingan ketat mengenai teknik budidaya Good Agricultural Practices (GAP), seluruh petani anggota koperasi dilatih menerapkan prosedur kebersihan sanitasi kebun dan pencatatan riwayat tanam yang transparan.",
            "Komoditas unggulan mereka seperti buncis kenya dan wortel manis mini kini rutin diekspor ke Singapura dan Jepang dua kali dalam sepekan, memberikan peningkatan pendapatan riil bagi ratusan kepala keluarga petani.",
            "Kesuksesan ini tidak diraih secara instan. Diperlukan konsistensi tinggi dalam menjaga keseragaman ukuran, warna, serta bebas residu bahan kimia sintetis pada tiap produk sayuran yang dikemas di ruang pengepakan khusus.",
            "Langkah inspiratif Kelompok Tani Mandiri Sejahtera ini diharapkan menjadi cetak biru bagi koperasi tani lainnya di Nusantara untuk berani melakukan peningkatan standar kualitas mutu panen demi bersaing global."
        ]
    },
    {
        id: 7,
        title: "Cara Membuat Pupuk Kompos Organik Berkualitas Tinggi di Rumah",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop&q=80",
        category: "Tips",
        date: "2 Juli 2026",
        author: "Mega Utami",
        views: 1340,
        summary: "Langkah-langkah mudah mengubah limbah organik dapur menjadi pupuk kompos kaya hara pendukung kesuburan tanaman hias rumah Anda.",
        content: [
            "Mengurangi volume tumpukan sampah dapur sekaligus menyuburkan tanaman pekarangan kini dapat diwujudkan secara mandiri melalui pembuatan pupuk kompos rumah tangga berbiaya nol rupiah.",
            "Proses komposting yang sukses bergantung pada keseimbangan antara unsur karbon (sampah cokelat seperti daun kering, serbuk gergaji, atau kertas) dan nitrogen (sampah hijau seperti sisa sayuran, buah, dan ampas kopi).",
            "Pastikan tumpukan bahan organik di dalam komposter memiliki sirkulasi udara yang baik dan tingkat kelembapan menyerupai spons basah yang diperas. Lakukan pembalikan tumpukan seminggu sekali untuk mempercepat dekomposisi.",
            "Untuk menghilangkan bau tidak sedap dan mempercepat pembusukan, taburkan cairan bio-aktivator mikroba pengurai (seperti larutan EM4) yang dicampur sedikit air gula tebu alami.",
            "Dalam waktu 4 hingga 6 minggu, pupuk kompos matang berwarna hitam kecokelatan beraroma tanah hutan siap dicampurkan ke pot tanaman hias atau kebun sayuran organik pekarangan Anda."
        ]
    },
    {
        id: 8,
        title: "Analisis Stabilitas Harga Beras Nasional Menjelang Akhir Tahun",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80",
        category: "Harga Pasar",
        date: "1 Juli 2026",
        author: "Agrobusiness Team",
        views: 1590,
        summary: "Simak analisis mendalam mengenai ketersediaan stok cadangan beras bulog dalam menjaga gejolak harga pangan nasional.",
        content: [
            "Beras sebagai komoditas pangan pokok strategis nasional senantiasa mendapatkan pengawasan ketat dari pemerintah guna menjaga daya beli masyarakat di tengah dinamika inflasi global.",
            "Berdasarkan hasil pantauan gudang Bulog, cadangan beras nasional berada pada posisi aman menjelang libur akhir tahun. Distribusi beras program SPHP (Stabilisasi Pasokan dan Harga Pangan) terus digencarkan ke pasar tradisional.",
            "Langkah taktis operasi pasar terbukti ampuh meredam spekulasi harga di tingkat pedagang eceran yang kerap menaikkan margin keuntungan secara sepihak menjelang momen hari-hari besar keagamaan.",
            "Namun demikian, pengawasan ketat pada rantai logistik distribusi antar pulau tetap harus diperketat guna mencegah terjadinya penimbunan barang ilegal oleh oknum distributor nakal.",
            "Diharapkan koordinasi yang padu antara Bulog, Dinas Pertanian, serta pelaku transportasi angkutan logistik dapat memastikan keterjangkauan harga pangan merata di seluruh penjuru tanah air."
        ]
    },
    {
        id: 9,
        title: "Panduan Sukses Budidaya Buah Naga Merah Organik di Kebun",
        image: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=800&auto=format&fit=crop&q=80",
        category: "Pertanian",
        date: "30 Juni 2026",
        author: "Wayan Sudarsana",
        views: 1210,
        summary: "Pelajari teknik penanaman buah naga merah mulai dari pemilihan tiang panjat hingga tips merangsang pembungaan lebat.",
        content: [
            "Tanaman buah naga merah (Hylocereus polyrhizus) kian populer dibudidayakan karena memiliki daya tahan yang baik pada tanah berpasir kering dan nilai jual buah segar yang relatif stabil tinggi.",
            "Kunci awal kesuksesan budidaya buah naga terletak pada pembuatan tiang panjat beton kaku sebagai penopang dahan tanaman yang berkarakter menggelantung tebal dan berat.",
            "Pemangkasan dahan secara rutin sangat mutlak diperlukan guna memisahkan dahan produktif penghasil bunga dan dahan steril yang menyerap nutrisi tanah secara berlebih tanpa menghasilkan buah.",
            "Untuk meningkatkan kemanisan daging buah, gunakan pupuk kandang dari kotoran kambing matang berpadu abu sekam padi sebagai sumber kalium alami penunjang sintesis glukosa buah.",
            "Buah naga merah siap dipetik ketika kulit luarnya telah berubah merah mengkilat secara penuh dengan sisik hijau yang mulai layu melengkung indah, pertanda kematangan prima di pohon."
        ]
    },
    {
        id: 10,
        title: "Strategi Pengajuan Akses Permodalan Mikro bagi Petani Pemula",
        image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=800&auto=format&fit=crop&q=80",
        category: "Investasi",
        date: "28 Juni 2026",
        author: "Budi Wijaya",
        views: 1440,
        summary: "Panduan menyusun studi kelayakan usaha tani sederhana untuk mendapatkan suntikan modal KUR dari perbankan nasional.",
        content: [
            "Kendala permodalan awal seringkali menjadi tembok penghalang bagi para pemuda yang berminat menerjunkan diri ke dalam dunia agribisnis dan pertanian produktif.",
            "Saat ini, perbankan nasional menyediakan program Kredit Usaha Rakyat (KUR) khusus sektor pertanian dengan bunga subsidi ringan yang sangat bersahabat bagi pelaku usaha mikro perdesaan.",
            "Langkah pertama mengajukan KUR adalah menyusun proposal rencana usaha tani yang realistis, mencakup estimasi biaya benih, sewa lahan, operasional harian, serta kepastian pasar penyerap hasil panen.",
            "Memiliki catatan transaksi keuangan pribadi yang bersih dan bebas dari catatan hitam perbankan menjadi poin krusial penentu kelayakan persetujuan kredit mikro Anda.",
            "Selain perbankan konvensional, skema pendanaan urun dana (crowdfunding) berbasis teknologi keuangan syariah agribisnis kini menjadi alternatif solusi modal modern yang aman."
        ]
    },
    {
        id: 11,
        title: "Petani Milenial: Mengubah Citra Sektor Pertanian di Era Digital",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        category: "Petani",
        date: "25 Juni 2026",
        author: "Agrobusiness Team",
        views: 1980,
        summary: "Kisah inspiratif para sarjana muda yang memilih pulang kampung demi membangun sistem pertanian modern terintegrasi.",
        content: [
            "Anggapan bahwa sektor pertanian diisi oleh generasi tua yang kurang adaptif teknologi kini terpatahkan oleh maraknya kemunculan gerakan kelompok Petani Milenial di tanah air.",
            "Para lulusan perguruan tinggi ini membawa pemikiran segar berupa integrasi pemasaran digital, teknik hidroponik hemat lahan, serta efisiensi manajemen keuangan berbasis aplikasi ponsel pintar.",
            "Dengan memanfaatkan media sosial secara kreatif, mereka mampu membangun basis pelanggan loyal (direct-to-consumer) tanpa harus bergantung pada rantai tengkulak tradisional.",
            "Pemerintah terus memfasilitasi gerakan ini lewat berbagai pelatihan kewirausahaan sosial, bantuan modal benih unggul, hingga kemudahan akses alat mesin pertanian modern.",
            "Kombinasi kreativitas anak muda dan kekayaan alam Nusantara diyakini menjadi motor penggerak baru ekonomi perdesaan yang ramah lingkungan dan berorientasi jangka panjang."
        ]
    },
    {
        id: 12,
        title: "Penggunaan Drone Sensor Tanah untuk Efisiensi Pemupukan Makro",
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop&q=80",
        category: "Teknologi",
        date: "22 Juni 2026",
        author: "Ahmad Fauzi",
        views: 1530,
        summary: "Pemanfaatan teknologi pesawat tanpa awak (drone) berkamera multispektral guna memetakan sebaran kadar nitrogen sawah secara akurat.",
        content: [
            "Teknologi drone kini tidak hanya berfungsi mengambil gambar lanskap keindahan alam, melainkan bertransformasi menjadi asisten vital pemetaan hara perkebunan skala luas.",
            "Melalui sensor kamera multispektral khusus, drone mampu mendeteksi tingkat pemantulan cahaya klorofil daun tanaman padi untuk menentukan area mana yang kekurangan pupuk nitrogen.",
            "Peta sebaran nutrisi hasil penerbangan drone langsung dikonversi menjadi data instruksi pemupukan presisi, meminimalisir pembuangan pupuk kimia berlebih di area sawah yang sudah subur.",
            "Efisiensi waktu yang ditawarkan sangat revolusioner: lahan seluas 5 hektar dapat terpetakan kesehatannya hanya dalam waktu penerbangan 15 menit, menghemat tenaga kerja operasional lapangan.",
            "Penerapan presisi tinggi ini selaras dengan konsep pertanian ramah alam guna menghindari kerusakan sisa ekosistem tanah akibat akumulasi kelebihan residu kimia sintetis."
        ]
    }
];

// ==========================================
// UTILITY HELPERS
// ==========================================
const getCategoryIcon = (category) => {
    switch (category) {
        case "Pertanian": return <Sprout className="w-4 h-4" />;
        case "Harga Pasar": return <TrendingUp className="w-4 h-4" />;
        case "Teknologi": return <Cpu className="w-4 h-4" />;
        case "Petani": return <Users className="w-4 h-4" />;
        case "Tips": return <Lightbulb className="w-4 h-4" />;
        case "Investasi": return <Coins className="w-4 h-4" />;
        default: return <Newspaper className="w-4 h-4" />;
    }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function News() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [selectedNews, setSelectedNews] = useState(null);

    const categories = ["Semua", "Pertanian", "Harga Pasar", "Teknologi", "Petani", "Tips", "Investasi"];

    // Escape key closer
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedNews(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Filter berita berdasarkan Kategori dan Input Pencarian (judul, kategori, penulis)
    const filteredNews = useMemo(() => {
        return NEWS_DATA.filter((news) => {
            const matchesCategory = activeCategory === "Semua" || news.category === activeCategory;
            const query = searchTerm.toLowerCase().trim();

            const matchesSearch = !query ||
                news.title.toLowerCase().includes(query) ||
                news.category.toLowerCase().includes(query) ||
                news.author.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, activeCategory]);

    // Berita Utama (Featured News)
    // Menampilkan artikel pertama (ID 1) sebagai berita utama di bagian atas
    const featuredNews = NEWS_DATA[0];

    // Fungsi menghasilkan berita terkait secara dinamis (4 artikel acak/berbeda dari artikel aktif)
    const getRelatedNews = (currentArticle) => {
        return NEWS_DATA
            .filter((news) => news.id !== currentArticle.id)
            .slice(0, 4);
    };

    return (
        <><Navbar />
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-10 px-4 sm:px-6 lg:px-8 antialiased">
                <div className="max-w-7xl mx-auto space-y-10">

                    {/* ==========================================
            HEADER & SEARCH SECTION
            ========================================== */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200">
                        <div className="space-y-3 max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-full text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                                <Newspaper className="w-4.5 h-4.5" />
                                <span>Portal Info Pertanian</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                News Agrobusiness
                            </h1>
                            <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                                Informasi terbaru seputar pertanian, harga pasar, teknologi, dan perkembangan dunia agribisnis.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari berita, kategori, atau penulis..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* ==========================================
            CATEGORY FILTER BUTTONS
            ========================================== */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeCategory === category
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10 scale-95"
                                    : "bg-white text-slate-600 border border-gray-200 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                {getCategoryIcon(category)}
                                <span>{category}</span>
                            </button>
                        ))}
                    </div>

                    {/* ==========================================
            FEATURED NEWS BANNER (Hanya tampil jika Kategori 'Semua' / 'Teknologi' dan tidak sedang mengetik pencarian spesifik)
            ========================================== */}
                    {!searchTerm && (activeCategory === "Semua" || activeCategory === "Teknologi") && (
                        <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">

                                {/* Featured Left Text Info */}
                                <div className="p-8 sm:p-10 lg:col-span-6 space-y-5">
                                    <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                        <Cpu className="w-3.5 h-3.5" />
                                        <span>Berita Utama</span>
                                    </span>

                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                                        {featuredNews.title}
                                    </h2>

                                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                                        {featuredNews.summary}
                                    </p>

                                    {/* Meta Row */}
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4 text-emerald-600" />
                                            <span>{featuredNews.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <User className="w-4 h-4 text-blue-500" />
                                            <span>{featuredNews.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4 text-indigo-500" />
                                            <span>{featuredNews.views} Pembaca</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedNews(featuredNews)}
                                        className="inline-flex items-center space-x-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/15 transition-all duration-200"
                                    >
                                        <span>Baca Selengkapnya</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Featured Right Image */}
                                <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:h-[400px] bg-slate-100 overflow-hidden relative">
                                    <img
                                        src={featuredNews.image}
                                        alt={featuredNews.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                            </div>
                        </div>
                    )}

                    {/* ==========================================
            NEWS GRID
            ========================================== */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                            <span>Daftar Artikel Informasi</span>
                        </h3>

                        {filteredNews.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredNews.map((news) => (
                                    <div
                                        key={news.id}
                                        className="group bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                                    >
                                        {/* Photo Container */}
                                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-emerald-800 text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm flex items-center space-x-1">
                                                {getCategoryIcon(news.category)}
                                                <span>{news.category}</span>
                                            </span>
                                        </div>

                                        {/* News Content */}
                                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                            <div className="space-y-2">
                                                {/* Meta Date & Author */}
                                                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span>{news.date}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <User className="w-3.5 h-3.5 text-blue-500" />
                                                        <span className="max-w-[80px] truncate">{news.author.split(' ')[0]}</span>
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors duration-150">
                                                    {news.title}
                                                </h4>

                                                {/* Summary */}
                                                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                                                    {news.summary}
                                                </p>
                                            </div>

                                            {/* Bottom Action Footer */}
                                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex items-center space-x-1 text-xs text-slate-400">
                                                    <Eye className="w-4 h-4 text-indigo-500" />
                                                    <span>{news.views} views</span>
                                                </div>

                                                <button
                                                    onClick={() => setSelectedNews(news)}
                                                    className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-150"
                                                >
                                                    <span>Baca</span>
                                                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-150 shadow-sm max-w-md mx-auto space-y-4">
                                <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-400">
                                    <Search className="w-10 h-10" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900">Artikel Tidak Ditemukan</h3>
                                    <p className="text-sm text-slate-500 px-4">
                                        Tidak ada berita atau artikel yang cocok dengan kata kunci "{searchTerm}".
                                    </p>
                                </div>
                                <button
                                    onClick={() => { setSearchTerm(""); setActiveCategory("Semua"); }}
                                    className="text-sm font-semibold text-emerald-600 hover:underline"
                                >
                                    Reset Semua Filter
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                {/* ==========================================
          MODAL DETAIL BERITA
          ========================================== */}
                {selectedNews && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
                        {/* Backdrop closer */}
                        <div className="absolute inset-0 cursor-default" onClick={() => setSelectedNews(null)}></div>

                        {/* Modal Container */}
                        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col border border-slate-100 animate-scaleUp">

                            {/* Sticky Header Modal */}
                            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4.5 flex items-center justify-between z-20">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center space-x-1">
                                        {getCategoryIcon(selectedNews.category)}
                                        <span>{selectedNews.category}</span>
                                    </span>
                                    <span className="text-xs text-slate-400">ID Artikel: #{selectedNews.id}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedNews(null)}
                                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 sm:p-8 space-y-8">

                                {/* Header Image Cover */}
                                <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-150 shadow-inner">
                                    <img
                                        src={selectedNews.image}
                                        alt={selectedNews.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Title, Meta, and Summary */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                                        {selectedNews.title}
                                    </h2>

                                    {/* Meta details with icons */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-3 pb-4 border-y border-slate-100">
                                        <div className="flex items-center space-x-1.5">
                                            <Calendar className="w-4 h-4 text-emerald-600" />
                                            <span>Dipublikasikan: <b>{selectedNews.date}</b></span>
                                        </div>
                                        <span className="text-slate-200 hidden sm:inline">|</span>
                                        <div className="flex items-center space-x-1.5">
                                            <User className="w-4 h-4 text-blue-500" />
                                            <span>Penulis: <b>{selectedNews.author}</b></span>
                                        </div>
                                        <span className="text-slate-200 hidden sm:inline">|</span>
                                        <div className="flex items-center space-x-1.5">
                                            <Eye className="w-4 h-4 text-indigo-500" />
                                            <span>Dibaca <b>{selectedNews.views}</b> Kali</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Artikel Content */}
                                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-5 max-w-3xl">
                                    {selectedNews.content.map((paragraph, index) => (
                                        <p key={index} className="text-justify font-normal">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                {/* ==========================================
                  RELATED NEWS SECTION (Di bawah artikel modal)
                  ========================================== */}
                                <div className="pt-8 border-t border-slate-200/50 space-y-5">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-1.5">
                                        <span className="w-1.5 h-5 bg-emerald-600 rounded-full"></span>
                                        <span>Berita Terkait Lainnya</span>
                                    </h3>

                                    {/* Related Grid (Minimal 4 berita) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {getRelatedNews(selectedNews).map((related) => (
                                            <div
                                                key={related.id}
                                                onClick={() => {
                                                    setSelectedNews(related);
                                                    // Menggulung isi modal kembali ke atas ketika berpindah artikel terkait
                                                    document.querySelector('.fixed.inset-0').scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="group bg-slate-50 hover:bg-white rounded-xl border border-slate-150/60 p-3.5 space-y-3 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                                            >
                                                {/* Image Mini */}
                                                <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-200">
                                                    <img
                                                        src={related.image}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                                                    />
                                                </div>

                                                {/* Info Mini */}
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                                                        {related.category}
                                                    </span>
                                                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors duration-150">
                                                        {related.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </>
    );
}