import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import {
    Leaf,
    Sprout,
    Wheat,
    Tractor,
    User,
    TrendingUp,
    Wallet,
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    Calendar,
    MapPin,
    DollarSign,
    Award,
    ArrowUpRight,
    Activity,
    Layers,
    Percent,
    CheckCircle2,
    TrendingDown,
    Clock,
    AlertTriangle,
    Maximize2,
    Minimize2,
    Play,
    Download,
    ExternalLink,
    MessageSquare
} from 'lucide-react';

// ==========================================
// MOCK DATA FOR CHARTS
// ==========================================

const investmentGrowthData = [
    { year: '2026', amount: 1.5, investors: 240 },
    { year: '2027', amount: 4.8, investors: 850 },
    { year: '2028', amount: 12.4, investors: 2100 },
    { year: '2029', amount: 28.2, investors: 5300 },
    { year: '2030', amount: 60.0, investors: 12000 },
];

const commodityRoiData = [
    { name: 'Melon', roi: 16.5 },
    { name: 'Red Rice', roi: 11.2 },
    { name: 'Chili', roi: 14.8 },
    { name: 'Honey Bee', roi: 18.0 },
];

const distributionData = [
    { name: 'Hortikultura', value: 45, color: '#059669' },
    { name: 'Pangan Pokok', value: 25, color: '#10b981' },
    { name: 'Apikultur', value: 20, color: '#d97706' },
    { name: 'Infrastruktur', value: 10, color: '#047857' },
];

const mockProjects = [
    {
        id: 1,
        title: 'Melon Golden Premium Hydroponic',
        farmer: 'Kelompok Tani Lestari',
        location: 'Cianjur, Jabar',
        roi: '16.5%',
        duration: '120 Hari',
        funded: 82,
        target: 150000000,
        current: 123000000,
        category: 'Hortikultura'
    },
    {
        id: 2,
        title: 'Budidaya Madu Trigona Premium',
        farmer: 'Agro Apis Sejahtera',
        location: 'Lombok, NTB',
        roi: '18.0%',
        duration: '180 Hari',
        funded: 45,
        target: 200000000,
        current: 90000000,
        category: 'Apikultur'
    }
];

// ==========================================
// REUSABLE PRESENTATION COMPONENTS
// ==========================================

