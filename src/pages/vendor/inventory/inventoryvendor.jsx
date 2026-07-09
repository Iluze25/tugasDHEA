import React, { useState, useMemo } from 'react';
import {
    Boxes,
    Package,
    PackageCheck,
    PackagePlus,
    Warehouse,
    Leaf,
    Search,
    Filter,
    RefreshCw,
    Download,
    Eye,
    History,
    TriangleAlert,
    CheckCircle2,
    Calendar,
    Clock3,
    X,
    User,
    Tags,
    MapPin,
    ArrowUpRight,
    ArrowDownLeft,
    Plus,
    AlertTriangle
} from 'lucide-react';
import Navbar1 from "../../../components/vendor/navbar.jsx"

// === DUMMY DATA AWAL INVENTARIS AGROBISNIS ===
const INITIAL_INVENTORY = [
    {
        id: "INV-001",
        name: "Cabai Merah Keriting",
        category: "Sayuran",
        stock: 250,
        unit: "Kg",
        minStock: 50,
        status: "Stok Aman",
        storage: "Gudang A - Chiller 1",
        entryDate: "2026-06-15",
        updatedAt: "2026-07-09",
        description: "Cabai merah keriting organik segar langsung dipetik dari perkebunan dataran tinggi Ciwidey. Memiliki tingkat kepedasan yang konstan, warna merah merona yang cerah, serta daya simpan yang lebih lama sehingga sangat diminati oleh industri kuliner maupun rumah tangga",
        image: "https://i.pinimg.com/736x/48/11/4f/48114f3a4ec6814f9aad02e1c12f0aa2.jpg"
    },
    {
        id: "INV-002",
        name: "Tomat Merah Beef",
        category: "Sayuran",
        stock: 145,
        unit: "Kg",
        minStock: 40,
        status: "Stok Aman",
        storage: "Gudang A - Chiller 2",
        entryDate: "2026-06-18",
        updatedAt: "2026-07-09",
        description: "Tomat varietas beef berukuran besar, padat, berair sedang, dan memiliki rasa manis-asam segar. Sangat cocok digunakan sebagai bahan pelengkap hamburger, salad premium, maupun bahan dasar pembuatan saus tomat rumahan berkualitas tinggi.",
        image: "https://i.pinimg.com/736x/aa/7b/d0/aa7bd0f49ecb98f21fd0cd596b177a4b.jpg"
    },
    {
        id: "INV-003",
        name: "Kentang Granola Super",
        category: "Sayuran",
        stock: 35,
        unit: "Kg",
        minStock: 100,
        status: "Stok Menipis",
        storage: "Gudang B - Suhu Ruang",
        entryDate: "2026-06-20",
        updatedAt: "2026-07-08",
        description: "Kentang varietas granola kualitas prima dengan kulit mulus, minim mata kentang, dan telah dibersihkan secara optimal dari sisa-sisa tanah perkebunan. Memiliki tekstur lembut dan padat saat dimasak, ideal untuk kentang goreng atau olahan sup.",
        image: "https://i.pinimg.com/1200x/41/3e/9a/413e9af5340812bb320b86ae64a5cae2.jpg"
    },
    {
        id: "INV-004",
        name: "Bawang Merah Brebes",
        category: "Sayuran",
        stock: 15,
        unit: "Kg",
        minStock: 50,
        status: "Stok Menipis",
        storage: "Gudang B - Suhu Ruang",
        entryDate: "2026-06-25",
        updatedAt: "2026-07-07",
        description: "Bawang merah asli dari wilayah Brebes yang terkenal memiliki aroma sangat tajam dan pekat serta cita rasa gurih yang khas. Telah melalui proses penjemuran (curing) tradisional secara maksimal untuk memastikan kadar air rendah demi mencegah pembusukan.",
        image: "https://i.pinimg.com/1200x/d6/a8/d2/d6a8d299168e822ffd77ae5088b8538a.jpg"
    },
    {
        id: "INV-005",
        name: "Jagung Manis Madu",
        category: "Sayuran",
        stock: 0,
        unit: "Kg",
        minStock: 30,
        status: "Stok Habis",
        storage: "Gudang A - Chiller 1",
        entryDate: "2026-07-01",
        updatedAt: "2026-07-09",
        description: "Jagung manis hibrida segar pilihan dengan tingkat kemanisan alami tinggi layaknya madu. Bulir jagung tersusun sangat rapat, berwarna kuning keemasan, berisi penuh hingga ujung tongkol, dan bertekstur renyah saat digigit.",
        image: "https://i.pinimg.com/1200x/ed/07/7b/ed077b9da579e3e9d43b64522be6349b.jpg"
    },
    {
        id: "INV-006",
        name: "Selada Keriting Hidroponik",
        category: "Sayuran",
        stock: 320,
        unit: "Kg",
        minStock: 60,
        status: "Stok Aman",
        storage: "Gudang B - Suhu Ruang",
        entryDate: "2026-07-02",
        updatedAt: "2026-07-09",
        description: "Sayur selada hijau keriting segar yang ditanam dengan metode hidroponik modern di lingkungan rumah kaca terkendali. Bebas dari pestisida kimia berbahaya, memiliki daun bertekstur renyah, bersih, dan dipanen langsung beserta media akarnya agar kesegaran tetap terjaga.",
        image: "https://i.pinimg.com/736x/e0/b4/3f/e0b43fda019fa53c238430d0428834d0.jpg"
    },
    {
        id: "INV-007",
        name: "Bayam Hijau Cabut",
        category: "Sayuran",
        stock: 8,
        unit: "Kg",
        minStock: 40,
        status: "Stok Menipis",
        storage: "Gudang A - Chiller 1",
        entryDate: "2026-07-08",
        updatedAt: "2026-07-09",
        description: "Sayur bayam hijau segar yang dipanen secara harian setiap subuh menjelang fajar untuk mempertahankan nutrisinya. Memiliki helai daun lebar, batang muda yang empuk, bersih dari tanah, serta bebas dari residu kimia.",
        image: "https://i.pinimg.com/736x/e5/17/2c/e5172c5b2e75cee20ec476b582eb054b.jpg"
    },
    {
        id: "INV-008",
        name: "Timun Jepang Kyuri",
        category: "Perkebunan",
        stock: 1200,
        unit: "Kg",
        minStock: 200,
        status: "Stok Aman",
        storage: "Gudang C - Rak Kering",
        entryDate: "2026-05-10",
        updatedAt: "2026-07-06",
        description: "Timun Jepang (Kyuri) pilihan berukuran panjang seragam dengan kulit hijau gelap bertekstur khas. Daging buah sangat padat, renyah, berkadar air tinggi namun minim biji, menjadikannya pilihan sempurna untuk hidangan salad, sushi roll, maupun acar segar.",
        image: "https://i.pinimg.com/736x/9a/66/5f/9a665f94b542aa94cd2c2b3237d802ac.jpg"
    },
    {
        id: "INV-009",
        name: "Melon Cantaloupe Sweet",
        category: "Sayuran",
        stock: 0,
        unit: "Kg",
        minStock: 45,
        status: "Stok Habis",
        storage: "Gudang A - Chiller 2",
        entryDate: "2026-06-12",
        updatedAt: "2026-07-05",
        description: "Melon berkualitas premium dengan daging buah berwarna oranye merona yang tebal dan beraroma harum semerbak. Tingkat kemanisan buah terjamin tinggi (menggunakan alat ukur brix 12+), sangat cocok dinikmati langsung atau diolah menjadi hidangan penutup.",
        image: "https://i.pinimg.com/1200x/e3/e2/2a/e3e22a15cb5272f5487dca7db8d5c8ff.jpg"
    }
];

