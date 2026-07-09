import React from 'react';

export default function BExperimen({ itemCount = 10 }) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-850 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-emerald-950/5 mb-8 border border-emerald-800/30">

            {/* Ornamen Daun / Botani di Latar Belakang (Kanan) */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 hidden md:block pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M70,10 C50,10 40,30 40,50 C40,70 50,90 70,90 C90,90 85,70 85,50 C85,30 90,10 70,10 Z M60,40 C55,45 50,55 50,60 C48,55 45,45 40,40 C45,35 48,25 50,20 C50,25 55,35 60,40 Z" />
                </svg>
            </div>

            {/* Ornamen Lingkaran Glow Halus (Kiri) */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Konten Utama */}
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    {/* Badge Kategori */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wider mb-4 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Ekosistem Agrobisnis
                    </span>

                    {/* Judul Utama */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white font-sans">
                        Keranjang <span className="text-amber-400">Belanja</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-emerald-100/80 max-w-xl font-medium leading-relaxed mt-3">
                        Kelola bibit, pupuk, dan hasil tani berkualitas pilihan Anda.
                    </p>
                </div>


            </div>
        </div>
    );
}