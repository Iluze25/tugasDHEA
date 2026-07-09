import React, { useState, useMemo } from 'react';
import {
    Wallet,
    Banknote,
    TrendingUp,
    TrendingDown,
    Receipt,
    FileText,
    ChartLine,
    Coins,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Download,
    Calendar,
    X,
    Plus,
    RefreshCw,
    CheckCircle,
    HelpCircle,
    Clock3,
    ArrowDownLeft
} from 'lucide-react';
import Navbar1 from "../../../components/vendor/navbar.jsx"

// === DUMMY DATA AWAL TRANSAKSI AKUNTANSI AGROBISNIS ===
const INITIAL_TRANSACTIONS = [
    {
        id: "TX-2026-001",
        date: "2026-07-09", // Hari ini
        type: "Pendapatan",
        description: "Penjualan Cabai Merah Organik (Gudang A)",
        category: "Pendapatan",
        amount: 12500000,
        paymentMethod: "Transfer Bank Mandiri",
        status: "Selesai"
    },
    {
        id: "TX-2026-002",
        date: "2026-07-09", // Hari ini
        type: "Pengeluaran",
        description: "Pembelian Pupuk NPK Cair Cair",
        category: "Pupuk",
        amount: 2000000,
        paymentMethod: "Transfer Bank BCA",
        status: "Selesai"
    },
    {
        id: "TX-2026-003",
        date: "2026-07-08",
        type: "Pendapatan",
        description: "Penjualan Tomat Organik Beef (Supermarket Lotte)",
        category: "Pendapatan",
        amount: 8400000,
        paymentMethod: "E-Wallet (GoPay)",
        status: "Selesai"
    },
    {
        id: "TX-2026-004",
        date: "2026-07-07",
        type: "Pengeluaran",
        description: "Upah Pekerja Harian Lepas (Panen Cabai)",
        category: "Tenaga Kerja",
        amount: 4500000,
        paymentMethod: "Tunai",
        status: "Selesai"
    },
    {
        id: "TX-2026-005",
        date: "2026-07-05",
        type: "Pengeluaran",
        description: "Sewa Truk Logistik Pengiriman Bandung",
        category: "Transportasi",
        amount: 1200000,
        paymentMethod: "Tunai",
        status: "Selesai"
    },
    {
        id: "TX-2026-006",
        date: "2026-07-02",
        type: "Pendapatan",
        description: "Penjualan Bawang Merah Brebes (Partai Besar)",
        category: "Pendapatan",
        amount: 45000000,
        paymentMethod: "Transfer Bank Mandiri",
        status: "Selesai"
    },
    {
        id: "TX-2026-007",
        date: "2026-06-25",
        type: "Pengeluaran",
        description: "Pembelian Bibit Kentang Granola Unggul",
        category: "Operasional",
        amount: 8500000,
        paymentMethod: "Transfer Bank BRI",
        status: "Selesai"
    },
    {
        id: "TX-2026-008",
        date: "2026-06-15",
        type: "Pendapatan",
        description: "Penjualan Jagung Pipil Manis",
        category: "Pendapatan",
        amount: 18600000,
        paymentMethod: "Transfer Bank Mandiri",
        status: "Selesai"
    },
    {
        id: "TX-2026-009",
        date: "2026-06-10",
        type: "Pengeluaran",
        description: "Perbaikan Pipa Irigasi Blok C",
        category: "Operasional",
        amount: 3200000,
        paymentMethod: "Tunai",
        status: "Selesai"
    },
    {
        id: "TX-2026-010",
        date: "2026-06-05",
        type: "Pendapatan",
        description: "Penjualan Bayam Horenzo Premium",
        category: "Pendapatan",
        amount: 4500000,
        paymentMethod: "E-Wallet (OVO)",
        status: "Selesai"
    },
    {
        id: "TX-2026-011",
        date: "2026-05-20",
        type: "Pengeluaran",
        description: "Listrik Pompa Air & Chiller Pendingin",
        category: "Operasional",
        amount: 1600000,
        paymentMethod: "Transfer Bank BCA",
        status: "Selesai"
    },
    {
        id: "TX-2026-012",
        date: "2026-05-10",
        type: "Pendapatan",
        description: "Penjualan Brokoli Aquaponik Jepang",
        category: "Pendapatan",
        amount: 31000000,
        paymentMethod: "Transfer Bank BCA",
        status: "Selesai"
    }
];