// === DUMMY RIWAYAT AWAL ===
const INITIAL_HISTORY = [
    {
        id: "LOG-01",
        date: "2026-07-09",
        product: "Cabai Merah Keriting",
        activity: "Tambah Stok",
        amount: "+50 Kg",
        staff: "Dhea Salsa Winanda"
    },
    {
        id: "LOG-02",
        date: "2026-07-09",
        product: "Selada Keriting Hidroponik",
        activity: "Stok Habis",
        amount: "0 Kg",
        staff: "Siti Rahma"
    },
    {
        id: "LOG-03",
        date: "2026-07-08",
        product: "Kentang Granola Super",
        activity: "Kurangi Stok",
        amount: "-15 Kg",
        staff: "Ahmad Sobari"
    },
    {
        id: "LOG-04",
        date: "2026-07-08",
        product: "Bawang Merah Brebes",
        activity: "Restok",
        amount: "+45 Kg",
        staff: "Eko Prasetyo"
    },
    {
        id: "LOG-05",
        date: "2026-07-07",
        product: "Jagung Manis Madu",
        activity: "Penyesuaian",
        amount: "-5 Kg",
        staff: "Siti Rahma"
    }
];

export default function InventoryManagement() {
    // === STATES ===
    const [inventory, setInventory] = useState(INITIAL_INVENTORY);
    const [history, setHistory] = useState(INITIAL_HISTORY);

    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [selectedStockFilter, setSelectedStockFilter] = useState("Semua");

    // Modals state
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatingProduct, setUpdatingProduct] = useState(null);

    // State untuk form update stock
    const [updateAction, setUpdateAction] = useState("tambah"); // "tambah" atau "kurang"
    const [updateQty, setUpdateQty] = useState("");
    const [updateNote, setUpdateNote] = useState("");

    // Toast State
    const [toastMessage, setToastMessage] = useState(null);

    // === SIMULASI REFRESH DATA (LOADING STATE) ===
    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast("Data inventaris agribisnis berhasil diperbarui.");
        }, 1200);
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 4000);
    };

    // === EXPORT SIMULATION ===
    const handleExport = () => {
        showToast("Mengunduh laporan komoditas inventaris dalam format .CSV...");
    };

    // === ACTION: PERBARUI STOK ===
    const submitStockUpdate = (e) => {
        e.preventDefault();
        if (!updatingProduct || !updateQty || parseFloat(updateQty) <= 0) return;

        const inputQty = parseFloat(updateQty);
        let finalStock = updatingProduct.stock;

        if (updateAction === "tambah") {
            finalStock += inputQty;
        } else {
            finalStock = Math.max(0, finalStock - inputQty);
        }

        // Tentukan status baru berdasarkan kalkulasi stok
        let newStatus = "Stok Aman";
        if (finalStock === 0) {
            newStatus = "Stok Habis";
        } else if (finalStock <= updatingProduct.minStock) {
            newStatus = "Stok Menipis";
        }

        // Update state inventaris utama
        setInventory((prev) =>
            prev.map((item) => {
                if (item.id === updatingProduct.id) {
                    return {
                        ...item,
                        stock: finalStock,
                        status: newStatus,
                        updatedAt: "2026-07-09" // Hari ini
                    };
                }
                return item;
            })
        );

        // Tambahkan log ke riwayat secara real-time
        const newLog = {
            id: `LOG-${Date.now().toString().slice(-2)}`,
            date: "2026-07-09",
            product: updatingProduct.name,
            activity: updateAction === "tambah" ? "Tambah Stok" : "Kurangi Stok",
            amount: `${updateAction === "tambah" ? "+" : "-"}${inputQty} ${updatingProduct.unit}`,
            staff: "Dhea Salsa Winanda"
        };
        setHistory((prev) => [newLog, ...prev]);

        showToast(`Stok ${updatingProduct.name} diperbarui menjadi ${finalStock} ${updatingProduct.unit}.`);

        // Reset form dan tutup modal
        setUpdatingProduct(null);
        setUpdateQty("");
        setUpdateNote("");
    };

    // === INTERACTIVE FILTERING LOGIC ===
    const filteredInventory = useMemo(() => {
        return inventory.filter((item) => {
            // 1. Pencarian nama produk / ID
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toLowerCase().includes(searchQuery.toLowerCase());

            // 2. Filter Kategori
            const matchesCategory =
                selectedCategory === "Semua" || item.category === selectedCategory;

            // 3. Filter Status Stok
            const matchesStockStatus =
                selectedStockFilter === "Semua" || item.status === selectedStockFilter;

            return matchesSearch && matchesCategory && matchesStockStatus;
        });
    }, [inventory, searchQuery, selectedCategory, selectedStockFilter]);

    // === DYNAMIC STATS (Kalkulasi Berdasarkan State Real-Time) ===
    const stats = useMemo(() => {
        const totalStokKg = inventory
            .filter((item) => item.unit === "Kg")
            .reduce((sum, item) => sum + item.stock, 0);

        const lowStockCount = inventory.filter((item) => item.status === "Stok Menipis").length;
        const outOfStockCount = inventory.filter((item) => item.status === "Stok Habis").length;

        // Aktivitas hari ini ("2026-07-09")
        const updatesToday = history.filter((log) => log.date === "2026-07-09").length;

        return {
            totalStok: `${totalStokKg.toLocaleString("id-ID")} Kg`,
            lowStock: `${lowStockCount} Produk`,
            outOfStock: `${outOfStockCount} Produk`,
            todayActivities: `${updatesToday} Aktivitas`
        };
    }, [inventory, history]);

    // === GET LOW STOCK LIST FOR NOTIFICATION PANEL ===
    const lowStockItemsForPanel = useMemo(() => {
        return inventory.filter((item) => item.status === "Stok Menipis");
    }, [inventory]);

    return (
        <>
            <Navbar1 />
            <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-slate-100 p-4 md:p-8 text-slate-800 font-sans selection:bg-emerald-200">

                {/* CSS Injeksi untuk Animasi Halus & Mengambang */}
                <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.15; }
        }
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float-medium { animation: float 6s ease-in-out infinite; }
        .animate-float-fast { animation: float 4s ease-in-out infinite; }
        .animate-subtle-pulse { animation: subtle-pulse 4s ease-in-out infinite; }
      `}</style>

                {/* Dekorasi Latar Belakang (Subtle Blurred Green Circles) */}
                <div className="absolute top-12 left-12 w-80 h-80 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none animate-subtle-pulse" />
                <div className="absolute bottom-20 right-12 w-96 h-96 bg-green-200/20 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none animate-subtle-pulse" style={{ animationDelay: '2s' }} />

                {/* Konten Utama */}
                <div className="relative max-w-7xl mx-auto space-y-8">

                    {/* --- GLOBAL TOAST SYSTEM --- */}
                    {toastMessage && (
                        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur-sm text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-500/20 animate-in fade-in slide-in-from-top-4">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                            <span className="text-sm font-medium">{toastMessage}</span>
                        </div>
                    )}

                    {/* --- HERO SECTION --- */}
                    {loading ? (
                        <div className="h-56 bg-slate-200/60 rounded-3xl animate-pulse" />
                    ) : (
                        <div className="relative bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 text-white">
                            {/* Grid pola halus */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                                {/* Sisi Kiri: Teks */}
                                <div className="space-y-3 text-center md:text-left max-w-xl">
                                    <div className="inline-flex items-center gap-1.5 bg-emerald-600/40 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-200 uppercase tracking-widest">
                                        <Leaf className="w-3.5 h-3.5 animate-pulse" />
                                        Agri-Inventory Engine
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                                        Kelola Inventaris
                                    </h1>
                                    <p className="text-green-100 text-sm md:text-base leading-relaxed">
                                        Pantau ketersediaan stok, riwayat inventaris, dan pembaruan stok produk secara efisien. Pastikan laporan buku kas akuntansi Anda tetap sinkron dengan aset nyata.
                                    </p>
                                </div>

                                {/* Sisi Kanan: Area Ilustrasi Floating */}
                                <div className="relative w-full max-w-[280px] h-32 md:h-40 flex items-center justify-center">
                                    {/* Ping rings */}
                                    <div className="absolute w-32 h-32 bg-emerald-600/20 border border-emerald-500/20 rounded-full animate-ping pointer-events-none" />

                                    {/* Boxes Icon */}
                                    <div className="absolute transform -translate-x-12 -translate-y-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-float-slow shadow-lg">
                                        <Boxes className="h-8 w-8 text-emerald-200" />
                                    </div>

                                    {/* Package Icon */}
                                    <div className="absolute transform translate-x-12 -translate-y-8 bg-emerald-500/30 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-400/20 animate-float-medium shadow-lg">
                                        <Package className="h-7 w-7 text-white" />
                                    </div>

                                    {/* Warehouse Icon */}
                                    <div className="absolute transform -translate-x-2 translate-y-10 bg-green-500/40 backdrop-blur-md p-3 rounded-2xl border border-green-300/20 animate-float-fast shadow-lg">
                                        <Warehouse className="h-6 w-6 text-emerald-100" />
                                    </div>

                                    {/* PackageCheck Icon */}
                                    <div className="absolute transform translate-x-10 translate-y-8 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10 animate-float-slow shadow-lg">
                                        <PackageCheck className="h-5 w-5 text-emerald-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- SUMMARY CARDS --- */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Total Stok (Sektor Kg)", val: stats.totalStok, sub: "Total stok seluruh produk", icon: Boxes, color: "text-emerald-600 border-emerald-200 bg-emerald-50/50" },
                            { label: "Stok Menipis", val: stats.lowStock, sub: "Segera lakukan restok", icon: AlertTriangle, color: "text-amber-600 border-amber-200 bg-amber-50/50" },
                            { label: "Produk Habis", val: stats.outOfStock, sub: "Tidak tersedia saat ini", icon: TriangleAlert, color: "text-red-600 border-red-200 bg-red-50/50" },
                            { label: "Pembaruan Hari Ini", val: stats.todayActivities, sub: "Perubahan stok hari ini", icon: Clock3, color: "text-blue-600 border-blue-200 bg-blue-50/50" }
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
                                            {card.label}
                                        </span>
                                        <div className="p-1.5 rounded-lg bg-white shadow-sm">
                                            <IconComponent className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div className="space-y-0.5">
                                        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                                            {card.val}
                                        </h3>
                                        <p className="text-[11px] text-slate-400 font-medium">
                                            {card.sub}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- TWO COLUMN MAIN PANEL --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Main List Section (2 Cols Wide) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Toolbar */}
                            {loading ? (
                                <div className="h-16 bg-white rounded-2xl border border-slate-200 animate-pulse" />
                            ) : (
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center justify-between">

                                    {/* Search Bar */}
                                    <div className="relative w-full md:max-w-xs">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Search className="h-4 w-4 text-slate-400" />
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Cari produk..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                                        />
                                    </div>

                                    {/* Filters Group */}
                                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">

                                        {/* Category Filter */}
                                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                                            <Filter className="h-3.5 w-3.5 text-slate-400" />
                                            <span className="hidden sm:inline">Kategori:</span>
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="bg-transparent focus:outline-none cursor-pointer text-slate-800"
                                            >
                                                <option value="Semua">Semua Kategori</option>
                                                <option value="Sayuran">Sayuran</option>
                                                <option value="Buah">Buah</option>
                                                <option value="Perkebunan">Perkebunan</option>
                                            </select>
                                        </div>

                                        {/* Stock Filter */}
                                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                                            <Boxes className="h-3.5 w-3.5 text-slate-400" />
                                            <span className="hidden sm:inline">Stok:</span>
                                            <select
                                                value={selectedStockFilter}
                                                onChange={(e) => setSelectedStockFilter(e.target.value)}
                                                className="bg-transparent focus:outline-none cursor-pointer text-slate-800"
                                            >
                                                <option value="Semua">Semua Stok</option>
                                                <option value="Stok Aman">Stok Aman</option>
                                                <option value="Stok Menipis">Stok Menipis</option>
                                                <option value="Stok Habis">Stok Habis</option>
                                            </select>
                                        </div>

                                        {/* Refresh Button */}
                                        <button
                                            onClick={handleRefresh}
                                            title="Segarkan Data"
                                            className="p-2 bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/40 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                        </button>

                                        {/* Export Button */}
                                        <button
                                            onClick={handleExport}
                                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                            Ekspor
                                        </button>

                                    </div>
                                </div>
                            )}

                            {/* Inventory Table */}
                            {loading ? (
                                <div className="bg-white rounded-3xl p-6 border border-slate-200/40 space-y-4">
                                    <div className="h-8 bg-slate-200/60 rounded-lg w-1/4 animate-pulse" />
                                    <div className="h-64 bg-slate-200/40 rounded-xl animate-pulse" />
                                </div>
                            ) : filteredInventory.length === 0 ? (
                                /* Empty State */
                                <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 py-16 px-4 text-center shadow-sm space-y-6">
                                    <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 animate-pulse">
                                        <Boxes className="h-10 w-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-slate-800">Belum ada data inventaris</h3>
                                        <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                            Kombinasi penyaringan Anda tidak menemukan kecocokan komoditas apa pun di platform kami.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("Semua");
                                            setSelectedStockFilter("Semua");
                                            handleRefresh();
                                        }}
                                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
                                    >
                                        Tambah Produk
                                    </button>
                                </div>
                            ) : (
                                /* Table Layout */
                                <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse text-left">
                                            <thead>
                                                <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                                                    <th className="py-4 px-5">Produk</th>
                                                    <th className="py-4 px-5">Kategori</th>
                                                    <th className="py-4 px-5 text-right">Stok Saat Ini</th>
                                                    <th className="py-4 px-5">Satuan</th>
                                                    <th className="py-4 px-5">Status</th>
                                                    <th className="py-4 px-5">Terakhir Diperbarui</th>
                                                    <th className="py-4 px-5 text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium text-slate-700">
                                                {filteredInventory.map((item) => {
                                                    let statusColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
                                                    if (item.status === "Stok Menipis") {
                                                        statusColor = "bg-amber-50 text-amber-700 border-amber-200";
                                                    } else if (item.status === "Stok Habis") {
                                                        statusColor = "bg-red-50 text-red-700 border-red-200";
                                                    }

                                                    return (
                                                        <tr key={item.id} className="hover:bg-slate-50/40 transition-colors group">
                                                            {/* Produk */}
                                                            <td className="py-4 px-5">
                                                                <div className="flex items-center gap-3">
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-10 h-10 rounded-xl object-cover border border-slate-200/60"
                                                                    />
                                                                    <div>
                                                                        <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                                            {item.name}
                                                                        </p>
                                                                        <span className="font-mono text-[10px] text-slate-400 font-semibold">{item.id}</span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Kategori */}
                                                            <td className="py-4 px-5">
                                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-semibold text-[11px]">
                                                                    <Tags className="w-3 h-3" />
                                                                    {item.category}
                                                                </span>
                                                            </td>

                                                            {/* Stok Saat Ini */}
                                                            <td className="py-4 px-5 text-right font-extrabold text-slate-900 text-base">
                                                                {item.stock.toLocaleString("id-ID")}
                                                            </td>

                                                            {/* Satuan */}
                                                            <td className="py-4 px-5 font-semibold text-slate-400">
                                                                {item.unit}
                                                            </td>

                                                            {/* Status */}
                                                            <td className="py-4 px-5">
                                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${statusColor}`}>
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                                    {item.status}
                                                                </span>
                                                            </td>

                                                            {/* Terakhir Diperbarui */}
                                                            <td className="py-4 px-5 text-slate-400 font-semibold text-xs">
                                                                {new Date(item.updatedAt).toLocaleDateString("id-ID", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                            </td>

                                                            {/* Aksi */}
                                                            <td className="py-4 px-5 text-center">
                                                                <div className="flex items-center justify-center gap-1.5">
                                                                    <button
                                                                        onClick={() => setSelectedProduct(item)}
                                                                        title="Detail Produk"
                                                                        className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 rounded-lg border border-slate-100 hover:border-emerald-200 transition-all shadow-sm"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setUpdatingProduct(item);
                                                                            setUpdateAction("tambah");
                                                                            setUpdateQty("");
                                                                            setUpdateNote("");
                                                                        }}
                                                                        title="Perbarui Stok"
                                                                        className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg border border-slate-100 hover:border-blue-200 transition-all shadow-sm"
                                                                    >
                                                                        <PackagePlus className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Footer Statistik Tabel */}
                                    <div className="bg-slate-50/50 border-t border-slate-100 px-5 py-3.5 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <span>Jumlah: {filteredInventory.length} Komoditas</span>
                                        <span>Data Real-time Sync</span>
                                    </div>
                                </div>
                            )}

                            {/* Inventory History Section */}
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                        <History className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-800">Riwayat Inventaris</h3>
                                        <p className="text-xs text-slate-400">Jejak audit operasional keluar masuk barang agribisnis</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                                                <th className="py-2.5 px-3">Tanggal</th>
                                                <th className="py-2.5 px-3">Produk</th>
                                                <th className="py-2.5 px-3">Aktivitas</th>
                                                <th className="py-2.5 px-3 text-right">Jumlah</th>
                                                <th className="py-2.5 px-3">Petugas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
                                            {history.map((log) => {
                                                let activityBadge = "bg-slate-100 text-slate-500";
                                                if (log.activity === "Tambah Stok" || log.activity === "Restok") {
                                                    activityBadge = "bg-emerald-50 text-emerald-600";
                                                } else if (log.activity === "Kurangi Stok") {
                                                    activityBadge = "bg-amber-50 text-amber-600";
                                                } else if (log.activity === "Stok Habis") {
                                                    activityBadge = "bg-red-50 text-red-600 animate-pulse";
                                                } else if (log.activity === "Penyesuaian") {
                                                    activityBadge = "bg-blue-50 text-blue-600";
                                                }

                                                return (
                                                    <tr key={log.id} className="hover:bg-slate-50/20">
                                                        <td className="py-2.5 px-3 text-slate-400">{log.date}</td>
                                                        <td className="py-2.5 px-3 text-slate-900 font-bold">{log.product}</td>
                                                        <td className="py-2.5 px-3">
                                                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${activityBadge}`}>
                                                                {log.activity}
                                                            </span>
                                                        </td>
                                                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">{log.amount}</td>
                                                        <td className="py-2.5 px-3 text-slate-500 flex items-center gap-1.5">
                                                            <User className="h-3 w-3 text-slate-300" />
                                                            {log.staff}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Low Stock Notification Panel */}
                        <div className="space-y-6">

                            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                                <div className="flex items-center gap-2 text-amber-700">
                                    <div className="p-2 bg-amber-50 rounded-xl">
                                        <TriangleAlert className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-800">Peringatan Stok Menipis</h3>
                                        <p className="text-xs text-amber-600/80 font-medium">Batas ambang minimum hampir habis</p>
                                    </div>
                                </div>

                                {lowStockItemsForPanel.length === 0 ? (
                                    <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-center">
                                        <p className="text-xs font-semibold text-emerald-800 leading-relaxed">
                                            🎉 Luar biasa! Seluruh komoditas agribisnis Anda berada dalam ambang batas aman ketersediaan.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {lowStockItemsForPanel.map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-3 bg-amber-50/40 border border-amber-200/60 rounded-2xl flex items-center justify-between gap-3 group transition-all hover:bg-amber-50"
                                            >
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                                                    <p className="text-xs text-slate-400 font-semibold">
                                                        Sisa: <span className="text-amber-700 font-extrabold">{item.stock} {item.unit}</span>{" "}
                                                        <span className="text-[10px] font-normal text-slate-300">/ min {item.minStock} {item.unit}</span>
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setUpdatingProduct(item);
                                                        setUpdateAction("tambah");
                                                        setUpdateQty("");
                                                        setUpdateNote("");
                                                    }}
                                                    className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold shadow-sm transition-colors shrink-0"
                                                >
                                                    Restok
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quick Tips Box (Agrobusiness Stock Guide) */}
                            <div className="bg-gradient-to-br from-emerald-800 to-green-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
                                <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                                    <Warehouse className="w-32 h-32" />
                                </div>
                                <h4 className="font-extrabold text-sm mb-2 flex items-center gap-1.5">
                                    <Leaf className="h-4 w-4 text-emerald-300" />
                                    Suhu Ruangan Penyimpanan
                                </h4>
                                <p className="text-[11px] text-emerald-100 leading-relaxed font-semibold">
                                    Pastikan sayuran berdaun seperti Selada & Bayam diletakkan di Chiller-1 (5°C) guna mencegah pembusukan dini sebelum dipindah ke logistik pengantaran.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* --- PRODUCT DETAIL MODAL --- */}
                {selectedProduct && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                                <div>
                                    <span className="font-mono text-xs text-slate-400 font-bold uppercase">{selectedProduct.id}</span>
                                    <h3 className="text-base font-extrabold text-slate-800">Detail Komoditas Agribisnis</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-5">
                                {/* Image & Title Header */}
                                <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-200">
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200/50 shadow-sm">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{selectedProduct.category}</p>
                                        <p className="text-sm font-black text-slate-800">{selectedProduct.name}</p>
                                    </div>
                                </div>

                                {/* Status & Quick Stats */}
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Stok Tersedia</p>
                                        <p className="text-base font-black text-slate-800 mt-1">{selectedProduct.stock} {selectedProduct.unit}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Batas Minimum</p>
                                        <p className="text-base font-black text-slate-800 mt-1">{selectedProduct.minStock} {selectedProduct.unit}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Status Saat Ini</p>
                                        <p className="text-xs font-bold text-emerald-800 mt-2 truncate">
                                            {selectedProduct.status}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <h4 className="text-xs font-bold uppercase text-slate-400">Deskripsi Produk</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                        {selectedProduct.description}
                                    </p>
                                </div>

                                {/* Meta Details */}
                                <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Lokasi Penyimpanan</span>
                                        <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                            {selectedProduct.storage}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Tanggal Masuk Gudang</span>
                                        <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                            {selectedProduct.entryDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-slate-400 uppercase text-[10px]">Audit Terakhir</span>
                                        <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                                            <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                                            {selectedProduct.updatedAt}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-5 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors"
                                >
                                    Tutup Detail
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- UPDATE STOCK MODAL --- */}
                {updatingProduct && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                                <div>
                                    <span className="font-mono text-xs text-slate-400 font-bold uppercase">{updatingProduct.id}</span>
                                    <h3 className="text-base font-extrabold text-slate-800">Modifikasi Unit Stok</h3>
                                </div>
                                <button
                                    onClick={() => setUpdatingProduct(null)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Body Form */}
                            <form onSubmit={submitStockUpdate}>
                                <div className="p-6 space-y-4">

                                    {/* Product Meta */}
                                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                                        <img
                                            src={updatingProduct.image}
                                            alt={updatingProduct.name}
                                            className="w-12 h-12 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h4 className="text-sm font-extrabold text-slate-900">{updatingProduct.name}</h4>
                                            <p className="text-xs text-slate-500">
                                                Stok saat ini: <span className="font-bold text-slate-700">{updatingProduct.stock} {updatingProduct.unit}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tambah / Kurang Select Tabs */}
                                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setUpdateAction("tambah")}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${updateAction === "tambah"
                                                ? "bg-white text-emerald-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-800"
                                                }`}
                                        >
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                            Tambah Stok
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUpdateAction("kurang")}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${updateAction === "kurang"
                                                ? "bg-white text-amber-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-800"
                                                }`}
                                        >
                                            <ArrowDownLeft className="h-3.5 w-3.5" />
                                            Kurangi Stok
                                        </button>
                                    </div>

                                    {/* Input Qty */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="updateQty" className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
                                            Jumlah Perubahan ({updatingProduct.unit})
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="updateQty"
                                                type="number"
                                                step="any"
                                                required
                                                placeholder="Masukkan nilai perubahan..."
                                                value={updateQty}
                                                onChange={(e) => setUpdateQty(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Catatan / Alasan */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="updateNote" className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
                                            Catatan Perubahan (Opsional)
                                        </label>
                                        <textarea
                                            id="updateNote"
                                            rows="2"
                                            placeholder="Contoh: Audit penyesuaian kualitas panen susut..."
                                            value={updateNote}
                                            onChange={(e) => setUpdateNote(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>

                                </div>

                                {/* Footer */}
                                <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setUpdatingProduct(null)}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Simpan Perubahan
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