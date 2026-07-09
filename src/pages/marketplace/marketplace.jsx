import React, { useState, useMemo, useEffect } from 'react';
import {
    Star,
    MapPin,
    Package,
    ShoppingCart,
    X,
    User,
    Calendar,
    Tag,
    Scale,
    Truck,
    ShieldCheck,
    CheckCircle,
    TrendingUp,
    Hash
} from 'lucide-react';
import Navbar from '../../components/marketplace/navbar.jsx';

// ==========================================
// DUMMY DATA GENERATOR & DATABASE
// ==========================================

function generateComments(productName, category) {
    const commentTemplates = [
        {
            name: "Budi Santoso",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
            date: "15 Juni 2026",
            rating: 5,
            text: {
                Sayuran: `${productName} beneran segar banget pas sampai. Langsung dimasak rasanya enak dan renyah alami, tidak layu sama sekali.`,
                Buah: `Manis dan berair sekali! ${productName} ini matangnya pas, tidak ada bagian yang busuk atau bonyok. Sangat direkomendasikan.`,
                Beras: `Berasnya bersih sekali bebas dari kutu atau kerikil kecil. Pas dimasak harum semerbak, pulen luar biasa tingkat premium.`,
                Bibit: `Bibit ${productName} tiba dalam kondisi segar. Media tanahnya lembap sehingga tanaman tidak stres di perjalanan. Sudah bertunas!`,
                Pupuk: `Pupuk berkualitas tinggi, langsung saya coba ke tanaman hias dan sayur di rumah. Hasilnya terlihat subur dalam seminggu.`
            }
        },
        {
            name: "Siti Rahma",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
            date: "12 Juni 2026",
            rating: 5,
            text: {
                Sayuran: `Puas sekali belanja sayur disini. Pengemasan sangat aman dengan kardus tebal berlubang udara sehingga kesegaran terjaga.`,
                Buah: `Buahnya besar-besar dan rasanya manis segar. Anak-anak langsung suka ketika dipotong. Terima kasih petani lokal!`,
                Beras: `Beras premium asli tanpa pemutih kimia. Kemasan kedap udara tebal. Nasi terasa lezat meskipun dimakan dingin.`,
                Bibit: `Kualitas bibit jempolan. Seller sangat ramah membimbing cara penanganan awal saat bibit baru sampai rumah.`,
                Pupuk: `Tanaman hias saya jadi rajin berbunga setelah rutin menggunakan pupuk ${productName} sesuai panduan.`
            }
        },
        {
            name: "Agus Wijaya",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
            date: "10 Juni 2026",
            rating: 4,
            text: {
                Sayuran: `Kondisi sayuran sangat bersih dari sisa tanah pekarangan. Pengiriman sedikit terlambat tapi kesegaran produk tetap terjaga.`,
                Buah: `Buah segar, tekstur padat, kemasan rapi dilindungi bubble wrap tebal. Rasanya manis segar pas di lidah.`,
                Beras: `Tekstur nasi sangat pulen dan ada wangi alaminya yang memikat nafsu makan. Pengiriman cepat dan aman.`,
                Bibit: `Bibit dikemas sangat baik. Dilengkapi petunjuk penanaman sederhana yang ramah pemula seperti saya.`,
                Pupuk: `Takaran penggunaan yang tercantum di kemasan sangat jelas dan mudah dipahami. Hasil tanaman jadi lebih kokoh.`
            }
        },
        {
            name: "Dewi Lestari",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
            date: "08 Juni 2026",
            rating: 5,
            text: {
                Sayuran: `Kualitas sayuran organik premium layaknya di supermarket bintang lima. Harganya jauh lebih terjangkau langsung dari petani.`,
                Buah: `Segar sekali! Harganya bersahabat, mutunya jauh melampaui ekspektasi. Pembelian kedua kalinya selalu konsisten.`,
                Beras: `Beras merah organik paling pulen yang pernah saya coba. Sangat baik untuk diet kesehatan keluarga kami.`,
                Bibit: `Kemasan bibit kokoh dan tanaman masih sangat hijau. Akar-akarnya kuat dan sudah berkembang di media tanam baru.`,
                Pupuk: `Pupuk cair terbaik untuk pertumbuhan tunas baru. Hanya beberapa kali semprot daunnya tumbuh lebih cepat.`
            }
        },
        {
            name: "Rian Hidayat",
            avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop",
            date: "05 Juni 2026",
            rating: 4,
            text: {
                Sayuran: `Sayurnya bersih dari hama ulat, timbangan akurat bahkan dilebihkan sedikit. Terima kasih pelayanannya yang tulus!`,
                Buah: `Rasanya sangat manis alami tanpa pemanis buatan. Pengiriman sameday terjangkau dan super cepat sampai tujuan.`,
                Beras: `Beras putih bersih tanpa campuran. Nasi rasanya manis gurih alami, tidak mudah basi di dalam rice cooker.`,
                Bibit: `Bibit sehat dan segar. Dikirim dari kebun pagi, sore sudah sampai di rumah saya. Kondisi sangat segar bugar.`,
                Pupuk: `Seller responsif menjawab pertanyaan mengenai dosis pupuk. Tanaman hias monstera saya tumbuh tunas daun baru.`
            }
        },
        {
            name: "Anisa Fitri",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
            date: "02 Juni 2026",
            rating: 5,
            text: {
                Sayuran: `Langganan katering saya sangat puas dengan pasokan sayuran segar dari petani ini. Pertahankan kualitasnya!`,
                Buah: `Buah naga dan melonnya beneran manis, padat, dan segar dingin jika disimpan di kulkas dulu. Layanan istimewa.`,
                Beras: `Pilihan tepat untuk konsumsi harian. Beras ini tidak memerlukan air terlalu banyak saat dimasak agar tetap pulen.`,
                Bibit: `Tingkat kelangsungan tumbuh bibit ini sangat tinggi. Semua bibit yang saya pesan bertahan hidup dengan baik.`,
                Pupuk: `Pupuk komposnya sangat gembur, tidak berbau busuk menyengat, sangat nyaman digunakan untuk tanaman indoor.`
            }
        },
        {
            name: "Eko Prasetyo",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop",
            date: "28 Mei 2026",
            rating: 4,
            text: {
                Sayuran: `Dipacking per ikat dengan sangat rapi dan terlindung. Sayurannya hijau cerah bebas dari pembusukan batang.`,
                Buah: `Kualitas buah ekspor dengan harga lokal. Kulit luar mulus tanpa goresan benturan logistik. Sangat direkomendasikan.`,
                Beras: `Aroma berasnya wangi alami tanpa pewangi buatan. Pengiriman cepat, admin ramah dan kooperatif menjawab kendala.`,
                Bibit: `Bibit tanaman selamat sampai kota tujuan. Dikemas dengan penyangga bambu kecil di dalam kardus agar tidak patah.`,
                Pupuk: `Tanah pekarangan rumah yang semula keras kini menjadi gembur dan subur setelah dicampur kompos organik ini.`
            }
        },
        {
            name: "Mega Utami",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop",
            date: "25 Mei 2026",
            rating: 5,
            text: {
                Sayuran: `Senang sekali bisa mendukung produk petani lokal melalui platform ini. Kualitas sayurannya luar biasa premium.`,
                Buah: `Kesegaran buahnya terjamin, manis alami dengan tekstur renyah di setiap gigitan. Suka sekali belanja disini.`,
                Beras: `Beras pandan wangi paling otentik. Nasinya lembut gurih dan meningkatkan selera makan sekeluarga.`,
                Bibit: `Bibit sudah siap langsung tanam di tanah. Kondisi akar rimbun sehat dan batangnya kokoh tegak tegak.`,
                Pupuk: `Pupuk cairnya sangat praktis digunakan berkala. Hemat pemakaian namun dampaknya sangat signifikan untuk tanaman.`
            }
        }
    ];

    return commentTemplates.map((c, index) => ({
        id: `comment-${index}-${productName.replace(/\s+/g, '-').toLowerCase()}`,
        name: c.name,
        avatar: c.avatar,
        date: c.date,
        rating: c.rating,
        text: c.text[category] || `Kualitas produk ${productName} sangat memuaskan, sangat merekomendasikan hasil panen petani lokal ini!`
    }));
}

