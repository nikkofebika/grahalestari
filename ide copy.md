1) Koreksi & Pengayaan Fitur

A. Dashboard / Menu Utama (tambahan & koreksi)

Tambah filter konteks: Scope (RT/RW), periode (bulan/tahun/kustom range), dan role-aware content (warga vs pengurus).

Statistik tambahan:

Tren iuran 6–12 bulan (total ditagih vs realisasi).

Top 5 pengeluaran bulan ini (kategori).

Rasio kas: saldo awal → pemasukan → pengeluaran → saldo akhir periode.

Status aduan: terbuka, diproses, selesai.

Kepatuhan iuran: % warga sudah bayar per kategori iuran.

Ringkasan pengumuman terbaru & event/kegiatan terdekat.

B. Manajemen Data Master

Data Warga: izinkan warga update profilnya sendiri (edit data tertentu: telepon, pekerjaan, pendidikan, foto profil). Field sensitif (NIK, tgl lahir) read-only kecuali oleh pengurus.

Data RT: relasi RT ↔ RW. Simpan lokasi (lat/lng) buat peta (opsional).

Kategori Iuran:

Field: tipe (wajib/opsional), frekuensi (sekali / bulanan / tahunan), metode penagihan (per rumah/KK atau per individu), minimum nominal, tanggal jatuh tempo default, auto-generate (on/off), denda (opsional: flat/harian & grace period).

Kategori Kegiatan Profit:

Tambah field penanggung jawab, bukti/nota (media), akun COA default (untuk posting otomatis ke akuntansi).

C. Umum

Pengumuman:

Targeting: semua warga RT/RW atau segmen (mis. RT 05 saja).

Jadwalkan publish & arsip otomatis.

Notifikasi push saat terbit.

Aduan Masyarakat:

Kategori aduan (keamanan, lingkungan, utilitas, dll.)

Status: dibuka → diproses → selesai; SLA target (opsional).

Lampiran foto/video, lokasi (opsional).

Thread komentar antara pelapor & petugas.

Rating penyelesaian saat ditutup.

Iuran Warga:

Penagihan otomatis per bulan (berdasarkan kategori yg di-set auto).

Tagihan per warga/KK dengan status: belum, sebagian, lunas.

Bukti bayar upload + verifikasi bendahara.

QRIS / transfer (input manual atau integrasi payment gateway nanti).

Reminder otomatis H-3, H+3, H+7 (opsional).

Kegiatan Profit:

Alur: buat kegiatan → catat transaksi (pendapatan) → auto posting ke COA → lampiran bukti → tampil di laporan.

D. Keuangan (akuntansi)

Tetap sederhana: 3 parent (Kas/Harta, Pendapatan, Pengeluaran/Belanja). Saran:

Gunakan double-entry light: setiap transaksi minimal 2 garis jurnal (Debit/Kredit), tapi UI disederhanakan:

Penerimaan kas: Debit Kas, Kredit Pendapatan (kategori).

Pengeluaran kas: Debit Biaya (kategori), Kredit Kas.

COA:

Izinkan sub-akun per parent.

Flag posting (boleh dipakai jurnal) & tampilkan di laporan.

Transaksi:

Tipe: pemasukan/pengeluaran/penyesuaian (adjustment).

Lampiran bukti (foto/nota).

Jurnal, Buku Besar, Trial Balance, Laporan:

Filter by RT/RW, periode, akun.

Ekspor PDF/CSV (nanti bisa dari backend).

Laporan Transparansi Publik: versi ringkas yang bisa dilihat semua warga (tanpa detail sensitif).

E. Tambahan Fitur yang Relevan

Manajemen Rumah/KK: entitas Kartu Keluarga/Unit Rumah (alamat, nomor rumah, kepala keluarga) → hubungkan Warga ke KK.

Perizinan & Surat: permohonan surat (domisili, pengantar, SKTM) dengan template & approval digital.

Kalender Kegiatan RT/RW (kerja bakti, rapat).

Inventaris RT/RW (opsional): aset milik RT/RW.

Peta Lingkungan (opsional): titik fasilitas (pos ronda, balai warga).

Mode Offline ringan (cache baca, antrian kirim saat online).

