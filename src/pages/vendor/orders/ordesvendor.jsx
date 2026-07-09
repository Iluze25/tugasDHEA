import React, { useState, useMemo, useEffect } from 'react';
import {
    ShoppingCart,
    Package,
    Truck,
    PackageCheck,
    ClipboardList,
    Eye,
    SquarePen,
    Search,
    Filter,
    Calendar,
    RefreshCw,
    Download,
    CheckCircle,
    Clock3,
    XCircle,
    User,
    MapPin,
    Wallet,
    Phone,
    FileText,
    X
} from 'lucide-react';
import Navbar1 from "../../../components/vendor/navbar.jsx"

// === DUMMY DATA PESANAN REALISTIS (AGROBISNIS) ===
const INITIAL_ORDERS = [
    {
        id: "ORD-2026-001",
        customerName: "Ahmad Sobari",
        phone: "0812-3456-7890",
        address: "Jl. Pertanian Raya No. 45, Karawang, Jawa Barat",
        products: [
            { name: "Cabai Merah Keriting", qty: 150, unit: "kg", price: 35000 },
            { name: "Kentang Dieng", qty: 50, unit: "kg", price: 20000 }
        ],
        shipping: 150000,
        total: 6400000,
        date: "2026-07-09", // Hari ini
        status: "Selesai",
        paymentMethod: "Transfer Bank Mandiri",
        note: "Harap dikirim sebelum jam 9 pagi agar tetap segar.",
        completedDate: "2026-07-09"
    },
    {
        id: "ORD-2026-002",
        customerName: "Siti Aminah",
        phone: "0857-1122-3344",
        address: "Koperasi Tani Makmur, Sleman, DI Yogyakarta",
        products: [
            { name: "Tomat Organik", qty: 80, unit: "kg", price: 18000 },
            { name: "Selada Keriting", qty: 20, unit: "kg", price: 25000 }
        ],
        shipping: 80000,
        total: 2020000,
        date: "2026-07-09", // Hari ini
        status: "Diproses",
        paymentMethod: "E-Wallet (GoPay)",
        note: "Pisahkan packing selada dengan es batu kecil."
    },
    {
        id: "ORD-2026-003",
        customerName: "CV Tani Maju Sejahtera",
        phone: "0813-8899-0011",
        address: "Gudang B2, Kawasan Industri Candi, Semarang",
        products: [
            { name: "Bawang Merah Brebes", qty: 300, unit: "kg", price: 32000 }
        ],
        shipping: 400000,
        total: 10000000,
        date: "2026-07-08", // 7 Hari Terakhir
        status: "Dikirim",
        paymentMethod: "Transfer Bank BCA",
        note: "Gunakan armada berpendingin."
    },
    {
        id: "ORD-2026-004",
        customerName: "Restoran Hijau Daun (Dewi)",
        phone: "0819-2233-4455",
        address: "Ruko Sentra Niaga Blok C No. 12, Paskal, Bandung",
        products: [
            { name: "Jagung Manis Pipil", qty: 120, unit: "kg", price: 15000 },
            { name: "Timun Jepang Kyuri", qty: 40, unit: "kg", price: 12000 }
        ],
        shipping: 75000,
        total: 2355000,
        date: "2026-07-07", // 7 Hari Terakhir
        status: "Pending",
        paymentMethod: "COD (Bayar di Tempat)",
        note: "Tagihan mohon dilampirkan rangkap dua."
    },
    {
        id: "ORD-2026-005",
        customerName: "Eko Prasetyo",
        phone: "0838-7766-5544",
        address: "Perumahan Bumi Asri No. A8, Sukabumi, Jawa Barat",
        products: [
            { name: "Bayam Jepang Horenzo", qty: 50, unit: "ikat", price: 7000 }
        ],
        shipping: 35000,
        total: 385000,
        date: "2026-07-05", // 7 Hari Terakhir
        status: "Dibatalkan",
        paymentMethod: "E-Wallet (OVO)",
        note: "Dibatalkan karena stok gudang terdekat sedang kosong."
    },
    {
        id: "ORD-2026-006",
        customerName: "Rina Wijaya",
        phone: "0811-9988-7766",
        address: "Catering Ibu Rina, Kebayoran Baru, Jakarta Selatan",
        products: [
            { name: "Cabai Merah Keriting", qty: 50, unit: "kg", price: 35000 },
            { name: "Tomat Organik", qty: 30, unit: "kg", price: 18000 }
        ],
        shipping: 60000,
        total: 2350000,
        date: "2026-07-01", // 30 Hari Terakhir
        status: "Selesai",
        paymentMethod: "Transfer Bank BNI",
        note: "Kualitas barang sangat bagus, pertahankan.",
        completedDate: "2026-07-02"
    },
    {
        id: "ORD-2026-007",
        customerName: "Hendra Wijaya",
        phone: "0852-4433-2211",
        address: "Pasar Induk Kramat Jati Lapak No. 44, Jakarta Timur",
        products: [
            { name: "Kentang Dieng", qty: 200, unit: "kg", price: 19000 }
        ],
        shipping: 120000,
        total: 3920000,
        date: "2026-06-25", // 30 Hari Terakhir
        status: "Diproses",
        paymentMethod: "Transfer Bank Mandiri",
        note: "Kirim malam hari agar bongkar muat mudah."
    },
    {
        id: "ORD-2026-008",
        customerName: "Koperasi Tani Makmur Utama",
        phone: "0878-1234-5678",
        address: "Jl. Agrobisnis No. 1, Batu, Jawa Timur",
        products: [
            { name: "Selada Keriting", qty: 100, unit: "kg", price: 22000 },
            { name: "Timun Jepang Kyuri", qty: 100, unit: "kg", price: 10000 }
        ],
        shipping: 250000,
        total: 3450000,
        date: "2026-06-15", // 30 Hari Terakhir
        status: "Dikirim",
        paymentMethod: "Transfer Bank BRI",
        note: "Pastikan dokumen karantina tanaman lengkap."
    },
    {
        id: "ORD-2026-009",
        customerName: "Siti Rahma",
        phone: "0812-5566-7788",
        address: "Kantin Universitas IPB, Dramaga, Bogor",
        products: [
            { name: "Jagung Manis Pipil", qty: 250, unit: "kg", price: 14000 }
        ],
        shipping: 90000,
        total: 3590000,
        date: "2026-06-10", // 30 Hari Terakhir
        status: "Pending",
        paymentMethod: "Transfer Bank Syariah Indonesia",
        note: "Pesanan mendesak untuk acara kampus."
    },
    {
        id: "ORD-2026-010",
        customerName: "Mega Utami",
        phone: "0896-1122-3344",
        address: "Dapur Sehat Mega, BSD City, Tangerang Selatan",
        products: [
            { name: "Bawang Merah Brebes", qty: 100, unit: "kg", price: 34000 }
        ],
        shipping: 50000,
        total: 3450000,
        date: "2026-05-20", // Lebih lama (Hanya muncul di filter 'Semua')
        status: "Selesai",
        paymentMethod: "E-Wallet (ShopeePay)",
        note: "Packing kedap udara jika memungkinkan.",
        completedDate: "2026-05-21"
    }
];