const PRODUCTS = [
    {
        id: 1,
        name: "Cabai Merah Keriting",
        category: "Sayuran",
        location: "Brebes, Jawa Tengah",
        farmer: "Pak Slamet (Tani Makmur)",
        price: 42000,
        stock: 45,
        weight: "1 kg",
        rating: 4.8,
        reviewsCount: 142,
        images: [
            "https://i.pinimg.com/1200x/52/b1/64/52b164bfe84e3f57bf6cd66ba87da9bb.jpg",
            "https://i.pinimg.com/736x/48/11/4f/48114f3a4ec6814f9aad02e1c12f0aa2.jpg",
            "https://i.pinimg.com/736x/72/62/5e/72625e810069ac21e03bebda3bd4b18e.jpg",
            "https://i.pinimg.com/1200x/e8/bc/38/e8bc3858bd1e754642f8d53a2dc848a5.jpg"
        ],
        description: [
            "Cabai merah keriting premium dipetik langsung dari kawasan pertanian dataran tinggi subur Brebes. Tanaman dipelihara dengan dedikasi tinggi menggunakan sistem pertanian ramah lingkungan, memastikan kesegaran optimal tanpa residu kimia berbahaya.",
            "Setiap proses pemanenan dijalankan secara manual pada pagi hari saat embun masih menetes, menjaga kelembapan sel tanaman agar cabai tidak mudah mengkerut atau busuk selama proses pengiriman berlangsung.",
            "Kandungan vitamin C dan senyawa kapsaisin alaminya sangat tinggi, memberikan rasa pedas khas Nusantara yang tajam sekaligus bermanfaat memperlancar sirkulasi darah serta meningkatkan sistem imunitas tubuh Anda.",
            "Untuk penyimpanan optimal, simpanlah cabai di dalam laci pendingin kulkas dengan dialasi kertas kering atau diletakkan pada wadah kedap udara berlubang kecil agar masa simpannya bertahan hingga dua minggu.",
            "Pengiriman dipacking aman menggunakan kardus berlubang ventilasi khusus untuk mengurangi penguapan suhu panas yang memicu kebusukan dini selama perjalanan ekspedisi logistik."
        ],
        ratingDistribution: { 5: 112, 4: 20, 3: 8, 2: 1, 1: 1 }
    },
    {
        id: 2,
        name: "Wortel Organik Premium",
        category: "Sayuran",
        location: "Cianjur, Jawa Barat",
        farmer: "Ibu Nurhayati (Kelompok Tani Cipanas)",
        price: 18000,
        stock: 65,
        weight: "1 kg",
        rating: 4.9,
        reviewsCount: 98,
        images: [
            "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop",
            "https://i.pinimg.com/1200x/d7/81/60/d78160f34adf2a148b9154f5770f063e.jpg",
            "https://i.pinimg.com/736x/8e/eb/da/8eebda4e032335311740cd180b07475f.jpg",
            "https://i.pinimg.com/1200x/30/74/d8/3074d8f27eeb6c478e10337ba49eeb78.jpg"
        ],
        description: [
            "Wortel organik segar dipanen dari kaki gunung Gede Pangrango yang berudara sejuk dan tanah vulkanis gembur kaya mineral alami. Rasa manis wortel ini murni dari kandungan glukosa alami tanah pegunungan.",
            "Wortel ditarik dari dalam tanah dengan penuh kehati-hatian guna menjaga keutuhan kulit luar, disemprot bersih menggunakan air pegunungan steril, kemudian dikeringkan dengan kain khusus agar bebas mikroba pembusuk.",
            "Kaya akan Beta Karoten berkualitas tinggi, Vitamin A, dan serat makanan yang esensial dalam menjaga kejernihan kornea mata, melancarkan metabolisme pencernaan, serta merawat kesehatan kulit keluarga Anda.",
            "Simpan wortel dengan memotong tangkai daun atasnya terlebih dahulu agar kelembapan umbi wortel tidak tersedot habis, lalu bungkus menggunakan tisu lembap sebelum masuk ke dalam kulkas.",
            "Wortel dikirim menggunakan jaring plastik buah berpori elastis dan dilapisi kardus tebal untuk meredam benturan eksternal selama proses perjalanan ke kota Anda."
        ],
        ratingDistribution: { 5: 88, 4: 8, 3: 1, 2: 1, 1: 0 }
    },
    {
        id: 3,
        name: "Kentang Granola Super",
        category: "Sayuran",
        location: "Dieng, Jawa Tengah",
        farmer: "Pak Hartono (Tani Dieng)",
        price: 22000,
        stock: 120,
        weight: "1 kg",
        rating: 4.7,
        reviewsCount: 165,
        images: [
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop",
            "https://i.pinimg.com/1200x/af/3b/07/af3b07d4ca85c2731ca41616e0a42b04.jpg",
            "https://i.pinimg.com/1200x/41/3e/9a/413e9af5340812bb320b86ae64a5cae2.jpg",
            "https://i.pinimg.com/1200x/07/76/a0/0776a06f812acf5ecee766bd245eb7e5.jpg"
        ],
        description: [
            "Kentang varietas Granola kualitas super dengan kadar air seimbang dan tekstur daging kentang yang sangat padat berisi. Sangat cocok diolah sebagai bahan kentang goreng renyah, perkedel lezat, maupun sup hangat.",
            "Ditanam pada ketinggian di atas 2000 mdpl di dataran tinggi Dieng yang dingin, memicu pembentukan pati kentang yang bertekstur pulen dan tidak mudah hancur saat direbus lama.",
            "Menyediakan asupan karbohidrat kompleks rendah glikemik, kalium yang baik untuk mengontrol tekanan darah tinggi, serta vitamin B6 yang mendukung sistem saraf tubuh secara menyeluruh.",
            "Sangat direkomendasikan disimpan pada suhu ruang yang gelap, kering, dan sejuk dengan sirkulasi udara baik. Hindari paparan sinar matahari langsung karena dapat memicu kulit kentang berubah kehijauan.",
            "Kemasan pengiriman menggunakan karung jaring rajut tebal bersirkulasi tinggi, menjamin kentang tidak mengalami kelembapan berlebih yang berpotensi memicu tumbuhnya tunas."
        ],
        ratingDistribution: { 5: 125, 4: 30, 3: 7, 2: 2, 1: 1 }
    },
    {
        id: 4,
        name: "Brokoli Hijau Segar",
        category: "Sayuran",
        location: "Lembang, Jawa Barat",
        farmer: "Kang Dadang (Lembang Organik)",
        price: 28000,
        stock: 35,
        weight: "500 g",
        rating: 4.8,
        reviewsCount: 74,
        images: [
            "https://i.pinimg.com/736x/e0/77/dd/e077dd17e4830620451617414d01082b.jpg",
            "https://i.pinimg.com/1200x/4e/2a/b4/4e2ab4e612d6bdcf256b493469a1817e.jpg",
            "https://i.pinimg.com/1200x/34/09/a2/3409a20360cae4baf52b2e6235145530.jpg",
            "https://i.pinimg.com/736x/39/c0/44/39c04445436620ef23ae77087952f297.jpg"
        ],
        description: [
            "Brokoli hijau premium dengan kuncup bunga yang rapat, kokoh, dan berwarna hijau pekat segar tanpa bintik kuning. Dipetik dari kebun hidroponik ramah lingkungan di dataran tinggi sejuk Lembang.",
            "Setiap kuntum disortir secara manual guna memastikan tidak ada hama ulat kecil tersembunyi di dalamnya, kemudian dicuci steril dengan teknologi air ozon pembunuh kuman patogen alami.",
            "Superfood yang kaya akan senyawa sulforafan yang bersifat anti-kanker, Vitamin C konsentrasi tinggi, serat pangan pencernaan, serta kalsium pendukung kekuatan tulang Anda.",
            "Bungkus batang dan kuncup brokoli dengan plastic wrap kedap udara atau kantong ziploc berlubang kecil, lalu simpan dalam lemari es untuk mempertahankan tekstur garingnya hingga 7 hari.",
            "Dipacking menggunakan pelindung jaring buah berlapis busa tipis dan dilapisi es pendingin kering (jika kurir instan) agar kuncup bunga tetap segar hijau royo-royo hingga di dapur Anda."
        ],
        ratingDistribution: { 5: 60, 4: 10, 3: 3, 2: 1, 1: 0 }
    },
    {
        id: 5,
        name: "Buah Naga Merah Manis",
        category: "Buah",
        location: "Banyuwangi, Jawa Timur",
        farmer: "Pak Nyoman (Sinar Naga)",
        price: 25000,
        stock: 90,
        weight: "1 kg",
        rating: 4.9,
        reviewsCount: 185,
        images: [
            "https://images.unsplash.com/photo-1527325678964-54921661f888?w=600&auto=format&fit=crop",
            "https://i.pinimg.com/1200x/e5/2c/31/e52c31eae09d86cf101a40e7bc8ab712.jpg",
            "https://i.pinimg.com/1200x/18/87/9e/18879ed62717078b48c859987dadb31c.jpg",
            "https://i.pinimg.com/1200x/fa/61/5f/fa615f8b391eb94be76c4571368f8ed3.jpg"
        ],
        description: [
            "Buah naga merah super manis khas pesisir selatan Banyuwangi yang kaya sinar matahari sepanjang tahun. Tanaman tumbuh subur berkat kombinasi tanah berpasir vulkanis dan pupuk kompos organik laut.",
            "Buah naga dipanen saat kulitnya berwarna merah cerah merona dengan sisik luar yang hijau segar melengkung indah, memastikan daging buahnya telah matang sempurna di pohon dengan kadar kemanisan tinggi.",
            "Kaya akan antioksidan alami antosianin pembentuk warna merah pekat, vitamin B-kompleks, kalium, zat besi tinggi, serta serat biji halus yang membantu proses detoksifikasi tubuh secara alami.",
            "Dapat disimpan pada suhu kamar sejuk hingga satu minggu, atau diletakkan dalam kulkas pendingin untuk rasa manis dingin menyegarkan yang luar biasa nikmat disantap di siang hari.",
            "Dikemas menggunakan jaring busa tebal bersilangan ganda (double foam net) di dalam kotak kardus kaku, memastikan buah tidak penyok atau bocor sari buahnya selama perjalanan kurir."
        ],
        ratingDistribution: { 5: 170, 4: 12, 3: 2, 2: 1, 1: 0 }
    },
    {
        id: 6,
        name: "Melon Golden Hidroponik",
        category: "Buah",
        location: "Sleman, DI Yogyakarta",
        farmer: "Mas Wisnu (Sleman Greenhouse)",
        price: 35000,
        stock: 40,
        weight: "1.5 kg",
        rating: 4.8,
        reviewsCount: 86,
        images: [
            "https://i.pinimg.com/1200x/b1/d9/b5/b1d9b5f302a2f86e9683ee3a008af075.jpg",
            "https://i.pinimg.com/736x/ce/bd/26/cebd26401693c6daeb87897136d24578.jpg",
            "https://i.pinimg.com/736x/97/33/f8/9733f81d6d44db499435cc2be6390f08.jpg",
            "https://i.pinimg.com/736x/48/28/e9/4828e95395e6fbba25e3b413ab58e419.jpg"
        ],
        description: [
            "Melon Golden premium dengan kulit mulus berwarna kuning cerah keemasan tanpa jaring (smooth skin). Ditanam menggunakan metode hidroponik modern tetes nutrisi presisi di dalam greenhouse steril bebas hama pengganggu.",
            "Memiliki daging buah berwarna putih kehijauan yang renyah (crunchy) berpadu tekstur lembut juicy dengan kadar manis terukur mencapai 14-16 brix (standar kualitas buah premium mancanegara).",
            "Mengandung banyak kandungan air yang menghidrasi, Vitamin C penangkal radikal bebas, serta kandungan asam folat yang sangat direkomendasikan untuk kesehatan ibu hamil maupun perkembangan buah hati.",
            "Bila melon belum dipotong, simpan pada suhu ruang sejuk. Jika sudah diiris, simpan dalam wadah kedap udara steril di kulkas agar tidak menyerap aroma bahan makanan lain.",
            "Dipacking kokoh dengan kardus kustom khusus bersekat busa pengaman tebal melingkari buah melon, menjamin keindahan kulit emas melon bebas baret maupun benturan parah."
        ],
        ratingDistribution: { 5: 75, 4: 8, 3: 2, 2: 1, 1: 0 }
    },
    {
        id: 7,
        name: "Beras Pandan Wangi Cianjur",
        category: "Beras",
        location: "Cianjur, Jawa Barat",
        farmer: "Aki Kosasih (Tani Pusaka Pandan)",
        price: 85000,
        stock: 200,
        weight: "5 kg",
        rating: 4.9,
        reviewsCount: 320,
        images: [
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop",
            "https://i.pinimg.com/1200x/33/21/49/332149eb97612404c340f96d69191e20.jpg",
            "https://i.pinimg.com/736x/69/d7/07/69d707fb5b911a0a263654e7e25c7b9c.jpg",
            "https://i.pinimg.com/1200x/9f/16/8d/9f168d0d3b3804db5cecf235db4f39aa.jpg"
        ],
        description: [
            "Beras Pandan Wangi murni khas Cianjur yang legendaris, ditanam secara tradisional di sawah basah beririgasi air pegunungan alami bebas polusi perkotaan. Menggunakan bibit varietas lokal warisan leluhur.",
            "Diproses giling menggunakan mesin presisi rendah pemanasan untuk menjaga kulit ari beras agar tetap kaya zat gizi mikro, menghasilkan butiran beras bulat lonjong bening kekuningan alami tanpa pemutih artifisial.",
            "Saat dimasak, uap nasi mengeluarkan aroma harum alami daun pandan yang sangat khas merangsang nafsu makan. Tekstur nasinya luar biasa pulen, kenyal, dan tidak lengket berlebihan di jemari.",
            "Simpan beras di dalam dispenser beras atau wadah kedap udara kering yang bersih. Letakkan beberapa lembar daun jeruk atau cabai kering di dalamnya guna mencegah munculnya kutu beras alami.",
            "Dikemas menggunakan karung plastik woven tebal berlaminasi anti air dan tahan bocor, kemudian dijahit rapat ganda menggunakan mesin jahit benang nilon super kuat."
        ],
        ratingDistribution: { 5: 295, 4: 20, 3: 3, 2: 1, 1: 1 }
    },
    {
        id: 8,
        name: "Beras Merah Organik Sehat",
        category: "Beras",
        location: "Tasikmalaya, Jawa Barat",
        farmer: "Pak Cecep (Tani Organik Priangan)",
        price: 95000,
        stock: 150,
        weight: "5 kg",
        rating: 4.8,
        reviewsCount: 145,
        images: [
            "https://i.pinimg.com/736x/e9/69/7e/e9697e043067955e7cd5b5355d71b80f.jpg",
            "https://i.pinimg.com/736x/e0/af/e4/e0afe4704bea057b9108bf9301c44a2b.jpg",
            "https://i.pinimg.com/1200x/1b/c9/9c/1bc99c63cc5c7c6cbe49830e7c76859a.jpg",
            "https://i.pinimg.com/736x/df/56/62/df56621710d0b0dc4f5b400b11343271.jpg"
        ],
        description: [
            "Beras merah organik pecah kulit premium yang dibudidayakan di sawah lereng pegunungan Tasikmalaya yang kaya mineral besi alami. Bebas pupuk urea kimia maupun pestisida herbisida sintetis berbahaya.",
            "Proses penggilingan hanya membuang sekam bagian terluar, menyisakan kulit ari kemerahan (aleuron) utuh yang kaya akan serat alami, fosfor, zat besi penting, serta aneka jenis asam amino esensial.",
            "Pilihan karbohidrat terbaik untuk penderita diabetes karena memiliki indeks glikemik sangat rendah, melancarkan program penurunan berat badan sehat, serta memperlancar pencernaan lambung secara berkala.",
            "Agar nasi beras merah terasa lebih empuk dan pulen, rendam beras merah dengan air bersih selama 30 menit sebelum dinyalakan tombol masak pada rice cooker kesayangan Anda.",
            "Kemasan luar berteknologi vakum kedap udara (vacuum pack) guna menjamin kesegaran nutrisi kulit ari beras tetap prima dan terlindungi dari kelembapan udara bebas luar."
        ],
        ratingDistribution: { 5: 125, 4: 15, 3: 4, 2: 1, 1: 0 }
    },
    {
        id: 9,
        name: "Bibit Cabai Rawit Unggul",
        category: "Bibit",
        location: "Malang, Jawa Timur",
        farmer: "Mas Joko (Karya Tunas Malang)",
        price: 15000,
        stock: 80,
        weight: "200 g",
        rating: 4.7,
        reviewsCount: 54,
        images: [
            "https://i.pinimg.com/1200x/71/b6/45/71b645b2a2aadc7266a9891344b1f1d7.jpg",
            "https://i.pinimg.com/1200x/88/c9/cb/88c9cb6a6791cd9cfa0f86f79ad7a074.jpg",
            "https://i.pinimg.com/736x/7c/2e/a2/7c2ea2bf91bbb3868c9a5bf59e5507af.jpg",
            "https://i.pinimg.com/1200x/60/90/37/6090379c9ba7869050d6d1bac2632035.jpg"
        ],
        description: [
            "Bibit tanaman cabai rawit siap tanam varietas unggulan lokal yang tahan serangan layu bakteri. Telah melewati masa penyemaian awal selama 25-30 hari di bawah pengawasan ketat tim agronom berpengalaman.",
            "Memiliki batang bawah yang kokoh, sistem perakaran serabut yang sehat rimbun, serta daun hijau tebal bebas dari bercak virus kuning maupun hama ulat pengorok daun.",
            "Sangat adaptif di dataran rendah maupun tinggi. Memiliki potensi produktivitas buah cabai rawit dompolan yang sangat lebat dan tingkat rasa kepedasan ekstrem yang disukai pasar lokal.",
            "Saat paket sampai, letakkan bibit di area teduh berangin selama 2 hari sebelum dipindah ke tanah atau pot permanen yang lebih besar. Lakukan penyiraman air secara berkala pada sore hari.",
            "Pengiriman dikemas menggunakan botol plastik berlubang atau kerangka kardus penyangga kaku guna menjamin batang utama tanaman tidak patah atau layu akibat himpitan selama pengiriman logistik."
        ],
        ratingDistribution: { 5: 42, 4: 9, 3: 2, 2: 1, 1: 0 }
    },
    {
        id: 10,
        name: "Bibit Mangga Harum Manis",
        category: "Bibit",
        location: "Probolinggo, Jawa Timur",
        farmer: "Pak Hariyono (Agro Tunas Probolinggo)",
        price: 45000,
        stock: 50,
        weight: "2 kg",
        rating: 4.8,
        reviewsCount: 68,
        images: [
            "https://i.pinimg.com/736x/9c/4e/d7/9c4ed714d95386c317416f73bd0cae2c.jpg",
            "https://i.pinimg.com/1200x/54/86/3f/54863f0dd38aaacb5b36887b23ce8a9a.jpg",
            "https://i.pinimg.com/1200x/2f/21/10/2f2110f44bdb64de9a039f6dc59106d5.jpg",
            "https://i.pinimg.com/1200x/1b/f8/ae/1bf8aed98667d6c72e1b5c5e7bda6450.jpg"
        ],
        description: [
            "Bibit pohon mangga Harum Manis okulasi kualitas super cepat berbuah (genjah). Batang bawah menggunakan mangga lokal kuat tahan genangan air, sedangkan entres atas diambil dari indukan mangga produktif manis murni.",
            "Tinggi bibit berkisar antara 50-60 cm dengan kondisi daun tua hijau sehat, menjamin fotosintesis berjalan maksimal untuk mempercepat adaptasi perakaran di lahan baru Anda.",
            "Mangga Harum Manis terkenal akan daging buahnya yang tebal lembut tanpa serat kasar, aroma wangi harum memikat, serta rasa manis pekat legit layaknya madu hutan alami.",
            "Lakukan pembuatan lubang tanam berukuran 50x50 cm, campurkan tanah galian dengan pupuk kandang matang seimbang, lalu siram bibit baru secara teratur pada pagi hari tanpa menggenangi batang utama.",
            "Pengiriman dibungkus media tanam cocopeat lembap tebal dibalut plastik erat pada perakaran, dilindungi packing peti kayu mini bersirkulasi udara aman mencegah kerusakan fatal fisik tanaman."
        ],
        ratingDistribution: { 5: 56, 4: 10, 3: 2, 2: 0, 1: 0 }
    },
    {
        id: 11,
        name: "Pupuk Kompos Organik Super",
        category: "Pupuk",
        location: "Bogor, Jawa Barat",
        farmer: "Kang Yusuf (Bogor Kompos Lestari)",
        price: 15000,
        stock: 300,
        weight: "5 kg",
        rating: 4.9,
        reviewsCount: 245,
        images: [
            "https://i.pinimg.com/1200x/ad/76/f0/ad76f075537bbec985f7df56daa316f0.jpg",
            "https://i.pinimg.com/1200x/10/75/0f/10750f6c5c6b4b2888e5ed87feaab942.jpg",
            "https://i.pinimg.com/1200x/56/d6/64/56d664c01fc1c6092e38478b3df824fd.jpg",
            "https://i.pinimg.com/736x/27/2c/55/272c552633e40317cdf7ac6364458f63.jpg"
        ],
        description: [
            "Pupuk kompos organik hasil fermentasi anaerob sempurna menggunakan bahan baku kotoran sapi perah pilihan, jerami padi subur, serta dedak halus berkualitas tinggi yang difermentasi dengan inokulan EM4 pertanian.",
            "Telah matang seutuhnya ditandai dengan tekstur gembur hitam menyerupai tanah gembur alami, bersuhu dingin, serta tidak berbau amonia busuk menyengat sehingga sangat steril bebas jamur patogen jahat.",
            "Berfungsi menggemburkan struktur tanah yang keras tandus, memperbaiki drainase air tanah pekarangan, serta menyediakan hara makro mikro lengkap bagi tanaman bunga maupun tanaman pangan.",
            "Campurkan pupuk kompos organik ini dengan tanah galian berbanding rasio 1:2 untuk media tanam pot baru, atau taburkan melingkar di sekeliling tajuk pohon buah dewasa secara berkala sebulan sekali.",
            "Kemasan karung plastik tebal kedap air berlapis segel segel penutup kencang guna menjaga kandungan mikroba baik di dalam pupuk tetap hidup dan tidak menguap mati terkena panas."
        ],
        ratingDistribution: { 5: 220, 4: 20, 3: 4, 2: 1, 1: 0 }
    },
    {
        id: 12,
        name: "Pupuk NPK Cair Booster",
        category: "Pupuk",
        location: "Surabaya, Jawa Timur",
        farmer: "CV Tani Agro Mandiri",
        price: 32000,
        stock: 180,
        weight: "1 L",
        rating: 4.8,
        reviewsCount: 112,
        images: [
            "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/0b4b1e90e3324181a717605b79c6df03~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1783529781&x-signature=JONtwkGX5sgTh4EcgZ7RS6FuEcI%3D&x-signature-webp=cGRQjtI76OmgOeaYLVCCp7wmtz4%3D",
            "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/8cab7e81bdb648f989104619fb2ca0dd~tplv-aphluv4xwc-resize-jpeg:700:0.jpeg?lk3s=0ccea506&x-expires=1783529781&x-signature=ZFeCFo6TZcNEgHoOZy56n1K9Vjw%3D&x-signature-webp=%2BrGCBzZC9BUPqLz%2BFyDl9NvCcb8%3D",
            "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/ddd2b3beeb5f4b5e97907992e208b8cc~tplv-aphluv4xwc-resize-jpeg:700:0.jpeg?lk3s=0ccea506&x-expires=1783529781&x-signature=EgzXG7TvTIMfyTZqwJh%2FtDNv76w%3D&x-signature-webp=USHZXY%2FowFQc33JqX0avc7FRrNo%3D",
            "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/3356d8cdc78d4eb08425313c0fe363ed~tplv-aphluv4xwc-resize-jpeg:700:0.jpeg?lk3s=0ccea506&x-expires=1783529781&x-signature=AstLx3LPVC4EaLl5xDM4VOFUTE0%3D&x-signature-webp=H%2Bfu1OyqgIVqafNOKhkPD0lQEwU%3D"
        ],
        description: [
            "Pupuk formula cair NPK konsentrasi tinggi penunjang fase vegetatif dan generatif tanaman secara kilat. Dilengkapi hormon perangsang tumbuh Auxin, Giberelin murni, serta unsur hara mikro Seng dan Boron.",
            "Mudah larut sempurna di dalam air tanpa meninggalkan endapan padat, sehingga dapat diaplikasikan dengan cara disemprotkan halus pada daun tanaman atau dikocorkan langsung ke perakaran tanaman.",
            "Mampu mempercepat proses pembungaan lebat, mencegah kerontokan bakal buah akibat cuaca ekstrem pancaroba, serta membuat warna daun hijau berkilau pertanda klorofil optimal.",
            "Larutkan 2-5 ml pupuk cair booster ke dalam 1 liter air bersih, aduk rata lalu semprotkan tipis pada daun tanaman secara merata pada pagi hari sebelum pukul 09.00 saat mulut daun (stomata) terbuka lebar.",
            "Dikemas menggunakan botol HDPE tebal anti bocor dengan segel pengunci berulir kuat serta dilapisi plastik pelindung panas (shrink wrap) untuk keamanan maksimal pengiriman antarpulau."
        ],
        ratingDistribution: { 5: 98, 4: 10, 3: 3, 2: 1, 1: 0 }
    }
];

