import React, { useState, useEffect } from 'react';
import {
    Package,
    Boxes,
    Leaf,
    Search,
    Filter,
    Plus,
    Eye,
    Pencil,
    Trash2,
    CircleCheck,
    TriangleAlert,
    CircleOff,
    Image as ImageIcon,
    Upload,
    X,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Info,
    Calendar,
    Layers,
    Sparkles
} from 'lucide-react';
import Navbar1 from "../../../components/vendor/navbar.jsx"

// ==========================================
// DATA UTAMA (FOTO BEBAS HAK CIPTA / COPYRIGHT-FREE)
// ==========================================
const INITIAL_PRODUCTS = [
    {
        id: 1,
        nama: "Cabai Merah Keriting",
        kategori: "Rempah",
        harga: 35000,
        stok: 250,
        satuan: "Kg",
        status: "Aktif",
        terakhirDiperbarui: "10 Jul 2026",
        tanggalDibuat: "01 Jan 2026",
        deskripsi: "Cabai merah keriting organik segar langsung dipetik dari perkebunan dataran tinggi Ciwidey. Memiliki tingkat kepedasan yang konstan, warna merah merona yang cerah, serta daya simpan yang lebih lama sehingga sangat diminati oleh industri kuliner maupun rumah tangga.",
        fotoUrl: "https://i.pinimg.com/736x/48/11/4f/48114f3a4ec6814f9aad02e1c12f0aa2.jpg"
    },
    {
        id: 2,
        nama: "Tomat Merah Beef",
        kategori: "Sayuran",
        harga: 18000,
        stok: 145,
        satuan: "Kg",
        status: "Stok Menipis",
        terakhirDiperbarui: "09 Jul 2026",
        tanggalDibuat: "05 Jan 2026",
        deskripsi: "Tomat varietas beef berukuran besar, padat, berair sedang, dan memiliki rasa manis-asam segar. Sangat cocok digunakan sebagai bahan pelengkap hamburger, salad premium, maupun bahan dasar pembuatan saus tomat rumahan berkualitas tinggi.",
        fotoUrl: "https://i.pinimg.com/736x/aa/7b/d0/aa7bd0f49ecb98f21fd0cd596b177a4b.jpg"
    },
    {
        id: 3,
        nama: "Kentang Granola Super",
        kategori: "Umbi",
        harga: 15000,
        stok: 35,
        satuan: "Kg",
        status: "Aktif",
        terakhirDiperbarui: "08 Jul 2026",
        tanggalDibuat: "10 Jan 2026",
        deskripsi: "Kentang varietas granola kualitas prima dengan kulit mulus, minim mata kentang, dan telah dibersihkan secara optimal dari sisa-sisa tanah perkebunan. Memiliki tekstur lembut dan padat saat dimasak, ideal untuk kentang goreng atau olahan sup.",
        fotoUrl: "https://i.pinimg.com/1200x/41/3e/9a/413e9af5340812bb320b86ae64a5cae2.jpg"
    },
    {
        id: 4,
        nama: "Bawang Merah Brebes",
        kategori: "Rempah",
        harga: 28000,
        stok: 1200,
        satuan: "Kg",
        status: "Stok Habis",
        terakhirDiperbarui: "07 Jul 2026",
        tanggalDibuat: "12 Jan 2026",
        deskripsi: "Bawang merah asli dari wilayah Brebes yang terkenal memiliki aroma sangat tajam dan pekat serta cita rasa gurih yang khas. Telah melalui proses penjemuran (curing) tradisional secara maksimal untuk memastikan kadar air rendah demi mencegah pembusukan.",
        fotoUrl: "https://i.pinimg.com/1200x/d6/a8/d2/d6a8d299168e822ffd77ae5088b8538a.jpg"
    },
    {
        id: 5,
        nama: "Jagung Manis Madu",
        kategori: "Padi",
        harga: 8000,
        stok: 15,
        satuan: "Kg",
        status: "Aktif",
        terakhirDiperbarui: "06 Jul 2026",
        tanggalDibuat: "15 Jan 2026",
        deskripsi: "Jagung manis hibrida segar pilihan dengan tingkat kemanisan alami tinggi layaknya madu. Bulir jagung tersusun sangat rapat, berwarna kuning keemasan, berisi penuh hingga ujung tongkol, dan bertekstur renyah saat digigit.",
        fotoUrl: "https://i.pinimg.com/1200x/ed/07/7b/ed077b9da579e3e9d43b64522be6349b.jpg"
    },
    {
        id: 6,
        nama: "Selada Keriting Hidroponik",
        kategori: "Sayuran",
        harga: 22000,
        stok: 0,
        satuan: "Kg",
        status: "Stok Menipis",
        terakhirDiperbarui: "05 Jul 2026",
        tanggalDibuat: "20 Jan 2026",
        deskripsi: "Sayur selada hijau keriting segar yang ditanam dengan metode hidroponik modern di lingkungan rumah kaca terkendali. Bebas dari pestisida kimia berbahaya, memiliki daun bertekstur renyah, bersih, dan dipanen langsung beserta media akarnya agar kesegaran tetap terjaga.",
        fotoUrl: "https://i.pinimg.com/736x/e0/b4/3f/e0b43fda019fa53c238430d0428834d0.jpg"
    },
    {
        id: 7,
        nama: "Bayam Hijau Cabut",
        kategori: "Sayuran",
        harga: 6000,
        stok: 8,
        satuan: "Ikat",
        status: "Aktif",
        terakhirDiperbarui: "04 Jul 2026",
        tanggalDibuat: "22 Jan 2026",
        deskripsi: "Sayur bayam hijau segar yang dipanen secara harian setiap subuh menjelang fajar untuk mempertahankan nutrisinya. Memiliki helai daun lebar, batang muda yang empuk, bersih dari tanah, serta bebas dari residu kimia.",
        fotoUrl: "https://i.pinimg.com/736x/e5/17/2c/e5172c5b2e75cee20ec476b582eb054b.jpg"
    },
    {
        id: 8,
        nama: "Timun Jepang Kyuri",
        kategori: "Sayuran",
        harga: 14000,
        stok: 320,
        satuan: "Kg",
        status: "Nonaktif",
        terakhirDiperbarui: "03 Jul 2026",
        tanggalDibuat: "25 Jan 2026",
        deskripsi: "Timun Jepang (Kyuri) pilihan berukuran panjang seragam dengan kulit hijau gelap bertekstur khas. Daging buah sangat padat, renyah, berkadar air tinggi namun minim biji, menjadikannya pilihan sempurna untuk hidangan salad, sushi roll, maupun acar segar.",
        fotoUrl: "https://i.pinimg.com/736x/9a/66/5f/9a665f94b542aa94cd2c2b3237d802ac.jpg"
    },
    {
        id: 9,
        nama: "Melon Cantaloupe Sweet",
        kategori: "Buah",
        harga: 25000,
        stok: 45,
        satuan: "Pcs",
        status: "Aktif",
        terakhirDiperbarui: "02 Jul 2026",
        tanggalDibuat: "30 Jan 2026",
        deskripsi: "Melon berkualitas premium dengan daging buah berwarna oranye merona yang tebal dan beraroma harum semerbak. Tingkat kemanisan buah terjamin tinggi (menggunakan alat ukur brix 12+), sangat cocok dinikmati langsung atau diolah menjadi hidangan penutup.",
        fotoUrl: "https://i.pinimg.com/1200x/e3/e2/2a/e3e22a15cb5272f5487dca7db8d5c8ff.jpg"
    }
];