Audit Log: perubahan penting (keuangan, data master).

Multitenancy: tenant = RW, sub-scope = RT.

2) Peran & Izin (ringkas)

Warga: lihat dashboard publik, iuran dirinya/KK, bayar/upload bukti, buat aduan, lihat pengumuman, edit profil sendiri.

Ketua RT: kelola data warga di RT-nya, buat pengumuman, verifikasi iuran RT, proses aduan RT, input transaksi RT (jika model keuangan per RT).

Pengurus RW: agregasi lintas RT, kelola kategori (iuran/kegiatan), pengumuman RW, proses aduan lintas RT.

Bendahara (RT/RW): verifikasi pembayaran, input transaksi, tutup periode, generate laporan.

Admin Sistem: manajemen global, COA master, konfigurasi.

Implementasi: laravel Policies + Gates, role-based + scope RT/RW; di mobile pakai guard dari token + claims (role, rt_id, rw_id).

3) Rancangan Data Inti (sinkron ke Laravel)

(Contoh field inti; sesuaikan dengan schema yang sudah ada)

Warga (citizens)

id, kk_id, rt_id, rw_id, nama, email, phone, nik, jk, tgl_lahir, pekerjaan, pendidikan, status_kawin, agama, alamat_detail, foto_url, is_head_of_family

Audit: created_by, updated_by

KK / Rumah (households)

id, rt_id, rw_id, alamat, nomor_rumah, kepala_keluarga_citizen_id

RT

id, rw_id, nomor, ketua_citizen_id, alamat, lat, lng

Kategori Iuran (fee_categories)

id, nama, tipe(wajib|opsional), frekuensi(sekali|bulanan|tahunan), nominal_min, auto_generate(bool), due_day(1–28), has_penalty(bool), penalty_type(flat|per_day), penalty_value, charge_basis(per_kk|per_warga), active(bool)

Tagihan Iuran (fees)

id, fee_category_id, periode(YYYY-MM), scope(RT|RW), rt_id?, rw_id, status(draft|open|closed)

Fee Items (fee_assignments): id, fee_id, citizen_id/kk_id, amount_due, amount_paid, status(unpaid|partial|paid), due_date

Pembayaran Iuran (fee_payments)

id, fee_assignment_id, tanggal_bayar, amount, method, proof_url, status(submitted|verified|rejected), verified_by

Kegiatan Profit (profit_events)

id, kategori_id, nama, tanggal, penanggung_jawab_id, deskripsi, lampiran[]

total_pendapatan (diisi saat final)

Link ke transaksi jurnal (lihat keuangan)

Pengumuman (announcements)

id, judul, konten, scope(RW|RT), rt_id?, publish_at, expires_at, status(scheduled|published|archived), attachments[]

Aduan (complaints)

id, pelapor_id, kategori, judul, deskripsi, foto[], lokasi_lat?, lokasi_lng?, status(open|in_progress|resolved|closed), assigned_to_role(RT/RW), comments[], resolved_at, rating?

Akuntansi

COA (accounts): id, parent_id, kode, nama, tipe(asset|income|expense), is_posting, is_public_report

Jurnal (journal_entries): id, tanggal, ref(optional), memo, scope(RT|RW), rt_id?, rw_id

Journal Lines (journal_lines): id, entry_id, account_id, debit, kredit

Closing/Saldo awal sesuai kebutuhan.

4) Automations & Proses Latar (Laravel Queue/Cron)

Generate tagihan bulanan: per fee_categories.auto_generate → buat fees + fee_assignments.

Reminder iuran: H-3, H+3, H+7 push notif + email (opsional).

Verifikasi pembayaran: ubah status fee_payment → kalau verified, update amount_paid & auto-post jurnal (Debit Kas, Kredit Pendapatan terkait).

Kegiatan Profit finalisasi: saat submit total pendapatan → auto-post jurnal (Debit Kas, Kredit Pendapatan Kegiatan).

Arsip pengumuman saat expires_at.

5) Desain Mobile App—Spesifikasi Tekstual per Layar

