bro gw lagi mau bikin mobile apps pake react native expo.
jadi gw mau bikin aplikasi manajemen warga, ruang lingkup nya adalah RW dan RT.
gw udah bikin api backend nya pake laravel.

jadi di aplikasi ini ada beberapa fitur, yaitu
1. Dashboard atau Menu Utama
    di menu utama nantinya akan ada report berupa statistik menggunakan chart. diataranya yaitu
    1.1. menampilkan report keuangan RT maupun RW.
    1.2. statistik warga beradasrkan jenis kelamin, agama, pendidikan, status perkawinan, dan lain-lain.
    1.3. menampilkan tagihan terkahir yang sedang tersedia.
    1.4. saya belum tahu report apa lagi, mungkin kamu bisa kasih saran.

2. Manjemen Data Master
    2.1. Data Warga. berisi informasi pribadi warga, seperti nama,email,phone,nik,jenis kelamin, tgl lahir, pekerjaan, pendidikan, dan lain-lain.
    2.2. Data RT. berisi informasi data RT, seperti nomor RT, ketua RT nya siapa, alamat dimana.
    2.3. Data Kategori Iuran Warga. iuran warga ada 2 jenis, wajib dan opsional. Jika wajib, artinya warga wajib membayar iuran tersebut sesuai minimal nominal yang sudah ditentukan. jika opsional, warga boleh membayar boleh juga tidak. data iuran nantinya akan dimasukkan dalam laporan keuangan.
    2.4. Data Kategori Kegiatan Profit. ini merupakan kategori untuk kegiatan warga yang sifat nya profit atau menghasilkan uang, seperti menjual barang bekas, umkm, dan lain nya. data kegiatan profit nantinya akan dimasukkan dalam laporan keuangan.

3. Umum
    3.1. Fitur Pengumuman. yaitu data pengumuman yang akan dibuat oleh pengurus RT maupun RW yang akan tampil di setiap akun warga.
    3.2. Fitur Aduan Masyarakat. warga dapat membuat aduan mengenai masalah disekitar lingkungan, seperti kemalingan, kehilangan, lingkungan kotor, listrik mati, lampu jalan mati, dan lain lain. yang nantinya akan ditanggapi oleh pengurus RT maupun RW
    3.3. Fitur Iuran Warga. ini berkaitan dengan point 2.3, ini adalah data iuran yang akan dibuat oleh pengurus RT atau RW, mungkin nanti juga bisa dibuat otomatis setiap bulan sistem akan membuat data iuran secara otomatis jika kategorinya di setting untuk dibuat secara otomatis. lalu di setiap data iuran warga, akan tampil list warga dan terlihat siapa yang sudah bayar dan belum. jika iuran warga statusnya sudah completed, maka sistem akan otomatis memasukkan dalam laporan keuangan.
    3.4. Fitur Kegiatan Profit. ini berkaitan dengan point 2.4, setelah selesai melakukan kegiatan, pengurus akan mengupload nya ke fitur ini, dengan memasukkan jumlah pendapatan yang nantinya akan dimasukkan dalam laporan keuangan. 

4. Keuangan
    Fitur Keuangan ini saya buat menggunakan siklus akuntansi. yang berfungsi sebagai manajemen keuangan secara akuntasi agar datanya rapih dan terstruktur dengan baik. Laporan Keuangan RT atau RW dapat dilihat secara publik oleh warga sebagai bentuk transparansi keuangan.
    Di Fitur Keuangan ini terdapat beberapa fitur, yaitu:
    4.1. COA. Chart of Account, atau akun akun transaksi. saya buat 3 akun utama saja, yaitu Harta/KAS, Pendapatan/Penerimaan, Pengeluaran/Biaya. pengurus nantinya akan bisa membuat akun turunan dari 3 akun utama tersebut
    4.2. Transaksi. untuk mencatat transaksi yang terjadi, seperti pengeluaran dan pemasukan. tentunya menggunakan siklus akuntansi beradasrkan akun yang sudah dibuat.
    4.3. Jurnal. untuk menampilkan data keuangan secara jurnal akuntansi.
    4.4. Ledger atau Buku Besar. untuk menampilkan data keuangan secara buku besar akuntansi.
    4.5. Posisi Keuangan atau Trial Balance. untuk menampilkan data keuangan secara trial balance akuntansi.
    4.6. Laporan Keuangan. untuk menampilkan laporan keuangan RT atau RW secara periodik, mungkin secara bulanan atau tahunan

