import React, { useState, useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    Calendar,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Percent,
    X,
    ShoppingBag,
    Users,
    Coins,
    Award
} from 'lucide-react';

// === DATASET MULTI-TAHUN ===
// Setiap bulan kini memiliki parameter 'investorFunding' (Dana Masuk dari Investor)
const datasetByYear = {
    '2026': [
        { name: 'Januari', revenue: 5000000, investorFunding: 2000000, growth: '0%', sales: 32, bestSeller: 'Beras Pandanwangi', investors: 3, dailyAvg: 161290 },
        { name: 'Februari', revenue: 6200000, investorFunding: 2500000, growth: '24.0%', sales: 38, bestSeller: 'Beras Pandanwangi', investors: 3, dailyAvg: 221428 },
        { name: 'Maret', revenue: 7800000, investorFunding: 4000000, growth: '25.8%', sales: 45, bestSeller: 'Pupuk Kompos Premium', investors: 4, dailyAvg: 251612 },
        { name: 'April', revenue: 9500000, investorFunding: 5000000, growth: '21.8%', sales: 56, bestSeller: 'Cabai Organik', investors: 5, dailyAvg: 316000 },
        { name: 'Mei', revenue: 8900000, investorFunding: 3500000, growth: '-6.3%', sales: 50, bestSeller: 'Cabai Organik', investors: 5, dailyAvg: 287096 },
        { name: 'Juni', revenue: 10500000, investorFunding: 6000000, growth: '18.0%', sales: 62, bestSeller: 'Melon Golden Honey', investors: 6, dailyAvg: 350000 },
        { name: 'Juli', revenue: 12200000, investorFunding: 8000000, growth: '14.3%', sales: 70, bestSeller: 'Melon Golden Honey', investors: 6, dailyAvg: 387096 },
    ],
    '2025': [
        { name: 'Januari', revenue: 4200000, investorFunding: 1500000, growth: '0%', sales: 28, bestSeller: 'Beras Pandanwangi', investors: 2, dailyAvg: 135483 },
        { name: 'Februari', revenue: 5000000, investorFunding: 1800000, growth: '19.0%', sales: 30, bestSeller: 'Pupuk Kompos Premium', investors: 2, dailyAvg: 178571 },
        { name: 'Maret', revenue: 6500000, investorFunding: 3000000, growth: '30.0%', sales: 40, bestSeller: 'Cabai Organik', investors: 3, dailyAvg: 209677 },
        { name: 'April', revenue: 7200000, investorFunding: 3200000, growth: '10.7%', sales: 44, bestSeller: 'Cabai Organik', investors: 3, dailyAvg: 240000 },
        { name: 'Mei', revenue: 7000000, investorFunding: 2800000, growth: '-2.7%', sales: 42, bestSeller: 'Jagung Manis', investors: 3, dailyAvg: 225806 },
        { name: 'Juni', revenue: 8500000, investorFunding: 4000000, growth: '21.4%', sales: 51, bestSeller: 'Melon Golden Honey', investors: 4, dailyAvg: 283333 },
        { name: 'Juli', revenue: 9800000, investorFunding: 5000000, growth: '15.3%', sales: 58, bestSeller: 'Melon Golden Honey', investors: 4, dailyAvg: 316129 },
        { name: 'Agustus', revenue: 9000000, investorFunding: 4500000, growth: '-8.1%', sales: 53, bestSeller: 'Beras Pandanwangi', investors: 4, dailyAvg: 290322 },
        { name: 'September', revenue: 10500000, investorFunding: 5500000, growth: '16.6%', sales: 62, bestSeller: 'Bawang Merah Super', investors: 5, dailyAvg: 350000 },
        { name: 'Oktober', revenue: 11200000, investorFunding: 6000000, growth: '6.6%', sales: 68, bestSeller: 'Bawang Merah Super', investors: 5, dailyAvg: 361290 },
        { name: 'November', revenue: 12000000, investorFunding: 6500000, growth: '7.1%', sales: 72, bestSeller: 'Cabai Organik', investors: 6, dailyAvg: 400000 },
        { name: 'Desember', revenue: 14500000, investorFunding: 8500000, growth: '20.8%', sales: 85, bestSeller: 'Durian Montong', investors: 7, dailyAvg: 467741 },
    ],
    '2024': [
        { name: 'Januari', revenue: 3500000, investorFunding: 1000000, growth: '0%', sales: 20, bestSeller: 'Pupuk Kompos Premium', investors: 1, dailyAvg: 112903 },
        { name: 'Februari', revenue: 4000000, investorFunding: 1200000, growth: '14.2%', sales: 24, bestSeller: 'Beras Pandanwangi', investors: 1, dailyAvg: 142857 },
        { name: 'Maret', revenue: 5200000, investorFunding: 2000000, growth: '30.0%', sales: 31, bestSeller: 'Beras Pandanwangi', investors: 2, dailyAvg: 167741 },
        { name: 'April', revenue: 5800000, investorFunding: 2200000, growth: '11.5%', sales: 35, bestSeller: 'Cabai Organik', investors: 2, dailyAvg: 193333 },
        { name: 'Mei', revenue: 5500000, investorFunding: 1800000, growth: '-5.1%', sales: 33, bestSeller: 'Cabai Organik', investors: 2, dailyAvg: 177419 },
        { name: 'Juni', revenue: 6800000, investorFunding: 3000000, growth: '23.6%', sales: 40, bestSeller: 'Melon Golden Honey', investors: 3, dailyAvg: 226666 },
        { name: 'Juli', revenue: 7500000, investorFunding: 3500000, growth: '10.2%', sales: 45, bestSeller: 'Melon Golden Honey', investors: 3, dailyAvg: 241935 },
        { name: 'Agustus', revenue: 7000000, investorFunding: 3200000, growth: '-6.6%', sales: 42, bestSeller: 'Jagung Manis', investors: 3, dailyAvg: 225806 },
        { name: 'September', revenue: 8200000, investorFunding: 4000000, growth: '17.1%', sales: 50, bestSeller: 'Bawang Merah Super', investors: 4, dailyAvg: 273333 },
        { name: 'Oktober', revenue: 8800000, investorFunding: 4200000, growth: '7.3%', sales: 54, bestSeller: 'Bawang Merah Super', investors: 4, dailyAvg: 283870 },
        { name: 'November', revenue: 9500000, investorFunding: 4500000, growth: '7.9%', sales: 60, bestSeller: 'Cabai Organik', investors: 4, dailyAvg: 316666 },
        { name: 'Desember', revenue: 11000000, investorFunding: 5500000, growth: '15.7%', sales: 70, bestSeller: 'Durian Montong', investors: 5, dailyAvg: 354838 },
    ]
};

