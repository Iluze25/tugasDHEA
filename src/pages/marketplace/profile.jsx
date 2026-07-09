import React, { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    BadgeCheck,
    Pencil,
    Save,
    X,
    ShoppingBag,
    Package,
    Wallet,
    Heart,
    Truck,
    CheckCircle,
    Clock,
    Home,
    Plus,
    History,
    Activity,
    Star,
    Trash2,
    ListOrdered,
    ChevronRight
} from 'lucide-react';

import Navbar from '../../components/marketplace/navbar.jsx';

// ==========================================
// INITIAL DUMMY USER DATA
// ==========================================
const INITIAL_USER_DATA = {
    id: 1,
    name: "Dhea Salsa Winanda",
    avatar: "https://scontent.fcgk22-2.fna.fbcdn.net/v/t39.30808-1/488921436_1453267752705007_5864091378705276613_n.jpg?stp=c0.0.742.742a_dst-jpg_tt6&cstp=mx742x742&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_ohc=xkMjZJO6p1cQ7kNvwE8ZWH3&_nc_oc=AdpbxToEQR8hQKueN6Aaub2Aa4tfM3FyeP2GcnjpG5QYsLHaQmuu8DBLgmKUhA7jn7w&_nc_zt=24&_nc_ht=scontent.fcgk22-2.fna&_nc_gid=AcQBYoffRjdBJG0hlwV6gg&_nc_ss=7c2a8&oh=00_AQD0NgaZNsebPp5egkqNtOObw0etnUrmkgNek1pMVNcFUQ&oe=6A54400E",
    email: "dxxxxxx@gmail.com",
    phone: "083xxxxxxxxx",
    location: "Tasikmalaya, Jawa Barat",
    status: "Buyer Premium",

    statistics: {
        orders: 25,
        products: 120,
        spending: 45897000,
        favorite: 15
    },

    address: [
        {
            id: 1,
            label: "Rumah Utama",
            recipient: "Dhea Salsa Windanda",
            phone: "083xxxxxxxxx",
            street: "Jl. Otto Iskandardinata No. 45, Kecamatan Tawang",
            city: "Tasikmalaya, Jawa Barat",
            isDefault: true
        },
        {
            id: 2,
            label: "Kantor / AgroCorp",
            recipient: "Dhea Salsa Winanda(AgroCorp)",
            phone: "083xxxxxxxxx",
            street: "Ruko Asia Plaza Blok B No. 12, Jl. HZ. Mustofa",
            city: "Tasikmalaya, Jawa Barat",
            isDefault: false
        }
    ],

    orders: [
        {
            id: "ORD-9821-AG",
            productName: "Cabai Merah Keriting",
            quantity: "2 Kg",
            total: 50000,
            date: "8 Juli 2026",
            status: "Selesai",
            image: "https://i.pinimg.com/1200x/52/b1/64/52b164bfe84e3f57bf6cd66ba87da9bb.jpg"
        },
        {
            id: "ORD-9754-AG",
            productName: "Wortel Organik Premium",
            quantity: "3 Kg",
            total: 54000,
            date: "7 Juli 2026",
            status: "Dikirim",
            image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&auto=format&fit=crop&q=80"
        },
        {
            id: "ORD-9610-AG",
            productName: "Beras Pandan Wangi",
            quantity: "10 Kg",
            total: 170000,
            date: "5 Juli 2026",
            status: "Diproses",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&auto=format&fit=crop&q=80"
        },
        {
            id: "ORD-9452-AG",
            productName: "Melon Golden Hidroponik",
            quantity: "1.5 Kg",
            total: 35000,
            date: "1 Juli 2026",
            status: "Selesai",
            image: "https://i.pinimg.com/1200x/b1/d9/b5/b1d9b5f302a2f86e9683ee3a008af075.jpg"
        },
        {
            id: "ORD-9302-AG",
            productName: "Pupuk Kompos Organik Super",
            quantity: "15 Kg",
            total: 45000,
            date: "25 Juni 2026",
            status: "Selesai",
            image: "https://i.pinimg.com/1200x/10/75/0f/10750f6c5c6b4b2888e5ed87feaab942.jpg"
        },
        {
            id: "ORD-9112-AG",
            productName: "Alpukat Mentega Super",
            quantity: "2 Kg",
            total: 70000,
            date: "18 Juni 2026",
            status: "Selesai",
            image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=150&auto=format&fit=crop&q=80"
        },
        {
            id: "ORD-8941-AG",
            productName: "Bibit Cabai Rawit Unggul",
            quantity: "5 Unit",
            total: 75000,
            date: "10 Juni 2026",
            status: "Selesai",
            image: "https://i.pinimg.com/1200x/9c/79/aa/9c79aa19b0f1ffdbad7e5ac1b223ea99.jpg"
        },
        {
            id: "ORD-8712-AG",
            productName: "Brokoli Hijau Segar",
            quantity: "1 Kg",
            total: 28000,
            date: "3 Juni 2026",
            status: "Dibatalkan",
            image: "https://i.pinimg.com/736x/e0/77/dd/e077dd17e4830620451617414d01082b.jpg"
        }
    ],

    favoriteProducts: [
        {
            id: "f1",
            name: "Cabai Rawit Organik",
            price: 25000,
            rating: 4.8,
            farmer: "Budi Santoso",
            image: "https://i.pinimg.com/1200x/3a/c7/b0/3ac7b0d5d6d77fe2e1f22701204a7a80.jpg"
        },
        {
            id: "f2",
            name: "Wortel Cipanas Premium",
            price: 18000,
            rating: 4.9,
            farmer: "Ibu Nurhayati",
            image: "https://i.pinimg.com/1200x/09/b2/b9/09b2b9a0e5b12851f0e08227aaa89609.jpg"
        },
        {
            id: "f3",
            name: "Beras Pandan Wangi",
            price: 85000,
            rating: 4.9,
            farmer: "Aki Kosasih",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80"
        },
        {
            id: "f4",
            name: "Melon Golden Hidroponik",
            price: 35000,
            rating: 4.8,
            farmer: "Mas Wisnu",
            image: "https://i.pinimg.com/736x/48/28/e9/4828e95395e6fbba25e3b413ab58e419.jpg"
        },
        {
            id: "f5",
            name: "Ubi Cilembu Madu Asli",
            price: 16000,
            rating: 4.9,
            farmer: "Asep Saepudin",
            image: "https://i.pinimg.com/1200x/08/c4/27/08c4277565ab17f34a39ac13cb47b53f.jpg"
        },
        {
            id: "f6",
            name: "Semangka Kuning Manis",
            price: 14000,
            rating: 4.8,
            farmer: "Ibu Nurhayati",
            image: "https://i.pinimg.com/736x/1b/bf/6b/1bbf6b0b9f53220ed7c39880fa7d226d.jpg"
        },
        {
            id: "f7",
            name: "Jahe Merah Pilihan",
            price: 35000,
            rating: 4.9,
            farmer: "Mega Utami",
            image: "https://i.pinimg.com/1200x/ce/11/d8/ce11d8301666ec90b19750c09e561769.jpg"
        },
        {
            id: "f8",
            name: "Apel Manalagi Malang",
            price: 30000,
            rating: 4.7,
            farmer: "Ahmad Fauzi",
            image: "https://i.pinimg.com/1200x/42/f1/c3/42f1c39030a7b2ff6c5b0c4c630f7161.jpg"
        }
    ],

    activities: [
        { id: 1, date: "8 Juli 2026", action: "Membeli Cabai Merah Keriting 2 Kg" },
        { id: 2, date: "7 Juli 2026", action: "Menambahkan Wortel Cipanas Premium ke favorit" },
        { id: 3, date: "5 Juli 2026", action: "Memberikan rating bintang 5 kepada Petani Aki Kosasih" },
        { id: 4, date: "1 Juli 2026", action: "Melakukan transaksi pembelian Melon Golden Hidroponik" },
        { id: 5, date: "28 Juni 2026", action: "Mengubah alamat pengiriman utama" }
    ]
};

