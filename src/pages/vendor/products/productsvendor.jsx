import React, { useState, useMemo } from "react";
import { products } from "../datavendor.jsx";
import {
    Package,
    Plus,
    Pencil,
    Trash2,
    Search,
    Filter,
    Image as ImageIcon,
    CircleCheck,
    Boxes,
    Layers,
    X,
    Eye,
    AlertTriangle,
} from "lucide-react";
import Navbar1 from "../../../components/vendor/navbar.jsx"

export default function ProductsPage() {
    // State manajemen produk utama
    const [productsList, setProductsList] = useState(products);

    // State untuk pencarian dan penyaringan
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Semua");
    const [statusFilter, setStatusFilter] = useState("Semua");

    // State untuk kontrol Modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // State untuk penampung data edit form
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        category: "Organik",
        price: 0,
        stock: 0,
        unit: "Kg",
        description: "",
        image: "",
        status: "Aktif",
    });

    // Kalkulasi data statistik (Summary Cards)
    const stats = useMemo(() => {
        const total = productsList.length;
        const active = productsList.filter((p) => p.status === "Aktif").length;
        const stockSum = productsList.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
        const uniqueCats = new Set(productsList.map((p) => p.category)).size;

        return { total, active, stockSum, uniqueCats };
    }, [productsList]);

    // Penyaringan produk berdasarkan query pencarian, kategori, dan status
    const filteredProducts = useMemo(() => {
        return productsList.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                categoryFilter === "Semua" || product.category === categoryFilter;

            const matchesStatus =
                statusFilter === "Semua" || product.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [productsList, searchQuery, categoryFilter, statusFilter]);

    // Format harga rupiah
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Pewarnaan Badge Kategori
    const getCategoryStyle = (category) => {
        switch (category) {
            case "Organik":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
            case "Sayuran":
                return "bg-green-50 text-green-700 border border-green-200/50";
            case "Buah":
                return "bg-amber-50 text-amber-700 border border-amber-200/50";
            case "Perkebunan":
                return "bg-orange-50 text-orange-700 border border-orange-200/50";
            case "Peternakan":
                return "bg-rose-50 text-rose-700 border border-rose-200/50";
            default:
                return "bg-slate-50 text-slate-700 border border-slate-200";
        }
    };

    // Handler: Menambah Produk
    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const imageInput = formData.get("image");

        const newProduct = {
            id: Date.now().toString(),
            name: formData.get("name"),
            category: formData.get("category"),
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock")),
            unit: formData.get("unit"),
            description: formData.get("description"),
            image: imageInput || "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300",
            status: formData.get("status") || "Aktif",
        };

        setProductsList([newProduct, ...productsList]);
        setIsAddModalOpen(false);
        e.currentTarget.reset();
    };

    // Handler: Membuka Form Edit
    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditForm({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            unit: product.unit,
            description: product.description || "",
            image: product.image,
            status: product.status,
        });
        setIsEditModalOpen(true);
    };

    // Handler: Menyimpan Perubahan Edit
    const handleEditProductSubmit = (e) => {
        e.preventDefault();
        const updated = {
            ...editingProduct,
            name: editForm.name,
            category: editForm.category,
            price: Number(editForm.price),
            stock: Number(editForm.stock),
            unit: editForm.unit,
            description: editForm.description,
            image: editForm.image || "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300",
            status: editForm.status,
        };

        setProductsList(productsList.map((p) => (p.id === editingProduct.id ? updated : p)));
        setIsEditModalOpen(false);
        setEditingProduct(null);
    };

    // Handler: Menghapus Produk
    const handleDeleteProduct = () => {
        if (productToDelete) {
            setProductsList(productsList.filter((p) => p.id !== productToDelete.id));
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    return (
        <>
            <Navbar1 />
            <div className="min-h-screen bg-slate-50/50 text-slate-800 p-4 md:p-8 font-sans">
                {/* CSS Injeksi untuk Animasi Smooth */}
                <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fadeIn">

                    {/* Page Header */}
                    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50/30 border border-emerald-100/60 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl -z-10 animate-pulse" />
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 mb-3 border border-emerald-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Portal Vendor Agrobisnis
                                </span>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                    Manajemen Produk
                                </h1>
                                <p className="mt-2 text-slate-600 text-sm md:text-base max-w-xl leading-relaxed">
                                    Kelola katalog produk pertanian, informasi harga, stok, dan status produk dalam satu tempat.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="self-start md:self-center flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-200 group shrink-0"
                            >
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                                <span>Tambah Produk</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Produk</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-green-50 text-green-600">
                                <CircleCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Produk Aktif</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.active}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600">
                                <Boxes className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Stok</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.stockSum.toLocaleString("id-ID")}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="p-3.5 rounded-xl bg-orange-50 text-orange-600">
                                <Layers className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori Produk</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.uniqueCats}</p>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter Toolbar */}
                    <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari produk berdasarkan nama atau kategori..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-slate-50/50"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase tracking-wider shrink-0 mr-1">
                                <Filter className="w-4 h-4" />
                                <span>Saring:</span>
                            </div>

                            {/* Category Filter */}
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                            >
                                <option value="Semua">Semua Kategori</option>
                                <option value="Organik">Organik</option>
                                <option value="Sayuran">Sayuran</option>
                                <option value="Buah">Buah</option>
                                <option value="Perkebunan">Perkebunan</option>
                                <option value="Peternakan">Peternakan</option>
                            </select>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="flex-1 md:flex-none text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                            </select>
                        </div>
                    </div>

                    {/* Product List Container */}

                    {/* Desktop View (Table Layout) */}
                    <div className="hidden lg:block bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-500 text-xs font-bold tracking-wider uppercase">
                                    <th className="px-6 py-4.5">Produk</th>
                                    <th className="px-6 py-4.5">Kategori</th>
                                    <th className="px-6 py-4.5 text-right">Harga</th>
                                    <th className="px-6 py-4.5 text-right">Stok</th>
                                    <th className="px-6 py-4.5 text-center">Status</th>
                                    <th className="px-6 py-4.5 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center text-slate-400 bg-slate-50/20">
                                            <Package className="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300" />
                                            <p className="text-base font-semibold text-slate-700">Produk Tidak Ditemukan</p>
                                            <p className="text-xs mt-1 text-slate-500">Sesuaikan kata pencarian atau pilihan filter Anda.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="hover:bg-slate-50/30 transition-colors duration-150 cursor-pointer group/row"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            {/* Image & Title */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover/row:scale-105 transition-transform duration-350"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300";
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="max-w-xs xl:max-w-md">
                                                        <h4 className="font-semibold text-slate-900 group-hover/row:text-emerald-600 transition-colors line-clamp-1">
                                                            {product.name}
                                                        </h4>
                                                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                                            {product.description || "Tidak ada deskripsi produk."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(product.category)}`}>
                                                    {product.category}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                                {formatPrice(product.price)}
                                                <span className="text-xs font-normal text-slate-400">/{product.unit}</span>
                                            </td>

                                            {/* Stock */}
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-semibold text-slate-900">{product.stock}</span>
                                                <span className="text-xs text-slate-400"> {product.unit}</span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${product.status === "Aktif"
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${product.status === "Aktif" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                                                    {product.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <button
                                                        onClick={() => setSelectedProduct(product)}
                                                        title="Detail Produk"
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                                    >
                                                        <Eye className="w-4.5 h-4.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => openEditModal(product)}
                                                        title="Edit Produk"
                                                        className="p-1.5 rounded-lg text-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                                    >
                                                        <Pencil className="w-4.5 h-4.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setProductToDelete(product);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        title="Hapus Produk"
                                                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-4.5 h-4.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile & Tablet View (Stacked Card Layout) */}
                    <div className="lg:hidden space-y-4">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-xl border border-slate-100 p-12 text-center text-slate-400 shadow-sm">
                                <Package className="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300" />
                                <p className="text-base font-semibold text-slate-700">Produk Tidak Ditemukan</p>
                                <p className="text-xs mt-1 text-slate-500">Sesuaikan kata pencarian atau pilihan filter Anda.</p>
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => setSelectedProduct(product)}
                                    className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-all duration-300 flex flex-col gap-4 relative cursor-pointer"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex items-start justify-between gap-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${getCategoryStyle(product.category)}`}>
                                                    {product.category}
                                                </span>
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${product.status === "Aktif"
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-base leading-snug">{product.name}</h4>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500 pt-0.5">
                                                <p>
                                                    Harga: <span className="font-semibold text-slate-900">{formatPrice(product.price)}</span>/{product.unit}
                                                </p>
                                                <p>
                                                    Stok: <span className="font-semibold text-slate-900">{product.stock}</span> {product.unit}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 pt-3 flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>Detail</span>
                                        </button>
                                        <button
                                            onClick={() => openEditModal(product)}
                                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setProductToDelete(product);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Hapus</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ==================================== MODAL WINDOWS ==================================== */}

                {/* 1. Modal Detail Produk */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden transform scale-100 transition-all">
                            <div className="relative h-56 w-full bg-slate-100">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300";
                                    }}
                                />
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white transition-colors backdrop-blur-sm shadow-sm"
                                >
                                    <X className="w-4.5 h-4.5" />
                                </button>
                                <span className={`absolute bottom-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${getCategoryStyle(selectedProduct.category)}`}>
                                    {selectedProduct.category}
                                </span>
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h3>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${selectedProduct.status === "Aktif"
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                            : "bg-slate-100 text-slate-600 border border-slate-200"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${selectedProduct.status === "Aktif" ? "bg-emerald-500" : "bg-slate-400"}`} />
                                            {selectedProduct.status}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                                        {selectedProduct.description || "Tidak ada deskripsi rinci untuk produk pertanian ini."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-slate-50/75 rounded-xl p-4 border border-slate-100">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Harga Jual</span>
                                        <span className="text-lg font-bold text-slate-900 mt-1 block">
                                            {formatPrice(selectedProduct.price)}<span className="text-xs font-normal text-slate-400">/{selectedProduct.unit}</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Ketersediaan Stok</span>
                                        <span className="text-lg font-bold text-slate-900 mt-1 block">
                                            {selectedProduct.stock} <span className="text-xs font-normal text-slate-400">{selectedProduct.unit}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-2 flex items-center justify-end gap-2.5">
                                    <button
                                        onClick={() => {
                                            setProductToDelete(selectedProduct);
                                            setSelectedProduct(null);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Hapus</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            openEditModal(selectedProduct);
                                            setSelectedProduct(null);
                                        }}
                                        className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        <span>Edit Informasi</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Modal Tambah Produk */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
                            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                                <h3 className="text-lg font-bold text-slate-900">Tambah Produk Baru</h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Produk *</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Contoh: Cabai Merah Organik"
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori *</label>
                                    <select
                                        required
                                        name="category"
                                        defaultValue="Organik"
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-white"
                                    >
                                        <option value="Organik">Organik</option>
                                        <option value="Sayuran">Sayuran</option>
                                        <option value="Buah">Buah</option>
                                        <option value="Perkebunan">Perkebunan</option>
                                        <option value="Peternakan">Peternakan</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Harga (Rp) *</label>
                                        <input
                                            required
                                            type="number"
                                            name="price"
                                            min="0"
                                            placeholder="45000"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stok *</label>
                                        <input
                                            required
                                            type="number"
                                            name="stock"
                                            min="0"
                                            placeholder="150"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Satuan *</label>
                                        <input
                                            required
                                            type="text"
                                            name="unit"
                                            placeholder="Kg, Ikat, Box"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deskripsi</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        placeholder="Deskripsikan detail keunggulan dan metode tanam produk pertanian Anda..."
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5" /> URL Gambar Produk
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status Default</label>
                                    <select
                                        name="status"
                                        defaultValue="Aktif"
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-white"
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Nonaktif</option>
                                    </select>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all"
                                    >
                                        Tambah Produk
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* 3. Modal Edit Produk */}
                {isEditModalOpen && editingProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
                            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                                <h3 className="text-lg font-bold text-slate-900">Edit Informasi Produk</h3>
                                <button
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setEditingProduct(null);
                                    }}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleEditProductSubmit} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Produk *</label>
                                    <input
                                        required
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        placeholder="Contoh: Cabai Merah Organik"
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori *</label>
                                    <select
                                        required
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-white"
                                    >
                                        <option value="Organik">Organik</option>
                                        <option value="Sayuran">Sayuran</option>
                                        <option value="Buah">Buah</option>
                                        <option value="Perkebunan">Perkebunan</option>
                                        <option value="Peternakan">Peternakan</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Harga (Rp) *</label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            value={editForm.price}
                                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                            placeholder="45000"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stok *</label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            value={editForm.stock}
                                            onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                                            placeholder="150"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Satuan *</label>
                                        <input
                                            required
                                            type="text"
                                            value={editForm.unit}
                                            onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                                            placeholder="Kg, Ikat, Box"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deskripsi</label>
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        rows="3"
                                        placeholder="Deskripsikan detail keunggulan dan metode tanam produk pertanian Anda..."
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5" /> URL Gambar Produk
                                    </label>
                                    <input
                                        type="url"
                                        value={editForm.image}
                                        onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-white"
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Nonaktif</option>
                                    </select>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditModalOpen(false);
                                            setEditingProduct(null);
                                        }}
                                        className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* 4. Modal Konfirmasi Penghapusan */}
                {isDeleteModalOpen && productToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full p-6 text-center transform scale-100 transition-all">
                            <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Produk?</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                Apakah Anda yakin ingin menghapus produk <span className="font-bold text-slate-800">"{productToDelete.name}"</span>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setProductToDelete(null);
                                    }}
                                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDeleteProduct}
                                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm hover:shadow transition-all"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}