const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);
};

// === INLINE CUSTOM CSS STYLES ===
const CustomStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
    @keyframes gradient-move {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes float-slow {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(25px, -15px) scale(1.06); }
    }
    @keyframes float-alternate {
      0%, 100% { transform: translate(0px, 0px) scale(1.02); }
      50% { transform: translate(-20px, 20px) scale(0.98); }
    }
    .animate-gradient-bg {
      background-size: 200% 200%;
      animation: gradient-move 14s ease infinite;
    }
    .animate-float-slow {
      animation: float-slow 18s ease-in-out infinite;
    }
    .animate-float-alt {
      animation: float-alternate 22s ease-in-out infinite;
    }
  `}} />
);

// === SUB-KOMPONEN: REVENUE SUMMARY + ANNUAL STATS ===
function RevenueSummary({ latestData, totalSalesYear, totalInvestorsYear, selectedYear }) {
    if (!latestData) return null;
    const isNegative = latestData.growth.startsWith('-');

    return (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Kolom Kiri: Angka Pendapatan Bulan Terakhir */}
            <div className="lg:col-span-5 border-r border-slate-100 lg:pr-6">
                <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">
                        Pendapatan Bulan Berjalan ({latestData.name})
                    </p>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
                <div className="flex flex-wrap items-baseline gap-3 mt-1.5">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                        {formatRupiah(latestData.revenue)}
                    </h2>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full border shadow-sm ${isNegative
                        ? 'bg-amber-100 text-amber-800 border-amber-200/50'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-200/50'
                        }`}>
                        <TrendingUp className="w-3 h-3" />
                        {isNegative ? '' : '+'}{latestData.growth}
                    </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                    Dibanding bulan sebelumnya
                </p>
            </div>

            {/* Kolom Kanan: Kumulatif Tahunan (Sales, Investor) + Produk Terlaris Terkini */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3">
                {/* Box Sales Kumulatif */}
                <div className="p-3 bg-emerald-50/30 border border-emerald-100/50 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Total Sales ({selectedYear})</span>
                    </div>
                    <p className="text-sm md:text-base font-extrabold text-slate-800 mt-2">
                        {totalSalesYear} Transaksi
                    </p>
                </div>

                {/* Box Investor Kumulatif */}
                <div className="p-3 bg-emerald-50/30 border border-emerald-100/50 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Total Investor ({selectedYear})</span>
                    </div>
                    <p className="text-sm md:text-base font-extrabold text-slate-800 mt-2">
                        {totalInvestorsYear} Mitra
                    </p>
                </div>

                {/* Box Bestseller Bulan Terakhir */}
                <div className="p-3 bg-emerald-50/30 border border-emerald-100/50 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Terlaris ({latestData.name})</span>
                    </div>
                    <p className="text-xs md:text-sm font-extrabold text-slate-800 mt-2 line-clamp-1">
                        {latestData.bestSeller}
                    </p>
                </div>
            </div>
        </div>
    );
}

