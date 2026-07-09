import React, { useState } from 'react';
import Navbar from '../../components/marketplace/navbar.jsx';


// ==========================================
// 1. DATA DUMMY (LOCAL STATE INITIALIZERS)
// ==========================================

const INITIAL_CART_ITEMS = [
    {
        id: 1,
        name: "Bibit Cabai Premium Pack",
        supplier: "Tani Makmur Sentosa",
        price: 25000,
        qty: 2,
        weight: 0.1,
        checked: true,
        image: "https://i.pinimg.com/1200x/f2/bc/2b/f2bc2b89cc4062a822944ef7215cc747.jpg"
    },
    {
        id: 2,
        name: "Pupuk Organik Padat Super 5kg",
        supplier: "CV Subur Makmur",
        price: 45000,
        qty: 1,
        weight: 5.0,
        checked: true,
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Beras Organik Premium 5kg",
        supplier: "Kelompok Tani Rejo",
        price: 85000,
        qty: 1,
        weight: 5.0,
        checked: false,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Sayuran Hidroponik Paket Segar",
        supplier: "Greenhouse Hidroponik",
        price: 30000,
        qty: 3,
        weight: 0.5,
        checked: true,
        image: "https://images.unsplash.com/photo-1550147760-44c9966d6bc7?w=200&auto=format&fit=crop&q=60"
    }
];

const INITIAL_ORDERS = [
    {
        id: 1,
        orderId: "AGR-1029202",
        name: "Bibit Cabai Premium Pack",
        supplier: "Tani Makmur Sentosa",
        qty: 2,
        weight: 0.1,
        estimation: "Besok (10:00 - 14:00)",
        badgeText: "Diproses Petani",
        image: "https://i.pinimg.com/1200x/f2/bc/2b/f2bc2b89cc4062a822944ef7215cc747.jpg",
        currentStep: 2,
        steps: [
            { label: "Pesanan dibuat", time: "08:12" },
            { label: "Pembayaran berhasil", time: "08:15" },
            { label: "Sedang diproses petani", time: "11:30" },
            { label: "Dalam pengiriman", time: "" },
            { label: "Selesai", time: "" }
        ]
    },
    {
        id: 2,
        orderId: "AGR-1029203",
        name: "Beras Organik 5kg",
        supplier: "Kelompok Tani Rejo",
        qty: 1,
        weight: 5.0,
        estimation: "2 Hari Lagi",
        badgeText: "Dalam Pengiriman",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=60",
        currentStep: 2,
        steps: [
            { label: "Pesanan dibuat", time: "Hari Ini, 07:00" },
            { label: "Dikemas", time: "Hari Ini, 09:30" },
            { label: "Dikirim", time: "Hari Ini, 14:00" },
            { label: "Sampai tujuan", time: "" }
        ]
    },
    {
        id: 3,
        orderId: "AGR-1029204",
        name: "Sayuran Hidroponik",
        supplier: "Greenhouse Hidroponik",
        qty: 3,
        weight: 0.5,
        estimation: "Hari Ini Sore",
        badgeText: "Kurir Menjemput",
        image: "https://images.unsplash.com/photo-1550147760-44c9966d6bc7?w=200&auto=format&fit=crop&q=60",
        currentStep: 3,
        steps: [
            { label: "Pesanan dibuat", time: "06:00" },
            { label: "Dipanen", time: "06:45" },
            { label: "Quality Check", time: "07:15" },
            { label: "Kurir mengambil barang", time: "08:30" },
            { label: "Dalam perjalanan", time: "" }
        ]
    },
    {
        id: 4,
        orderId: "AGR-1029201",
        name: "Pupuk Organik",
        supplier: "CV Subur Makmur",
        qty: 1,
        weight: 5.0,
        estimation: "Sudah Tiba",
        badgeText: "Barang telah diterima",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&auto=format&fit=crop&q=60",
        currentStep: 1,
        steps: [
            { label: "Semua proses selesai", time: "Kemarin, 09:00" },
            { label: "Barang telah diterima", time: "Kemarin, 16:30" }
        ]
    }
];

