// scripts/hafta7.js
// Hafta 7 – İki etkileşim: (1) tema değiştirme, (2) form özeti üretme

document.addEventListener("DOMContentLoaded", function () {

  /* ================================================
     1) TEMA DEĞİŞTİRME
  ================================================ */
  const temaBtn = document.getElementById("temaBtn");

  temaBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    temaBtn.textContent = document.body.classList.contains("dark-theme")
      ? "☀️ Açık Temaya Geç"
      : "🌙 Koyu Temaya Geç";
  });


  /* ================================================
     2) FORM ÖZETİ OLUŞTURMA
  ================================================ */
  const form       = document.getElementById("basvuruForm");
  const sonucAlani = document.getElementById("sonucAlani");
  const temizleBtn = document.getElementById("temizleBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Sayfa yenilenmesin

    const ad      = document.getElementById("adSoyad").value.trim();
    const email   = document.getElementById("email").value.trim();
    const bolum   = document.getElementById("bolum").value.trim();
    const sinif   = document.getElementById("sinif").value;
    const oturum  = document.getElementById("oturum").value;
    const katilim = document.getElementById("katilimTuru").value;
    const mesaj   = document.getElementById("mesaj").value.trim();
    const onay    = document.getElementById("onayCheck").checked;

    // Zorunlu alan kontrolü
    if (!ad || !email || !bolum || !sinif || !oturum || !katilim) {
      sonucAlani.innerHTML = `<div class="uyari-kutu">⚠️ Lütfen tüm zorunlu alanları doldurun.</div>`;
      sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!onay) {
      sonucAlani.innerHTML = `<div class="uyari-kutu">⚠️ Devam etmek için onay kutusunu işaretleyin.</div>`;
      sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const tarih = new Date().toLocaleDateString("tr-TR", {
      day: "2-digit", month: "long", year: "numeric"
    });

    sonucAlani.innerHTML = `
      <div class="ozet-kart">
        <div class="ozet-ust">
          <span>✅ Başvuru Özeti</span>
          <span style="font-weight:400; font-size:0.8rem;">${tarih}</span>
        </div>
        <div class="ozet-govde">
          <div class="alan"><label>Ad Soyad</label><span>${guvenliyaz(ad)}</span></div>
          <div class="alan"><label>E-posta</label><span>${guvenliyaz(email)}</span></div>
          <div class="alan"><label>Bölüm</label><span>${guvenliyaz(bolum)}</span></div>
          <div class="alan"><label>Sınıf</label><span>${guvenliyaz(sinif)}</span></div>
          <div class="alan"><label>Oturum</label><span>${guvenliyaz(oturum)}</span></div>
          <div class="alan"><label>Katılım Türü</label><span>${guvenliyaz(katilim)}</span></div>
          ${mesaj ? `<div class="alan" style="grid-column:1/-1"><label>Mesaj</label><span>${guvenliyaz(mesaj)}</span></div>` : ""}
        </div>
        <div class="ozet-alt">Başvurunuz alındı. Etkinlik günü Lab 205'te görüşmek üzere!</div>
      </div>`;

    sonucAlani.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  temizleBtn.addEventListener("click", function () {
    form.reset();
    sonucAlani.innerHTML = `<p style="color:var(--muted,#6b6860); margin:0; font-size:0.9rem;">
      Henüz başvuru özeti oluşturulmadı.
      <span style="color:var(--accent,#3b5bdb);">Formu doldurduktan sonra sonuç burada görünecek.</span>
    </p>`;
  });

  function guvenliyaz(str) {
    return str
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

});