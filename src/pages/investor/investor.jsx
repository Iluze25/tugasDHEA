import React, { useState, useMemo, useEffect } from 'react';
import {
    Sprout,
    LayoutDashboard,
    Store,
    BriefcaseBusiness,
    ChartNoAxesCombined,
    MessageCircle,
    ReceiptText,
    WalletCards,
    Bell,
    Settings,
    CheckCircle2,
    ChevronRight,
    TrendingUp,
    MapPin,
    Calendar,
    DollarSign,
    AlertTriangle,
    Award,
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Filter,
    Send,
    Image,
    Paperclip,
    Check,
    Menu,
    X,
    Leaf,
    Globe
} from 'lucide-react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// =========================================================================
// 1. DUMMY DATA (investorData) - TETAP DAN SAMA PERSIS
// =========================================================================
const investorData = {
    profile: {
        id: "inv-001",
        name: "Dhea Salsa Winanda",
        photo: "https://scontent.fcgk22-2.fna.fbcdn.net/v/t39.30808-1/488921436_1453267752705007_5864091378705276613_n.jpg?stp=c0.0.742.742a_dst-jpg_tt6&cstp=mx742x742&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_ohc=xkMjZJO6p1cQ7kNvwFmrgUt&_nc_oc=AdrDY-Cy6fPYnpKQdO2xW2OTAAU54TgNEjpXp9LNAL2yegQdSAqNuGz7qyKI5C95GH4&_nc_zt=24&_nc_ht=scontent.fcgk22-2.fna&_nc_gid=Oxd51FzrsG_BBA9T92UnKA&_nc_ss=7c2a8&oh=00_AQAHGBKBcJ-knha7fOX1kzVp8tKcQqiQV3xV3wWuO33wIw&oe=6A55594E",
        location: "Tasikmalaya, Jawa Barat",
        email: "Dheasalsaxxx@gmail.com",
        rating: 4.9,
        verified: true
    },
    investmentSummary: {
        totalInvestment: 150000000,
        totalProfit: 8900000,
        activeProjects: 4,
        completedProjects: 1
    },
    projects: [
        {
            id: "prj-001",
            farmerId: "frm-001",
            farmer: "Pak Joko Susilo",
            farmerPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
            title: "Pemberdayaan Sawah Padi Pandanwangi",
            category: "Pangan",
            cropType: "Padi",
            location: "Cianjur, Jawa Barat",
            landPhoto: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
            description: "Pendanaan operasional untuk sarana produksi, pupuk organik, dan upah tenaga kerja tani padi aromatik varietas unggulan Pandanwangi di lahan seluas 2 hektar. Menggunakan metode SRI (System of Rice Intensification).",
            targetFund: 100000000,
            collectedFund: 100000000,
            roi: 14.5,
            harvestDate: "2026-10-15",
            duration: 4,
            risk: "Low",
            progress: 100,
            rating: 4.8,
            timeline: [
                { date: "2026-06-12", title: "Pengolahan Lahan", status: "Selesai" },
                { date: "2026-06-25", title: "Penanaman Bibit", status: "Selesai" },
                { date: "2026-08-15", title: "Pemupukan Susulan", status: "Selesai" },
                { date: "2026-10-15", title: "Estimasi Panen", status: "Mendatang" }
            ],
            documents: [
                { name: "Proposal Proyek Padi", type: "PDF" },
                { name: "Sertifikat Sewa Lahan", type: "PDF" }
            ]
        },
        {
            id: "prj-002",
            farmerId: "frm-002",
            farmer: "Bu Sri Utami",
            farmerPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
            title: "Greenhouse Tomat Cherry Premium",
            category: "Hortikultura",
            cropType: "Tomat",
            location: "Sukabumi, Jawa Barat",
            landPhoto: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600",
            description: "Pembangunan instalasi fertigasi hidroponik tetes modern di dalam greenhouse seluas 1.000 meter persegi untuk memproduksi Tomat Cherry kelas supermarket.",
            targetFund: 120000000,
            collectedFund: 45000000,
            roi: 18.0,
            harvestDate: "2027-02-01",
            duration: 6,
            risk: "Medium",
            progress: 37.5,
            rating: 4.9,
            timeline: [
                { date: "2026-08-05", title: "Pembangunan Pondasi", status: "Mendatang" }
            ],
            documents: [
                { name: "Analisis Finansial Hidroponik", type: "PDF" }
            ]
        },
        {
            id: "prj-003",
            farmerId: "frm-003",
            farmer: "Pak Wayan Sudarta",
            farmerPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
            title: "Sertifikasi Organik Kopi Arabika Kintamani",
            category: "Perkebunan",
            cropType: "Kopi",
            location: "Bangli, Bali",
            landPhoto: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
            description: "Persiapan audit dan pemeliharaan organik standar ekspor untuk perkebunan kopi arabika di lereng pegunungan Kintamani.",
            targetFund: 150000000,
            collectedFund: 150000000,
            roi: 16.0,
            harvestDate: "2026-09-15",
            duration: 8,
            risk: "Low",
            progress: 100,
            rating: 4.7,
            timeline: [
                { date: "2026-01-20", title: "Pemangkasan Naungan", status: "Selesai" },
                { date: "2026-05-10", title: "Audit Lapangan Pertama", status: "Selesai" }
            ],
            documents: [
                { name: "Studi Kelayakan Kopi Kintamani", type: "PDF" }
            ]
        }
    ],
    farmers: [
        {
            name: "Pak Joko Susilo",
            photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
            location: "Malang, Jawa Timur",
            experience: 18,
            specialization: ["Padi", "Jagung"],
            rating: 4.8,
            completedProjects: 12,
            totalManagedFund: 450000000,
            successRate: 95,
            certificates: [
                { name: "Sertifikasi Pertanian Presisi", issuer: "Kementan RI", year: 2023 }
            ],
            reviews: [
                { investorName: "Andi Wijaya", rating: 5, comment: "Hasil panen melimpah, pembagian dividen tepat waktu.", date: "2026-04-12" }
            ]
        }
    ],
    myInvestment: [
        {
            project: "Pemberdayaan Sawah Padi Pandanwangi",
            amount: 30000000,
            status: "Running",
            progress: 65,
            runningProfit: 1500000,
            paymentHistory: [
                { date: "2026-04-15", amount: 750000, type: "Dividen Pertama", status: "Sukses" },
                { date: "2026-06-15", amount: 750000, type: "Dividen Kedua", status: "Sukses" }
            ]
        },
        {
            project: "Ekspansi Kebun Sayuran Organik",
            amount: 20000000,
            status: "Completed",
            progress: 100,
            runningProfit: 2400000,
            paymentHistory: [
                { date: "2026-04-15", amount: 22400000, type: "Pokok + Profit", status: "Sukses" }
            ]
        }
    ],
    portfolio: {
        totalAsset: 158900000,
        profitChart: [
            { name: "Jan", Investasi: 50, Profit: 0 },
            { name: "Feb", Investasi: 100, Profit: 0 },
            { name: "Mar", Investasi: 150, Profit: 0 },
            { name: "Apr", Investasi: 150, Profit: 3.1 },
            { name: "Mei", Investasi: 150, Profit: 8.1 },
            { name: "Jun", Investasi: 150, Profit: 8.9 }
        ],
        commodityDistribution: [
            { name: "Padi", value: 30000000 },
            { name: "Kopi", value: 50000000 },
            { name: "Bawang Merah", value: 25000000 },
            { name: "Sayur Organik", value: 20000000 },
            { name: "Cabai", value: 25000000 }
        ],
        regionDistribution: [
            { name: "Cianjur", value: 50000000 },
            { name: "Bangli", value: 50000000 },
            { name: "Brebes", value: 50000000 }
        ],
        roiHistory: [
            { year: "2023", ROI: 12.4 },
            { year: "2024", ROI: 13.8 },
            { year: "2025", ROI: 14.5 },
            { year: "2026", ROI: 14.8 }
        ]
    },
    chat: [
        {
            farmer: "Pak Joko Susilo",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
            online: true,
            messages: [
                { sender: "farmer", text: "Selamat pagi Pak Budi. Berikut saya lampirkan foto pemupukan fase vegetatif.", time: "09:00" },
                { sender: "investor", text: "Terima kasih atas update-nya Pak Joko. Kelihatan subur sekali.", time: "09:05" }
            ]
        }
    ],
    notifications: [
        { title: "Bagi Hasil Diterima", message: "Bagi hasil dari Proyek Sayur Organik sebesar Rp2.400.000 sukses dikirim.", date: "2026-04-15", type: "PROFIT_SHARED" },
        { title: "Proyek Dimulai", message: "Proyek Sawah Padi Pandanwangi resmi dimulai.", date: "2026-02-10", type: "PROJECT_STARTED" },
        { title: "Pembaruan Tanaman", message: "Petani mengunggah foto perkembangan lahan kopi Kintamani.", date: "2026-03-01", type: "FARM_UPDATE" }
    ],
    transactions: [
        { type: "Investment", amount: 30000000, date: "2026-02-10", status: "Success", invoice: "TXN-20260210-001" },
        { type: "Deposit", amount: 100000000, date: "2026-02-05", status: "Success", invoice: "TXN-20260205-002" },
        { type: "Return", amount: 22400000, date: "2026-04-15", status: "Success", invoice: "TXN-20260415-008" }
    ],
    wallet: {
        balance: 15900000,
        depositHistory: [
            { amount: 50000000, date: "2026-01-10", status: "Success" },
            { amount: 100000000, date: "2026-02-05", status: "Success" }
        ],
        withdrawHistory: [
            { amount: 10000000, date: "2026-04-20", status: "Success" }
        ],
        bankAccount: {
            bankName: "BCA",
            accountNumber: "8012349000",
            accountHolder: "Dhea Salsa Winanda"
        }
    },
    settings: {
        security: {
            twoFactor: true,
            lastPasswordChange: "2026-01-12"
        },
        kyc: {
            status: "Verified",
            documentType: "e-KTP"
        },
        bank: {
            bankName: "BCA",
            accountNumber: "8012349000",
            accountHolder: "Dhea Salsa Winanda"
        },
        notificationPreference: {
            email: true,
            push: true
        }
    }
};

