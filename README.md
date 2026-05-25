VLSM Subnetting Calculator 

An interactive, real-time Variable Length Subnet Mask (VLSM) calculator built for network engineers, telecommunication students, and system administrators to plan efficient IP address allocation.

Live Demo: [https://vlsm-calculator-zeta.vercel.app/](https://vlsm-calculator-zeta.vercel.app/)



1. Tentang Proyek

Dalam arsitektur jaringan telekomunikasi, efisiensi alokasi IP address adalah hal yang krusial untuk menghindari pemborosan ruang alamat. Aplikasi web VLSM Calculator ini dirancang untuk menyelesaikan perhitungan subnetting matematis jaringan yang kompleks secara otomatis dan instan.

Proyek ini dibuat untuk menjembatani kompetensi di bidang "Infrastruktur Jaringan Telekomunikasi" dengan "Modern Web Development", menghasilkan alat utilitas yang memiliki nilai guna tinggi serta antarmuka yang intuitif bagi pengguna.



2. Fitur Utama

- Kalkulasi Real-Time: Hasil perhitungan langsung diperbarui setiap kali pengguna mengubah IP dasar atau jumlah kebutuhan host tanpa perlu memuat ulang halaman (zero latency).
- Algoritma Pengurutan Otomatis: Mengimplementasikan aturan mutlak VLSM di mana daftar subnet otomatis diurutkan berdasarkan kebutuhan host terbesar ke terkecil (descending order) sebelum memproses alokasi blok IP.
- Manajemen Subnet Dinamis: Pengguna dapat menambah, menghapus, atau mengubah nama dan kebutuhan host pada setiap baris subnet secara interaktif.
- Visualisasi Data Jaringan Komprehensif: Menampilkan metrik jaringan penting secara transparan:
  - Alokasi Blok Prefix (CIDR) beserta total kapasitas IP yang disediakan.
  - Alamat Network ID untuk setiap segmen.
  - Rentang IP Valid (Usable IP Range) yang siap dikonfigurasi pada perangkat hos.
  - Alamat Broadcast ID.
- Antarmuka Modern & Responsif: Desain UI/UX yang bersih, minimalis, dan nyaman dipandang, serta adaptif untuk perangkat mobile maupun desktop.



3. Tech Stack & Arsitektur

Aplikasi ini dibangun menggunakan ekosistem pengembangan web modern berkinerja tinggi:

- Core Framework: [React.js](https://react.dev/) (menggunakan [Vite](https://vite.dev/) sebagai build tool untuk efisiensi modul hulu).
- Styling Engine: [Tailwind CSS v4](https://tailwindcss.com/) dengan integrasi plugin resmi `@tailwindcss/vite` untuk optimasi utilitas CSS secara penuh tanpa file konfigurasi yang membengkak.
- Logic & State Management: Vanilla JavaScript (ES6+) memanfaatkan `useMemo` hooks untuk meminimalisir kalkulasi ulang (*re-rendering*) yang tidak perlu pada array objek data jaringan.



4. Logika & Algoritma Inti

Inti dari aplikasi ini terletak pada manipulasi bitwise terhadap alamat IP IPv4. Alur logikanya adalah sebagai berikut:

1. Konversi Format: Alamat IP berupa string (e.g., `192.168.1.0`) dikonversi menjadi representasi integer 32-bit agar operasi aritmatika dan bitwise berjalan cepat.
2. Shorting Array: Mengurutkan input subnet berdasarkan kebutuhan host terbesar.
3. Pencarian Ukuran Blok: Menghitung ukuran blok terdekat yang dapat mengakomodasi kebutuhan "host" ditambah 2 alamat absolut (Network ID dan Broadcast ID).
4. Alokasi Berkelanjutan: Menghitung batas-batas alamat IP menggunakan offset integer, menyimpannya ke dalam array hasil, lalu memindahkan pointer IP awal ke blok berikutnya secara berurutan.
5. Rekonversi: Mengembalikan representasi integer kembali menjadi string format dot-decimal standar (`X.X.X.X`).



5. Instalasi dan Pengembangan Lokal

Jika Anda ingin menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah di bawah ini:

1. Clone repositori ini:
   ```bash
   git clone [https://github.com/username/vlsm-calculator.git](https://github.com/username/vlsm-calculator.git)
   cd vlsm-calculator
