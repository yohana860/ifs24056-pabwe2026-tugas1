# StudyTask

Aplikasi web sederhana untuk mencatat tugas kuliah (tambah, centang selesai, hapus, filter, tersimpan di localStorage).
Dibuat untuk Tugas I 11S3133 Pengembangan Aplikasi Berbasis Web dengan bantuan AI generatif.

## Menjalankan
```bash
npm start
```
Lalu buka http://localhost:3000. Alternatif: buka `index.html` langsung di browser.

## Struktur
- `index.html`, `style.css`, `script.js`: aplikasi versi akhir
- `package.json`: script `npm start`
- `docs/script-v1-sebelum-perbaikan.js`: kode awal hasil AI yang masih berisi bug (bukti proses perbaikan)
- `docs/`: proposal dan tangkapan layar

## Catatan penggunaan AI
Kode awal dihasilkan AI, lalu diuji dan diperbaiki: indeks salah saat filter (diganti id unik) dan celah XSS (diganti textContent). Rincian ada di proposal.
