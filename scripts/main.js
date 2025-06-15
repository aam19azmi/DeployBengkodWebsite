// Main JavaScript file for Obesity Prediction App
// ===== Slide-toggle functions =====
function showSection(section) {
    section.classList.add('visible');
}
function hideSection(section) {
    section.classList.remove('visible');
}
function initSection(section) {
    section.classList.remove('visible');
}

// Referensi elemen
const expertFields = document.querySelector('.numeric-section');
const generalFields = document.querySelector('.category-section');

// Inisialisasi: sembunyikan keduanya
initSection(expertFields);
initSection(generalFields);

// Toggle antara Mode Ahli (numeric) dan Mode Umum (kategori)
document.querySelectorAll('input[name="inputMode"]').forEach(radio => {
    radio.addEventListener('change', () => {
    if (radio.value === 'expert' && radio.checked) {
        // Tampilkan numeric, sembunyikan kategori
        showSection(expertFields);
        hideSection(generalFields);

        // Pasang required pada numeric, hapus pada kategori
        ['FCVC','NCP','CH2O','FAF','TUE'].forEach(id => {
        document.getElementById(id).setAttribute('required', 'required');
        });
        ['FCVC_category','NCP_category','CH2O_category','FAF_category','TUE_category'].forEach(id => {
        document.getElementById(id).removeAttribute('required');
        });
    }
    if (radio.value === 'general' && radio.checked) {
        // Tampilkan kategori, sembunyikan numeric
        showSection(generalFields);
        hideSection(expertFields);

        // Pasang required pada kategori, hapus pada numeric
        ['FCVC_category','NCP_category','CH2O_category','FAF_category','TUE_category'].forEach(id => {
        document.getElementById(id).setAttribute('required', 'required');
        });
        ['FCVC','NCP','CH2O','FAF','TUE'].forEach(id => {
        document.getElementById(id).removeAttribute('required');
        });
    }
    });
});

// Inisialisasi: set ke mode expert
document.querySelector('input[name="inputMode"][value="expert"]').checked = true;
showSection(expertFields);

