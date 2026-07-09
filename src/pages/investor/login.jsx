import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, Mail, Lock, User, Phone, ShieldCheck, Upload,
    ChevronLeft, ChevronRight, X, ArrowRight, TrendingUp, Briefcase, Activity
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function AgrobusinessAuthApp() {
    const navigate = useNavigate();

    const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'signup'
    const [signupStep, setSignupStep] = useState(1); // 1 | 2 | 3
    const [riskChecked, setRiskChecked] = useState(false);

    // Efek Floating Particles bertema daun/partikel investasi
    const ParticlesBackground = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${i % 2 === 0 ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}
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
        <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative font-sans flex flex-col justify-between">

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
            HALAMAN LOGIN INVESTOR
            ========================================== */}
                {currentScreen === 'login' && (
                    <motion.div
                        key="login-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="min-h-screen flex flex-col md:flex-row"
                    >
                        {/* Kiri: Landing Informasi Investor */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 bg-gradient-to-br from-emerald-950/40 via-slate-950/50 to-slate-950 border-r border-white/5 relative overflow-hidden">
                            <div className="relative z-10">
                                {/* Logo */}
                                <div className="flex items-center gap-2 mb-12">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <Leaf className="w-5 h-5 text-slate-950" />
                                    </div>
                                    <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">
                                        AGROFINANCE
                                    </span>
                                </div>

                                {/* Judul & Subjudul */}
                                <div className="max-w-md">
                                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                                        Investasi Pertanian <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">
                                            Masa Depan
                                        </span>
                                    </h1>
                                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                        Hubungkan modal Anda dengan proyek pertanian terpercaya dan pantau perkembangan investasi secara transparan [1].
                                    </p>
                                </div>

                                {/* Ilustrasi Grafik Sederhana */}
                                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-amber-400 uppercase font-semibold tracking-wider">Simulasi Pertumbuhan Aset</span>
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="h-20 flex items-end gap-3 justify-center mb-2">
                                        {[35, 50, 45, 70, 60, 85, 110].map((height, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="w-full bg-gradient-to-t from-emerald-600 to-amber-400 rounded-t-sm"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ delay: idx * 0.1, duration: 1, ease: 'easeOut' }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>Bulan 1</span><span>Bulan 3</span><span>Bulan 6 (Panen)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Statistik */}
                            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-400">10+</h3>
                                    <p className="text-[11px] text-slate-400">Proyek Aktif</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-amber-400">Rp500 Juta+</h3>
                                    <p className="text-[11px] text-slate-400">Dana Terkelola</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-400">95%</h3>
                                    <p className="text-[11px] text-slate-400">Keberhasilan Panen</p>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Card Login Investor */}
                        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-2">Portal Investor</h2>
                                    <p className="text-xs text-slate-400">Masuk untuk mengelola portofolio investasi agribisnis Anda.</p>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); alert('Simulasi Login Berhasil'); }} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400/80 mb-2">Alamat Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                            <input
                                                type="email"
                                                required
                                                placeholder="investor@gmail.com"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs text-slate-100 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400/80 mb-2">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
                                            <input
                                                type="password"
                                                required
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs text-slate-100 outline-none"
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
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition-all text-xs flex items-center justify-center gap-2"
                                    >
                                        Masuk Ke Akun
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </form>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-slate-950 px-3 text-slate-500">Atau masuk dengan</span></div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate("/Investor")}
                                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 transition-colors text-xs flex items-center justify-center gap-2 font-medium"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.214 1.832 15.474 1 12.24 1c-6.077 0-11 4.923-11 11s4.923 11 11 11c6.34 0 10.557-4.437 10.557-10.743 0-.724-.078-1.275-.172-1.972H12.24z" />
                                    </svg>
                                    Masuk dengan Google
                                </button>

                                <div className="mt-8 text-center text-xs text-slate-400">
                                    Belum memiliki akun?{' '}
                                    <button onClick={() => { setCurrentScreen('signup'); setSignupStep(1); }} className="text-amber-400 font-semibold hover:underline">
                                        Daftar sebagai Investor
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* ==========================================
            HALAMAN SIGNUP INVESTOR (MULTI-STEP)
            ========================================== */}
                {currentScreen === 'signup' && (
                    <motion.div
                        key="signup-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="min-h-screen flex items-center justify-center p-6"
                    >
                        <div className="w-full max-w-xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative">
                            {/* Header Signup */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Registrasi Akun Investor</h2>
                                    <p className="text-xs text-slate-400">Langkah {signupStep} dari 3</p>
                                </div>
                                <button
                                    onClick={() => setCurrentScreen('login')}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Progress Indicator */}
                            <div className="flex gap-2 mb-8">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex-1 h-1 rounded-full bg-slate-800 relative overflow-hidden">
                                        {step <= signupStep && (
                                            <motion.div
                                                layoutId="active-progress-bar"
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
                                {/* STEP 1: DATA PRIBADI */}
                                {signupStep === 1 && (
                                    <motion.div
                                        key="step-1"
                                        initial={{ x: 15, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -15, opacity: 0 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Nama Lengkap</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                                <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs outline-none" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                                    <input type="email" placeholder="john@domain.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs outline-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Nomor HP</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                                    <input type="tel" placeholder="0812XXXXXXXX" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs outline-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                                    <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs outline-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Konfirmasi Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                                    <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs outline-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Foto Profil</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-850 border border-white/10 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <button type="button" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs border border-white/10 transition-colors text-slate-300">
                                                    Pilih File Foto
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: INFORMASI INVESTOR */}
                                {signupStep === 2 && (
                                    <motion.div
                                        key="step-2"
                                        initial={{ x: 15, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -15, opacity: 0 }}
                                        className="space-y-5"
                                    >
                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Jenis Investor</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Individu', 'Perusahaan', 'Institusi'].map((type) => (
                                                    <label key={type} className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/50 cursor-pointer transition-all">
                                                        <input type="radio" name="investor-type" className="sr-only" />
                                                        <Briefcase className="w-5 h-5 text-emerald-500 mb-1" />
                                                        <span className="text-xs font-semibold">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Tujuan Investasi</span>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                {['Pendapatan tambahan', 'Investasi jangka panjang', 'Mendukung pertanian lokal'].map((goal) => (
                                                    <label key={goal} className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/50 cursor-pointer transition-all">
                                                        <input type="checkbox" className="rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-0" />
                                                        <span className="text-[11px] font-medium leading-tight">{goal}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2">Pengalaman Investasi</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Belum pernah', 'Pemula', 'Berpengalaman'].map((exp) => (
                                                    <label key={exp} className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/50 cursor-pointer transition-all">
                                                        <input type="radio" name="exp-level" className="sr-only" />
                                                        <Activity className="w-5 h-5 text-amber-400 mb-1" />
                                                        <span className="text-xs font-semibold">{exp}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: VERIFIKASI INVESTOR */}
                                {signupStep === 3 && (
                                    <motion.div
                                        key="step-3"
                                        initial={{ x: 15, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -15, opacity: 0 }}
                                        className="space-y-4"
                                    >
                                        {/* Syarat & Ketentuan */}
                                        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2 max-h-36 overflow-y-auto text-[11px] text-slate-300">
                                            <p className="font-semibold text-amber-400">Persyaratan Menjadi Investor:</p>
                                            <p><strong>1. Identitas valid:</strong> Memiliki KTP atau dokumen identitas resmi.</p>
                                            <p><strong>2. Rekening aktif:</strong> Rekening bank atas nama investor sendiri.</p>
                                            <p><strong>3. Data pribadi lengkap:</strong> Nama, alamat, dan nomor telepon valid.</p>
                                            <p><strong>4. Memahami risiko investasi pertanian:</strong> Risiko gagal panen, perubahan harga komoditas, dan faktor cuaca [1].</p>
                                            <p><strong>5. Minimal dana:</strong> Sesuai dengan ketentuan masing-masing proyek.</p>
                                            <p><strong>6. Kebijakan platform:</strong> Menyetujui semua aturan investasi yang berlaku.</p>
                                        </div>

                                        {/* Unggah Dokumen */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="p-3.5 rounded-xl border border-dashed border-white/20 hover:border-emerald-500/50 bg-slate-900/30 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                                                <Upload className="w-5 h-5 text-emerald-500 mb-1" />
                                                <span className="text-[11px] font-semibold">Foto KTP</span>
                                            </div>
                                            <div className="p-3.5 rounded-xl border border-dashed border-white/20 hover:border-emerald-500/50 bg-slate-900/30 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                                                <Upload className="w-5 h-5 text-emerald-500 mb-1" />
                                                <span className="text-[11px] font-semibold">Bukti Rekening</span>
                                            </div>
                                        </div>

                                        {/* Persetujuan Risiko */}
                                        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={riskChecked}
                                                onChange={(e) => setRiskChecked(e.target.checked)}
                                                className="rounded mt-0.5 bg-slate-900 border-white/10 text-emerald-500 focus:ring-0"
                                            />
                                            <span className="text-[11px] text-slate-300 leading-tight select-none">
                                                Saya memahami risiko investasi pertanian dan menyetujui kebijakan platform [1].
                                            </span>
                                        </label>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Step Navigation Buttons */}
                            <div className="flex justify-between mt-6 pt-5 border-t border-white/10">
                                {signupStep > 1 ? (
                                    <button
                                        onClick={() => setSignupStep(prev => prev - 1)}
                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Kembali
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setCurrentScreen('login')}
                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold transition-colors"
                                    >
                                        Batal
                                    </button>
                                )}

                                {signupStep < 3 ? (
                                    <button
                                        onClick={() => setSignupStep(prev => prev + 1)}
                                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-lg shadow-emerald-500/10 transition-all"
                                    >
                                        Selanjutnya <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { alert('Simulasi Pendaftaran Berhasil!'); setCurrentScreen('login'); }}
                                        disabled={!riskChecked}
                                        className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${riskChecked
                                            ? 'bg-gradient-to-r from-emerald-500 to-amber-400 text-slate-950 shadow-lg shadow-emerald-500/10 hover:opacity-95'
                                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Selesaikan Registrasi <ShieldCheck className="w-4 h-4" />
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