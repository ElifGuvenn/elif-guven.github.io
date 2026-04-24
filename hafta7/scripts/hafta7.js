document.addEventListener("DOMContentLoaded", function () {
  const temaBtn = document.getElementById("temaBtn");
  const form = document.getElementById("basvuruForm");
  const sonucAlani = document.getElementById("sonucAlani");
  const temizleBtn = document.getElementById("temizleBtn");

  // Tema Değiştirme
  temaBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    temaBtn.textContent = document.body.classList.contains("dark-theme")
      ? "☀️ Açık Temaya Geç"
      : "🌙 Koyu Temaya Geç";
  });

  // Form İşlemi
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ad = document.getElementById("adSoyad").value.trim();
    const email = document.getElementById("email").value.trim();
    const bolum = document.getElementById("bolum").value.trim();
    const sinif = document.getElementById("sinif").value;
    const onay = document.getElementById("onayCheck").checked;

    if (!ad || !email || !bolum || !sinif) {
      sonucAlani.innerHTML = `<div class="uyari-kutu text-center">⚠️ Lütfen tüm alanları doldurun.</div>`;
      return;
    }

    if (!onay) {
      sonucAlani.innerHTML = `<div class="uyari-kutu text-center">⚠️ Kullanım şartlarını onaylayın.</div>`;
      return;
    }

    sonucAlani.innerHTML = `
      <div class="ozet-kart shadow">
        <div class="ozet-ust d-flex justify-content-between">
          <span>✅ Başvuru Özeti</span>
          <span class="small fw-normal">${new Date().toLocaleDateString('tr-TR')}</span>
        </div>
        <div class="ozet-govde bg-white text-dark">
          <div class="alan"><label>Ad Soyad</label><span>${ad}</span></div>
          <div class="alan"><label>E-posta</label><span>${email}</span></div>
          <div class="alan"><label>Bölüm</label><span>${bolum}</span></div>
          <div class="alan"><label>Sınıf</label><span>${sinif}</span></div>
        </div>
      </div>`;
    
    sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  temizleBtn.addEventListener("click", () => {
    form.reset();
    sonucAlani.innerHTML = `<p class="mb-0 text-secondary">Henüz başvuru yapılmadı. Sonuç burada görünecek.</p>`;
  });
});