// ===== Validasi dan Submit Form =====
const form = document.getElementById('obesityForm');
const resultDiv = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    // Bersihkan pesan error & remove shake
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input, select').forEach(el => {
    el.classList.remove('input-error');
    el.classList.remove('shake');
    });

    // Validasi setiap elemen required
    form.querySelectorAll('[required]').forEach(el => {
    const id = el.getAttribute('id') || el.getAttribute('name');
    if (el.type === 'radio') {
        const name = el.getAttribute('name');
        const checked = form.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
        document.getElementById(`error-${name}`).style.display = 'block';
        valid = false;
        // Tambahkan shake pada grup radio (ambil parent)
        const group = form.querySelector(`input[name="${name}"]`).closest('fieldset') || form;
        group.classList.add('shake');
        setTimeout(() => group.classList.remove('shake'), 350);
        }
    } else if (!el.value.trim()) {
        document.getElementById(`error-${id}`).style.display = 'block';
        el.classList.add('input-error', 'shake');
        valid = false;
        setTimeout(() => el.classList.remove('shake'), 350);
    } else if (el.type === 'number') {
        const val = parseFloat(el.value);
        const min = parseFloat(el.getAttribute('min'));
        const max = parseFloat(el.getAttribute('max'));
        if (!isNaN(min) && val < min) {
        document.getElementById(`error-${id}`).style.display = 'block';
        el.classList.add('input-error', 'shake');
        valid = false;
        setTimeout(() => el.classList.remove('shake'), 350);
        }
        if (!isNaN(max) && val > max) {
        document.getElementById(`error-${id}`).style.display = 'block';
        el.classList.add('input-error', 'shake');
        valid = false;
        setTimeout(() => el.classList.remove('shake'), 350);
        }
    }
    });

    if (!valid) {
    // Scroll ke pesan error pertama
    const firstError = document.querySelector('.error-message[style*="display: block"]');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
    }

    // Matikan tombol dan tampilkan spinner
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.innerHTML = 'Memproses <span class="spinner"></span>';

    // Kumpulkan data
    const formData = new FormData(form);
    let data = {};
    const mode = document.querySelector('input[name="inputMode"]:checked').value;

    // PROSES DATA BERDASARKAN MODE YANG AKTIF
    if (mode === 'expert') {
    // Mode Ahli: Gunakan input numerik langsung
    formData.forEach((value, key) => {
        if (['Age', 'Height', 'Weight', 'FCVC', 'NCP', 'CH2O', 'FAF', 'TUE'].includes(key)) {
        let numValue = Number(value);
        if (key === 'Height') numValue = numValue / 100; // Konversi cm ke m
        data[key] = numValue;
        } else {
        data[key] = value.trim();
        }
    });
    } else {
    // Mode Umum: Map kategori ke nilai numerik
    formData.forEach((value, key) => {
        // Map kategori ke desimal jika mode general
        if (key === 'FCVC_category') {
        const mapFCVC = { '1': 1.0, '2': 2.5, '3': 4.0, '4': 7.0 };
        data['FCVC'] = mapFCVC[value];
        } else if (key === 'NCP_category') {
        const mapNCP = { '1': 1.0, '2': 2.0, '3': 3.0, '4': 4.0, '5': 5.0 };
        data['NCP'] = mapNCP[value];
        } else if (key === 'CH2O_category') {
        const mapCH2O = { '1': 0.5, '2': 1.5, '3': 2.5, '4': 3.5, '5': 5.0 };
        data['CH2O'] = mapCH2O[value];
        } else if (key === 'FAF_category') {
        const mapFAF = { '1': 0.5, '2': 2.0, '3': 4.0, '4': 6.0 };
        data['FAF'] = mapFAF[value];
        } else if (key === 'TUE_category') {
        const mapTUE = { '1': 0.5, '2': 2.0, '3': 4.0, '4': 6.0 };
        data['TUE'] = mapTUE[value];
        } else {
        if (['Age', 'Height', 'Weight'].includes(key)) {
            let numValue = Number(value);
            if (key === 'Height') numValue = numValue / 100;
            data[key] = numValue;
        } else {
            data[key] = value.trim();
        }
        }
    });
    }

    // Kirim data ke server
    try {
    const response = await fetch('https://deploybengkod-production.up.railway.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    // Tampilkan hasil
    resultDiv.style.display = 'block';
    if (result.prediction) {
        let description = '';
        switch (result.prediction) {
        case 'Berat Badan Kurang':
            description = 'Berat badan Anda berada di bawah normal. Perhatikan asupan nutrisi dan pertimbangkan konsultasi dengan ahli gizi.';
            break;
        case 'Berat Badan Normal':
            description = 'Berat badan Anda berada dalam rentang normal. Pertahankan pola hidup sehat dan aktif.';
            break;
        case 'Kelebihan Berat Badan Tingkat I':
            description = 'Tanda awal kelebihan berat badan. Disarankan mulai menjaga pola makan dan aktivitas fisik.';
            break;
        case 'Kelebihan Berat Badan Tingkat II':
            description = 'Berat badan Anda melebihi batas sehat. Mulailah dengan pola hidup sehat dan konsultasi dengan profesional.';
            break;
        case 'Obesitas Tipe I':
            description = 'Anda termasuk dalam kategori obesitas tipe I. Sangat disarankan untuk berkonsultasi dengan tenaga medis.';
            break;
        case 'Obesitas Tipe II':
            description = 'Obesitas tipe II menunjukkan risiko kesehatan yang lebih tinggi. Segera lakukan evaluasi gaya hidup dan hubungi tenaga medis.';
            break;
        case 'Obesitas Tipe III':
            description = 'Ini adalah tingkat obesitas tertinggi. Penting untuk segera mencari bantuan medis untuk penanganan yang tepat.';
            break;
        default:
            description = 'Kategori tidak diketahui. Silakan coba lagi atau konsultasi dengan ahli.';
        }

        resultDiv.innerHTML = `
        🎉 Prediksi Tingkat Obesitas: <strong>${result.prediction}</strong><br>
        <small>${description}</small><br>
        <small>Disarankan untuk berkonsultasi dengan tenaga medis atau ahli gizi untuk rekomendasi lebih lanjut.</small>`;
        
        resultDiv.style.display = 'block';
        resultDiv.classList.add('pulse');
        setTimeout(() => resultDiv.classList.remove('pulse'), 1000);
    } else {
        resultDiv.textContent = `⚠️ Error: ${result.detail || 'Terjadi kesalahan'}`;
    }
    } catch (err) {
    resultDiv.style.display = 'block';
    resultDiv.textContent = `⚠️ Terjadi kesalahan: ${err.message}`;
    } finally {
    // Pulihkan tombol
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    }

    // Scroll ke hasil
    resultDiv.scrollIntoView({ behavior: 'smooth' });
});
