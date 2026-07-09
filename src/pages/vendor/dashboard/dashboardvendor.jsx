import React, { useState, useEffect } from "react";
import {
    Wallet,
    ShoppingCart,
    Package,
    Coins,
    Leaf,
    Sparkles,
    X,
    Calendar,
    TrendingUp,
    Info,
    AlertTriangle,
    Layers,
    ArrowUpRight,
    TrendingDown,
    Activity,
    CheckCircle2,
    Clock,
    Truck,
    XCircle,
    HelpCircle
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

// Data Integration
import { products } from "../datavendor.jsx";
import { orders } from "../datavendor.jsx";
import { finance } from "../datavendor.jsx";
import { funding } from "../datavendor.jsx";

import Navbar1 from "../../../components/vendor/navbar.jsx"

export default function AgrobusinessDashboard() {
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null);

    // Simulasi loading state premium untuk visualisasi transisi yang mulus
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Memastikan data aman saat diakses
    const safeProducts = Array.isArray(products) ? products : [];
    const safeOrders = Array.isArray(orders) ? orders : [];
    const safeRevenueData = finance && Array.isArray(finance.revenueData) ? finance.revenueData : [];
    const safeFunding = Array.isArray(funding) ? funding : (funding ? [funding] : []);

    // ----------------------------------------------------
    // PERHITUNGAN DATA UTAMA
    // ----------------------------------------------------

    // Card 1: Total Pendapatan (Sum of all monthly revenue)
    const totalRevenue = safeRevenueData.reduce((acc, curr) => acc + (Number(curr.revenue) || 0), 0);

    // Card 2: Total Penjualan (Total completed sales transaction quantity)
    const completedOrders = safeOrders.filter(
        (order) =>
            order.status?.toLowerCase() === "completed" ||
            order.status?.toLowerCase() === "selesai" ||
            order.status?.toLowerCase() === "success"
    );

    // Jika tidak ada status 'completed' yang terdeteksi, gunakan semua order untuk keandalan kalkulasi data
    const targetOrdersForQty = completedOrders.length > 0 ? completedOrders : safeOrders;
    const totalSalesQuantity = targetOrdersForQty.reduce(
        (sum, order) => sum + (Number(order.quantity) || 0),
        0
    );

    // Card 3: Total Produk
    const totalProductsCount = safeProducts.length;

    // Card 4: Total Modal Diterima (Sum of fundCollected)
    const totalFundingReceived = safeFunding.reduce(
        (acc, curr) => acc + (Number(curr.fundCollected) || 0),
        0
    );

    // Format Rupiah Helper
    const formatIDR = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    // ----------------------------------------------------
    // ANALISIS DATA DETIL (DITAMPILKAN PADA MODAL)
    // ----------------------------------------------------

    // Analisis Produk Terlaris
    const getBestSellingProduct = () => {
        const salesMap = {};
        safeOrders.forEach((order) => {
            const pId = order.productId;
            const qty = Number(order.quantity) || 0;
            salesMap[pId] = (salesMap[pId] || 0) + qty;
        });

        let bestProductId = null;
        let maxQty = 0;
        Object.entries(salesMap).forEach(([id, qty]) => {
            if (qty > maxQty) {
                maxQty = qty;
                bestProductId = id;
            }
        });

        const productInfo = safeProducts.find((p) => String(p.id) === String(bestProductId));
        return {
            product: productInfo || { name: "Tidak teridentifikasi" },
            quantity: maxQty
        };
    };

    const bestSelling = getBestSellingProduct();

    // Analisis Kategori Produk
    const getProductCategories = () => {
        const categories = {};
        safeProducts.forEach((p) => {
            const cat = p.category || "Lainnya";
            categories[cat] = (categories[cat] || 0) + 1;
        });
        return Object.entries(categories).map(([name, count]) => ({ name, count }));
    };

    const categoriesDistribution = getProductCategories();

    // Status Badge Helper
    const getStatusBadge = (status) => {
        const s = status?.toLowerCase() || "";
        if (s === "completed" || s === "selesai") {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Selesai
                </span>
            );
        } else if (s === "processing" || s === "diproses" || s === "process") {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Diproses
                </span>
            );
        } else if (s === "shipping" || s === "dikirim") {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    Dikirim
                </span>
            );
        } else if (s === "pending" || s === "menunggu") {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Menunggu
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Batal
                </span>
            );
        }
    };

    // Custom Chart Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-md p-4 border border-emerald-100 rounded-xl shadow-lg">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-lg font-bold text-emerald-700">
                        {formatIDR(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    // ----------------------------------------------------
    // SKELETON LOADING TEMPLATE
    // ----------------------------------------------------
    if (loading) {
        return (
            <div className="bg-gradient-to-tr from-slate-50 via-emerald-50/10 to-green-50/20 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
                {/* Hero Skeleton */}
                <div className="h-60 bg-slate-200 rounded-3xl w-full" />

                {/* Summary Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-slate-200 rounded-2xl w-full" />
                    ))}
                </div>

                {/* Chart and Side Widget Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="h-96 bg-slate-200 rounded-2xl lg:col-span-2" />
                    <div className="h-96 bg-slate-200 rounded-2xl" />
                </div>

                {/* Table Skeleton */}
                <div className="h-80 bg-slate-200 rounded-2xl w-full" />
            </div>
        );
    }

    return (
        <>
            <Navbar1 />
            <div className="bg-gradient-to-tr from-slate-100 via-emerald-50/20 to-green-50/30 min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
                {/* CSS Floating & Glow effects style injection */}
                <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-3deg); }
        }
        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 9s ease-in-out infinite;
        }
      `}</style>

                {/* Ambient Blurred Backgrounds */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-green-200/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto space-y-8 relative z-10">

                    {/* ====================================================
            HERO SECTION
            ==================================================== */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-8 md:p-12 shadow-xl border border-emerald-900/10 hover:shadow-2xl transition-all duration-500">
                        {/* Decorative Floating Elements */}
                        <div className="absolute top-6 right-12 text-emerald-400/20 animate-float-slow pointer-events-none">
                            <Leaf size={140} />
                        </div>
                        <div className="absolute bottom-4 right-1/3 text-teal-400/10 animate-float-delayed pointer-events-none">
                            <Coins size={90} />
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-600/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-6 animate-pulse">
                                <Sparkles size={14} className="text-emerald-400" />
                                Sistem Akuntansi Terpadu
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                Dashboard Bisnis
                            </h1>
                            <p className="mt-4 text-base md:text-lg text-emerald-150/90 leading-relaxed font-light">
                                Pantau performa usaha pertanian, pendapatan, transaksi, dan perkembangan bisnis dalam satu halaman.
                            </p>
                        </div>
                    </div>

                    {/* ====================================================
            SUMMARY CARDS
            ==================================================== */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Card 1: Total Pendapatan */}
                        <div
                            onClick={() => setActiveModal("revenue")}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full transition-all group-hover:bg-emerald-500/10" />
                            <div className="flex justify-between items-start">
                                <div className="space-y-3">
                                    <span className="text-sm font-semibold text-slate-500">Total Pendapatan</span>
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">
                                        {formatIDR(totalRevenue)}
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-55/60 px-2 py-0.5 rounded-full">
                                        <TrendingUp size={12} />
                                        Akumulatif
                                    </span>
                                </div>
                                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Wallet size={22} />
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Total Penjualan */}
                        <div
                            onClick={() => setActiveModal("sales")}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full transition-all group-hover:bg-blue-500/10" />
                            <div className="flex justify-between items-start">
                                <div className="space-y-3">
                                    <span className="text-sm font-semibold text-slate-500">Total Penjualan</span>
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors">
                                        {totalSalesQuantity} Kg / Unit
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                        <Activity size={12} />
                                        Kuantitas Sukses
                                    </span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <ShoppingCart size={22} />
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Total Produk */}
                        <div
                            onClick={() => setActiveModal("products")}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-bl-full transition-all group-hover:bg-green-500/10" />
                            <div className="flex justify-between items-start">
                                <div className="space-y-3">
                                    <span className="text-sm font-semibold text-slate-500">Total Produk</span>
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-green-700 transition-colors">
                                        {totalProductsCount} Katalog
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                        <Layers size={12} />
                                        Aktif Terdaftar
                                    </span>
                                </div>
                                <div className="p-3 rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Package size={22} />
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Total Modal */}
                        <div
                            onClick={() => setActiveModal("funding")}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full transition-all group-hover:bg-amber-500/10" />
                            <div className="flex justify-between items-start">
                                <div className="space-y-3">
                                    <span className="text-sm font-semibold text-slate-500">Total Modal Diterima</span>
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-amber-700 transition-colors">
                                        {formatIDR(totalFundingReceived)}
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                        <ArrowUpRight size={12} />
                                        Proyek Investasi
                                    </span>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Coins size={22} />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ====================================================
            CHART SECTION & AGROBUSINESS HIGHLIGHT
            ==================================================== */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Revenue Chart */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Pendapatan Bulanan</h3>
                                        <p className="text-xs text-slate-400 mt-1">Struktur penerimaan komparatif berjalan (Januari - Desember)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <Calendar size={14} className="text-slate-400" />
                                            Tahun Berjalan
                                        </div>
                                    </div>
                                </div>

                                {/* Area Chart Container */}
                                <div className="h-80 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={safeRevenueData}
                                            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="month"
                                                stroke="#94a3b8"
                                                fontSize={11}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#94a3b8"
                                                fontSize={11}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `Rp${value / 1000000}M`}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#10b981"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorRevenue)"
                                                dot={{ r: 4, strokeWidth: 2, stroke: "#10b981", fill: "#ffffff" }}
                                                activeDot={{ r: 6, strokeWidth: 0, fill: "#047857" }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Agro Quick Insights Widget */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Ringkasan Agribisnis</h3>
                                    <p className="text-xs text-slate-400 mt-1">Data operasional instan bisnis Anda</p>
                                </div>

                                <div className="space-y-4">

                                    {/* Best Selling Row */}
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                            <Leaf size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs text-slate-400 block font-medium">Produk Terlaris</span>
                                            <span className="text-sm font-semibold text-slate-700 truncate block">
                                                {bestSelling?.product?.name || "Memuat..."}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                                            {bestSelling?.quantity} Kg
                                        </span>
                                    </div>

                                    {/* Investment Milestone */}
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                            <Coins size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs text-slate-400 block font-medium">Modal Terkumpul</span>
                                            <span className="text-sm font-semibold text-slate-700 block">
                                                {formatIDR(totalFundingReceived)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Categories Count */}
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                            <Layers size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs text-slate-400 block font-medium">Keberagaman Kategori</span>
                                            <span className="text-sm font-semibold text-slate-700 block">
                                                {categoriesDistribution.length} Kategori Utama
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400">
                                <span className="inline-flex items-center gap-1">
                                    <Info size={14} className="text-slate-300" /> Standar Akuntansi Agraria
                                </span>
                                <span>Aktif</span>
                            </div>
                        </div>

                    </div>

                    {/* ====================================================
            RECENT ORDERS SECTION
            ==================================================== */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Daftar Transaksi Terbaru</h3>
                                <p className="text-xs text-slate-400 mt-1">Lacak langsung log pesanan dan distribusi komoditas</p>
                            </div>
                            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5 self-start sm:self-auto">
                                <Activity size={14} className="text-slate-400" />
                                Sistem Log Terautomasi
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                        <th className="py-4 px-6">Pelanggan</th>
                                        <th className="py-4 px-6">Komoditas Produk</th>
                                        <th className="py-4 px-6 text-center">Jumlah</th>
                                        <th className="py-4 px-6 text-right">Total Transaksi</th>
                                        <th className="py-4 px-6 text-center">Status</th>
                                        <th className="py-4 px-6">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {safeOrders.slice(0, 7).map((order, idx) => {
                                        // Relasikan productId dengan products.id untuk menampilkan nama produk
                                        const productInfo = safeProducts.find(
                                            (p) => String(p.id) === String(order.productId)
                                        );
                                        return (
                                            <tr key={order.id || idx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6 font-medium text-slate-800">
                                                    {order.customerName || "Tanpa Nama"}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        <span className="text-slate-700 font-medium">
                                                            {productInfo ? productInfo.name : `Produk #${order.productId}`}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center font-semibold text-slate-600">
                                                    {order.quantity} Kg
                                                </td>
                                                <td className="py-4 px-6 text-right font-bold text-slate-800">
                                                    {formatIDR(order.total)}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {getStatusBadge(order.status)}
                                                </td>
                                                <td className="py-4 px-6 text-slate-400 text-xs">
                                                    {order.date || "-"}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* ====================================================
          MODAL INTERAKTIF (POPUP DETAIL)
          ==================================================== */}
                {activeModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
                        <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform scale-100 transition-all">

                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl ${activeModal === 'revenue' ? 'bg-emerald-50 text-emerald-600' :
                                        activeModal === 'sales' ? 'bg-blue-50 text-blue-600' :
                                            activeModal === 'products' ? 'bg-green-50 text-green-600' :
                                                'bg-amber-50 text-amber-600'
                                        }`}>
                                        {activeModal === 'revenue' && <Wallet size={20} />}
                                        {activeModal === 'sales' && <ShoppingCart size={20} />}
                                        {activeModal === 'products' && <Package size={20} />}
                                        {activeModal === 'funding' && <Coins size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">
                                            {activeModal === 'revenue' && "Detail Analisis Pendapatan"}
                                            {activeModal === 'sales' && "Detail Kinerja Penjualan"}
                                            {activeModal === 'products' && "Detail Portofolio Produk"}
                                            {activeModal === 'funding' && "Detail Pendanaan & Investasi"}
                                        </h3>
                                        <p className="text-xs text-slate-400">Pembaruan data agribisnis aktual</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-150 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">

                                {/* REVENUE MODAL CONTENT */}
                                {activeModal === "revenue" && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                                                <span className="text-xs font-semibold text-slate-500 block mb-1">Rata-rata Bulanan</span>
                                                <span className="text-lg font-extrabold text-emerald-800">
                                                    {formatIDR(totalRevenue / (safeRevenueData.length || 1))}
                                                </span>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <span className="text-xs font-semibold text-slate-500 block mb-1">Jumlah Bulan Aktif</span>
                                                <span className="text-lg font-extrabold text-slate-800">{safeRevenueData.length} Bulan</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Rincian Penerimaan Kas</h4>
                                            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                                                {safeRevenueData.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center px-4 py-3 bg-white text-sm">
                                                        <span className="font-semibold text-slate-600">{item.month}</span>
                                                        <span className="font-bold text-emerald-700">{formatIDR(item.revenue)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SALES MODAL CONTENT */}
                                {activeModal === "sales" && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1">
                                            <span className="text-xs font-semibold text-slate-500 block">Produk Terlaris Saat Ini</span>
                                            <span className="text-base font-extrabold text-blue-900 block">{bestSelling.product.name}</span>
                                            <span className="text-xs font-medium text-blue-700">Terdistribusi {bestSelling.quantity} Kg</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Statistik Status Pemesanan</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                                                    <span className="text-xs text-slate-600 font-medium">Selesai/Terkirim</span>
                                                    <span className="text-sm font-bold text-emerald-700">{completedOrders.length}</span>
                                                </div>
                                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between">
                                                    <span className="text-xs text-slate-600 font-medium">Pending/Proses</span>
                                                    <span className="text-sm font-bold text-amber-700">
                                                        {safeOrders.length - completedOrders.length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* PRODUCTS MODAL CONTENT */}
                                {activeModal === "products" && (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Proporsi Kategori Hortikultura</h4>
                                            <div className="space-y-2.5">
                                                {categoriesDistribution.map((cat, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                                            <span className="font-semibold text-slate-600">{cat.name}</span>
                                                        </div>
                                                        <span className="font-bold text-slate-800">{cat.count} Produk</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* FUNDING MODAL CONTENT */}
                                {activeModal === "funding" && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-center">
                                            <span className="text-xs font-semibold text-slate-500 block mb-1">Total Dana Pendanaan Usaha</span>
                                            <span className="text-2xl font-extrabold text-amber-800 block">{formatIDR(totalFundingReceived)}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Status Kampanye Pendanaan</h4>
                                            <div className="space-y-3.5">
                                                {safeFunding.map((fund, idx) => {
                                                    const target = Number(fund.fundTarget || fund.target) || 1;
                                                    const progress = Math.min(100, Math.round(((Number(fund.fundCollected) || 0) / target) * 100));
                                                    return (
                                                        <div key={fund.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm space-y-2.5">
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-bold text-slate-700">{fund.title || "Proyek Tani"}</span>
                                                                <span className="text-xs font-bold text-emerald-600">{progress}% Terpenuhi</span>
                                                            </div>
                                                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                                                <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
                                                            </div>
                                                            <div className="flex justify-between items-center text-xs text-slate-400">
                                                                <span>Terkumpul: {formatIDR(fund.fundCollected)}</span>
                                                                <span>Target: {formatIDR(target)}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-slate-150 bg-slate-50 text-right">
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-md transition-all duration-200"
                                >
                                    Tutup Ringkasan
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </>
    );
}