const COLOR_PALETTE = ['#059669', '#34D399', '#D97706', '#F59E0B', '#10B981'];

// =========================================================================
// 2. HELPER REUSABLE SUB-COMPONENTS (With Advanced Glassmorphism & Framer Motion)
// =========================================================================

const MetricCard = ({ title, value, icon: Icon, detail, highlight }) => (
    <motion.div
        whileHover={{ y: -6, scale: 1.02, boxShadow: "0px 10px 30px rgba(5, 150, 105, 0.08)" }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm flex items-center justify-between transition-all duration-300 group cursor-pointer"
    >
        {/* Inner Ambient Glow */}
        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500" />

        <div className="space-y-1 z-10">
            <p className="text-xs text-[#064E3B]/70 font-semibold tracking-wider uppercase transition-colors group-hover:text-[#064E3B]">{title}</p>
            <h3 className={`text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 ${highlight ? 'text-[#D97706]' : 'text-[#064E3B]'}`}>
                {value}
            </h3>
            {detail && <p className="text-xs text-slate-400 font-medium">{detail}</p>}
        </div>
        <div className="p-3.5 rounded-xl bg-white/80 border border-emerald-500/10 shadow-sm transition-all duration-300 group-hover:bg-emerald-500/10 z-10">
            <Icon className="w-6 h-6 text-[#D97706] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
        </div>
    </motion.div>
);

const ProjectCard = ({ project, onSelect }) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.015, boxShadow: "0px 15px 35px rgba(6, 78, 59, 0.08)" }}
        className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-300 group"
    >
        <div className="relative h-44 overflow-hidden">
            <img
                src={project.landPhoto}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-[#064E3B]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {project.category}
            </div>
            <div className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${project.progress >= 100 ? 'bg-[#D97706] text-white' : 'bg-[#059669] text-white'}`}>
                {project.progress >= 100 ? 'Running' : 'Funding'}
            </div>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#064E3B] line-clamp-1 transition-colors duration-300 group-hover:text-[#059669]">{project.title}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {project.location}
                </p>
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Terkumpul</span>
                    <span className="text-[#064E3B]">Rp{(project.collectedFund / 1000000).toFixed(1)}M / Rp{(project.targetFund / 1000000).toFixed(1)}M</span>
                </div>
                <div className="w-full bg-slate-100/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#059669] h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min(project.progress, 100)}%` }} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-emerald-500/10 pt-3 text-center">
                <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">ROI Estimasi</span>
                    <p className="text-sm font-bold text-[#D97706]">{project.roi}%</p>
                </div>
                <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Tenor</span>
                    <p className="text-sm font-bold text-[#064E3B]">{project.duration} Bulan</p>
                </div>
            </div>

            <button
                onClick={() => onSelect(project.id)}
                className="w-full py-2.5 bg-gradient-to-r from-[#064E3B] to-[#059669] hover:shadow-lg hover:shadow-emerald-900/15 text-white font-semibold rounded-xl text-xs transition-all duration-300 flex items-center justify-center gap-2"
            >
                <span>Lihat Detail</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>
    </motion.div>
);

