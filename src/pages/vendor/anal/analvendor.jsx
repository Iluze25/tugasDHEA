import React, { useState, useMemo, useEffect } from "react";
import { analytics } from "../datavendor.jsx";
import { products } from "../datavendor.jsx";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import {
    BarChart3,
    LineChart as LineChartIcon,
    TrendingUp,
    TrendingDown,
    PieChart,
    Wallet,
    Coins,
    Users,
    Package,
    ShoppingCart,
    Calendar,
    Filter,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    X,
    Info,
    Leaf,
    Sparkles,
    Download,
    Award,
    BookOpen
} from "lucide-react";
import Navbar1 from "../../../components/vendor/navbar.jsx"

export default function AgrobusinessAnalytics() {
    // --- STATE ---
    const [quarterFilter, setQuarterFilter] = useState("all"); // 'all' | 'Q1' | 'Q2' | 'Q3' | 'Q4'
    const [sortBy, setSortBy] = useState("highest"); // 'highest' | 'lowest'
    const [searchQuery, setSearchQuery] = useState("");
    const [activeModal, setActiveModal] = useState(null); // 'sales' | 'revenue' | 'product' | 'customer' | null
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);

    // --- HELPER UNTUK FILTER KUARTAL ---
    const getQuarter = (monthStr) => {
        if (!monthStr) return "Q1";
        const m = monthStr.toLowerCase();
        if (m.includes("jan") || m.includes("feb") || m.includes("mar") || m.includes("1") || m.includes("2") || m.includes("3")) return "Q1";
        if (m.includes("apr") || m.includes("mei") || m.includes("jun") || m.includes("may") || m.includes("4") || m.includes("5") || m.includes("6")) return "Q2";
        if (m.includes("jul") || m.includes("agu") || m.includes("aug") || m.includes("sep") || m.includes("7") || m.includes("8") || m.includes("9")) return "Q3";
        if (m.includes("okt") || m.includes("oct") || m.includes("nov") || m.includes("des") || m.includes("dec") || m.includes("10") || m.includes("11") || m.includes("12")) return "Q4";
        return "Q1";
    };

    // --- SAFE ACCESSORS & FALLBACKS ---
    // Menjamin program tidak crash meskipun terdapat variasi kecil pada skema mock data
    const safeSalesGrowth = useMemo(() => analytics?.salesGrowth || [], []);
    const safeRevenueStats = useMemo(() => analytics?.revenueStatistics || {}, []);
    const safeBestSelling = useMemo(() => analytics?.bestSellingProducts || [], []);
    const safeCustomerTrends = useMemo(() => analytics?.customerTrends || [], []);
    const safeProducts = useMemo(() => products || [], []);

    // --- DETEKSI KUNCI DATA DYNAMIC ---
    const salesKey = useMemo(() => {
        if (safeSalesGrowth.length === 0) return "sales";
        const first = safeSalesGrowth[0];
        return Object.keys(first).find(k => k === "sales" || k === "totalSales" || k === "quantity") || "sales";
    }, [safeSalesGrowth]);

    const revenueKey = useMemo(() => {
        if (safeSalesGrowth.length === 0) return "revenue";
        const first = safeSalesGrowth[0];
        return Object.keys(first).find(k => k.toLowerCase().includes("rev") || k.toLowerCase().includes("pendapatan") || k.toLowerCase().includes("omset")) || "revenue";
    }, [safeSalesGrowth]);

    const newCustomerKey = useMemo(() => {
        if (safeCustomerTrends.length === 0) return "newCustomer";
        const first = safeCustomerTrends[0];
        return Object.keys(first).find(k => k.toLowerCase().includes("new") || k.toLowerCase().includes("baru")) || "newCustomer";
    }, [safeCustomerTrends]);

    const activeCustomerKey = useMemo(() => {
        if (safeCustomerTrends.length === 0) return "activeCustomer";
        const first = safeCustomerTrends[0];
        return Object.keys(first).find(k => k.toLowerCase().includes("active") || k.toLowerCase().includes("aktif") || k.toLowerCase().includes("pelanggan")) || "activeCustomer";
    }, [safeCustomerTrends]);

    // --- FORMAT CURRENCY ---
    const formatIDR = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    // --- PROSES DAN FILTER DATA ---
    const filteredSalesGrowth = useMemo(() => {
        if (quarterFilter === "all") return safeSalesGrowth;
        return safeSalesGrowth.filter((item) => getQuarter(item.month) === quarterFilter);
    }, [safeSalesGrowth, quarterFilter]);

    const filteredCustomerTrends = useMemo(() => {
        if (quarterFilter === "all") return safeCustomerTrends;
        return safeCustomerTrends.filter((item) => getQuarter(item.month) === quarterFilter);
    }, [safeCustomerTrends, quarterFilter]);

    // Menggabungkan best selling products dengan detail products menggunakan productId
    const processedBestSellers = useMemo(() => {
        return safeBestSelling.map((item) => {
            const prodInfo = safeProducts.find((p) => String(p.id) === String(item.productId));
            return {
                ...item,
                productName: prodInfo?.name || prodInfo?.productName || `Produk #${item.productId}`,
                category: prodInfo?.category || "Komoditas",
                image: prodInfo?.image || prodInfo?.imageUrl || "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=200",
                price: prodInfo?.price || 0,
            };
        });
    }, [safeBestSelling, safeProducts]);

    // Sort & Search Best Selling Products
    const sortedAndSearchedProducts = useMemo(() => {
        let result = processedBestSellers.filter((item) => {
            const matchSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchSearch;
        });

        return result.sort((a, b) => {
            if (sortBy === "highest") {
                return b.totalSold - a.totalSold;
            } else {
                return a.totalSold - b.totalSold;
            }
        });
    }, [processedBestSellers, searchQuery, sortBy]);

    // --- HITUNG ANALITIK KARTU UTAMA ---
    const totalSalesVal = useMemo(() => {
        return safeSalesGrowth.reduce((acc, item) => acc + (item[salesKey] || 0), 0);
    }, [safeSalesGrowth, salesKey]);

    const averageRevenueVal = useMemo(() => {
        return safeRevenueStats?.averageRevenue || 0;
    }, [safeRevenueStats]);

    const topProductVal = useMemo(() => {
        if (processedBestSellers.length === 0) return { productName: "N/A", totalSold: 0 };
        const sorted = [...processedBestSellers].sort((a, b) => b.totalSold - a.totalSold);
        return sorted[0];
    }, [processedBestSellers]);

    const activeCustomersVal = useMemo(() => {
        if (safeCustomerTrends.length === 0) return 0;
        const latest = safeCustomerTrends[safeCustomerTrends.length - 1];
        return latest?.[activeCustomerKey] || 0;
    }, [safeCustomerTrends, activeCustomerKey]);

    // --- DYNAMIC REVENUE STATS ---
    const highestRevenueVal = useMemo(() => {
        return safeRevenueStats?.highestRevenueValue ||
            (safeSalesGrowth.length > 0 ? Math.max(...safeSalesGrowth.map(item => item[revenueKey] || 0)) : 0);
    }, [safeRevenueStats, safeSalesGrowth, revenueKey]);

    const highestRevenueMonth = useMemo(() => {
        return safeRevenueStats?.highestRevenueMonth ||
            (safeSalesGrowth.length > 0 ? [...safeSalesGrowth].sort((a, b) => (b[revenueKey] || 0) - (a[revenueKey] || 0))[0]?.month : "Desember");
    }, [safeRevenueStats, safeSalesGrowth, revenueKey]);

    const lowestRevenueVal = useMemo(() => {
        return safeRevenueStats?.lowestRevenueValue ||
            (safeSalesGrowth.length > 0 ? Math.min(...safeSalesGrowth.map(item => item[revenueKey] || 0)) : 0);
    }, [safeRevenueStats, safeSalesGrowth, revenueKey]);

    const lowestRevenueMonth = useMemo(() => {
        return safeRevenueStats?.lowestRevenueMonth ||
            (safeSalesGrowth.length > 0 ? [...safeSalesGrowth].sort((a, b) => (a[revenueKey] || 0) - (b[revenueKey] || 0))[0]?.month : "Januari");
    }, [safeRevenueStats, safeSalesGrowth, revenueKey]);

    const seasonalGapPercent = useMemo(() => {
        if (lowestRevenueVal === 0) return 0;
        return (((highestRevenueVal - lowestRevenueVal) / lowestRevenueVal) * 100).toFixed(1);
    }, [highestRevenueVal, lowestRevenueVal]);

    // --- EXPORT SIMULATOR ---
    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setExportSuccess(true);
            setTimeout(() => setExportSuccess(false), 3000);
        }, 1200);
    };

    // --- TOOLTIP KUSTOM ---
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-xl max-w-xs transition-all duration-150">
                    <p className="text-xs font-bold text-slate-800 mb-2 border-b border-stone-100 pb-1">{label}</p>
                    <div className="space-y-1.5">
                        {payload.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between gap-4 text-xs font-semibold">
                                <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    {entry.name}:
                                </span>
                                <span className="text-slate-900 font-bold">
                                    {typeof entry.value === "number" && entry.dataKey.toLowerCase().includes("revenue")
                                        ? formatIDR(entry.value)
                                        : entry.value.toLocaleString("id-ID")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <Navbar1 />
            <div className="bg-[#FAF9F5] min-h-screen text-slate-800 font-sans p-4 md:p-8 selection:bg-emerald-100 selection:text-emerald-800">
                {/* CSS Animasi Khusus */}
                <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-4deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float-1 { animation: float 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-reverse 8s ease-in-out infinite; }
        .animate-float-3 { animation: float 7s ease-in-out infinite 1s; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

                <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">

                    {/* HERO SECTION */}
                    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-950 text-white rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-950/10 border border-emerald-900/20">
                        <div className="relative z-10 max-w-2xl space-y-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                Pusat Analisis Kinerja Usaha
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                                Analisis Performa Bisnis
                            </h1>
                            <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed font-light">
                                Visualisasikan pertumbuhan penjualan, pendapatan, pelanggan, dan performa produk untuk mendukung keputusan bisnis yang lebih cerdas.
                            </p>
                        </div>

                        {/* HERO DECORATIONS */}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-96 h-96 hidden lg:block pointer-events-none select-none">
                            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow" />

                            <div className="absolute top-10 left-10 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-emerald-200 shadow-xl animate-float-1">
                                <Leaf className="w-8 h-8" />
                            </div>

                            <div className="absolute top-20 right-8 p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-amber-300 shadow-xl animate-float-2">
                                <LineChartIcon className="w-10 h-10" />
                            </div>

                            <div className="absolute bottom-12 left-16 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-emerald-300 shadow-xl animate-float-3">
                                <Coins className="w-8 h-8" />
                            </div>

                            <div className="absolute bottom-20 right-14 p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-emerald-200 shadow-xl animate-float-1">
                                <BarChart3 className="w-9 h-9" />
                            </div>
                        </div>
                    </section>

                    {/* SEARCH & FILTER TOOLBAR */}
                    <div className="bg-white p-4 md:p-5 rounded-2xl border border-stone-200/60 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                                <Filter className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">Filter & Pengurutan</h3>
                                <p className="text-xs text-slate-500">Sesuaikan cakupan data visualisasi keuangan</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 lg:justify-end">
                            {/* Search Input */}
                            <div className="relative flex-1 max-w-xs">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Cari produk terlaris..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 placeholder-slate-400"
                                />
                            </div>

                            {/* Quarter Selector */}
                            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 overflow-x-auto shrink-0">
                                {["all", "Q1", "Q2", "Q3", "Q4"].map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => setQuarterFilter(q)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${quarterFilter === q
                                            ? "bg-white text-emerald-800 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800"
                                            }`}
                                    >
                                        {q === "all" ? "Semua" : q}
                                    </button>
                                ))}
                            </div>

                            {/* Sort Selector */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-stone-200 text-slate-600 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                            >
                                <option value="highest">Penjualan Tertinggi</option>
                                <option value="lowest">Penjualan Terendah</option>
                            </select>
                        </div>
                    </div>

                    {/* ANALYTICS SUMMARY CARDS */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Total Penjualan */}
                        <div
                            onClick={() => setActiveModal("sales")}
                            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-700 transition-colors">Total Penjualan</span>
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                    <ShoppingCart className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                                    {totalSalesVal.toLocaleString("id-ID")}{" "}
                                    <span className="text-sm font-semibold text-slate-400">Unit</span>
                                </h2>
                                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span>+12.4% vs kuartal lalu</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Rata-rata Pendapatan */}
                        <div
                            onClick={() => setActiveModal("revenue")}
                            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-700 transition-colors">Rata-rata Pendapatan</span>
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                    <Wallet className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight truncate">
                                    {formatIDR(averageRevenueVal)}
                                </h2>
                                <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Arus Kas Sangat Stabil</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Produk Terlaris */}
                        <div
                            onClick={() => setActiveModal("product")}
                            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-700 transition-colors">Produk Terlaris</span>
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                    <Package className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-lg font-extrabold text-slate-800 tracking-tight line-clamp-1">
                                    {topProductVal.productName}
                                </h2>
                                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                                    <Award className="w-4 h-4 text-amber-500" />
                                    <span>Terjual {topProductVal.totalSold?.toLocaleString("id-ID")} unit</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Pelanggan Aktif */}
                        <div
                            onClick={() => setActiveModal("customer")}
                            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-700 transition-colors">Pelanggan Aktif</span>
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                    <Users className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                                    {activeCustomersVal.toLocaleString("id-ID")}{" "}
                                    <span className="text-sm font-semibold text-slate-400">Mitra</span>
                                </h2>
                                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span>+8.2% bulan ini</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* LAYOUT GRID: SALES CHART & REVENUE STATS */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Sales Growth Chart */}
                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-extrabold text-slate-800 text-lg">Tren Pertumbuhan Penjualan</h3>
                                    <p className="text-xs text-slate-500">Visualisasi bulanan volume unit penjualan terdistribusi</p>
                                </div>
                                <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg uppercase tracking-wider">
                                    Kuartal: {quarterFilter === "all" ? "Semua" : quarterFilter}
                                </span>
                            </div>

                            <div className="w-full">
                                <ResponsiveContainer width="100%" height={320}>
                                    <LineChart data={filteredSalesGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.6)" vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey={salesKey}
                                            name="Unit Penjualan"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            dot={{ r: 4, strokeWidth: 2, stroke: "#ffffff", fill: "#10b981" }}
                                            activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Revenue Statistics Detail */}
                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex flex-col justify-between h-full space-y-6">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-lg">Analisis Statistik Pendapatan</h3>
                                <p className="text-xs text-slate-500">Pencapaian batas atas, bawah, dan rata-rata omset</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Highest */}
                                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col justify-between space-y-2">
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Tertinggi</span>
                                    <div>
                                        <h4 className="text-lg font-black text-emerald-700">{formatIDR(highestRevenueVal)}</h4>
                                        <span className="text-[10px] text-slate-400 font-semibold block">Bulan: {highestRevenueMonth}</span>
                                    </div>
                                </div>

                                {/* Lowest */}
                                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col justify-between space-y-2">
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Terendah</span>
                                    <div>
                                        <h4 className="text-lg font-black text-rose-700">{formatIDR(lowestRevenueVal)}</h4>
                                        <span className="text-[10px] text-slate-400 font-semibold block">Bulan: {lowestRevenueMonth}</span>
                                    </div>
                                </div>

                                {/* Average */}
                                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col justify-between space-y-2">
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Rata-rata</span>
                                    <div>
                                        <h4 className="text-lg font-black text-slate-800">{formatIDR(averageRevenueVal)}</h4>
                                        <span className="text-[10px] text-slate-400 font-semibold block">Setiap Bulan</span>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Ledger Info */}
                            <div className="p-4 bg-emerald-50/50 border border-emerald-100/60 rounded-2xl space-y-2.5">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                                        <Info className="w-4 h-4" />
                                    </div>
                                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Metrik Musiman Pertanian</h4>
                                </div>
                                <p className="text-xs text-emerald-800 leading-relaxed font-light">
                                    Selisih musiman ({seasonalGapPercent}%) mencerminkan fluktuasi panen raya. Struktur pembukuan taktis disarankan mengendapkan 15% surplus pendapatan tertinggi untuk menjaga kestabilan modal tanam baru.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* LAYOUT GRID: CUSTOMER TRENDS & BEST SELLING LIST */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Customer Trends Chart */}
                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-extrabold text-slate-800 text-lg">Tren Keaktifan Pelanggan</h3>
                                    <p className="text-xs text-slate-500">Perbandingan penetrasi kemitraan baru & retensi mitra aktif</p>
                                </div>
                                <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg uppercase tracking-wider">
                                    Analisis Loyalitas
                                </span>
                            </div>

                            <div className="w-full">
                                <ResponsiveContainer width="100%" height={320}>
                                    <LineChart data={filteredCustomerTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.6)" vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend
                                            verticalAlign="top"
                                            height={36}
                                            iconType="circle"
                                            iconSize={8}
                                            wrapperStyle={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey={newCustomerKey}
                                            name="Mitra Baru"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            dot={{ r: 4, strokeWidth: 2, stroke: "#ffffff", fill: "#10b981" }}
                                            activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey={activeCustomerKey}
                                            name="Mitra Aktif"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ r: 4, strokeWidth: 2, stroke: "#ffffff", fill: "#3b82f6" }}
                                            activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Best Selling Products */}
                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex flex-col justify-between space-y-6">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-lg">Rangking Distribusi Komoditas</h3>
                                <p className="text-xs text-slate-500">Peringkat 5 teratas berdasarkan unit produk yang terjual</p>
                            </div>

                            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                                {sortedAndSearchedProducts.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-2">
                                        <Package className="w-8 h-8 stroke-[1.5]" />
                                        <span className="text-xs">Produk tidak ditemukan atau tidak tersedia</span>
                                    </div>
                                ) : (
                                    sortedAndSearchedProducts.slice(0, 5).map((item, index) => {
                                        const maxSoldVal = Math.max(...processedBestSellers.map((p) => p.totalSold), 1);
                                        const progressWidth = (item.totalSold / maxSoldVal) * 100;

                                        let badge = null;
                                        if (index === 0) badge = "🥇";
                                        else if (index === 1) badge = "🥈";
                                        else if (index === 2) badge = "🥉";
                                        else badge = <span className="text-xs text-slate-400 font-bold ml-1">#{index + 1}</span>;

                                        return (
                                            <div
                                                key={item.productId}
                                                className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100 hover:border-emerald-200 transition-all"
                                            >
                                                <div className="w-8 flex justify-center items-center text-lg">{badge}</div>

                                                <img
                                                    src={item.image}
                                                    alt={item.productName}
                                                    className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                                                    onError={(e) => {
                                                        e.target.src = "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=200";
                                                    }}
                                                />

                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="font-bold text-slate-800 text-xs truncate block">
                                                            {item.productName}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                                                            {item.totalSold.toLocaleString("id-ID")} unit
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                                                        <span>{item.category}</span>
                                                        <span>{formatIDR(item.price)}</span>
                                                    </div>

                                                    <div className="w-full bg-stone-200/60 h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                                                            style={{ width: `${progressWidth}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </section>

                    {/* MONTHLY PERFORMANCE AREA CHART */}
                    <section className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-lg">Analisis Arus Pendapatan (Revenue)</h3>
                                <p className="text-xs text-slate-500">Representasi visual total omset usaha agribisnis bulanan</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span className="text-xs font-bold text-slate-600">Total Revenue (IDR)</span>
                            </div>
                        </div>

                        <div className="w-full">
                            <ResponsiveContainer width="100%" height={360}>
                                <AreaChart data={filteredSalesGrowth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.6)" vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `Rp${(value / 1000000).toFixed(0)}M`}
                                        tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey={revenueKey}
                                        name="Pendapatan Bulanan"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenueGrad)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                </div>

                {/* DETAIL MODAL OVERLAY */}
                {activeModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
                            onClick={() => {
                                setActiveModal(null);
                                setExportSuccess(false);
                            }}
                        />

                        {/* Modal Container */}
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-stone-100 z-10 animate-scale-in flex flex-col justify-between">
                            {/* Modal Close Button */}
                            <button
                                onClick={() => {
                                    setActiveModal(null);
                                    setExportSuccess(false);
                                }}
                                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-stone-100 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Dynamic Content */}
                            {activeModal === "sales" && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                                            <ShoppingCart className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-extrabold text-slate-800">Detail Volume Transaksi Penjualan</h2>
                                            <p className="text-xs text-slate-500">Rincian kuantitas terdistribusi dan rasio pertumbuhan bulanan</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-150">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Akumulasi Penjualan</span>
                                            <span className="text-2xl font-black text-slate-800">{totalSalesVal.toLocaleString("id-ID")} Unit</span>
                                        </div>
                                        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-150">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Rata-rata Bulanan</span>
                                            <span className="text-2xl font-black text-slate-800">
                                                {(totalSalesVal / (safeSalesGrowth.length || 1)).toFixed(0).toLocaleString("id-ID")} Unit
                                            </span>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto rounded-2xl border border-stone-150">
                                        <table className="w-full text-left border-collapse text-xs">
                                            <thead>
                                                <tr className="bg-stone-50 text-slate-500 font-bold border-b border-stone-150">
                                                    <th className="p-3">Bulan Periode</th>
                                                    <th className="p-3 text-right">Volume (Unit)</th>
                                                    <th className="p-3 text-right">Kontribusi Relatif</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-stone-100">
                                                {safeSalesGrowth.map((item) => {
                                                    const val = item[salesKey] || 0;
                                                    const pct = totalSalesVal > 0 ? ((val / totalSalesVal) * 100).toFixed(1) : 0;
                                                    return (
                                                        <tr key={item.month} className="hover:bg-stone-50/50 text-slate-700">
                                                            <td className="p-3 font-bold">{item.month}</td>
                                                            <td className="p-3 text-right font-semibold text-slate-900">{val.toLocaleString("id-ID")} unit</td>
                                                            <td className="p-3 text-right font-bold text-emerald-700">{pct}%</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-4 bg-emerald-50 rounded-2xl text-xs text-emerald-800 leading-relaxed font-light">
                                        <strong>Rekomendasi Akuntansi:</strong> Volume penjualan menunjukkan konsistensi tinggi di atas target dasar. Disarankan peningkatan kuota bahan baku pada pertengahan tahun untuk mengantisipasi lonjakan musiman.
                                    </div>
                                </div>
                            )}

                            {activeModal === "revenue" && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                                            <Wallet className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-extrabold text-slate-800">Detail Analisis Arus Pendapatan</h2>
                                            <p className="text-xs text-slate-500">Statistik audit kas masuk dan manajemen dividen operasional</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-150">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Puncak Omset Terbaik ({highestRevenueMonth})</span>
                                            <span className="text-xl font-black text-emerald-700">{formatIDR(highestRevenueVal)}</span>
                                        </div>
                                        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-150">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Titik Minimum Panen ({lowestRevenueMonth})</span>
                                            <span className="text-xl font-black text-rose-700">{formatIDR(lowestRevenueVal)}</span>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto rounded-2xl border border-stone-150">
                                        <table className="w-full text-left border-collapse text-xs">
                                            <thead>
                                                <tr className="bg-stone-50 text-slate-500 font-bold border-b border-stone-150">
                                                    <th className="p-3">Bulan</th>
                                                    <th className="p-3 text-right">Revenue (IDR)</th>
                                                    <th className="p-3 text-right">Rasio Terhadap Rata-rata</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-stone-100">
                                                {safeSalesGrowth.map((item) => {
                                                    const val = item[revenueKey] || 0;
                                                    const ratio = averageRevenueVal > 0 ? ((val / averageRevenueVal) * 100).toFixed(0) : 0;
                                                    return (
                                                        <tr key={item.month} className="hover:bg-stone-50/50 text-slate-700">
                                                            <td className="p-3 font-bold">{item.month}</td>
                                                            <td className="p-3 text-right font-semibold text-slate-900">{formatIDR(val)}</td>
                                                            <td className={`p-3 text-right font-bold ${val >= averageRevenueVal ? "text-emerald-700" : "text-amber-600"}`}>
                                                                {ratio}%
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-4 bg-emerald-50 rounded-2xl text-xs text-emerald-800 leading-relaxed font-light">
                                        <strong>Rekomendasi Strategis:</strong> Selisih operasional antara periode tertinggi dan terendah bernilai cukup signifikan. Disarankan penetapan limit pengeluaran modal tetap pada kuartal yang terdeteksi memiliki pendapatan di bawah rata-rata nasional.
                                    </div>
                                </div>
                            )}

                            {activeModal === "product" && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-extrabold text-slate-800">Portofolio Komoditas & Distribusi</h2>
                                            <p className="text-xs text-slate-500">Estimasi total kontribusi nilai penjualan berdasarkan katalog produk aktif</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                                        {processedBestSellers.map((item, index) => {
                                            const estimatedValue = item.totalSold * item.price;
                                            return (
                                                <div key={item.productId} className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-150">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <span className="font-bold text-slate-400 text-xs shrink-0">#{index + 1}</span>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-slate-800 text-xs truncate">{item.productName}</p>
                                                            <p className="text-[10px] text-slate-400 font-semibold">{item.category}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="text-xs font-black text-emerald-700">{formatIDR(estimatedValue)}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold">{item.totalSold.toLocaleString("id-ID")} Unit Terjual</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="p-4 bg-emerald-50 rounded-2xl text-xs text-emerald-800 leading-relaxed font-light">
                                        <strong>Saran Inventaris:</strong> Produk 3 teratas memberikan kontribusi dominan ({((Math.max(...processedBestSellers.map(p => p.totalSold || 0)) / (totalSalesVal || 1)) * 100).toFixed(0)}% dari total volume). Prioritaskan ketersediaan pengemasan premium dan logistik distribusi kilat untuk klaster ini.
                                    </div>
                                </div>
                            )}

                            {activeModal === "customer" && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-extrabold text-slate-800">Retensi & Akuisisi Mitra Pelanggan</h2>
                                            <p className="text-xs text-slate-500">Kepadatan pendaftaran pelanggan baru terhadap keaktifan bulanan</p>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto rounded-2xl border border-stone-150">
                                        <table className="w-full text-left border-collapse text-xs">
                                            <thead>
                                                <tr className="bg-stone-50 text-slate-500 font-bold border-b border-stone-150">
                                                    <th className="p-3">Bulan</th>
                                                    <th className="p-3 text-right">Mitra Baru</th>
                                                    <th className="p-3 text-right">Mitra Aktif</th>
                                                    <th className="p-3 text-right">Rasio Akuisisi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-stone-100">
                                                {safeCustomerTrends.map((item) => {
                                                    const fresh = item[newCustomerKey] || 0;
                                                    const loyal = item[activeCustomerKey] || 1;
                                                    const ratio = ((fresh / loyal) * 100).toFixed(0);
                                                    return (
                                                        <tr key={item.month} className="hover:bg-stone-50/50 text-slate-700">
                                                            <td className="p-3 font-bold">{item.month}</td>
                                                            <td className="p-3 text-right font-semibold text-emerald-700">+{fresh}</td>
                                                            <td className="p-3 text-right font-semibold text-slate-900">{loyal}</td>
                                                            <td className="p-3 text-right font-bold text-blue-600">{ratio}%</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-4 bg-emerald-50 rounded-2xl text-xs text-emerald-800 leading-relaxed font-light">
                                        <strong>Evaluasi Kemitraan:</strong> Pertumbuhan konsisten pada kelompok mitra aktif mencerminkan kepercayaan tinggi. Fokus strategis adalah meluncurkan program kemitraan berbasis reward untuk meminimalkan churn rate pada bulan-bulan paceklik.
                                    </div>
                                </div>
                            )}

                            {/* Modal Footer */}
                            <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    Laporan Keuangan Resmi Vendor
                                </span>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button
                                        onClick={handleExport}
                                        disabled={isExporting}
                                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-emerald-700 text-white hover:bg-emerald-800 disabled:bg-emerald-400 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-750/10"
                                    >
                                        <Download className={`w-3.5 h-3.5 ${isExporting ? "animate-spin" : ""}`} />
                                        {isExporting ? "Mengekspor..." : "Ekspor PDF / Excel"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveModal(null);
                                            setExportSuccess(false);
                                        }}
                                        className="flex-1 sm:flex-initial px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold rounded-xl transition-all border border-stone-200"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>

                            {/* Export Success Alert Toast */}
                            {exportSuccess && (
                                <div className="mt-4 p-3 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center animate-scale-in">
                                    Data Berhasil Diekspor Ke Penyimpanan Perangkat.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}