// ==========================================
// UTILITY HELPERS
// ==========================================
const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(val);
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Profile() {
    const [user, setUser] = useState(INITIAL_USER_DATA);
    const [activeTab, setActiveTab] = useState("pesanan"); // "pesanan" | "favorit" | "alamat" | "aktivitas"
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

    // States Form Edit Profile
    const [editName, setEditName] = useState("");
    const [editAvatar, setEditAvatar] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editStreet, setEditStreet] = useState("");
    const [editCity, setEditCity] = useState("");

    // States Form Alamat Baru
    const [newLabel, setNewLabel] = useState("");
    const [newRecipient, setNewRecipient] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newStreet, setNewStreet] = useState("");
    const [newCity, setNewCity] = useState("");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsEditModalOpen(false);
                setIsAddAddressOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleOpenEditModal = () => {
        setEditName(user.name);
        setEditAvatar(user.avatar);
        setEditPhone(user.phone);
        const defaultAddr = user.address.find(a => a.isDefault) || user.address[0];
        setEditStreet(defaultAddr ? defaultAddr.street : "");
        setEditCity(defaultAddr ? defaultAddr.city : "");
        setIsEditModalOpen(true);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!editName.trim()) return;

        setUser(prev => {
            const updatedAddress = prev.address.map(addr => {
                if (addr.isDefault) {
                    return { ...addr, recipient: editName, phone: editPhone, street: editStreet, city: editCity };
                }
                return addr;
            });

            const newActivity = {
                id: Date.now(),
                date: "8 Juli 2026",
                action: "Memperbarui rincian informasi data profil pengguna"
            };

            return {
                ...prev,
                name: editName,
                avatar: editAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=450&auto=format&fit=crop&q=80",
                phone: editPhone,
                location: editCity || prev.location,
                address: updatedAddress,
                activities: [newActivity, ...prev.activities]
            };
        });

        setIsEditModalOpen(false);
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        if (!newLabel.trim() || !newRecipient.trim() || !newPhone.trim() || !newStreet.trim()) return;

        const newAddressItem = {
            id: Date.now(),
            label: newLabel,
            recipient: newRecipient,
            phone: newPhone,
            street: newStreet,
            city: newCity || "Tasikmalaya, Jawa Barat",
            isDefault: false
        };

        setUser(prev => {
            const newActivity = {
                id: Date.now(),
                date: "8 Juli 2026",
                action: `Menambahkan alamat pengiriman baru: ${newLabel}`
            };

            return {
                ...prev,
                address: [...prev.address, newAddressItem],
                activities: [newActivity, ...prev.activities]
            };
        });

        setNewLabel("");
        setNewRecipient("");
        setNewPhone("");
        setNewStreet("");
        setNewCity("");
        setIsAddAddressOpen(false);
    };

    const handleDeleteAddress = (id) => {
        setUser(prev => {
            const deletedAddr = prev.address.find(a => a.id === id);
            const updatedAddr = prev.address.filter(a => a.id !== id);
            const newActivity = {
                id: Date.now(),
                date: "8 Juli 2026",
                action: `Menghapus alamat pengiriman: ${deletedAddr?.label || "Alamat"}`
            };

            return {
                ...prev,
                address: updatedAddr,
                activities: [newActivity, ...prev.activities]
            };
        });
    };

    const renderOrderStatus = (status) => {
        switch (status) {
            case "Selesai":
                return (
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-150">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Selesai</span>
                    </span>
                );
            case "Dikirim":
                return (
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-150">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dikirim</span>
                    </span>
                );
            case "Diproses":
                return (
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-150">
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                        <span>Diproses</span>
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-150">
                        <X className="w-3.5 h-3.5" />
                        <span>Dibatalkan</span>
                    </span>
                );
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* ==========================================
            MAIN PROFILE GRID LAYOUT
            ========================================== */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ------------------------------------------
              SISI KIRI: PANEL UTAMA & TOMBOL TAB (4 Columns)
              ------------------------------------------ */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Kartu Informasi Profil Pokok */}
                            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden text-center relative group">
                                <div className="h-28 bg-gradient-to-r from-emerald-500 to-teal-600 w-full"></div>

                                <div className="p-6 -mt-16 space-y-4 relative z-10">
                                    <div className="relative inline-block">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mx-auto group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute bottom-1 right-2 bg-emerald-500 border-2 border-white w-6 h-6 rounded-full flex items-center justify-center shadow">
                                            <BadgeCheck className="w-4 h-4 text-white fill-current" />
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                                        <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                            <span>{user.status}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2.5 pt-4 border-t border-slate-100 text-sm text-slate-500 text-left">
                                        <div className="flex items-center space-x-2.5">
                                            <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2.5">
                                            <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <span>{user.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-2.5">
                                            <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                                            <span>{user.location}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleOpenEditModal}
                                        className="w-full py-2.5 px-4 border border-gray-200 text-slate-700 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-sm"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                        <span>Ubah Detail Profil</span>
                                    </button>
                                </div>
                            </div>

                            {/* NAVIGASI TAB VERTIKAL (Tombol Pemisah Konten) */}
                            <div className="bg-white p-3 rounded-3xl border border-gray-150 shadow-sm space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-3 pt-2 pb-1">Menu Akun</p>

                                <button
                                    onClick={() => setActiveTab("pesanan")}
                                    className={`w-full flex items-center justify-between py-3 px-4 text-xs font-extrabold rounded-2xl transition-all duration-200 ${activeTab === "pesanan"
                                        ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 pl-3"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/70 border-l-4 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <ListOrdered className="w-4 h-4 flex-shrink-0" />
                                        <span>Riwayat Pesanan</span>
                                    </div>
                                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeTab === "pesanan" ? "translate-x-1 text-emerald-600" : ""}`} />
                                </button>

                                <button
                                    onClick={() => setActiveTab("favorit")}
                                    className={`w-full flex items-center justify-between py-3 px-4 text-xs font-extrabold rounded-2xl transition-all duration-200 ${activeTab === "favorit"
                                        ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 pl-3"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/70 border-l-4 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Heart className="w-4 h-4 flex-shrink-0" />
                                        <span>Produk Favorit</span>
                                    </div>
                                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeTab === "favorit" ? "translate-x-1 text-emerald-600" : ""}`} />
                                </button>

                                <button
                                    onClick={() => setActiveTab("alamat")}
                                    className={`w-full flex items-center justify-between py-3 px-4 text-xs font-extrabold rounded-2xl transition-all duration-200 ${activeTab === "alamat"
                                        ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 pl-3"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/70 border-l-4 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Home className="w-4 h-4 flex-shrink-0" />
                                        <span>Alamat Pengiriman</span>
                                    </div>
                                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeTab === "alamat" ? "translate-x-1 text-emerald-600" : ""}`} />
                                </button>

                                <button
                                    onClick={() => setActiveTab("aktivitas")}
                                    className={`w-full flex items-center justify-between py-3 px-4 text-xs font-extrabold rounded-2xl transition-all duration-200 ${activeTab === "aktivitas"
                                        ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 pl-3"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/70 border-l-4 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Activity className="w-4 h-4 flex-shrink-0" />
                                        <span>Timeline Aktivitas</span>
                                    </div>
                                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeTab === "aktivitas" ? "translate-x-1 text-emerald-600" : ""}`} />
                                </button>
                            </div>

                        </div>

                        {/* ------------------------------------------
              SISI KANAN: STATISTIK & TAMPILAN PANEL AKTIF (8 Columns)
              ------------------------------------------ */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* Rangkuman Statistik Belanja Utama */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-gray-150 shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow duration-200">
                                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                        <ShoppingBag className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Pesanan</p>
                                        <p className="text-sm font-black text-slate-800">{user.statistics.orders} Order</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border border-gray-150 shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow duration-200">
                                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                        <Package className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Produk Dibeli</p>
                                        <p className="text-sm font-black text-slate-800">{user.statistics.products} Unit</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border border-gray-150 shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow duration-200">
                                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                                        <Wallet className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Belanja</p>
                                        <p className="text-sm font-black text-slate-800 truncate">{formatCurrency(user.statistics.spending)}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border border-gray-150 shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow duration-200">
                                    <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                                        <Heart className="w-4.5 h-4.5 fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Disukai</p>
                                        <p className="text-sm font-black text-slate-800">{user.statistics.favorite} Produk</p>
                                    </div>
                                </div>
                            </div>

                            {/* AREA DYNAMIC CONTENT (Berdasarkan Tab Navigasi Vertikal Aktif) */}
                            <div className="transition-all duration-300">

                                {/* PANEL 1: RIWAYAT PESANAN */}
                                {activeTab === "pesanan" && (
                                    <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-4 animate-fadeIn">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-50 flex items-center space-x-2">
                                            <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                                            <span>Daftar Transaksi Belanja</span>
                                        </h3>

                                        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                                            {user.orders.map((order) => (
                                                <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={order.image}
                                                            alt={order.productName}
                                                            className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                                                        />
                                                        <div className="space-y-0.5">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{order.id}</span>
                                                            <h4 className="font-bold text-slate-800 text-sm leading-tight">{order.productName}</h4>
                                                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                                                                <span>Kuantitas: <b>{order.quantity}</b></span>
                                                                <span>•</span>
                                                                <span>Tanggal: <b>{order.date}</b></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex sm:flex-col sm:items-end justify-between items-center gap-2">
                                                        <span className="font-black text-emerald-800 text-sm">{formatCurrency(order.total)}</span>
                                                        {renderOrderStatus(order.status)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PANEL 2: PRODUK FAVORIT */}
                                {activeTab === "favorit" && (
                                    <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6 animate-fadeIn">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-50 flex items-center space-x-2">
                                            <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                                            <span>Hasil Bumi Favorit Saya</span>
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                            {user.favoriteProducts.map((prod) => (
                                                <div
                                                    key={prod.id}
                                                    className="group bg-white rounded-2xl border border-slate-150/75 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                                                >
                                                    <div className="relative aspect-video overflow-hidden bg-slate-50">
                                                        <img
                                                            src={prod.image}
                                                            alt={prod.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-rose-500 hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                                                            <Heart className="w-3.5 h-3.5 fill-current" />
                                                        </span>
                                                    </div>
                                                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-700">
                                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                                                                <span>{prod.rating}</span>
                                                            </div>
                                                            <h4 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1 group-hover:text-emerald-700 transition-colors duration-150">
                                                                {prod.name}
                                                            </h4>
                                                        </div>
                                                        <div className="pt-2 border-t border-slate-50">
                                                            <p className="text-xs font-extrabold text-emerald-700">{formatCurrency(prod.price)} / kg</p>
                                                            <p className="text-[10px] text-slate-400 font-semibold truncate pt-0.5">Petani: {prod.farmer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PANEL 3: ALAMAT PENGIRIMAN */}
                                {activeTab === "alamat" && (
                                    <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-4 animate-fadeIn">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                                                <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                                                <span>Daftar Alamat Pengiriman</span>
                                            </h3>
                                            <button
                                                onClick={() => setIsAddAddressOpen(true)}
                                                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-colors duration-150 text-xs font-bold"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Tambah Alamat</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {user.address.map((addr) => (
                                                <div
                                                    key={addr.id}
                                                    className={`p-5 rounded-2xl border transition-all duration-200 relative group/addr ${addr.isDefault
                                                        ? "bg-slate-50 border-emerald-200/60"
                                                        : "bg-white border-slate-100 hover:border-slate-300"
                                                        }`}
                                                >
                                                    {!addr.isDefault && (
                                                        <button
                                                            onClick={() => handleDeleteAddress(addr.id)}
                                                            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover/addr:opacity-100 transition-all duration-150"
                                                            title="Hapus Alamat"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}

                                                    <div className="space-y-1.5 pr-6">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs font-black text-slate-800">{addr.label}</span>
                                                            {addr.isDefault && (
                                                                <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                                                                    Utama
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs font-bold text-slate-600">{addr.recipient}</p>
                                                        <p className="text-xs text-slate-400">{addr.phone}</p>
                                                        <p className="text-xs text-slate-500 leading-relaxed pt-1">{addr.street}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold">{addr.city}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PANEL 4: TIMELINE AKTIVITAS */}
                                {activeTab === "aktivitas" && (
                                    <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-4 animate-fadeIn">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-50 flex items-center space-x-2">
                                            <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                                            <span>Lini Masa Aktivitas Pembeli</span>
                                        </h3>

                                        <div className="relative pl-4 space-y-6 before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-slate-100">
                                            {user.activities.map((act) => (
                                                <div key={act.id} className="relative space-y-0.5">
                                                    <span className="absolute -left-[18px] top-1.5 bg-emerald-500 border-2 border-white w-2.5 h-2.5 rounded-full shadow-sm"></span>

                                                    <p className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                                                        <History className="w-3 h-3 text-emerald-500" />
                                                        <span>{act.date}</span>
                                                    </p>
                                                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                                        {act.action}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

                {/* ==========================================
          MODAL EDIT PROFILE
          ========================================== */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
                        <div className="absolute inset-0 cursor-default" onClick={() => setIsEditModalOpen(false)}></div>

                        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative z-10 border border-slate-100 overflow-hidden animate-scaleUp">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">Ubah Rincian Profil</h3>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-1 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                                >
                                    <X className="w-5.5 h-5.5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        required
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">URL Foto Profil</label>
                                    <input
                                        type="url"
                                        value={editAvatar}
                                        onChange={(e) => setEditAvatar(e.target.value)}
                                        placeholder="https://example.com/photo.jpg"
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-xs"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Nomor Telepon</label>
                                    <input
                                        type="tel"
                                        required
                                        value={editPhone}
                                        onChange={(e) => setEditPhone(e.target.value)}
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Alamat Jalan (Utama)</label>
                                    <textarea
                                        required
                                        value={editStreet}
                                        onChange={(e) => setEditStreet(e.target.value)}
                                        rows="2"
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Kota & Provinsi</label>
                                    <input
                                        type="text"
                                        required
                                        value={editCity}
                                        onChange={(e) => setEditCity(e.target.value)}
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-sm"
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        <span>Simpan Perubahan</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ==========================================
          MODAL TAMBAH ALAMAT BARU
          ========================================== */}
                {isAddAddressOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
                        <div className="absolute inset-0 cursor-default" onClick={() => setIsAddAddressOpen(false)}></div>

                        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative z-10 border border-slate-100 overflow-hidden animate-scaleUp">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">Tambah Alamat Pengiriman</h3>
                                <button
                                    onClick={() => setIsAddAddressOpen(false)}
                                    className="p-1 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                                >
                                    <X className="w-5.5 h-5.5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddAddress} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Label Alamat</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Rumah Mertua, Kost, Kantor Cabang"
                                        value={newLabel}
                                        onChange={(e) => setNewLabel(e.target.value)}
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Nama Penerima</label>
                                        <input
                                            type="text"
                                            required
                                            value={newRecipient}
                                            onChange={(e) => setNewRecipient(e.target.value)}
                                            className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase">No. Telepon Penerima</label>
                                        <input
                                            type="tel"
                                            required
                                            value={newPhone}
                                            onChange={(e) => setNewPhone(e.target.value)}
                                            className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Alamat Jalan Lengkap</label>
                                    <textarea
                                        required
                                        placeholder="Sebutkan nama jalan, nomor rumah, rt/rw, patokan lokasi"
                                        value={newStreet}
                                        onChange={(e) => setNewStreet(e.target.value)}
                                        rows="3"
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Kota & Provinsi</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Tasikmalaya, Jawa Barat"
                                        value={newCity}
                                        onChange={(e) => setNewCity(e.target.value)}
                                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddAddressOpen(false)}
                                        className="px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-sm"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Tambah Alamat</span>
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