const ITEMS_PER_PAGE = 5;

// URL Foto Cadangan Default Pertanian jika terjadi kegagalan pemuatan gambar
const FALLBACK_FARM_IMAGE = "https://images.unsplash.com/photo-1464226184884-fa280b87c3a9?auto=format&fit=crop&q=80&w=400";

export default function ProductManagementPage() {
    // State Utama
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Semua");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // State Modal CRUD
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [formMode, setFormMode] = useState("add"); // "add" | "edit"
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State untuk Popup Detail [1]
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // State Form fields
    const [formData, setFormData] = useState({
        nama: "",
        kategori: "Sayuran",
        harga: "",
        stok: "",
        satuan: "Kg",
        status: "Aktif",
        deskripsi: "",
        fotoUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400"
    });

    // Simulasi Pemuatan Awal (Loading State) [1]
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Filter & Search Logic [1]
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.nama.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "Semua" || product.kategori === categoryFilter;

        let matchesStatus = true;
        if (statusFilter !== "Semua") {
            matchesStatus = product.status === statusFilter;
        }
        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Kalkulasi Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Hitung Statistik Dinamis (Berdasarkan state produk aktual) [1]
    const totalProductsCount = products.length;
    const activeProductsCount = products.filter(p => p.status === "Aktif").length;
    const lowStockCount = products.filter(p => p.status === "Stok Menipis").length;
    const inactiveCount = products.filter(p => p.status === "Nonaktif").length;

    // Reset Filter [1]
    const handleResetFilters = () => {
        setSearchTerm("");
        setCategoryFilter("Semua");
        setStatusFilter("Semua");
        setCurrentPage(1);
    };

    // Trigger Pemuatan Ulang Manual [1]
    const triggerReload = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    // Handler Form (Tambah / Edit) [1]
    const handleOpenAddModal = () => {
        setFormMode("add");
        setFormData({
            nama: "",
            kategori: "Sayuran",
            harga: "",
            stok: "",
            satuan: "Kg",
            status: "Aktif",
            deskripsi: "",
            fotoUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400"
        });
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setFormMode("edit");
        setSelectedProduct(product);
        setFormData({
            nama: product.nama,
            kategori: product.kategori,
            harga: product.harga,
            stok: product.stok,
            satuan: product.satuan,
            status: product.status,
            deskripsi: product.deskripsi,
            fotoUrl: product.fotoUrl || FALLBACK_FARM_IMAGE
        });
        setIsFormModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        // Menentukan status berdasarkan jumlah stok secara otomatis
        let computedStatus = formData.status;
        const stockVal = parseInt(formData.stok) || 0;
        if (stockVal === 0) {
            computedStatus = "Stok Habis";
        } else if (stockVal <= 15 && computedStatus !== "Nonaktif") {
            computedStatus = "Stok Menipis";
        }

        if (formMode === "add") {
            const newProduct = {
                id: Date.now(),
                nama: formData.nama,
                kategori: formData.kategori,
                harga: parseFloat(formData.harga) || 0,
                stok: stockVal,
                satuan: formData.satuan,
                status: computedStatus,
                terakhirDiperbarui: currentDate,
                tanggalDibuat: currentDate,
                deskripsi: formData.deskripsi || "Tidak ada deskripsi.",
                fotoUrl: formData.fotoUrl
            };
            setProducts([newProduct, ...products]);
        } else {
            setProducts(products.map(p => p.id === selectedProduct.id ? {
                ...p,
                nama: formData.nama,
                kategori: formData.kategori,
                harga: parseFloat(formData.harga) || 0,
                stok: stockVal,
                satuan: formData.satuan,
                status: computedStatus,
                terakhirDiperbarui: currentDate,
                deskripsi: formData.deskripsi || "Tidak ada deskripsi.",
                fotoUrl: formData.fotoUrl
            } : p));
        }
        setIsFormModalOpen(false);
    };

    // Handler Hapus Produk [1]
    const handleOpenDeleteModal = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        if (currentProducts.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Format Angka ke Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Pilih Foto Bebas Hak Cipta Secara Otomatis Berdasarkan Kategori saat form berubah
    const handleCategoryChange = (e) => {
        const cat = e.target.value;
        let url = FALLBACK_FARM_IMAGE;

        if (cat === "Sayuran") {
            url = "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400";
        } else if (cat === "Buah") {
            url = "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=400";
        } else if (cat === "Rempah") {
            url = "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400";
        } else if (cat === "Umbi") {
            url = "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400";
        } else if (cat === "Padi") {
            url = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400";
        } else if (cat === "Perikanan") {
            url = "https://images.unsplash.com/photo-1534124414484-148891f5a58d?auto=format&fit=crop&q=80&w=400";
        } else if (cat === "Peternakan") {
            url = "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400";
        }

        setFormData({ ...formData, kategori: cat, fotoUrl: url });
    };

    return (
        <>
            <Navbar1 />
            <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden pb-12">
                {/* Dekorasi Latar Belakang - Soft Green Blur */}
                <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-green-100/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

                {/* Konten Utama */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 z-10">

                    {/* ==========================================
            HEADER
            ========================================== */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-1.5">
                                <Leaf size={16} />
                                <span>Sistem Manajemen Agrobusiness</span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manajemen Produk</h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Kelola seluruh produk pertanian yang tersedia di marketplace .
                            </p>
                        </div>
                        <div className="flex items-center gap-3 self-start md:self-auto">
                            <button
                                onClick={triggerReload}
                                className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 border border-slate-200 bg-white"
                                title="Muat Ulang Data"
                            >
                                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                            </button>
                            <button
                                onClick={handleOpenAddModal}
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-200"
                            >
                                <Plus size={18} />
                                <span>Tambah Produk</span>
                            </button>
                        </div>
                    </div>

                    {/* ==========================================
            LOADING STATE: SKELETON
            ========================================== */}
                    {isLoading ? (
                        <div className="space-y-8 animate-pulse">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-28 bg-white border border-slate-100 rounded-2xl p-6" />
                                ))}
                            </div>
                            <div className="h-16 bg-white border border-slate-100 rounded-2xl" />
                            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                                <div className="h-14 bg-slate-50 border-b border-slate-100" />
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-16 border-b border-slate-100 px-6 py-4 flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                                        <div className="h-4 bg-slate-100 rounded w-1/4" />
                                        <div className="h-4 bg-slate-100 rounded w-1/6" />
                                        <div className="h-4 bg-slate-100 rounded w-12" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* ==========================================
                STATISTICS SECTION
                ========================================== */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white border border-slate-100 hover:border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group">
                                    <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform duration-300">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Produk</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">{totalProductsCount} Produk</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-100 hover:border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group">
                                    <div className="p-3.5 rounded-xl bg-green-50 text-green-600 group-hover:scale-105 transition-transform duration-300">
                                        <CircleCheck size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Produk Aktif</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">{activeProductsCount}</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-100 hover:border-amber-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group">
                                    <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform duration-300">
                                        <TriangleAlert size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok Menipis</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">{lowStockCount}</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group">
                                    <div className="p-3.5 rounded-xl bg-slate-50 text-slate-500 group-hover:scale-105 transition-transform duration-300">
                                        <CircleOff size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Produk Nonaktif</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">{inactiveCount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ==========================================
                TOOLBAR: SEARCH, FILTER, RESET
                ========================================== */}
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6 flex flex-col xl:flex-row gap-4 items-center justify-between">

                                <div className="flex flex-col md:flex-row w-full xl:w-auto gap-3 items-stretch md:items-center">
                                    {/* Search Input */}
                                    <div className="relative flex-1 md:w-72">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Cari nama produk..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                        />
                                    </div>

                                    {/* Dropdown Kategori */}
                                    <div className="relative flex-1 md:w-48">
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => {
                                                setCategoryFilter(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full pl-3 pr-8 py-2 text-sm text-slate-700 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer appearance-none"
                                        >
                                            <option value="Semua">Semua Kategori</option>
                                            <option value="Sayuran">Sayuran</option>
                                            <option value="Buah">Buah</option>
                                            <option value="Rempah">Rempah</option>
                                            <option value="Umbi">Umbi</option>
                                            <option value="Padi">Padi</option>
                                            <option value="Perikanan">Perikanan</option>
                                            <option value="Peternakan">Peternakan</option>
                                        </select>
                                        <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                    </div>

                                    {/* Dropdown Status */}
                                    <div className="relative flex-1 md:w-48">
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => {
                                                setStatusFilter(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full pl-3 pr-8 py-2 text-sm text-slate-700 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer appearance-none"
                                        >
                                            <option value="Semua">Semua Status</option>
                                            <option value="Aktif">Aktif</option>
                                            <option value="Nonaktif">Nonaktif</option>
                                            <option value="Stok Menipis">Stok Menipis</option>
                                            <option value="Stok Habis">Stok Habis</option>
                                        </select>
                                        <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                    </div>
                                </div>

                                {/* Reset Button */}
                                <button
                                    onClick={handleResetFilters}
                                    className="w-full xl:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-all duration-200 bg-white"
                                >
                                    <RefreshCw size={14} />
                                    <span>Reset Filter</span>
                                </button>
                            </div>

                            {/* ==========================================
                PRODUCT TABLE
                ========================================== */}
                            {filteredProducts.length > 0 ? (
                                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50/70 border-b border-slate-100 sticky top-0 backdrop-blur-sm z-10">
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-16 text-center">Foto</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Nama Produk</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Kategori</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Harga</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Stok</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Terakhir Diperbarui</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {currentProducts.map((product, index) => {
                                                    let statusColor = "bg-slate-50 text-slate-600 border-slate-200/60";
                                                    if (product.status === "Aktif") statusColor = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
                                                    else if (product.status === "Stok Menipis") statusColor = "bg-amber-50 text-amber-700 border-amber-200/60";
                                                    else if (product.status === "Stok Habis") statusColor = "bg-red-50 text-red-700 border-red-200/60";

                                                    return (
                                                        <tr
                                                            key={product.id}
                                                            className={`group transition-colors hover:bg-emerald-50/10 ${index % 2 === 1 ? 'bg-slate-50/20' : 'bg-white'
                                                                }`}
                                                        >
                                                            {/* Menampilkan Gambar Asli Bebas Hak Cipta */}
                                                            <td className="px-6 py-4 text-center">
                                                                <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-200 bg-slate-50">
                                                                    <img
                                                                        src={product.fotoUrl || FALLBACK_FARM_IMAGE}
                                                                        alt={product.nama}
                                                                        className="w-full h-full object-cover"
                                                                        onError={(e) => {
                                                                            e.target.src = FALLBACK_FARM_IMAGE;
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors duration-150 block">
                                                                    {product.nama}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                                                                    {product.kategori}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                                                {formatRupiah(product.harga)}
                                                                <span className="text-xs text-slate-400 font-normal"> / {product.satuan}</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                                                                {product.stok} <span className="text-xs text-slate-400 font-normal">{product.satuan}</span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor} transition-all duration-200 cursor-default shadow-sm`}>
                                                                    {product.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                                                                {product.terakhirDiperbarui}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center justify-center gap-1.5">
                                                                    {/* Tombol Lihat Detail */}
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedProduct(product);
                                                                            setIsViewModalOpen(true); // Memanggil State Popup Detail [1]
                                                                        }}
                                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                                        title="Lihat Detail"
                                                                    >
                                                                        <Eye size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleOpenEditModal(product)}
                                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                                                        title="Edit Produk"
                                                                    >
                                                                        <Pencil size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleOpenDeleteModal(product)}
                                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                                        title="Hapus Produk"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* ==========================================
                    PAGINATION FOOTER
                    ========================================== */}
                                    <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-xs text-slate-500">
                                            Menampilkan <span className="font-semibold">{indexOfFirstItem + 1}</span> hingga{" "}
                                            <span className="font-semibold">
                                                {indexOfLastItem > filteredProducts.length ? filteredProducts.length : indexOfLastItem}
                                            </span>{" "}
                                            dari <span className="font-semibold">{filteredProducts.length}</span> produk
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-emerald-600 disabled:opacity-50 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-colors"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${currentPage === i + 1
                                                        ? "bg-emerald-600 text-white"
                                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-emerald-600 disabled:opacity-50 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-colors"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* ==========================================
                                    EMPTY STATE
                                    ========================================== */
                                <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-slate-200 rounded-2xl bg-white shadow-sm">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                        <Boxes size={28} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-700">Belum ada produk yang tersedia.</h3>
                                    <p className="text-slate-400 text-sm text-center max-w-sm mt-1">
                                        Kami tidak dapat menemukan produk yang sesuai dengan filter atau kata kunci pencarian Anda [1].
                                    </p>
                                    <button
                                        onClick={handleOpenAddModal}
                                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-xl shadow-md transition-all duration-200"
                                    >
                                        <Plus size={16} />
                                        <span>Tambah Produk Baru</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                </div>

                {/* ==========================================
          MODAL: TAMBAH / EDIT PRODUK
          ========================================== */}
                {isFormModalOpen && (
                    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col transform scale-100 animate-in fade-in zoom-in-95 duration-200">

                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                                <div className="flex items-center gap-2">
                                    <Leaf className="text-emerald-600" size={20} />
                                    <h2 className="text-base font-bold text-slate-800">
                                        {formMode === "add" ? "Tambah Produk" : "Edit Produk"}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsFormModalOpen(false)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-lg border border-slate-100 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Nama Produk</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Cabai Organik"
                                        value={formData.nama}
                                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                        className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Kategori</label>
                                        <select
                                            value={formData.kategori}
                                            onChange={handleCategoryChange}
                                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 cursor-pointer"
                                        >
                                            <option value="Sayuran">Sayuran</option>
                                            <option value="Buah">Buah</option>
                                            <option value="Rempah">Rempah</option>
                                            <option value="Umbi">Umbi</option>
                                            <option value="Padi">Padi</option>
                                            <option value="Perikanan">Perikanan</option>
                                            <option value="Peternakan">Peternakan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Satuan</label>
                                        <select
                                            value={formData.satuan}
                                            onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 cursor-pointer"
                                        >
                                            <option value="Kg">Kg (Kilogram)</option>
                                            <option value="Ikat">Ikat</option>
                                            <option value="Pcs">Pcs (Keping)</option>
                                            <option value="Liter">Liter</option>
                                            <option value="Box">Box</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Harga per Satuan (Rp)</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            placeholder="Contoh: 15000"
                                            value={formData.harga}
                                            onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                                            className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Jumlah Stok</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            placeholder="Contoh: 100"
                                            value={formData.stok}
                                            onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                                            className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Status Produk</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="Aktif"
                                                checked={formData.status === "Aktif"}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="accent-emerald-600 w-4 h-4"
                                            />
                                            Aktif
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="Nonaktif"
                                                checked={formData.status === "Nonaktif"}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="accent-slate-600 w-4 h-4"
                                            />
                                            Nonaktif
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Deskripsi Produk</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Detail penjelasan mengenai kualitas, asal, serta saran konsumsi..."
                                        value={formData.deskripsi}
                                        onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                                        className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 resize-none"
                                    />
                                </div>

                                {/* Tampilan Visual Gambar Terpilih Secara Otomatis */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Foto Produk Terpilih</label>
                                    <div className="border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors duration-150 cursor-pointer group">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-inner mb-2 group-hover:scale-105 transition-all duration-200 bg-slate-50">
                                            <img
                                                src={formData.fotoUrl || FALLBACK_FARM_IMAGE}
                                                alt="Pratinjau Kategori"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = FALLBACK_FARM_IMAGE;
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-600">Foto Kategori Terintegrasi Otomatis</span>
                                        <span className="text-[10px] text-slate-400 mt-0.5">Sistem menyesuaikan gambar berdasarkan tipe komoditas Agrobusiness [1]</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setIsFormModalOpen(false)}
                                        className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-xl shadow-sm transition-all"
                                    >
                                        {formMode === "add" ? "Simpan Produk" : "Perbarui Produk"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

                {/* ==========================================
          MODAL: CONFIRM DELETE
          ========================================== */}
                {isDeleteModalOpen && selectedProduct && (
                    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-100 overflow-hidden transform scale-100 animate-in fade-in zoom-in-95 duration-150">
                            <div className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                                    <Trash2 size={24} />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">Hapus Produk?</h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Apakah Anda yakin ingin menghapus produk <span className="font-semibold text-slate-700">"{selectedProduct.nama}"</span>? Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 bg-white border border-slate-200 rounded-xl transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition-all"
                                >
                                    Hapus Produk
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==========================================
          MODAL: POPUP LIHAT DETAIL (BEBAS HAK CIPTA & LENGKAP) [1]
          ========================================== */}
                {isViewModalOpen && selectedProduct && (
                    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col transform scale-100 animate-in fade-in zoom-in-95 duration-200">

                            {/* Header Detail Modal */}
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="text-emerald-600 animate-pulse" size={18} />
                                    <h2 className="text-sm font-bold text-slate-800">Detail Produk Agrobusiness</h2>
                                </div>
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-lg border border-slate-100 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Isi Detail Modal */}
                            <div className="p-6 space-y-6">

                                {/* Tampilan Visual Gambar Berkualitas Tinggi Bebas Hak Cipta */}
                                <div className="relative h-44 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 shadow-inner">
                                    <img
                                        src={selectedProduct.fotoUrl || FALLBACK_FARM_IMAGE}
                                        alt={selectedProduct.nama}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = FALLBACK_FARM_IMAGE;
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="text-[10px] bg-white/90 backdrop-blur-sm border border-slate-200/50 px-3 py-1 rounded-full font-bold text-slate-700 uppercase tracking-wider shadow-sm">
                                            {selectedProduct.kategori}
                                        </span>
                                    </div>
                                </div>

                                {/* Detail Info Utama */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">{selectedProduct.nama}</h3>
                                        <p className="text-xs text-slate-400 font-semibold mt-1">ID Produk: AGRI-{selectedProduct.id}</p>
                                    </div>

                                    {/* Grid Spesifikasi Keuangan & Ketersediaan */}
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 shadow-sm">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga Pasar</p>
                                            <p className="text-xs font-extrabold text-emerald-700 mt-1">{formatRupiah(selectedProduct.harga)}</p>
                                            <p className="text-[9px] text-slate-400 mt-0.5">per {selectedProduct.satuan}</p>
                                        </div>
                                        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 shadow-sm">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ketersediaan</p>
                                            <p className="text-xs font-bold text-slate-800 mt-1">{selectedProduct.stok}</p>
                                            <p className="text-[9px] text-slate-400 mt-0.5">{selectedProduct.satuan}</p>
                                        </div>
                                        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 shadow-sm">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</p>
                                            <div className="mt-1">
                                                {selectedProduct.status === "Aktif" && (
                                                    <span className="inline-block text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">Aktif</span>
                                                )}
                                                {selectedProduct.status === "Stok Menipis" && (
                                                    <span className="inline-block text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">Menipis</span>
                                                )}
                                                {selectedProduct.status === "Stok Habis" && (
                                                    <span className="inline-block text-[9px] font-bold bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full">Habis</span>
                                                )}
                                                {selectedProduct.status === "Nonaktif" && (
                                                    <span className="inline-block text-[9px] font-bold bg-slate-150 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full">Nonaktif</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Deskripsi Lengkap */}
                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi Lengkap Produk</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50/40 p-4 rounded-xl border border-slate-100 text-justify">
                                            {selectedProduct.deskripsi || "Tidak ada rincian deskripsi tambahan."}
                                        </p>
                                    </div>

                                    {/* Riwayat Pembaruan / Metadata */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={13} className="text-slate-400" />
                                            <span>Dibuat: <strong className="text-slate-700">{selectedProduct.tanggalDibuat}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Info size={13} className="text-slate-400" />
                                            <span>Terakhir Diperbarui: <strong className="text-slate-700">{selectedProduct.terakhirDiperbarui}</strong></span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Footer Detail Modal */}
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setIsViewModalOpen(false); // Tutup popup lihat
                                        handleOpenEditModal(selectedProduct); // Langsung buka formulir edit
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-200 rounded-xl transition-all duration-200"
                                >
                                    Ubah Data
                                </button>
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 bg-white border border-slate-200 rounded-xl transition-all duration-200"
                                >
                                    Tutup Detail
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </>
    );
}