import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, Mail, Lock, User, Phone, ShieldCheck, Upload,
    ChevronLeft, ChevronRight, X, ArrowRight, TrendingUp, Briefcase, Activity
} from 'lucide-react';

export default function AgroMarketBuyerAuth() {
    // Navgigate
    const navigate = useNavigate();

    const [screen, setScreen] = useState('login'); // 'login' | 'signup'
    const [signupStep, setSignupStep] = useState(1); // 1 | 2 | 3
    const [riskChecked, setRiskChecked] = useState(false);

    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        whatsapp: '',
        password: '',
        confirmPassword: '',
        provinsi: '',
        kota: '',
        kecamatan: '',
        detailAlamat: '',
        favProducts: [],
        frequency: 'Mingguan'
    });

    // Efek Floating Particles bertema daun/partikel cahaya
    const ParticlesBackground = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${i % 2 === 0 ? 'bg-emerald-500/10' : 'bg-teal-400/10'}`}
                    style={{
                        width: Math.random() * 20 + 8,
                        height: Math.random() * 20 + 8,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, -120],
                        x: [0, Math.random() * 40 - 20],
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: Math.random() * 8 + 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-tr from-emerald-950 via-teal-950 to-slate-950 text-slate-100 overflow-x-hidden relative font-sans flex flex-col justify-between">

            {/* Background Gradasi Bergerak */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-950/20 blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-950/25 blur-[130px]"
                />
            </div>

            <ParticlesBackground />

            <AnimatePresence mode="wait">
                {/* ==========================================
            HALAMAN LOGIN PEMBELI
            ========================================== */}
                {screen === 'login' && (
                    <motion.div
                        key="login-screen"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        className="min-h-screen flex flex-col md:flex-row"
                    >
                        {/* Bagian Kiri: Branding Marketplace */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 bg-emerald-950/20 border-r border-white/5 relative overflow-hidden">
                            <div className="relative z-10">
                                {/* Logo */}
                                <div className="flex items-center gap-2 mb-12">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <Leaf className="w-5 h-5 text-slate-950" />
                                    </div>
                                    <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                                        AgroMarket
                                    </span>
                                </div>

                                {/* Judul & Deskripsi */}
                                <div className="max-w-md">
                                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
                                        Belanja Hasil Pertanian <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-500">
                                            Langsung Dari Sumber Terpercaya
                                        </span>
                                    </h1>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                                        Dapatkan produk pertanian berkualitas langsung dari petani melalui sistem distribusi digital yang transparan [1].
                                    </p>
                                </div>

                                {/* Ilustrasi Grafik Pertumbuhan */}
                                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-teal-400 uppercase font-semibold tracking-wider">Perkembangan Transparansi Distribusi</span>
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="h-20 flex items-end gap-3 justify-center mb-2">
                                        {[35, 50, 45, 70, 60, 85, 110].map((height, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-sm"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ delay: idx * 0.1, duration: 1, ease: 'easeOut' }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>Petani</span><span>Logistik</span><span>Konsumen (Anda)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Statistik */}
                            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-400">100+</h3>
                                    <p className="text-[11px] text-slate-400">Produk Pertanian</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-teal-400">50+</h3>
                                    <p className="text-[11px] text-slate-400">Petani Terdaftar</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-400">1000+</h3>
                                    <p className="text-[11px] text-slate-400">Pesanan Berhasil</p>
                                </div>
                            </div>
                        </div>

                        {/* Bagian Kanan: Card Login Pembeli */}
                        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, filter: 'blur(4px)' }}
                                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.5 }}
                                className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-100">Selamat Datang Kembali</h2>
                                    <p className="text-xs text-slate-400 mt-1">Silakan masuk menggunakan akun pembeli Anda.</p>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); navigate("/home"); }} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Email / Username</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                                            <input
                                                type="email"
                                                required
                                                placeholder="pembeli@agromarket.com"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all text-xs text-slate-100 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                                            <input
                                                type="password"
                                                required
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all text-xs text-slate-100 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-0 focus:ring-offset-0" />
                                            <span className="text-slate-400 select-none">Ingat saya</span>
                                        </label>
                                        <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">Lupa Password?</a>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 font-bold shadow-lg shadow-emerald-500/15 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        Masuk ke AgroMarket
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </form>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-slate-950 px-3 text-slate-500">Atau</span></div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate("/home")}
                                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-white/10 transition-all text-xs flex items-center justify-center gap-2 font-medium cursor-pointer"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.214 1.832 15.474 1 12.24 1c-6.077 0-11 4.923-11 11s4.923 11 11 11c6.34 0 10.557-4.437 10.557-10.743 0-.724-.078-1.275-.172-1.972H12.24z" />
                                    </svg>
                                    Login dengan Google
                                </button>

                                <div className="mt-8 text-center text-xs text-slate-400">
                                    Belum punya akun?{' '}
                                    <button onClick={() => { setScreen('signup'); setSignupStep(1); }} className="text-emerald-400 font-semibold hover:underline cursor-pointer">
                                        Daftar Sekarang
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* ==========================================
            HALAMAN SIGNUP PEMBELI (MULTI-STEP)
            ========================================== */}
                {screen === 'signup' && (
                    <motion.div
                        key="signup-screen"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="min-h-screen flex items-center justify-center p-6"
                    >
                        <div className="w-full max-w-xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative">
                            {/* Header Signup */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Registrasi Pembeli</h2>
                                    <p className="text-xs text-slate-400 mt-0.5">Langkah {signupStep} dari 3</p>
                                </div>
                                <button
                                    onClick={() => setScreen('login')}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Progress Bar Indicator */}
                            <div className="flex gap-2 mb-8">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex-1 h-1.5 rounded-full bg-slate-800 relative overflow-hidden">
                                        {step <= signupStep && (
                                            <motion.div
                                                layoutId="active-signup-bar"
                                                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Multi-step Forms */}
                            <AnimatePresence mode="wait">
                                {/* STEP 1: DATA AKUN */}
                                {signupStep === 1 && (
                                    <motion.div
                                        key="step-1-fields"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Nama Lengkap</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={signupForm.name}
                                                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={signupForm.email}
                                                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                                        placeholder="john@domain.com"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Nomor WhatsApp</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={signupForm.whatsapp}
                                                        onChange={(e) => setSignupForm({ ...signupForm, whatsapp: e.target.value })}
                                                        placeholder="0812XXXXXXXX"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                    <input
                                                        type="password"
                                                        required
                                                        value={signupForm.password}
                                                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                                        placeholder="••••••••"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Konfirmasi Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                    <input
                                                        type="password"
                                                        required
                                                        value={signupForm.confirmPassword}
                                                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                                                        placeholder="••••••••"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Foto Profil</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-500">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <button type="button" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs border border-white/10 transition-all text-slate-300 cursor-pointer">
                                                    Pilih Berkas Foto
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: INFORMASI PEMBELI */}
                                {signupStep === 2 && (
                                    <motion.div
                                        key="step-2-fields"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Alamat Pengiriman</span>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Provinsi"
                                                    value={signupForm.provinsi}
                                                    onChange={(e) => setSignupForm({ ...signupForm, provinsi: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Kota"
                                                    value={signupForm.kota}
                                                    onChange={(e) => setSignupForm({ ...signupForm, kota: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Kecamatan"
                                                    value={signupForm.kecamatan}
                                                    onChange={(e) => setSignupForm({ ...signupForm, kecamatan: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                                />
                                            </div>
                                            <textarea
                                                rows="2"
                                                placeholder="Detail alamat pengiriman (Jalan, No. Rumah, RT/RW, dsb.)"
                                                value={signupForm.detailAlamat}
                                                onChange={(e) => setSignupForm({ ...signupForm, detailAlamat: e.target.value })}
                                                className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all resize-none"
                                            />
                                        </div>

                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Jenis Produk Favorit</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Sayuran', 'Buah', 'Beras', 'Rempah', 'Produk Organik'].map((cat) => {
                                                    const active = signupForm.favProducts.includes(cat);
                                                    return (
                                                        <button
                                                            key={cat}
                                                            type="button"
                                                            onClick={() => {
                                                                const list = active
                                                                    ? signupForm.favProducts.filter((c) => c !== cat)
                                                                    : [...signupForm.favProducts, cat];
                                                                setSignupForm({ ...signupForm, favProducts: list });
                                                            }}
                                                            className={`py-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${active
                                                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                                                    : 'bg-slate-900/60 border-white/5 text-slate-400'
                                                                }`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Frekuensi Pembelian</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Harian', 'Mingguan', 'Bulanan'].map((freq) => (
                                                    <button
                                                        key={freq}
                                                        type="button"
                                                        onClick={() => setSignupForm({ ...signupForm, frequency: freq })}
                                                        className={`py-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${signupForm.frequency === freq
                                                                ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                                                                : 'bg-slate-900/60 border-white/5 text-slate-400'
                                                            }`}
                                                    >
                                                        {freq}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: KONFIRMASI AKUN */}
                                {signupStep === 3 && (
                                    <motion.div
                                        key="step-3-fields"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4 text-xs"
                                    >
                                        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2.5">
                                            <h4 className="font-bold text-emerald-400 mb-1 border-b border-white/5 pb-1">Ringkasan Pendaftaran</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <span className="text-slate-400 block text-[10px] uppercase">Nama</span>
                                                    <span className="font-medium text-slate-200">{signupForm.name || '-'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-400 block text-[10px] uppercase">Email</span>
                                                    <span className="font-medium text-slate-200">{signupForm.email || '-'}</span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-slate-400 block text-[10px] uppercase">Alamat Pengiriman</span>
                                                    <span className="font-medium text-slate-200 block leading-tight">
                                                        {signupForm.detailAlamat ? `${signupForm.detailAlamat}, ${signupForm.kecamatan}, ${signupForm.kota}` : '-'}
                                                    </span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-slate-400 block text-[10px] uppercase">Preferensi Produk</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {signupForm.favProducts.length > 0 ? (
                                                            signupForm.favProducts.map((p) => (
                                                                <span key={p} className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-[9px] font-semibold text-emerald-400">
                                                                    {p}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-slate-500 italic">Belum ada</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={riskChecked}
                                                onChange={(e) => setRiskChecked(e.target.checked)}
                                                className="rounded mt-0.5 bg-slate-900 border-white/10 text-emerald-500 focus:ring-0"
                                            />
                                            <span className="text-[11px] text-slate-300 leading-normal select-none">
                                                Saya menyetujui syarat penggunaan dan kebijakan privasi AgroMarket [1].
                                            </span>
                                        </label>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Actions */}
                            <div className="flex justify-between mt-6 pt-5 border-t border-white/10">
                                {signupStep > 1 ? (
                                    <button
                                        onClick={() => setSignupStep((s) => s - 1)}
                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Kembali
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setScreen('login')}
                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                )}

                                {signupStep < 3 ? (
                                    <button
                                        onClick={() => setSignupStep((s) => s + 1)}
                                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-lg shadow-emerald-500/10 transition-all cursor-pointer"
                                    >
                                        Selanjutnya <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate("/home")}
                                        disabled={!riskChecked}
                                        className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg transition-all cursor-pointer ${riskChecked
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/10 hover:opacity-95'
                                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Buat Akun <ShieldCheck className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}