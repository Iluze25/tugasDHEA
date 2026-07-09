import { useEffect, useRef, useState } from "react";
import "./style.css";
import { Menu, Leaf, Search, Bell, PackageCheck, Wallet, Star, ShoppingCart, Truck, Sprout, Tag, CheckCircle, MessageSquare, TrendingDown, RefreshCw, Package, Heart, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
    // Navgigate
    const navigate = useNavigate();


    // Menu Hamburger
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    // Notification Dropdown
    const [isNotification, setIsNotification] = useState(false);
    function toggleNotification() {
        setIsNotification(!isNotification);
    }

    return (
        <>
            <header id="navbar" className="sticky top-0 z-50 w-full bg-white/90">
                <nav className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
                    <button onClick={toggleMenu} className="lg:hidden text-green-700" aria-label="Menu">
                        <Menu />
                    </button>
                    <a onClick={() => navigate("/home")} className="flex items-center gap-2 shrink-0">
                        <span className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center"><Leaf style={{ width: "20px", height: "20px" }} /></span> <span className=" font-bold text-lg">agrovest</span>
                    </a>
                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 items-center bg-[#f1f6f1] rounded-full px-4 py-2 gap-2 max-w-md">
                        <Search className="text-green-600" style={{ width: "18px", height: "18px" }} />
                        <input placeholder="Cari produk" type="text" aria-label="Cari produk" className=" bg-transparent outline-none w-full text-sm" />
                    </div>

                    <div className="flex items-center gap-3 ml-auto">


                        {/* Notification */}
                        <div className="relative">
                            <button onClick={toggleNotification} className="relative text-green-800" aria-label="Notifikasi"><Bell />
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime-500 text-white text-[10px] flex items-center justify-center">10</span>
                            </button>
                            <div className={` h-[50vh] overflow-y-auto absolute right-0 mt-3 w-72 bg-white rounded-2xl card-shadow p-3 z-50 dropNotification ${isNotification ? 'show' : ''}`}>
                                <p className=" font-semibold mb-2"></p>
                                <div className="space-y-2 ">
                                    {/* 1. Notifikasi Pengiriman Paket */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <Truck className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Paket Anda dalam perjalanan bersama kurir</p>
                                    </div>

                                    {/* 2. Notifikasi Panen Baru */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <Sprout className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Panen segar baru! Cabai merah petik langsung dari kebun kini tersedia</p>
                                    </div>

                                    {/* 3. Notifikasi Promo/Diskon */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <Tag className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Voucher potongan ongkir khusus produk sayuran organik telah aktif</p>
                                    </div>

                                    {/* 4. Notifikasi Pesanan Selesai */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <CheckCircle className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Pesanan selesai! Terima kasih telah mendukung ekonomi petani lokal</p>
                                    </div>

                                    {/* 5. Notifikasi Respon Chat Penjual/Petani */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <MessageSquare className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Mitra petani membalas pertanyaan diskusi produk Anda</p>
                                    </div>

                                    {/* 6. Notifikasi Penurunan Harga Komoditas */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <TrendingDown className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Harga Beras Premium sedang turun, cek keranjang belanja Anda</p>
                                    </div>

                                    {/* 7. Notifikasi Refund / Pengembalian Dana */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <RefreshCw className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Pengembalian dana untuk pesanan dibatalkan berhasil diproses</p>
                                    </div>

                                    {/* 8. Notifikasi Restock Stok Produk */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <Package className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Stok bibit buah Harum Manis kembali tersedia di toko mitra</p>
                                    </div>

                                    {/* 9. Notifikasi Dorongan Ulasan Produk */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <Heart className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Bantu petani dengan memberikan bintang 5 pada produk yang telah diterima</p>
                                    </div>

                                    {/* 10. Notifikasi Penawaran Harga Grosir */}
                                    <div className="flex gap-2 p-2 rounded-xl bg-[#f0fdf4]">
                                        <Percent className="text-green-600" style={{ width: "18px" }} />
                                        <p className=" text-xs">Penawaran harga grosir pupuk cair Anda telah disetujui oleh penjual</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* cart */}
                        <div className="relative">
                            <button className="relative text-green-800" aria-label="Keranjang" onClick={() => navigate('/cart')}>
                                <ShoppingCart /> <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime-500 text-white text-[10px] flex items-center justify-center">4</span>
                            </button>

                        </div>
                        {/* Profile */}
                        <div className="relative">
                            <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center bg-[url('https://scontent.fcgk22-2.fna.fbcdn.net/v/t39.30808-1/488921436_1453267752705007_5864091378705276613_n.jpg?stp=c0.0.742.742a_dst-jpg_tt6&cstp=mx742x742&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_ohc=xkMjZJO6p1cQ7kNvwE8ZWH3&_nc_oc=AdpbxToEQR8hQKueN6Aaub2Aa4tfM3FyeP2GcnjpG5QYsLHaQmuu8DBLgmKUhA7jn7w&_nc_zt=24&_nc_ht=scontent.fcgk22-2.fna&_nc_gid=AcQBYoffRjdBJG0hlwV6gg&_nc_ss=7c2a8&oh=00_AQD0NgaZNsebPp5egkqNtOObw0etnUrmkgNek1pMVNcFUQ&oe=6A54400E')] bg-cover bg-center" aria-label="Profil">
                            </button>
                        </div>
                    </div>
                </nav >

                {/* Desktop Links */}
                <div className="hidden lg:block border-t border-[var(--line)]">
                    <div className="max-w-7xl mx-auto px-6 flex gap-8 py-2 text-sm font-medium">
                        <a onClick={() => navigate("/home")} className="navlink">Home</a>
                        <a onClick={() => navigate("/marketplace")} className="navlink" >Marketplace</a>
                        <a onClick={() => navigate("/cart")} className="navlink" >Orders</a>
                        <a onClick={() => navigate("/petani")} className="navlink" >Petani</a>
                        <a onClick={() => navigate("/news")} className="navlink" >News</a>

                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={` dropMenu ${isMenuOpen ? 'show' : ''} lg:hidden border-t border-[var(--line)] px-6 py-3 flex-col gap-3 text-sm bg-white`}>
                    <a onClick={() => navigate("/home")} className="py-1 navlink">Home</a>
                    <a onClick={() => navigate("/marketplace")} className="py-1 navlink" >Marketplace</a>
                    <a onClick={() => navigate("/cart")} className="py-1 navlink" >Orders</a>
                    <a onClick={() => navigate("/petani")} className="py-1 navlink" >Petani</a>
                    <a onClick={() => navigate("/news")} className="py-1 navlink" >News</a>

                </div>

            </header >

        </>
    );

}