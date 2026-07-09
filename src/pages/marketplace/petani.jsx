import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    MapPin,
    Star,
    Calendar,
    ShoppingBag,
    User,
    Package,
    Tag,
    X,
    Sprout,
    CheckCircle2,
    TrendingUp
} from 'lucide-react';
import Navbar from '../../components/marketplace/navbar.jsx';
import iluzeEar from './img/20240813_195008.jpg'

// ==========================================
// DATA DUMMY: 12 PETANI DENGAN MINIMAL 5 PRODUK
// ==========================================
const FARMERS_DATA = [
    {
        id: 1,
        name: "Aditya Ardiansyah",
        specialty: "Petani Sayuran Organik",
        image: iluzeEar,
        bgImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
        location: "Tasikmalaya, Jawa Barat",
        joinYear: 2020,
        rating: 4.9,
        totalSales: 12500,
        totalRatingsCount: 215, // Jumlah yang memberikan rate
        jenisTanaman: ["Wortel Organik", "Bayam", "Selada", "Sawi Putih", "Kentang"],
        description: ["Aditya Ardiansyah adalah pelopor pertanian organik di wilayah Tasikmalaya. Dengan pengalaman lebih dari 15 tahun, beliau menerapkan prinsip permakultur murni tanpa pestisida kimia sintetis. Budi percaya bahwa tanah yang sehat menghasilkan tanaman yang kaya nutrisi. Setiap sayuran dipetik langsung pada pagi hari sebelum dikemas dan dikirim, menjaga kesegaran tingkat seluler sampai di meja makan Anda.", "Instagram : @iluze_ear"],
        products: [
            { id: "p1-1", name: "Wortel Organik Premium", price: 18000, weightUnit: "kg", stock: 120, rating: 4.8, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&auto=format&fit=crop&q=80" },
            { id: "p1-2", name: "Bayam Cabut Segar", price: 7000, weightUnit: "ikat", stock: 65, rating: 4.9, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80" },
            { id: "p1-3", name: "Selada Keriting Hijau", price: 15000, weightUnit: "kg", stock: 40, rating: 4.7, image: "https://images.unsplash.com/photo-1622484211148-71630141f173?w=400&auto=format&fit=crop&q=80" },
            { id: "p1-4", name: "Sawi Putih Garing", price: 12000, weightUnit: "kg", stock: 80, rating: 4.8, image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&auto=format&fit=crop&q=80" },
            { id: "p1-5", name: "Kentang Granola Super", price: 22000, weightUnit: "kg", stock: 150, rating: 4.8, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 2,
        name: "Siti Rahma",
        specialty: "Produsen Beras & Polong",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1536304997881-a372c179924b?w=1200&auto=format&fit=crop&q=80",
        location: "Cianjur, Jawa Barat",
        joinYear: 2019,
        rating: 4.8,
        totalSales: 24000,
        totalRatingsCount: 413,
        jenisTanaman: ["Beras Pandan Wangi", "Beras Merah", "Kacang Tanah", "Kacang Hijau", "Kedelai"],
        description: ["Ibu Siti mengelola lahan warisan keluarga di Cianjur dengan memadukan kearifan lokal dan teknologi pengairan modern. Fokus utama kebunnya adalah varietas beras pusaka yang memiliki sertifikat keaslian geografis. Selain padi, beliau menanam tanaman polong sebagai rotasi tanaman alami guna mengembalikan kandungan nitrogen tanah pekarangan secara berkala.", ""],
        products: [
            { id: "p2-1", name: "Beras Pandan Wangi Cianjur", price: 85000, weightUnit: "5 kg", stock: 250, rating: 4.9, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80" },
            { id: "p2-2", name: "Beras Merah Organik Sehat", price: 95000, weightUnit: "5 kg", stock: 120, rating: 4.8, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" },
            { id: "p2-3", name: "Kacang Tanah Kupas Bersih", price: 28000, weightUnit: "kg", stock: 95, rating: 4.7, image: "https://images.unsplash.com/photo-1511113593219-094364c1f95d?w=400&auto=format&fit=crop&q=80" },
            { id: "p2-4", name: "Kacang Hijau Pilihan", price: 25000, weightUnit: "kg", stock: 75, rating: 4.6, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80" },
            { id: "p2-5", name: "Kacang Kedelai Lokal Non-GMO", price: 16000, weightUnit: "kg", stock: 110, rating: 4.8, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 3,
        name: "Ahmad Fauzi",
        specialty: "Pekebun Buah Tropis",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1444312645910-ffa973656eba?w=1200&auto=format&fit=crop&q=80",
        location: "Malang, Jawa Timur",
        joinYear: 2021,
        rating: 4.7,
        totalSales: 9800,
        totalRatingsCount: 150,
        jenisTanaman: ["Apel Malang", "Jeruk Keprok", "Alpukat Mentega", "Pisang", "Jambu Kristal"],
        description: ["Pak Ahmad Fauzi memanfaatkan suhu sejuk pegunungan Malang untuk membudidayakan aneka buah tropis dengan tingkat manis alami yang tinggi. Beliau berkomitmen menerapkan metode pertanian presisi untuk memastikan kadar nutrisi buah berada pada tingkat optimal sebelum masa panen raya tiba.", ""],
        products: [
            { id: "p3-1", name: "Apel Manalagi Malang Manis", price: 30000, weightUnit: "kg", stock: 140, rating: 4.8, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80" },
            { id: "p3-2", name: "Jeruk Keprok Manis Segar", price: 24000, weightUnit: "kg", stock: 180, rating: 4.7, image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop&q=80" },
            { id: "p3-3", name: "Alpukat Mentega Super Gurih", price: 35000, weightUnit: "kg", stock: 90, rating: 4.9, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop&q=80" },
            { id: "p3-4", name: "Pisang Raja Bulu Harum", price: 20000, weightUnit: "sisir", stock: 50, rating: 4.8, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80" },
            { id: "p3-5", name: "Jambu Kristal Tanpa Biji", price: 18000, weightUnit: "kg", stock: 110, rating: 4.7, image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 4,
        name: "Dedi Kurniawan",
        specialty: "Petani Rempah & Cabai",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=80",
        location: "Brebes, Jawa Tengah",
        joinYear: 2018,
        rating: 4.8,
        totalSales: 31000,
        totalRatingsCount: 570,
        jenisTanaman: ["Cabai Merah", "Bawang Merah", "Bawang Putih", "Cabai Rawit", "Tomat"],
        description: ["Pak Dedi Kurniawan dikenal sebagai produsen komoditas bumbu dapur utama berkualitas tinggi di Brebes. Tanah lempung pesisir yang khas berpadu dengan pupuk organik buatan sendiri menghasilkan bawang merah yang harum pekat serta tingkat kepedasan cabai yang konsisten tinggi.", ""],
        products: [
            { id: "p4-1", name: "Cabai Merah Keriting", price: 42000, weightUnit: "kg", stock: 85, rating: 4.8, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80" },
            { id: "p4-2", name: "Bawang Merah Brebes Super", price: 35000, weightUnit: "kg", stock: 300, rating: 4.9, image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&auto=format&fit=crop&q=80" },
            { id: "p4-3", name: "Bawang Putih Kating Bersih", price: 38000, weightUnit: "kg", stock: 200, rating: 4.7, image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&auto=format&fit=crop&q=80" },
            { id: "p4-4", name: "Cabai Rawit Merah Galak", price: 55000, weightUnit: "kg", stock: 70, rating: 4.8, image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&auto=format&fit=crop&q=80" },
            { id: "p4-5", name: "Tomat Beef Merah Segar", price: 14000, weightUnit: "kg", stock: 160, rating: 4.6, image: "https://images.unsplash.com/photo-1518977822534-7049a61fc0c2?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 5,
        name: "Wayan Sudarsana",
        specialty: "Pekebun Buah Eksotis",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=1200&auto=format&fit=crop&q=80",
        location: "Tabanan, Bali",
        joinYear: 2021,
        rating: 4.9,
        totalSales: 7600,
        totalRatingsCount: 162,
        jenisTanaman: ["Buah Naga", "Manggis", "Markisa", "Pepaya California", "Salak"],
        description: ["Wayan Sudarsana mendedikasikan kebunnya untuk pelestarian dan pembudidayaan tanaman buah eksotis Bali. Beliau memadukan konsep pengairan tradisional Subak dengan standar kebersihan pertanian global.", ""],
        products: [
            { id: "p5-1", name: "Buah Naga Merah Manis", price: 25000, weightUnit: "kg", stock: 120, rating: 4.9, image: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=400&auto=format&fit=crop&q=80" },
            { id: "p5-2", name: "Manggis Ekspor Mulus", price: 32000, weightUnit: "kg", stock: 90, rating: 4.8, image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=80" },
            { id: "p5-3", name: "Markisa Ungu Harum", price: 28000, weightUnit: "kg", stock: 60, rating: 4.7, image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400&auto=format&fit=crop&q=80" },
            { id: "p5-4", name: "Pepaya California Manis", price: 9000, weightUnit: "kg", stock: 150, rating: 4.8, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80" },
            { id: "p5-5", name: "Salak Pondoh Manis Garing", price: 16000, weightUnit: "kg", stock: 180, rating: 4.7, image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 6,
        name: "Nurhayati Lestari",
        specialty: "Pekebun Melon Greenhouse",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&auto=format&fit=crop&q=80",
        location: "Sleman, DI Yogyakarta",
        joinYear: 2020,
        rating: 4.8,
        totalSales: 11000,
        totalRatingsCount: 221,
        jenisTanaman: ["Melon Golden", "Melon Rock", "Semangka Merah", "Semangka Kuning", "Timun Suri"],
        description: ["Ibu Nurhayati mengelola fasilitas greenhouse modern di Sleman untuk memproduksi aneka buah melon kualitas ekspor. Kontrol lingkungan yang ketat menjamin rasa manis alami melon yang renyah dan bersih hara tanaman.", ""],
        products: [
            { id: "p6-1", name: "Melon Golden Hidroponik", price: 35000, weightUnit: "1.5 kg", stock: 80, rating: 4.8, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80" },
            { id: "p6-2", name: "Melon Rock Garing", price: 30000, weightUnit: "1.5 kg", stock: 75, rating: 4.7, image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=80" },
            { id: "p6-3", name: "Semangka Merah Tanpa Biji", price: 12000, weightUnit: "kg", stock: 200, rating: 4.8, image: "https://images.unsplash.com/photo-1589606189808-c891358ef350?w=400&auto=format&fit=crop&q=80" },
            { id: "p6-4", name: "Semangka Kuning Manis", price: 14000, weightUnit: "kg", stock: 150, rating: 4.9, image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&auto=format&fit=crop&q=80" },
            { id: "p6-5", name: "Timun Suri Lembut Garing", price: 10000, weightUnit: "kg", stock: 90, rating: 4.6, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 7,
        name: "Hendra Wijaya",
        specialty: "Petani Sayuran Dingin",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1200&auto=format&fit=crop&q=80",
        location: "Lembang, Jawa Barat",
        joinYear: 2020,
        rating: 4.8,
        totalSales: 16500,
        totalRatingsCount: 290,
        jenisTanaman: ["Brokoli Hijau", "Kubis Ungu", "Kembang Kol", "Daun Bawang", "Zucchini"],
        description: ["Hendra Wijaya fokus memproduksi aneka sayuran subtropis di dataran tinggi sejuk Lembang. Beliau bermitra erat dengan lembaga akademis pertanian lokal untuk menerapkan metode budidaya berkelanjutan ramah lingkungan.", ""],
        products: [
            { id: "p7-1", name: "Brokoli Hijau Kuncup Rapat", price: 28000, weightUnit: "500 g", stock: 65, rating: 4.8, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80" },
            { id: "p7-2", name: "Kubis Ungu Organik", price: 18000, weightUnit: "kg", stock: 120, rating: 4.7, image: "https://images.unsplash.com/photo-1628773822503-930a8589e472?w=400&auto=format&fit=crop&q=80" },
            { id: "p7-3", name: "Kembang Kol Segar Bersih", price: 20000, weightUnit: "kg", stock: 85, rating: 4.8, image: "https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?w=400&auto=format&fit=crop&q=80" },
            { id: "p7-4", name: "Daun Bawang Rimbun Segar", price: 11000, weightUnit: "kg", stock: 100, rating: 4.9, image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&auto=format&fit=crop&q=80" },
            { id: "p7-5", name: "Zucchini Hijau Muda Padat", price: 15000, weightUnit: "kg", stock: 95, rating: 4.6, image: "https://images.unsplash.com/photo-1628773822503-930a8589e472?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 8,
        name: "Mega Utami",
        specialty: "Petani Rempah Herba",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&auto=format&fit=crop&q=80",
        location: "Bogor, Jawa Barat",
        joinYear: 2021,
        rating: 4.9,
        totalSales: 8900,
        totalRatingsCount: 190,
        jenisTanaman: ["Jahe Merah", "Kunyit", "Temulawak", "Lengkuas", "Sereh"],
        description: ["Mega Utami mengelola lahan rempah-rempah berkhasiat obat di kawasan penyangga kota Bogor. Dengan teknik tumpang sari alami, rempah herba yang dihasilkan terbukti memiliki kandungan senyawa aktif yang tinggi.", ""],
        products: [
            { id: "p8-1", name: "Jahe Merah Segar Pilihan", price: 35000, weightUnit: "kg", stock: 150, rating: 4.9, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" },
            { id: "p8-2", name: "Kunyit Tua Padat Kadar Curcumin", price: 18000, weightUnit: "kg", stock: 140, rating: 4.8, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop&q=80" },
            { id: "p8-3", name: "Temulawak Bubuk Murni", price: 45000, weightUnit: "250 g", stock: 90, rating: 4.9, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" },
            { id: "p8-4", name: "Lengkuas Muda Wangi Alami", price: 14000, weightUnit: "kg", stock: 110, rating: 4.7, image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&auto=format&fit=crop&q=80" },
            { id: "p8-5", name: "Sereh Wangi Ikatan Besar", price: 12000, weightUnit: "kg", stock: 120, rating: 4.8, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 9,
        name: "Asep Saepudin",
        specialty: "Petani Umbi Dataran Tinggi",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=1200&auto=format&fit=crop&q=80",
        location: "Garut, Jawa Barat",
        joinYear: 2017,
        rating: 4.7,
        totalSales: 28000,
        totalRatingsCount: 476,
        jenisTanaman: ["Ubi Cilembu", "Talas", "Singkong", "Wortel Lokal", "Bawang Bombay"],
        description: ["Pak Asep adalah sesepuh petani Garut yang terkenal dengan ubi Cilembu madu miliknya. Beliau menerapkan rahasia fermentasi pematangan alami tanah liat vulkanis yang menghasilkan ubi manis meleleh luar biasa.", ""],
        products: [
            { id: "p9-1", name: "Ubi Cilembu Madu Asli", price: 16000, weightUnit: "kg", stock: 400, rating: 4.9, image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&auto=format&fit=crop&q=80" },
            { id: "p9-2", name: "Talas Pratama Lembut", price: 20000, weightUnit: "kg", stock: 150, rating: 4.7, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop&q=80" },
            { id: "p9-3", name: "Singkong Mentega Empuk", price: 8000, weightUnit: "kg", stock: 250, rating: 4.8, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80" },
            { id: "p9-4", name: "Wortel Lokal Manis Garut", price: 12000, weightUnit: "kg", stock: 180, rating: 4.6, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&auto=format&fit=crop&q=80" },
            { id: "p9-5", name: "Bawang Bombay Jumbo Garing", price: 25000, weightUnit: "kg", stock: 110, rating: 4.7, image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 10,
        name: "Dewi Anggraeni",
        specialty: "Pekebun Jeruk & Buah Naga",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1518977822534-7049a61fc0c2?w=1200&auto=format&fit=crop&q=80",
        location: "Banyuwangi, Jawa Timur",
        joinYear: 2021,
        rating: 4.8,
        totalSales: 13200,
        totalRatingsCount: 230,
        jenisTanaman: ["Jeruk Siam", "Buah Naga", "Mangga Gadung", "Belimbing Madu", "Srikaya"],
        description: ["Ibu Dewi memanfaatkan kesuburan tanah vulkanis Banyuwangi untuk membudidayakan jeruk siam manis garing dan buah naga kaya antioksidan. Penanganan pascapanen yang cepat mengunci kesegaran alami buahnya.", ""],
        products: [
            { id: "p10-1", name: "Jeruk Siam Manis Banyuwangi", price: 22000, weightUnit: "kg", stock: 200, rating: 4.8, image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop&q=80" },
            { id: "p10-2", name: "Buah Naga Merah Super", price: 24000, weightUnit: "kg", stock: 150, rating: 4.9, image: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=400&auto=format&fit=crop&q=80" },
            { id: "p10-3", name: "Mangga Gadung Matang Pohon", price: 28000, weightUnit: "kg", stock: 80, rating: 4.7, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=80" },
            { id: "p10-4", name: "Belimbing Madu Mulus Besar", price: 18000, weightUnit: "kg", stock: 100, rating: 4.8, image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=80" },
            { id: "p10-5", name: "Srikaya Jumbo Legit", price: 35000, weightUnit: "kg", stock: 50, rating: 4.7, image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 11,
        name: "Kadek Pratama",
        specialty: "Pekebun Rempah Sehat",
        image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1552014151-24ee24eed402?w=1200&auto=format&fit=crop&q=80",
        location: "Klungkung, Bali",
        joinYear: 2022,
        rating: 4.8,
        totalSales: 6300,
        totalRatingsCount: 130,
        jenisTanaman: ["Jahe Merah", "Kunyit Bubuk", "Kapulaga", "Cengkeh", "Pala"],
        description: ["Kadek Pratama menyajikan aneka rempah-rempah berstandar kesehatan tinggi dari wilayah Klungkung. Beliau mempraktikkan proses pengeringan matahari terkendali untuk mempertahankan kadar minyak atsiri yang pekat.", ""],
        products: [
            { id: "p11-1", name: "Jahe Merah Segar Pilihan", price: 34000, weightUnit: "kg", stock: 120, rating: 4.8, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" },
            { id: "p11-2", name: "Kunyit Bubuk Murni Ekstra", price: 20000, weightUnit: "250 g", stock: 150, rating: 4.9, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop&q=80" },
            { id: "p11-3", name: "Kapulaga Jawa Wangi", price: 85000, weightUnit: "250 g", stock: 60, rating: 4.7, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" },
            { id: "p11-4", name: "Cengkeh Kering Klungkung", price: 45000, weightUnit: "250 g", stock: 100, rating: 4.8, image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&auto=format&fit=crop&q=80" },
            { id: "p11-5", name: "Pala Lonjong Kering Aromatik", price: 38000, weightUnit: "250 g", stock: 80, rating: 4.7, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: 12,
        name: "Syamsudin",
        specialty: "Petani Padi Organik",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
        bgImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
        location: "Sidrap, Sulawesi Selatan",
        joinYear: 2019,
        rating: 4.9,
        totalSales: 21500,
        totalRatingsCount: 341,
        jenisTanaman: ["Beras Ketan", "Padi Ketan Hitam", "Padi Menthik Susu", "Padi Merah", "Padi Hitam"],
        description: ["Pak Syamsudin memproduksi beras ketan dan beras fungsional bebas pestisida di sentra lumbung padi Sidrap. Air irigasi diuji berkala untuk memastikan kemurnian mineral pelindung tanaman padi sehat.", ""],
        products: [
            { id: "p12-1", name: "Beras Ketan Putih Pulen", price: 78000, weightUnit: "5 kg", stock: 300, rating: 4.9, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80" },
            { id: "p12-2", name: "Beras Ketan Hitam Organik", price: 82000, weightUnit: "5 kg", stock: 150, rating: 4.8, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" },
            { id: "p12-3", name: "Beras Menthik Susu Wangi", price: 98000, weightUnit: "5 kg", stock: 200, rating: 4.9, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80" },
            { id: "p12-4", name: "Beras Merah Pulen Enak", price: 90000, weightUnit: "5 kg", stock: 180, rating: 4.7, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80" },
            { id: "p12-5", name: "Beras Hitam Melano Premium", price: 115000, weightUnit: "5 kg", stock: 90, rating: 4.9, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80" }
        ]
    }
];

// ==========================================
// UTILITY HELPERS
// ==========================================
const formatSales = (val) => new Intl.NumberFormat('id-ID').format(val);
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Farmers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFarmer, setSelectedFarmer] = useState(null);

    // Menutup modal dengan tombol 'Escape'
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedFarmer(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Filter pencarian berdasarkan nama, lokasi, jenis tanaman, atau nama produk
    const filteredFarmers = useMemo(() => {
        return FARMERS_DATA.filter((farmer) => {
            const query = searchTerm.toLowerCase().trim();
            if (!query) return true;

            const matchesName = farmer.name.toLowerCase().includes(query);
            const matchesLocation = farmer.location.toLowerCase().includes(query);
            const matchesTanaman = farmer.jenisTanaman.some((tanaman) =>
                tanaman.toLowerCase().includes(query)
            );
            const matchesProducts = farmer.products.some((prod) =>
                prod.name.toLowerCase().includes(query)
            );

            return matchesName || matchesLocation || matchesTanaman || matchesProducts;
        });
    }, [searchTerm]);

    return (
        <><Navbar />
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-10 px-4 sm:px-6 lg:px-8 antialiased">

                <div className="max-w-7xl mx-auto space-y-10">

                    {/* ==========================================
            HEADER & SEARCH SECTION
            ========================================== */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200">
                        <div className="space-y-3 max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-full text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                                <Sprout className="w-4.5 h-4.5" />
                                <span>Mitra Petani Terpercaya</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Petani Lokal
                            </h1>
                            <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                                Kenali petani terpercaya yang menyediakan hasil pertanian berkualitas langsung dari kebun.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama petani, lokasi, atau komoditas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* ==========================================
            FARMERS GRID
            ========================================== */}
                    {filteredFarmers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredFarmers.map((farmer) => (
                                <div
                                    key={farmer.id}
                                    className="group bg-white rounded-2xl border border-gray-150/70 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Banner Mini */}
                                    <div className="h-24 w-full overflow-hidden bg-slate-200 relative">
                                        <img
                                            src={farmer.bgImage}
                                            alt={`${farmer.name} Banner`}
                                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                                    </div>

                                    {/* Profile Meta Section */}
                                    <div className="px-5 pb-5 flex-1 flex flex-col justify-between -mt-10 relative">
                                        <div className="space-y-4">
                                            {/* Overlapping Avatar */}
                                            <div className="relative inline-block">
                                                <img
                                                    src={farmer.image}
                                                    alt={farmer.name}
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                                                />
                                                <span className="absolute bottom-1 right-1 bg-emerald-500 border-2 border-white w-4.5 h-4.5 rounded-full flex items-center justify-center">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-white fill-current" />
                                                </span>
                                            </div>

                                            {/* Name & Specialty */}
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-lg text-slate-950 group-hover:text-emerald-700 transition-colors duration-200">
                                                    {farmer.name}
                                                </h3>
                                                <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-md">
                                                    {farmer.specialty}
                                                </p>
                                            </div>

                                            {/* Metadata Singkat */}
                                            <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2 border-t border-slate-50 text-xs text-slate-500">
                                                <div className="flex items-center space-x-1.5 min-w-0">
                                                    <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                                                    <span className="truncate">{farmer.location.split(',')[0]}</span>
                                                </div>
                                                <div className="flex items-center space-x-1.5 min-w-0">
                                                    <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                    <span className="truncate">Sejak {farmer.joinYear}</span>
                                                </div>
                                                <div className="flex items-center space-x-1.5 min-w-0">
                                                    <Star className="w-4 h-4 text-amber-400 fill-current flex-shrink-0" />
                                                    <span className="font-bold text-slate-800">{farmer.rating}</span>
                                                </div>
                                                <div className="flex items-center space-x-1.5 min-w-0">
                                                    <ShoppingBag className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                                    <span className="font-bold text-slate-800">{formatSales(farmer.totalSales)}+</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Button Lihat Profil */}
                                        <div className="pt-5 mt-4 border-t border-slate-50">
                                            <button
                                                onClick={() => setSelectedFarmer(farmer)}
                                                className="w-full py-3 px-4 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                                            >
                                                <User className="w-4.5 h-4.5" />
                                                <span>Lihat Profil</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty Search State */
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-150 shadow-sm max-w-md mx-auto space-y-4">
                            <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-400">
                                <Search className="w-10 h-10" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-900">Petani Tidak Ditemukan</h3>
                                <p className="text-sm text-slate-500 px-4">
                                    Tidak ada petani atau komoditas yang cocok dengan "{searchTerm}".
                                </p>
                            </div>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="text-sm font-semibold text-emerald-600 hover:underline"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    )}

                </div>

                {/* ==========================================
          MODAL DETAIL PROFIL PETANI & PRODUK
          ========================================== */}
                {selectedFarmer && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
                        {/* Backdrop closer */}
                        <div className="absolute inset-0 cursor-default" onClick={() => setSelectedFarmer(null)}></div>

                        {/* Modal Container */}
                        <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col border border-slate-100 animate-scaleUp">

                            {/* Sticky Header Modal */}
                            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4.5 flex items-center justify-between z-20">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                        Profil Petani Verifikasi
                                    </span>
                                    <span className="text-xs text-slate-400">ID Mitra: #{selectedFarmer.id}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedFarmer(null)}
                                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 sm:p-8 space-y-8">

                                {/* Profile Overview (Split Banner & Info) */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                                    {/* 1. Left Section: Profile Info (5 Columns) */}
                                    <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner flex flex-col justify-between p-6 space-y-6">

                                        {/* Photo & Identity */}
                                        <div className="space-y-4 text-center lg:text-left">
                                            <div className="relative inline-block">
                                                <img
                                                    src={selectedFarmer.image}
                                                    alt={selectedFarmer.name}
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto lg:mx-0"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                                                    {selectedFarmer.name}
                                                </h2>
                                                <p className="text-sm font-semibold text-emerald-600 bg-white border border-emerald-100 px-3 py-1 rounded-xl inline-block">
                                                    {selectedFarmer.specialty}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Core Metrics: Lokasi, Terjual, Rating */}
                                        <div className="space-y-4 pt-4 border-t border-slate-200/50">

                                            {/* Lokasi */}
                                            <div className="flex items-start space-x-3 text-sm">
                                                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-slate-400">Lokasi Kebun</p>
                                                    <p className="font-bold text-slate-700">{selectedFarmer.location}</p>
                                                </div>
                                            </div>

                                            {/* Jumlah Terjual */}
                                            <div className="flex items-start space-x-3 text-sm">
                                                <ShoppingBag className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-slate-400">Jumlah Produk Terjual</p>
                                                    <p className="font-bold text-slate-700">{formatSales(selectedFarmer.totalSales)} Produk</p>
                                                </div>
                                            </div>

                                            {/* Rating Petani + Jumlah yang Rate */}
                                            <div className="flex items-start space-x-3 text-sm">
                                                <Star className="w-5 h-5 text-amber-400 fill-current flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-slate-400">Rating & Ulasan</p>
                                                    <div className="flex items-center space-x-1.5">
                                                        <span className="font-extrabold text-slate-800 text-sm">{selectedFarmer.rating} / 5.0</span>
                                                        <span className="text-slate-400">({selectedFarmer.totalRatingsCount} Ulasan)</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    {/* 2. Right Section: Deskripsi Petani (7 Columns) */}
                                    <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-center space-y-4">
                                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                                            <span className="w-1.5 h-5.5 bg-emerald-600 rounded-full"></span>
                                            <span>Deskripsi & Pengalaman</span>
                                        </h3>
                                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                            {selectedFarmer.description.map((text, index) => (
                                                <span key={index}>
                                                    {text}
                                                    <br />
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                </div>

                                {/* ==========================================
                  DUMMY PRODUCTS LIST BY THIS FARMER
                  ========================================== */}
                                <div className="pt-8 border-t border-slate-200/50 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                                            <span className="w-1.5 h-5.5 bg-emerald-600 rounded-full"></span>
                                            <span>Hasil Kebun {selectedFarmer.name} ({selectedFarmer.products.length})</span>
                                        </h3>
                                        <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Katalog Aktif</span>
                                    </div>

                                    {/* Products Grid inside Modal */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                                        {selectedFarmer.products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="group bg-white rounded-2xl border border-slate-150/70 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
                                            >
                                                {/* Product Photo */}
                                                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-100">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                                    <div className="space-y-1">
                                                        {/* Rating Product */}
                                                        <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-700">
                                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                                                            <span>{product.rating}</span>
                                                        </div>

                                                        {/* Product Name */}
                                                        <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors duration-150">
                                                            {product.name}
                                                        </h4>
                                                    </div>

                                                    {/* Price & Stock */}
                                                    <div className="pt-2 border-t border-slate-50 space-y-1.5">
                                                        <div className="flex items-baseline justify-between text-xs">
                                                            <span className="font-extrabold text-emerald-700 text-sm">
                                                                {formatPrice(product.price)}
                                                            </span>
                                                            <span className="text-slate-400">/ {product.weightUnit}</span>
                                                        </div>

                                                        <div className="flex items-center space-x-1 text-[10px] text-slate-500">
                                                            <Package className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                            <span>Stok: <b>{product.stock}</b> {product.weightUnit}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </>
    );
}