import React, { useState, useEffect } from 'react';
import {
    ShoppingCart,
    Package,
    User,
    Calendar,
    MapPin,
    Eye,
    Search,
    Filter,
    CircleCheck,
    Truck,
    Clock,
    CircleX,
    RefreshCw,
    X,
    CreditCard,
    FileText,
    Tag
} from 'lucide-react';

// Data Utama (Dummy Data - 9 Baris Transaksi Agribisnis)
const INITIAL_ORDERS = [
    {
        id: "INV-001",
        pelanggan: "Budi Santoso",
        produk: "Cabai Organik",
        kategori: "Rempah & Hortikultura",
        jumlah: "15 Kg",
        hargaPerKg: 30000,
        subtotal: 450000,
        ongkir: 25000,
        total: 475000,
        tanggal: "12 Juli 2026",
        tanggalKirim: "13 Juli 2026",
        status: "Selesai",
        metodeBayar: "Transfer Bank Mandiri",
        alamat: "Jl. Merdeka No. 45, Bandung, Jawa Barat",
        catatan: "Harap kirim dalam wadah plastik kedap udara agar tetap segar."
    },
    {
        id: "INV-002",
        pelanggan: "Siti Rahma",
        produk: "Tomat Cherry",
        kategori: "Sayur Segar",
        jumlah: "20 Kg",
        hargaPerKg: 25000,
        subtotal: 500000,
        ongkir: 30000,
        total: 530000,
        tanggal: "11 Juli 2026",
        tanggalKirim: "12 Juli 2026",
        status: "Diproses",
        metodeBayar: "E-Wallet GoPay",
        alamat: "Sarinah Apartment Tower B, Lt. 12, Jakarta Pusat",
        catatan: "Pilih tomat yang masih agak kemerahan (jangan terlalu matang)."
    },
    {
        id: "INV-003",
        pelanggan: "Agus Wijaya",
        produk: "Kentang Granola",
        kategori: "Umbi-umbian",
        jumlah: "50 Kg",
        hargaPerKg: 18000,
        subtotal: 900000,
        ongkir: 75000,
        total: 975000,
        tanggal: "10 Juli 2026",
        tanggalKirim: "11 Juli 2026",
        status: "Dikirim",
        metodeBayar: "Transfer Bank BCA",
        alamat: "Perumahan Asri Jaya Blok C3, Semarang, Jawa Tengah",
        catatan: "Kirim menggunakan ekspedisi kargo cepat."
    },
    {
        id: "INV-004",
        pelanggan: "Dewi Lestari",
        produk: "Bawang Merah Brebes",
        kategori: "Rempah & Hortikultura",
        jumlah: "30 Kg",
        hargaPerKg: 35000,
        subtotal: 1050000,
        ongkir: 40000,
        total: 1090000,
        tanggal: "09 Juli 2026",
        tanggalKirim: "10 Juli 2026",
        status: "Menunggu",
        metodeBayar: "Transfer Bank BRI",
        alamat: "Jl. Gajah Mada No. 12, Yogyakarta",
        catatan: "Bawang harus sudah dipastikan kering jemur sebelum dikemas."
    },
    {
        id: "INV-005",
        pelanggan: "Eko Prasetyo",
        produk: "Jagung Manis",
        kategori: "Sayur Segar",
        jumlah: "100 Kg",
        hargaPerKg: 8000,
        subtotal: 800000,
        ongkir: 120000,
        total: 920000,
        tanggal: "08 Juli 2026",
        tanggalKirim: "09 Juli 2026",
        status: "Selesai",
        metodeBayar: "Transfer Bank Mandiri",
        alamat: "Pasar Induk Kramat Jati, Lapak No. 14, Jakarta Timur",
        catatan: "Gunakan kemasan karung goni tebal berlapis."
    },
    {
        id: "INV-006",
        pelanggan: "Rina Melati",
        produk: "Wortel Berastagi",
        kategori: "Umbi-umbian",
        jumlah: "25 Kg",
        hargaPerKg: 16000,
        subtotal: 400000,
        ongkir: 35000,
        total: 435000,
        tanggal: "08 Juli 2026",
        tanggalKirim: "-",
        status: "Dibatalkan",
        metodeBayar: "E-Wallet OVO",
        alamat: "Komp. Dago Elok No. 9, Bandung, Jawa Barat",
        catatan: "Pesanan dibatalkan karena kendala alokasi stok di gudang utama."
    },
    {
        id: "INV-007",
        pelanggan: "Hendra Wijaya",
        produk: "Selada Keriting",
        kategori: "Sayur Segar",
        jumlah: "10 Kg",
        hargaPerKg: 22000,
        subtotal: 220000,
        ongkir: 15000,
        total: 235000,
        tanggal: "07 Juli 2026",
        tanggalKirim: "08 Juli 2026",
        status: "Selesai",
        metodeBayar: "Transfer Bank BCA",
        alamat: "Restoran Hijau Daun, Jl. Raya Darmo No. 102, Surabaya",
        catatan: "Kirim pagi hari sebelum jam operasional restoran dimulai."
    },
    {
        id: "INV-008",
        pelanggan: "Mega Utami",
        produk: "Timun Jepang",
        kategori: "Sayur Segar",
        jumlah: "40 Kg",
        hargaPerKg: 12000,
        subtotal: 480000,
        ongkir: 50000,
        total: 530000,
        tanggal: "06 Juli 2026",
        tanggalKirim: "07 Juli 2026",
        status: "Diproses",
        metodeBayar: "E-Wallet GoPay",
        alamat: "Jl. Kenanga Timur No. 88, Solo, Jawa Tengah",
        catatan: "Pastikan timun memiliki kelurusan yang baik dan ukuran yang seragam."
    }
];

