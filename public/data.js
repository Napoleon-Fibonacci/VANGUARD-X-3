/**
 * DATA KELAS X-3 VANGUARD - SMAN 1 CICURUG
 * Tema: Order of Knights / Medieval Vanguard
 * File ini terpisah rapi agar pengurus/anggota kelas dapat menambah/mengedit data dengan mudah.
 */

const VANGUARD_DATA = {
  lore: {
    schoolName: "SMAN 1 Cicurug",
    className: "X-3 VANGUARD",
    motto: "Primi in Pugna, Fortes in Fide", // Terdepan dalam Perjuangan, Kuat dalam Pendirian
    tagline: "Garda Depan Pasukan SMAN 1 Cicurug",
    stats: [
      { label: "Jumlah Ksatria", value: 36, icon: "swords" },
      { label: "Wali Kelas", value: "Drs. H. Hendra", icon: "wizard" },
      { label: "Markas Besarnya", value: "Gedung Utama Lt. 2", icon: "castle" },
      { label: "Tahun Angkatan", value: "2025 / 2026", icon: "scroll" }
    ],
    description: `Di balik benteng megah SMAN 1 Cicurug, berdirilah satu himpunan ksatria terpilih yang dikenal sebagai X-3 VANGUARD. Kami bukan sekadar kumpulan siswa di dalam satu ruang kelas, melainkan legiun terdepan yang siap menaklukkan segala rintangan akademik, seni, dan olahraga. Dengan semangat pantang menyerah, kami menjunjung tinggi persaudaraan dan kehormatan di setiap langkah perjuangan.`
  },

  leadership: [
    {
      id: "leader-1",
      name: "Drs. H. Hendra M.Pd",
      role: "Grand Magister (Wali Kelas)",
      title: "Penasihat Agung & Pelindung Ordo",
      motto: "Kebijaksanaan adalah perisai terkuat seorang pemimpin.",
      badge: "crown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "leader-2",
      name: "Muhammad Farhan",
      role: "Lord Commander (Ketua Kelas)",
      title: "Panglima Utama Vanguard",
      motto: "Memimpin dari depan, melindungi di belakang.",
      badge: "swords",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "leader-3",
      name: "Aurelia Putri",
      role: "Vice Commander (Wakil Ketua)",
      title: "Ksatria Strategi Kerajaan",
      motto: "Ketertiban adalah kunci kemenangan legiun.",
      badge: "shield",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "leader-4",
      name: "Nabila Zahra",
      role: "Grand Scribe (Sekretaris 1)",
      title: "Penjaga Kitab & Arsip Kerajaan",
      motto: "Pena lebih tajam daripada sebilah pedang.",
      badge: "scroll",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "leader-5",
      name: "Davin Pratama",
      role: "Master of Coin (Bendahara 1)",
      title: "Bendahara Kas Pasukan Vanguard",
      motto: "Setiap keping emas diperhitungkan untuk masa depan.",
      badge: "coins",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "leader-6",
      name: "Rian Hidayat",
      role: "High Marshal (Humas & Keamanan)",
      title: "Garda Pelindung & Utusan Ksatria",
      motto: "Tak ada ancaman yang lolos dari pengawasan.",
      badge: "fleur",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80"
    }
  ],

  knights: [
    {
      id: "k-1",
      name: "Aditya Wardhana",
      nickname: "The Shieldbearer",
      squad: "Garda Depan",
      role: "Ksatria Pertahanan",
      motto: "Setia hingga akhir pertempuran.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 95, kecerdasan: 78, kreativitas: 70, ketangkasan: 88 }
    },
    {
      id: "k-2",
      name: "Anisa Rahmawati",
      nickname: "Star Weaver",
      squad: "Ordo Cendekia",
      role: "Ahli Strategi Sains",
      motto: "Pengetahuan adalah cahaya dalam kegelapan.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 80, kecerdasan: 98, kreativitas: 85, ketangkasan: 75 }
    },
    {
      id: "k-3",
      name: "Bagas Kurnia",
      nickname: "Iron Fist",
      squad: "Legiun Olahraga",
      role: "Ksatria Atlantik",
      motto: "Kecepatan dan kekuatan di setiap langkah.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 90, kecerdasan: 72, kreativitas: 75, ketangkasan: 96 }
    },
    {
      id: "k-4",
      name: "Citra Dewi",
      nickname: "Silver Muse",
      squad: "Guild Seni",
      role: "Penyair & Melodi Kerajaan",
      motto: "Keindahan membawa kedamaian di jiwa.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 75, kecerdasan: 84, kreativitas: 97, ketangkasan: 80 }
    },
    {
      id: "k-5",
      name: "Dimas Anggara",
      nickname: "Shadow Ranger",
      squad: "Garda Depan",
      role: "Penyelidik & Logistik",
      motto: "Bergerak cepat tanpa meninggalkan jejak.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 88, kecerdasan: 82, kreativitas: 78, ketangkasan: 92 }
    },
    {
      id: "k-6",
      name: "Eka Nurjanah",
      nickname: "Lightbringer",
      squad: "Ordo Cendekia",
      role: "Ksatria Bahasa & Literasi",
      motto: "Kata-kata indah menggerakkan dunia.",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 82, kecerdasan: 94, kreativitas: 90, ketangkasan: 78 }
    },
    {
      id: "k-7",
      name: "Fajar Ramadan",
      nickname: "Thunder Blade",
      squad: "Legiun Olahraga",
      role: "Ksatria Futsal & Atletik",
      motto: "Semangat membara bagai kilat di udara.",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 92, kecerdasan: 76, kreativitas: 72, ketangkasan: 95 }
    },
    {
      id: "k-8",
      name: "Gita Gutawa",
      nickname: "Golden Harp",
      squad: "Guild Seni",
      role: "Vokalis & Paduan Suara",
      motto: "Suara harmoni menyatukan semua ksatria.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      rpgStats: { keberanian: 78, kecerdasan: 86, kreativitas: 95, ketangkasan: 82 }
    }
  ],

  schedule: [
    {
      day: "Senin",
      dayCode: 1,
      subjects: [
        { time: "07:00 - 08:00", name: "Upacara Bendera Kerajaan", mentor: "Pembina Upacara" },
        { time: "08:00 - 09:30", name: "Matematika Strategi", mentor: "Drs. H. Hendra" },
        { time: "09:45 - 11:15", name: "Fisika Alam & Energi", mentor: "Ibu Nurhayati M.Pd" },
        { time: "11:15 - 12:45", name: "Bahasa & Diplomasi Indonesia", mentor: "Bpk. Syaiful S.Pd" }
      ]
    },
    {
      day: "Selasa",
      dayCode: 2,
      subjects: [
        { time: "07:15 - 08:45", name: "Sejarah Dunia & Legiun", mentor: "Bpk. Rahmat M.Hum" },
        { time: "08:45 - 10:15", name: "Kimia Elemen Kerajaan", mentor: "Ibu Ratna S.Si" },
        { time: "10:30 - 12:00", name: "Bahasa Inggris Global", mentor: "Miss Sarah M.Pd" }
      ]
    },
    {
      day: "Rabu",
      dayCode: 3,
      subjects: [
        { time: "07:15 - 08:45", name: "Biologi Kehidupan", mentor: "Ibu Sri Rahayu M.Si" },
        { time: "08:45 - 10:15", name: "Informatika & Logika Sandi", mentor: "Bpk. Irfan S.Kom" },
        { time: "10:30 - 12:00", name: "Pendidikan Agama & Moral", mentor: "Ustadz Mansur M.Ag" }
      ]
    },
    {
      day: "Kamis",
      dayCode: 4,
      subjects: [
        { time: "07:15 - 08:45", name: "Pendidikan Jasmani & Olahraga", mentor: "Bpk. Gunawan S.Pd" },
        { time: "08:45 - 10:15", name: "Seni Budaya & Visual", mentor: "Ibu Kartika S.Sn" },
        { time: "10:30 - 12:00", name: "Ekonomi & Keuangan Kas", mentor: "Ibu Maya SE" }
      ]
    },
    {
      day: "Jumat",
      dayCode: 5,
      subjects: [
        { time: "07:00 - 08:00", name: "Kajian & Ibadah Jumat", mentor: "Tim Keagamaan" },
        { time: "08:00 - 09:30", name: "Geografi Nusantara", mentor: "Bpk. Agus S.Pd" },
        { time: "09:45 - 11:15", name: "Sosiologi Masyatakat", mentor: "Ibu Dewi M.Si" }
      ]
    }
  ],

  dutyRoster: [
    {
      day: "Senin",
      members: ["Muhammad Farhan", "Aditya Wardhana", "Anisa Rahmawati", "Bagas Kurnia", "Citra Dewi"]
    },
    {
      day: "Selasa",
      members: ["Aurelia Putri", "Dimas Anggara", "Eka Nurjanah", "Fajar Ramadan", "Gita Gutawa"]
    },
    {
      day: "Rabu",
      members: ["Nabila Zahra", "Davin Pratama", "Rian Hidayat", "Aditya Wardhana", "Anisa Rahmawati"]
    },
    {
      day: "Kamis",
      members: ["Bagas Kurnia", "Citra Dewi", "Dimas Anggara", "Eka Nurjanah", "Fajar Ramadan"]
    },
    {
      day: "Jumat",
      members: ["Gita Gutawa", "Muhammad Farhan", "Aurelia Putri", "Nabila Zahra", "Davin Pratama"]
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Peringatan Hari Kemerdekaan",
      category: "Event",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
      description: "Pasukan Vanguard memenangkan gelar parade kostum terbaik di SMAN 1 Cicurug."
    },
    {
      id: "gal-2",
      title: "Kemenangan Turnamen Futsal",
      category: "Olahraga",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
      description: "Tim futsal X-3 mengamankan piala emas Classmeeting SMAN 1 Cicurug."
    },
    {
      id: "gal-3",
      title: "Kelompok Studi Kerajaan",
      category: "Akademik",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
      description: "Belajar kelompok bersama menjelang ujian tengah semester."
    },
    {
      id: "gal-4",
      title: "Malam Keakraban Vanguard",
      category: "Kebersamaan",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      description: "Acara kebersamaan dan pentas seni menyambut semester baru."
    },
    {
      id: "gal-5",
      title: "Bakti Lingkungan Sekolah",
      category: "Event",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
      description: "Gotong royong menjaga kebersihan dan keasrian area benteng kelas."
    },
    {
      id: "gal-6",
      title: "Pameran Karya Seni & Kerajinan",
      category: "Akademik",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80",
      description: "Karya instalasi seni bertema abad pertengahan buatan siswa X-3."
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "Juara I Classmeeting Futsal",
      year: "2025",
      icon: "trophy",
      description: "Gelar tertinggi turnamen futsal antar-kelas SMAN 1 Cicurug."
    },
    {
      id: "ach-2",
      title: "Kelas Terbersih & Terdisiplin",
      year: "2025",
      icon: "shield",
      description: "Penghargaan bergilir dari Kepala Sekolah SMAN 1 Cicurug."
    },
    {
      id: "ach-3",
      title: "Juara II Lomba Kebudayaan",
      year: "2025",
      icon: "medal",
      description: "Penampilan drama kolosal bertema sejarah dan kesatriaan."
    },
    {
      id: "ach-4",
      title: "Best Decorative Classroom",
      year: "2025",
      icon: "fleur",
      description: "Kreativitas dekorasi kelas bertema benteng abad pertengahan."
    }
  ],

  testimonials: [
    {
      id: "test-1",
      name: "Drs. H. Hendra M.Pd",
      role: "Wali Kelas X-3",
      quote: "Siswa-siswi X-3 Vanguard memiliki kekompakan yang luar biasa. Semangat kesatriaan mereka terpancar dari kedisiplinan dan rasa kepedulian antar sesama.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "test-2",
      name: "Muhammad Farhan",
      role: "Ketua Kelas X-3",
      quote: "Berada di Vanguard mengajarkan kami bahwa kebersamaan adalah senjata terkuat. Kami melangkah bersama, tak ada yang tertinggal di belakang.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "test-3",
      name: "Aurelia Putri",
      role: "Wakil Ketua X-3",
      quote: "Setiap harinya di X-3 terasa bagai petualangan baru. Kami siap mengukir prestasi berharga untuk banggakan SMAN 1 Cicurug!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    }
  ]
};

// Export global variable
window.VANGUARD_DATA = VANGUARD_DATA;

