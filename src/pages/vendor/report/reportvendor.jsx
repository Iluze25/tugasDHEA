import React, { useState, useMemo } from "react";
import { products } from "../datavendor.jsx";
import { orders } from "../datavendor.jsx";
import { inventory } from "../datavendor.jsx";
import { finance } from "../datavendor.jsx";
import { analytics } from "../datavendor.jsx";
import { funding } from "../datavendor.jsx";

import Navbar1 from "../../../components/vendor/navbar.jsx"

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Legend
} from "recharts";
import {
    FileText,
    Files,
    ClipboardList,
    Printer,
    Download,
    FileSpreadsheet,
    Package,
    ShoppingCart,
    Wallet,
    Coins,
    ChartColumn,
    PieChart,
    TrendingUp,
    Search,
    Filter,
    X,
    Eye,
    AlertTriangle,
    Users,
    BriefcaseBusiness,
    TrendingDown,
    Calendar,
    CheckCircle,
    HelpCircle
} from "lucide-react";

export default function ReportsPage() {
    // State untuk Filter & Pencarian
    const [periodFilter, setPeriodFilter] = useState("Bulan Ini");
    const [categoryFilter, setCategoryFilter] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    // State Kontrol Modal
    const [selectedReportCard, setSelectedReportCard] = useState(null);
    const [selectedSummaryCard, setSelectedSummaryCard] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    // --- KALKULASI INTEGRASI DATA GLOBAL ---

    // 1. Data Produk
    const productStats = useMemo(() => {
        const list = products || [];
        const total = list.length;
        const active = list.filter((p) => p.status === "Aktif").length;
        const inactive = total - active;
        return { total, active, inactive };
    }, []);

    // 2. Data Penjualan (Orders)
    const orderStats = useMemo(() => {
        const list = orders || [];
        const total = list.length;
        const completed = list.filter((o) => o.status === "Completed" || o.status === "Selesai").length;
        const cancelled = list.filter((o) => o.status === "Cancelled" || o.status === "Batal").length;
        const processing = total - completed - cancelled;
        return { total, completed, cancelled, processing };
    }, []);

    // 3. Data Persediaan (Inventory)
    const inventoryStats = useMemo(() => {
        const list = inventory || [];
        const currentStock = list.reduce((sum, item) => sum + (Number(item.currentStock) || 0), 0);
        const lowStock = list.filter((item) => item.currentStock <= item.minimumStock && item.currentStock > 0).length;
        const outOfStock = list.filter((item) => item.currentStock === 0).length;
        return { currentStock, lowStock, outOfStock };
    }, []);

    // 4. Data Keuangan (Finance)
    const financeStats = useMemo(() => {
        const revenueList = finance.revenueData || [];
        const expenseList = finance.expenseRecords || [];

        const totalRevenue = revenueList.reduce(
            (sum, item) => sum + (Number(item.revenue) || Number(item.amount) || Number(item.value) || 0),
            0
        );
        const totalExpense = expenseList.reduce(
            (sum, item) => sum + (Number(item.amount) || Number(item.value) || 0),
            0
        );
        const netProfit = totalRevenue - totalExpense;
        return { totalRevenue, totalExpense, netProfit };
    }, []);

    // 5. Data Pendanaan (Funding)
    const fundingStats = useMemo(() => {
        const list = funding || [];
        const totalProjects = list.length;
        const totalTarget = list.reduce((sum, item) => sum + (Number(item.fundingTarget) || 0), 0);
        const totalCollected = list.reduce((sum, item) => sum + (Number(item.fundCollected) || 0), 0);
        const completionRate = totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;
        return { totalProjects, totalTarget, totalCollected, completionRate };
    }, []);

    // 6. Data Analitik (Monthly Performance & Stats)
    const analyticsStats = useMemo(() => {
        const growth = analytics.salesGrowth || [];
        const bestSeller = analytics.bestSellingProduct || "Cabai Merah Organik";
        const activeCust = analytics.activeCustomers || 14;
        return { growth, bestSeller, activeCust };
    }, []);

    // Format ke Rupiah (IDR)
    const formatIDR = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(value);
    };

    // Handler untuk Aksi Ekspor & Cetak Laporan (UI Mock Feedback)
    const triggerExport = (type) => {
        setToastMessage(`Berhasil memproses dokumen: Laporan_Bisnis_${type}.xlsx/pdf sedang disiapkan.`);
        setTimeout(() => setToastMessage(null), 4000);
    };

    // Saringan Laporan Berdasarkan Pencarian & Kategori
    const reportCardsData = [
        {
            id: "produk",
            title: "Laporan Produk",
            category: "Produk",
            desc: "Status ketersediaan katalog dan rasio produk aktif.",
            stats: [
                { label: "Total Produk", value: productStats.total },
                { label: "Produk Aktif", value: productStats.active, color: "text-emerald-600" },
                { label: "Produk Nonaktif", value: productStats.inactive, color: "text-slate-500" }
            ],
            icon: Package,
            theme: "border-emerald-100 bg-emerald-50/20"
        },
        {
            id: "penjualan",
            title: "Laporan Penjualan",
            category: "Penjualan",
            desc: "Status transaksi penjualan dan volume pesanan masuk.",
            stats: [
                { label: "Total Pesanan", value: orderStats.total },
                { label: "Pesanan Selesai", value: orderStats.completed, color: "text-emerald-600" },
                { label: "Pesanan Batal", value: orderStats.cancelled, color: "text-rose-500" }
            ],
            icon: ShoppingCart,
            theme: "border-blue-100 bg-blue-50/20"
        },
        {
            id: "persediaan",
            title: "Laporan Persediaan",
            category: "Persediaan",
            desc: "Kesehatan pergudangan dan penanganan stok kritis.",
            stats: [
                { label: "Stok Total", value: `${inventoryStats.currentStock.toLocaleString("id-ID")} unit` },
                { label: "Stok Menipis", value: `${inventoryStats.lowStock} produk`, color: "text-amber-600" },
                { label: "Stok Habis", value: `${inventoryStats.outOfStock} produk`, color: "text-rose-600" }
            ],
            icon: ClipboardList,
            theme: "border-amber-100 bg-amber-50/20"
        },
        {
            id: "keuangan",
            title: "Laporan Keuangan",
            category: "Keuangan",
            desc: "Penjurnalan pendapatan kotor, beban pengeluaran, dan laba bersih.",
            stats: [
                { label: "Pendapatan", value: formatIDR(financeStats.totalRevenue) },
                { label: "Pengeluaran", value: formatIDR(financeStats.totalExpense), color: "text-rose-600" },
                { label: "Laba Bersih", value: formatIDR(financeStats.netProfit), color: "text-emerald-700" }
            ],
            icon: Wallet,
            theme: "border-green-100 bg-green-50/20"
        },
        {
            id: "analitik",
            title: "Laporan Analitik",
            category: "Analitik",
            desc: "Metrik pertumbuhan pasar, pelanggan aktif, dan produk terlaris.",
            stats: [
                { label: "Pelanggan Aktif", value: `${analyticsStats.activeCust} instansi` },
                { label: "Produk Terlaris", value: analyticsStats.bestSeller, color: "text-slate-800" }
            ],
            icon: ChartColumn,
            theme: "border-indigo-100 bg-indigo-50/20"
        },
        {
            id: "pendanaan",
            title: "Laporan Pendanaan",
            category: "Pendanaan",
            desc: "Status penggalangan investasi proyek pertanian aktif.",
            stats: [
                { label: "Total Proyek", value: fundingStats.totalProjects },
                { label: "Dana Terkumpul", value: formatIDR(fundingStats.totalCollected), color: "text-emerald-600" },
                { label: "Tingkat Realisasi", value: `${fundingStats.completionRate}%`, color: "text-blue-600" }
            ],
            icon: Coins,
            theme: "border-purple-100 bg-purple-50/20"
        }
    ];

    const filteredReportCards = useMemo(() => {
        return reportCardsData.filter((card) => {
            const matchesSearch =
                card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.desc.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = categoryFilter === "Semua" || card.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, categoryFilter]);

    // Data Keuangan untuk Grafik Recharts Area (Realisasi Finansial)
    const financialChartData = useMemo(() => {
        return (finance.revenueData || []).map((item) => ({
            name: item.month,
            "Pendapatan": Number(item.revenue) || Number(item.amount) || Number(item.value) || 0
        }));
    }, []);

    // Data Pertumbuhan untuk Grafik Recharts Bar (Pertumbuhan Bulanan)
    const growthChartData = useMemo(() => {
        return (analyticsStats.growth || []).map((item) => ({
            name: item.month,
            "Tingkat Pertumbuhan": Number(item.growth) || Number(item.sales) || 0
        }));
    }, [analyticsStats]);

    return (
        <>
            <Navbar1 />
            <div className="min-h-screen bg-slate-50/50 text-slate-800 p-4 md:p-8 font-sans">

                {/* CSS Injeksi untuk Animasi Akuntansi */}
                <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite 1.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

                {/* Floating Action Feedback Toast */}
                {toastMessage && (
                    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs md:text-sm font-semibold px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-slate-800 animate-fadeIn">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fadeIn">

                    {/* Page Hero Section */}
                    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden text-white flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-100 border border-emerald-700/50 tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Sistem Analisis Operasional & Finansial
                            </span>
                            <h1 className="text-3xl md:text-4.5xl font-black tracking-tight leading-tight">
                                Laporan Bisnis Terpadu
                            </h1>
                            <p className="text-emerald-200/80 text-sm md:text-base leading-relaxed">
                                Gabungkan seluruh aktivitas operasional, keuangan, penjualan, persediaan, dan pendanaan dalam satu laporan komprehensif yang mudah dievaluasi.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-2.5">
                                <button
                                    onClick={() => triggerExport("PDF")}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Ekspor PDF</span>
                                </button>
                                <button
                                    onClick={() => triggerExport("Excel")}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-all"
                                >
                                    <FileSpreadsheet className="w-4 h-4" />
                                    <span>Ekspor Excel</span>
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-all"
                                >
                                    <Printer className="w-4 h-4" />
                                    <span>Cetak Jurnal</span>
                                </button>
                            </div>
                        </div>

                        {/* Floating Decorative Glass Icons */}
                        <div className="relative h-28 w-56 shrink-0 hidden md:block select-none">
                            <div className="absolute right-4 top-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/15 animate-float">
                                <FileText className="w-8 h-8 text-amber-400" />
                            </div>
                            <div className="absolute right-24 top-10 bg-white/5 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-white/10 animate-float-delay">
                                <Printer className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="absolute right-36 top-0 bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-md border border-white/15 animate-float">
                                <Coins className="w-5 h-5 text-green-300" />
                            </div>
                        </div>
                    </div>

                    {/* Report Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div
                            onClick={() => setSelectedSummaryCard({ title: "Katalog Produk", desc: "Menampilkan jumlah seluruh varian produk hortikultura dan peternakan aktif.", detail: `${productStats.total} produk terdaftar.` })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Produk</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{productStats.total}</p>
                                </div>
                            </div>
                            <Eye className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setSelectedSummaryCard({ title: "Volume Penjualan", desc: "Total kuantitas pesanan masuk yang diproses dalam periode berjalan.", detail: `${orderStats.total} transaksi terdaftar.` })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                    <ShoppingCart className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pesanan</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{orderStats.total}</p>
                                </div>
                            </div>
                            <Eye className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setSelectedSummaryCard({ title: "Realisasi Pendapatan", desc: "Total pemasukan kotor dari seluruh operasional bisnis vendor.", detail: `${formatIDR(financeStats.totalRevenue)} terkumpul.` })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-green-50 text-green-600 border border-green-100/55">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pendapatan</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{formatIDR(financeStats.totalRevenue)}</p>
                                </div>
                            </div>
                            <Eye className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setSelectedSummaryCard({ title: "Portofolio Pendanaan", desc: "Proyek penggalangan dana aktif untuk kebutuhan ekspansi bisnis pertanian.", detail: `${fundingStats.totalProjects} proyek permodalan.` })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/55">
                                    <BriefcaseBusiness className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Proyek Pendanaan</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{fundingStats.totalProjects}</p>
                                </div>
                            </div>
                            <Eye className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>
                    </div>

                    {/* Filters and Controls Toolbar */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-xs">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari jenis laporan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider mr-1">
                                <Filter className="w-4 h-4" />
                                <span>Saring:</span>
                            </div>

                            {/* Period Filter */}
                            <select
                                value={periodFilter}
                                onChange={(e) => setPeriodFilter(e.target.value)}
                                className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="Hari Ini">Hari Ini</option>
                                <option value="Minggu Ini">Minggu Ini</option>
                                <option value="Bulan Ini">Bulan Ini</option>
                                <option value="Tahun Ini">Tahun Ini</option>
                            </select>

                            {/* Category Filter */}
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="Semua">Semua Laporan</option>
                                <option value="Produk">Produk</option>
                                <option value="Penjualan">Penjualan</option>
                                <option value="Persediaan">Persediaan</option>
                                <option value="Keuangan">Keuangan</option>
                                <option value="Analitik">Analitik</option>
                                <option value="Pendanaan">Pendanaan</option>
                            </select>
                        </div>
                    </div>

                    {/* Business Statistics Summary Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Produk Terlaris</span>
                            <span className="text-sm font-extrabold text-slate-900 mt-1 block truncate">{analyticsStats.bestSeller}</span>
                            <span className="text-[10px] text-emerald-600 font-semibold mt-3 block">Volume penjualan tertinggi</span>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Rata-rata Omset</span>
                            <span className="text-sm font-extrabold text-slate-900 mt-1 block">{formatIDR(financeStats.totalRevenue / 12)}</span>
                            <span className="text-[10px] text-slate-400 font-medium mt-3 block">Kalkulasi basis bulanan</span>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pelanggan Aktif</span>
                            <span className="text-sm font-extrabold text-slate-900 mt-1 block">{analyticsStats.activeCust} Mitra</span>
                            <span className="text-[10px] text-blue-600 font-semibold mt-3 block">Frekuensi pesanan konsisten</span>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pencapaian Modal</span>
                            <span className="text-sm font-extrabold text-slate-900 mt-1 block">{fundingStats.completionRate}%</span>
                            <span className="text-[10px] text-emerald-600 font-semibold mt-3 block">Total serapan pendanaan</span>
                        </div>
                    </div>

                    {/* Interactive Workspace Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">

                        {/* Left Block: Comprehensive Report Category Cards (2/3 width) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-emerald-600" />
                                    <span>Katalog Laporan Operasional</span>
                                </h2>
                                <p className="text-xs text-slate-400 mt-0.5 font-medium">Klik pada salah satu jenis laporan untuk melihat statistik terperinci.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {filteredReportCards.map((card) => {
                                    const CardIcon = card.icon;
                                    return (
                                        <div
                                            key={card.id}
                                            onClick={() => setSelectedReportCard(card)}
                                            className="bg-white rounded-3xl border border-slate-100 shadow-xs p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4 group/card cursor-pointer"
                                        >
                                            <div className="space-y-2.5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                                                        {card.category}
                                                    </span>
                                                    <div className={`p-2 rounded-xl border ${card.theme}`}>
                                                        <CardIcon className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                <h3 className="font-extrabold text-slate-950 text-base group-hover/card:text-emerald-700 transition-colors">
                                                    {card.title}
                                                </h3>
                                                <p className="text-xs text-slate-400 leading-relaxed">
                                                    {card.desc}
                                                </p>
                                            </div>

                                            <div className="pt-3 border-t border-slate-50 grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                                                {card.stats.map((st, i) => (
                                                    <div key={i} className="space-y-0.5">
                                                        <span className="text-slate-400 block truncate">{st.label}</span>
                                                        <span className={`text-xs block font-extrabold truncate ${st.color || "text-slate-800"}`}>{st.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Block: Analytical Performance Reporting (1/3 width) */}
                        <div className="space-y-6 md:space-y-8">
                            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-6">
                                <div className="border-b border-slate-100 pb-3">
                                    <h3 className="font-bold text-slate-900 text-base">Performa Finansial Terpadu</h3>
                                    <p className="text-[11px] text-slate-400 mt-0.5">Jurnal pendapatan bulanan dalam siklus kas tahunan.</p>
                                </div>

                                {/* Area Chart: Revenue Trend */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                                        <span>Tren Pendapatan Bulanan</span>
                                    </h4>
                                    <div className="h-44 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={financialChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                                                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} tickFormatter={(v) => `Rp${v / 1000000}JT`} />
                                                <Tooltip formatter={(value) => [formatIDR(value)]} contentStyle={{ fontSize: "11px", borderRadius: "8px" }} />
                                                <Area type="monotone" dataKey="Pendapatan" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Bar Chart: Sales Growth Trend */}
                                <div className="space-y-2 pt-4 border-t border-slate-50">
                                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                        <ChartColumn className="w-4 h-4 text-emerald-600" />
                                        <span>Siklus Pertumbuhan Pasar</span>
                                    </h4>
                                    <div className="h-44 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={growthChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={16}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                                                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                                                <Tooltip formatter={(value) => [`${value}%`, "Pertumbuhan"]} contentStyle={{ fontSize: "10px" }} />
                                                <Bar dataKey="Tingkat Pertumbuhan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                {/* ==================================== DETAIL MODALS ==================================== */}

                {/* 1. Modal Detail Laporan Operasional */}
                {selectedReportCard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden transform scale-100 transition-all text-sm">

                            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white px-6 py-5 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Rekonsiliasi Jurnal Terpadu</p>
                                    <h3 className="text-base font-extrabold mt-0.5">{selectedReportCard.title}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedReportCard(null)}
                                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                                        Kategori: {selectedReportCard.category}
                                    </span>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-2.5">
                                        {selectedReportCard.desc} Laporan ini dirancang untuk audit, rekonsiliasi kas, serta koordinasi persediaan berkala.
                                    </p>
                                </div>

                                {/* Rincian parameter statis dinamis */}
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3.5 text-xs font-semibold text-slate-600">
                                    {selectedReportCard.stats.map((st, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200/40 last:border-0 last:pb-0">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                {st.label}
                                            </span>
                                            <span className={`text-sm font-extrabold ${st.color || "text-slate-900"}`}>{st.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between text-xs">
                                    <div>
                                        <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Status Berkas</span>
                                        <span className="text-[11px] text-slate-400 font-semibold">Tervalidasi Sistem Jurnal</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-emerald-400 block">Selesai Audit</span>
                                        <span className="text-[9px] text-slate-400">Update otomatis</span>
                                    </div>
                                </div>

                                <div className="pt-2 flex gap-2.5">
                                    <button
                                        onClick={() => {
                                            setSelectedReportCard(null);
                                            triggerExport(selectedReportCard.title.replace(/\s+/g, "_"));
                                        }}
                                        className="flex-1 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all text-center"
                                    >
                                        Ekspor Dokumen
                                    </button>
                                    <button
                                        onClick={() => setSelectedReportCard(null)}
                                        className="px-5 py-3 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all text-center"
                                    >
                                        Tutup
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                )}

                {/* 2. Modal Deskripsi Metrik Ringkasan */}
                {selectedSummaryCard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-sm w-full p-6 text-center transform scale-100 transition-all text-sm space-y-4">
                            <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-base font-extrabold text-slate-900">{selectedSummaryCard.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{selectedSummaryCard.desc}</p>
                                <div className="bg-slate-50 rounded-xl p-2.5 mt-2 border border-slate-100 text-xs font-bold text-emerald-800">
                                    Nilai Jurnal: {selectedSummaryCard.detail}
                                </div>
                            </div>
                            <div className="pt-2">
                                <button
                                    onClick={() => setSelectedSummaryCard(null)}
                                    className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
                                >
                                    Tutup Deskripsi
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}