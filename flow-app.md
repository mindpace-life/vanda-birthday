Membuat website ulang tahun yang personal adalah cara yang sangat manis dan berkesan. Untuk mendapatkan tampilan yang **modern, clean, dan estetik**, kita akan menggunakan pendekatan desain *minimalist-elegant* dengan sentuhan interaktif.

Berikut adalah usulan **App Flow**, **Struktur Section**, dan ide **Teka-teki** untuk website Vanda Amalia Firdaus:

---

## 1. App Flow (Alur Pengguna)

1. **Gatekeeper (Login Page):** Halaman awal yang bersih dengan satu input field.
2. **The Big Reveal (Landing/Hero):** Setelah nama yang benar dimasukkan, muncul animasi transisi menuju ucapan utama.
3. **The Journey (Gallery):** Scroll ke bawah untuk melihat kumpulan memori.
4. **The Quest (Riddle):** Section interaktif untuk membuka informasi kado/pertemuan.
5. **Closing (Footer):** Pesan penutup yang manis.

---

## 2. Struktur Section & Fitur Estetik

### A. Halaman Login (The Entry)

* **Konsep:** "Hanya untuk yang teristimewa."
* **Tampilan:** Background warna *off-white* atau *cream*. Di tengah terdapat kotak input tanpa border (hanya garis bawah) dengan teks *placeholder*: *"Siapa nama lengkap orang tercantik hari ini?"*
* **Fitur Modern:** Gunakan efek **Glassmorphism** pada card login dan tambahkan validasi *real-time*. Jika salah, muncul pesan lucu: *"Maaf, akses hanya untuk Vanda :P"*

### B. Section 1: Hero & Greeting (Ucapan)

* **Grafis:** Animasi **Lottie** (ilustrasi tipis) berupa bunga yang bermekaran atau konfeti minimalis.
* **Typography:** Gunakan font *Serif* yang elegan untuk nama "Vanda Amalia Firdaus".
* **Isi:** Ucapan ulang tahun yang personal. Tambahkan fitur **Typewriter Effect** di mana pesan teksnya muncul perlahan seperti sedang diketik.

### C. Section 2: Memory Lane (Galeri Foto)

* **Layout:** Gunakan **Bento Grid** atau **Masonry Layout** (seperti Pinterest) agar tidak membosankan.
* **Fitur Estetik:** * **Hover Effect:** Saat foto disentuh/di-hover, foto akan membesar sedikit (scale up) dan muncul *caption* kecil di pojok foto.
* **Lightbox:** Jika foto diklik, foto akan terbuka secara full-screen dengan latar belakang blur.



### D. Section 3: The Mystery Box (Teka-Teki Kado)

Ini adalah bagian yang paling interaktif. Kita buat teka-teki "multi-step".

**Ide Teka-teki Menarik:**

* **Tahap 1 (Logika):** *"Aku punya angka, jika kamu membaginya dengan jumlah bulan dalam setahun, lalu menambahkannya dengan tanggal lahirmu, hasilnya adalah jam kita bertemu."*
* **Tahap 2 (Matematika Estetik):** Berikan persamaan matematika yang hasilnya adalah lokasi atau jam.
> Misal, untuk jawaban **19.00**:
> Solve for :
> 
> 
> 
> *(Hasilnya 15 + 4 = 19)*


* **Interaksi:** Sediakan input box. Jika jawaban benar, maka gambar kado yang tadinya "terkunci/blur" akan terbuka secara otomatis dengan animasi *unboxing*.

### E. Fitur Tambahan (Modern & Clean)

1. **Music Player Minimalis:** Floating button di pojok bawah yang memutar lagu favorit Vanda secara otomatis (dengan opsi *mute*).
2. **Custom Cursor:** Ubah kursor mouse menjadi ikon bunga kecil atau hati saat menjelajahi web.
3. **Dark/Light Mode Toggle:** Dengan transisi yang halus (smooth fade).
4. **Parallax Scrolling:** Foto-foto di galeri bergerak dengan kecepatan berbeda saat di-scroll, memberikan efek kedalaman (depth).

---

## 3. Ide Grafis & Warna

| Elemen | Rekomendasi |
| --- | --- |
| **Palet Warna** | *Sage Green, Dusty Rose,* atau *Champagne Gold* dikombinasikan dengan putih. |
| **Grafis** | *Line Art* (seni garis) wajah atau bunga-bunga minimalis. |
| **Button** | *Rounded corner* dengan bayangan halus (*soft shadow*) agar terlihat "clickable". |

---

## 4. Contoh Logika Pemrograman (Pseudo-code)

Untuk bagian login agar aman dan sesuai permintaan:

```javascript
function checkAccess() {
  const nameInput = document.getElementById("username").value;
  if (nameInput === "Vanda Amalia Firdaus") {
    // Arahkan ke halaman utama atau buka section yang disembunyikan
    document.getElementById("login-page").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    playBirthdaySong();
  } else {
    alert("Hanya Vanda yang boleh masuk! 🤫");
  }
}

```

Apakah Anda ingin saya membantu membuatkan **struktur kode HTML/CSS dasar** untuk tampilan login dan gallery tersebut?