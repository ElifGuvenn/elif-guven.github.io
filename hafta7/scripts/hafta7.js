document.addEventListener("DOMContentLoaded", function () {
  
  // DOM Elemanları
  const temaBtn = document.getElementById("temaBtn");
  const form = document.getElementById("basvuruForm");
  const sonucAlani = document.getElementById("sonucAlani");
  const temizleBtn = document.getElementById("temizleBtn");

  // 1) Tema Değiştirme
  temaBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    temaBtn.textContent = document.body.classList.contains("dark-theme")
      ? "☀️ Açık Temaya Geç"
      : "🌙 Koyu Temaya Geç";
  });

  // 2) Form Gönderimi ve Özet Oluşturma
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Sayfa yenilenmesini engelle

    // Değerleri al
    const ad = document.getElementById("adSoyad").value.trim();
    const email = document.getElementById("email").value.trim();
    const bolum = document.getElementById("bolum").value.trim();
    const sinif = document.getElementById("sinif").value;
    const oturum = document.getElementById("oturum").value;
    const katilim = document.getElementById("katilimTuru").value;
    const mesaj = document.getElementById("mesaj").value.trim();
    const onay = document.getElementById("onayCheck").checked;

    // Zorunlu alan kontrolü
    if (!ad || !email || !bolum || !sinif || !oturum || !katilim) {
      sonucAlani.innerHTML = `<div class="alert alert-warning fw-bold mb-0">⚠️ Lütfen tüm yıldızlı (*) alanları doldurun.</div>`;
      sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!onay) {
      sonucAlani.innerHTML = `<div class="alert alert-warning fw-bold mb-0">⚠️ Lütfen kullanım şartlarını onaylayın.</div>`;
      sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Güvenlik fonksiyonu (XSS engelleme)
    function guvenli(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Özet Kartını Bas
    sonucAlani.innerHTML = `
      <div class="card border-primary shadow text-start">
        <div class="card-header text-white d-flex justify-content-between align-items-center" style="background-color: #3b5bdb;">
          <span class="fw-bold">✅ Başvuru Özeti</span>
          <span class="small">${new Date().toLocaleDateString('tr-TR')}</span>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-sm-6"><small class="text-secondary d-block">Ad Soyad</small><strong>${guvenli(ad)}</strong></div>
            <div class="col-sm-6"><small class="text-secondary d-block">E-posta</small><strong>${guvenli(email)}</strong></div>
            <div class="col-sm-6"><small class="text-secondary d-block">Bölüm</small><strong>${guvenli(bolum)}</strong></div>
            <div class="col-sm-6"><small class="text-secondary d-block">Sınıf</small><strong>${guvenli(sinif)}</strong></div>
            <div class="col-sm-6"><small class="text-secondary d-block">Oturum</small><strong>${guvenli(oturum)}</strong></div>
            <div class="col-sm-6"><small class="text-secondary d-block">Katılım Türü</small><strong>${guvenli(katilim)}</strong></div>
            ${mesaj ? `<div class="col-12"><small class="text-secondary d-block">Kısa Mesaj</small><strong>${guvenli(mesaj)}</strong></div>` : ""}
          </div>
        </div>
      </div>`;
    
    sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // 3) Formu Temizleme
  temizleBtn.addEventListener("click", () => {
    form.reset();
    sonucAlani.innerHTML = `<p class="mb-0 text-secondary">Henüz başvuru yapılmadı. Sonuç burada görünecek.</p>`;
  });

});