Style umum: bersih, modern, warna utama #2563EB (biru), aksen #22C55E (hijau) untuk status sukses, #F59E0B (amber) untuk peringatan. Sudut komponen rounded-xl, shadow lembut. Dark mode dukung. Ikon Phosphor Icons. Tipografi: Inter (Expo Google Fonts).

Navigasi

Bottom Tabs (4–5 tab):

Beranda

Iuran

Aduan

Keuangan (role ≥ bendahara: penuh; warga: laporan publik)

Profil

Header tiap screen: judul + action kanan (filter/plus).

Floating Action Button (FAB) konteks: buat aduan, tambah transaksi, tambah pengumuman (sesuai role).

5.1 Beranda (Dashboard)

Tujuan: Ringkasan cepat, tindakan utama.

Bagian & Layout (scrollable)

Header: Salam “Halo, {nama}”, chip Scope (RT/RW) + periode (dropdown).

Kartu Ringkasan Keuangan (Card):

Saldo Kas (besar), mini-legend: pemasukan bulan ini, pengeluaran bulan ini.

Progress bar realisasi iuran (%).

CTA: “Lihat Keuangan”.

Grafik:

Bar chart tren pemasukan vs pengeluaran (6 bulan).

Donut komposisi pendapatan (iuran, kegiatan, lainnya).

Statistik Warga (Cards grid 2 kolom):

Gender M/F, Agama (top 3 + lainnya), Pendidikan (bar mini), Status Kawin.

CTA: “Detail Demografi”.

Tagihan Aktif:

List item: Nama kategori, periode, due date, status (chip).

Jika warga punya tunggakan → tampilkan paling atas + tombol “Bayar”.

Aduan Singkat:

Counter: Open / Diproses / Selesai.

CTA: “Buat Aduan”.

Pengumuman Terbaru (carousel 1–3 item):

Judul, snippet, waktu publish, scope.

Komponen

Cards, Chips, Progress Bar, Charts (RN chart lib), ListItem dengan status badge.

5.2 Iuran

Tab list + filter di atas: Periode (bulan), Status (semua/belum/lunas), Kategori.

Untuk Warga

Daftar Tagihan Saya:

Item: Nama kategori, periode, nominal, status (unpaid/partial/paid), due date.

Tap → Detail Tagihan:

Ringkasan: nominal due, paid, sisa; timeline pembayaran.

Tombol Bayar → Form:

Input nominal (>= min / sisa), metode (transfer/QRIS/manual), upload bukti (kamera/galeri), catatan.

Setelah submit: status submitted, menunggu verifikasi (tampilkan info).

Riwayat Pembayaran: list dengan filter periode.

Untuk Pengurus/Bendahara

Daftar Tagihan Per Kategori/Periode:

Header: periode, kategori, scope RT/RW.

Tabel ringan: warga/KK | due | paid | status | aksi (verifikasi).

Detail Warga pada Tagihan:

Toggle “Tampilkan yang belum bayar saja”.

Bulk actions: kirim reminder.

Buat Tagihan Manual:

Pilih kategori, periode, target (RT tertentu atau semua), override nominal (opsional), due date, generate assignments.

Verifikasi Pembayaran:

Detail bukti, nominal, tanggal → tombol Verifikasi/Tolak (wajib alasan jika tolak).

5.3 Aduan

List Aduan (tabs: Semua, Saya; filter: status, kategori).

Item: judul, kategori, status badge, waktu update terakhir, jumlah komentar, thumbnail foto.

Detail Aduan

Header: Judul, status (dropdown utk petugas), tombol Tindaklanjuti.

Konten: deskripsi, galeri foto (grid), lokasi (map mini jika ada).

Komentar (thread) dengan mention @petugas (opsional).

Tutup Aduan: form ringkas + rating (untuk pelapor).

Buat Aduan (FAB)

Form: kategori, judul, deskripsi, foto (multi), lokasi (ambils dari GPS opsional).

Tombol “Kirim” → konfirmasi.

5.4 Keuangan

Untuk Warga (Publik)

Ringkasan Transparansi:

Saldo awal/akhir periode, total pemasukan/pengeluaran.

Grafik ringkas pemasukan per sumber (iuran, kegiatan).

List Top 10 transaksi (disensor data sensitif bila perlu).