// =========================================================================
// 3. MAIN COMPONENT (InvestorDashboard)
// =========================================================================
export default function InvestorDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedFarmerName, setSelectedFarmerName] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // States untuk filter di halaman Marketplace
    const [searchQuery, setSearchQuery] = useState('');
    const [cropFilter, setCropFilter] = useState('');
    const [riskFilter, setRiskFilter] = useState('');

    // States Simulasi Wallet
    const [walletBalance, setWalletBalance] = useState(investorData.wallet.balance);
    const [topupAmount, setTopupAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    // States Chat
    const [chatList, setChatList] = useState(investorData.chat);
    const [newMessage, setNewMessage] = useState('');

    // Navigasi ke halaman detail
    const handleViewProject = (id) => {
        setSelectedProjectId(id);
        setActiveTab('project-detail');
    };

    const handleViewFarmer = (name) => {
        setSelectedFarmerName(name);
        setActiveTab('farmer-profile');
    };

    // Navigasi Standar
    const handleMenuClick = (tab) => {
        setActiveTab(tab);
        setSelectedProjectId(null);
        setSelectedFarmerName(null);
        setMobileMenuOpen(false);
    };

    // Memfilter daftar proyek untuk Marketplace
    const filteredProjects = useMemo(() => {
        return investorData.projects.filter(project => {
            const matchSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCrop = cropFilter ? project.cropType === cropFilter : true;
            const matchRisk = riskFilter ? project.risk === riskFilter : true;
            return matchSearch && matchCrop && matchRisk;
        });
    }, [searchQuery, cropFilter, riskFilter]);

    // Simulasi Pengiriman Chat
    const handleSendChat = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const updatedChats = [...chatList];
        updatedChats[0].messages.push({
            sender: 'investor',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setChatList(updatedChats);
        setNewMessage('');
    };

    // Simulasi Transaksi Wallet Topup
    const handleTopup = (e) => {
        e.preventDefault();
        const amount = parseInt(topupAmount, 10);
        if (!amount || amount <= 0) return;
        setWalletBalance(prev => prev + amount);
        investorData.transactions.unshift({
            type: "Deposit",
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            status: "Success",
            invoice: `TXN-${Date.now().toString().slice(-6)}`
        });
        setTopupAmount('');
        alert('Simulasi deposit berhasil dilakukan.');
    };

    // Simulasi Transaksi Wallet Withdraw
    const handleWithdraw = (e) => {
        e.preventDefault();
        const amount = parseInt(withdrawAmount, 10);
        if (!amount || amount <= 0) return;
        if (amount > walletBalance) {
            alert('Saldo tidak mencukupi untuk penarikan ini.');
            return;
        }
        setWalletBalance(prev => prev - amount);
        investorData.transactions.unshift({
            type: "Withdraw",
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            status: "Success",
            invoice: `TXN-${Date.now().toString().slice(-6)}`
        });
        setWithdrawAmount('');
        alert('Simulasi penarikan berhasil diajukan.');
    };

    const menuItems = [
        { name: "Dashboard", id: "dashboard", icon: LayoutDashboard },
        { name: "Marketplace Proyek", id: "marketplace", icon: Store },
        { name: "Investasi Saya", id: "investments", icon: BriefcaseBusiness },
        { name: "Portofolio", id: "portfolio", icon: ChartNoAxesCombined },
        { name: "Chat", id: "chat", icon: MessageCircle },
        { name: "Notifikasi", id: "notifications", icon: Bell },
        { name: "Riwayat Transaksi", id: "transactions", icon: ReceiptText },
        { name: "Dompet", id: "wallet", icon: WalletCards },
        { name: "Pengaturan Akun", id: "settings", icon: Settings }
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-tr from-[#ecfdf5] via-[#e0f2fe] to-[#d1fae5] flex flex-col font-sans overflow-x-hidden">

            {/* =========================================================================
          AMBIENT FLOATING BACKGROUND ELEMENTS & GLOWING BLOBS
          ========================================================================= */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Moving Blobs */}
                <motion.div
                    animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-300/25 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ x: [0, -30, 30, 0], y: [0, 50, -30, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-teal-300/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, 20, -10, 0], y: [0, 30, -20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-[#D97706]/5 rounded-full blur-[90px]"
                />

                {/* Floating Sprouts & Leaves Particles */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-28 left-[10%] opacity-20 text-[#059669]"
                >
                    <Leaf className="w-12 h-12" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-40 right-[8%] opacity-15 text-teal-600"
                >
                    <Sprout className="w-14 h-14" />
                </motion.div>
            </div>

            {/* =========================================================================
          PC NAVBAR (Horizontal - Glassmorphism, Hanya Desktop >= 1024px)
          ========================================================================= */}
            <header className="hidden lg:flex bg-white/70 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50 shadow-sm">
                <div className="max-w-[1600px] w-full mx-auto px-8 h-20 flex items-center justify-between">

                    {/* Logo & Identitas */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleMenuClick('dashboard')}>
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-2.5 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md shadow-emerald-500/10">
                            <Sprout className="w-5.5 h-5.5 text-white" />
                        </div>
                        <div>
                            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-950 via-teal-800 to-[#D97706] bg-clip-text text-transparent">
                                AgroInvest
                            </span>
                            <p className="text-[9px] text-[#059669] tracking-wider uppercase font-extrabold leading-none mt-0.5">
                                Modern Agritech Platform
                            </p>
                        </div>
                    </div>

                    {/* Sektor Tengah: Menu Navigasi Horizontal Desktop */}
                    <div className="flex items-center gap-1.5 xl:gap-2">
                        {menuItems.map((item) => {
                            const isActive = activeTab === item.id;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all duration-300 text-xs xl:text-sm font-bold hover:-translate-y-[1px] active:scale-[0.98] ${isActive
                                        ? 'bg-[#059669] text-white shadow-lg shadow-emerald-600/15'
                                        : 'text-emerald-950/75 hover:bg-emerald-500/10 hover:text-emerald-950'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#D97706]' : 'text-emerald-950/60'}`} />
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Sektor Kanan: Info Profil Mini Desktop */}
                    <div className="flex items-center gap-4 border-l border-emerald-950/10 pl-5">
                        <div className="text-right">
                            <p className="text-sm font-bold text-emerald-950 leading-none">{investorData.profile.name}</p>
                            <div className="mt-1.5 flex items-center justify-end gap-1">
                                <span className="bg-gradient-to-r from-[#D97706]/15 to-[#D97706]/5 text-[#D97706] border border-[#D97706]/20 px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase flex items-center gap-0.5">
                                    <CheckCircle2 className="w-3 h-3 text-[#D97706] fill-current" /> Verified
                                </span>
                            </div>
                        </div>
                        <img
                            src={investorData.profile.photo}
                            alt="Avatar"
                            onClick={() => handleMenuClick('settings')}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/30 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm"
                        />
                    </div>

                </div>
            </header>

            {/* =========================================================================
          MOBILE NAVBAR HEADER (Hanya Mobile < 1024px)
          ========================================================================= */}
            <header className="lg:hidden flex items-center justify-between bg-white/80 backdrop-blur-md text-emerald-950 p-4 shadow-sm sticky top-0 z-40 border-b border-white/20">
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleMenuClick('dashboard')}>
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-1.5 rounded-lg">
                        <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-950 to-teal-800 bg-clip-text text-transparent">AgroInvest</span>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 bg-emerald-500/10 rounded-lg text-emerald-950 hover:text-[#D97706] transition-colors focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* =========================================================================
          MOBILE SIDEBAR DRAWER (Meluncur dari Kiri)
          ========================================================================= */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        {/* Backdrop Gelap */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Sidebar Panel Slider */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 max-w-xs flex flex-col bg-[#064E3B] text-white shadow-2xl z-50"
                        >
                            <div className="p-5 border-b border-[#043E2F] flex items-center justify-between bg-[#033B2C]/50">
                                <div className="flex items-center gap-2.5">
                                    <Sprout className="w-5 h-5 text-[#D97706]" />
                                    <span className="font-extrabold text-base">Menu AgroInvest</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-1.5 bg-[#043E2F] rounded-lg text-white hover:text-[#D97706] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                                {menuItems.map((item) => {
                                    const isActive = activeTab === item.id;
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleMenuClick(item.id)}
                                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-[#059669] text-white font-bold border-l-4 border-[#D97706]'
                                                : 'text-gray-300 hover:bg-[#043E2F] hover:text-[#D97706]'
                                                }`}
                                        >
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-[#D97706]' : 'text-gray-300'}`} />
                                            <span className="text-sm">{item.name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="p-4 border-t border-[#043E2F] bg-[#033B2C]/50 flex items-center gap-3">
                                <img src={investorData.profile.photo} alt="Avatar" className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#D97706]/40" />
                                <div>
                                    <h4 className="text-sm font-semibold truncate text-white">{investorData.profile.name}</h4>
                                    <span className="bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/20 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase mt-0.5 inline-block">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>

            {/* =========================================================================
          4. UTAMA LAYOUT CONTENT (Dengan Efek Glassmorphism & Framer Motion)
          ========================================================================= */}
            <div className="max-w-[1600px] w-full mx-auto flex flex-1 relative z-10 px-4 lg:px-8 py-8">
                <main className="flex-1 overflow-x-hidden space-y-8">

                    {/* A. VIEW DETAIL PROYEK */}
                    {activeTab === 'project-detail' && selectedProjectId && (
                        <ProjectDetailView
                            projectId={selectedProjectId}
                            onBack={() => handleMenuClick('marketplace')}
                            onViewFarmer={handleViewFarmer}
                            walletBalance={walletBalance}
                            setWalletBalance={setWalletBalance}
                        />
                    )}

                    {/* B. VIEW PROFIL PETANI */}
                    {activeTab === 'farmer-profile' && selectedFarmerName && (
                        <FarmerProfileView
                            farmerName={selectedFarmerName}
                            onBack={() => handleMenuClick('marketplace')}
                        />
                    )}

                    {/* C. VIEW DASHBOARD */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">

                            {/* STARTUP HERO SECTION */}
                            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-[#033B2C] to-emerald-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                                <div className="space-y-4 max-w-2xl text-center lg:text-left z-10">
                                    <motion.h1
                                        initial={{ opacity: 0, y: -20, letterSpacing: "-0.02em" }}
                                        animate={{ opacity: 1, y: 0, letterSpacing: "0.01em" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-[#D97706] bg-clip-text text-transparent leading-tight"
                                    >
                                        Grow Future Agriculture Investment
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-slate-300 text-sm lg:text-base leading-relaxed"
                                    >
                                        Gabungkan potensi alam dengan instrumen finansial berteknologi presisi. Berinvestasi pada ketahanan pangan berkelanjutan hari ini untuk imbal hasil bernilai tinggi di masa depan.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2"
                                    >
                                        <button
                                            onClick={() => handleMenuClick('marketplace')}
                                            className="px-6 py-3 bg-gradient-to-r from-[#D97706] to-amber-500 text-emerald-950 font-black rounded-xl text-xs tracking-wider uppercase transition-all hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 duration-200"
                                        >
                                            Mulai Pendanaan
                                        </button>
                                        <button
                                            onClick={() => handleMenuClick('portfolio')}
                                            className="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/15 font-bold rounded-xl text-xs transition-all duration-200"
                                        >
                                            Lihat Analisis Portofolio
                                        </button>
                                    </motion.div>
                                </div>

                                {/* Hero Side Metric Card (Floating Card Effect) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 text-center space-y-4 w-full max-w-sm shrink-0 shadow-2xl relative"
                                >
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -top-6 -right-6 p-3 bg-gradient-to-br from-[#D97706] to-amber-500 rounded-xl shadow-lg border border-white/20"
                                    >
                                        <TrendingUp className="w-6 h-6 text-emerald-950" />
                                    </motion.div>

                                    <div className="space-y-1">
                                        <span className="text-[10px] text-slate-300 uppercase tracking-widest font-extrabold block">Proyeksi Rata-rata Imbal</span>
                                        <p className="text-4xl font-extrabold text-[#D97706] tracking-tight">14.8% <span className="text-xs text-white">ROI</span></p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
                                        <div>
                                            <p className="text-white font-extrabold text-sm">Rp150M+</p>
                                            <span>Dana Tersalur</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-extrabold text-sm">100%</p>
                                            <span>Panen Sukses</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Grid Kartu Metrik Utama */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                                <MetricCard
                                    title="Total Dana Tertanam"
                                    value={`Rp${investorData.investmentSummary.totalInvestment.toLocaleString('id-ID')}`}
                                    icon={DollarSign}
                                    detail="Akumulasi modal aktif"
                                />
                                <MetricCard
                                    title="Akumulasi Profit"
                                    value={`Rp${investorData.investmentSummary.totalProfit.toLocaleString('id-ID')}`}
                                    icon={TrendingUp}
                                    detail="Laba bersih terdistribusi"
                                    highlight
                                />
                                <MetricCard
                                    title="Proyek Berjalan"
                                    value={`${investorData.investmentSummary.activeProjects} Proyek`}
                                    icon={BriefcaseBusiness}
                                    detail="Sedang diawasi intensif"
                                />
                                <MetricCard
                                    title="Proyek Sukses Selesai"
                                    value={`${investorData.investmentSummary.completedProjects} Proyek`}
                                    icon={CheckCircle2}
                                    detail="Tingkat keberhasilan 100%"
                                />
                            </div>

                            {/* Sektor Grafik Utama & Notifikasi Cepat */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                <div className="xl:col-span-2 bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-extrabold text-base text-[#064E3B]">Perkembangan Pertumbuhan Portofolio</h3>
                                        <span className="text-xs font-bold text-[#D97706] flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4 animate-pulse" /> Rata-rata ROI: 14.8%
                                        </span>
                                    </div>
                                    <div className="h-72 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={investorData.portfolio.profitChart}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                                                <YAxis stroke="#94a3b8" fontSize={11} />
                                                <Tooltip formatter={(value) => `Rp${value} Juta`} />
                                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                                <Line type="monotone" dataKey="Investasi" stroke="#064E3B" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                                <Line type="monotone" dataKey="Profit" stroke="#D97706" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Notifikasi Terbaru */}
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow duration-300">
                                    <div>
                                        <h3 className="font-extrabold text-base text-[#064E3B] mb-4">Aktivitas Lahan Terbaru</h3>
                                        <div className="space-y-4">
                                            {investorData.notifications.slice(0, 3).map((notif, index) => (
                                                <div key={index} className="flex gap-3 items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0 hover:bg-white/50 transition-colors duration-200 rounded-lg p-1.5">
                                                    <div className="bg-[#D97706]/10 p-2 rounded-xl border border-[#D97706]/20">
                                                        <Sprout className="w-4 h-4 text-[#D97706]" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <h4 className="font-bold text-xs text-slate-800">{notif.title}</h4>
                                                        <p className="text-[11px] text-slate-500 leading-relaxed">{notif.message}</p>
                                                        <span className="text-[9px] text-slate-400 font-medium block mt-1">{notif.date}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleMenuClick('notifications')}
                                        className="w-full py-2.5 text-center text-xs font-bold text-[#064E3B] bg-white/80 hover:bg-[#064E3B] hover:text-white rounded-xl transition-all duration-300 border border-emerald-500/10"
                                    >
                                        Lihat Semua Aktivitas
                                    </button>
                                </div>
                            </div>

                            {/* Proyek Rekomendasi Unggulan */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-extrabold text-base text-[#064E3B]">Rekomendasi Pendanaan Unggulan</h3>
                                    <button onClick={() => handleMenuClick('marketplace')} className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 transition-transform hover:translate-x-1 duration-200">
                                        Masuk Marketplace <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {investorData.projects.slice(0, 3).map((project) => (
                                        <ProjectCard key={project.id} project={project} onSelect={handleViewProject} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* D. VIEW MARKETPLACE */}
                    {activeTab === 'marketplace' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-[#064E3B]">Marketplace Proyek Pertanian</h1>
                                <p className="text-sm text-slate-500">Pilih proyek usaha tani kredibel yang telah diverifikasi kelayakan risikonya.</p>
                            </div>

                            {/* Bar Filter & Pencarian */}
                            <div className="bg-white/70 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari judul proyek atau lokasi..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#064E3B] transition-all"
                                    />
                                </div>
                                <div className="flex w-full md:w-auto items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <Filter className="w-4 h-4 text-slate-400" />
                                        <span className="text-xs font-bold text-slate-500">Filter:</span>
                                    </div>

                                    {/* Filter Komoditas */}
                                    <select
                                        value={cropFilter}
                                        onChange={(e) => setCropFilter(e.target.value)}
                                        className="px-3 py-2 bg-white/60 border border-slate-100 rounded-xl text-xs font-semibold text-slate-600 focus:outline-none hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                        <option value="">Komoditas (Semua)</option>
                                        <option value="Padi">Padi</option>
                                        <option value="Tomat">Tomat</option>
                                        <option value="Kopi">Kopi</option>
                                    </select>

                                    {/* Filter Risiko */}
                                    <select
                                        value={riskFilter}
                                        onChange={(e) => setRiskFilter(e.target.value)}
                                        className="px-3 py-2 bg-white/60 border border-slate-100 rounded-xl text-xs font-semibold text-slate-600 focus:outline-none hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                        <option value="">Risiko (Semua)</option>
                                        <option value="Low">Low Risk</option>
                                        <option value="Medium">Medium Risk</option>
                                        <option value="High">High Risk</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grid List Proyek */}
                            {filteredProjects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProjects.map((project) => (
                                        <ProjectCard key={project.id} project={project} onSelect={handleViewProject} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-2xl border border-white/40">
                                    <p className="text-sm text-slate-400 font-semibold">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* E. VIEW INVESTASI SAYA */}
                    {activeTab === 'investments' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-[#064E3B]">Kepemilikan Investasi Saya</h1>
                                <p className="text-sm text-slate-500">Monitor kemajuan rill dan histori bagi hasil dari modal terdistribusi Anda.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {investorData.myInvestment.map((inv, idx) => (
                                    <div key={idx} className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center hover:shadow-md transition-all duration-300">
                                        <div className="space-y-3 flex-1 w-full">
                                            <div className="flex gap-2.5 items-center">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${inv.status === 'Running' ? 'bg-[#059669]/10 text-[#059669]' : 'bg-[#D97706]/10 text-[#D97706]'}`}>
                                                    {inv.status}
                                                </span>
                                                <h3 className="font-extrabold text-base text-[#064E3B]">{inv.project}</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                                                <div>Modal Tanam: <span className="text-[#064E3B]">Rp{inv.amount.toLocaleString('id-ID')}</span></div>
                                                <div>Laba Berjalan: <span className="text-[#D97706]">Rp{inv.runningProfit.toLocaleString('id-ID')}</span></div>
                                            </div>
                                            {/* Progres Fisik Lahan */}
                                            <div className="space-y-1 w-full max-w-md">
                                                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                                                    <span>Progres Fisik Lahan</span>
                                                    <span>{inv.progress}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100/50 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-[#059669] h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${inv.progress}%` }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Riwayat Dividen Proyek Ini */}
                                        <div className="w-full xl:w-96 space-y-2.5">
                                            <h4 className="text-xs font-bold text-[#064E3B] border-b border-emerald-500/10 pb-1.5">Riwayat Dividen Masuk</h4>
                                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                                {inv.paymentHistory.map((history, hIdx) => (
                                                    <div key={hIdx} className="flex justify-between items-center text-xs bg-white/60 border border-white/20 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                                                        <div>
                                                            <p className="font-bold text-slate-700">{history.type}</p>
                                                            <span className="text-[10px] text-slate-400 font-medium">{history.date}</span>
                                                        </div>
                                                        <span className="font-bold text-[#D97706]">+{history.amount.toLocaleString('id-ID')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* F. VIEW PORTOFOLIO */}
                    {activeTab === 'portfolio' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-[#064E3B]">Analisis & Sebaran Portofolio</h1>
                                <p className="text-sm text-slate-500">Visualisasi sebaran komoditas, lokasi regional, dan performa ROI tahunan.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                                <MetricCard title="Total Aset Portofolio" value={`Rp${investorData.portfolio.totalAsset.toLocaleString('id-ID')}`} icon={TrendingUp} highlight />
                                <MetricCard title="Rasio Bagi Hasil (ROI)" value="14.8%" icon={Award} />
                                <MetricCard title="Diversifikasi Wilayah" value="3 Regional" icon={MapPin} />
                                <MetricCard title="Diversifikasi Sektor" value="3 Sektor" icon={Sprout} />
                            </div>

                            {/* Sebaran Komoditas & Regional */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Sebaran Komoditas */}
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-sm text-[#064E3B]">Alokasi Dana Berdasarkan Komoditas</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={investorData.portfolio.commodityDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {investorData.portfolio.commodityDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `Rp${value.toLocaleString('id-ID')}`} />
                                                <Legend wrapperStyle={{ fontSize: 10 }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Sebaran Regional */}
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-sm text-[#064E3B]">Sebaran Geografis Lahan</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={investorData.portfolio.regionDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {investorData.portfolio.regionDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLOR_PALETTE[(index + 2) % COLOR_PALETTE.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `Rp${value.toLocaleString('id-ID')}`} />
                                                <Legend wrapperStyle={{ fontSize: 10 }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Historis ROI */}
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-sm text-[#064E3B]">Histori Imbal Hasil Tahunan (ROI)</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={investorData.portfolio.roiHistory}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                                                <YAxis stroke="#94a3b8" fontSize={11} />
                                                <Tooltip formatter={(value) => `${value}%`} />
                                                <Bar dataKey="ROI" fill="#059669" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* G. VIEW CHAT */}
                    {activeTab === 'chat' && (
                        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm overflow-hidden h-[600px] flex">
                            {/* Sisi Kiri: Daftar Petani */}
                            <div className="w-80 border-r border-slate-100 flex flex-col shrink-0">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                                    <h3 className="font-bold text-sm text-[#064E3B]">Kanal Diskusi Mitra</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {chatList.map((c, idx) => (
                                        <div key={idx} className="p-4 flex gap-3 items-center hover:bg-white/50 cursor-pointer transition-colors border-b border-slate-50">
                                            <div className="relative shrink-0">
                                                <img src={c.avatar} alt={c.farmer} className="w-10 h-10 rounded-xl object-cover" />
                                                {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></span>}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800">{c.farmer}</h4>
                                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Mitra Tani Padi</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sisi Kanan: Area Balon Chat */}
                            <div className="flex-1 flex flex-col justify-between">
                                {/* Header Chat */}
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-3">
                                        <img src={chatList[0].avatar} alt={chatList[0].farmer} className="w-9 h-9 rounded-xl object-cover" />
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-800">{chatList[0].farmer}</h4>
                                            <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Balon Pesan */}
                                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
                                    {chatList[0].messages.map((m, idx) => {
                                        const isInvestor = m.sender === 'investor';
                                        return (
                                            <div key={idx} className={`flex ${isInvestor ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed shadow-sm hover:scale-[1.01] transition-transform ${isInvestor ? 'bg-[#064E3B] text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-emerald-500/10'}`}>
                                                    <p>{m.text}</p>
                                                    <span className={`text-[9px] block mt-1.5 text-right ${isInvestor ? 'text-slate-300' : 'text-slate-400'}`}>
                                                        {m.time}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Area Input Chat */}
                                <form onSubmit={handleSendChat} className="p-4 border-t border-slate-100 flex items-center gap-3 bg-white/50 backdrop-blur-md">
                                    <button type="button" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[#064E3B] transition-all hover:scale-105 active:scale-95" title="Unggah Gambar">
                                        <Image className="w-5 h-5" />
                                    </button>
                                    <button type="button" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[#064E3B] transition-all hover:scale-105 active:scale-95" title="Sematkan Dokumen">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Tulis pesan untuk mitra tani Anda..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-white/60 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#064E3B] transition-all"
                                    />
                                    <button type="submit" className="p-2.5 bg-[#064E3B] hover:bg-[#059669] text-white rounded-xl transition-all hover:scale-105 active:scale-95">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* H. VIEW NOTIFIKASI */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-[#064E3B]">Pemberitahuan Sistem & Aktivitas Lahan</h1>
                                <p className="text-sm text-slate-500">Kelola dan lihat seluruh pembaruan status pembiayaan pertanian Anda.</p>
                            </div>

                            <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm divide-y divide-[#059669]/10">
                                {investorData.notifications.map((notif, index) => (
                                    <div key={index} className="p-6 flex gap-4 items-start hover:bg-white/50 transition-colors duration-200">
                                        <div className="bg-[#D97706]/10 p-3 rounded-xl border border-[#D97706]/20 shrink-0 animate-pulse">
                                            <Sprout className="w-5 h-5 text-[#D97706]" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-extrabold text-sm text-slate-800">{notif.title}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{notif.message}</p>
                                            <span className="text-[10px] text-slate-400 font-semibold block mt-1.5">{notif.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* I. VIEW RIWAYAT TRANSAKSI */}
                    {activeTab === 'transactions' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-[#064E3B]">Riwayat Transaksi Finansial</h1>
                                <p className="text-sm text-slate-500">Transparansi penuh pencatatan deposit, investasi, dan pengembalian profit.</p>
                            </div>

                            <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-emerald-500/10 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                                                <th className="p-4">Invoice</th>
                                                <th className="p-4">Tipe Transaksi</th>
                                                <th className="p-4">Tanggal</th>
                                                <th className="p-4">Jumlah</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4">Bukti Fisik</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#059669]/10 text-xs">
                                            {investorData.transactions.map((tx, idx) => (
                                                <tr key={idx} className="hover:bg-white/50 transition-colors">
                                                    <td className="p-4 font-mono font-bold text-slate-700">{tx.invoice}</td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center gap-1 font-semibold ${tx.type === 'Deposit' || tx.type === 'Return' ? 'text-emerald-700' : 'text-[#064E3B]'}`}>
                                                            {tx.type === 'Deposit' || tx.type === 'Return' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                            {tx.type}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-slate-400 font-semibold">{tx.date}</td>
                                                    <td className="p-4 font-bold text-slate-800">Rp{tx.amount.toLocaleString('id-ID')}</td>
                                                    <td className="p-4">
                                                        <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                                                            {tx.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <button className="text-xs font-bold text-[#D97706] hover:underline" onClick={() => alert('Bukti transaksi telah terverifikasi aman oleh platform.')}>
                                                            Lihat Bukti
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* J. VIEW DOMPET */}
                    {activeTab === 'wallet' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-[#064E3B]">Dompet Digital Investor</h1>
                                <p className="text-sm text-slate-500">Kelola pengisian saldo dan penarikan langsung ke rekening bank terdaftar Anda.</p>
                            </div>

                            {/* Sektor Wallet & Simulasi Transaksi */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Sisi Kiri: Saldo Tersedia */}
                                <div className="bg-gradient-to-br from-[#064E3B] to-[#059669] text-white p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between h-52 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10">
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <WalletCards className="w-32 h-32" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">Saldo Tersedia</span>
                                        <h2 className="text-3xl font-extrabold text-[#D97706] tracking-tight">Rp{walletBalance.toLocaleString('id-ID')}</h2>
                                    </div>
                                    <div className="border-t border-[#043E2F] pt-4 flex gap-6 text-xs text-slate-300 font-medium">
                                        <div>Bank Asosiasi: <span className="font-bold text-white">{investorData.wallet.bankAccount.bankName}</span></div>
                                        <div>Pemilik: <span className="font-bold text-white">{investorData.wallet.bankAccount.accountHolder}</span></div>
                                    </div>
                                </div>

                                {/* Sektor Tengah: Simulasi Deposit */}
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-sm text-[#064E3B]">Simulasi Deposit / Top Up</h3>
                                    <form onSubmit={handleTopup} className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-slate-400 uppercase font-bold">Jumlah Isi Saldo (Rp)</label>
                                            <input
                                                type="number"
                                                placeholder="Contoh: 10000000"
                                                value={topupAmount}
                                                onChange={(e) => setTopupAmount(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white/60 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none transition-all"
                                            />
                                        </div>
                                        <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-[#064E3B] to-[#059669] text-white rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95">
                                            Isi Saldo Sekarang
                                        </button>
                                    </form>
                                </div>

                                {/* Sektor Kanan: Simulasi Withdraw */}
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-sm text-[#064E3B]">Simulasi Penarikan Saldo</h3>
                                    <form onSubmit={handleWithdraw} className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-slate-400 uppercase font-bold">Jumlah Penarikan (Rp)</label>
                                            <input
                                                type="number"
                                                placeholder="Contoh: 5000000"
                                                value={withdrawAmount}
                                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white/60 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none transition-all"
                                            />
                                        </div>
                                        <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-[#D97706] to-amber-500 text-white rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95">
                                            Tarik Saldo Sekarang
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Riwayat Wallet */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-base text-[#064E3B]">Log Riwayat Kas Terakhir</h3>
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm divide-y divide-[#059669]/10">
                                    {investorData.wallet.depositHistory.map((dep, idx) => (
                                        <div key={idx} className="p-4 flex justify-between items-center text-xs hover:bg-white/50 transition-colors duration-200">
                                            <div className="flex gap-3 items-center">
                                                <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-700">
                                                    <ArrowDownLeft className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">Deposit Virtual Account</p>
                                                    <span className="text-[10px] text-slate-400 font-medium">{dep.date}</span>
                                                </div>
                                            </div>
                                            <span className="font-bold text-emerald-600">+Rp{dep.amount.toLocaleString('id-ID')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* K. VIEW PENGATURAN AKUN */}
                    {activeTab === 'settings' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-[#064E3B]">Pengaturan Profil & Keamanan</h1>
                                <p className="text-sm text-slate-500">Konfigurasikan perlindungan akun, informasi bank, dan data KYC Anda.</p>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Info Profil Utama */}
                                <div className="xl:col-span-2 bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-6 hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-sm text-[#064E3B] border-b border-[#059669]/10 pb-2">Informasi Profil</h3>
                                    <div className="flex flex-col md:flex-row gap-6 items-center">
                                        <img src={investorData.profile.photo} alt="Investor" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-500/25 transition-transform duration-300 hover:scale-105" />
                                        <div className="space-y-3 flex-1 w-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] text-slate-400 uppercase font-bold">Nama Lengkap</span>
                                                    <input type="text" defaultValue={investorData.profile.name} className="w-full px-3 py-2 bg-white/60 border border-slate-100 rounded-xl" disabled />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] text-slate-400 uppercase font-bold">Alamat Email</span>
                                                    <input type="text" defaultValue={investorData.profile.email} className="w-full px-3 py-2 bg-white/60 border border-slate-100 rounded-xl" disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* KYC & Keamanan Akun */}
                                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-6 hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-sm text-[#064E3B] border-b border-[#059669]/10 pb-2">Status Kredensial</h3>

                                    {/* KYC Verification Status */}
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-500">Verifikasi Identitas (KYC)</span>
                                        <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2.5 py-1 rounded-full font-extrabold flex items-center gap-1 animate-pulse">
                                            <Check className="w-3.5 h-3.5" /> {investorData.settings.kyc.status}
                                        </span>
                                    </div>

                                    {/* Bank Account */}
                                    <div className="space-y-2 border-t border-emerald-500/10 pt-4">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold">Rekening Terikat</span>
                                        <div className="p-3 bg-white/60 border border-slate-100 rounded-xl flex items-center justify-between text-xs hover:bg-slate-100 transition-colors">
                                            <div>
                                                <p className="font-bold text-slate-800">{investorData.settings.bank.bankName}</p>
                                                <span className="text-slate-400 font-semibold">{investorData.settings.bank.accountNumber}</span>
                                            </div>
                                            <span className="font-bold text-slate-500">{investorData.settings.bank.accountHolder}</span>
                                        </div>
                                    </div>

                                    {/* Notification preference switches */}
                                    <div className="space-y-3 border-t border-emerald-500/10 pt-4 text-xs">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Preferensi Saluran Notifikasi</span>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-slate-600">Notifikasi Email</span>
                                            <input type="checkbox" defaultChecked={investorData.settings.notificationPreference.email} className="w-4 h-4 accent-[#059669] cursor-pointer" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-slate-600">Notifikasi Push Handphone</span>
                                            <input type="checkbox" defaultChecked={investorData.settings.notificationPreference.push} className="w-4 h-4 accent-[#059669] cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

// =========================================================================
// 5. SUB-VIEWS (Halaman Detail & Profil Petani Terpisah dengan Animasi)
// =========================================================================

// DETAIL PROYEK VIEW
const ProjectDetailView = ({ projectId, onBack, onViewFarmer, walletBalance, setWalletBalance }) => {
    const project = investorData.projects.find(p => p.id === projectId);
    const [investAmount, setInvestAmount] = useState('');

    if (!project) return null;

    const handleInvest = (e) => {
        e.preventDefault();
        const amount = parseInt(investAmount, 10);
        if (!amount || amount < project.collectedFund * 0.01) {
            alert(`Minimal partisipasi investasi adalah Rp${(project.collectedFund * 0.01).toLocaleString('id-ID')}`);
            return;
        }
        if (amount > walletBalance) {
            alert('Sisa saldo dompet Anda tidak cukup. Harap top up saldo Anda terlebih dahulu.');
            return;
        }

        setWalletBalance(prev => prev - amount);
        investorData.transactions.unshift({
            type: "Investment",
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            status: "Success",
            invoice: `TXN-${Date.now().toString().slice(-6)}`
        });
        setInvestAmount('');
        alert('Sukses! Transaksi investasi Anda telah resmi tercatat di dalam platform.');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="text-xs font-bold text-[#064E3B] hover:underline flex items-center gap-1 transition-transform hover:-translate-x-0.5">
                ← Kembali ke Marketplace
            </button>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Detail Lahan & Deskripsi */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow group border border-white/30">
                        <img src={project.landPhoto} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 left-4 bg-[#064E3B]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                            {project.category}
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-bold text-[#064E3B]">{project.title}</h2>
                        <p className="text-xs text-slate-500 leading-relaxed">{project.description}</p>
                    </div>

                    {/* Timeline Proyek */}
                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-sm text-[#064E3B]">Tahapan Kerja (Timeline)</h3>
                        <div className="space-y-4">
                            {project.timeline.map((step, idx) => (
                                <div key={idx} className="flex gap-4 items-start border-l-2 border-slate-100 pl-4 relative">
                                    <div className={`absolute -left-1.5 w-3.5 h-3.5 rounded-full transition-transform duration-300 hover:scale-125 ${step.status === 'Selesai' ? 'bg-[#059669]' : 'bg-slate-200'}`} />
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800">{step.title}</h4>
                                        <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{step.date} - Status: {step.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Panel Investasi & Info Petani */}
                <div className="space-y-6">
                    {/* Action Invest */}
                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-6 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-sm text-[#064E3B] border-b border-emerald-500/10 pb-2">Partisipasi Modal</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">ROI Estimasi</span>
                                <p className="text-base font-bold text-[#D97706]">{project.roi}%</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Tenor Kerja</span>
                                <p className="text-base font-bold text-[#064E3B]">{project.duration} Bulan</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Terkumpul</span>
                                <span className="text-[#064E3B]">Rp{project.collectedFund.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#059669] h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${project.progress}%` }} />
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium">Dana terkumpul {project.progress}% dari total Rp{project.targetFund.toLocaleString('id-ID')}</p>
                        </div>

                        <form onSubmit={handleInvest} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-400 uppercase font-bold">Masukkan Nilai Investasi (Rp)</label>
                                <input
                                    type="number"
                                    placeholder="Contoh: 10000000"
                                    value={investAmount}
                                    onChange={(e) => setInvestAmount(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white/60 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none transition-all"
                                />
                            </div>
                            <button type="submit" className="w-full py-3 bg-[#064E3B] hover:bg-[#059669] text-white rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95">
                                Investasi Sekarang
                            </button>
                        </form>
                    </div>

                    {/* Profil Singkat Petani */}
                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-sm text-[#064E3B] border-b border-emerald-500/10 pb-2">Pengelola Lahan</h3>
                        <div className="flex gap-3 items-center">
                            <img src={project.farmerPhoto} alt={project.farmer} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 transition-transform duration-300 hover:scale-105" />
                            <div>
                                <h4 className="font-bold text-xs text-slate-800">{project.farmer}</h4>
                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Mitra Tani Berlisensi</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onViewFarmer(project.farmer)}
                            className="w-full py-2.5 bg-white/60 hover:bg-[#064E3B] hover:text-white border border-slate-100 rounded-xl text-xs font-bold text-[#064E3B] transition-all duration-300 active:scale-95"
                        >
                            Lihat Profil Petani
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

// PROFIL PETANI VIEW
const FarmerProfileView = ({ farmerName, onBack }) => {
    const farmer = investorData.farmers.find(f => f.name === farmerName) || investorData.farmers[0];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="text-xs font-bold text-[#064E3B] hover:underline flex items-center gap-1 transition-transform hover:-translate-x-0.5">
                ← Kembali ke Proyek
            </button>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Detail Biodata & Keahlian */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow">
                        <img src={farmer.photo} alt={farmer.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100 transition-transform hover:rotate-2 duration-300" />
                        <div className="space-y-2 flex-1 w-full">
                            <h2 className="text-xl font-bold text-[#064E3B]">{farmer.name}</h2>
                            <p className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                                <MapPin className="w-4 h-4 text-slate-400" /> {farmer.location}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {farmer.specialization.map((spec, index) => (
                                    <span key={index} className="bg-[#059669]/10 text-[#059669] border border-[#059669]/10 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all hover:scale-105 duration-200">
                                        Spesialis {spec}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sertifikat Kompetensi */}
                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-sm text-[#064E3B]">Sertifikat & Penghargaan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {farmer.certificates.map((cert, idx) => (
                                <div key={idx} className="p-4 bg-white/60 border border-slate-100 rounded-xl flex gap-3 items-center hover:bg-slate-100/50 transition-colors duration-200">
                                    <Award className="w-6 h-6 text-[#D97706] shrink-0" />
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800">{cert.name}</h4>
                                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{cert.issuer} ({cert.year})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ulasan Kepuasan Investor */}
                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-sm text-[#064E3B]">Ulasan Rekan Investor</h3>
                        <div className="space-y-4">
                            {farmer.reviews.map((rev, idx) => (
                                <div key={idx} className="p-4 bg-white/60 border border-slate-100 rounded-xl space-y-2 hover:bg-slate-100/50 transition-colors duration-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-800">{rev.investorName}</span>
                                        <div className="flex items-center gap-0.5 text-[#D97706]">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-xs font-bold">{rev.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Kinerja & Reputasi Angka */}
                <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-sm space-y-6 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-sm text-[#064E3B] border-b border-emerald-500/10 pb-2">Reputasi Keberhasilan</h3>

                        <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-4">
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold">Panen Sukses</span>
                                <p className="text-base font-bold text-[#064E3B]">{farmer.completedProjects} Kali</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold">Rasio Keberhasilan</span>
                                <p className="text-base font-bold text-emerald-600">{farmer.successRate}%</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Dana Terkelola</span>
                            <p className="text-xl font-bold text-[#D97706]">Rp{farmer.totalManagedFund.toLocaleString('id-ID')}</p>
                            <p className="text-[9px] text-slate-400 font-semibold">Telah terverifikasi aman oleh manajemen resiko.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};