export function SlideContainer({ children, bgClass = 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950' }) {
    return (
        <div className={`w-full h-full min-h-[550px] md:min-h-0 relative p-4 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden text-slate-100 ${bgClass}`}>
            {/* Decorative blurry backgrounds */}
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 md:w-96 h-64 md:h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full gap-4 md:gap-0">
                {children}
            </div>
        </div>
    );
}

export function NavbarSlide({ category, slideNum, totalSlides, isFullscreen, onToggleFullscreen }) {
    return (
        <div className="flex justify-between items-center border-b border-white/10 pb-3 select-none">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-emerald-500/20 p-1 md:p-1.5 rounded-lg border border-emerald-500/30">
                    <Leaf className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                </div>
                <div>
                    <span className="text-[9px] md:text-xs uppercase tracking-widest text-amber-500 font-bold block">Agrovest Platform</span>
                    <h4 className="text-xs md:text-sm font-semibold text-slate-300 line-clamp-1">{category}</h4>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">PITCH DECK</span>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    {slideNum} / {totalSlides}
                </span>
                <button
                    onClick={onToggleFullscreen}
                    className="p-1 rounded bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Toggle Fullscreen"
                >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>
    );
}

export function MetricCard({ title, value, unit, change, icon: Icon, isGold = false }) {
    return (
        <div className={`p-4 rounded-xl border ${isGold ? 'border-amber-500/20 bg-amber-500/5' : 'border-emerald-500/10 bg-white/5'} backdrop-blur-md`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] md:text-xs text-slate-400 font-medium">{title}</span>
                {Icon && <Icon className={`w-4 h-4 ${isGold ? 'text-amber-400' : 'text-emerald-400'}`} />}
            </div>
            <div className="flex items-baseline gap-1">
                <span className={`text-lg md:text-xl lg:text-2xl font-bold tracking-tight ${isGold ? 'text-amber-400' : 'text-slate-100'}`}>{value}</span>
                {unit && <span className="text-xs text-slate-400 font-medium">{unit}</span>}
            </div>
            {change && (
                <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span className="text-[9px] md:text-xs text-emerald-400 font-medium">{change}</span>
                </div>
            )}
        </div>
    );
}

export function ChartCard({ title, subtitle, children }) {
    return (
        <div className="p-4 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between h-full">
            <div className="mb-2">
                <h4 className="text-xs md:text-sm font-bold text-slate-200">{title}</h4>
                {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex-1 w-full min-h-[140px] md:min-h-[160px] flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}

export function TimelineCard({ step, year, title, desc, active = false }) {
    return (
        <div className={`p-3 md:p-4 rounded-xl border relative transition-all ${active ? 'border-amber-500 bg-amber-500/5' : 'border-white/10 bg-white/5'}`}>
            <span className={`absolute -top-2.5 -left-2.5 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs ${active ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-white/10'}`}>
                {step}
            </span>
            <div className="pl-3 md:pl-4">
                <span className="text-[10px] font-mono font-bold text-emerald-400">{year}</span>
                <h4 className="text-xs md:text-sm font-bold text-slate-200 mt-0.5">{title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

// ==========================================
// MAIN PRESENTATION APP
// ==========================================

export default function PresentationApp() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    const totalSlides = 12;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextSlide();
            } else if (event.key === 'ArrowLeft') {
                prevSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    // Monitor fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // HTML5 Fullscreen toggle helper
    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch((err) => {
                console.error(`Gagal masuk ke mode Fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Placeholder handler for Material/Action Buttons
    const handleMaterialAction = (actionName, data = {}) => {
        // Anda dapat mengganti fungsi ini dengan routing, modal box, atau integrasi backend Anda sendiri.
        alert(`Aksi Terpicu: "${actionName}"\n\nTombol ini siap Anda hubungkan dengan fungsi kustom Anda.`);
        console.log("Action Triggered:", actionName, data);
    };

    const slidesCategory = [
        "Introduction",
        "Problem Statement",
        "Market Opportunity",
        "Ecosystem Concept",
        "Marketplace Portal",
        "Investment Showcase",
        "Investor Operations",
        "Financial Projections",
        "Commodity Performance",
        "Risk Mitigation",
        "Roadmap & Strategy",
        "Call to Action"
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 md:p-4 selection:bg-emerald-500 selection:text-white">

            {/* Interactive Deck Frame with Responsive Scalers */}
            <div
                ref={containerRef}
                className="w-full max-w-6xl md:aspect-[16/9] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between bg-slate-950 relative"
            >

                {/* Main Content Area */}
                <div className="flex-1 w-full relative min-h-[500px] md:min-h-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-full h-full md:absolute md:inset-0"
                        >

                            {/* SLIDE 1: COVER */}
                            {currentSlide === 0 && (
                                <SlideContainer>
                                    <div className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-12 relative z-10 py-6 md:py-0">
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] md:text-xs font-semibold mb-4 md:mb-6 tracking-wide"
                                        >
                                            <Sprout className="w-3.5 h-3.5" /> EKOSISTEM AGRIBISNIS TERINTEGRASI
                                        </motion.div>

                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                                            Menghubungkan Petani, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-amber-300">Pembeli, & Investor</span>
                                        </h1>

                                        <p className="text-xs md:text-sm lg:text-base text-slate-300 max-w-2xl mb-6 md:mb-8 leading-relaxed font-light">
                                            Agrovest mendigitalisasi rantai pasok agribisnis dan mempermudah akses permodalan tani yang transparan, aman, dan berkelanjutan.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-2xl w-full mt-2 mb-6">
                                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                                <span className="block text-[9px] text-slate-400 font-mono">Platform</span>
                                                <span className="block text-xs font-bold text-emerald-400 mt-0.5">Sistem Tiga Sisi</span>
                                            </div>
                                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                                <span className="block text-[9px] text-slate-400 font-mono">Target Pasar</span>
                                                <span className="block text-xs font-bold text-amber-400 mt-0.5">Hortikultura & Pangan</span>
                                            </div>
                                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                                <span className="block text-[9px] text-slate-400 font-mono">Keamanan Dana</span>
                                                <span className="block text-xs font-bold text-emerald-400 mt-0.5">Crop Insurance</span>
                                            </div>
                                        </div>

                                        {/* Interactive Section Button */}
                                        <button
                                            onClick={() => handleMaterialAction("Buka Ringkasan Eksekutif")}
                                            className="px-5 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs tracking-wider transition-all hover:bg-emerald-400 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                                        >
                                            <Play className="w-3.5 h-3.5 fill-slate-950" /> Mulai Presentasi
                                        </button>
                                    </div>

                                    <div className="text-center text-[10px] text-slate-500 hidden md:block">
                                        Navigasi dengan tombol panah keyboard ← / → atau panel di bawah.
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 2: PROBLEM */}
                            {currentSlide === 1 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                                        <div className="md:col-span-5 pr-0 md:pr-4">
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Tantangan Utama Agribisnis</h2>
                                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                                Sektor agribisnis nasional menopang ekonomi besar, namun didera inefisiensi kronis yang merugikan semua pihak.
                                            </p>

                                            <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                                                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                                                <span className="text-[11px] text-slate-300 leading-snug">
                                                    Lebih dari <strong>65% petani kecil</strong> terkendala modal formal & terisolasi dari pasar langsung.
                                                </span>
                                            </div>

                                            {/* Interactive Section Button */}
                                            <button
                                                onClick={() => handleMaterialAction("Unduh Analisis Masalah (PDF)")}
                                                className="w-full py-2 px-4 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <Download className="w-3.5 h-3.5" /> Unduh Laporan Lapangan
                                            </button>
                                        </div>

                                        <div className="md:col-span-7 grid grid-cols-1 gap-2.5">
                                            <div className="p-3 rounded-lg border border-white/10 bg-white/5 flex gap-3 items-start">
                                                <div className="p-1.5 rounded bg-red-500/10 text-red-400">
                                                    <TrendingDown className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-200">Rantai Pasok Kompleks & Mahal</h4>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Tengkulak memotong marjin petani, sementara harga konsumen akhir melambung tinggi.</p>
                                                </div>
                                            </div>

                                            <div className="p-3 rounded-lg border border-white/10 bg-white/5 flex gap-3 items-start">
                                                <div className="p-1.5 rounded bg-red-500/10 text-red-400">
                                                    <Wallet className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-200">Ketiadaan Akses Pendanaan Formal</h4>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Institusi keuangan konvensional enggan menyalurkan kredit karena tingginya risiko pertanian.</p>
                                                </div>
                                            </div>

                                            <div className="p-3 rounded-lg border border-white/10 bg-white/5 flex gap-3 items-start">
                                                <div className="p-1.5 rounded bg-red-500/10 text-red-400">
                                                    <ShieldCheck className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-200">Ketidakterbukaan Manajemen Risiko</h4>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Investor tidak memiliki wadah transparan untuk memantau pemanfaatan modal tujuannya.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 3: OPPORTUNITY */}
                            {currentSlide === 2 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                                        <div className="md:col-span-5 pr-0 md:pr-4">
                                            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block mb-1">Potensi Pasar</span>
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Peluang Pertumbuhan</h2>
                                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                                Adopsi smart agriculture dan investasi berkelanjutan berwawasan lingkungan melesat tajam di Asia Tenggara.
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                                                    <span className="text-lg font-bold text-emerald-400 block">Rp 238T+</span>
                                                    <span className="text-[9px] text-slate-400">Sektor Agribisnis Domestik</span>
                                                </div>
                                                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                                                    <span className="text-lg font-bold text-amber-400 block">14.2%</span>
                                                    <span className="text-[9px] text-slate-400">CAGR Produk Organik</span>
                                                </div>
                                            </div>

                                            {/* Interactive Section Button */}
                                            <button
                                                onClick={() => handleMaterialAction("Eksplorasi Prospek Pasar")}
                                                className="w-full py-2 px-4 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1"
                                            >
                                                Lihat Data Riset Lengkap <ArrowUpRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <MetricCard
                                                title="PENINGKATAN POPULASI"
                                                value="8.5"
                                                unit="Miliar Jiwa"
                                                change="Permintaan Pangan Global"
                                                icon={Leaf}
                                            />
                                            <MetricCard
                                                title="ADOPSI AGRI-TECH"
                                                value="32"
                                                unit="%"
                                                change="Peningkatan Efisiensi Tani"
                                                icon={TrendingUp}
                                            />
                                            <MetricCard
                                                title="TEKNOLOGI DIGITAL"
                                                value="88"
                                                unit="%"
                                                change="Petani Melek Internet"
                                                icon={Tractor}
                                            />
                                            <MetricCard
                                                title="STABILITAS PENDAPATAN"
                                                value="15 - 18"
                                                unit="% ROI"
                                                change="Kategori Produk Unggulan"
                                                icon={Award}
                                                isGold={true}
                                            />
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 4: CONCEPT */}
                            {currentSlide === 3 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="flex flex-col justify-between flex-1 gap-4 md:gap-0">
                                        <div className="text-center max-w-2xl mx-auto">
                                            <h2 className="text-xl md:text-2xl font-bold text-white">Sinergi Tiga Pilar Agrovest</h2>
                                            <p className="text-[11px] text-slate-300 mt-0.5">
                                                Satu platform tunggal guna memfasilitasi kebutuhan petani, pembeli, dan investor secara dinamis.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                                            <div className="p-4 rounded-xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex flex-col items-center text-center">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2.5 text-emerald-400">
                                                    <Wheat className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-xs font-bold text-slate-200 mb-1">1. Buyer Marketplace</h3>
                                                <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
                                                    Tempat pembeli langsung berinteraksi dengan petani. Transparan dan andal.
                                                </p>
                                                <button
                                                    onClick={() => handleMaterialAction("Lihat Fitur Buyer Marketplace")}
                                                    className="px-3 py-1 rounded bg-white/5 border border-white/15 text-[10px] hover:bg-white/10 transition-colors text-emerald-400 font-medium"
                                                >
                                                    Eksplorasi Fitur
                                                </button>
                                            </div>

                                            <div className="p-4 rounded-xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex flex-col items-center text-center relative overflow-hidden">
                                                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-2.5 text-amber-400">
                                                    <Tractor className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-xs font-bold text-slate-200 mb-1">2. Farmer Vendor ERP</h3>
                                                <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
                                                    Dasbor manajemen stok, pelacak pesanan, hingga pengaju proposal pembiayaan modal.
                                                </p>
                                                <button
                                                    onClick={() => handleMaterialAction("Simulasi Dashboard Petani")}
                                                    className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] hover:bg-amber-500/20 transition-colors text-amber-400 font-medium"
                                                >
                                                    Simulasi Sistem
                                                </button>
                                            </div>

                                            <div className="p-4 rounded-xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex flex-col items-center text-center">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2.5 text-emerald-400">
                                                    <Wallet className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-xs font-bold text-slate-200 mb-1">3. Investor Dashboard</h3>
                                                <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
                                                    Pemantauan kondisi modal, bagi hasil otomatis, dan analisis performa investasi.
                                                </p>
                                                <button
                                                    onClick={() => handleMaterialAction("Buka Demo Portal Investor")}
                                                    className="px-3 py-1 rounded bg-white/5 border border-white/15 text-[10px] hover:bg-white/10 transition-colors text-emerald-400 font-medium"
                                                >
                                                    Coba Demo Portal
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-center text-[9px] text-slate-500">
                                            Seluruh sistem telah terintegrasi untuk mengamankan kelancaran distribusi dari masa tanam hingga meja makan pembeli.
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 5: MARKETPLACE */}
                            {currentSlide === 4 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                                        <div className="md:col-span-5 pr-0 md:pr-4">
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">🌱 Marketplace Agribisnis</h2>
                                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                                Wadah bertemunya pembeli dan petani secara langsung. Platform modern ini mengutamakan kemudahan pencarian hasil tani segar serta kejelasan rating petani.
                                            </p>

                                            <div className="space-y-2 text-[11px] text-slate-400 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                    <span>Pencarian berbasis kluster wilayah terdekat.</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                    <span>Simulasi proses transaksi belanja interaktif.</span>
                                                </div>
                                            </div>

                                            {/* Interactive Section Button */}
                                            <button
                                                onClick={() => handleMaterialAction("Eksplorasi Katalog Produk")}
                                                className="w-full py-2 px-4 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1"
                                            >
                                                Buka Galeri Produk <ExternalLink className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="md:col-span-7 bg-slate-900/60 border border-white/10 rounded-xl p-4">
                                            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2.5">
                                                <span className="text-[10px] font-mono text-emerald-400 font-bold">Struktur Proyek Frontend</span>
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                                    <h4 className="text-[11px] font-bold text-slate-200">Sisi Pembeli</h4>
                                                    <p className="text-[9px] text-slate-400 mt-1">E-commerce responsif, keranjang belanja dinamis, detail hortikultura segar, rating, dan kolom diskusi.</p>
                                                </div>
                                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                                    <h4 className="text-[11px] font-bold text-slate-200">Sisi Mitra Tani</h4>
                                                    <p className="text-[9px] text-slate-400 mt-1">Pengaturan inventori tani mandiri, update stok real-time, verifikasi panen, and pengajuan modal.</p>
                                                </div>
                                            </div>

                                            <div className="mt-3 text-center">
                                                <span className="text-[9px] text-slate-400">
                                                    Didukung oleh: <strong>React, Tailwind, Lucide React Icons</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 6: PROJECT SHOWCASE */}
                            {currentSlide === 5 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="flex flex-col justify-between flex-1 gap-4 md:gap-0">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0">
                                            <div>
                                                <h2 className="text-xl md:text-2xl font-bold text-white">Eksplorasi Proyek Tani Terkurasi</h2>
                                                <p className="text-xs text-slate-300 mt-0.5">
                                                    Setiap proyek pertanian melewati verifikasi agronomi dan kelayakan finansial yang matang.
                                                </p>
                                            </div>

                                            {/* Interactive Section Button */}
                                            <button
                                                onClick={() => handleMaterialAction("Eksplorasi Proyek Tani Lainnya")}
                                                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1"
                                            >
                                                Saring Kategori <Layers className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                                            {mockProjects.map(project => (
                                                <div key={project.id} className="relative group">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition" />
                                                    <div className="relative bg-slate-900 border border-white/10 rounded-xl p-4">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                                                                {project.category}
                                                            </span>
                                                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                                                {project.location}
                                                            </div>
                                                        </div>

                                                        <h3 className="text-xs md:text-sm font-bold text-slate-100 mb-0.5">{project.title}</h3>
                                                        <p className="text-[10px] text-slate-400 mb-3">oleh {project.farmer}</p>

                                                        <div className="grid grid-cols-3 gap-2 p-2 bg-white/5 rounded-lg mb-3 text-center">
                                                            <div>
                                                                <span className="block text-[8px] text-slate-400">EST. ROI</span>
                                                                <span className="text-[10px] font-bold text-emerald-400">{project.roi} / Siklus</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-[8px] text-slate-400">PANEN</span>
                                                                <span className="text-[10px] font-bold text-slate-200">{project.duration}</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-[8px] text-slate-400">DANA KELOLAAN</span>
                                                                <span className="text-[10px] font-bold text-amber-500">Rp {(project.target / 1000000).toFixed(0)}M</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-between items-center text-[10px] mb-1">
                                                            <span className="text-slate-400">Terkumpul: <strong>{project.funded}%</strong></span>
                                                            <button
                                                                onClick={() => handleMaterialAction("Detail Proyek", { id: project.id })}
                                                                className="text-[9px] text-emerald-400 font-bold hover:underline"
                                                            >
                                                                Detail Proyek
                                                            </button>
                                                        </div>
                                                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                                            <div className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full" style={{ width: `${project.funded}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-center text-[9px] text-slate-500">
                                            Sistem penjaminan hasil panen menggunakan sistem contract-farming untuk stabilitas harga beli di awal.
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 7: INVESTOR DASHBOARD */}
                            {currentSlide === 6 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                                        <div className="md:col-span-5 pr-0 md:pr-4">
                                            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block mb-1">Operasional Investor</span>
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Pantau Portofolio Anda</h2>
                                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                                Dasbor investor memberikan kemudahan analisis menyeluruh: saldo dompet aktif, ROI kumulatif, penarikan dana, hingga diversifikasi komoditas.
                                            </p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                                <button
                                                    onClick={() => handleMaterialAction("Buka Simulator Deposit")}
                                                    className="py-2 px-3 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1"
                                                >
                                                    Top-Up Saldo <Wallet className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleMaterialAction("Buka Hubungi Petani")}
                                                    className="py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                                                >
                                                    Hubungi Petani <MessageSquare className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-7">
                                            <ChartCard
                                                title="Alokasi Sektor Pertanian Terkelola"
                                                subtitle="Persentase pembagian dana kelolaan berdasarkan komoditas."
                                            >
                                                <div className="flex flex-col sm:flex-row items-center justify-around w-full gap-4 sm:gap-0">
                                                    <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px]">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <PieChart>
                                                                <Pie
                                                                    data={distributionData}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    innerRadius={45}
                                                                    outerRadius={65}
                                                                    paddingAngle={3}
                                                                    dataKey="value"
                                                                >
                                                                    {distributionData.map((entry, index) => (
                                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                                    ))}
                                                                </Pie>
                                                                <Tooltip
                                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}
                                                                    itemStyle={{ color: '#fff', fontSize: '10px' }}
                                                                />
                                                            </PieChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                    <div className="flex flex-col gap-1.5">
                                                        {distributionData.map((item, index) => (
                                                            <div key={index} className="flex items-center gap-2">
                                                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                                                <span className="text-[10px] text-slate-300 font-medium font-mono">
                                                                    {item.value}% - {item.name}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </ChartCard>
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 8: FINANCIAL */}
                            {currentSlide === 7 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                                        <div className="md:col-span-5 pr-0 md:pr-4">
                                            <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase block mb-1">Skalabilitas Bisnis</span>
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Proyeksi Dana Kelolaan</h2>
                                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                                Dengan menargetkan perluasan ekosistem tani secara nasional, dana kelolaan (AUM) diproyeksikan tumbuh pesat dalam rentang waktu lima tahun ke depan.
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <div className="p-2.5 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                                                    <span className="text-[8px] text-slate-400 block font-mono">AUM (Tahun ke-5)</span>
                                                    <span className="text-sm font-bold text-emerald-400 block mt-0.5">Rp 60 Miliar</span>
                                                </div>
                                                <div className="p-2.5 bg-amber-500/5 rounded-lg border border-amber-500/10">
                                                    <span className="text-[8px] text-slate-400 block font-mono">Target Investor</span>
                                                    <span className="text-sm font-bold text-amber-400 block mt-0.5">12,000+ Pengguna</span>
                                                </div>
                                            </div>

                                            {/* Interactive Section Button */}
                                            <button
                                                onClick={() => handleMaterialAction("Unduh Proyeksi Keuangan Lengkap (PDF)")}
                                                className="w-full py-2 px-4 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <Download className="w-3.5 h-3.5" /> Unduh Proyeksi Laba-Rugi
                                            </button>
                                        </div>

                                        <div className="md:col-span-7">
                                            <ChartCard
                                                title="Proyeksi Pertumbuhan Dana Kelolaan & Akun Investor"
                                                subtitle="Estimasi akumulasi dana (Area Hijau) dan jumlah akun terverifikasi (Garis Emas)."
                                            >
                                                <div className="w-full h-[140px] md:h-[160px] text-[9px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={investmentGrowthData}>
                                                            <defs>
                                                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                                                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                                            <XAxis dataKey="year" stroke="#94a3b8" />
                                                            <YAxis stroke="#94a3b8" />
                                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                                                            <Area type="monotone" dataKey="amount" stroke="#059669" fillOpacity={1} fill="url(#colorAmount)" name="Dana Kelolaan (Rp M)" />
                                                            <Line type="monotone" dataKey="investors" stroke="#f59e0b" strokeWidth={2} name="Investor" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </ChartCard>
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 9: ROI ANALYSIS */}
                            {currentSlide === 8 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                                        <div className="md:col-span-5 pr-0 md:pr-4">
                                            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block mb-1">Analisis Pengembalian</span>
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Imbal Hasil Komoditas</h2>
                                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                                Berdasarkan data historis panen, tanaman hortikultura premium (seperti Melon) memiliki imbal hasil tinggi dengan siklus penanaman yang relatif singkat.
                                            </p>

                                            <div className="p-3 rounded-lg border border-amber-500/10 bg-amber-500/5 text-[11px] text-amber-400 mb-4">
                                                ⚠️ <strong>Tip Diversifikasi:</strong> Walau hortikultura menawarkan ROI tertinggi, pangan pokok (beras merah organik) memiliki volatilitas harga paling rendah.
                                            </div>

                                            {/* Interactive Section Button */}
                                            <button
                                                onClick={() => handleMaterialAction("Eksplorasi Simulator Kalkulator ROI")}
                                                className="w-full py-2 px-4 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1"
                                            >
                                                Buka Kalkulator Portofolio <Play className="w-3 h-3 fill-slate-950" />
                                            </button>
                                        </div>

                                        <div className="md:col-span-7">
                                            <ChartCard
                                                title="Proyeksi Rerata Imbal Hasil Per Siklus (%)"
                                                subtitle="Performa rata-rata panen berdasarkan historis komoditas."
                                            >
                                                <div className="w-full h-[140px] md:h-[160px] text-[9px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart data={commodityRoiData}>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                                            <XAxis dataKey="name" stroke="#94a3b8" />
                                                            <YAxis stroke="#94a3b8" />
                                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                                                            <Bar dataKey="roi" fill="#d97706" name="ROI Rerata (%)" radius={[4, 4, 0, 0]}>
                                                                {commodityRoiData.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#059669' : '#d97706'} />
                                                                ))}
                                                            </Bar>
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </ChartCard>
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 10: RISK MANAGEMENT */}
                            {currentSlide === 9 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                                        <div className="md:col-span-5 pr-0 md:pr-4">
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Mitigasi Risiko & Kepercayaan</h2>
                                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                                Setiap kegiatan tani memiliki risiko inheren. Kami memitigasi ketidakpastian tersebut dengan strategi proteksi tiga lapis yang andal.
                                            </p>

                                            <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3 mb-4">
                                                <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-200">Asuransi Tani Mitra Bergaransi</h4>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Kerja sama perlindungan risiko guna mengembalikan modal dasar jika terjadi bencana alam.</p>
                                                </div>
                                            </div>

                                            {/* Interactive Section Button */}
                                            <button
                                                onClick={() => handleMaterialAction("Unduh Dokumen Aturan Hukum & Polis")}
                                                className="w-full py-2 px-4 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <Download className="w-3.5 h-3.5" /> Unduh Dokumen Legalitas & Polis
                                            </button>
                                        </div>

                                        <div className="md:col-span-7 grid grid-cols-1 gap-2.5">
                                            <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                                                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                                                    <span className="text-emerald-400 font-mono">01</span> Protected Crop Insurance
                                                </h4>
                                                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                                                    Menyediakan jaminan asuransi hingga 80% dari modal dasar investasi jika terjadi force majeure atau serangan hama luar biasa.
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                                                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                                                    <span className="text-emerald-400 font-mono">02</span> IoT Telemetry Monitoring
                                                </h4>
                                                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                                                    Sistem sensor mendeteksi perubahan dini kadar air & potensi kegagalan agronomi, mencegah penularan penyakit secara luas.
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                                                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                                                    <span className="text-emerald-400 font-mono">03</span> Offtaker Standby
                                                </h4>
                                                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                                                    Penandatanganan kontrak jual beli minimum (kontrak berjangka) dengan distributor sebelum masa tanam dimulai untuk mengunci harga dasar.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 11: STRATEGY & ROADMAP */}
                            {currentSlide === 10 && (
                                <SlideContainer>
                                    <NavbarSlide category={slidesCategory[currentSlide]} slideNum={currentSlide + 1} totalSlides={totalSlides} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />

                                    <div className="flex flex-col justify-between flex-1 gap-4 md:gap-0">
                                        <div className="text-center max-w-2xl mx-auto">
                                            <h2 className="text-xl md:text-2xl font-bold text-white">Rencana Kerja & Ekspansi</h2>
                                            <p className="text-[11px] text-slate-300 mt-0.5">
                                                Langkah strategis penetrasi pasar secara bertahap untuk menjaga stabilitas kualitas layanan platform.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-2">
                                            <TimelineCard
                                                step="1"
                                                year="Q1-Q2 2026"
                                                title="Fase Inisiasi"
                                                desc="Peluncuran MVP frontend, uji coba 15 Kelompok Tani unggulan di Cianjur, stabilisasi transaksi."
                                                active={true}
                                            />
                                            <TimelineCard
                                                step="2"
                                                year="Q3-Q4 2026"
                                                title="Fase Backend Integration"
                                                desc="Penyelarasan database relasional, sistem otentikasi peran, integrasi otomatis payment gateway."
                                            />
                                            <TimelineCard
                                                step="3"
                                                year="2027"
                                                title="Fase Skala Komoditas"
                                                desc="Pembukaan lini peternakan dan madu hutan, implementasi modul sensor IoT cerdas secara masif."
                                            />
                                            <TimelineCard
                                                step="4"
                                                year="2028"
                                                title="Fase Ekspansi Nasional"
                                                desc="Kerja sama dengan korporasi logistik nasional, optimalisasi rute dagang, dan eksplorasi pasar luar Jawa."
                                            />
                                        </div>

                                        {/* Interactive Section Button */}
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleMaterialAction("Unduh Roadmap Strategi Lengkap")}
                                                className="py-1.5 px-4 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                                            >
                                                Unduh Cetak Biru Roadmap <Download className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </SlideContainer>
                            )}

                            {/* SLIDE 12: CLOSING */}
                            {currentSlide === 11 && (
                                <SlideContainer>
                                    <div className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-12 relative z-10 py-6 md:py-0">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                                            <Sprout className="w-6 h-6" />
                                        </div>

                                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
                                            Mari Bertumbuh <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-amber-300">Bersama Agrovest</span>
                                        </h1>

                                        <p className="text-xs md:text-sm text-slate-300 max-w-xl mb-6 leading-relaxed font-light">
                                            Bergabunglah dalam merevolusi pendanaan agribisnis berkelanjutan, memangkas inefisiensi pasar hulu-hilir, dan menyejahterakan kehidupan petani nasional.
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center mb-6">
                                            <button
                                                onClick={() => handleMaterialAction("Daftar Akun Baru")}
                                                className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/15"
                                            >
                                                Daftar Sebagai Investor <ArrowUpRight className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => setCurrentSlide(0)}
                                                className="px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-200 font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5"
                                            >
                                                Ulangi Presentasi <Clock className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 max-w-sm w-full pt-4 border-t border-white/5 text-center">
                                            <div>
                                                <span className="block text-[10px] text-slate-400">Hubungi Kami</span>
                                                <span className="block text-xs font-semibold text-emerald-400 mt-0.5">partnership@agrovest.id</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] text-slate-400">Media Platform</span>
                                                <span className="block text-xs font-semibold text-slate-200 mt-0.5">@agrovest.id</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center text-[10px] text-slate-500">
                                        © 2026 Agrovest. Pitch Deck Presentation App • Hak Cipta Dilindungi.
                                    </div>
                                </SlideContainer>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Presentation Controls and Navigation Bar */}
                <div className="bg-slate-900/95 backdrop-blur-md border-t border-white/10 px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 select-none relative z-20">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={prevSlide}
                            className="p-1.5 md:p-2 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                            disabled={currentSlide === 0}
                            title="Slide Sebelumnya"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-1.5 md:p-2 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                            disabled={currentSlide === totalSlides - 1}
                            title="Slide Berikutnya"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>

                    {/* Interactive Pagination Dots */}
                    <div className="flex gap-1.5 md:gap-2 overflow-x-auto max-w-[180px] sm:max-w-none py-1 sm:py-0">
                        {Array.from({ length: totalSlides }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full flex-shrink-0 transition-all ${idx === currentSlide ? 'w-5 md:w-6 bg-emerald-400' : 'w-1.5 md:w-2 bg-slate-700 hover:bg-slate-600'}`}
                                title={`Ke Slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span className="font-mono">Gunakan Navigasi Panah Keyboard</span>
                        <div className="flex items-center gap-0.5 bg-white/5 px-1 py-0.5 rounded border border-white/10 text-[8px] font-mono">
                            <span>←</span>
                        </div>
                        <div className="flex items-center gap-0.5 bg-white/5 px-1 py-0.5 rounded border border-white/10 text-[8px] font-mono">
                            <span>→</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}