const ALL_PRODUCTS = PRODUCTS.map(p => ({
    ...p,
    comments: generateComments(p.name, p.category)
}));

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
export default function Marketplace() {
    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [toast, setToast] = useState({ show: false, message: "" });

    // Daftar Keyword Sugesti Netral
    const keywordSuggestions = [
        "Organik",
        "Premium",
        "Super",
        "Segar",
        "Unggul",
        "Manis",
        "Cair"
    ];

    const categories = ["Semua", "Sayuran", "Buah", "Beras", "Bibit", "Pupuk"];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedProduct(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Filter produk berdasarkan Keyword Sugesti & Kategori
    const filteredProducts = useMemo(() => {
        return ALL_PRODUCTS.filter(product => {
            const matchesKeyword = !selectedKeyword ||
                product.name.toLowerCase().includes(selectedKeyword.toLowerCase()) ||
                product.description.some(p => p.toLowerCase().includes(selectedKeyword.toLowerCase()));
            const matchesCategory = activeCategory === "Semua" || product.category === activeCategory;
            return matchesKeyword && matchesCategory;
        });
    }, [selectedKeyword, activeCategory]);

    const handleBuy = (productName, e) => {
        e.stopPropagation();
        setToast({
            show: true,
            message: `Berhasil menambahkan "${productName}" ke keranjang belanja!`
        });
    };

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ show: false, message: "" });
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    const handleOpenDetail = (product) => {
        setSelectedProduct(product);
        setActiveImageIndex(0);
    };

    // Menangani klik tombol keyword sugesti (toggle)
    const handleKeywordClick = (keyword) => {
        if (selectedKeyword === keyword) {
            setSelectedKeyword(null); // Nonaktifkan jika diklik ulang
        } else {
            setSelectedKeyword(keyword);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 antialiased">
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
                    <div className="flex items-center space-x-3 bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-slate-800 max-w-sm">
                        <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                        <p className="text-sm font-medium tracking-wide">{toast.message}</p>
                        <button
                            onClick={() => setToast({ show: false, message: "" })}
                            className="text-gray-400 hover:text-white transition-colors duration-150 pl-2"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-8">

                {/* ==========================================
            HEADER MARKETPLACE
            ========================================== */}
                <Navbar />

                {/* ==========================================
            SUGESTI KEYWORD & CATEGORY CONTROL
            ========================================== */}
                <div className="flex flex-col gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

                    {/* Section Keyword Sugesti (Menggantikan Search Bar) */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center space-x-1 text-xs font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">
                            <Hash className="w-3.5 h-3.5" />

                        </div>

                        <div className="flex flex-wrap gap-2">
                            {keywordSuggestions.map((kw) => {
                                const isActive = selectedKeyword === kw;
                                return (
                                    <button
                                        key={kw}
                                        onClick={() => handleKeywordClick(kw)}
                                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${isActive
                                            ? "bg-slate-200 text-slate-800 border-slate-400 font-semibold"
                                            : "bg-slate-50 text-slate-500 border-slate-200/70 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300"
                                            }`}
                                    >
                                        #{kw}
                                    </button>
                                );
                            })}

                            {selectedKeyword && (
                                <button
                                    onClick={() => setSelectedKeyword(null)}
                                    className="text-xs px-2 py-1.5 text-rose-600 bg-rose-50/60 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-colors duration-150 font-medium"
                                >
                                    Hapus Filter Kata Kunci x
                                </button>
                            )}
                        </div>
                    </div>

                    <hr className="border-gray-100" />



                </div>

                {/* ==========================================
            PRODUCT GRID
            ========================================== */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Photo Container */}
                                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-100">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        {/* Rating */}
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                                            <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                                            <span className="text-xs text-gray-400">({product.reviewsCount} Ulasan)</span>
                                        </div>

                                        {/* Name */}
                                        <h3 className="font-bold text-gray-800 text-base line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200">
                                            {product.name}
                                        </h3>

                                        {/* Location */}
                                        <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                                            <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                                            <span className="truncate">{product.location}</span>
                                        </div>
                                    </div>

                                    {/* Price & Stock */}
                                    <div className="pt-2 border-t border-gray-50">
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-lg font-extrabold text-emerald-700">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="text-xs text-gray-400">/ {product.weight}</span>
                                        </div>

                                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                                            <Package className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                            <span>Stok: <b>{product.stock}</b> unit</span>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <button
                                            onClick={() => handleOpenDetail(product)}
                                            className="w-full py-2.5 px-3 border border-gray-200 text-gray-600 font-semibold text-xs rounded-xl hover:bg-slate-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 text-center"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            onClick={(e) => handleBuy(product.name, e)}
                                            className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-1.5"
                                        >
                                            <ShoppingCart className="w-3.5 h-3.5" />
                                            <span>Beli</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto space-y-4">
                        <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-400">
                            <Hash className="w-10 h-10" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-800">Kombinasi Tidak Ditemukan</h3>
                            <p className="text-sm text-slate-500">
                                Kategori ini tidak mengandung produk dengan kata kunci sugesti yang sedang Anda pilih.
                            </p>
                        </div>
                        <button
                            onClick={() => { setSelectedKeyword(null); setActiveCategory("Semua"); }}
                            className="text-sm font-semibold text-emerald-600 hover:underline animate-pulse"
                        >
                            Reset Filter Pencarian
                        </button>
                    </div>
                )}

            </div>

            {/* ==========================================
          MODAL DETAIL PRODUK
          ========================================== */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
                    <div
                        className="absolute inset-0 cursor-default"
                        onClick={() => setSelectedProduct(null)}
                    ></div>

                    <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col border border-gray-100 animate-scaleUp">

                        {/* Header Modal */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                                    {selectedProduct.category}
                                </span>
                                <span className="text-xs text-gray-400">ID Produk: #{selectedProduct.id}</span>
                            </div>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-slate-100 transition-all duration-150"
                            >
                                <X className="w-5.5 h-5.5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 space-y-8">

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                                {/* 1. Galeri Foto */}
                                <div className="lg:col-span-5 space-y-3.5">
                                    <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-gray-100 shadow-inner">
                                        <img
                                            src={selectedProduct.images[activeImageIndex]}
                                            alt={selectedProduct.name}
                                            className="w-full h-full object-cover transition-all duration-300"
                                        />
                                    </div>

                                    {/* Thumbnails */}
                                    <div className="grid grid-cols-4 gap-2.5">
                                        {selectedProduct.images.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveImageIndex(index)}
                                                className={`aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 transition-all duration-200 ${activeImageIndex === index
                                                    ? "border-emerald-600 scale-95 opacity-100 shadow-md"
                                                    : "border-transparent opacity-60 hover:opacity-100"
                                                    }`}
                                            >
                                                <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Informasi Produk */}
                                <div className="lg:col-span-7 space-y-5">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                                            {selectedProduct.name}
                                        </h2>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                                            <div className="flex items-center space-x-1 text-sm font-semibold text-gray-800">
                                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                                <span>{selectedProduct.rating}</span>
                                                <span className="text-gray-400">({selectedProduct.reviewsCount} Ulasan)</span>
                                            </div>
                                            <span className="text-gray-300 hidden sm:inline">|</span>
                                            <div className="flex items-center space-x-1.5 text-sm text-gray-500">
                                                <MapPin className="w-4 h-4 text-rose-500" />
                                                <span>{selectedProduct.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-50/80 flex items-baseline justify-between">
                                        <div className="space-y-0.5">
                                            <p className="text-xs text-emerald-800 font-medium tracking-wide uppercase">Harga Spesial Petani</p>
                                            <p className="text-3xl font-black text-emerald-800">
                                                {formatPrice(selectedProduct.price)}
                                            </p>
                                        </div>
                                        <span className="text-sm font-semibold text-emerald-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-emerald-100/30">
                                            per {selectedProduct.weight}
                                        </span>
                                    </div>

                                    {/* Spesifikasi Detail */}
                                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="flex items-start space-x-2.5">
                                            <Tag className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400">Kategori</p>
                                                <p className="text-sm font-bold text-gray-700">{selectedProduct.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2.5">
                                            <Scale className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400">Berat Kemasan</p>
                                                <p className="text-sm font-bold text-gray-700">{selectedProduct.weight}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2.5">
                                            <Package className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400">Sisa Stok</p>
                                                <p className="text-sm font-bold text-gray-700">{selectedProduct.stock} Unit</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2.5">
                                            <User className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400">Petani Produsen</p>
                                                <p className="text-sm font-bold text-gray-700 truncate">{selectedProduct.farmer}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3.5 pt-2 text-xs font-semibold text-slate-600">
                                        <div className="flex items-center space-x-2 bg-white px-3 py-2.5 rounded-xl border border-gray-100">
                                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                                            <span>Garansi Produk Segar</span>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-white px-3 py-2.5 rounded-xl border border-gray-100">
                                            <Truck className="w-4.5 h-4.5 text-emerald-500" />
                                            <span>Kemasan Aman & Higienis</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => handleBuy(selectedProduct.name, e)}
                                        className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-xl hover:shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center space-x-2.5"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Masukkan Ke Keranjang Belanja</span>
                                    </button>
                                </div>

                            </div>

                            {/* Deskripsi Panjang */}
                            <div className="pt-6 border-t border-gray-100 space-y-4">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-1.5">
                                    <span className="w-1.5 h-5 bg-emerald-600 rounded-full"></span>
                                    <span>Deskripsi Lengkap Produk</span>
                                </h3>
                                <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4 max-w-4xl">
                                    {selectedProduct.description.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Rating & Ulasan Section */}
                            <div className="pt-8 border-t border-gray-100 space-y-6">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-1.5">
                                    <span className="w-1.5 h-5 bg-emerald-600 rounded-full"></span>
                                    <span>Analisis Rating Pembeli</span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                                    <div className="md:col-span-4 text-center p-6 bg-slate-50 rounded-2xl border border-gray-100 space-y-2">
                                        <p className="text-5xl font-black text-slate-900">{selectedProduct.rating}</p>
                                        <div className="flex items-center justify-center space-x-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-amber-400 fill-current' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium">Berdasarkan {selectedProduct.reviewsCount} Ulasan Pembeli</p>
                                    </div>

                                    <div className="md:col-span-8 space-y-2 max-w-md">
                                        {Object.entries(selectedProduct.ratingDistribution).reverse().map(([star, count]) => {
                                            const total = Object.values(selectedProduct.ratingDistribution).reduce((a, b) => a + b, 0);
                                            const percentage = total > 0 ? (count / total) * 100 : 0;
                                            return (
                                                <div key={star} className="flex items-center space-x-3 text-sm">
                                                    <span className="w-3 font-semibold text-gray-600">{star}</span>
                                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current flex-shrink-0" />
                                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-12 text-right text-xs text-gray-400">{count} Ulasan</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>

                            {/* Komentar & Review List */}
                            <div className="pt-8 border-t border-gray-100 space-y-6">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-1.5">
                                    <span className="w-1.5 h-5 bg-emerald-600 rounded-full"></span>
                                    <span>Ulasan Pelanggan ({selectedProduct.comments.length})</span>
                                </h3>

                                <div className="space-y-4 max-w-4xl">
                                    {selectedProduct.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="flex items-start space-x-4 bg-slate-50/50 p-4 rounded-xl border border-gray-100/60"
                                        >
                                            <img
                                                src={comment.avatar}
                                                alt={comment.name}
                                                className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0 space-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-0.5">
                                                    <h4 className="font-bold text-slate-900 text-sm truncate">
                                                        {comment.name}
                                                    </h4>
                                                    {/* Tanggal diatas rating bintang */}
                                                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{comment.date}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-0.5 pt-0.5">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3.5 h-3.5 ${i < comment.rating ? 'text-amber-400 fill-current' : 'text-gray-200'}`}
                                                        />
                                                    ))}
                                                </div>

                                                <p className="text-gray-600 text-sm leading-relaxed pt-1">
                                                    {comment.text}
                                                </p>
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
    );
}