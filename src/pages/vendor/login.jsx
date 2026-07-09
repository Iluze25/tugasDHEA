import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, Mail, Lock, User, Phone, ShieldCheck, Upload,
    ChevronLeft, ChevronRight, X, ArrowRight, TrendingUp,
    Briefcase, Activity, FileText, CheckCircle, MapPin,
    Sparkles, AlertTriangle, Layers, Scale, DollarSign, Check
} from 'lucide-react';

export default function AgroVendorAuth() {
    // Navgigate
    const navigate = useNavigate();

    const [screen, setScreen] = useState('login'); // 'login' | 'signup'
    const [signupStep, setSignupStep] = useState(1); // 1 | 2 | 3 | 4 | 5

    // Signup State Form
    const [signupForm, setSignupForm] = useState({
        // Step 1
        fullName: '',
        ktpNumber: '',
        email: '',
        whatsapp: '',
        password: '',
        confirmPassword: '',
        // Step 2
        businessName: '',
        businessType: 'Kelompok Tani',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        landAddress: '',
        cropSpecialty: 'Hortikultura',
        landArea: '',
        farmingExperience: '',
        harvestCapacity: '',
        // Step 4
        projectName: '',
        projectCrop: '',
        projectArea: '',
        neededCapital: '',
        targetFunding: '',
        harvestPeriod: '',
        estimatedProfit: '',
        projectRisk: ''
    });

    // Step 3 Document Status Mock
    const [docStatuses, setDocStatuses] = useState({
        landOwnership: 'Belum Upload', // 'Belum Upload' | 'Menunggu Review' | 'Terverifikasi'
        rentContract: 'Belum Upload',
        landDocumentation: 'Belum Upload',
        supportingData: 'Belum Upload'
    });

    // Checklist Step 5
    const [checklist, setChecklist] = useState({
        dataValid: false,
        landRights: false,
        verificationReady: false,
        rejectionAware: false
    });

    // Floating Agriculture and Legal Particles
    const ParticlesBackground = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            {[...Array(12)].map((_, i) => {
                const isDoc = i % 3 === 0;
                return (
                    <motion.div
                        key={i}
                        className={`absolute flex items-center justify-center ${isDoc ? 'text-amber-500/10' : 'text-emerald-500/10'
                            }`}
                        style={{
                            width: Math.random() * 24 + 12,
                            height: Math.random() * 24 + 12,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, -120],
                            x: [0, Math.random() * 40 - 20],
                            rotate: [0, 360],
                            opacity: [0, 0.6, 0],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        {isDoc ? <FileText className="w-full h-full" /> : <Leaf className="w-full h-full" />}
                    </motion.div>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-tr from-slate-950 via-emerald-950 to-slate-950 text-slate-100 overflow-x-hidden relative font-sans flex flex-col justify-between">

            {/* Background dynamic movement */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, 25, 0],
                        y: [0, -25, 0],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-900/15 blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -35, 0],
                        y: [0, 35, 0],
                    }}
                    transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-900/15 blur-[130px]"
                />
            </div>

            <ParticlesBackground />

            <AnimatePresence mode="wait">
                {/* ==========================================
            1. HALAMAN LOGIN PETANI
            ========================================== */}
                {screen === 'login' && (
                    <motion.div
                        key="login-view"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="min-h-screen flex flex-col md:flex-row"
                    >
                        {/* Bagian Kiri: Branding Vendor */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 bg-emerald-950/20 border-r border-white/5 relative overflow-hidden">
                            <div className="relative z-10">
                                {/* Logo & Verification Badge */}
                                <div className="flex items-center gap-3 mb-12">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <Leaf className="w-5 h-5 text-slate-950" />
                                    </div>
                                    <div>
                                        <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent block leading-none">
                                            AgroVendor
                                        </span>
                                        <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest mt-1 block">
                                            Pro Platform
                                        </span>
                                    </div>
                                </div>

                                {/* Judul & Deskripsi */}
                                <div className="max-w-md">
                                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
                                        Bangun Bisnis <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">
                                            Pertanian Digital Anda
                                        </span>
                                    </h1>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                                        Kelola hasil pertanian, temukan peluang pendanaan, dan terhubung dengan pasar serta investor terpercaya [1].
                                    </p>
                                </div>

                                {/* Dashboard / Verification Ilustrasi Simpel */}
                                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-sm relative">
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[9px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Verified Farmer
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText className="w-5 h-5 text-emerald-400" />
                                        <span className="text-xs font-semibold text-slate-200">Legalitas & Sertifikasi Lahan</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '95%' }}
                                            transition={{ duration: 1.5, ease: 'easeOut' }}
                                            className="h-full bg-emerald-500"
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-400">
                                        <span>Progres Verifikasi</span>
                                        <span className="font-bold text-emerald-400">95% Sukses</span>
                                    </div>
                                </div>
                            </div>

                            {/* Statistik */}
                            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-400">500+</h3>
                                    <p className="text-[11px] text-slate-400">Petani Terdaftar</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-amber-400">95%</h3>
                                    <p className="text-[11px] text-slate-400">Data Terverifikasi</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-400">Rp1 M+</h3>
                                    <p className="text-[11px] text-slate-400">Dana Terkelola</p>
                                </div>
                            </div>
                        </div>

                        {/* Bagian Kanan: Form Login */}
                        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, filter: 'blur(4px)' }}
                                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.5 }}
                                className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-100">Portal Bisnis Tani</h2>
                                    <p className="text-xs text-slate-400 mt-1">Gunakan akun vendor terdaftar Anda untuk masuk ke sistem.</p>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboardvendor"); }} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Alamat Email Bisnis</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                                            <input
                                                type="email"
                                                required
                                                placeholder="vendor@agrobusiness.com"
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
                                        <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">Lupa Password?</a>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-95 text-slate-950 font-bold shadow-lg shadow-emerald-500/15 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        Masuk Kelola Bisnis
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </form>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-slate-950 px-3 text-slate-500">Atau masuk dengan</span></div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate("/dashboardvendor")}
                                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-white/10 transition-all text-xs flex items-center justify-center gap-2 font-medium cursor-pointer"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.214 1.832 15.474 1 12.24 1c-6.077 0-11 4.923-11 11s4.923 11 11 11c6.34 0 10.557-4.437 10.557-10.743 0-.724-.078-1.275-.172-1.972H12.24z" />
                                    </svg>
                                    Login dengan Google
                                </button>

                                <div className="mt-8 text-center text-xs text-slate-400">
                                    Belum memiliki akun petani?{' '}
                                    <button onClick={() => { setScreen('signup'); setSignupStep(1); }} className="text-emerald-400 font-semibold hover:underline cursor-pointer">
                                        Daftar sebagai Vendor
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* ==========================================
            2. HALAMAN SIGNUP PETANI (MULTI-STEP)
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
                        <div className="w-full max-w-2xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative">
                            {/* Header Signup */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Pendaftaran Akun Vendor</h2>
                                    <p className="text-xs text-slate-400 mt-0.5">Langkah {signupStep} dari 5</p>
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
                                {[1, 2, 3, 4, 5].map((step) => (
                                    <div key={step} className="flex-1 h-1.5 rounded-full bg-slate-800 relative overflow-hidden">
                                        {step <= signupStep && (
                                            <motion.div
                                                layoutId="active-signup-farmer"
                                                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-400"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Form Pages Container */}
                            <AnimatePresence mode="wait">
                                {/* STEP 1: DATA PEMILIK USAHA */}
                                {signupStep === 1 && (
                                    <motion.div
                                        key="step-1"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Nama Lengkap</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={signupForm.fullName}
                                                        onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                                                        placeholder="John Doe"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Nomor KTP (ID Card)</label>
                                                <div className="relative">
                                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={signupForm.ktpNumber}
                                                        onChange={(e) => setSignupForm({ ...signupForm, ktpNumber: e.target.value })}
                                                        placeholder="320XXXXXXXXXXXXX"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Email Bisnis</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={signupForm.email}
                                                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                                        placeholder="vendor@agrobusiness.com"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-[11px] text-emerald-300 leading-normal">
                                            🛡️ Data digunakan untuk proses verifikasi identitas petani terpercaya guna menjamin transparansi investor.
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: PROFIL USAHA PERTANIAN */}
                                {signupStep === 2 && (
                                    <motion.div
                                        key="step-2"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Nama Usaha Pertanian</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={signupForm.businessName}
                                                    onChange={(e) => setSignupForm({ ...signupForm, businessName: e.target.value })}
                                                    placeholder="Kelompok Tani Makmur"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Jenis Usaha</label>
                                                <select
                                                    value={signupForm.businessType}
                                                    onChange={(e) => setSignupForm({ ...signupForm, businessType: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                >
                                                    <option value="Petani individu">Petani Individu</option>
                                                    <option value="Kelompok tani">Kelompok Tani</option>
                                                    <option value="Perusahaan pertanian">Perusahaan Pertanian</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Lokasi Usaha & Alamat Lahan</span>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Provinsi"
                                                    value={signupForm.provinsi}
                                                    onChange={(e) => setSignupForm({ ...signupForm, provinsi: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Kabupaten"
                                                    value={signupForm.kabupaten}
                                                    onChange={(e) => setSignupForm({ ...signupForm, kabupaten: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Kecamatan"
                                                    value={signupForm.kecamatan}
                                                    onChange={(e) => setSignupForm({ ...signupForm, kecamatan: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2"
                                                />
                                            </div>
                                            <textarea
                                                rows="1.5"
                                                placeholder="Detail alamat lahan operasional..."
                                                value={signupForm.landAddress}
                                                onChange={(e) => setSignupForm({ ...signupForm, landAddress: e.target.value })}
                                                className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Spesialisasi Tanaman</label>
                                                <select
                                                    value={signupForm.cropSpecialty}
                                                    onChange={(e) => setSignupForm({ ...signupForm, cropSpecialty: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2"
                                                >
                                                    <option value="Padi">Padi</option>
                                                    <option value="Sayuran">Sayuran</option>
                                                    <option value="Buah">Buah</option>
                                                    <option value="Perkebunan">Perkebunan</option>
                                                    <option value="Hortikultura">Hortikultura</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Luas Lahan (Ha/M²)</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 1.5 Hektar"
                                                    value={signupForm.landArea}
                                                    onChange={(e) => setSignupForm({ ...signupForm, landArea: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Lama Bertani (Tahun)</label>
                                                <input
                                                    type="number"
                                                    placeholder="e.g. 8"
                                                    value={signupForm.farmingExperience}
                                                    onChange={(e) => setSignupForm({ ...signupForm, farmingExperience: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2">Kapasitas Produksi / Panen</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 5 Ton"
                                                    value={signupForm.harvestCapacity}
                                                    onChange={(e) => setSignupForm({ ...signupForm, harvestCapacity: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs outline-none focus:ring-2"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: VERIFIKASI KEPEMILIKAN LAHAN */}
                                {signupStep === 3 && (
                                    <motion.div
                                        key="step-3"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4 text-xs"
                                    >
                                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                                            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                                                <ShieldCheck className="w-5 h-5" /> Verifikasi Legalitas Lahan
                                            </h3>
                                            <p className="text-slate-300 text-[11px] leading-relaxed">
                                                Untuk menjaga keamanan investor, setiap proyek pertanian wajib memiliki bukti legalitas lahan yang sah sebelum diajukan ke publik [1].
                                            </p>
                                        </div>

                                        {/* Document Upload Simulation */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {[
                                                { key: 'landOwnership', title: 'Bukti Kepemilikan (SHM/HGU)', status: docStatuses.landOwnership },
                                                { key: 'rentContract', title: 'Surat Kontrak Sewa Lahan', status: docStatuses.rentContract },
                                                { key: 'landDocumentation', title: 'Dokumentasi Lahan Terbaru', status: docStatuses.landDocumentation },
                                                { key: 'supportingData', title: 'Surat Keterangan Kelompok Tani', status: docStatuses.supportingData }
                                            ].map((doc) => (
                                                <div
                                                    key={doc.key}
                                                    onClick={() => {
                                                        setDocStatuses((prev) => ({
                                                            ...prev,
                                                            [doc.key]: 'Menunggu Review'
                                                        }));
                                                    }}
                                                    className="p-3 rounded-xl border border-dashed border-white/15 bg-slate-900/40 hover:border-emerald-500/40 cursor-pointer flex justify-between items-center transition-colors"
                                                >
                                                    <div className="space-y-1">
                                                        <span className="font-semibold block text-slate-200">{doc.title}</span>
                                                        <span className="text-[9px] text-slate-500">Klik untuk simulasikan upload</span>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${doc.status === 'Belum Upload' ? 'bg-slate-800 text-slate-400' : 'bg-amber-500/20 text-amber-400 animate-pulse'
                                                        }`}>
                                                        {doc.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 4: PENGAJUAN PROYEK INVESTASI */}
                                {signupStep === 4 && (
                                    <motion.div
                                        key="step-4"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4 text-xs"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">Nama Proyek Pertama</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Budidaya Cabai Premium 1 Hektar"
                                                    value={signupForm.projectName}
                                                    onChange={(e) => setSignupForm({ ...signupForm, projectName: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 outline-none focus:ring-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">Jenis Tanaman Proyek</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Cabai Keriting G3"
                                                    value={signupForm.projectCrop}
                                                    onChange={(e) => setSignupForm({ ...signupForm, projectCrop: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 outline-none focus:ring-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">Modal Sendiri</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Rp 25 Juta"
                                                    value={signupForm.neededCapital}
                                                    onChange={(e) => setSignupForm({ ...signupForm, neededCapital: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 outline-none focus:ring-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">Target Pendanaan</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Rp 100 Juta"
                                                    value={signupForm.targetFunding}
                                                    onChange={(e) => setSignupForm({ ...signupForm, targetFunding: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 outline-none focus:ring-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">Estimasi Lama Panen</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 6 Bulan"
                                                    value={signupForm.harvestPeriod}
                                                    onChange={(e) => setSignupForm({ ...signupForm, harvestPeriod: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 outline-none focus:ring-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">Estimasi Keuntungan p.a.</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 15% - 20%"
                                                    value={signupForm.estimatedProfit}
                                                    onChange={(e) => setSignupForm({ ...signupForm, estimatedProfit: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 outline-none focus:ring-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">Analisis Risiko Proyek</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Cuaca & Penyakit Tanaman"
                                                    value={signupForm.projectRisk}
                                                    onChange={(e) => setSignupForm({ ...signupForm, projectRisk: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 outline-none focus:ring-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-300 space-y-1">
                                            <span className="font-bold text-amber-400 block flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Pernyataan Keterbukaan Risiko (Disclosure)</span>
                                            <p className="text-[10px] leading-relaxed">
                                                Petani wajib memberikan informasi risiko secara jujur, transparan, dan berdasarkan fakta riil kondisi lapangan demi menjaga kepuasan kemitraan [1].
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 5: PERSETUJUAN */}
                                {signupStep === 5 && (
                                    <motion.div
                                        key="step-5"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4 text-xs"
                                    >
                                        <div className="p-4 rounded-xl bg-slate-900/85 border border-white/5 space-y-3">
                                            <h4 className="font-bold text-emerald-400 text-sm border-b border-white/5 pb-2">Konfirmasi Deklarasi & Komitmen Legal</h4>

                                            <div className="space-y-3">
                                                {[
                                                    { key: 'dataValid', text: 'Saya menyatakan bahwa seluruh data legalitas, kepemilikan lahan, dan data pribadi yang diberikan adalah benar dan valid sesuai hukum.' },
                                                    { key: 'landRights', text: 'Saya memiliki hak penuh penggunaan lahan untuk proyek pertanian yang diajukan dalam jangka waktu operasional kontrak.' },
                                                    { key: 'verificationReady', text: 'Saya bersedia mengikuti proses verifikasi fisik oleh tim surveyor independen platform AgroVendor.' },
                                                    { key: 'rejectionAware', text: 'Saya memahami bahwa pengajuan proyek investasi dapat ditolak secara permanen jika dokumen ditemukan tidak valid.' }
                                                ].map((item) => (
                                                    <label key={item.key} className="flex items-start gap-3 cursor-pointer select-none">
                                                        <input
                                                            type="checkbox"
                                                            checked={checklist[item.key]}
                                                            onChange={(e) => setChecklist(prev => ({ ...prev, [item.key]: e.target.checked }))}
                                                            className="rounded mt-0.5 bg-slate-900 border-white/10 text-emerald-500 focus:ring-0"
                                                        />
                                                        <span className="text-slate-300 leading-normal">{item.text}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Actions */}
                            <div className="flex justify-between mt-6 pt-5 border-t border-white/10">
                                {signupStep > 1 ? (
                                    <button
                                        onClick={() => setSignupStep((s) => s - 1)}
                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Kembali
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setScreen('login')}
                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                )}

                                {signupStep < 5 ? (
                                    <button
                                        onClick={() => setSignupStep((s) => s + 1)}
                                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-lg shadow-emerald-500/10 transition-all cursor-pointer"
                                    >
                                        Selanjutnya <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate("/dashboardvendor")}
                                        disabled={!Object.values(checklist).every(Boolean)}
                                        className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer ${Object.values(checklist).every(Boolean)
                                                ? 'bg-gradient-to-r from-emerald-500 to-amber-400 text-slate-950 shadow-emerald-500/15 hover:opacity-95'
                                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Ajukan Verifikasi <ShieldCheck className="w-4 h-4" />
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