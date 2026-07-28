/* ==========================================
   EATNOW REDESIGN - SCRIPT.JS (HARI 3)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 1. DOKUMEN & ELEMEN INTERAKSI PRODUK
    // ------------------------------------------
    const btnMinus = document.getElementById('btn-minus');
    const btnPlus = document.getElementById('btn-plus');
    const qtyInput = document.getElementById('qty');
    const btnAddCart = document.querySelector('.btn-add-cart');
    const cartCount = document.getElementById('cart-count');
    const priceElement = document.querySelector('.price');
    const thumbnails = document.querySelectorAll('.thumbnail-list .thumb');
    const mainImage = document.getElementById('main-image');

    const BASE_PRICE = 35000; // Harga dasar Bakso EatNow
    let currentCartCount = 0;

    // Helper untuk format mata uang Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // ------------------------------------------
    // 2. LOGIKA KUANTITAS & KALKULASI HARGA
    // ------------------------------------------
    const updateTotalPrice = () => {
        const qty = parseInt(qtyInput.value) || 1;
        const total = BASE_PRICE * qty;
        priceElement.textContent = formatRupiah(total);
    };

    btnPlus.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
        updateTotalPrice();
    });

    btnMinus.addEventListener('click', () => {
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
            updateTotalPrice();
        }
    });

    qtyInput.addEventListener('change', () => {
        if (parseInt(qtyInput.value) < 1 || isNaN(qtyInput.value)) {
            qtyInput.value = 1;
        }
        updateTotalPrice();
    });

    // Fitur Tambah ke Keranjang
    btnAddCart.addEventListener('click', () => {
        const addedQty = parseInt(qtyInput.value);
        currentCartCount += addedQty;
        cartCount.textContent = currentCartCount;

        // Feedback animasi sederhana ke tombol
        btnAddCart.textContent = '✓ Berhasil Ditambahkan!';
        btnAddCart.style.backgroundColor = '#2a9d8f';

        setTimeout(() => {
            btnAddCart.textContent = 'Tambah ke Keranjang';
            btnAddCart.style.backgroundColor = '';
        }, 1500);
    });

    // Interaktivitas Galeri Gambar Thumbnail
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.src;
        });
    });


    // ------------------------------------------
    // 3. LOGIKA INTEGRASI CHEF AI CHATBOT (MODIFIKASI)
    // ------------------------------------------
    const aiInput = document.getElementById('ai-input');
    const aiSubmitBtn = document.getElementById('ai-submit-btn');
    const aiResponse = document.getElementById('ai-response');

    // Basis Pengetahuan (Knowledge Base) Chef AI EatNow
    const generateChefAIResponse = (query) => {
        const q = query.toLowerCase();

        if (q.includes('penyimpanan') || q.includes('awet') || q.includes('tahan') || q.includes('exp')) {
            return "🤖 **Chef AI EatNow:** Produk EatNow Bakso Kuah dapat bertahan hingga 6 bulan jika disimpan dalam freezer (-18°C). Jika disimpan di suhu ruangan dalam kemasan sealed, sebaiknya dikonsumsi sebelum tanggal kadaluarsa di pouch!";
        } 
        else if (q.includes('resep') || q.includes('kreasi') || q.includes('masak') || q.includes('nasi') || q.includes('mie')) {
            return "🤖 **Chef AI EatNow:** Pilihan bagus! Kamu bisa membuat **'Bakso Ramen EatNow'**. Cukup rebus mie favoritmu, lalu campurkan kuah gurih dan Bakso EatNow yang sudah dipanaskan. Tambahkan irisan daun bawang dan telur setengah matang!";
        } 
        else if (q.includes('kalori') || q.includes('sehat') || q.includes('gizi') || q.includes('halal')) {
            return "🤖 **Chef AI EatNow:** Bakso EatNow terbuat dari 100% daging sapi pilihan tanpa bahan pengawet berbahaya dan sudah bersertifikasi **100% Halal MUI & BPOM**. Estimasi per porsi mengandung ~320 kkal dengan protein tinggi!";
        } 
        else if (q.includes('pedas') || q.includes('sambal')) {
            return "🤖 **Chef AI EatNow:** Kuah bawaan EatNow memiliki rasa gurih rempah original. Jika kamu suka pedas, Chef menyarankan menambahkan 1 sendok teh sambal rawit tabur atau potongan cabai rawit segar saat menyajikan!";
        } 
        else {
            return `🤖 **Chef AI EatNow:** Pertanyaan menarik tentang "${query}"! Sebagai asisten kuliner EatNow, saran terbaik saya adalah menyajikan Bakso Kuah ini selagi hangat bersama nasi putih hangat atau pelengkap selada segar. Ada hal lain seputar resep atau gizi yang ingin ditanyakan?`;
        }
    };

    // Fungsi Eksekusi Chatbot
    const handleAISubmit = () => {
        const userQuery = aiInput.value.trim();

        if (userQuery === '') {
            aiResponse.innerHTML = '<span style="color: var(--primary-color);">Mohon masukkan pertanyaan terlebih dahulu!</span>';
            return;
        }

        // Tampilkan indikator loading
        aiResponse.innerHTML = '<em>Chef AI sedang memikirkan jawaban... 👨‍🍳</em>';
        aiSubmitBtn.disabled = true;

        // Simulasi delay respons API (1 detik)
        setTimeout(() => {
            const reply = generateChefAIResponse(userQuery);
            // Render jawaban dengan format sederhana
            aiResponse.innerHTML = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            aiSubmitBtn.disabled = false;
            aiInput.value = ''; // Reset input
        }, 800);
    };

    // Event Trigger Chatbot AI
    aiSubmitBtn.addEventListener('click', handleAISubmit);

    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAISubmit();
        }
    });

});

const handleAISubmit = () => {
    // ...
    setTimeout(() => {
        aiInput.value = ''; // Reset input
    }, 800);
};

aiSubmitBtn.addEventListener('click', handleAISubmit);

aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAISubmit();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // ... seluruh logika produk dan Chef AI Chatbot ...
});

// Memastikan terisolasi dengan aman dalam modul/event listener
document.addEventListener('DOMContentLoaded', () => {
    'use strict'; // Mengaktifkan Strict Mode untuk mencegah bug tak terduga

    // ... seluruh logika produk dan Chef AI Chatbot ...
});