// === DUMMY BULANAN (LAPORAN PENDAPATAN) ===
const INITIAL_MONTHLY_REVENUE = [
    { month: "Januari", count: "45 transaksi", amount: 10000000, growth: "+12%" },
    { month: "Februari", count: "38 transaksi", amount: 12500000, growth: "+25%" },
    { month: "Maret", count: "52 transaksi", amount: 15000000, growth: "+20%" },
    { month: "April", count: "41 transaksi", amount: 14200000, growth: "-5%" },
    { month: "Mei", count: "48 transaksi", amount: 31000000, growth: "+118%" },
    { month: "Juni", count: "55 transaksi", amount: 23100000, growth: "-25%" },
    { month: "Juli", count: "60 transaksi", amount: 65900000, growth: "+185%" }
];

export default function FinancialManagement() {
    // === STATES ===
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [monthlyRevenue, setMonthlyRevenue] = useState(INITIAL_MONTHLY_REVENUE);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("Semua");
    const [dateFilter, setDateFilter] = useState("Semua");

    // Modals
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    // Form Tambah Transaksi Baru (Inisialisasi)
    const [formData, setFormData] = useState({
        description: "",
        type: "Pendapatan",
        category: "Pendapatan",
        amount: "",
        paymentMethod: "Transfer Bank Mandiri",
        date: "2026-07-09"
    });

    // Toast Notifikasi
    const [toastMessage, setToastMessage] = useState(null);

    // === NOTIFIKASI TOAST ===
    const triggerToast = (message) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 4000);
    };

    // === REFRESH / SKELETON LOADER ===
    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            triggerToast("Data keuangan berhasil dimuat ulang dan disinkronkan.");
        }, 1100);
    };

    // === EXPORT CSV ===
    const handleExport = () => {
        triggerToast("Laporan keuangan berhasil diekspor ke format CSV.");
    };

    // === PROSES SIMPAN TRANSAKSI BARU (YANG DIPERBAIKI) ===
    const handleAddTransaction = (e) => {
        e.preventDefault();
        const nominal = parseFloat(formData.amount);

        // Validasi dasar input
        if (!formData.description || isNaN(nominal) || nominal <= 0) {
            triggerToast("Keterangan tidak boleh kosong & nominal harus bernilai positif.");
            return;
        }

        // Membuat objek transaksi baru
        const newTx = {
            id: `TX-2026-${String(transactions.length + 1).padStart(3, "0")}`,
            date: formData.date,
            type: formData.type,
            description: formData.description,
            category: formData.type === "Pendapatan" ? "Pendapatan" : formData.category,
            amount: nominal,
            paymentMethod: formData.paymentMethod,
            status: "Selesai"
        };

        // Memperbarui state transaksi utama
        setTransactions((prev) => [newTx, ...prev]);

        // Jika tipenya pendapatan, akumulasikan secara dinamis ke Laporan Pendapatan Juli
        if (formData.type === "Pendapatan") {
            setMonthlyRevenue((prev) =>
                prev.map((item) => {
                    if (item.month === "Juli") {
                        return {
                            ...item,
                            amount: item.amount + nominal,
                            count: `${parseInt(item.count) + 1} transaksi`
                        };
                    }
                    return item;
                })
            );
        }

        triggerToast(`Transaksi ${newTx.id} berhasil dicatat ke pembukuan.`);
        setShowAddModal(false);

        // Reset data formulir kembali ke setelan pabrik
        setFormData({
            description: "",
            type: "Pendapatan",
            category: "Pendapatan",
            amount: "",
            paymentMethod: "Transfer Bank Mandiri",
            date: "2026-07-09"
        });
    };

    // === FORMAT RUPIAH ===
    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(value);
    };

    // === FILTERING TRANSAKSI ===
    const filteredTransactions = useMemo(() => {
        return transactions.filter((tx) => {
            const matchesSearch =
                tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = typeFilter === "Semua" || tx.type === typeFilter;

            const txDate = new Date(tx.date);
            const baseDate = new Date("2026-07-09");
            let matchesDate = true;

            if (dateFilter === "Hari Ini") {
                matchesDate = tx.date === "2026-07-09";
            } else if (dateFilter === "7 Hari") {
                const diffTime = Math.abs(baseDate - txDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                matchesDate = diffDays <= 7;
            } else if (dateFilter === "30 Hari") {
                const diffTime = Math.abs(baseDate - txDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                matchesDate = diffDays <= 30;
            }

            return matchesSearch && matchesType && matchesDate;
        });
    }, [transactions, searchQuery, typeFilter, dateFilter]);

    // === METRIK FINANSIAL AKTIF (DYNAMIC RE-CALCULATION) ===
    const financials = useMemo(() => {
        const revenue = transactions
            .filter((tx) => tx.type === "Pendapatan")
            .reduce((sum, tx) => sum + tx.amount, 0);

        const expenses = transactions
            .filter((tx) => tx.type === "Pengeluaran")
            .reduce((sum, tx) => sum + tx.amount, 0);

        const profit = revenue - expenses;
        const cashBalance = profit + 15000000; // Asumsi Modal Kas Awal Cadangan

        return { revenue, expenses, profit, cashBalance };
    }, [transactions]);

    // === AKUMULASI PENGELUARAN DINAMIS PER KATEGORI (DISEMPURNAKAN) ===
    const expensesByCategory = useMemo(() => {
        const categories = {
            Operasional: 0,
            Pupuk: 0,
            Transportasi: 0,
            "Tenaga Kerja": 0
        };

        // Filter transaksi berjenis pengeluaran dan jumlahkan berdasarkan kuncinya
        transactions
            .filter((tx) => tx.type === "Pengeluaran")
            .forEach((tx) => {
                if (categories[tx.category] !== undefined) {
                    categories[tx.category] += tx.amount;
                } else {
                    // Fallback apabila ada ketidakcocokan kategori
                    categories.Operasional += tx.amount;
                }
            });

        const totalExpense = Object.values(categories).reduce((sum, val) => sum + val, 0);

        return Object.entries(categories).map(([name, amount]) => ({
            name,
            amount,
            percent: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0
        }));
    }, [transactions]);

    return (
        <>
            <Navbar1 />
            <div className="relative min-h-screen bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-slate-100/90 p-4 md:p-8 text-slate-800 font-sans selection:bg-emerald-200">

                {/* Animasi Transisi Halus CSS */}
                <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-subtle-pulse { animation: subtle-pulse 8s ease-in-out infinite; }
      `}</style>

                {/* Dekorasi Latar Belakang */}
                <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-200 rounded-full filter blur-3xl opacity-20 pointer-events-none animate-subtle-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-25 pointer-events-none animate-subtle-pulse" style={{ animationDelay: '3s' }} />

                <div className="relative max-w-7xl mx-auto space-y-8">

                    {/* --- NOTIFIKASI TOAST --- */}
                    {toastMessage && (
                        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur-sm text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-500/20 animate-in fade-in slide-in-from-top-4">
                            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                            <span className="text-sm font-medium">{toastMessage}</span>
                        </div>
                    )}

                    {/* --- HERO SECTION --- */}
                    {loading ? (
                        <div className="h-56 bg-slate-200/50 rounded-3xl animate-pulse" />
                    ) : (
                        <div className="relative bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 text-white">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="space-y-3 text-center md:text-left max-w-xl">
                                    <div className="inline-flex items-center gap-1.5 bg-emerald-600/40 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-100 uppercase tracking-widest">
                                        <Coins className="w-3.5 h-3.5" />
                                        Financial Accounting Platform
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                                        Manajemen Keuangan
                                    </h1>
                                    <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed">
                                        Kelola pendapatan, pengeluaran, arus kas, dan laporan keuangan bisnis pertanian secara mudah. Dirancang transparan untuk kepatuhan akuntansi modern.
                                    </p>
                                </div>

                                {/* Sisi Kanan: Area Floating Icons */}
                                <div className="relative w-full max-w-[280px] h-32 md:h-40 flex items-center justify-center">
                                    <div className="absolute w-36 h-36 bg-emerald-600/20 border border-emerald-500/10 rounded-full animate-ping pointer-events-none" />

                                    {/* Wallet */}
                                    <div className="absolute transform -translate-x-12 -translate-y-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-float shadow-lg">
                                        <Wallet className="h-8 w-8 text-emerald-200" />
                                    </div>

                                    {/* Coins */}
                                    <div className="absolute transform translate-x-12 -translate-y-8 bg-emerald-500/30 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-400/20 animate-float shadow-lg" style={{ animationDelay: '1.5s' }}>
                                        <Coins className="h-7 w-7 text-white" />
                                    </div>

                                    {/* FileText */}
                                    <div className="absolute transform -translate-x-2 translate-y-10 bg-green-500/40 backdrop-blur-md p-3 rounded-2xl border border-green-300/20 animate-float shadow-lg" style={{ animationDelay: '3s' }}>
                                        <FileText className="h-6 w-6 text-emerald-100" />
                                    </div>

                                    {/* TrendingUp */}
                                    <div className="absolute transform translate-x-10 translate-y-8 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10 animate-float shadow-lg" style={{ animationDelay: '4.5s' }}>
                                        <TrendingUp className="h-5 w-5 text-emerald-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- SUMMARY CARDS --- */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "Total Pendapatan", value: formatRupiah(financials.revenue), desc: "Pemasukan dari transaksi bisnis", icon: TrendingUp, color: "text-emerald-700 border-emerald-200/60 bg-emerald-50/50" },
                            { title: "Total Pengeluaran", value: formatRupiah(financials.expenses), desc: "Total biaya operasional bisnis", icon: Receipt, color: "text-red-700 border-red-200/60 bg-red-50/50" },
                            { title: "Keuntungan Bersih", value: formatRupiah(financials.profit), desc: "Pendapatan bersih setelah beban", icon: Wallet, color: "text-green-700 border-green-200/60 bg-green-50/50" },
                            { title: "Saldo Kas", value: formatRupiah(financials.cashBalance), desc: "Dana kas & bank tersedia saat ini", icon: Banknote, color: "text-amber-700 border-amber-200/60 bg-amber-50/50" }
                        ].map((card, i) => {
                            const IconComponent = card.icon;
                            return loading ? (
                                <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200/40 animate-pulse" />
                            ) : (
                                <div
                                    key={i}
                                    className={`p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group ${card.color}`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-wider">
                                            {card.title}
                                        </span>
                                        <div className="p-1.5 rounded-lg bg-white shadow-sm text-current">
                                            <IconComponent className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base md:text-xl font-black tracking-tight">
                                            {card.value}
                                        </h3>
                                        <p className="text-[10px] md:text-xs text-slate-400 font-medium">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- FINANCIAL ANALYSIS GRIDS --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Ringkasan Keuangan (Financial Overview) */}
                        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                                        <ChartLine className="h-4 w-4 text-emerald-600" />
                                        Ringkasan Keuangan
                                    </h2>
                                    <p className="text-xs text-slate-400 font-medium">Analisis visual proporsi alokasi keuangan agribisnis</p>
                                </div>
                                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2.5 py-1 rounded-lg">Kuartal II 2026</span>
                            </div>

                            {/* Progress/Proporsi Bars */}
                            <div className="space-y-5 pt-2">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                                        <span>Aliran Pemasukan</span>
                                        <span className="font-bold text-slate-800">100%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                                        <span>Rasio Pengeluaran terhadap Pendapatan</span>
                                        <span className="font-bold text-slate-800">
                                            {financials.revenue > 0 ? Math.round((financials.expenses / financials.revenue) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                                            style={{ width: `${financials.revenue > 0 ? Math.min(100, (financials.expenses / financials.revenue) * 100) : 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                                        <span>Rasio Laba Bersih</span>
                                        <span className="font-bold text-slate-800">
                                            {financials.revenue > 0 ? Math.round((financials.profit / financials.revenue) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                                            style={{ width: `${financials.revenue > 0 ? Math.max(0, (financials.profit / financials.revenue) * 100) : 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Likuiditas</span>
                                    <span className="text-xs font-black text-slate-800 block mt-1">Sangat Aman</span>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Arus Dana</span>
                                    <span className="text-xs font-black text-emerald-600 block mt-1">Surplus</span>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Efisiensi Biaya</span>
                                    <span className="text-xs font-black text-slate-800 block mt-1">Optimal</span>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Pajak (Estimasi)</span>
                                    <span className="text-xs font-black text-slate-800 block mt-1">Rp2.500.000</span>
                                </div>
                            </div>
                        </div>

                        {/* Ringkasan Laba Rugi */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-emerald-600" />
                                Ringkasan Laba Rugi
                            </h2>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="font-semibold text-slate-500">Pendapatan Kotor</span>
                                    <span className="font-bold text-slate-800">{formatRupiah(financials.revenue)}</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="font-semibold text-slate-500">Beban Pengeluaran (-)</span>
                                    <span className="font-bold text-red-600">{formatRupiah(financials.expenses)}</span>
                                </div>

                                <div className="p-4 bg-emerald-50 rounded-2xl flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Laba Bersih</span>
                                        <span className="text-base font-black text-emerald-900">{formatRupiah(financials.profit)}</span>
                                    </div>
                                    <ArrowUpRight className="h-6 w-6 text-emerald-600 bg-white p-1 rounded-full shadow-sm shrink-0" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* --- SECOND SECTION GRID --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Laporan Pendapatan (Monthly list) */}
                        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-extrabold text-slate-800">Laporan Pendapatan</h3>
                                    <p className="text-xs text-slate-400">Rincian pertumbuhan penjualan hasil bumi dari awal tahun</p>
                                </div>
                                <button onClick={handleExport} className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 animate-hover">
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                                            <th className="py-2.5">Bulan</th>
                                            <th className="py-2.5">Jumlah Transaksi</th>
                                            <th className="py-2.5 text-right">Pendapatan</th>
                                            <th className="py-2.5 text-right">Pertumbuhan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
                                        {monthlyRevenue.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/20">
                                                <td className="py-2.5 font-bold text-slate-800">{row.month}</td>
                                                <td className="py-2.5 text-slate-400">{row.count}</td>
                                                <td className="py-2.5 text-right font-bold text-slate-900">{formatRupiah(row.amount)}</td>
                                                <td className={`py-2.5 text-right font-extrabold ${row.growth.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                                                    {row.growth}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Catatan Pengeluaran & Arus Kas */}
                        <div className="space-y-6">

                            {/* Expense records */}
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-extrabold text-slate-800">Catatan Pengeluaran</h3>
                                    <p className="text-xs text-slate-400">Distribusi realisasi pembiayaan operasional pertanian</p>
                                </div>

                                <div className="space-y-3 pt-1">
                                    {expensesByCategory.map((category, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-700">{category.name}</span>
                                                <span className="font-extrabold text-slate-900">{formatRupiah(category.amount)}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${category.percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Arus Kas Widget */}
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                                <h3 className="text-base font-extrabold text-slate-800">Arus Kas</h3>

                                <div className="space-y-3.5 text-xs">
                                    {/* Cash In */}
                                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-2xl">
                                        <div className="flex items-center gap-2">
                                            <ArrowUpRight className="h-4 w-4 text-emerald-600 bg-white p-0.5 rounded-full" />
                                            <span className="font-bold text-emerald-800">Arus Masuk</span>
                                        </div>
                                        <span className="font-bold text-emerald-700">{formatRupiah(financials.revenue)}</span>
                                    </div>

                                    {/* Cash Out */}
                                    <div className="flex items-center justify-between p-2.5 bg-red-50 rounded-2xl">
                                        <div className="flex items-center gap-2">
                                            <ArrowDownRight className="h-4 w-4 text-red-600 bg-white p-0.5 rounded-full" />
                                            <span className="font-bold text-red-800">Arus Keluar</span>
                                        </div>
                                        <span className="font-bold text-red-700">{formatRupiah(financials.expenses)}</span>
                                    </div>

                                    {/* Current Balance */}
                                    <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-2xl">
                                        <div className="flex items-center gap-2">
                                            <Coins className="h-4 w-4 text-amber-600 bg-white p-0.5 rounded-full" />
                                            <span className="font-bold text-amber-800">Saldo Akhir</span>
                                        </div>
                                        <span className="font-bold text-amber-700">{formatRupiah(financials.cashBalance)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* --- FILTER & TRANSACTION TABLE --- */}
                    <div className="space-y-4">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative w-full md:max-w-xs">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari transaksi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                                    <Filter className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Jenis:</span>
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="bg-transparent focus:outline-none cursor-pointer text-slate-800 font-bold"
                                    >
                                        <option value="Semua">Semua</option>
                                        <option value="Pendapatan">Pendapatan</option>
                                        <option value="Pengeluaran">Pengeluaran</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Tanggal:</span>
                                    <select
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="bg-transparent focus:outline-none cursor-pointer text-slate-800 font-bold"
                                    >
                                        <option value="Semua">Semua</option>
                                        <option value="Hari Ini">Hari Ini</option>
                                        <option value="7 Hari">7 Hari Terakhir</option>
                                        <option value="30 Hari">30 Hari Terakhir</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleRefresh}
                                    className="p-2 bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                </button>

                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
                                >
                                    <Plus className="h-4 w-4" />
                                    Tambah Transaksi
                                </button>
                            </div>
                        </div>

                        {/* Table Container */}
                        {loading ? (
                            <div className="bg-white rounded-3xl p-6 border border-slate-200/40 animate-pulse space-y-4">
                                <div className="h-8 bg-slate-200/60 rounded-lg w-1/4" />
                                <div className="h-64 bg-slate-200/40 rounded-xl" />
                            </div>
                        ) : filteredTransactions.length === 0 ? (
                            /* Empty State */
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 py-16 px-4 text-center max-w-lg mx-auto shadow-sm space-y-6">
                                <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100">
                                    <FileText className="h-10 w-10" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-800">Belum ada data keuangan</h3>
                                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                        Belum terdapat transaksi finansial tercatat yang memenuhi kriteria pencarian Anda.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
                                >
                                    <Plus className="h-4 w-4" />
                                    Tambah Transaksi
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-left">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                                <th className="py-4 px-5">ID Transaksi</th>
                                                <th className="py-4 px-5">Tanggal</th>
                                                <th className="py-4 px-5">Jenis</th>
                                                <th className="py-4 px-5">Keterangan</th>
                                                <th className="py-4 px-5">Kategori</th>
                                                <th className="py-4 px-5 text-right">Jumlah</th>
                                                <th className="py-4 px-5">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium text-slate-700">
                                            {filteredTransactions.map((tx) => (
                                                <tr
                                                    key={tx.id}
                                                    onClick={() => setSelectedTransaction(tx)}
                                                    className="hover:bg-slate-50/40 transition-colors cursor-pointer group"
                                                >
                                                    <td className="py-4 px-5 font-mono font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                        {tx.id}
                                                    </td>
                                                    <td className="py-4 px-5 text-slate-400 font-semibold">
                                                        {new Date(tx.date).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className={`inline-flex px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${tx.type === "Pendapatan" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                                                            {tx.type}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5 font-bold text-slate-800">{tx.description}</td>
                                                    <td className="py-4 px-5 text-slate-400 font-semibold">{tx.category}</td>
                                                    <td className={`py-4 px-5 text-right font-black ${tx.type === "Pendapatan" ? "text-emerald-700" : "text-red-600"}`}>
                                                        {tx.type === "Pendapatan" ? "+" : "-"}{formatRupiah(tx.amount)}
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                                            {tx.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-slate-50/50 border-t border-slate-100 px-5 py-3.5 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase">
                                    <span>Total: {filteredTransactions.length} baris data keuangan</span>
                                    <span>Sinkronisasi Pembukuan Aman</span>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* --- DETAIL TRANSAKSI MODAL --- */}
                {selectedTransaction && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                                <div>
                                    <span className="font-mono text-xs text-slate-400 font-bold">{selectedTransaction.id}</span>
                                    <h3 className="text-base font-extrabold text-slate-800">Detail Transaksi Jurnal</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedTransaction(null)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Jumlah Transaksi</span>
                                        <span className={`text-xl font-black ${selectedTransaction.type === "Pendapatan" ? "text-emerald-700" : "text-red-600"}`}>
                                            {selectedTransaction.type === "Pendapatan" ? "+" : "-"}{formatRupiah(selectedTransaction.amount)}
                                        </span>
                                    </div>
                                    <HelpCircle className="h-6 w-6 text-slate-400" />
                                </div>

                                <div className="space-y-2.5 text-xs">
                                    <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Tanggal Pencatatan</span>
                                        <span className="font-semibold text-slate-700">{selectedTransaction.date}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Tipe Jurnal</span>
                                        <span className="font-semibold text-slate-700">{selectedTransaction.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Kategori</span>
                                        <span className="font-semibold text-slate-700">{selectedTransaction.category}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Metode Pembayaran</span>
                                        <span className="font-semibold text-slate-700">{selectedTransaction.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Status</span>
                                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{selectedTransaction.status}</span>
                                    </div>
                                    <div className="space-y-1 pt-2">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Keterangan Jurnal</span>
                                        <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium leading-relaxed">
                                            {selectedTransaction.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={() => setSelectedTransaction(null)}
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                                >
                                    Tutup Detail
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAMBAH TRANSAKSI MODAL --- */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                                <div>
                                    <h3 className="text-base font-extrabold text-slate-800">Catat Transaksi Finansial</h3>
                                    <p className="text-xs text-slate-400">Masukkan entri data baru ke buku besar agribisnis</p>
                                </div>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddTransaction}>
                                <div className="p-6 space-y-4">

                                    {/* Keterangan */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Keterangan Transaksi</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Contoh: Pembelian bibit tomat hibrida..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>

                                    {/* Jenis Jurnal (Pendapatan/Pengeluaran) */}
                                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: "Pendapatan", category: "Pendapatan" })}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${formData.type === "Pendapatan"
                                                ? "bg-white text-emerald-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-800"
                                                }`}
                                        >
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                            Pemasukan
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: "Pengeluaran", category: "Operasional" })}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${formData.type === "Pengeluaran"
                                                ? "bg-white text-red-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-800"
                                                }`}
                                        >
                                            <ArrowDownLeft className="h-3.5 w-3.5" />
                                            Pengeluaran
                                        </button>
                                    </div>

                                    {/* Kategori Pengeluaran */}
                                    {formData.type === "Pengeluaran" && (
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Kategori Pengeluaran</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                                            >
                                                <option value="Operasional">🚜 Operasional</option>
                                                <option value="Pupuk">🌱 Pupuk & Benih</option>
                                                <option value="Transportasi">🚚 Transportasi</option>
                                                <option value="Tenaga Kerja">👥 Tenaga Kerja</option>
                                            </select>
                                        </div>
                                    )}

                                    {/* Nominal */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Nominal Rupiah (Rp)</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            placeholder="Masukkan nominal angka saja..."
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>

                                    {/* Metode Pembayaran */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Metode Pembayaran</label>
                                        <select
                                            value={formData.paymentMethod}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                                        >
                                            <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                                            <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                                            <option value="Transfer Bank BRI">Transfer Bank BRI</option>
                                            <option value="Transfer Bank BNI">Transfer Bank BNI</option>
                                            <option value="E-Wallet (GoPay)">E-Wallet (GoPay)</option>
                                            <option value="Tunai">Tunai</option>
                                        </select>
                                    </div>

                                    {/* Tanggal */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Tanggal Transaksi</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>

                                </div>

                                <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Simpan Transaksi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}