// === SUB-KOMPONEN: STATISTIC CARD ===
const colorThemes = {
    emerald: {
        bg: 'bg-emerald-50/50 hover:bg-emerald-50/80 border-emerald-100/70',
        iconBg: 'bg-emerald-100 text-emerald-700',
        text: 'text-emerald-700 font-bold',
        icon: ArrowUpRight
    },
    amber: {
        bg: 'bg-amber-50/50 hover:bg-amber-50/80 border-amber-100/70',
        iconBg: 'bg-amber-100 text-amber-700',
        text: 'text-amber-700 font-bold',
        icon: ArrowDownRight
    },
    blue: {
        bg: 'bg-blue-50/50 hover:bg-blue-50/80 border-blue-100/70',
        iconBg: 'bg-blue-100 text-blue-700',
        text: 'text-blue-700 font-bold',
        icon: Percent
    }
};

function StatisticCard({ title, value, sub, color = 'emerald' }) {
    const theme = colorThemes[color] || colorThemes.emerald;
    const Icon = theme.icon;

    return (
        <div className={`p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${theme.bg}`}>
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {title}
                    </span>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">
                        {value}
                    </h4>
                </div>
                <div className={`p-2 rounded-lg ${theme.iconBg}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
                <span className={`text-xs ${theme.text}`}>
                    {sub}
                </span>
            </div>
        </div>
    );
}

// === SUB-KOMPONEN: REVENUE DETAIL MODAL ===
function RevenueModal({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/20 backdrop-blur-md transition-opacity duration-300">
            <div className="relative w-full max-w-md bg-white border border-emerald-100/50 rounded-2xl shadow-2xl p-6 overflow-hidden animate-fade-in">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-60"></div>

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">
                                Detail Pendapatan Bulan
                            </h3>
                            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                                {data.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-xl">
                        <span className="text-xs text-slate-500 font-medium">Total Pendapatan</span>
                        <div className="text-2xl font-black text-emerald-800 mt-0.5">
                            {formatRupiah(data.revenue)}
                        </div>
                        <div className={`text-xs font-bold mt-1 inline-block ${data.growth.startsWith('-') ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {data.growth.startsWith('-') ? '' : '+'}{data.growth} dibanding bulan lalu
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Penjualan</span>
                            </div>
                            <p className="text-sm font-bold text-slate-800">
                                {data.sales} Transaksi
                            </p>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                                <Users className="w-3.5 h-3.5" />
                                <span>Investor Aktif</span>
                            </div>
                            <p className="text-sm font-bold text-slate-800">
                                {data.investors} Investor
                            </p>
                        </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between col-span-2">
                        <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-slate-500 font-medium">Masukan Modal Investor</span>
                        </div>
                        <p className="text-sm font-bold text-blue-650">
                            {formatRupiah(data.investorFunding)}
                        </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs text-slate-500 font-medium">Produk Terlaris</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">
                            {data.bestSeller}
                        </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-amber-600" />
                            <span className="text-xs text-slate-500 font-medium">Pendapatan Harian</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">
                            {formatRupiah(data.dailyAvg)}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm rounded-xl transition-all shadow-md"
                >
                    Tutup Detail
                </button>
            </div>
        </div>
    );
}

// === SUB-KOMPONEN: REVENUE & INVESTOR CHART (DUAL AREA CHART) ===
const CustomTooltipOnHover = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white border border-slate-100 p-3.5 shadow-xl rounded-xl backdrop-blur-sm min-w-[190px]">
                <p className="text-xs font-bold text-slate-700 mb-2">{data.name}</p>

                <div className="space-y-2">
                    {/* Baris Pemasukan Usaha */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded bg-emerald-500 inline-block"></span>
                            <span className="text-[10px] text-slate-400 font-medium">Pemasukan Usaha</span>
                        </div>
                        <p className="text-xs font-extrabold text-emerald-800">
                            {formatRupiah(data.revenue)}
                        </p>
                    </div>

                    {/* Baris Masuk Investor */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded bg-blue-500 inline-block"></span>
                            <span className="text-[10px] text-slate-400 font-medium">Modal Investor</span>
                        </div>
                        <p className="text-xs font-extrabold text-blue-800">
                            {formatRupiah(data.investorFunding)}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

function RevenueChart({ data, onDotClick }) {
    const formatYAxis = (value) => {
        if (value >= 1000000) return `${value / 1000000}JT`;
        return value;
    };

    return (
        <div className="w-full">
            {/* Legend Kustom di Atas Chart */}
            <div className="flex justify-center gap-6 mb-4 text-[11px] font-bold">
                <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-3 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span>Pemasukan Usaha (Operational)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-3 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                    <span>Modal Investor (Injected Capital)</span>
                </div>
            </div>

            <div className="w-full h-[320px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                        onClick={(state) => {
                            if (state && state.activePayload) {
                                onDotClick(state.activePayload[0].payload);
                            }
                        }}
                        className="cursor-pointer"
                    >
                        <defs>
                            {/* Gradien Hijau Emerald */}
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.20} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                            </linearGradient>
                            {/* Gradien Biru Samudera */}
                            <linearGradient id="colorInvestor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#E2E8F0"
                            opacity={0.6}
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
                            tickLine={false}
                            axisLine={false}
                            dy={8}
                        />
                        <YAxis
                            tickFormatter={formatYAxis}
                            tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
                            tickLine={false}
                            axisLine={false}
                            dx={-8}
                        />
                        <Tooltip content={<CustomTooltipOnHover />} />

                        {/* Area Pemasukan Usaha */}
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10B981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            activeDot={{
                                r: 5,
                                strokeWidth: 2,
                                stroke: '#FFF',
                                fill: '#059669',
                                className: 'shadow-lg filter drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]'
                            }}
                        />

                        {/* Area Modal Investor */}
                        <Area
                            type="monotone"
                            dataKey="investorFunding"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorInvestor)"
                            activeDot={{
                                r: 5,
                                strokeWidth: 2,
                                stroke: '#FFF',
                                fill: '#2563EB',
                                className: 'shadow-lg filter drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]'
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// === KOMPONEN UTAMA ===
export default function MonthlyRevenueDashboard() {
    const [selectedYear, setSelectedYear] = useState('2026');
    const [activeMonthData, setActiveMonthData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mengambil data dinamis berdasarkan tahun
    const currentYearData = useMemo(() => {
        return datasetByYear[selectedYear] || datasetByYear['2026'];
    }, [selectedYear]);

    // Total sales kumulatif tahunan
    const totalSalesYear = useMemo(() => {
        return currentYearData.reduce((sum, item) => sum + item.sales, 0);
    }, [currentYearData]);

    // Total investor kumulatif tahunan
    const totalInvestorsYear = useMemo(() => {
        return currentYearData.reduce((sum, item) => sum + item.investors, 0);
    }, [currentYearData]);

    // Total modal investor kumulatif tahunan
    const totalInvestorFundingYear = useMemo(() => {
        return currentYearData.reduce((sum, item) => sum + item.investorFunding, 0);
    }, [currentYearData]);

    // Kalkulasi statistik tertinggi, terendah, dan rata-rata berjalan
    const statistics = useMemo(() => {
        if (!currentYearData || currentYearData.length === 0) return { highest: {}, lowest: {}, average: 0 };

        let highest = currentYearData[0];
        let lowest = currentYearData[0];
        let totalRevenue = 0;

        currentYearData.forEach(item => {
            totalRevenue += item.revenue;
            if (item.revenue > highest.revenue) {
                highest = item;
            }
            if (item.revenue < lowest.revenue) {
                lowest = item;
            }
        });

        const average = Math.round(totalRevenue / currentYearData.length);

        return {
            highest,
            lowest,
            average
        };
    }, [currentYearData]);

    // Bulan berjalan terkini
    const latestMonthData = useMemo(() => {
        return currentYearData[currentYearData.length - 1];
    }, [currentYearData]);

    const handlePointClick = (monthData) => {
        setActiveMonthData(monthData);
        setIsModalOpen(true);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-100/60 to-green-50/80 animate-gradient-bg">
            <CustomStyles />

            {/* Background Soft Blobs */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-300/20 rounded-full blur-[80px] animate-float-slow pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-teal-200/20 rounded-full blur-[100px] animate-float-alt pointer-events-none"></div>

            {/* Panel Utama Glassmorphism */}
            <div className="relative w-full max-w-[1200px] bg-white/85 backdrop-blur-md rounded-2xl shadow-xl shadow-emerald-950/5 border border-white/80 p-6 md:p-10 transition-all duration-500 ease-out">

                {/* Header Dashboard */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-6">

                    <div>

                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-stone-950 via-emerald-950 to-stone-900 bg-clip-text text-transparent tracking-tight leading-none">
                            <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
                            Pendapatan & Investasi Bulanan
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
                            Visualisasi gabungan pemasukan usaha dan aliran dana masuk dari investor secara berkala.
                        </p>
                    </div>

                    {/* Dropdown Selector Tahun */}
                    <div className="relative self-start sm:self-auto">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-xs text-slate-650 font-bold rounded-lg shadow-sm transition-all cursor-pointer">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-transparent font-semibold border-none focus:outline-none cursor-pointer pr-1 text-slate-700"
                            >
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Ringkasan Akumulasi Tahunan */}
                <RevenueSummary
                    latestData={latestMonthData}
                    totalSalesYear={totalSalesYear}
                    totalInvestorsYear={totalInvestorsYear}
                    selectedYear={selectedYear}
                />

                {/* Area Grafik Gabungan */}
                <div className="bg-white/90 border border-slate-100 p-4 rounded-xl shadow-inner mb-6">
                    <RevenueChart
                        data={currentYearData}
                        onDotClick={handlePointClick}
                    />
                </div>

                {/* Tiga Kartu Statistik Utama */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatisticCard
                        title="Pendapatan Tertinggi"
                        value={formatRupiah(statistics.highest.revenue || 0)}
                        sub={statistics.highest.name || '-'}
                        color="emerald"
                    />
                    <StatisticCard
                        title="Total Investasi Masuk"
                        value={formatRupiah(totalInvestorFundingYear)}
                        sub={`Akumulasi Tahun ${selectedYear}`}
                        color="blue"
                    />
                    <StatisticCard
                        title="Rata-rata Pendapatan"
                        value={formatRupiah(statistics.average)}
                        sub="Per Bulan"
                        color="blue"
                    />
                </div>
            </div>

            {/* Modal Detail */}
            <RevenueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={activeMonthData}
            />
        </div>
    );
}