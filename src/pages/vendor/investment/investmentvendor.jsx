import React, { useState, useMemo } from "react";
import { funding as initialFunding } from "../datavendor";
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
    PieChart,
    Pie,
    Legend
} from "recharts";
import {
    Leaf,
    Coins,
    Wallet,
    Landmark,
    HandCoins,
    TrendingUp,
    BriefcaseBusiness,
    Target,
    ChartColumn,
    PieChart as PieIcon,
    Search,
    Filter,
    Calendar,
    CircleCheck,
    X,
    Eye,
    Plus,
    Users,
    Percent,
    BookOpen,
    Info,
    ChevronRight,
    HelpCircle,
    TrendingDown
} from "lucide-react";

export default function FundingPage() {
    // State utama proyek pendanaan
    const [fundingList, setFundingList] = useState(initialFunding);

    // State untuk pencarian, saringan, dan pengurutan
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [categoryFilter, setCategoryFilter] = useState("Semua");
    const [sortBy, setSortBy] = useState("Target terbesar");

    // State Kontrol Modal
    const [selectedProject, setSelectedProject] = useState(null); // Detail Modal
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Proposal Modal
    const [metricModal, setMetricModal] = useState(null); // Metrik Info Modal

    // State Form Proposal Baru
    const [proposalForm, setProposalForm] = useState({
        projectName: "",
        category: "Pertanian Sayuran",
        fundingTarget: "",
        description: "",
        estimatedReturn: "",
        status: "Menunggu Dukungan"
    });

    // Perhitungan Keuangan Global
    const stats = useMemo(() => {
        const totalProjects = fundingList.length;
        const totalTarget = fundingList.reduce((sum, item) => sum + (Number(item.fundingTarget) || 0), 0);
        const totalCollected = fundingList.reduce((sum, item) => sum + (Number(item.fundCollected) || 0), 0);
        const overallRate = totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;

        return { totalProjects, totalTarget, totalCollected, overallRate };
    }, [fundingList]);

    // Saringan (Filter) & Pencarian (Search) Dinamis
    const filteredAndSortedProjects = useMemo(() => {
        let result = fundingList.filter((item) => {
            const matchesSearch =
                item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === "Semua" || item.status === statusFilter;
            const matchesCategory = categoryFilter === "Semua" || item.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });

        // Pengurutan
        if (sortBy === "Target terbesar") {
            result.sort((a, b) => b.fundingTarget - a.fundingTarget);
        } else if (sortBy === "Dana terkumpul terbanyak") {
            result.sort((a, b) => b.fundCollected - a.fundCollected);
        } else if (sortBy === "Progress tertinggi") {
            result.sort((a, b) => {
                const rateA = a.fundingTarget > 0 ? a.fundCollected / a.fundingTarget : 0;
                const rateB = b.fundingTarget > 0 ? b.fundCollected / b.fundingTarget : 0;
                return rateB - rateA;
            });
        }

        return result;
    }, [fundingList, searchQuery, statusFilter, categoryFilter, sortBy]);

    // Data Visualisasi Recharts 1: Bar Chart Perbandingan Target vs Realisasi
    const barChartData = useMemo(() => {
        return fundingList.slice(0, 5).map((item) => ({
            name: item.projectName.length > 15 ? `${item.projectName.slice(0, 15)}...` : item.projectName,
            "Target": item.fundingTarget,
            "Terkumpul": item.fundCollected
        }));
    }, [fundingList]);

    // Data Visualisasi Recharts 2: Distribusi Kategori Pendanaan
    const pieChartData = useMemo(() => {
        const categoriesMap = {};
        fundingList.forEach((item) => {
            categoriesMap[item.category] = (categoriesMap[item.category] || 0) + 1;
        });

        const colors = ["#059669", "#d97706", "#2563eb", "#7c3aed", "#db2777"];
        return Object.keys(categoriesMap).map((key, idx) => ({
            name: key,
            value: categoriesMap[key],
            fill: colors[idx % colors.length]
        }));
    }, [fundingList]);

    // Handler: Mengirim Proposal Pendanaan Baru
    const handleCreateProposalSubmit = (e) => {
        e.preventDefault();

        const targetNum = Number(proposalForm.fundingTarget);
        if (isNaN(targetNum) || targetNum <= 0) {
            alert("Masukkan nominal target pendanaan yang valid.");
            return;
        }

        const newProject = {
            id: `FUND-${Date.now().toString().slice(-6)}`,
            projectName: proposalForm.projectName,
            category: proposalForm.category,
            fundingTarget: targetNum,
            fundCollected: 0, // Proyek baru dimulai dari nol
            description: proposalForm.description,
            estimatedReturn: proposalForm.estimatedReturn,
            status: proposalForm.status
        };

        setFundingList([newProject, ...fundingList]);
        setIsCreateModalOpen(false);
        setProposalForm({
            projectName: "",
            category: "Pertanian Sayuran",
            fundingTarget: "",
            description: "",
            estimatedReturn: "",
            status: "Menunggu Dukungan"
        });
    };

    // Kalkulasi Warna Progress Bar Dinamis (Sesuai Aturan Sistem)
    const getProgressColor = (percent) => {
        if (percent <= 30) return "bg-rose-500";
        if (percent <= 70) return "bg-amber-500";
        return "bg-emerald-600";
    };

    const getProgressTextColor = (percent) => {
        if (percent <= 30) return "text-rose-600";
        if (percent <= 70) return "text-amber-600";
        return "text-emerald-700";
    };

    // Helper Badge Status Proyek
    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "Menunggu Dukungan":
                return "bg-amber-50 text-amber-700 border border-amber-200/50";
            case "Sedang Berjalan":
                return "bg-blue-50 text-blue-700 border border-blue-200/50";
            case "Selesai":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
            case "Draft":
                return "bg-slate-100 text-slate-600 border border-slate-200";
            case "Dibatalkan":
                return "bg-rose-50 text-rose-700 border border-rose-200/50";
            default:
                return "bg-slate-50 text-slate-700 border border-slate-200";
        }
    };

    // Format ke Rupiah (IDR)
    const formatIDR = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(value);
    };

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

                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fadeIn">

                    {/* Page Hero Section */}
                    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden text-white flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-100 border border-emerald-700/50 tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Sistem Investasi & Permodalan Vendor
                            </span>
                            <h1 className="text-3xl md:text-4.5xl font-black tracking-tight leading-tight">
                                Pendanaan Bisnis Pertanian
                            </h1>
                            <p className="text-emerald-200/80 text-sm md:text-base leading-relaxed">
                                Kelola proyek pendanaan, pantau perkembangan modal, dan bangun peluang pertumbuhan usaha melalui dukungan investor secara transparan.
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all transform hover:-translate-y-0.5"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Buat Proposal Pendanaan</span>
                                </button>
                            </div>
                        </div>

                        {/* Floating Decorative Glass Icons (Kanan) */}
                        <div className="relative h-28 w-56 shrink-0 hidden md:block select-none">
                            <div className="absolute right-4 top-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/15 animate-float">
                                <Coins className="w-8 h-8 text-amber-400" />
                            </div>
                            <div className="absolute right-24 top-10 bg-white/5 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-white/10 animate-float-delay">
                                <Landmark className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="absolute right-36 top-0 bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-md border border-white/15 animate-float">
                                <Leaf className="w-5 h-5 text-green-300" />
                            </div>
                        </div>
                    </div>

                    {/* Funding Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                        <div
                            onClick={() => setMetricModal({ title: "Total Proyek", desc: "Jumlah keseluruhan inisiatif penggalangan dana pertanian yang terdaftar di database." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
                                    <BriefcaseBusiness className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Proyek</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{stats.totalProjects}</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setMetricModal({ title: "Total Target", desc: "Akumulasi target kebutuhan modal dari seluruh proyek pertanian aktif." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Pendanaan</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{formatIDR(stats.totalTarget)}</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setMetricModal({ title: "Total Dana Terkumpul", desc: "Jumlah keseluruhan pendanaan nyata yang telah disalurkan oleh investor." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-green-50 text-green-600 border border-green-100/55">
                                    <Coins className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dana Terkumpul</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{formatIDR(stats.totalCollected)}</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setMetricModal({ title: "Tingkat Pendanaan", desc: "Persentase pencapaian realisasi pengumpulan modal dibandingkan target global." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/55">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tingkat Realisasi</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{stats.overallRate}%</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                    </div>

                    {/* Filters and Controls Toolbar */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-xs">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari proyek pendanaan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider mr-1">
                                <Filter className="w-4 h-4 text-slate-400" />
                                <span>Saring:</span>
                            </div>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Draft">Draft</option>
                                <option value="Menunggu Dukungan">Menunggu Dukungan</option>
                                <option value="Sedang Berjalan">Sedang Berjalan</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>

                            {/* Category Filter */}
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="Semua">Semua Kategori</option>
                                <option value="Pertanian Sayuran">Pertanian Sayuran</option>
                                <option value="Perkebunan">Perkebunan</option>
                                <option value="Peternakan">Peternakan</option>
                            </select>

                            {/* Sort Filter */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="Target terbesar">Target Terbesar</option>
                                <option value="Dana terkumpul terbanyak">Dana Terbanyak</option>
                                <option value="Progress tertinggi">Progress Tertinggi</option>
                            </select>
                        </div>
                    </div>

                    {/* Interactive Workspace Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">

                        {/* Main Column: Funding Projects List (2/3 width) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Title list */}
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <BriefcaseBusiness className="w-5 h-5 text-emerald-600" />
                                    <span>Katalog Proyek Aktif</span>
                                </h2>
                                <p className="text-xs text-slate-400 mt-0.5">Daftar portofolio kebutuhan pendanaan dan rincian alokasi modal.</p>
                            </div>

                            {/* List View Container */}
                            {filteredAndSortedProjects.length === 0 ? (
                                <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center text-slate-400 shadow-sm">
                                    <BriefcaseBusiness className="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300" />
                                    <p className="text-base font-bold text-slate-700">Proyek Tidak Ditemukan</p>
                                    <p className="text-xs mt-1">Ubah atau sesuaikan penyaringan filter Anda.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                    {filteredAndSortedProjects.map((project) => {
                                        const percent = project.fundingTarget > 0 ? Math.round((project.fundCollected / project.fundingTarget) * 100) : 0;
                                        const progressColorClass = getProgressColor(percent);
                                        const progressTextColorClass = getProgressTextColor(percent);

                                        return (
                                            <div
                                                key={project.id}
                                                className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4 group/card"
                                            >
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between gap-1.5">
                                                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                                                            {project.category}
                                                        </span>
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeStyle(project.status)}`}>
                                                            {project.status}
                                                        </span>
                                                    </div>

                                                    <h3 className="font-extrabold text-slate-950 text-base group-hover/card:text-emerald-700 transition-colors line-clamp-1">
                                                        {project.projectName}
                                                    </h3>
                                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                                        {project.description || "Tidak ada deskripsi singkat proyek."}
                                                    </p>
                                                </div>

                                                {/* Progress bar and metrics */}
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between text-xs font-semibold">
                                                        <span className="text-slate-400">Pencapaian Modal:</span>
                                                        <span className={`font-bold ${progressTextColorClass}`}>{percent}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${progressColorClass}`}
                                                            style={{ width: `${Math.min(100, percent)}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-[11px] font-bold pt-1">
                                                        <span className="text-slate-700">{formatIDR(project.fundCollected)}</span>
                                                        <span className="text-slate-400">Target: {formatIDR(project.fundingTarget)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-2.5 border-t border-slate-50 text-xs">
                                                    <div>
                                                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Est. Return</span>
                                                        <span className="font-bold text-emerald-700">{project.estimatedReturn}</span>
                                                    </div>

                                                    <button
                                                        onClick={() => setSelectedProject(project)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 font-bold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
                                                    >
                                                        <span>Rincian</span>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Progres Komparatif & Tingkat Keberhasilan Sekunder */}
                            <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base">Alokasi Ambangan & Rentang Keberhasilan</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">Metodologi standar status asupan modal per klaster.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                                    <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-rose-800 font-extrabold">Beban Awal (0 - 30%)</span>
                                            <span className="text-rose-600 bg-white border border-rose-200 px-1.5 py-0.2 rounded font-bold">Rendah</span>
                                        </div>
                                        <p className="text-[10px] text-rose-700/80 leading-normal">Fase inkubasi awal, dukungan publik masih minim atau proposal baru terbit.</p>
                                    </div>

                                    <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-800 font-extrabold">Fase Menengah (31 - 70%)</span>
                                            <span className="text-amber-600 bg-white border border-amber-200 px-1.5 py-0.2 rounded font-bold">Moderat</span>
                                        </div>
                                        <p className="text-[10px] text-amber-700/80 leading-normal">Akumulasi dukungan investor mulai menguat menuju pemenuhan logistik fisik.</p>
                                    </div>

                                    <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-emerald-800 font-extrabold">Fase Matang (71 - 100%)</span>
                                            <span className="text-emerald-600 bg-white border border-emerald-200 px-1.5 py-0.2 rounded font-bold">Mandiri</span>
                                        </div>
                                        <p className="text-[10px] text-emerald-700/80 leading-normal">Proyek siap eksekusi atau berada dalam tahap operasional penuh secara berkala.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Analytics & Investor Participation (1/3 width) */}
                        <div className="space-y-6 md:space-y-8">

                            {/* Recharts Analytics Reporting */}
                            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-6">
                                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base">Analisis Pendanaan</h3>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Proporsi target modal dan kategori proyek.</p>
                                    </div>
                                </div>

                                {/* Bar Chart: Target vs Collected */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                        <ChartColumn className="w-4 h-4 text-emerald-600" />
                                        <span>Komparasi Proyek Unggulan</span>
                                    </h4>
                                    <div className="h-48 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                                                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} tickFormatter={(v) => `Rp${v / 1000000}M`} />
                                                <Tooltip formatter={(value) => [formatIDR(value)]} contentStyle={{ fontSize: "11px", borderRadius: "8px" }} />
                                                <Bar dataKey="Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="Terkumpul" fill="#059669" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Pie Chart: Categories distribution */}
                                <div className="space-y-2 pt-2 border-t border-slate-50">
                                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                        <PieIcon className="w-4 h-4 text-emerald-600" />
                                        <span>Diversifikasi Aliansi Sektor</span>
                                    </h4>
                                    <div className="h-44 w-full flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieChartData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={35}
                                                    outerRadius={55}
                                                    paddingAngle={5}
                                                >
                                                    {pieChartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ fontSize: "10px" }} />
                                                <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: "9px" }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Investor Participation Overview */}
                            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4">
                                <div className="border-b border-slate-100 pb-2">
                                    <h3 className="font-bold text-slate-900 text-base">Estimasi Keikutsertaan</h3>
                                    <p className="text-[11px] text-slate-400 mt-0.5">Rasio investor terdaftar berdasarkan asupan modal.</p>
                                </div>

                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                    {fundingList.slice(0, 4).map((project) => {
                                        // Simulasi jumlah investor secara sistematis (agar tidak hardcoded static array)
                                        const estimatedInvestors = Math.round(project.fundCollected / 4500000) || 0;
                                        const percent = project.fundingTarget > 0 ? Math.round((project.fundCollected / project.fundingTarget) * 100) : 0;
                                        return (
                                            <div
                                                key={project.id}
                                                className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50/50 to-slate-100/30 border border-slate-100/80 flex gap-3 items-center justify-between"
                                            >
                                                <div className="min-w-0 space-y-1">
                                                    <p className="text-xs font-extrabold text-slate-900 truncate">{project.projectName}</p>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                                                        <Users className="w-3.5 h-3.5 text-slate-400" />
                                                        <span>{estimatedInvestors} Pemodal Aktif</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
                                                    <span className="text-xs font-extrabold text-slate-800">{percent}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* ==================================== MODAL WINDOWS ==================================== */}

                {/* 1. Modal Detail Proyek */}
                {selectedProject && (() => {
                    const percent = selectedProject.fundingTarget > 0 ? Math.round((selectedProject.fundCollected / selectedProject.fundingTarget) * 100) : 0;
                    const progressColorClass = getProgressColor(percent);
                    const progressTextColorClass = getProgressTextColor(percent);

                    return (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden transform scale-100 transition-all text-sm">

                                {/* Header Modal */}
                                <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white px-6 py-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Detail Permodalan Usaha</p>
                                        <h3 className="text-base font-bold flex items-center gap-2 mt-0.5">
                                            <span>ID: {selectedProject.id}</span>
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Konten Detail */}
                                <div className="p-6 space-y-6">

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between gap-1.5 border-b border-slate-100 pb-3">
                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                                                Kategori: {selectedProject.category}
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeStyle(selectedProject.status)}`}>
                                                {selectedProject.status}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-extrabold text-slate-950">{selectedProject.projectName}</h3>
                                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                                            {selectedProject.description || "Tidak ada deskripsi rinci untuk proposal ini."}
                                        </p>
                                    </div>

                                    {/* Progress detail */}
                                    <div className="space-y-2 bg-slate-50/70 p-4 border border-slate-100 rounded-2xl">
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-500">Tingkat Penyerapan Modal</span>
                                            <span className={`text-sm ${progressTextColorClass}`}>{percent}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${progressColorClass}`} style={{ width: `${Math.min(100, percent)}%` }} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-3 text-xs border-t border-slate-200/40 mt-1">
                                            <div>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Target Pokok</span>
                                                <span className="text-sm font-extrabold text-slate-800 block mt-0.5">{formatIDR(selectedProject.fundingTarget)}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Dana Diserap</span>
                                                <span className="text-sm font-extrabold text-slate-800 block mt-0.5">{formatIDR(selectedProject.fundCollected)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                                        <div>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimasi Pengembalian (Return)</span>
                                            <span className="text-sm font-bold text-emerald-700 mt-1 block">{selectedProject.estimatedReturn}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sisa Pemenuhan</span>
                                            <span className="text-sm font-bold text-slate-700 mt-1 block">
                                                {formatIDR(Math.max(0, selectedProject.fundingTarget - selectedProject.fundCollected))}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                                        >
                                            Tutup Informasi
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    );
                })()}

                {/* 2. Modal Form Proposal Pendanaan Baru */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden transform scale-100 transition-all text-sm">

                            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4.5 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2">
                                    <HandCoins className="w-5 h-5 text-emerald-600" />
                                    <h3 className="text-base font-bold text-slate-900">Buat Proposal Pendanaan</h3>
                                </div>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateProposalSubmit} className="p-6 space-y-4">

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Nama Proyek Pertanian *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Contoh: Modernisasi Sistem Irigasi Tomat"
                                        value={proposalForm.projectName}
                                        onChange={(e) => setProposalForm({ ...proposalForm, projectName: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Bisnis *</label>
                                    <select
                                        required
                                        value={proposalForm.category}
                                        onChange={(e) => setProposalForm({ ...proposalForm, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white font-semibold"
                                    >
                                        <option value="Pertanian Sayuran">Pertanian Sayuran</option>
                                        <option value="Perkebunan">Perkebunan</option>
                                        <option value="Peternakan">Peternakan</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Pendanaan (Rp) *</label>
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            placeholder="Contoh: 150000000"
                                            value={proposalForm.fundingTarget}
                                            onChange={(e) => setProposalForm({ ...proposalForm, fundingTarget: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Est. Return (% / Bulan) *</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Contoh: 8.5% - 10%"
                                            value={proposalForm.estimatedReturn}
                                            onChange={(e) => setProposalForm({ ...proposalForm, estimatedReturn: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Keterangan / Deskripsi Proyek *</label>
                                    <textarea
                                        required
                                        rows="3"
                                        placeholder="Deskripsikan detail rencana penggunaan dana, luas lahan, dan target keuntungan untuk meyakinkan calon investor..."
                                        value={proposalForm.description}
                                        onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status Awal</label>
                                    <select
                                        required
                                        value={proposalForm.status}
                                        onChange={(e) => setProposalForm({ ...proposalForm, status: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white font-semibold"
                                    >
                                        <option value="Menunggu Dukungan">Menunggu Dukungan</option>
                                        <option value="Draft">Draft</option>
                                    </select>
                                </div>

                                {/* Actions */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all"
                                    >
                                        Simpan Proposal
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

                {/* 3. Modal Deskripsi Metrik */}
                {metricModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-sm w-full p-6 text-center transform scale-100 transition-all text-sm space-y-4">
                            <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-base font-bold text-slate-900">{metricModal.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{metricModal.desc}</p>
                            </div>
                            <div className="pt-2">
                                <button
                                    onClick={() => setMetricModal(null)}
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