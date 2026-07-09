import React, { useState, useMemo } from "react";
import { orders as initialOrders } from "../datavendor.jsx";
import { products } from "../datavendor.jsx";
import {
    ShoppingCart,
    Package,
    User,
    Wallet,
    Clock,
    Truck,
    CircleCheck,
    CircleX,
    Search,
    Filter,
    Calendar,
    Eye,
    RefreshCcw,
    TrendingUp,
    X,
    ArrowUpDown,
    CheckCircle2,
    ChevronRight
} from "lucide-react";

import Navbar1 from "../../../components/vendor/navbar.jsx"

export default function OrdersPage() {
    // State manajemen pesanan utama
    const [ordersList, setOrdersList] = useState(initialOrders);

    // State untuk pencarian, filter, dan pengurutan
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [sortBy, setSortBy] = useState("Terbaru");

    // State untuk mengontrol Modal Detail
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Map katalog produk berdasarkan ID untuk akses instan tanpa pencarian berulang (O(1) complexity)
    const productMap = useMemo(() => {
        return new Map(products.map((p) => [p.id, p]));
    }, []);

    // Handler: Mengubah Status Pesanan
    const handleStatusChange = (orderId, newStatus) => {
        setOrdersList((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
        // Sync state detail modal jika sedang terbuka
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
        }
    };

    // Kalkulasi data statistik ringkasan transaksi (Summary Cards)
    const stats = useMemo(() => {
        const total = ordersList.length;
        const completed = ordersList.filter((o) => o.status === "Completed").length;
        const processing = ordersList.filter((o) => o.status === "Processing").length;
        const totalRevenue = ordersList.reduce((sum, o) => sum + (o.total || 0), 0);

        return { total, completed, processing, totalRevenue };
    }, [ordersList]);

    // Penyaringan & Pengurutan Data Pesanan secara dinamis
    const filteredAndSortedOrders = useMemo(() => {
        // 1. Filter
        let result = ordersList.filter((order) => {
            const product = productMap.get(order.productId);
            const productName = product ? product.name : "";

            const matchesSearch =
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                productName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "Semua" || order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        // 2. Sort
        if (sortBy === "Terbaru") {
            result.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        } else if (sortBy === "Terlama") {
            result.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
        } else if (sortBy === "Nilai transaksi terbesar") {
            result.sort((a, b) => b.total - a.total);
        }

        return result;
    }, [ordersList, searchQuery, statusFilter, sortBy, productMap]);

    // Ambil daftar transaksi yang berhasil selesai saja untuk bagian pelacakan khusus
    const completedOrders = useMemo(() => {
        return ordersList
            .filter((o) => o.status === "Completed")
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    }, [ordersList]);

    // Format ke Rupiah
    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Format Tanggal Standard Indonesia
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    // Fungsi utilitas untuk pewarnaan Badge Status Pesanan
    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-amber-50 text-amber-700 border border-amber-200/60";
            case "Processing":
                return "bg-blue-50 text-blue-700 border border-blue-200/60";
            case "Shipping":
                return "bg-purple-50 text-purple-700 border border-purple-200/60";
            case "Completed":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
            case "Cancelled":
                return "bg-rose-50 text-rose-700 border border-rose-200/60";
            default:
                return "bg-slate-50 text-slate-700 border border-slate-200";
        }
    };

    return (
        <>
            <Navbar1 />
            <div className="min-h-screen bg-slate-50/50 text-slate-800 p-4 md:p-8 font-sans">

                {/* CSS Injeksi untuk Animasi Transisi Halus */}
                <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fadeIn">

                    {/* Page Hero Section (Visual Modern High-Contrast) */}
                    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden text-white">
                        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl -z-10" />
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-100 border border-emerald-700/50 tracking-wider uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Pusat Kontrol Transaksi Penjualan Pertanian
                                </span>
                                <h1 className="text-3xl md:text-4.5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-emerald-100 bg-clip-text text-transparent">
                                    Kelola Transaksi Bisnis Anda
                                </h1>
                                <p className="text-emerald-200/80 text-sm md:text-base max-w-xl leading-relaxed">
                                    Pantau pesanan pelanggan, proses transaksi, dan kelola perjalanan produk dari pemesanan hingga selesai.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 self-start md:self-center">
                                <p className="text-xs text-emerald-300 font-medium">Omset Terkumpul (Kotor)</p>
                                <p className="text-xl md:text-2xl font-bold mt-1 text-emerald-50">
                                    {formatIDR(stats.totalRevenue)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pesanan</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                <CircleCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pesanan Selesai</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.completed}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/50">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pesanan Diproses</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.processing}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pendapatan</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{formatIDR(stats.totalRevenue)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Split Layout: Orders List & Completed Orders Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">

                        {/* Main Column: Order List & Controls (2/3 width) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Filter & Sort Toolbar */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">

                                {/* Search Bar */}
                                <div className="relative w-full md:max-w-xs">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari transaksi atau pelanggan..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-slate-50/50"
                                    />
                                </div>

                                {/* Filter & Sort Dropdowns */}
                                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mr-1">
                                        <Filter className="w-4 h-4 text-slate-400" />
                                        <span>Saring:</span>
                                    </div>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    >
                                        <option value="Semua">Semua Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipping">Shipping</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>

                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider ml-1 md:ml-2">
                                        <ArrowUpDown className="w-4 h-4 text-slate-400" />
                                        <span>Urutkan:</span>
                                    </div>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    >
                                        <option value="Terbaru">Terbaru</option>
                                        <option value="Terlama">Terlama</option>
                                        <option value="Nilai transaksi terbesar">Nilai Terbesar</option>
                                    </select>
                                </div>
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider uppercase">
                                            <th className="px-6 py-4.5">ID Transaksi</th>
                                            <th className="px-6 py-4.5">Pelanggan</th>
                                            <th className="px-6 py-4.5">Produk</th>
                                            <th className="px-6 py-4.5 text-right">Jumlah / Total</th>
                                            <th className="px-6 py-4.5 text-center">Status</th>
                                            <th className="px-6 py-4.5 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                        {filteredAndSortedOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-16 text-center text-slate-400 bg-slate-50/20">
                                                    <ShoppingCart className="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300" />
                                                    <p className="text-base font-semibold text-slate-700">Tidak ada transaksi ditemukan</p>
                                                    <p className="text-xs mt-1 text-slate-500">Coba ubah filter pencarian atau kategori Anda.</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredAndSortedOrders.map((order) => {
                                                const product = productMap.get(order.productId);
                                                return (
                                                    <tr
                                                        key={order.id}
                                                        className="hover:bg-slate-50/30 transition-colors duration-150 cursor-pointer group"
                                                        onClick={() => setSelectedOrder(order)}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <span className="font-mono text-slate-500 text-xs font-semibold bg-slate-50 px-2 py-1 rounded border border-slate-200/55">
                                                                {order.id}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                                                                    {order.customerName.charAt(0)}
                                                                </div>
                                                                <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                                    {order.customerName}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {product ? (
                                                                <div>
                                                                    <span className="font-semibold text-slate-800 text-sm">{product.name}</span>
                                                                    <span className="block text-[11px] text-slate-400 mt-0.5 font-medium">{product.category}</span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-slate-400 italic text-xs">Produk tidak dikenal</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="font-semibold text-slate-900">{formatIDR(order.total)}</div>
                                                            <div className="text-xs text-slate-400 font-medium mt-0.5">
                                                                {order.quantity} {product ? product.unit : "unit"}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                            <div className="flex items-center justify-center">
                                                                <select
                                                                    value={order.status}
                                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                                    className={`text-xs font-bold rounded-full px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer border-r-4 border-transparent transition-all ${getStatusBadgeStyle(order.status)}`}
                                                                >
                                                                    <option value="Pending">🕒 Pending</option>
                                                                    <option value="Processing">⚙️ Processing</option>
                                                                    <option value="Shipping">🚚 Shipping</option>
                                                                    <option value="Completed">✅ Completed</option>
                                                                    <option value="Cancelled">❌ Cancelled</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                            <button
                                                                onClick={() => setSelectedOrder(order)}
                                                                title="Lihat Detail Transaksi"
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                                            >
                                                                <Eye className="w-4.5 h-4.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Stacked Card View */}
                            <div className="md:hidden space-y-4">
                                {filteredAndSortedOrders.length === 0 ? (
                                    <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-400 shadow-sm">
                                        <ShoppingCart className="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300" />
                                        <p className="text-base font-semibold text-slate-700">Tidak ada transaksi ditemukan</p>
                                        <p className="text-xs mt-1 text-slate-500">Sesuaikan kata pencarian atau filter Anda.</p>
                                    </div>
                                ) : (
                                    filteredAndSortedOrders.map((order) => {
                                        const product = productMap.get(order.productId);
                                        return (
                                            <div
                                                key={order.id}
                                                onClick={() => setSelectedOrder(order)}
                                                className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-all duration-300 flex flex-col gap-3 relative cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                                                    <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/55">
                                                        {order.id}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-medium">{formatDate(order.orderDate)}</span>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Pelanggan</p>
                                                    <p className="font-bold text-slate-900 text-sm">{order.customerName}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Produk</p>
                                                        <p className="font-semibold text-slate-800 text-xs">
                                                            {product ? product.name : "Produk tidak dikenal"}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1 text-right">
                                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Pembayaran</p>
                                                        <p className="font-bold text-emerald-700 text-sm">{formatIDR(order.total)}</p>
                                                        <p className="text-[10px] text-slate-400 font-medium">
                                                            {order.quantity} {product ? product.unit : "unit"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none ${getStatusBadgeStyle(order.status)}`}
                                                    >
                                                        <option value="Pending">🕒 Pending</option>
                                                        <option value="Processing">⚙️ Processing</option>
                                                        <option value="Shipping">🚚 Shipping</option>
                                                        <option value="Completed">✅ Completed</option>
                                                        <option value="Cancelled">❌ Cancelled</option>
                                                    </select>

                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span>Detail</span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Right Column: Completed Transactions Sidebar (1/3 width) */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        <h3 className="font-bold text-slate-900 text-base">Transaksi Selesai</h3>
                                    </div>
                                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                                        {completedOrders.length} Berhasil
                                    </span>
                                </div>

                                {completedOrders.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400">
                                        <Package className="w-8 h-8 mx-auto stroke-1 mb-2 text-slate-300" />
                                        <p className="text-xs font-semibold">Belum ada transaksi selesai.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                                        {completedOrders.map((order) => {
                                            const product = productMap.get(order.productId);
                                            return (
                                                <div
                                                    key={order.id}
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/30 to-green-50/10 border border-emerald-100/50 hover:border-emerald-300/60 shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex gap-3 items-start group"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                                                        ✓
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-1.5">
                                                            <p className="text-xs font-bold text-slate-900 truncate">{order.customerName}</p>
                                                            <span className="text-[10px] font-mono text-slate-400 font-semibold">{order.id}</span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 font-semibold truncate mt-0.5">
                                                            {product ? product.name : "Produk tidak dikenal"} • {order.quantity} {product ? product.unit : "unit"}
                                                        </p>
                                                        <div className="flex items-center justify-between gap-1.5 mt-2 pt-1.5 border-t border-slate-200/40">
                                                            <span className="text-xs font-bold text-emerald-700">{formatIDR(order.total)}</span>
                                                            <span className="text-[10px] text-slate-400 font-medium">{formatDate(order.orderDate)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ==================================== ORDER DETAIL MODAL ==================================== */}
                {selectedOrder && (() => {
                    const product = productMap.get(selectedOrder.productId);

                    // Definisikan Alur Waktu / Stepper Visual
                    const steps = [
                        { key: "Pending", label: "Pesanan Dibuat", icon: Clock },
                        { key: "Processing", label: "Diproses", icon: RefreshCcw },
                        { key: "Shipping", label: "Dikirim", icon: Truck },
                        { key: "Completed", label: "Selesai", icon: CircleCheck }
                    ];

                    // Cari index status saat ini
                    const currentStepIndex = steps.findIndex((step) => step.key === selectedOrder.status);
                    const isCancelled = selectedOrder.status === "Cancelled";

                    return (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden transform scale-100 transition-all">

                                {/* Header Modal */}
                                <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white px-6 py-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Detail Transaksi Bisnis</p>
                                        <h3 className="text-lg font-bold flex items-center gap-2 mt-0.5">
                                            <span>ID: {selectedOrder.id}</span>
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Konten Detail */}
                                <div className="p-6 space-y-6">

                                    {/* Informasi Ringkas Pelanggan & Produk */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
                                            <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                                                {selectedOrder.customerName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Nama Pelanggan</p>
                                                <p className="font-bold text-slate-900 text-base">{selectedOrder.customerName}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                            <div className="space-y-1">
                                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Produk dipesan</p>
                                                <p className="font-bold text-slate-800 text-sm">{product ? product.name : "Produk tidak dikenal"}</p>
                                                <p className="text-[10px] text-slate-500 font-semibold">{product ? product.category : ""}</p>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Jumlah</p>
                                                <p className="font-bold text-slate-800 text-sm">
                                                    {selectedOrder.quantity} {product ? product.unit : "unit"}
                                                </p>
                                                <p className="text-[11px] text-slate-400 font-medium">
                                                    (Harga Satuan: {product ? formatIDR(product.price) : "0"})
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress / Status Timeline Stepper */}
                                    <div className="space-y-4">
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Perjalanan Logistik & Transaksi</p>

                                        {isCancelled ? (
                                            <div className="bg-rose-50 text-rose-800 rounded-xl p-3 text-xs font-semibold flex items-center gap-2 border border-rose-100">
                                                <CircleX className="w-5 h-5 text-rose-600 shrink-0" />
                                                <span>Pesanan ini telah dibatalkan (Cancelled) dan tidak dapat dilanjutkan.</span>
                                            </div>
                                        ) : (
                                            <div className="relative flex justify-between items-center px-4 pt-2">

                                                {/* Jalur Penghubung */}
                                                <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 -z-10" />
                                                <div
                                                    className="absolute top-5 left-10 h-0.5 bg-emerald-600 -z-10 transition-all duration-500"
                                                    style={{
                                                        width: `${currentStepIndex === -1 ? 0 : (currentStepIndex / (steps.length - 1)) * 100
                                                            }%`,
                                                    }}
                                                />

                                                {/* Langkah Stepper */}
                                                {steps.map((step, index) => {
                                                    const StepIcon = step.icon;
                                                    const isPast = index <= currentStepIndex;
                                                    const isCurrent = index === currentStepIndex;

                                                    return (
                                                        <div key={step.key} className="flex flex-col items-center gap-1.5">
                                                            <div
                                                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isPast
                                                                    ? isCurrent
                                                                        ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                                                                        : "bg-emerald-100 text-emerald-800"
                                                                    : "bg-slate-100 text-slate-400 border border-slate-200"
                                                                    }`}
                                                            >
                                                                <StepIcon className="w-4 h-4" />
                                                            </div>
                                                            <span
                                                                className={`text-[9px] font-bold tracking-tight text-center ${isPast ? "text-emerald-900 font-extrabold" : "text-slate-400"
                                                                    }`}
                                                            >
                                                                {step.label}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Dropdown Update Status di dalam Detail Modal */}
                                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Perbarui Status Transaksi</p>
                                            <span className="text-[11px] text-slate-500 font-medium">Ubah status logistik saat ini secara real-time.</span>
                                        </div>
                                        <select
                                            value={selectedOrder.status}
                                            onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                                            className={`text-xs md:text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer border ${getStatusBadgeStyle(selectedOrder.status)}`}
                                        >
                                            <option value="Pending">🕒 Pending</option>
                                            <option value="Processing">⚙️ Processing</option>
                                            <option value="Shipping">🚚 Shipping</option>
                                            <option value="Completed">✅ Completed</option>
                                            <option value="Cancelled">❌ Cancelled</option>
                                        </select>
                                    </div>

                                    {/* Total Detail Keuangan */}
                                    <div className="bg-slate-900 text-white rounded-2xl p-5 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Total Tagihan</span>
                                            <span className="text-xs text-slate-400 font-semibold">{selectedOrder.quantity} item produk</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xl font-bold block">{formatIDR(selectedOrder.total)}</span>
                                            <span className="text-[10px] text-emerald-400 font-bold tracking-wider">Metode: Transfer Bank</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })()}

            </div>
        </>
    );
}