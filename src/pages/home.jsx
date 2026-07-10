import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Briefcase,
    ShoppingBag,
    ShieldCheck,
    Database,
    Leaf,
    Globe,
    ArrowRight,
    ChevronRight,
    Activity,
    Sparkles,
    BarChart3,
    Cpu,
    Lock
} from 'lucide-react';

export default function AgriTechLandingPage() {
    // Navgigate
    const navigate = useNavigate();
    // Animasi helper
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: custom }
        })
    };

    const floatAnimation = (duration = 4, delay = 0) => ({
        animate: {
            y: [0, -12, 0],
            transition: {
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay
            }
        }
    });

    return (
        <div className="bg-[#020b0a] text-slate-100 min-h-screen font-sans overflow-hidden relative selection:bg-emerald-500/30 selection:text-emerald-300">

            {/* BACKGROUND GLOWS (Premium Tech Vibe) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[50%] rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c2522_1px,transparent_1px),linear-gradient(to_bottom,#0c2522_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

            {/* HEADER / NAVIGATION BAR (DUMMY) */}
            <nav className="relative z-50 border-b border-emerald-950/40 bg-[#020b0a]/60 backdrop-blur-md px-6 py-4 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 p-[1.5px]">
                        <div className="w-full h-full bg-[#020b0a] rounded-[10px] flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-emerald-400" />
                        </div>
                    </div>
                    <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-emerald-400 via-emerald-100 to-amber-300 bg-clip-text text-transparent">
                        Agrovest
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
                    <a href="#ekosistem" className="hover:text-emerald-400 transition-colors">Ekosistem</a>
                    <a href="#teknologi" className="hover:text-emerald-400 transition-colors">Teknologi</a>
                    <a href="#" className="hover:text-emerald-400 transition-colors">Portofolio</a>
                    <a href="#" className="hover:text-emerald-400 transition-colors">Dampak Sosial</a>
                </div>
                <button className="px-5 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-300 hover:text-white text-sm font-semibold hover:bg-emerald-500/10 transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)] bg-[#031513]">
                    Hubungi Kami
                </button>
            </nav>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 py-20 text-center z-10">

                {/* Floating Digital Light/Data Particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: Math.random() * 6 + 3 + 'px',
                            height: Math.random() * 6 + 3 + 'px',
                            background: i % 2 === 0 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(245, 158, 11, 0.3)',
                            left: Math.random() * 90 + 5 + '%',
                            top: Math.random() * 80 + 10 + '%',
                            boxShadow: i % 2 === 0 ? '0 0 10px rgba(52, 211, 153, 0.6)' : '0 0 10px rgba(245, 158, 11, 0.4)',
                        }}
                        animate={{
                            y: [0, Math.random() * -100 - 40],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 6 + 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3
                        }}
                    />
                ))}

                {/* Small floating Leaf Tech Icon */}
                <motion.div
                    className="absolute top-24 left-[15%] hidden lg:block"
                    {...floatAnimation(5, 0.5)}
                >
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md rounded-2xl flex items-center gap-3">
                        <Cpu className="w-6 h-6 text-emerald-400" />
                        <span className="text-xs text-emerald-300 font-mono">Sensors: Active</span>
                    </div>
                </motion.div>

                {/* Small floating Growth Chart Tech Icon */}
                <motion.div
                    className="absolute bottom-32 right-[12%] hidden lg:block"
                    {...floatAnimation(6, 1)}
                >
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 backdrop-blur-md rounded-2xl flex items-center gap-3">
                        <Activity className="w-6 h-6 text-amber-400 animate-pulse" />
                        <span className="text-xs text-amber-300 font-mono">Yield Est: +28.4%</span>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Generasi Baru Pertanian Digital</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
                    >
                        Dari Lahan Lokal Menuju <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
                            Ekosistem Digital
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Menghubungkan petani lokal, pembeli, dan mitra pendukung melalui teknologi untuk menciptakan proses pertanian yang lebih mudah, transparan, dan berkembang
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.6}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
                    >
                        <button onClick={() => navigate("/logininvestor")} className="group w-full sm:w-auto relative px-8 py-4 rounded-xl font-bold text-sm overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative flex items-center justify-center gap-2">
                                Mulai Investasi <TrendingUp className="w-4 h-4" />
                            </span>
                        </button>

                        <button onClick={() => navigate("/loginvendor")} className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-[#031513] transition-all flex items-center justify-center gap-2">
                            Kelola Bisnis <Briefcase className="w-4 h-4 text-emerald-400" />
                        </button>

                        <button onClick={() => navigate("/loginmarketplace")} className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-transparent border border-emerald-500/20 hover:border-amber-500/40 text-slate-400 hover:text-amber-300 transition-all flex items-center justify-center gap-2">
                            Jelajahi Marketplace <ShoppingBag className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* 2. CONNECTION SECTION */}
            <section id='ekosistem' className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Arsitektur Ekosistem</h2>
                    <p className="text-3xl md:text-4xl font-bold text-white">Bagaimana Kami Menghubungkan Nilai</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">

                    {/* Animated Connecting Lines for visual flow (Only Visible on Large Screen) */}
                    <div className="hidden lg:block absolute top-[40%] left-[28%] right-[28%] h-0.5 border-t-2 border-dashed border-emerald-500/20 z-0">
                        <div className="absolute top-[-3px] left-0 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-ping" style={{ animationDuration: '3s' }} />
                        <div className="absolute top-[-3px] right-0 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,1)] animate-ping" style={{ animationDuration: '4s' }} />
                    </div>

                    {/* Node 1: Investor */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        className="p-8 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-md relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                            <TrendingUp className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Investor</h3>
                        <p className="text-sm text-amber-300 font-semibold mb-4">Pendanaan & Pertumbuhan Bisnis</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Memasok modal likuid untuk akselerasi pertanian, memantau portofolio real-time dengan metrik yang dapat dipertanggungjawabkan secara instan.
                        </p>
                    </motion.div>

                    {/* Node 2: Vendor */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        className="p-8 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-md relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                            <Briefcase className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Vendor / Petani</h3>
                        <p className="text-sm text-emerald-300 font-semibold mb-4">Produksi & Supply Chain</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Membantu petani mengelola hasil pertanian dengan lebih baik melalui akses pasar, pencatatan digital, dan informasi yang lebih transparan.
                        </p>
                    </motion.div>

                    {/* Node 3: Marketplace */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        className="p-8 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-md relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(20,184,166,0.05)]">
                            <ShoppingBag className="w-6 h-6 text-teal-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Marketplace</h3>
                        <p className="text-sm text-teal-300 font-semibold mb-4">Distribusi & Penjualan</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Memudahkan pembeli mendapatkan produk pertanian segar langsung dari sumber terpercaya melalui platform digital.
                        </p>
                    </motion.div>

                </div>
            </section>

            {/* 3. THREE PLATFORM CARDS */}
            <section className="py-24 bg-gradient-to-b from-transparent via-[#031513]/40 to-transparent relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Pintu Masuk Navigasi</h2>
                    <p className="text-3xl md:text-4xl font-bold text-white">Pilih Portal Platform Anda</p>
                    <p className="text-slate-400 max-w-lg mx-auto text-sm">Masuk ke dalam dashboard modular yang dirancang khusus untuk memenuhi peran profesional Anda di dalam jaringan agribisnis kami.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Card A: Investor Platform */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-3xl bg-gradient-to-b from-[#041a18] to-[#010908] border border-amber-500/20 p-8 flex flex-col justify-between h-[450px] relative overflow-hidden shadow-2xl"
                    >
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div id='teknologi' className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="p-4 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20">
                                    <BarChart3 className="w-8 h-8 text-amber-400" />
                                </div>
                                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                                    Secured FinTech
                                </span>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold text-white">Investor Platform</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Temukan peluang investasi agribisnis berimbal hasil tinggi dengan data transparan, analitik pertumbuhan real-time berbasis citra satelit, dan estimasi hasil panen presisi.
                                </p>
                            </div>
                        </div>

                        <button onClick={() => navigate("/logininvestor")} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            Masuk Platform <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Card B: Vendor Platform */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-3xl bg-gradient-to-b from-[#041a18] to-[#010908] border border-emerald-500/20 p-8 flex flex-col justify-between h-[450px] relative overflow-hidden shadow-2xl"
                    >
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-transparent border border-emerald-500/20">
                                    <Activity className="w-8 h-8 text-emerald-400" />
                                </div>
                                <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                                    Agro Management
                                </span>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold text-white">Vendor Platform</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Kelola siklus produksi, pendaftaran aset lahan fisik, stok pergudangan, transaksi operasional harian, dan pantau perkembangan iklim mikro pertanian secara real-time.
                                </p>
                            </div>
                        </div>

                        <button onClick={() => navigate("/loginvendor")} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            Masuk Platform <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Card C: Marketplace */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-3xl bg-gradient-to-b from-[#041a18] to-[#010908] border border-teal-500/20 p-8 flex flex-col justify-between h-[450px] relative overflow-hidden shadow-2xl"
                    >
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="p-4 rounded-2xl bg-gradient-to-tr from-teal-500/10 to-transparent border border-teal-500/20">
                                    <ShoppingBag className="w-8 h-8 text-teal-400" />
                                </div>
                                <span className="text-[10px] font-mono tracking-wider text-teal-400 uppercase bg-teal-950/40 px-3 py-1 rounded-full border border-teal-500/30">
                                    B2B Hub
                                </span>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold text-white">Marketplace B2B</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Hubungkan produk pertanian premium hasil kurasi petani kami secara langsung dengan rantai hotel, restoran besar, eksportir global, dan pembeli komersial berskala besar.
                                </p>
                            </div>
                        </div>

                        <button onClick={() => navigate("/loginmarketplace")} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                            Masuk Platform <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                </div>
            </section>

            {/* 4. WHY CHOOSE US SECTION (Scroll Reveal style) */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Keunggulan Utama</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            Mengapa Berinvestasi Bersama Kami?
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                            Kami mendefinisikan ulang batas-batas pertanian tradisional dengan membungkus proses manufaktur primer menggunakan kecanggihan analitik data modern dan infrastruktur finansial yang kuat.
                        </p>
                        <div className="pt-4 border-t border-emerald-950/60 flex items-center gap-6">
                            <div>
                                <p className="text-2xl font-bold text-white">Rp 2.4T+</p>
                                <p className="text-xs text-slate-500">Nilai Investasi Tersalurkan</p>
                            </div>
                            <div className="h-8 w-px bg-emerald-950" />
                            <div>
                                <p className="text-2xl font-bold text-emerald-400">99.2%</p>
                                <p className="text-xs text-slate-500">Tingkat Panen Sukses</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Feature 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="p-6 rounded-2xl bg-[#031513]/40 border border-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Database className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h4 className="text-base font-bold text-white mb-2">Data Transparan</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Akses tanpa batas ke histori metrik pertumbuhan tanaman, laporan keuangan digital, dan asuransi modal.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="p-6 rounded-2xl bg-[#031513]/40 border border-emerald-500/10 hover:border-amber-500/30 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Lock className="w-5 h-5 text-amber-400" />
                            </div>
                            <h4 className="text-base font-bold text-white mb-2">Sistem Investasi Modern</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Teknologi pintar berbasis blockchain untuk transparansi pembagian dividen langsung ke rekening portofolio Anda.
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="p-6 rounded-2xl bg-[#031513]/40 border border-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Globe className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h4 className="text-base font-bold text-white mb-2">Digital Supply Chain</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Pemantauan rantai logistik agrikultur dari bibit awal, proses distribusi, hingga sampai ke pintu pelanggan akhir.
                            </p>
                        </motion.div>

                        {/* Feature 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="p-6 rounded-2xl bg-[#031513]/40 border border-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h4 className="text-base font-bold text-white mb-2">Bisnis Berkelanjutan</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Kami menerapkan standar ESG secara ketat demi menjamin kedaulatan pangan, kesuburan tanah, dan masa depan lingkungan bumi.
                            </p>
                        </motion.div>

                    </div>

                </div>

            </section>

            {/* 5. FOOTER */}
            <footer className="relative z-10 border-t border-emerald-950/60 bg-[#010908] pt-16 pb-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    <div className="space-y-4 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-amber-500 p-[1px]">
                                <div className="w-full h-full bg-[#010908] rounded-[7px] flex items-center justify-center">
                                    <Leaf className="w-4 h-4 text-emerald-400" />
                                </div>
                            </div>
                            <span className="text-lg font-bold tracking-wider text-white">Agrovest</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Arsitektur digital masa depan yang mendongkrak ekosistem agrikultur melalui pilar fintech, pelacakan IoT rantai pasok, dan digitalisasi pasar makro.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Layanan Portal</h4>
                        <ul className="space-y-2 text-xs text-slate-500">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Portofolio Investor</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Integrasi Sensor IoT Petani</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Pemesanan B2B Marketplace</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Peta Hasil Panen Satelit</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Perusahaan</h4>
                        <ul className="space-y-2 text-xs text-slate-500">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Dampak Sosial</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Keamanan Sistem</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Karir</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sertifikasi & Kemitraan</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded bg-[#031513] border border-emerald-500/10 text-[9px] font-mono text-emerald-400">OJK DUMMY COMPLIANT</span>
                            <span className="px-3 py-1 rounded bg-[#031513] border border-emerald-500/10 text-[9px] font-mono text-emerald-400">GLOBAL GAP STANDARD</span>
                            <span className="px-3 py-1 rounded bg-[#031513] border border-emerald-500/10 text-[9px] font-mono text-amber-400">ESG RATED A+</span>
                        </div>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto pt-8 border-t border-emerald-950/40 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-slate-600">
                        © 2026 PT Agrovest Agritech Nusantara. Hak Cipta Dilindungi Undang-Undang.
                    </p>
                    <div className="flex gap-6 text-[11px] text-slate-600">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}