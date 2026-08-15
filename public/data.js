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

  leadership: [],

  knights: [],

  schedule: [
    {
      day: "Senin",
      dayCode: 1,
      subjects: [
        { time: "06:30 - 07:15", name: "Upacara Bendera", mentor: "Pembina Upacara" },
        { time: "08:00 - 09:30", name: "Biologi", mentor: "Wawa Wibawa, S.Pd., M.Pd." },
        { time: "09:45 - 10:30", name: "Biologi", mentor: "Wawa Wibawa, S.Pd., M.Pd." },
        { time: "10:30 - 12:00", name: "Informatika", mentor: "Azharudin, S.Kom., M.Pd." },
        { time: "12:45 - 15:00", name: "Ekonomi", mentor: "Kania Aprianti, S.E." }
      ]
    },
    {
      day: "Selasa",
      dayCode: 2,
      subjects: [
        { time: "06:30 - 08:00", name: "Kimia", mentor: "Afelia Clara Sindi, S.Pd." },
        { time: "08:00 - 09:30", name: "Pend. Pancasila", mentor: "Ani Mulyani, S.Pd." },
        { time: "09:45 - 11:15", name: "Penjaskes", mentor: "Ende Ardy Wiranata, S.Pd." },
        { time: "11:15 - 13:30", name: "Matematika", mentor: "Asep Nurzaman, S.Pd." },
        { time: "13:30 - 15:00", name: "Bahasa Sunda", mentor: "Nidya Aprilia, S.Pd." }
      ]
    },
    {
      day: "Rabu",
      dayCode: 3,
      subjects: [
        { time: "06:30 - 08:00", name: "BK/BP", mentor: "Muhamad Tamami, S.Pd." },
        { time: "08:00 - 10:30", name: "Geografi", mentor: "Hesti Dwi Kuntari, S.Pd." },
        { time: "10:30 - 13:30", name: "Sejarah", mentor: "Irfan Ramadhan, S.Hum." },
        { time: "13:30 - 15:00", name: "Matematika", mentor: "Asep Nurzaman, S.Pd." }
      ]
    },
    {
      day: "Kamis",
      dayCode: 4,
      subjects: [
        { time: "06:30 - 08:45", name: "Sosiologi", mentor: "Guru menyusul" },
        { time: "08:45 - 11:15", name: "Pendidikan Agama", mentor: "M. Luthfi Nasrullah, S.Pd." },
        { time: "11:15 - 13:30", name: "Bahasa Indonesia", mentor: "Santi Susanti, S.Pd." },
        { time: "13:30 - 15:00", name: "Seni", mentor: "Asep Hudi Prayoga, S.Pd." }
      ]
    },
    {
      day: "Jumat",
      dayCode: 5,
      subjects: [
        { time: "06:30 - 07:10", name: "Shalat Dhuha", mentor: "Tim Keagamaan" },
        { time: "07:10 - 09:10", name: "Fisika", mentor: "R. Endah Siti Maryam, S.Si." },
        { time: "09:25 - 11:25", name: "Bahasa Inggris", mentor: "Subriatul Wirda, S.Pd." },
        { time: "12:45 - 14:15", name: "Bahasa Indonesia", mentor: "Santi Susanti, S.Pd." }
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

  gallery: [],

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