export default function OrdersManagement() {
    // === STATES ===
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [dateFilter, setDateFilter] = useState("Semua");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingOrder, setEditingOrder] = useState(null);
    const [tempStatus, setTempStatus] = useState("");
    const [toast, setToast] = useState(null);

    // === SIMULASI LOADING / REFRESH ===
    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToastNotification("Data berhasil diperbarui dari server.");
        }, 1200);
    };

    const showToastNotification = (message) => {
        setToast(message);
        setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    // === FILTERING LOGIC ===
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            // 1. Search Query (ID atau Nama)
            const matchesSearch =
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

            // 2. Status Filter
            const matchesStatus = statusFilter === "Semua" || order.status === statusFilter;

            // 3. Date Filter (Assuming base date is July 9, 2026)
            const orderDate = new Date(order.date);
            const baseDate = new Date("2026-07-09");
            let matchesDate = true;

            if (dateFilter === "Hari Ini") {
                matchesDate = order.date === "2026-07-09";
            } else if (dateFilter === "7 Hari") {
                const diffTime = Math.abs(baseDate - orderDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                matchesDate = diffDays <= 7;
            } else if (dateFilter === "30 Hari") {
                const diffTime = Math.abs(baseDate - orderDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                matchesDate = diffDays <= 30;
            }

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [orders, searchQuery, statusFilter, dateFilter]);

    // === DYNAMIC STATS (Kalkulasi Otomatis Berdasarkan Status Saat Ini) ===
    const stats = useMemo(() => {
        return {
            pending: orders.filter((o) => o.status === "Pending").length,
            processing: orders.filter((o) => o.status === "Diproses").length,
            shipping: orders.filter((o) => o.status === "Dikirim").length,
            completed: orders.filter((o) => o.status === "Selesai").length,
            cancelled: orders.filter((o) => o.status === "Dibatalkan").length,
        };
    }, [orders]);

    // === FORMAT RUPIAH ===
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(number);
    };

    // === UPDATE STATUS HANDLER ===
    const handleUpdateStatus = () => {
        if (!editingOrder) return;

        setOrders((prevOrders) =>
            prevOrders.map((o) => {
                if (o.id === editingOrder.id) {
                    const updatedObj = { ...o, status: tempStatus };
                    // Jika status diubah ke Selesai, tambahkan tanggal selesai
                    if (tempStatus === "Selesai") {
                        updatedObj.completedDate = "2026-07-09";
                    } else {
                        delete updatedObj.completedDate;
                    }
                    return updatedObj;
                }
                return o;
            })
        );

        showToastNotification(`Status Pesanan ${editingOrder.id} diperbarui menjadi: ${tempStatus}`);
        setEditingOrder(null);
    };

    // === SIMULASI EXPORT CSV ===
    const handleExport = () => {
        showToastNotification("Mengekspor data pesanan ke dalam format CSV...");
    };

    return (
        <>
            <Navbar1 />
            <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-slate-100 p-4 md:p-8 text-slate-800 font-sans selection:bg-emerald-200">

                {/* Kustom Animasi via Injeksi Style CSS */}
                <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes blob {
          0%, 100% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.08) translate(10px, -15px); }
        }
        .animate-float-slow { animation: float 7s ease-in-out infinite; }
        .animate-float-medium { animation: float 5s ease-in-out infinite; }
        .animate-float-fast { animation: float 4s ease-in-out infinite; }
        .animate-blob { animation: blob 10s ease-in-out infinite; }
      `}</style>

                {/* Dekorasi Latar Belakang Blur Premium */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob pointer-events-none" />
                <div className="absolute top-1/3 right-20 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none" style={{ animationDelay: '4s' }} />

                {/* Konten Utama */}
                <div className="relative max-w-7xl mx-auto space-y-8">

                    {/* --- TOAST NOTIFICATION --- */}
                    {toast && (
                        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur-sm text-white px-5 py-4 rounded-xl shadow-2xl border border-emerald-500/20 animate-bounce">
                            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                            <span className="text-sm font-medium">{toast}</span>
                        </div>
                    )}

                    {/* --- HERO SECTION --- */}
                    {loading ? (
                        <div className="h-56 bg-slate-200/60 rounded-3xl animate-pulse" />
                    ) : (
                        <div className="relative bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 text-white">
                            {/* Tekstur Pola Daun Halus */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                                {/* Sisi Kiri: Teks */}
                                <div className="space-y-3 text-center md:text-left max-w-xl">
                                    <div className="inline-flex items-center gap-2 bg-emerald-600/30 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 uppercase tracking-wide">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        Agrobusiness Transaction Hub
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                                        Kelola Pesanan
                                    </h1>
                                    <p className="text-green-100 text-sm md:text-base font-normal leading-relaxed">
                                        Pantau, proses, dan kelola seluruh transaksi pelanggan secara efisien. Tingkatkan akurasi pengiriman komoditas agribisnis Anda.
                                    </p>
                                </div>

                                {/* Sisi Kanan: Area Ilustrasi Floating */}
                                <div className="relative w-full max-w-[280px] h-32 md:h-40 flex items-center justify-center">
                                    {/* Background Ring */}
                                    <div className="absolute w-32 h-32 bg-emerald-600/20 border border-emerald-500/10 rounded-full animate-ping" />

                                    {/* ShoppingCart Icon */}
                                    <div className="absolute transform -translate-x-12 -translate-y-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-float-slow shadow-lg">
                                        <ShoppingCart className="h-8 w-8 text-emerald-200" />
                                    </div>

                                    {/* Truck Icon */}
                                    <div className="absolute transform translate-x-12 -translate-y-8 bg-emerald-500/30 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-400/20 animate-float-medium shadow-lg">
                                        <Truck className="h-7 w-7 text-white" />
                                    </div>

                                    {/* PackageCheck Icon */}
                                    <div className="absolute transform -translate-x-4 translate-y-10 bg-green-500/40 backdrop-blur-md p-3 rounded-2xl border border-green-300/20 animate-float-fast shadow-lg">
                                        <PackageCheck className="h-6 w-6 text-emerald-100" />
                                    </div>

                                    {/* ClipboardList Icon */}
                                    <div className="absolute transform translate-x-10 translate-y-8 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10 animate-float-slow shadow-lg">
                                        <ClipboardList className="h-5 w-5 text-emerald-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- STATISTICS SUMMARY --- */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { label: "Pesanan Masuk", count: stats.pending, color: "text-amber-600", bg: "bg-amber-50/80 border-amber-200/60", icon: Clock3, sub: "Menunggu konfirmasi" },
                            { label: "Pesanan Diproses", count: stats.processing, color: "text-blue-600", bg: "bg-blue-50/80 border-blue-200/60", icon: Package, sub: "Sedang dipersiapkan" },
                            { label: "Sedang Dikirim", count: stats.shipping, color: "text-purple-600", bg: "bg-purple-50/80 border-purple-200/60", icon: Truck, sub: "Dalam perjalanan" },
                            { label: "Pesanan Selesai", count: stats.completed, color: "text-emerald-600", bg: "bg-emerald-50/80 border-emerald-200/60", icon: PackageCheck, sub: "Transaksi sukses" },
                            { label: "Pesanan Dibatalkan", count: stats.cancelled, color: "text-red-600", bg: "bg-red-50/80 border-red-200/60", icon: XCircle, sub: "Batal transaksi" }
                        ].map((item, idx) => {
                            const IconComp = item.icon;
                            return loading ? (
                                <div key={idx} className="h-28 bg-white/60 rounded-2xl border border-slate-200/40 animate-pulse" />
                            ) : (
                                <div
                                    key={idx}
                                    className={`${item.bg} border p-4 md:p-5 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs md:text-sm font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                                            {item.label}
                                        </span>
                                        <div className={`p-1.5 rounded-lg bg-white shadow-sm ${item.color}`}>
                                            <IconComp className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className={`text-2xl md:text-3xl font-extrabold ${item.color}`}>
                                            {item.count}
                                        </span>
                                        <p className="text-[10px] md:text-xs text-slate-400 font-medium">
                                            {item.sub}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- TOOLBAR --- */}
                    {loading ? (
                        <div className="h-16 bg-white/60 rounded-2xl border border-slate-200/40 animate-pulse" />
                    ) : (
                        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative w-full lg:max-w-xs">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari ID pesanan / nama pelanggan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                                />
                            </div>

                            {/* Filter Group */}
                            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">

                                {/* Status Dropdown */}
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600">
                                    <Filter className="h-3.5 w-3.5 text-slate-400" />
                                    <span className="hidden sm:inline">Status:</span>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="bg-transparent focus:outline-none cursor-pointer font-bold text-slate-800"
                                    >
                                        <option value="Semua">Semua Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Diproses">Diproses</option>
                                        <option value="Dikirim">Dikirim</option>
                                        <option value="Selesai">Selesai</option>
                                        <option value="Dibatalkan">Dibatalkan</option>
                                    </select>
                                </div>

                                {/* Date Dropdown */}
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600">
                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                    <span className="hidden sm:inline">Tanggal:</span>
                                    <select
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="bg-transparent focus:outline-none cursor-pointer font-bold text-slate-800"
                                    >
                                        <option value="Semua">Semua Waktu</option>
                                        <option value="Hari Ini">Hari Ini</option>
                                        <option value="7 Hari">7 Hari Terakhir</option>
                                        <option value="30 Hari">30 Hari Terakhir</option>
                                    </select>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleRefresh}
                                        title="Segarkan Data"
                                        className="p-2 bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={handleExport}
                                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow"
                                    >
                                        <Download className="h-3.5 w-3.5" />
                                        Ekspor CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- ORDERS TABLE --- */}
                    {loading ? (
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/40 space-y-4">
                            <div className="h-8 bg-slate-200/60 rounded-lg w-1/4 animate-pulse" />
                            <div className="h-64 bg-slate-200/40 rounded-xl animate-pulse" />
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        /* Empty State */
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 py-16 px-4 text-center max-w-lg mx-auto shadow-sm space-y-6">
                            <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100">
                                <ShoppingCart className="h-10 w-10" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-800">Belum ada pesanan masuk</h3>
                                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                    Tidak ditemukan pesanan yang sesuai dengan filter atau kata kunci pencarian Anda saat ini.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setStatusFilter("Semua");
                                    setDateFilter("Semua");
                                    handleRefresh();
                                }}
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Segarkan Data
                            </button>
                        </div>
                    ) : (
                        /* Table Container */
                        <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                                            <th className="py-4 px-6">ID Pesanan</th>
                                            <th className="py-4 px-6">Nama Pelanggan</th>
                                            <th className="py-4 px-6">Produk Utama</th>
                                            <th className="py-4 px-6 text-center">Jumlah Item</th>
                                            <th className="py-4 px-6">Total Pembayaran</th>
                                            <th className="py-4 px-6">Tanggal</th>
                                            <th className="py-4 px-6">Status</th>
                                            <th className="py-4 px-6 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium text-slate-700">
                                        {filteredOrders.map((order) => {
                                            // Dapatkan status badges meta
                                            let statusBadgeClass = "";
                                            if (order.status === "Pending") statusBadgeClass = "bg-amber-50 text-amber-600 border border-amber-200/50";
                                            else if (order.status === "Diproses") statusBadgeClass = "bg-blue-50 text-blue-600 border border-blue-200/50";
                                            else if (order.status === "Dikirim") statusBadgeClass = "bg-purple-50 text-purple-600 border border-purple-200/50";
                                            else if (order.status === "Selesai") statusBadgeClass = "bg-emerald-50 text-emerald-600 border border-emerald-200/50";
                                            else if (order.status === "Dibatalkan") statusBadgeClass = "bg-red-50 text-red-600 border border-red-200/50";

                                            return (
                                                <tr
                                                    key={order.id}
                                                    className="hover:bg-slate-50/40 transition-colors group"
                                                >
                                                    {/* ID Pesanan */}
                                                    <td className="py-4 px-6 font-mono font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                        {order.id}
                                                    </td>

                                                    {/* Nama Pelanggan */}
                                                    <td className="py-4 px-6 font-semibold text-slate-800">
                                                        {order.customerName}
                                                    </td>

                                                    {/* Produk Utama */}
                                                    <td className="py-4 px-6 text-slate-500">
                                                        {order.products[0].name}
                                                        {order.products.length > 1 && (
                                                            <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400 font-bold">
                                                                +{order.products.length - 1} lainnya
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Jumlah Item */}
                                                    <td className="py-4 px-6 text-center text-slate-500">
                                                        {order.products.reduce((acc, curr) => acc + curr.qty, 0)}{" "}
                                                        <span className="text-[10px] font-normal text-slate-400">
                                                            {order.products[0].unit}
                                                        </span>
                                                    </td>

                                                    {/* Total Pembayaran */}
                                                    <td className="py-4 px-6 font-bold text-slate-800">
                                                        {formatRupiah(order.total)}
                                                    </td>

                                                    {/* Tanggal */}
                                                    <td className="py-4 px-6 text-slate-500">
                                                        {new Date(order.date).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm transition-transform hover:scale-105 duration-200 ${statusBadgeClass}`}>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                            {order.status}
                                                        </span>
                                                    </td>

                                                    {/* Aksi */}
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => setSelectedOrder(order)}
                                                                title="Lihat Detail"
                                                                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 rounded-lg border border-slate-100 hover:border-emerald-200 transition-all shadow-sm"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingOrder(order);
                                                                    setTempStatus(order.status);
                                                                }}
                                                                title="Update Status"
                                                                className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg border border-slate-100 hover:border-blue-200 transition-all shadow-sm"
                                                            >
                                                                <SquarePen className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* Table Footer Stats */}
                            <div className="bg-slate-50/50 border-t border-slate-100 px-6 py-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                                <span>Menampilkan {filteredOrders.length} dari {orders.length} pesanan terdaftar</span>
                                <span className="text-[11px] bg-white border border-slate-200/80 rounded-lg px-2.5 py-1 text-slate-400">
                                    Pembaruan Terakhir: {new Date().toLocaleTimeString("id-ID")}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* --- DETAIL MODAL --- */}
                    {selectedOrder && (
                        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                                                Rincian Transaksi
                                            </span>
                                            <span className="font-mono text-sm font-extrabold text-slate-500">
                                                {selectedOrder.id}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-extrabold text-slate-800">
                                            Informasi Detail Pesanan
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-6">
                                    {/* Status Selesai / Completed Transaction Card */}
                                    {selectedOrder.status === "Selesai" && (
                                        <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-emerald-800">Transaksi Selesai & Sukses</p>
                                                <p className="text-xs text-emerald-600 leading-relaxed">
                                                    Dana telah dicatatkan ke dalam entri keuangan platform agribisnis pada tanggal{" "}
                                                    <span className="font-semibold">{selectedOrder.completedDate || selectedOrder.date}</span>.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Informasi Pelanggan */}
                                    <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                <User className="h-3.5 w-3.5" />
                                                Pelanggan
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{selectedOrder.customerName}</p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                                                    <Phone className="h-3 w-3" />
                                                    {selectedOrder.phone}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                <MapPin className="h-3.5 w-3.5" />
                                                Alamat Pengiriman
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                                {selectedOrder.address}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Daftar Produk */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                                            Daftar Komoditas Yang Dipesan
                                        </h4>
                                        <div className="border border-slate-100 rounded-2xl overflow-hidden">
                                            <table className="w-full text-left text-xs md:text-sm">
                                                <thead className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase">
                                                    <tr>
                                                        <th className="p-3">Nama Produk</th>
                                                        <th className="p-3 text-right">Harga Satuan</th>
                                                        <th className="p-3 text-center">Jumlah</th>
                                                        <th className="p-3 text-right">Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                                    {selectedOrder.products.map((p, idx) => (
                                                        <tr key={idx}>
                                                            <td className="p-3 font-semibold text-slate-800">{p.name}</td>
                                                            <td className="p-3 text-right">{formatRupiah(p.price)} / {p.unit}</td>
                                                            <td className="p-3 text-center text-slate-500 font-bold">{p.qty} {p.unit}</td>
                                                            <td className="p-3 text-right font-bold text-slate-900">
                                                                {formatRupiah(p.qty * p.price)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Ringkasan Biaya */}
                                    <div className="border-t border-slate-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                <Wallet className="h-3.5 w-3.5" />
                                                Metode Pembayaran
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">
                                                    {selectedOrder.paymentMethod}
                                                </p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">
                                                    Tanggal Order: {new Date(selectedOrder.date).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 bg-slate-50 p-4 rounded-2xl text-xs md:text-sm">
                                            <div className="flex justify-between text-slate-500 font-medium">
                                                <span>Subtotal Komoditas:</span>
                                                <span>
                                                    {formatRupiah(
                                                        selectedOrder.products.reduce((acc, curr) => acc + (curr.qty * curr.price), 0)
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-slate-500 font-medium">
                                                <span>Ongkos Kirim (Logistik):</span>
                                                <span>{formatRupiah(selectedOrder.shipping)}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-slate-200/80 pt-2">
                                                <span>Total Pembayaran:</span>
                                                <span className="text-emerald-700">{formatRupiah(selectedOrder.total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Catatan Pembeli */}
                                    {selectedOrder.note && (
                                        <div className="bg-amber-50/50 border border-amber-200/40 rounded-2xl p-4 flex gap-2">
                                            <FileText className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                            <div className="space-y-1">
                                                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Catatan Pembeli:</span>
                                                <p className="text-xs text-amber-700 leading-relaxed font-semibold">
                                                    "{selectedOrder.note}"
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-slate-100 flex justify-end">
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 font-bold text-sm rounded-xl transition-all"
                                    >
                                        Tutup Rincian
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- UPDATE STATUS MODAL --- */}
                    {editingOrder && (
                        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                                    <div className="space-y-1">
                                        <span className="font-mono text-xs font-extrabold text-slate-400">
                                            ID: {editingOrder.id}
                                        </span>
                                        <h3 className="text-base font-extrabold text-slate-800">
                                            Perbarui Status Transaksi
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setEditingOrder(null)}
                                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-4">
                                    <div className="space-y-1.5">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Pelanggan</p>
                                        <p className="text-sm font-bold text-slate-800">{editingOrder.customerName}</p>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="statusDropdown" className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                                            Pilih Status Baru
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="statusDropdown"
                                                value={tempStatus}
                                                onChange={(e) => setTempStatus(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                                            >
                                                <option value="Pending">⏰ Pending (Menunggu)</option>
                                                <option value="Diproses">📦 Diproses (Disiapkan)</option>
                                                <option value="Dikirim">🚚 Dikirim (Dalam Perjalanan)</option>
                                                <option value="Selesai">✅ Selesai (Transaksi Berhasil)</option>
                                                <option value="Dibatalkan">❌ Dibatalkan</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Peringatan kecil atau panduan singkat */}
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-semibold bg-slate-50 p-3 rounded-xl">
                                        Perubahan status akan berdampak langsung ke laporan ringkasan transaksi serta indikator aliran dana pada dashboard utama akuntansi.
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        onClick={() => setEditingOrder(null)}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleUpdateStatus}
                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}