const INITIAL_REVIEWS = [
    {
        id: 1,
        product: "Beras Organik Premium",
        author: "Agus Prasetyo",
        rating: 5,
        comment: "Beras berkualitas, kemasan bagus, pengiriman cepat.",
        date: "2 hari yang lalu",
        hasImage: false
    },
    {
        id: 2,
        product: "Bibit Cabai Premium Pack",
        author: "Hendra Wijaya",
        rating: 4,
        comment: "Persentase kecambah tinggi, hampir tumbuh semua di polybag. Recommended!",
        date: "1 minggu yang lalu",
        hasImage: true
    }
];

// ==========================================
// 2. SUB-KOMPONEN REUSABLE
// ==========================================

// Rating Stars (Bintang)
function RatingStars({ rating, setRating, interactive = false, size = "w-5 h-5" }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={!interactive}
                    onClick={() => setRating && setRating(star)}
                    className={`${interactive ? 'hover:scale-110' : ''} transition-transform duration-100 focus:outline-none`}
                >
                    <svg
                        className={`${size} ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            ))}
        </div>
    );
}

// Item Keranjang (Cart Item)
function CartItem({ item, onQtyChange, onDelete, onToggleCheck }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:shadow-md transition-shadow duration-200 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onToggleCheck(item.id)}
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300 cursor-pointer"
                />

                <div className="flex items-center gap-3">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-stone-200 bg-stone-50"
                    />
                    <div>
                        <span className="text-[10px] font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                            {item.supplier}
                        </span>
                        <h3 className="font-semibold text-stone-800 text-sm mt-1 sm:text-base">{item.name}</h3>
                        <p className="text-xs text-stone-400 mt-0.5">{item.weight} kg / unit</p>
                        <p className="text-sm font-bold text-stone-800 mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                {/* Qty Changer */}
                <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                    <button
                        onClick={() => onQtyChange(item.id, -1)}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                    >
                        -
                    </button>
                    <span className="px-3 text-sm font-semibold text-stone-800 w-8 text-center">{item.qty}</span>
                    <button
                        onClick={() => onQtyChange(item.id, 1)}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                    >
                        +
                    </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                    <p className="text-xs text-stone-400">Subtotal</p>
                    <p className="text-sm font-bold text-emerald-700">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                </div>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(item.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

// Ringkasan Pembayaran (Checkout Summary)
function CheckoutSummary({ selectedCount, totalWeight, subtotal, deliveryFee, onCheckout }) {
    const totalPayment = subtotal > 0 ? subtotal + deliveryFee : 0;

    return (
        <div className="bg-stone-50/50 rounded-2xl border border-stone-200 p-6 flex flex-col gap-4 sticky top-24 shadow-sm">
            <h3 className="text-lg font-bold text-stone-800 border-b border-stone-200 pb-3">Ringkasan Belanja</h3>

            <div className="flex justify-between text-sm text-stone-600">
                <span>Total Barang Terpilih</span>
                <span className="font-semibold text-stone-800">{selectedCount} Item</span>
            </div>

            <div className="flex justify-between text-sm text-stone-600">
                <span>Estimasi Berat</span>
                <span className="font-semibold text-stone-800">{totalWeight.toFixed(2)} kg</span>
            </div>

            <div className="flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between text-sm text-stone-600">
                <span>Biaya Pengiriman (Cargo Tani)</span>
                <span className="font-semibold text-stone-800">
                    {subtotal > 0 ? `Rp ${deliveryFee.toLocaleString('id-ID')}` : 'Rp 0'}
                </span>
            </div>

            <div className="border-t border-dashed border-stone-200 my-2"></div>

            <div className="flex justify-between items-center">
                <span className="text-base font-bold text-stone-800">Total Pembayaran</span>
                <span className="text-xl font-bold text-emerald-700">Rp {totalPayment.toLocaleString('id-ID')}</span>
            </div>

            <button
                onClick={onCheckout}
                disabled={selectedCount === 0}
                className={`w-full mt-4 py-3.5 rounded-xl font-semibold text-center transition-all duration-200 shadow-md ${selectedCount > 0
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer shadow-emerald-100 hover:shadow-lg'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
            >
                Konfirmasi Pesanan
            </button>

            <p className="text-center text-[11px] text-stone-400">
                Transaksi aman didukung oleh AgriPay Escrow.
            </p>
        </div>
    );
}

// Timeline Pelacakan Barang
function OrderTimeline({ steps, currentStep }) {
    return (
        <div className="py-6">
            {/* Horizontal Steps (Desktop) */}
            <div className="hidden md:flex items-center justify-between relative w-full px-4">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -translate-y-1/2 z-0"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, idx) => {
                    const isCompleted = idx <= currentStep;
                    const isActive = idx === currentStep;

                    return (
                        <div key={idx} className="flex flex-col items-center relative z-10 w-32 text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow transition-all duration-300 ${isCompleted
                                ? 'bg-emerald-500 text-white border-2 border-white'
                                : 'bg-white text-stone-400 border-2 border-stone-200'
                                } ${isActive ? 'ring-4 ring-emerald-100 scale-110' : ''}`}>
                                {isCompleted ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[11px] font-semibold mt-2.5 transition-colors ${isCompleted ? 'text-emerald-700 font-bold' : 'text-stone-400'
                                }`}>
                                {step.label}
                            </span>
                            <span className="text-[9px] text-stone-400 mt-0.5">{step.time || ''}</span>
                        </div>
                    );
                })}
            </div>

            {/* Vertical Steps (Mobile) */}
            <div className="flex md:hidden flex-col gap-6 pl-4">
                {steps.map((step, idx) => {
                    const isCompleted = idx <= currentStep;
                    const isActive = idx === currentStep;

                    return (
                        <div key={idx} className="flex gap-4 relative">
                            {idx < steps.length - 1 && (
                                <div className={`absolute left-[11px] top-6 w-0.5 h-10 ${idx < currentStep ? 'bg-emerald-500' : 'bg-stone-200'
                                    }`}></div>
                            )}

                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isCompleted
                                ? 'bg-emerald-500 text-white'
                                : 'bg-stone-200 text-stone-400'
                                } ${isActive ? 'ring-4 ring-emerald-100 scale-105' : ''}`}>
                                {isCompleted ? '✓' : idx + 1}
                            </div>

                            <div>
                                <p className={`text-xs font-semibold ${isCompleted ? 'text-emerald-700' : 'text-stone-400'
                                    }`}>
                                    {step.label}
                                </p>
                                <p className="text-[10px] text-stone-400">{step.time || ''}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ==========================================
// 3. TAMPILAN HALAMAN (PAGES / VIEWS)
// ==========================================

// --- HALAMAN CART ---
function CartView({ cartItems, onQtyChange, onDelete, onToggleCheck, onCheckout }) {
    const selectedItems = cartItems.filter(item => item.checked);
    const selectedCount = selectedItems.reduce((acc, item) => acc + item.qty, 0);
    const totalWeight = selectedItems.reduce((acc, item) => acc + (item.weight * item.qty), 0);
    const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const deliveryFee = totalWeight > 0 ? Math.ceil(totalWeight) * 12000 : 0;

    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Hero Section */}
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

            {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-200 max-w-lg mx-auto">
                    <span className="text-6xl block mb-4">🛒</span>
                    <h3 className="text-lg font-bold text-stone-700">Keranjang masih kosong</h3>
                    <p className="text-stone-400 text-sm mt-1">Mari temukan hasil tani terbaik dari para petani lokal kami.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onQtyChange={onQtyChange}
                                onDelete={onDelete}
                                onToggleCheck={onToggleCheck}
                            />
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <CheckoutSummary
                            selectedCount={selectedCount}
                            totalWeight={totalWeight}
                            subtotal={subtotal}
                            deliveryFee={deliveryFee}
                            onCheckout={onCheckout}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// --- HALAMAN ORDER STATUS ---
function OrderStatusView({ orders }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
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
                            Status <span className="text-amber-400">Pengiriman</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-base md:text-lg text-emerald-100/80 max-w-xl font-medium leading-relaxed mt-3">
                            Pantau pergerakan produk agrobisnis Anda langsung dari ladang ke meja makan.
                        </p>
                    </div>


                </div>
            </div>

            <div className="flex flex-col gap-8">
                {orders.map((order) => {
                    const isCompleted = order.currentStep === order.steps.length - 1;

                    return (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="bg-stone-50/70 border-b border-stone-150 px-6 py-4 flex flex-wrap justify-between items-center gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono bg-stone-200 text-stone-700 px-2 py-1 rounded">
                                        ID: {order.orderId}
                                    </span>
                                    <span className="text-xs text-stone-500">
                                        Estimasi tiba: <strong className="text-stone-700">{order.estimation}</strong>
                                    </span>
                                </div>

                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isCompleted
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                    }`}>
                                    {order.badgeText}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={order.image}
                                        alt={order.name}
                                        className="w-14 h-14 object-cover rounded-xl border border-stone-200 bg-stone-50"
                                    />
                                    <div>
                                        <h3 className="font-bold text-stone-800 text-base">{order.name}</h3>
                                        <p className="text-xs text-stone-400">Petani: {order.supplier} • {order.qty} unit ({order.weight * order.qty} kg)</p>
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                                    <OrderTimeline steps={order.steps} currentStep={order.currentStep} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// --- HALAMAN REVIEW ---
function ReviewView({ reviewsData, onAddReview }) {
    const [selectedProduct, setSelectedProduct] = useState("Beras Organik Premium");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [photoSelected, setPhotoSelected] = useState(false);

    const productOptions = [
        "Beras Organik Premium",
        "Bibit Cabai Premium Pack",
        "Sayuran Hidroponik",
        "Pupuk Organik"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment) return;

        onAddReview({
            id: Date.now(),
            product: selectedProduct,
            author: "Dhea Salsa Winanda (Anda)",
            rating,
            comment,
            date: "Baru saja",
            hasImage: photoSelected
        });

        setComment("");
        setRating(5);
        setPhotoSelected(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
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
                            Ulasan & <span className="text-amber-400">Rating</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-base md:text-lg text-emerald-100/80 max-w-xl font-medium leading-relaxed mt-3">
                            Berikan feedback terbaik Anda untuk membantu memajukan petani mitra kami.
                        </p>
                    </div>


                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Form Review */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm  top-24">
                    <h3 className="text-lg font-bold text-stone-800 mb-4">Beri Ulasan</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs font-semibold text-stone-500 block mb-1">Pilih Produk</label>
                            <select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="w-full text-sm border-stone-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                {productOptions.map((p, idx) => (
                                    <option key={idx} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-stone-500 block mb-1.5">Rating Bintang</label>
                            <RatingStars rating={rating} setRating={setRating} interactive={true} size="w-7 h-7" />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-stone-500 block mb-1">Komentar / Pengalaman Anda</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Bagikan pengalaman tentang kesegaran produk atau respon petani..."
                                className="w-full text-sm border-stone-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 h-24 p-2.5 text-stone-800"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-stone-500 block mb-1.5">Foto Produk (Opsional)</label>
                            <div
                                onClick={() => setPhotoSelected(!photoSelected)}
                                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${photoSelected
                                    ? 'border-emerald-500 bg-emerald-50/50'
                                    : 'border-stone-200 hover:border-emerald-500'
                                    }`}
                            >
                                <span className="text-2xl block mb-1">📸</span>
                                <span className="text-xs text-stone-500 block">
                                    {photoSelected ? '✓ Foto_Tani.jpg terpilih' : 'Klik untuk simulasi upload foto'}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors mt-2 shadow-sm"
                        >
                            Kirim Ulasan
                        </button>
                    </form>
                </div>

                {/* List Review */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center gap-6 justify-around">
                        <div className="text-center">
                            <span className="text-4xl font-extrabold text-stone-800">4.8</span>
                            <p className="text-xs text-stone-400 mt-1">dari 5 bintang</p>
                            <div className="mt-1 flex justify-center">
                                <RatingStars rating={5} />
                            </div>
                        </div>

                        <div className="h-px sm:h-12 w-24 sm:w-px bg-stone-300"></div>

                        <div className="text-center">
                            <span className="text-2xl font-bold text-stone-700">{reviewsData.length}</span>
                            <p className="text-xs text-stone-400 mt-1">Ulasan Pembeli Terverifikasi</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {reviewsData.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-5 rounded-2xl border border-stone-150 shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-0.5"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-stone-800 text-sm">{item.author}</h4>
                                        <p className="text-[10px] text-stone-400">{item.date} • membeli <strong className="text-emerald-700">{item.product}</strong></p>
                                    </div>
                                    <RatingStars rating={item.rating} size="w-4 h-4" />
                                </div>

                                <p className="text-stone-600 text-sm leading-relaxed">{item.comment}</p>

                                {item.hasImage && (
                                    <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex items-center justify-center text-stone-400 font-bold text-xs">
                                        [Foto UI]
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 4. MAIN APP CONTROLLER (EXPORTS AS DEFAULT)
// ==========================================
export default function MCart() {
    const [activeTab, setActiveTab] = useState('cart');
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [reviewsData, setReviewsData] = useState(INITIAL_REVIEWS);

    // LOGIKA KERANJANG (CART)
    const handleQtyChange = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const handleDelete = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleToggleCheck = (id) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        }));
    };

    const handleCheckout = () => {
        const selected = cartItems.filter(item => item.checked);
        alert(`Checkout Berhasil! ${selected.length} pesanan baru telah dibuat.`);

        // Hapus barang terpilih dari keranjang
        setCartItems(prev => prev.filter(item => !item.checked));

        // Arahkan ke halaman Status Pengiriman
        setActiveTab('pesanan');
    };

    // LOGIKA ULASAN (REVIEWS)
    const handleAddReview = (newReview) => {
        setReviewsData(prev => [newReview, ...prev]);
    };

    // Hitung jumlah barang unik di dalam keranjang untuk Badge
    const cartBadgeCount = cartItems.length;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col justify-between">
                {/* GLOBAL NAVBAR */}

                <nav className="bg-white border-b border-stone-100  top-0  shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Logo */}


                            {/* Navigasi Desktop & Mobile Links */}
                            <div className="flex space-x-6 sm:space-x-8 items-center">
                                <button
                                    onClick={() => setActiveTab('cart')}
                                    className={`relative pb-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${activeTab === 'cart'
                                        ? 'text-emerald-600 border-b-2 border-emerald-600 font-semibold'
                                        : 'text-stone-500 hover:text-emerald-600'
                                        }`}
                                >
                                    Cart
                                    {cartBadgeCount > 0 && (
                                        <span className="absolute -top-2 -right-4 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                            {cartBadgeCount}
                                        </span>
                                    )}
                                </button>

                                <button
                                    onClick={() => setActiveTab('pesanan')}
                                    className={`pb-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${activeTab === 'pesanan'
                                        ? 'text-emerald-600 border-b-2 border-emerald-600 font-semibold'
                                        : 'text-stone-500 hover:text-emerald-600'
                                        }`}
                                >
                                    Pesanan Saya
                                </button>

                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`pb-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${activeTab === 'profile'
                                        ? 'text-emerald-600 border-b-2 border-emerald-600 font-semibold'
                                        : 'text-stone-500 hover:text-emerald-600'
                                        }`}
                                >
                                    Beri Ulasan
                                </button>
                            </div>

                        </div>
                    </div>
                </nav>

                {/* DYNAMIC CONTENT ROUTER */}
                <main className="flex-grow">
                    {activeTab === 'cart' && (
                        <CartView
                            cartItems={cartItems}
                            onQtyChange={handleQtyChange}
                            onDelete={handleDelete}
                            onToggleCheck={handleToggleCheck}
                            onCheckout={handleCheckout}
                        />
                    )}

                    {activeTab === 'pesanan' && (
                        <OrderStatusView orders={orders} />
                    )}

                    {activeTab === 'profile' && (
                        <ReviewView
                            reviewsData={reviewsData}
                            onAddReview={handleAddReview}
                        />
                    )}
                </main>


            </div>
        </>
    );
}