CTA: “Lihat Laporan Bulanan/Tahunan”.

Untuk Bendahara/Pengurus

Transaksi (list & filter): tanggal, memo, tipe, jumlah, akun. Aksi: detail, edit.

Tambah Transaksi:

Tipe: pemasukan/pengeluaran/penyesuaian.

Tanggal, memo, akun pendapatan/biaya, akun kas (default Kas), jumlah, lampiran.

Validasi double-entry (UI auto-generate garis jurnal).

Jurnal: daftar entry; masuk detail → lihat garis debit/kredit.

Buku Besar: pilih akun → running balance.

Trial Balance: tabel akun vs total debit/kredit.

Laporan: pilih periode & format → tampilkan; tombol Ekspor (minta backend).

5.5 Pengumuman

List: cards dengan scope & waktu.

Detail: konten lengkap + lampiran.

Buat/Editor (pengurus): rich text sederhana, schedule, target (RT/RW/segmen), lampiran.

5.6 Profil

Profil Saya:

Foto avatar (edit + crop), nama, email, telepon (editable).

Data sensitif (NIK, tgl lahir) read-only (kecuali pengurus).

Alamat, pekerjaan, pendidikan, status kawin, agama (editable).

Rumah/KK: tampilkan KK & anggota (read-only; ajukan perubahan → workflow approval opsional).

Preferensi: dark mode, bahasa (ID/EN), notifikasi (push/email).

Keamanan: ganti password (kalau pakai session), logout semua perangkat.

Tentang Aplikasi: versi, kebijakan privasi.

6) UX Guidelines (biar AI desainer paham)

Spacing: padding 16–20, gap antar komponen 12–16.

Cards: rounded-2xl, shadow lembut, header dengan ikon kecil + judul semibold.

Chips/Badges: status warna-huruf kontras, teks kecil-medium.

Grafik: maksimal 2–3 per layar, beri legend singkat, sumbu waktu jelas.

Empty states: ilustrasi kecil + CTA.

Loading: skeleton shimmer untuk list & cards.

Error: toast di bawah header, warna amber/merah, deskripsi singkat + tombol “Coba lagi”.

7) Saran Teknis (Expo/React Native)

Stack: Expo Router, TanStack Query (data fetching + cache), Zustand (state lokal ringan), NativeWind atau Tamagui buat styling.

Auth: OAuth password/Token (Laravel Sanctum/Passport), simpan token di SecureStore (bukan AsyncStorage).

Push Notif: Expo Notifications (topic per RT/RW, kategori—iuran/pengumuman/aduan).

Media: Expo Image Picker + compress; upload multipart ke API.

Charts: victory-native atau react-native-svg-charts.

Maps: react-native-maps (opsional).

Offline: cache Query + queue mutasi (simpan draft pembayaran/aduan saat offline).

i18n: react-native-localize + i18next.

Aksesibilitas: label untuk ikon, kontras cukup, dukung dynamic font size.

8) Prompt Siap Pakai untuk AI Desain (copy–paste)

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

9) API & Integrasi Singkat (mapping ke Laravel)

Gunakan prefix /api/v1.

Auth: /auth/login, /auth/me, /auth/logout.

Data Master: /citizens, /households, /rts, /fee-categories.

Iuran:

Tagihan: /fees?periode=YYYY-MM&kategori_id&scope

Assignments: /fees/{id}/assignments

Pembayaran: POST /fee-assignments/{id}/payments

Verifikasi: POST /payments/{id}/verify

Umum:

Pengumuman: /announcements

Aduan: /complaints + /complaints/{id}/comments + /complaints/{id}/status

Keuangan:

COA: /accounts

Jurnal: /journals + /journals/{id}/lines

Laporan: /reports/{type}?period=...

Notifikasi: endpoint register push token per user.

10) Keamanan & Best Practice

Simpan token di SecureStore; refresh token kalau pakai OAuth.

Validasi sisi server (Laravel FormRequest) + pesan error ramah user.

Rate limit untuk endpoint sensitif.

Audit log untuk aksi keuangan & perubahan data warga.

Batasi query dengan scope RT/RW (tenancy-aware).