export default function RecentOrdersSection() {
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Simulasi Efek Loading Awal untuk Keperluan Presentasi
    useEffect(() => {
        simulateLoading();
    }, []);

    const simulateLoading = () => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    };

    // Logika Filter & Pencarian
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.produk.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "Semua" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Reset filter dan segarkan data
    const handleRefresh = () => {
        setSearchTerm("");
        setStatusFilter("Semua");
        simulateLoading();
    };

    // Format Angka ke Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Komponen Helper untuk Lencana Status
    const StatusBadge = ({ status }) => {
        let styleClasses = "";
        let Icon = Clock;

        switch (status) {
            case "Selesai":
                styleClasses = "bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/80";
                Icon = CircleCheck;
                break;
            case "Diproses":
                styleClasses = "bg-blue-50 text-blue-700 border-blue-200/60 hover:bg-blue-100/80";
                Icon = Clock;
                break;
            case "Dikirim":
                styleClasses = "bg-purple-50 text-purple-700 border-purple-200/60 hover:bg-purple-100/80";
                Icon = Truck;
                break;
            case "Menunggu":
                styleClasses = "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100/80";
                Icon = Clock;
                break;
            case "Dibatalkan":
                styleClasses = "bg-red-50 text-red-700 border-red-200/60 hover:bg-red-100/80";
                Icon = CircleX;
                break;
            default:
                styleClasses = "bg-slate-50 text-slate-700 border-slate-200/60 hover:bg-slate-100/80";
        }

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm transition-all duration-200 cursor-default ${styleClasses}`}>
                <Icon size={12} />
                {status}
            </span>
        );
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans">

            <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />

            {/* 2. Blob Ambiens Kiri Atas (Emerald Soft Circle) */}
            <div className="absolute -top-[15%] -left-[10%] w-[60%] h-[60%] rounded-full bg-emerald-200/20 blur-[130px] pointer-events-none" />

            {/* 3. Blob Ambiens Kanan Bawah (Wheat/Gold Soft Circle) */}
            <div className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] rounded-full bg-amber-100/35 blur-[130px] pointer-events-none" />

            {/* Animasi Latar Belakang - Gaya CSS diinjeksikan secara lokal */}
            <style>{`
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-bg 20s ease infinite;
        }
      `}</style>

            {/* Elemen Dekoratif Glowing Blur */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22c55e] rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse duration-[12000ms]" />

            {/* Container Utama (Glassmorphism Effect) */}
            <div className="relative w-full max-w-7xl bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 p-6 md:p-8 z-10 transition-all duration-300">

                {/* Kontrol Simulasi & Info Sampingan */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={simulateLoading}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                    >
                        <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
                        Simulasikan Loading
                    </button>
                </div>

                {/* Bagian Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                            <ShoppingCart className="text-emerald-600" size={24} />
                            Pesanan Terbaru
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Pantau transaksi terbaru yang masuk dari marketplace dan kanal distribusi agribisnis Anda [1].
                        </p>
                    </div>

                    {/* Kolom Filter & Pencarian */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Input Pencarian */}
                        <div className="relative min-w-[240px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Cari pesanan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative min-w-[160px]">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer appearance-none shadow-sm"
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Dikirim">Dikirim</option>
                                <option value="Menunggu">Menunggu</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
                        </div>
                    </div>
                </div>

                {/* Tabel Konten Utama */}
                {isLoading ? (
                    /* Tampilan Loading Skeleton */
                    <div className="overflow-x-auto rounded-xl border border-slate-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-slate-100">
                                    {["ID Pesanan", "Pelanggan", "Produk", "Jumlah", "Total", "Tanggal", "Status", "Aksi"].map((col, idx) => (
                                        <th key={idx} className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[...Array(5)].map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-6 py-4.5"><div className="h-4 w-16 bg-slate-200 rounded" /></td>
                                        <td className="px-6 py-4.5"><div className="h-4 w-28 bg-slate-200 rounded" /></td>
                                        <td className="px-6 py-4.5"><div className="h-4 w-24 bg-slate-200 rounded" /></td>
                                        <td className="px-6 py-4.5"><div className="h-4 w-12 bg-slate-200 rounded" /></td>
                                        <td className="px-6 py-4.5"><div className="h-4 w-20 bg-slate-200 rounded" /></td>
                                        <td className="px-6 py-4.5"><div className="h-4 w-20 bg-slate-200 rounded" /></td>
                                        <td className="px-6 py-4.5"><div className="h-7 w-20 bg-slate-200 rounded-full" /></td>
                                        <td className="px-6 py-4.5"><div className="h-8 w-24 bg-slate-200 rounded-lg" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    /* Tampilan Tabel Asli */
                    <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 sticky top-0 border-b border-slate-100 backdrop-blur-sm z-10">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">ID Pesanan</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Pelanggan</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Produk</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Jumlah</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Total</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Tanggal</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredOrders.map((order, index) => (
                                    <tr
                                        key={order.id}
                                        className={`group transition-all duration-200 hover:bg-emerald-50/30 ${index % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'}`}
                                    >
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-800">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-emerald-100/60 flex items-center justify-center text-emerald-700 font-medium text-xs">
                                                    {order.pelanggan.charAt(0)}
                                                </div>
                                                <span className="font-medium text-slate-700 text-sm">{order.pelanggan}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">{order.produk}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500 text-center font-semibold">{order.jumlah}</td>
                                        <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">{formatRupiah(order.total)}</td>
                                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">{order.tanggal}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/50 hover:border-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg shadow-sm transition-all duration-200"
                                            >
                                                <Eye size={12} />
                                                Lihat Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* Tampilan Keadaan Kosong (Empty State) */
                    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                            <Package size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700">Belum ada pesanan terbaru.</h3>
                        <p className="text-slate-400 text-sm text-center max-w-sm mt-1">
                            Tidak ada transaksi yang cocok dengan kata kunci atau filter status yang Anda pilih saat ini [1].
                        </p>
                        <button
                            onClick={handleRefresh}
                            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all duration-200"
                        >
                            <RefreshCw size={14} />
                            Segarkan Data
                        </button>
                    </div>
                )}
            </div>

            {/* MODAL DETIL PESANAN */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">


                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col transform scale-100 transition-all animate-in fade-in zoom-in-95 duration-200">

                        {/* Header Modal */}
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <FileText className="text-emerald-600" size={20} />
                                <div>
                                    <h2 className="text-base font-bold text-slate-800">Detail Pesanan</h2>
                                    <p className="text-xs font-semibold text-emerald-700 font-mono mt-0.5">{selectedOrder.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-lg transition-colors border border-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Isi Detail Modal */}
                        <div className="p-6 space-y-6">

                            {/* Bagian Status & Info Utama */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-emerald-50/40 rounded-xl border border-emerald-100 gap-3">
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 font-medium">Status Pesanan</p>
                                    <StatusBadge status={selectedOrder.status} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Metode Pembayaran</p>
                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mt-1">
                                        <CreditCard size={14} className="text-emerald-600" />
                                        {selectedOrder.metodeBayar}
                                    </div>
                                </div>
                            </div>

                            {/* Grid Data Detil */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Kolom Kiri: Info Pelanggan & Alamat */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                        <User size={13} />
                                        Informasi Pembeli
                                    </h3>
                                    <div className="space-y-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 text-sm">
                                        <div>
                                            <p className="text-xs text-slate-400">Nama Pelanggan</p>
                                            <p className="font-semibold text-slate-700 mt-0.5">{selectedOrder.pelanggan}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                                <MapPin size={11} /> Alamat Pengiriman
                                            </p>
                                            <p className="text-slate-600 leading-relaxed text-xs mt-1">{selectedOrder.alamat}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Kolom Kanan: Rincian Produk */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                        <Package size={13} />
                                        Rincian Produk Agribisnis
                                    </h3>
                                    <div className="space-y-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 text-sm">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400">Nama Produk</p>
                                                <p className="font-semibold text-slate-700 mt-0.5">{selectedOrder.produk}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-400">Kategori</p>
                                                <span className="inline-block text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md mt-1">
                                                    {selectedOrder.kategori}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100/80">
                                            <div>
                                                <p className="text-xs text-slate-400">Volume</p>
                                                <p className="font-semibold text-slate-700">{selectedOrder.jumlah}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Harga per Kg</p>
                                                <p className="font-semibold text-slate-700">{formatRupiah(selectedOrder.hargaPerKg)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Rincian Finansial & Logistik */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">

                                {/* Waktu Transaksi */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                        <Calendar size={13} />
                                        Linimasa Logistik
                                    </h3>
                                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex justify-between">
                                            <span>Tanggal Pemesanan:</span>
                                            <span className="font-semibold text-slate-700">{selectedOrder.tanggal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tanggal Pengiriman:</span>
                                            <span className="font-semibold text-slate-700">{selectedOrder.tanggalKirim}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Struktur Biaya */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                        <Tag size={13} />
                                        Struktur Keuangan
                                    </h3>
                                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex justify-between">
                                            <span>Subtotal Produk:</span>
                                            <span className="font-medium text-slate-700">{formatRupiah(selectedOrder.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between pb-2 border-b border-slate-200">
                                            <span>Ongkos Kirim:</span>
                                            <span className="font-medium text-slate-700">{formatRupiah(selectedOrder.ongkir)}</span>
                                        </div>
                                        <div className="flex justify-between pt-1 text-sm font-bold text-slate-800">
                                            <span>Total Pembayaran:</span>
                                            <span className="text-emerald-700">{formatRupiah(selectedOrder.total)}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Catatan Tambahan */}
                            {selectedOrder.catatan && (
                                <div className="space-y-2 pt-4 border-t border-slate-100">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Catatan Khusus Pengiriman</h3>
                                    <p className="text-xs text-slate-600 bg-amber-50/60 border border-amber-100 p-3 rounded-xl leading-relaxed italic">
                                        "{selectedOrder.catatan}"
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* Footer Modal */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 bg-white rounded-xl transition-all duration-200"
                            >
                                Tutup Detail
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}