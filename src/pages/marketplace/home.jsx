/**
 * =====================================================
 * Agrobusiness Marketplace
 * Copyright (c) 2026 iluze_ear
 * Author: iluze_ear
 * Created      : 2026-07-06
 * Last Updated : 2026-07-09
 * GitHub: https://github.com/Iluze25
 *
 * This project was created for educational purposes.
 * =====================================================
 */


import React, { useState, useEffect } from 'react';
import {
    Leaf,
    Search,
    Bell,
    Heart,
    ShoppingCart,
    User,
    Wheat,
    Apple,
    Carrot,
    Fish,
    Beef,
    Milk,
    Egg,
    Flower,
    Trees,
    Package,
    Star,
    MapPin,
    Users,
    Store,
    ShoppingBasket,
    TrendingUp,
    ShieldCheck,
    Truck,
    Wallet,
    BadgeCheck,
    Phone,
    Mail,

    Menu,
    X,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import Navbar from '../../components/marketplace/navbar.jsx';
import { useNavigate } from "react-router-dom";


export default function MarketplaceHome() {
    // Navigate
    const navigate = useNavigate();
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Modal Detail Product State
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Countdown timer state for Flash Sale
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 45,
        seconds: 10,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    clearInterval(timer);
                    return prev;
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Dummy Data Kategori
    const categories = [
        { id: 1, name: 'Biji-Bijian', icon: Wheat, color: 'bg-amber-100 text-amber-600 border-amber-200' },
        { id: 2, name: 'Buah Segar', icon: Apple, color: 'bg-red-100 text-red-600 border-red-200' },
        { id: 3, name: 'Sayuran', icon: Carrot, color: 'bg-orange-100 text-orange-600 border-orange-200' },
        { id: 4, name: 'Perikanan', icon: Fish, color: 'bg-blue-100 text-blue-600 border-blue-200' },
        { id: 5, name: 'Peternakan', icon: Beef, color: 'bg-rose-100 text-rose-600 border-rose-200' },
        { id: 6, name: 'Susu Olahan', icon: Milk, color: 'bg-sky-100 text-sky-600 border-sky-200' },
        { id: 7, name: 'Telur Segar', icon: Egg, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
        { id: 8, name: 'Tanaman Hias', icon: Flower, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
        { id: 9, name: 'Bibit Unggul', icon: Trees, color: 'bg-green-100 text-green-600 border-green-200' },
        { id: 10, name: 'Sembako', icon: Package, color: 'bg-purple-100 text-purple-600 border-purple-200' },
    ];

    // Dummy Data Flash Sale
    const flashSales = [
        {
            id: 101,
            name: 'Cabai Rawit Merah Premium 1kg',
            originalPrice: 65000,
            discountPrice: 42000,
            discountPercent: 35,
            soldPercent: 78,
            image: 'https://i.pinimg.com/736x/1a/9f/24/1a9f246c90ac21c543540da1a0327608.jpg',
            farmer: 'Kelompok Tani Subur',
            rating: 4.8,
            location: 'Garut, Jawa Barat',
            isOrganic: false,
            description: 'Cabai rawit merah segar dipetik langsung dari kebun dataran tinggi Garut. Dipelihara dengan standar pertanian bersih sehingga menghasilkan cabai dengan tingkat kepedasan optimal, kulit yang tebal, dan daya simpan lebih lama.',
            comments: [
                { id: 1, user: 'Ahmad Fauzi', rating: 5, comment: 'Pedasnya mantap luar biasa! Segar-segar cabainya, hampir tidak ada yang busuk.' },
                { id: 2, user: 'Dewi Lestari', rating: 4, comment: 'Sangat pedas, pas buat jualan sambal. Hanya saja kurirnya sedikit terlambat.' }
            ]
        },
        {
            id: 102,
            name: 'Daging Sapi Lokal Segar 500g',
            originalPrice: 80000,
            discountPrice: 64000,
            discountPercent: 20,
            soldPercent: 62,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
            farmer: 'Ternak Berkah Solo',
            rating: 4.9,
            location: 'Boyolali, Jawa Tengah',
            isOrganic: false,
            description: 'Daging sapi lokal segar potongan sup/rendang kualitas premium. Dipotong secara higienis di RPH bersertifikat halal, tanpa bahan pengawet, bebas lemak berlebih, dan selalu dikirim dalam kondisi dingin/fresh.',
            comments: [
                { id: 1, user: 'Hendra Setiawan', rating: 5, comment: 'Daging empuk sekali setelah dimasak rendang. Lemaknya dikit banget, mantap!' },
                { id: 2, user: 'Rina Kartika', rating: 5, comment: 'Segar sekali, warnanya merah cerah. Langsung saya masak sop dan anak-anak suka.' }
            ]
        },
        {
            id: 103,
            name: 'Madu Hutan Sumbawa Murni 500ml',
            originalPrice: 150000,
            discountPrice: 105000,
            discountPercent: 30,
            soldPercent: 91,
            image: 'https://i.pinimg.com/736x/b7/9c/2b/b79c2ba323d0635e4f1d2778c34d62eb.jpg',
            farmer: 'Koperasi Rimba Jaya',
            rating: 5.0,
            location: 'Sumbawa, NTB',
            isOrganic: true,
            description: 'Madu murni yang dipanen langsung dari sarang lebah hutan liar (Apis dorsata) di belantara Sumbawa. Tanpa proses pemanasan atau campuran air/gula, menjaga kandungan enzim alami yang sangat baik untuk daya tahan tubuh.',
            comments: [
                { id: 1, user: 'Suryo W.', rating: 5, comment: 'Madu asli 100%, dites semut tidak mau mendekat. Khasiatnya langsung terasa di badan.' },
                { id: 2, user: 'Nita Amalia', rating: 5, comment: 'Rasa manisnya khas ada sedikit asam alami madu hutan. Sangat rekomen untuk kesehatan.' }
            ]
        },
        {
            id: 104,
            name: 'Apel Fuji Segar Manis 1 Box (5kg)',
            originalPrice: 180000,
            discountPrice: 135000,
            discountPercent: 25,
            soldPercent: 45,
            image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
            farmer: 'Kebun Apel Batu Mandiri',
            rating: 4.7,
            location: 'Batu, Jawa Timur',
            isOrganic: false,
            description: 'Apel fuji lokal pilihan bertekstur renyah dan berair banyak. Dipanen langsung dari pohon pada tingkat kematangan terbaik di perkebunan Batu yang sejuk. Sangat cocok dinikmati langsung atau dibuat jus buah segar.',
            comments: [
                { id: 1, user: 'Yusuf', rating: 4, comment: 'Apel manis dan garing. Ukurannya seragam dalam satu box.' },
                { id: 2, user: 'Maria Ulfa', rating: 5, comment: 'Anak-anak suka sekali karena renyah dan berair manis alami.' }
            ]
        },
    ];

    // Dummy Data Produk Terbaru
    const products = [
        {
            id: 1,
            name: 'Beras Pandan Wangi Organik Cianjur 5kg',
            price: 95000,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
            farmer: 'Pak Dadang - Cianjur',
            rating: 4.9,
            reviews: 124,
            location: 'Cianjur, Jawa Barat',
            isOrganic: true,
            description: 'Beras Pandan Wangi khas Cianjur yang ditanam secara organik tanpa pupuk kimia sintetis maupun pestisida berbahaya. Menghasilkan nasi yang sangat pulen, harum aromatik pandan alami, serta aman dikonsumsi seluruh anggota keluarga.',
            comments: [
                { id: 1, user: 'Siti Aminah', rating: 5, comment: 'Nasi pulen sekali, wangi pandannya tercium saat dimasak. Keluarga sangat suka.' },
                { id: 2, user: 'Budi Santoso', rating: 5, comment: 'Kualitas beras premium, bersih tanpa kerikil atau kutu. Langsung langganan!' },
                { id: 3, user: 'Eka Putri', rating: 4, comment: 'Beras organik yang sangat sehat, teksturnya empuk tidak pera.' }
            ]
        },
        {
            id: 2,
            name: 'Apel Malang Manis Segar 1kg',
            price: 28000,
            image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=600&q=80',
            farmer: 'Ibu Retno - Batu',
            rating: 4.8,
            reviews: 95,
            location: 'Batu, Jawa Timur',
            isOrganic: false,
            description: 'Apel Malang hijau (Manalagi) segar yang dipetik dari pohon perkebunan lereng Gunung Panderman. Menghasilkan rasa manis-sedikit asam yang sangat menyegarkan dengan tekstur daging buah padat yang renyah.',
            comments: [
                { id: 1, user: 'Rian Kurnia', rating: 5, comment: 'Masih segar sekali saat sampai, tidak ada yang memar atau busuk. Recommended!' },
                { id: 2, user: 'Farida', rating: 4, comment: 'Enak buat dibikin rujak atau dimakan langsung dingin-dingin.' }
            ]
        },
        {
            id: 3,
            name: 'Wortel Organik Premium 1kg',
            price: 18500,
            image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
            farmer: 'Pak Wayan - Bedugul',
            rating: 4.7,
            reviews: 62,
            location: 'Tabanan, Bali',
            isOrganic: true,
            description: 'Wortel organik berkualitas premium dari Bedugul Bali. Ditanam di tanah vulkanis yang subur dan bebas bahan kimia. Kaya akan vitamin A, manis, dan bertekstur renyah, sangat direkomendasikan untuk pembuatan jus kesehatan harian Anda.',
            comments: [
                { id: 1, user: 'Wayan Gede', rating: 5, comment: 'Wortelnya manis, dibikin jus tanpa gula pun rasanya sudah segar banget.' },
                { id: 2, user: 'Lia Lestari', rating: 4, comment: 'Bersih, ukurannya besar-besar. Sangat bagus untuk MPASI anak.' }
            ]
        },
        {
            id: 4,
            name: 'Daging Sapi Sirloin Premium Lokal 1kg',
            price: 145000,
            image: 'https://i.pinimg.com/736x/6c/d1/a7/6cd1a7d763b5101c2608549e189a7404.jpg',
            farmer: 'Ternak Maju Mandiri',
            rating: 4.9,
            reviews: 210,
            location: 'Boyolali, Jawa Tengah',
            isOrganic: false,
            description: 'Potongan daging steak Sirloin (Has Luar) sapi lokal pilihan Boyolali. Tekstur daging berserat halus dengan kandungan marbling lemak yang memberikan kelembutan ekstra dan rasa gurih alami yang maksimal saat dipanggang.',
            comments: [
                { id: 1, user: 'Chef Andre', rating: 5, comment: 'Kualitas dagingnya luar biasa, tidak kalah dari daging impor. Juicy banget!' },
                { id: 2, user: 'Gita Clarissa', rating: 5, comment: 'Beli untuk steak malam minggu, dagingnya empuk tanpa perlu pelunak daging.' }
            ]
        },
        {
            id: 5,
            name: 'Telur Ayam Kampung Asli Isi 10 Butir',
            price: 32000,
            image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=600&q=80',
            farmer: 'Pak Joko - Sleman',
            rating: 5.0,
            reviews: 153,
            location: 'Sleman, D.I. Yogyakarta',
            isOrganic: true,
            description: 'Telur dari ayam kampung liar (bukan ras/petelur kandang baterai) yang diberi pakan alami bebas hormon pemicu tumbuh. Kuning telurnya berwarna jingga pekat alami, kaya akan nutrisi, protein, serta minim kolesterol.',
            comments: [
                { id: 1, user: 'Kartika Sari', rating: 5, comment: 'Kuning telurnya orange pekat tanda pakan alami berkualitas tinggi. Top!' },
                { id: 2, user: 'Doni Pratama', rating: 5, comment: 'Pengemasan luar biasa aman memakai tray khusus, tidak ada satu pun telur yang pecah.' }
            ]
        },
        {
            id: 6,
            name: 'Susu Sapi Murni Pasteurisasi 1 Liter',
            price: 22000,
            image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
            farmer: 'Koperasi Susu Lembang',
            rating: 4.8,
            reviews: 87,
            location: 'Bandung Barat, Jabar',
            isOrganic: false,
            description: 'Susu sapi murni segar hasil perahan pagi hari dari peternakan sapi perah modern Lembang. Dipasteurisasi dengan suhu optimal untuk membunuh bakteri merugikan namun tetap mempertahankan cita rasa gurih creamy dan kebaikan nutrisi susu alami.',
            comments: [
                { id: 1, user: 'Indra Jaya', rating: 5, comment: 'Susu murni terenak yang pernah saya beli online. Rasanya creamy dan tidak bau prengus.' },
                { id: 2, user: 'Nabila', rating: 4, comment: 'Sangat menyegarkan, kemasannya juga rapi dan aman.' }
            ]
        },
        {
            id: 7,
            name: 'Pisang Cavendish Organik 1 Sisir',
            price: 24000,
            image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
            farmer: 'Koperasi Tani Lampung',
            rating: 4.7,
            reviews: 110,
            location: 'Bandar Lampung, Lampung',
            isOrganic: true,
            description: 'Pisang Cavendish organik kualitas ekspor berkulit kuning mulus tanpa bercak hitam berlebih. Memiliki tekstur daging buah yang lembut pulen dengan cita rasa manis yang merata. Kaya kalium untuk stamina tubuh harian.',
            comments: [
                { id: 1, user: 'Aditya', rating: 5, comment: 'Matangnya pas, kulitnya kuning bersih. Rasanya manis lembut.' },
                { id: 2, user: 'Susi Susanti', rating: 4, comment: 'Sangat bagus untuk sarapan dan bekal kerja. Pengiriman cepat.' }
            ]
        },
        {
            id: 8,
            name: 'Tomat Merah Segar Berkualitas 1kg',
            price: 14000,
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
            farmer: 'Bu Sri - Temanggung',
            rating: 4.6,
            reviews: 74,
            location: 'Temanggung, Jawa Tengah',
            isOrganic: false,
            description: 'Tomat merah segar dipanen langsung dari kaki gunung sumbing Temanggung. Memiliki kulit yang kencang, daging tebal, rasa asam-manis segar yang pas untuk bumbu tumisan, sambal tomat, maupun campuran sup sehat hangat.',
            comments: [
                { id: 1, user: 'Melati', rating: 5, comment: 'Tomatnya keras-keras tanda baru dipetik. Sangat segar.' },
                { id: 2, user: 'Agus Salim', rating: 4, comment: 'Cocok buat dijus pagi-pagi, segar dan banyak kandungan airnya.' }
            ]
        },
    ];

    // Dummy Data Petani Terpopuler
    const popularFarmers = [
        {
            id: 1,
            name: 'Pak Joko Widodo',
            specialty: 'Spesialis Sayur Organik',
            rating: 4.9,
            productsCount: 42,
            totalSales: '1.2k+ Transaksi',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
            bgImage: 'https://i.pinimg.com/1200x/e9/18/27/e9182719ee0c3d2b6b10e20676875741.jpg',
        },
        {
            id: 2,
            name: 'Ibu Sri Rahayu',
            specialty: 'Produsen Buah Tropis',
            rating: 4.8,
            productsCount: 28,
            totalSales: '850+ Transaksi',
            image: 'https://i.pinimg.com/736x/5c/31/2a/5c312a2a6cb2d099be63b71443183f62.jpg',
            bgImage: 'https://i.pinimg.com/1200x/92/09/61/9209614532f79fa31d36c44576ee93da.jpg',
        },
        {
            id: 3,
            name: 'Pak Ketut Sudarman',
            specialty: 'Peternak Sapi & Unggas',
            rating: 4.9,
            productsCount: 15,
            totalSales: '2.1k+ Transaksi',
            image: 'https://i.pinimg.com/1200x/2f/dd/8c/2fdd8c11d46603e87d24ee2a3f8a4ae7.jpg',
            bgImage: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
        },
        {
            id: 4,
            name: 'Ibu Ningsih',
            specialty: 'Beras & Biji-Bijian',
            rating: 5.0,
            productsCount: 35,
            totalSales: '3.4k+ Transaksi',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
            bgImage: 'https://i.pinimg.com/736x/95/98/40/9598408ed7fcd1a32223df8024e1f7ac.jpg',
        },
    ];

    // Dummy Data Statistik
    const stats = [
        { id: 1, count: '15,000+', label: 'Mitra Petani Lokal', icon: Users, color: 'text-green-600 bg-green-50' },
        { id: 2, count: '500+', label: 'Koperasi & Toko Mitra', icon: Store, color: 'text-amber-600 bg-amber-50' },
        { id: 3, count: '1,000,000+', label: 'Produk Terjual', icon: ShoppingBasket, color: 'text-blue-600 bg-blue-50' },
        { id: 4, count: '45%', label: 'Kenaikan Pendapatan Tani', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    ];

    // Dummy Data Keunggulan
    const advantages = [
        {
            id: 1,
            title: 'Transaksi Aman & Terpercaya',
            description: 'Sistem pembayaran aman dengan jaminan uang kembali jika terjadi ketidaksesuaian barang.',
            icon: ShieldCheck,
        },
        {
            id: 2,
            title: 'Pengiriman Langsung Cepat',
            description: 'Panen langsung dikirim ke depan pintu rumah Anda guna menjaga kesegaran tingkat tinggi.',
            icon: Truck,
        },
        {
            id: 3,
            title: 'Harga Adil Untuk Semua',
            description: 'Memotong jalur distribusi sehingga petani mendapat harga layak dan konsumen mendapat harga terbaik.',
            icon: Wallet,
        },
        {
            id: 4,
            title: 'Kualitas Terjamin 100%',
            description: 'Seluruh produk pertanian telah melewati proses kurasi standar kualitas pangan nasional.',
            icon: BadgeCheck,
        },
    ];

    // Dummy Data Testimoni
    const testimonials = [
        {
            id: 1,
            name: 'Andi Wijaya',
            role: 'Pelanggan Rumah Tangga',
            text: 'Belanja sayur dan buah di Agro Business menghemat waktu saya. Semuanya segar dan rasanya jauh lebih manis dibanding supermarket langganan saya sebelumnya.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            rating: 5,
        },
        {
            id: 2,
            name: 'Siti Rahmawati',
            role: 'Pemilik Restoran Padang Hijau',
            text: 'Kebutuhan beras, cabai, dan daging sapi berkualitas kini terpenuhi dengan mudah. Harga dari petani langsung sangat menekan modal operasional usaha kuliner kami.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            rating: 5,
        },
        {
            id: 3,
            name: 'Bambang Hartono',
            role: 'Ketua Kelompok Tani Mandiri',
            text: 'Sejak bergabung dengan Agro Business, pendapatan anggota kelompok tani kami meningkat drastis. Kami tidak perlu khawatir lagi tentang tengkulak yang merusak harga.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
            rating: 5,
        },
    ];

    const formatPrice = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans relative">

            {/* Custom Styles Injection for Elegant Animations */}
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bgGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: floating 4.5s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: bgGradient 12s ease infinite;
        }
      `}</style>

            {/* ========================================
          NAVBAR
          ======================================== */}
            <Navbar />

            {/* ========================================
          HERO
          ======================================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50/50 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Left Column Content */}
                        <div className="lg:col-span-7 space-y-8 text-center lg:text-left animate-fade-in-up">
                            <div className="inline-flex items-center space-x-2 bg-green-100/80 px-4 py-2 rounded-full border border-green-200 shadow-sm">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"></span>
                                <span className="text-green-800 text-xs sm:text-sm font-semibold tracking-wide">Pemasok Pangan Utama Indonesia</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                Marketplace Hasil <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Pertanian Indonesia</span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Platform inovatif yang menghubungkan langsung konsumen dengan kelompok tani lokal terbaik. Nikmati hasil bumi yang dipanen segar hari ini dan diantarkan langsung ke lokasi Anda.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <button onClick={() => navigate('/marketplace')} className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 shadow-lg shadow-green-200 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center space-x-2 group">
                                    <span>Belanja Sekarang</span>
                                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-green-700 border-2 border-green-600 font-semibold rounded-2xl hover:bg-green-50 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center">
                                    Menjadi Petani
                                </button>
                            </div>
                        </div>

                        {/* Right Column Image */}
                        <div className="lg:col-span-5 relative animate-fade-in">
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-300 to-emerald-400 rounded-3xl transform rotate-3 scale-95 opacity-20 blur-xl"></div>
                            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 animate-float">
                                <img
                                    src="https://i.pinimg.com/736x/d8/69/31/d86931895277419c12762c18ea14cf50.jpg"
                                    alt="Pertanian Agro Business"
                                    className="rounded-2xl object-cover w-full h-[300px] sm:h-[400px] shadow-inner"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 hidden sm:flex items-center space-x-3 max-w-[200px] hover:scale-105 transition-all duration-300">
                                    <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                                        <BadgeCheck className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900">Garansi Segar</h4>
                                        <p className="text-[10px] text-gray-500">Panen Langsung Dikirim</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================
          CATEGORY
          ======================================== */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kategori Unggulan</h2>
                            <p className="text-sm sm:text-base text-gray-500 mt-2">Telusuri hasil pertanian terbaik berdasarkan jenisnya</p>
                        </div>
                        <button className="hidden md:flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors text-sm mt-4 md:mt-0">
                            <span>Lihat Semua Kategori</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                                <div
                                    key={cat.id}
                                    className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-green-300 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                                >
                                    <div className={`p-4 rounded-xl ${cat.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-4`}>
                                        <IconComponent className="h-6 w-6 animate-pulse-slow" />
                                    </div>
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800 text-center group-hover:text-green-600 transition-colors">
                                        {cat.name}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================
          FLASH SALE
          ======================================== */}
            <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-red-200 uppercase animate-pulse">
                                <span>⚡ Flash Sale</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-sm font-medium">Berakhir dalam:</span>
                                <div className="flex space-x-1.5 font-mono text-sm">
                                    <span className="bg-red-600 text-white px-2.5 py-1 rounded-lg font-bold">
                                        {timeLeft.hours.toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-red-600 font-bold">:</span>
                                    <span className="bg-red-600 text-white px-2.5 py-1 rounded-lg font-bold">
                                        {timeLeft.minutes.toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-red-600 font-bold">:</span>
                                    <span className="bg-red-600 text-white px-2.5 py-1 rounded-lg font-bold">
                                        {timeLeft.seconds.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center text-red-600 font-bold hover:text-red-700 transition-colors text-sm mt-4 md:mt-0">
                            <span>Lihat Semua Penawaran</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {flashSales.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:border-red-300 hover:-translate-y-2 border border-red-100 overflow-hidden group transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="relative overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow">
                                            Diskon {item.discountPercent}%
                                        </span>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase block">{item.farmer}</span>
                                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 h-10">
                                                {item.name}
                                            </h3>
                                        </div>

                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-lg font-extrabold text-red-600">{formatPrice(item.discountPrice)}</span>
                                            <span className="text-xs text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                                        </div>

                                        {/* Stock Progress */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-medium text-gray-500">
                                                <span>Terjual {item.soldPercent}%</span>
                                                <span>Hampir Habis</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${item.soldPercent}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 pt-0 space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setSelectedProduct(item)}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-all duration-200 text-xs"
                                        >
                                            Detail
                                        </button>
                                        <button className="bg-red-600 text-white font-bold py-2.5 rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-100 hover:scale-[1.02] transition-all duration-300 text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-red-100">
                                            <ShoppingCart className="h-3.5 w-3.5" />
                                            <span>Beli</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================
          PRODUK TERBARU
          ======================================== */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Produk Pertanian Terbaru</h2>
                            <p className="text-sm sm:text-base text-gray-500 mt-2">Dapatkan kesegaran bermutu langsung dari lahan pertanian terdekat</p>
                        </div>
                        <button className="hidden md:flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors text-sm mt-4 md:mt-0">
                            <span>Lihat Seluruh Produk</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((prod) => (
                            <div
                                key={prod.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-green-300 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="relative overflow-hidden rounded-t-2xl">
                                        <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                                        {prod.isOrganic && (
                                            <span className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow">
                                                <Leaf className="h-3 w-3" />
                                                <span>100% Organik</span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center text-xs text-gray-400 space-x-1">
                                            <MapPin className="h-3 w-3 text-gray-400 animate-bounce-slow" />
                                            <span>{prod.location}</span>
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 hover:text-green-600 transition-colors line-clamp-2 min-h-[40px]">
                                            {prod.name}
                                        </h3>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="text-xs font-bold text-gray-800">{prod.rating}</span>
                                            <span className="text-xs text-gray-400">({prod.reviews} ulasan)</span>
                                        </div>
                                        <div className="pt-2 border-t border-gray-100 flex flex-col space-y-1">
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Petani Mitra</span>
                                            <span className="text-xs font-medium text-gray-700">{prod.farmer}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 pt-0 space-y-3">
                                    <div className="text-base font-extrabold text-green-600">{formatPrice(prod.price)}</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setSelectedProduct(prod)}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-all duration-200 text-xs"
                                        >
                                            Detail
                                        </button>
                                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl hover:scale-[1.02] transition-all duration-300 text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-green-100">
                                            <ShoppingCart className="h-3.5 w-3.5" />
                                            <span>Beli</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================
          POPUP DETAIL PRODUK (MODAL)
          ======================================== */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-fade-in">
                    <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 transform transition-all animate-scale-in flex flex-col">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 shadow-md hover:scale-110 transition-all duration-200"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="p-6 sm:p-8 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* Photo Section */}
                                <div className="md:col-span-5 space-y-4">
                                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square shadow-sm">
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        {selectedProduct.isOrganic && (
                                            <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow">
                                                <Leaf className="h-3.5 w-3.5 animate-bounce-slow" />
                                                <span>100% Organik</span>
                                            </span>
                                        )}
                                        {selectedProduct.discountPercent && (
                                            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow animate-pulse">
                                                Diskon {selectedProduct.discountPercent}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Info & Description Section */}
                                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center text-xs text-gray-500 space-x-1.5">
                                                <MapPin className="h-4 w-4 text-green-600" />
                                                <span>{selectedProduct.location}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="font-semibold text-green-600">{selectedProduct.farmer}</span>
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
                                                {selectedProduct.name}
                                            </h2>
                                        </div>

                                        <div className="flex items-center space-x-4 py-1">
                                            <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-1 rounded-lg">
                                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                                <span className="text-sm font-bold text-gray-800">{selectedProduct.rating}</span>
                                            </div>
                                            {selectedProduct.reviews && (
                                                <span className="text-xs text-gray-500 font-medium">({selectedProduct.reviews} Ulasan pembeli)</span>
                                            )}
                                        </div>

                                        <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100/50 flex items-baseline justify-between">
                                            <span className="text-sm text-gray-600 font-medium">Harga Terbaik</span>
                                            <div className="flex flex-col items-end">
                                                <span className="text-2xl font-black text-green-600">
                                                    {formatPrice(selectedProduct.discountPrice || selectedProduct.price)}
                                                </span>
                                                {selectedProduct.originalPrice && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {formatPrice(selectedProduct.originalPrice)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <h4 className="text-sm font-bold text-gray-900">Deskripsi Produk</h4>
                                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                {selectedProduct.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-green-100 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 text-sm flex items-center justify-center space-x-2">
                                            <ShoppingCart className="h-5 w-5" />
                                            <span>Masukkan Keranjang</span>
                                        </button>
                                        <button className="p-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-red-500 rounded-2xl hover:scale-110 transition-all duration-200">
                                            <Heart className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Review & Comments Section */}
                            <div className="mt-8 pt-8 border-t border-gray-100 space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                                    <span>Komentar & Ulasan</span>
                                    <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-bold">
                                        {selectedProduct.comments?.length || 0}
                                    </span>
                                </h3>

                                <div className="space-y-4">
                                    {selectedProduct.comments && selectedProduct.comments.length > 0 ? (
                                        selectedProduct.comments.map((comm) => (
                                            <div key={comm.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3 hover:shadow-md hover:border-green-200 transition-all duration-300">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm shadow-sm">
                                                            {comm.user.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-sm font-bold text-gray-900">{comm.user}</h5>
                                                            <p className="text-[10px] text-gray-400">Pembeli Terverifikasi</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-lg">
                                                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                        <span className="text-xs font-bold text-gray-800">{comm.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-12">
                                                    "{comm.comment}"
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 text-gray-400 text-sm">
                                            Belum ada ulasan untuk produk ini.
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* ========================================
          PETANI TERPOPULER
          ======================================== */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Petani Terpopuler</h2>
                            <p className="text-sm sm:text-base text-gray-500 mt-2">Dukung ekonomi mandiri produsen pangan nusantara langsung dari lapangan</p>
                        </div>
                        <button className="hidden md:flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors text-sm mt-4 md:mt-0">
                            <span>Semua Profil Petani</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularFarmers.map((farmer) => (
                            <div
                                key={farmer.id}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-green-300 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                            >
                                <div className="relative h-24 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${farmer.bgImage})` }}>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                                </div>
                                <div className="px-5 pb-6 text-center relative">
                                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden mx-auto -mt-8 shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300">
                                        <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 mt-3 group-hover:text-green-600 transition-colors">{farmer.name}</h3>
                                    <p className="text-xs text-green-600 font-semibold mt-1">{farmer.specialty}</p>

                                    <div className="flex items-center justify-center mt-3 space-x-1">
                                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                        <span className="text-xs font-bold text-gray-800">{farmer.rating} / 5.0</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 text-left">
                                        <div>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Jumlah Produk</span>
                                            <span className="text-xs font-bold text-gray-800">{farmer.productsCount} Item</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Total Penjualan</span>
                                            <span className="text-xs font-bold text-gray-800">{farmer.totalSales}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================
          STATISTIK
          ======================================== */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => {
                            const IconComp = stat.icon;
                            return (
                                <div key={stat.id} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-center space-x-5 hover:shadow-lg hover:border-green-200 hover:-translate-y-1 transition-all duration-300">
                                    <div className={`p-4 rounded-xl ${stat.color} shrink-0`}>
                                        <IconComp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-black text-gray-900">{stat.count}</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================
          KEUNGGULAN
          ======================================== */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Mengapa Memilih Kami?</h2>
                        <p className="text-sm sm:text-base text-gray-500 mt-2">Memberikan ekosistem perdagangan berkeadilan tinggi bagi petani dan konsumen</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {advantages.map((adv) => {
                            const IconComp = adv.icon;
                            return (
                                <div key={adv.id} className="space-y-4 text-center sm:text-left group cursor-pointer p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-300">
                                    <div className="inline-flex p-3 bg-green-50 text-green-600 rounded-2xl border border-green-100 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <IconComp className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors">{adv.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{adv.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================
          TESTIMONI
          ======================================== */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Apa Kata Mereka?</h2>
                        <p className="text-sm sm:text-base text-gray-500 mt-2">Testimoni nyata pelanggan serta petani yang merasakan dampak langsung</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((test) => (
                            <div key={test.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 hover:shadow-xl hover:border-green-200 hover:-translate-y-1.5 transition-all duration-300">
                                <div className="flex items-center space-x-1 text-amber-400">
                                    {[...Array(test.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 italic leading-relaxed">"{test.text}"</p>
                                <div className="flex items-center space-x-4 pt-2">
                                    <img src={test.image} alt={test.name} className="w-11 h-11 rounded-full object-cover shadow-inner" />
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{test.name}</h4>
                                        <span className="text-xs text-green-600 font-medium">{test.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================
          CTA BANNER
          ======================================== */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-16 px-6 sm:px-12 lg:px-20 overflow-hidden shadow-xl shadow-green-100 animate-gradient-shift">
                        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none hidden lg:block">
                            <Leaf className="w-96 h-96 transform translate-x-20 -translate-y-20 rotate-45" />
                        </div>
                        <div className="relative z-10 max-w-3xl space-y-6 text-center sm:text-left">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight animate-fade-in-up">
                                Mari Dukung Kedaulatan <br className="hidden sm:inline" />
                                Pangan Lokal Sekarang Juga!
                            </h2>
                            <p className="text-sm sm:text-base text-green-50 leading-relaxed max-w-xl">
                                Nikmati sayur-mayur segar hasil panen mitra tani berkelas di Indonesia. Bersama kita kembangkan ekonomi para pahlawan pangan negeri.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                                <button onClick={() => navigate('/marketplace')} className="px-8 py-4 bg-white text-green-700 font-bold rounded-2xl hover:bg-green-50 hover:scale-105 shadow-lg transition-all duration-300">
                                    Jelajahi Marketplace
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================
          FOOTER
          ======================================== */}
            <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Column 1: Brand Info */}
                        <div className="space-y-6">
                            <div className="flex items-center cursor-pointer group">
                                <div className="bg-green-600 p-2 rounded-xl text-white mr-3 shadow-md">
                                    <Leaf className="h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">
                                    Agro<span className="text-green-500">Business</span>
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                Platform Marketplace modern yang berkomitmen memajukan kesejahteraan sektor pertanian dan penyediaan pangan berkualitas di Indonesia.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="p-2.5 bg-gray-800 rounded-xl hover:bg-green-600 hover:text-white hover:scale-110 transition-all">

                                </a>
                                <a href="#" className="p-2.5 bg-gray-800 rounded-xl hover:bg-green-600 hover:text-white hover:scale-110 transition-all">

                                </a>
                                <a href="#" className="p-2.5 bg-gray-800 rounded-xl hover:bg-green-600 hover:text-white hover:scale-110 transition-all">

                                </a>
                            </div>
                        </div>

                        {/* Column 2: Marketplace Links */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Marketplace</h3>
                            <ul className="space-y-2.5 text-xs sm:text-sm">
                                <li><a href="#" className="hover:text-green-500 transition-colors">Semua Kategori</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Flash Sale Mingguan</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Produk Terlaris</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Gabung Mitra Tani</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Program Promo</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Kontak</h3>
                            <ul className="space-y-3.5 text-xs sm:text-sm">
                                <li className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>Jl. HZ Mustofa No. 123, Kecamatan Cihideung, Kota Tasikmalaya, Jawa Barat 46121</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Phone className="h-4 w-4 text-green-500 shrink-0" />
                                    <span>+62 831-7647-0171</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Mail className="h-4 w-4 text-green-500 shrink-0" />
                                    <span>iluzeear@gmail.com</span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Help & Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Bantuan</h3>
                            <ul className="space-y-2.5 text-xs sm:text-sm">
                                <li><a href="#" className="hover:text-green-500 transition-colors">Panduan Belanja</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Ketentuan Pengiriman</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Kebijakan Pengembalian</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Syarat & Ketentuan</a></li>
                                <li><a href="#" className="hover:text-green-500 transition-colors">Kebijakan Privasi</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} Agro Business Indonesia. Seluruh hak cipta dilindungi undang-undang.
                        </p>
                        <div className="flex space-x-4 text-xs">
                            <a href="#" className="hover:underline">Syarat Layanan</a>
                            <a href="#" className="hover:underline">Keamanan Informasi</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}