dari ide gw tolong koreksi dan mungkin dari lu ada tambahan, seperti warga bisa edit data dirinya, upload foto profile. pokoknya tambahin aja yang menurut lu sesuai dengan kebutuhan RT RW.

Aplikasi Mobile “WargaKu” (RT/RW) – Desain UI

Gaya: modern, minimal, rounded-xl, bayangan lembut, warna utama #2563EB, aksen #22C55E & #F59E0B, dukung dark mode. Font Inter.

Navigasi: Bottom Tabs (Beranda, Iuran, Aduan, Keuangan, Profil). Header per screen dengan judul & aksi kanan (filter/tambah). FAB kontekstual.

Beranda:

Header: salam + chip Scope (RT/RW) dan periode (dropdown).

Card ringkasan kas: saldo kas besar, bar realisasi iuran, CTA Lihat Keuangan.

Bar chart tren pemasukan vs pengeluaran 6 bulan.

Donut pendapatan: iuran, kegiatan, lain.

Grid statistik demografi (gender, agama top3, pendidikan, status kawin).

Section Tagihan Aktif (list 3 item) dengan status chip & tombol Bayar.

Ringkasan Aduan (counter open/progress/selesai).

Carousel pengumuman terbaru (1–3).

Iuran (Warga):

Filter bar (periode, status, kategori).

List tagihan: nama kategori, periode, nominal, status chip, due date.

Detail tagihan: ringkasan due/paid/sisa, timeline pembayaran, tombol Bayar.

Form bayar: nominal, metode, upload bukti (kamera/galeri), catatan.

Iuran (Bendahara/Pengurus):

Tabel ringan per warga/KK: due | paid | status | aksi verifikasi.

Layar verifikasi: preview bukti, nominal, tanggal, tombol Verifikasi/Tolak.

Layar buat tagihan manual: pilih kategori, periode, target (RT/semua), due date.

Aduan:

Tabs: Semua, Saya. Filter status/kategori.

Kartu aduan: judul, kategori, status badge, thumbnail foto, waktu update.

Detail: deskripsi, galeri grid, peta mini, komentar thread, tombol Ubah Status (petugas), tombol Tutup + rating (pelapor).

FAB Buat Aduan: form kategori, judul, deskripsi, foto multi, lokasi opsional.

Keuangan (Publik/Warga):

Ringkasan periode: saldo awal/akhir, total pemasukan/pengeluaran.

Donut pendapatan; list Top 10 transaksi (ringkas).

Tombol Lihat Laporan Bulanan/Tahunan.

Keuangan (Bendahara):

List transaksi + filter; tombol Tambah Transaksi.

Form transaksi: tipe (pemasukan/pengeluaran/penyesuaian), tanggal, memo, akun kas & akun lawan, jumlah, lampiran.

Layar Jurnal, Buku Besar (pilih akun), Trial Balance (tabel).

Layar Laporan: pilih periode, tampilkan, tombol Ekspor.

Pengumuman:

List cards; detail dengan konten penuh & lampiran.

Editor (pengurus): judul, konten, schedule, target (RT/RW), upload.

Profil:

Avatar editable (crop), data pribadi (email/phone editable), data sensitif read-only.

Rumah/KK (read-only), tombol Ajukan Perubahan.

Preferensi (tema, bahasa, notifikasi), Keamanan (ganti password, logout semua).

States: empty, loading (skeleton), error (toast).

Komponen: Cards, Badges, Chips, Progress, Tabs, Tables ringan, Lists, FAB, Modals, DatePicker, Upload, Map mini, Chart (bar/donut).