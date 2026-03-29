<!doctype html>
<!-- Menambahkan class 'dark' akan di-toggle oleh JS -->
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SIMAS - Sistem Manajemen Sampah</title>
    <!-- Memuat Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Memuat Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Memuat Font Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="manifest" href="manifest.json" />
    <meta name="theme-color" content="#16a34a" />
    <link rel="apple-touch-icon" href="icon-192x192.png" />
    <style>
      /* Menggunakan font Inter sebagai default */
      body {
        font-family: "Inter", sans-serif;
        /* Transisi untuk warna latar belakang */
        @apply transition-colors duration-300;
      }
      /* Custom class untuk transisi yang mulus */
      .fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      /* Custom scrollbar untuk daftar TPS */
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #cbd5e1;
        border-radius: 20px;
      }
      .dark .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #475569;
      }
      /* Background pattern untuk login/register */
      .login-bg {
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
    </style>
    <script>
      // Menambahkan konfigurasi dark mode untuk Tailwind
      tailwind.config = {
        darkMode: "class", // Mengaktifkan mode gelap berbasis class
        theme: {
          extend: {
            // Mengganti palet warna default gray ke slate
            colors: {
              gray: tailwind.colors.slate,
            },
          },
        },
      };
    </script>
  </head>
  <!-- Body layout flex column untuk footer sticky -->
  <body
    class="bg-slate-100 dark:bg-slate-900 min-h-screen flex flex-col login-bg"
  >
    <!-- Header (Navigasi) -->
    <header
      class="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50 transition-colors duration-300"
    >
      <div
        class="container mx-auto px-6 py-4 flex justify-between items-center"
      >
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0H5"
              ></path>
            </svg>
          </div>
          <h1
            class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight"
          >
            SIMAS
          </h1>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Teks Dashboard (Hanya muncul jika sudah login) -->
          <span
            id="headerUserNav"
            class="text-sm font-semibold text-slate-600 dark:text-slate-400 hidden md:block"
          >
            <!-- Akan diisi JS berdasarkan Role -->
          </span>

          <!-- Tombol Bahasa -->
          <button
            id="langToggle"
            class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            ID
          </button>

          <!-- Tombol Dark Mode Toggle -->
          <button
            id="darkModeToggle"
            class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <!-- Ikon Bulan (default) -->
            <svg
              id="moonIcon"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
            <!-- Ikon Matahari (tersembunyi) -->
            <svg
              id="sunIcon"
              class="w-4 h-4 hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- HALAMAN 1: LOGIN VIEW -->
    <section
      id="login-view"
      class="flex-grow flex items-center justify-center p-4 fade-in"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700"
      >
        <div class="p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Selamat Datang
            </h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              Masuk untuk mengakses dashboard manajemen sampah.
            </p>
          </div>

          <form id="loginForm" class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >Email / Username</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <!-- Placeholder universal -->
                <input
                  type="text"
                  id="email"
                  class="pl-10 block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan email atau username"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >Password</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  class="pl-10 block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-slate-600 dark:text-slate-400 cursor-pointer"
                  >Ingat saya</label
                >
              </div>
              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-green-600 hover:text-green-500 dark:text-green-400"
                  >Lupa password?</a
                >
              </div>
            </div>

            <!-- Tombol Login Universal -->
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors transform hover:scale-[1.02]"
            >
              Masuk
            </button>
          </form>

          <!-- Tautan ke Registrasi -->
          <div class="mt-6 text-center">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Belum punya akun?
              <button
                id="btnToRegister"
                class="font-medium text-green-600 hover:text-green-500 dark:text-green-400 underline focus:outline-none"
              >
                Daftar di sini
              </button>
            </p>
          </div>
        </div>
        <div
          class="px-8 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex justify-center"
        >
          <p class="text-xs text-slate-500 dark:text-slate-400">
            &copy; 2025 Pemerintah Kota Malang
          </p>
        </div>
      </div>
    </section>

    <!-- HALAMAN 2: REGISTER VIEW (Default Hidden) -->
    <section
      id="register-view"
      class="flex-grow flex items-center justify-center p-4 hidden fade-in"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700"
      >
        <div class="p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Buat Akun Baru
            </h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              Daftar untuk mulai menggunakan SIMAS.
            </p>
          </div>

          <form id="registerForm" class="space-y-4">
            <!-- Nama Lengkap -->
            <div>
              <label
                for="regName"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >Nama Lengkap</label
              >
              <input
                type="text"
                id="regName"
                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Nama Anda"
                required
              />
            </div>

            <!-- Email -->
            <div>
              <label
                for="regEmail"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >Email / Username</label
              >
              <input
                type="text"
                id="regEmail"
                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Username atau Email"
                required
              />
            </div>

            <!-- Peran -->
            <div>
              <label
                for="regRole"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >Daftar Sebagai</label
              >
              <select
                id="regRole"
                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              >
                <option value="public">Masyarakat Umum</option>
                <option value="officer">Petugas Kebersihan</option>
              </select>
            </div>

            <!-- Password -->
            <div>
              <label
                for="regPassword"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >Password</label
              >
              <input
                type="password"
                id="regPassword"
                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <!-- Confirm Password -->
            <div>
              <label
                for="regConfirmPassword"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >Konfirmasi Password</label
              >
              <input
                type="password"
                id="regConfirmPassword"
                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors transform hover:scale-[1.02] mt-6"
            >
              Daftar Akun
            </button>
          </form>

          <!-- Tautan kembali ke Login -->
          <div class="mt-6 text-center">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Sudah punya akun?
              <button
                id="btnToLogin"
                class="font-medium text-green-600 hover:text-green-500 dark:text-green-400 underline focus:outline-none"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- HALAMAN 3: DASHBOARD VIEW (Default Hidden) -->
    <main
      id="dashboard-view"
      class="container mx-auto p-4 md:p-8 flex-grow hidden"
    >
      <!-- FITUR KHUSUS ADMIN (Hanya tampil untuk Admin) -->
      <section
        id="adminPanel"
        class="bg-slate-800 dark:bg-slate-700 text-white p-6 rounded-lg shadow-lg mb-8 hidden fade-in"
      >
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-2">
            <div class="bg-yellow-500 p-2 rounded-lg">
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <h2 class="text-lg font-bold">Panel Admin & Operasional</h2>
          </div>
          <span
            class="text-xs bg-slate-600 px-2 py-1 rounded border border-slate-500"
            >Akses Terbatas</span
          >
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onclick="
              alert(
                'Simulasi: Armada tambahan telah dikerahkan ke titik overload!',
              )
            "
            class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            Kerahkan Armada (Darurat)
          </button>
          <button
            onclick="
              alert(
                'Simulasi: Status sensor IoT di-reset. Data pengambilan telah dicatat.',
              )
            "
            class="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reset Sensor & Verifikasi
          </button>
          <button
            onclick="
              alert('Simulasi: Mengunduh laporan_harian_sampah_malang.csv...')
            "
            class="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-3 rounded-lg font-medium transition-colors border border-slate-500"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Unduh Laporan Harian
          </button>
        </div>
      </section>

      <!-- Bagian Kontrol / Input -->
      <section
        class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg mb-8 fade-in"
      >
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center mb-4"
        >
          <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-200">
            Panel Kontrol Analisis
          </h2>
          <button
            id="logoutButton"
            class="text-sm text-red-500 hover:text-red-700 font-medium mt-2 md:mt-0"
          >
            Keluar
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Input Kelurahan -->
          <div>
            <label
              for="kelurahanSelect"
              class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
              >Pilih Kecamatan</label
            >
            <select
              id="kelurahanSelect"
              class="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">-- Tampilkan Data Area --</option>
              <option value="Lowokwaru">Lowokwaru</option>
              <option value="Blimbing">Blimbing</option>
              <option value="Klojen">Klojen</option>
              <option value="Sukun">Sukun</option>
              <option value="Kedungkandang">Kedungkandang</option>
            </select>
          </div>
          <!-- Pilihan Jalur Distribusi (DIUBAH: Diberikan ID container untuk disembunyikan) -->
          <div id="routeControlContainer">
            <label
              for="routeSelect"
              class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
              >Pilihan Jalur Distribusi</label
            >
            <select
              id="routeSelect"
              class="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="optimal">Rute Optimal (Prediksi BDA)</option>
              <option value="standar">Rute Standar (Konvensional)</option>
            </select>
          </div>
          <!-- Tombol Aksi -->
          <div class="md:mt-7">
            <button
              id="showDataButton"
              class="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Tampilkan Data
            </button>
          </div>
        </div>
      </section>

      <!-- Bagian Tampilan Hasil (Default Tersembunyi) -->
      <section id="results" class="hidden fade-in">
        <!-- Ringkasan Statistik -->
        <div class="mb-8">
          <h3
            id="areaTitle"
            class="text-2xl font-bold text-slate-800 dark:text-white mb-4"
          ></h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg flex items-center space-x-4"
            >
              <div class="bg-blue-100 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  Prediksi Volume (Besok)
                </p>
                <p
                  id="statPrediksi"
                  class="text-xl font-bold text-slate-900 dark:text-white"
                ></p>
              </div>
            </div>

            <!-- DIUBAH: ID ditambahkan untuk disembunyikan bagi masyarakat -->
            <div
              id="efisiensiCard"
              class="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg flex items-center space-x-4"
            >
              <div class="bg-green-100 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  Estimasi Efisiensi Rute
                </p>
                <p
                  id="statEfisiensi"
                  class="text-lg font-bold text-slate-900 dark:text-white"
                ></p>
              </div>
            </div>

            <div
              class="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg flex items-center space-x-4"
            >
              <div class="bg-yellow-100 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0H5"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  TPS Prioritas
                </p>
                <p
                  id="statPrioritas"
                  class="text-xl font-bold text-slate-900 dark:text-white"
                ></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid untuk Chart dan Peta -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <!-- Kolom Chart -->
          <!-- DIUBAH: ID chartContainer ditambahkan untuk manipulasi grid -->
          <div
            id="chartContainer"
            class="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg transition-all duration-300"
          >
            <h3
              class="text-lg font-semibold text-slate-800 dark:text-white mb-4"
            >
              Grafik Volume Sampah (7 Hari Terakhir)
            </h3>
            <div class="h-80">
              <!-- Kontainer untuk menjaga ukuran chart -->
              <canvas id="wasteChart"></canvas>
            </div>
          </div>

          <!-- Kolom Peta (DIUBAH: ID mapContainer ditambahkan untuk disembunyikan) -->
          <div
            id="mapContainer"
            class="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
          >
            <h3
              class="text-lg font-semibold text-slate-800 dark:text-white mb-4"
            >
              Visualisasi Jalur Distribusi
            </h3>
            <p
              id="routeDescription"
              class="text-sm text-slate-600 dark:text-slate-400 mb-4"
            ></p>
            <div
              class="w-full h-80 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden"
            >
              <iframe
                id="routeMap"
                class="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.25008272216!2d112.56166164323214!3d-7.982823195120531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e788274d9f109a1%3A0x40a8f6f59d9c2f6d!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1731779500000!5m2!1sen!2sid"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- FITUR BARU: STATUS IOT & KOMPOSISI SAMPAH -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 1. Status TPS (Simulasi IoT) -->
          <div
            class="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
                <span class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-red-500 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                    ></path>
                  </svg>
                  Status TPS
                </span>
              </h3>
            </div>
            <div
              class="space-y-4 overflow-y-auto max-h-64 custom-scrollbar pr-2"
              id="iotStatusList"
            >
              <!-- List akan diisi oleh JavaScript -->
            </div>
          </div>

          <!-- 2. Grafik Komposisi Sampah -->
          <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <h3
              class="text-lg font-semibold text-slate-800 dark:text-white mb-4"
            >
              Komposisi Sampah
            </h3>
            <div class="h-64 flex justify-center">
              <canvas id="compositionChart"></canvas>
            </div>
            <p class="text-xs text-center text-slate-500 mt-4 italic">
              Data estimasi berdasarkan sampling terakhir
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER YANG DIPERBARUI -->
    <footer
      class="mt-auto py-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700"
    >
      <div class="text-center text-slate-500 dark:text-slate-400 text-sm">
        <p class="font-medium">
          Sistem Manajemen Distribusi Sampah Terintegrasi (SIMAS)
        </p>
      </div>
    </footer>

    <script>
      // Data simulasi (Mock Data)
      const mockData = {
        Lowokwaru: {
          labels: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
          ],
          chartData: [175.2, 188.1, 180.5, 192.3, 185.0, 201.4, 190.7],
          routeOptimal: {
            img: "https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d15805.137839611593!2d112.59775835!3d-7.9702221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x2e78821c1106c679%3A0x6b74b6c3e601c2e7!2sTPS%20Dinoyo%20Permai!3m2!1d-7.941329!2d112.607446!4m5!1s0x2e78820b1e42c51f%3A0x6d9a01e3b5e43b7!2sTPS%20TAWANGMANGU%2C%20Jl.%20Tawangmangu%20No.16%2C%20Lowokwaru%2C%20Kec.%20Lowokwaru%2C%20Kota%20Malang%2C%20Jawa%20Timur%2065141!3m2!1d-7.955414!2d112.612613!4m5!1s0x2e78821e45c09d57%3A0x833b652f1b4009b0!2sTPS%20sumbersari%20kota%20malang%2C%20Jl.%20Bendungan%20Sutami%20No.54SumbersariKec%2C%20Kec.%20Lowokwaru%2C%20Kota%20Malang%2C%20Jawa%20Timur%2065145!3m2!1d-7.9613133!2d112.6106691!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731807000000!5m2!1sen!2sid",
            desc: "Rute BDA: Rute klasterisasi (4 titik) berdasarkan 3 TPS terpadat (Dinoyo, Tawangmangu, Sumbersari) ke TPA Supit Urang.",
          },
          routeStandar: {
            img: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15805.137839611593!2d112.59775834999999!3d-7.970222099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x2e78820b1e42c51f%3A0x6d9a01e3b5e43b7!2sTPS%20TAWANGMANGU%2C%20Jl.%20Tawangmangu%20No.16%2C%20Lowokwaru%2C%20Kec.%20Lowokwaru%2C%20Kota%20Malang%2C%20Jawa%20Timur%2065141!3m2!1d-7.955414!2d112.612613!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731794022834!5m2!1sen!2sid",
            desc: "Rute Konvensional: Rute reaktif 2 titik (TPS Tawangmangu) ke TPA Supit Urang.",
          },
          stats: {
            prediksi: "193.5 Ton",
            efisiensi: "Waktu 22%, BBM 15%",
            prioritas: "Dinoyo, Tawangmangu, Sumbersari",
          },
          iotStatus: [
            { name: "TPS Tawangmangu", load: 88, status: "Kritis" },
            { name: "TPS Dinoyo Permai", load: 65, status: "Normal" },
            { name: "TPS Sumbersari", load: 42, status: "Aman" },
            { name: "TPS Tlogomas", load: 70, status: "Waspada" },
          ],
          composition: [61, 18, 12, 9],
        },
        Blimbing: {
          labels: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
          ],
          chartData: [150.1, 155.3, 160.2, 148.9, 165.0, 170.1, 158.4],
          routeOptimal: {
            img: "https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d15806.31911475713!2d112.60790895!3d-7.9395277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x2e78829340c34f39%3A0x335914f6b6e71e3a!2sTPS%20Terminal%20Arjosari!3m2!1d-7.9300645!2d112.6567215!4m5!1s0x2e7882a026e28e35%3A0x5503346a7e560036!2sTPS%20cakalang%2C%20Jl.%20Cakalang%20No.2f%2C%20Polowijen%2C%20Blimbing%2C%20Malang%20City%2C%20East%20Java%2065126!3m2!1d-7.934912!2d112.642154!4m5!1s0x2e78829c20f182c1%3A0x2368c348f219504c!2sTPS%20Sulfat!3m2!1d-7.957538!2d112.645511!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731808000000!5m2!1sen!2sid",
            desc: "Rute BDA: Rute klasterisasi (4 titik) berdasarkan 3 TPS terpadat (Arjosari, Cakalang, Sulfat) ke TPA Supit Urang.",
          },
          routeStandar: {
            img: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15806.31911475713!2d112.60790895!3d-7.9395277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x2e78829340c34f39%3A0x335914f6b6e71e3a!2sTPS%20Terminal%20Arjosari!3m2!1d-7.9300645!2d112.6567215!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731794318725!5m2!1sen!2sid",
            desc: "Rute Konvensional: Rute reaktif 2 titik (TPS Arjosari) ke TPA Supit Urang.",
          },
          stats: {
            prediksi: "168.0 Ton",
            efisiensi: "Waktu 18%, BBM 12%",
            prioritas: "TPS Arjosari, Cakalang, Sulfat",
          },
          iotStatus: [
            { name: "TPS Arjosari", load: 92, status: "Kritis" },
            { name: "TPS Cakalang", load: 78, status: "Waspada" },
            { name: "TPS Sulfat", load: 55, status: "Normal" },
          ],
          composition: [58, 22, 10, 10],
        },
        Klojen: {
          labels: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
          ],
          chartData: [140.5, 145.2, 150.0, 138.8, 155.1, 160.3, 142.0],
          routeOptimal: {
            img: "https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d15804.580453306915!2d112.59477645!3d-7.9814421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x2e788277a5611e1b%3A0x75c835054366f07!2sTPS%20Pasar%20Besar!3m2!1d-7.983995!2d112.632949!4m5!1s0x2e788274d9f109a1%3A0x40a8f6f59d9c2f6d!2sTPS%20Alun-alun%20Merdeka!3m2!1d-7.9831388!2d112.6300109!4m5!1s0x2e788279867118c3%3A0x67c299c8085d776c!2sTPS%20Stasiun%20Malang!3m2!1d-7.9782522!2d112.633722!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731805550000!5m2!1sen!2sid",
            desc: "Rute BDA: Rute klasterisasi (4 titik) berdasarkan 3 TPS terpadat (Pasar Besar, Alun-alun, Stasiun) ke TPA Supit Urang.",
          },
          routeStandar: {
            img: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15804.580453306915!2d112.59477645!3d-7.9814421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x2e788277a5611e1b%3A0x75c835054366f07!2sTPS%20Pasar%20Besar!3m2!1d-7.983995!2d112.632949!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%2S%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731794220311!5m2!1sen!2sid",
            desc: "Rute Konvensional: Rute reaktif 2 titik (TPS Pasar Besar) ke TPA Supit Urang.",
          },
          stats: {
            prediksi: "158.2 Ton",
            efisiensi: "Waktu 15%, BBM 10%",
            prioritas: "Pasar Besar, Alun-alun, Stasiun",
          },
          iotStatus: [
            { name: "TPS Pasar Besar", load: 95, status: "Kritis" },
            { name: "TPS Alun-alun", load: 85, status: "Kritis" },
            { name: "TPS Stasiun", load: 60, status: "Normal" },
          ],
          composition: [55, 25, 15, 5],
        },
        Sukun: {
          labels: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
          ],
          chartData: [120.3, 125.1, 130.0, 118.9, 135.2, 140.3, 122.4],
          routeOptimal: {
            img: "https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d15803.954625501866!2d112.59363025!3d-7.9972337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x2e7883b6c7c81335%3A0x44654e5a99539c3c!2sTPS%20Induk%20Sukun!3m2!1d-8.0132338!2d112.628889!4m5!1s0x2e7883a48e8e3d09%3A0x1d3a5a79d0342e!2sTPS%20Tanjungrejo%2C%20Kec.%20Sukun%2C%20Kota%20Malang!3m2!1d-8.0016447!2d112.6240212!4m5!1s0x2e7883a41855a021%3A0x673a00f2e20b8f2!2sTPS%20Bandulan!3m2!1d-7.9961623!2d112.610667!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731805700000!5m2!1sen!2sid",
            desc: "Rute BDA: Rute klasterisasi (4 titik) berdasarkan 3 TPS terpadat (Induk Sukun, Tanjungrejo, Bandulan) ke TPA Supit Urang.",
          },
          routeStandar: {
            img: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15803.954625501866!2d112.59363025!3d-7.9972337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x2e7883b6c7c81335%3A0x44654e5a99539c3c!2sTPS%20Induk%20Sukun!3m2!1d-8.0132338!2d112.628889!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731803650000!5m2!1sen!2sid",
            desc: "Rute Konvensional: Rute reaktif 2 titik (TPS Induk Sukun) ke TPA Supit Urang.",
          },
          stats: {
            prediksi: "138.1 Ton",
            efisiensi: "Waktu 20%, BBM 14%",
            prioritas: "Induk Sukun, Tanjungrejo, Bandulan",
          },
          iotStatus: [
            { name: "TPS Induk Sukun", load: 82, status: "Kritis" },
            { name: "TPS Tanjungrejo", load: 70, status: "Waspada" },
            { name: "TPS Bandulan", load: 45, status: "Aman" },
          ],
          composition: [65, 15, 10, 10],
        },
        Kedungkandang: {
          labels: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
          ],
          chartData: [102.1, 108.3, 112.0, 99.4, 115.6, 120.9, 104.5],
          routeOptimal: {
            img: "https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d15804.815915228514!2d112.61399615!3d-7.9786487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x2e7882a611189c7d%3A0x673c1f1f26f2c035!2sTPS%20Madyopuro!3m2!1d-7.9730556!2d112.6631806!4m5!1s0x2e7882b0e6113b91%3A0x97f5f53d11b5a56!2sTPS%2C%20Sawojajar%2C%20Kec.%20Kedungkandang%2C%20Kota%20Malang!3m2!1d-7.9705934!2d112.6517178!4m5!1s0x2e7882aef10ef935%3A0xa1021966a01d36a9!2sTPS%20Buring!3m2!1d-7.9941151!2d112.6515865!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731805650000!5m2!1sen!2sid",
            desc: "Rute BDA: Rute klasterisasi (4 titik) berdasarkan 3 TPS terpadat (Madyopuro, Sawojajar, Buring) ke TPA Supit Urang.",
          },
          routeStandar: {
            img: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15804.815915228514!2d112.61399615!3d-7.9786487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x2e7882a611189c7d%3A0x673c1f1f26f2c035!2sTPS%20Madyopuro!3m2!1d-7.9730556!2d112.6631806!4m5!1s0x2e7883391264c01b%3A0xad035b0b28e6702e!2sTPA%20Supit%20Urang!3m2!1d-8.0142079!2d112.601552!5e0!3m2!1sen!2sid!4v1731803550000!5m2!1sen!2sid",
            desc: "Rute Konvensional: Rute reaktif 2 titik (TPS Madyopuro) ke TPA Supit Urang.",
          },
          stats: {
            prediksi: "118.3 Ton",
            efisiensi: "Waktu 17%, BBM 11%",
            prioritas: "Madyopuro, Sawojajar, Buring",
          },
          iotStatus: [
            { name: "TPS Madyopuro", load: 88, status: "Kritis" },
            { name: "TPS Sawojajar", load: 75, status: "Waspada" },
            { name: "TPS Buring", load: 50, status: "Aman" },
          ],
          composition: [60, 20, 10, 10],
        },
      };

      // --- Referensi Elemen DOM ---
      const loginView = document.getElementById("login-view");
      const registerView = document.getElementById("register-view");
      const dashboardView = document.getElementById("dashboard-view");

      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");

      const headerUserNav = document.getElementById("headerUserNav");
      const logoutButton = document.getElementById("logoutButton");

      const btnToRegister = document.getElementById("btnToRegister");
      const btnToLogin = document.getElementById("btnToLogin");

      const kelurahanSelect = document.getElementById("kelurahanSelect");
      const routeSelect = document.getElementById("routeSelect");
      const showDataButton = document.getElementById("showDataButton");
      const resultsSection = document.getElementById("results");

      const areaTitle = document.getElementById("areaTitle");
      const statPrediksi = document.getElementById("statPrediksi");
      const statEfisiensi = document.getElementById("statEfisiensi");
      const statPrioritas = document.getElementById("statPrioritas");

      const mapContainer = document.getElementById("mapContainer");
      const routeControlContainer = document.getElementById(
        "routeControlContainer",
      );
      const efisiensiCard = document.getElementById("efisiensiCard");
      const chartContainer = document.getElementById("chartContainer");

      const adminPanel = document.getElementById("adminPanel");

      const routeMap = document.getElementById("routeMap");
      const routeDescription = document.getElementById("routeDescription");
      const chartCanvas = document
        .getElementById("wasteChart")
        .getContext("2d");
      const iotStatusList = document.getElementById("iotStatusList");
      const compositionChartCanvas = document
        .getElementById("compositionChart")
        .getContext("2d");

      let wasteChartInstance = null;
      let compositionChartInstance = null;
      let currentUserRole = "admin"; // Default

      // --- SIMULASI DATABASE PENGGUNA ---
      const usersDatabase = [
        {
          email: "admin",
          password: "eladmin123",
          role: "admin",
          name: "Administrator",
        },
      ];

      // --- Logika Navigasi Login & Register ---

      // Switch ke Register View
      btnToRegister.addEventListener("click", function () {
        loginView.classList.add("hidden");
        registerView.classList.remove("hidden");
        registerView.classList.add("fade-in");
      });

      // Switch ke Login View
      btnToLogin.addEventListener("click", function () {
        registerView.classList.add("hidden");
        loginView.classList.remove("hidden");
        loginView.classList.add("fade-in");
      });

      // Handle Login (Masuk ke Dashboard)
      function handleLogin(role) {
        currentUserRole = role;

        // Transisi Tampilan
        loginView.classList.add("hidden");
        registerView.classList.add("hidden"); // Pastikan register juga hidden
        dashboardView.classList.remove("hidden");
        dashboardView.classList.add("fade-in");
        headerUserNav.classList.remove("hidden");

        // Set Teks Header
        if (role === "public") {
          headerUserNav.textContent = "Dashboard Masyarakat";
        } else if (role === "officer") {
          headerUserNav.textContent = "Dashboard Petugas";
        } else {
          headerUserNav.textContent = "Dashboard Admin Pemerintah";
        }

        // Atur Tampilan Berdasarkan Peran
        adjustLayoutBasedOnRole(role);
      }

      // --- FUNGSI UTAMA: Atur Layout Berdasarkan Peran ---
      function adjustLayoutBasedOnRole(role) {
        // Reset Tampilan Awal (Default: Tampilkan semua fitur dasar)
        mapContainer.classList.remove("hidden");
        routeControlContainer.classList.remove("hidden");
        efisiensiCard.classList.remove("hidden");
        adminPanel.classList.add("hidden"); // Default hidden
        chartContainer.classList.remove("lg:col-span-5");
        chartContainer.classList.add("lg:col-span-3");

        if (role === "public") {
          // --- MODE MASYARAKAT ---
          // Sembunyikan Peta, Kontrol Rute, dan Efisiensi
          mapContainer.classList.add("hidden");
          routeControlContainer.classList.add("hidden");
          efisiensiCard.classList.add("hidden");
          // Lebarkan Grafik agar Penuh
          chartContainer.classList.remove("lg:col-span-3");
          chartContainer.classList.add("lg:col-span-5");
        } else if (role === "officer") {
          // --- MODE PETUGAS ---
          // Tampilkan Peta & Rute, tapi Sembunyikan Admin Panel
          // (Sudah default di atas)
        } else if (role === "admin") {
          // --- MODE ADMIN ---
          // Tampilkan Semua + Admin Panel
          adminPanel.classList.remove("hidden");
        }

        // Reset hasil pencarian sebelumnya
        resultsSection.classList.add("hidden");
        kelurahanSelect.value = "";
      }

      // EVENT LISTENER: LOGIN FORM UTAMA
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Cari user di database
        const foundUser = usersDatabase.find(
          (u) => u.email === email && u.password === password,
        );

        if (foundUser) {
          // Login Berhasil
          handleLogin(foundUser.role);
        } else {
          alert("Login Gagal: Email atau password salah!");
        }
      });

      // EVENT LISTENER: REGISTER FORM
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const role = document.getElementById("regRole").value;
        const password = document.getElementById("regPassword").value;
        const confirmPassword =
          document.getElementById("regConfirmPassword").value;

        // Validasi Password
        if (password !== confirmPassword) {
          alert("Konfirmasi password tidak sesuai!");
          return;
        }

        // Simpan user baru ke array (Database Simulasi)
        const newUser = {
          email: email,
          password: password,
          role: role,
          name: name,
        };
        usersDatabase.push(newUser);

        alert("Pendaftaran Berhasil! Anda akan masuk secara otomatis.");
        handleLogin(role);
      });

      logoutButton.addEventListener("click", function () {
        dashboardView.classList.add("hidden");
        loginView.classList.remove("hidden");
        loginView.classList.add("fade-in");
        headerUserNav.classList.add("hidden");
        // Reset forms
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("regName").value = "";
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";
        document.getElementById("regConfirmPassword").value = "";
      });

      // --- Logika Dark Mode ---
      const darkModeToggle = document.getElementById("darkModeToggle");
      const moonIcon = document.getElementById("moonIcon");
      const sunIcon = document.getElementById("sunIcon");
      const htmlElement = document.documentElement;

      function applyTheme(theme) {
        if (theme === "dark") {
          htmlElement.classList.add("dark");
          moonIcon.classList.add("hidden");
          sunIcon.classList.remove("hidden");
          localStorage.setItem("theme", "dark");
        } else {
          htmlElement.classList.remove("dark");
          moonIcon.classList.remove("hidden");
          sunIcon.classList.add("hidden");
          localStorage.setItem("theme", "light");
        }
        if (wasteChartInstance) updateDashboard();
      }

      darkModeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.classList.contains("dark")
          ? "light"
          : "dark";
        applyTheme(currentTheme);
      });

      const savedTheme = localStorage.getItem("theme") || "light";
      applyTheme(savedTheme);

      // --- Logika Dashboard ---
      function updateDashboard() {
        const selectedKelurahan = kelurahanSelect.value;

        // Default ke 'optimal' jika user publik (karena dropdown disembunyikan)
        const selectedRouteType =
          currentUserRole === "public"
            ? "optimal"
            : document.getElementById("routeSelect").value;

        if (!selectedKelurahan) {
          resultsSection.classList.add("hidden");
          return;
        }

        resultsSection.classList.remove("hidden");
        const data = mockData[selectedKelurahan];

        areaTitle.textContent = `Analisis Data: Kecamatan ${selectedKelurahan}`;
        statPrediksi.textContent = data.stats.prediksi;

        // Logika efisiensi & Peta hanya jika bukan masyarakat
        if (currentUserRole !== "public") {
          if (selectedRouteType === "optimal") {
            statEfisiensi.textContent = data.stats.efisiensi;
          } else {
            statEfisiensi.textContent = "Waktu: 0%, BBM: 0% (Baseline)";
          }

          const routeInfo =
            selectedRouteType === "optimal"
              ? data.routeOptimal
              : data.routeStandar;
          routeMap.src = routeInfo.img;
          routeDescription.textContent = routeInfo.desc;
        }

        statPrioritas.textContent = data.stats.prioritas;

        const isDarkMode = htmlElement.classList.contains("dark");
        const chartTextColor = isDarkMode ? "#e2e8f0" : "#334155";
        const gridColor = isDarkMode
          ? "rgba(226, 232, 240, 0.2)"
          : "rgba(51, 65, 85, 0.1)";

        // Update Line Chart
        if (wasteChartInstance) wasteChartInstance.destroy();
        wasteChartInstance = new Chart(chartCanvas, {
          type: "line",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Volume Sampah (Ton)",
                data: data.chartData,
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderColor: "rgba(34, 197, 94, 1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Volume (Ton)",
                  color: chartTextColor,
                },
                ticks: { color: chartTextColor },
                grid: { color: gridColor },
              },
              x: {
                ticks: { color: chartTextColor },
                grid: { color: gridColor },
              },
            },
            plugins: {
              legend: { labels: { color: chartTextColor } },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.parsed.y} Ton`;
                  },
                },
              },
            },
          },
        });

        // Update IoT Status List
        iotStatusList.innerHTML = "";
        data.iotStatus.forEach((tps) => {
          let colorClass = "bg-green-500";
          if (tps.load > 80) colorClass = "bg-red-500";
          else if (tps.load > 60) colorClass = "bg-yellow-500";

          const listItem = `
                    <div>
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">${tps.name}</span>
                            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">${tps.load}% (${tps.status})</span>
                        </div>
                        <div class="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
                            <div class="${colorClass} h-2.5 rounded-full" style="width: ${tps.load}%"></div>
                        </div>
                    </div>
                `;
          iotStatusList.innerHTML += listItem;
        });

        // Update Doughnut Chart
        if (compositionChartInstance) compositionChartInstance.destroy();
        compositionChartInstance = new Chart(compositionChartCanvas, {
          type: "doughnut",
          data: {
            labels: ["Organik", "Plastik", "Kertas", "Lainnya"],
            datasets: [
              {
                data: data.composition,
                backgroundColor: [
                  "rgba(34, 197, 94, 0.8)",
                  "rgba(59, 130, 246, 0.8)",
                  "rgba(234, 179, 8, 0.8)",
                  "rgba(100, 116, 139, 0.8)",
                ],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
                labels: { color: chartTextColor },
              },
            },
          },
        });
      }

      showDataButton.addEventListener("click", updateDashboard);

      document
        .getElementById("langToggle")
        .addEventListener("click", function () {
          this.textContent = this.textContent === "ID" ? "EN" : "ID";
        });
    </script>
    <script>
      // Mendaftarkan Service Worker untuk PWA
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("./service-worker.js")
            .then((registration) => {
              console.log(
                "ServiceWorker berhasil didaftarkan dengan scope: ",
                registration.scope,
              );
            })
            .catch((error) => {
              console.log("Pendaftaran ServiceWorker gagal: ", error);
            });
        });
      }
    </script>
  </body>
</html>
