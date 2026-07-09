import React, { useState, useMemo } from "react";
import { finance } from "../datavendor.jsx";
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
    Cell
} from "recharts";
import {
    Wallet,
    Receipt,
    ReceiptText,
    Calculator,
    Coins,
    Banknote,
    TrendingUp,
    TrendingDown,
    ChartColumn,
    Search,
    Filter,
    Calendar,
    X,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    BookOpen,
    Leaf,
    Info,
    Plus
} from "lucide-react";
import Navbar1 from "../../../components/vendor/navbar.jsx"

export default function FinancePage() {
    // --- STATE DATA UTAMA (Diinisialisasi dari Mock Data agar Dinamis saat User Menambah Transaksi) ---
    const [transactionsList, setTransactionsList] = useState(finance.transactions || []);
    const [revenueDataList, setRevenueDataList] = useState(finance.revenueData || []);
    const [expenseRecordsList, setExpenseRecordsList] = useState(finance.expenseRecords || []);

    // --- STATE UNTUK PENCARIAN & FILTER ---
    const [expenseSearch, setExpenseSearch] = useState("");
    const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("Semua");
    const [expenseSort, setExpenseSort] = useState("Terbaru");

    const [txSearch, setTxSearch] = useState("");
    const [txTypeFilter, setTxTypeFilter] = useState("Semua");
    const [txSort, setTxSort] = useState("Terbaru");

    // --- STATE KONTROL MODAL ---
    const [selectedTx, setSelectedTx] = useState(null); // Detail transaksi
    const [metricModal, setMetricModal] = useState(null); // Detail metrik
    const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false); // Form transaksi baru

    // --- STATE FORMULIR TRANSAKSI BARU ---
    const [addTxForm, setAddTxForm] = useState({
        type: "Pendapatan",
        category: "Pemasaran",
        description: "",
        amount: "",
        status: "Selesai"
    });

    // --- LOGIKA AKUNTANSI & REKALKULASI DINAMIS ---
    const totalRevenue = useMemo(() => {
        return revenueDataList.reduce(
            (sum, item) => sum + (Number(item.revenue) || Number(item.amount) || Number(item.value) || 0),
            0
        );
    }, [revenueDataList]);

    const totalExpense = useMemo(() => {
        return expenseRecordsList.reduce(
            (sum, item) => sum + (Number(item.amount) || Number(item.value) || 0),
            0
        );
    }, [expenseRecordsList]);

    const netProfit = totalRevenue - totalExpense;
    const totalTransactionsCount = transactionsList.length;
    const marginPercentage = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0.0";

    // Data Bulanan untuk Grafik Recharts Area (Dinamis)
    const chartData = useMemo(() => {
        return revenueDataList.map((item) => ({
            name: item.month,
            "Pendapatan": Number(item.revenue) || Number(item.amount) || Number(item.value) || 0
        }));
    }, [revenueDataList]);

    // Kategori Pengeluaran Unik untuk Dropdown Filter
    const expenseCategories = useMemo(() => {
        const categories = expenseRecordsList.map((e) => e.category);
        return ["Semua", ...new Set(categories)];
    }, [expenseRecordsList]);

    // Data Rasio Kas Masuk / Keluar (Arus Kas)
    const cashFlowData = [
        { name: "Kas Masuk", Jumlah: totalRevenue, fill: "#059669" },
        { name: "Kas Keluar", Jumlah: totalExpense, fill: "#dc2626" }
    ];

    // Pemfilteran & Pengurutan Jurnal Pengeluaran
    const filteredExpenses = useMemo(() => {
        let list = [...expenseRecordsList];

        if (expenseSearch.trim() !== "") {
            list = list.filter(
                (e) =>
                    e.description?.toLowerCase().includes(expenseSearch.toLowerCase()) ||
                    e.category?.toLowerCase().includes(expenseSearch.toLowerCase())
            );
        }

        if (expenseCategoryFilter !== "Semua") {
            list = list.filter((e) => e.category === expenseCategoryFilter);
        }

        list.sort((a, b) => {
            const dateA = new Date(a.date || a.expenseDate);
            const dateB = new Date(b.date || b.expenseDate);
            return expenseSort === "Terbaru" ? dateB - dateA : dateA - dateB;
        });

        return list;
    }, [expenseRecordsList, expenseSearch, expenseCategoryFilter, expenseSort]);

    // Pemfilteran & Pengurutan Tabel Transaksi Utama
    const filteredTransactions = useMemo(() => {
        let list = [...transactionsList];

        if (txSearch.trim() !== "") {
            list = list.filter(
                (t) =>
                    t.id?.toLowerCase().includes(txSearch.toLowerCase()) ||
                    t.description?.toLowerCase().includes(txSearch.toLowerCase())
            );
        }

        if (txTypeFilter !== "Semua") {
            list = list.filter((t) => t.type === txTypeFilter);
        }

        list.sort((a, b) => {
            if (txSort === "Terbaru") {
                return new Date(b.date) - new Date(a.date);
            } else if (txSort === "Terlama") {
                return new Date(a.date) - new Date(b.date);
            } else if (txSort === "Nominal terbesar") {
                return b.amount - a.amount;
            }
            return 0;
        });

        return list;
    }, [transactionsList, txSearch, txTypeFilter, txSort]);

    // --- HANDLER: TAMBAH TRANSAKSI BARU ---
    const handleAddTransactionSubmit = (e) => {
        e.preventDefault();

        const amountNum = Number(addTxForm.amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            alert("Mohon masukkan nominal transaksi yang valid.");
            return;
        }

        const txId = `TX-${Date.now().toString().slice(-6)}`;
        const currentDateStr = "2026-07-09"; // Tanggal sistem simulasi
        const mockMonth = "Juli"; // Bulan simulasi untuk memperbarui grafik Recharts

        // 1. Buat Objek Transaksi Baru
        const newTx = {
            id: txId,
            type: addTxForm.type,
            description: addTxForm.description,
            amount: amountNum,
            date: currentDateStr,
            status: addTxForm.status
        };

        // 2. Perbarui State Jurnal Transaksi
        setTransactionsList([newTx, ...transactionsList]);

        // 3. Rekonstruksi Alokasi Berdasarkan Jenis Transaksi
        if (addTxForm.type === "Pendapatan") {
            // Perbarui data Pendapatan Bulanan untuk grafik (Juli)
            setRevenueDataList((prev) => {
                const monthExists = prev.some((item) => item.month === mockMonth);
                if (monthExists) {
                    return prev.map((item) =>
                        item.month === mockMonth
                            ? { ...item, revenue: (Number(item.revenue || item.amount || 0) + amountNum) }
                            : item
                    );
                } else {
                    return [...prev, { month: mockMonth, revenue: amountNum }];
                }
            });
        } else {
            // Perbarui log Pengeluaran Operasional
            const newExpense = {
                category: addTxForm.category,
                description: addTxForm.description,
                amount: amountNum,
                date: currentDateStr
            };
            setExpenseRecordsList([newExpense, ...expenseRecordsList]);
        }

        // 4. Tutup Modal & Reset Form
        setIsAddTxModalOpen(false);
        setAddTxForm({
            type: "Pendapatan",
            category: "Pemasaran",
            description: "",
            amount: "",
            status: "Selesai"
        });
    };

    // Format ke Rupiah (IDR)
    const formatIDR = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(value);
    };

    // Format Tanggal Indonesia
    const formatDate = (dateStr) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateStr).toLocaleDateString("id-ID", options);
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
                                Sistem Pelaporan Keuangan Vendor
                            </span>
                            <h1 className="text-3xl md:text-4.5xl font-black tracking-tight leading-tight">
                                Laporan Keuangan Bisnis
                            </h1>
                            <p className="text-emerald-200/80 text-sm md:text-base leading-relaxed">
                                Pantau seluruh aktivitas keuangan usaha pertanian mulai dari pendapatan, pengeluaran, arus kas, hingga riwayat transaksi dalam satu dashboard.
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={() => setIsAddTxModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all transform hover:-translate-y-0.5"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Catat Transaksi Baru</span>
                                </button>
                            </div>
                        </div>

                        {/* Floating Decorative Glass Icons (Kanan) */}
                        <div className="relative h-28 w-56 shrink-0 hidden md:block select-none">
                            <div className="absolute right-4 top-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/15 animate-float">
                                <Coins className="w-8 h-8 text-amber-400" />
                            </div>
                            <div className="absolute right-24 top-10 bg-white/5 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-white/10 animate-float-delay">
                                <Calculator className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="absolute right-36 top-0 bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-md border border-white/15 animate-float">
                                <Leaf className="w-5 h-5 text-green-300" />
                            </div>
                        </div>
                    </div>

                    {/* Financial Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div
                            onClick={() => setMetricModal({ type: "revenue", title: "Total Pendapatan", desc: "Akumulasi seluruh pemasukan kotor dari penjualan komoditas pertanian." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pendapatan</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{formatIDR(totalRevenue)}</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setMetricModal({ type: "expense", title: "Total Pengeluaran", desc: "Seluruh beban biaya operasional, logistik, pengemasan, dan pembelian bahan baku pertanian." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100/55">
                                    <Receipt className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pengeluaran</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{formatIDR(totalExpense)}</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setMetricModal({ type: "netProfit", title: "Laba Bersih", desc: "Keuntungan bersih usaha setelah dikurangi seluruh biaya pengeluaran operasional." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-green-50 text-green-600 border border-green-100/55">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Laba Bersih</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{formatIDR(netProfit)}</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div
                            onClick={() => setMetricModal({ type: "transactions", title: "Total Transaksi", desc: "Jumlah aktivitas pencatatan keuangan masuk dan keluar dalam sistem pembukuan." })}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/55">
                                    <ReceiptText className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Transaksi</p>
                                    <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">{totalTransactionsCount}</p>
                                </div>
                            </div>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </div>
                    </div>

                    {/* Charts & Accounting Block */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">

                        <div className="lg:col-span-2 space-y-6 md:space-y-8">
                            {/* Revenue Trend AreaChart */}
                            <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                        <ChartColumn className="w-5 h-5 text-emerald-600" />
                                        <span>Tren Pendapatan Bulanan</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Representasi kemajuan finansial pertanian berdasarkan tren bulanan.</p>
                                </div>

                                <div className="h-72 w-full pt-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                            <YAxis
                                                stroke="#94a3b8"
                                                fontSize={11}
                                                tickLine={false}
                                                tickFormatter={(value) => `Rp${value / 1000}k`}
                                            />
                                            <Tooltip
                                                formatter={(value) => [formatIDR(value), "Pendapatan"]}
                                                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Pendapatan"
                                                stroke="#059669"
                                                strokeWidth={2.5}
                                                fillOpacity={1}
                                                fill="url(#colorRevenue)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Cash Flow & Profit/Loss */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base">Ikhtisar Arus Kas</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">Perbandingan rasio kas masuk vs kas keluar saat ini.</p>
                                    </div>

                                    <div className="h-44 w-full flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={cashFlowData} barSize={40} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `Rp${v / 1000}k`} />
                                                <Tooltip
                                                    formatter={(value) => [formatIDR(value), "Jumlah"]}
                                                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                                                />
                                                <Bar dataKey="Jumlah">
                                                    {cashFlowData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold pt-2 border-t border-slate-50">
                                        <div className="text-emerald-700">
                                            <span className="block text-[10px] text-slate-400 uppercase font-bold">Kas Masuk</span>
                                            <span className="text-sm font-bold block mt-0.5">{formatIDR(totalRevenue)}</span>
                                        </div>
                                        <div className="text-rose-700">
                                            <span className="block text-[10px] text-slate-400 uppercase font-bold">Kas Keluar</span>
                                            <span className="text-sm font-bold block mt-0.5">{formatIDR(totalExpense)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-sm flex flex-col justify-between space-y-4">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base">Bagan Laba & Rugi (P&L)</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">Ringkasan kesehatan finansial operasional berkala.</p>
                                    </div>

                                    <div className="space-y-3.5 text-xs font-semibold text-slate-600">
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100/80">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                Total Pendapatan Kotor
                                            </span>
                                            <span className="text-slate-900 text-sm font-bold">{formatIDR(totalRevenue)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100/80">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                                Total Beban Operasional
                                            </span>
                                            <span className="text-slate-900 text-sm font-bold">({formatIDR(totalExpense)})</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                            <span className="font-bold text-slate-900">Laba Bersih Usaha</span>
                                            <span className={`text-sm font-black ${netProfit >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                                                {formatIDR(netProfit)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-2 text-xs bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-100/60 font-semibold">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            Margin Profit:
                                        </span>
                                        <span className="text-sm font-black">{marginPercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column Right: Expense Records */}
                        <div className="space-y-6 md:space-y-8">
                            <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h3 className="font-bold text-slate-900 text-base">Pencatatan Pengeluaran</h3>
                                    <p className="text-[11px] text-slate-400 mt-0.5">Daftar beban operasional yang dicatat.</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari deskripsi pengeluaran..."
                                            value={expenseSearch}
                                            onChange={(e) => setExpenseSearch(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-slate-50/50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <select
                                            value={expenseCategoryFilter}
                                            onChange={(e) => setExpenseCategoryFilter(e.target.value)}
                                            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            {expenseCategories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat === "Semua" ? "Semua Kategori" : cat}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={expenseSort}
                                            onChange={(e) => setExpenseSort(e.target.value)}
                                            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value="Terbaru">Terbaru</option>
                                            <option value="Terlama">Terlama</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                                    {filteredExpenses.length === 0 ? (
                                        <div className="text-center py-10 text-slate-400">
                                            <Receipt className="w-8 h-8 mx-auto stroke-1 mb-2 text-slate-300" />
                                            <p className="text-xs font-semibold">Tidak ada pengeluaran.</p>
                                        </div>
                                    ) : (
                                        filteredExpenses.map((expense, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50/50 to-slate-100/30 border border-slate-100/80 shadow-xs flex justify-between items-start gap-2.5 text-xs group"
                                            >
                                                <div className="min-w-0 space-y-1">
                                                    <span className="inline-flex items-center text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.2 rounded-md">
                                                        {expense.category}
                                                    </span>
                                                    <p className="font-bold text-slate-900 group-hover:text-rose-700 transition-colors truncate">
                                                        {expense.description}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-medium">
                                                        {formatDate(expense.date || expense.expenseDate)}
                                                    </p>
                                                </div>
                                                <span className="font-bold text-rose-600 shrink-0 text-sm mt-0.5">
                                                    -{formatIDR(expense.amount || expense.value)}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <ReceiptText className="w-5 h-5 text-emerald-600" />
                                    <span>Riwayat Transaksi Jurnal</span>
                                </h2>
                                <p className="text-xs text-slate-400 mt-0.5 font-medium">Jurnal komprehensif seluruh transaksi internal kotor dan bersih usaha.</p>
                            </div>

                            {/* Filter Toolbar */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
                                <div className="relative w-full sm:max-w-xs">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari ID atau deskripsi..."
                                        value={txSearch}
                                        onChange={(e) => setTxSearch(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
                                    <select
                                        value={txTypeFilter}
                                        onChange={(e) => setTxTypeFilter(e.target.value)}
                                        className="flex-1 sm:flex-none bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    >
                                        <option value="Semua">Semua Tipe</option>
                                        <option value="Pendapatan">Pendapatan</option>
                                        <option value="Pengeluaran">Pengeluaran</option>
                                    </select>

                                    <select
                                        value={txSort}
                                        onChange={(e) => setTxSort(e.target.value)}
                                        className="flex-1 sm:flex-none bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    >
                                        <option value="Terbaru">Terbaru</option>
                                        <option value="Terlama">Terlama</option>
                                        <option value="Nominal terbesar">Terbesar</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Table Transaction */}
                        <div className="hidden md:block bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider uppercase">
                                        <th className="px-6 py-4.5">ID Transaksi</th>
                                        <th className="px-6 py-4.5">Tipe</th>
                                        <th className="px-6 py-4.5">Deskripsi</th>
                                        <th className="px-6 py-4.5 text-right">Nominal</th>
                                        <th className="px-6 py-4.5">Tanggal</th>
                                        <th className="px-6 py-4.5 text-center">Status</th>
                                        <th className="px-6 py-4.5 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                                    {filteredTransactions.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-16 text-center text-slate-400 bg-slate-50/25">
                                                <BookOpen className="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300" />
                                                <p className="text-base font-bold text-slate-700">Transaksi Tidak Ditemukan</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTransactions.map((tx) => {
                                            const isIncome = tx.type === "Pendapatan";
                                            return (
                                                <tr
                                                    key={tx.id}
                                                    className="hover:bg-slate-50/30 transition-colors duration-150 cursor-pointer group"
                                                    onClick={() => setSelectedTx(tx)}
                                                >
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono text-slate-500 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/50">
                                                            {tx.id}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${isIncome
                                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100/50"
                                                            : "bg-rose-50 text-rose-700 border border-rose-100/50"
                                                            }`}>
                                                            {isIncome ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                                            {tx.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-slate-900">{tx.description}</td>
                                                    <td className={`px-6 py-4 text-right font-black text-sm ${isIncome ? "text-emerald-700" : "text-rose-700"}`}>
                                                        {isIncome ? "+" : "-"}{formatIDR(tx.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500 font-medium">{formatDate(tx.date)}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${tx.status === "Selesai"
                                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                                            : tx.status === "Pending"
                                                                ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                                                                : "bg-slate-100 text-slate-500 border border-slate-200"
                                                            }`}>
                                                            <span className={`w-1 h-1 rounded-full ${tx.status === "Selesai" ? "bg-emerald-500" : tx.status === "Pending" ? "bg-amber-500" : "bg-slate-400"
                                                                }`} />
                                                            {tx.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            onClick={() => setSelectedTx(tx)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card Transaction Layout */}
                        <div className="md:hidden space-y-4">
                            {filteredTransactions.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 shadow-sm">
                                    <BookOpen className="w-12 h-12 mx-auto stroke-1 mb-2 text-slate-300" />
                                    <p className="text-sm font-bold text-slate-700">Transaksi Tidak Ditemukan</p>
                                </div>
                            ) : (
                                filteredTransactions.map((tx) => {
                                    const isIncome = tx.type === "Pendapatan";
                                    return (
                                        <div
                                            key={tx.id}
                                            onClick={() => setSelectedTx(tx)}
                                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-3"
                                        >
                                            <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                                                <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200/50">
                                                    {tx.id}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-medium">{formatDate(tx.date)}</span>
                                            </div>

                                            <div className="flex justify-between items-start gap-2">
                                                <div className="space-y-1">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold ${isIncome
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100/50"
                                                        : "bg-rose-50 text-rose-700 border border-rose-100/50"
                                                        }`}>
                                                        {tx.type}
                                                    </span>
                                                    <h4 className="font-bold text-slate-900 text-xs mt-1.5">{tx.description}</h4>
                                                </div>

                                                <div className="text-right space-y-1.5">
                                                    <p className={`font-black text-sm ${isIncome ? "text-emerald-700" : "text-rose-700"}`}>
                                                        {isIncome ? "+" : "-"}{formatIDR(tx.amount)}
                                                    </p>
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold ${tx.status === "Selesai"
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                                        : tx.status === "Pending"
                                                            ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                                                            : "bg-slate-100 text-slate-500 border border-slate-200"
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* ==================================== MODALS ==================================== */}

                {/* 1. Modal Formulir Tambah Transaksi Baru (Simulasi Interaktif) */}
                {isAddTxModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform scale-100 transition-all text-sm">

                            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4.5 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-emerald-600" />
                                    <h3 className="text-base font-bold text-slate-900">Catat Transaksi Baru</h3>
                                </div>
                                <button
                                    onClick={() => setIsAddTxModalOpen(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddTransactionSubmit} className="p-6 space-y-4">

                                {/* Tipe Transaksi */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tipe Transaksi *</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setAddTxForm({ ...addTxForm, type: "Pendapatan" })}
                                            className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${addTxForm.type === "Pendapatan"
                                                ? "bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-500/10"
                                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                                            <span>Pendapatan</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAddTxForm({ ...addTxForm, type: "Pengeluaran" })}
                                            className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${addTxForm.type === "Pengeluaran"
                                                ? "bg-rose-50 border-rose-300 text-rose-800 ring-2 ring-rose-500/10"
                                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            <ArrowDownRight className="w-4 h-4 text-rose-600" />
                                            <span>Pengeluaran</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Kategori Pengeluaran (Hanya muncul jika tipenya Pengeluaran) */}
                                {addTxForm.type === "Pengeluaran" && (
                                    <div className="space-y-1.5 animate-fadeIn">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Pengeluaran *</label>
                                        <select
                                            value={addTxForm.category}
                                            onChange={(e) => setAddTxForm({ ...addTxForm, category: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white font-semibold"
                                        >
                                            <option value="Operasional">Operasional</option>
                                            <option value="Pupuk & Nutrisi">Pupuk & Nutrisi</option>
                                            <option value="Logistik & Distribusi">Logistik & Distribusi</option>
                                            <option value="Kemasan">Kemasan</option>
                                            <option value="Peralatan">Peralatan</option>
                                        </select>
                                    </div>
                                )}

                                {/* Keterangan */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Keterangan / Deskripsi *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Contoh: Penjualan Jagung Manis, Pembelian Pupuk Urea"
                                        value={addTxForm.description}
                                        onChange={(e) => setAddTxForm({ ...addTxForm, description: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>

                                {/* Nominal Transaksi */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nominal Transaksi (Rp) *</label>
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        placeholder="Contoh: 1500000"
                                        value={addTxForm.amount}
                                        onChange={(e) => setAddTxForm({ ...addTxForm, amount: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>

                                {/* Status Transaksi */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status Transaksi</label>
                                    <select
                                        value={addTxForm.status}
                                        onChange={(e) => setAddTxForm({ ...addTxForm, status: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white font-semibold"
                                    >
                                        <option value="Selesai">Selesai</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Tombol Simpan */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddTxModalOpen(false)}
                                        className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all"
                                    >
                                        Simpan Transaksi
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

                {/* 2. Modal Detail Riwayat Transaksi */}
                {selectedTx && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform scale-100 transition-all text-sm">
                            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white px-6 py-5 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Jurnal Transaksi Detail</p>
                                    <h3 className="text-base font-bold flex items-center gap-2 mt-0.5">
                                        <span>ID: {selectedTx.id}</span>
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setSelectedTx(null)}
                                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tipe Pembukuan</span>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${selectedTx.type === "Pendapatan"
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100/50"
                                            : "bg-rose-50 text-rose-700 border border-rose-100/50"
                                            }`}>
                                            {selectedTx.type}
                                        </span>
                                    </div>

                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tanggal Buku</span>
                                        <span className="font-semibold text-slate-800">{formatDate(selectedTx.date)}</span>
                                    </div>

                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status Jurnal</span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${selectedTx.status === "Selesai"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : selectedTx.status === "Pending"
                                                ? "bg-amber-50 text-amber-700"
                                                : "bg-slate-100 text-slate-500"
                                            }`}>
                                            {selectedTx.status}
                                        </span>
                                    </div>

                                    <div className="py-2 space-y-1.5">
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Keterangan Jurnal</span>
                                        <p className="font-bold text-slate-900 bg-slate-50 border border-slate-100 rounded-xl p-3 leading-relaxed text-xs">
                                            {selectedTx.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-2xl p-5 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Nominal Transaksi</span>
                                        <span className="text-xs text-slate-400 font-semibold">Pencatatan Bersih</span>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xl font-black block ${selectedTx.type === "Pendapatan" ? "text-emerald-400" : "text-rose-400"}`}>
                                            {selectedTx.type === "Pendapatan" ? "+" : "-"}{formatIDR(selectedTx.amount)}
                                        </span>
                                        <span className="text-[9px] text-emerald-400 font-bold tracking-wider">Metode: Rekonsiliasi Otomatis</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Modal Informasi Deskripsi Metrik */}
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