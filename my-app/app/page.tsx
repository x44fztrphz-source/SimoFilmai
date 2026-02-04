"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const [showPrices, setShowPrices] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pricesRef = useRef<HTMLElement | null>(null);

  // Scroll lock kai atidarytas mobile meniu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function scrollToId(id: string) {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ✅ stabilus: visada atidaro kainas + visada scrollina į #kaina
  function openKaina() {
    closeMenu();
    setShowPrices(true);
    // mažas delay, kad UI spėtų persitvarkyti po meniu uždarymo
    window.setTimeout(() => {
      pricesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  // ✅ desktop Kaina: toggle (atidaro/uždaro)
  function toggleKaina() {
    if (showPrices) {
      setShowPrices(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    openKaina();
  }

  // ✅ kiti punktai: uždaro kainas ir scrollina
  function goTo(id: string) {
    setShowPrices(false);
    closeMenu();
    scrollToId(id);
  }

  return (
    <main>
      {/* ===== TOPBAR ===== */}
      <header className="topbar">
        <div className="topbarInner">
          <div className="brand">SimoFilmai</div>

          {/* Desktop nav */}
          <nav className="navDesktop" aria-label="Pagrindinis meniu">
            <button type="button" className="navLink" onClick={() => goTo("apie")}>
              Apie
            </button>

            <button type="button" className="navLink" onClick={() => goTo("portfolio")}>
              Portfolio
            </button>

            <button
              type="button"
              className={`navLink ${showPrices ? "active" : ""}`}
              aria-expanded={showPrices}
              onClick={toggleKaina}
            >
              Kaina
            </button>

            <button type="button" className="navLink" onClick={() => goTo("kontaktai")}>
              Kontaktai
            </button>
          </nav>

          {/* Burger (mobile) */}
          <button
            type="button"
            className={`burger ${menuOpen ? "open" : ""}`}
            aria-label="Meniu"
            aria-expanded={menuOpen}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile fullscreen menu */}
        <div className={`mobileMenu ${menuOpen ? "show" : ""}`}>
          <button type="button" onPointerDown={(e) => { e.preventDefault(); goTo("apie"); }}>
            Apie
          </button>

          <button type="button" onPointerDown={(e) => { e.preventDefault(); goTo("portfolio"); }}>
            Portfolio
          </button>

          {/* ✅ mobile Kaina VISADA atidaro + scrollina */}
          <button
            type="button"
            className={showPrices ? "active" : ""}
            aria-expanded={showPrices}
            onPointerDown={(e) => {
              e.preventDefault();
              openKaina();
            }}
          >
            Kaina
          </button>

          <button type="button" onPointerDown={(e) => { e.preventDefault(); goTo("kontaktai"); }}>
            Kontaktai
          </button>
        </div>

        {/* Overlay */}
        <div
          className={`menuOverlay ${menuOpen ? "show" : ""}`}
          onPointerDown={(e) => {
            e.preventDefault();
            closeMenu();
          }}
        />
      </header>

      {/* ===== HERO (tekstas užrakintas) ===== */}
      <section className="section hero" id="top">
  <div className="heroBg" aria-hidden="true" />

  <div className="container heroContent">
    <p className="eyebrow">Vestuvių filmavimas</p>

    <h1>Vestuvių filmai, kurie išlieka</h1>

    <p className="lead">
      Fiksuojame tikras emocijas ir kuriame jausmingus vestuvių filmus – nuo pasiruošimo iki
      paskutinių šventės akimirkų.
    </p>

    <div className="heroActions">
      <a className="btn btnPrimary" href="#kontaktai">Parašyti mums</a>
      <a className="btn btnGhost" href="#portfolio">Peržiūrėti darbus</a>
    </div>

    <div className="pill">
      <span className="dot" />
      Atvykimas visoje Lietuvoje įskaičiuotas į visus paketus
    </div>

    <div
  className="panel panelMedia"
  style={{
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100vw",
    maxWidth: "100vw",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0",
    background: "transparent",
    border: "0",
    boxShadow: "none",
  }}
>
  <img
    src="/images/foto1.jpg"
    alt=""
    style={{
      width: "100%",
      height: "210px",
      objectFit: "cover",
      display: "block",
      borderRadius: "0",
      border: "0",
      boxShadow: "none",
    }}
  />

  <img
    src="/images/foto2.jpg"
    alt=""
    style={{
      width: "100%",
      height: "210px",
      objectFit: "cover",
      objectPosition: "left center",
      display: "block",
      borderRadius: "0",
      border: "0",
      boxShadow: "none",
    }}
  />
</div>
<img
    src="/images/foto.jpg"
    alt=""
    style={{
      width: "100%",
      height: "210px",
      objectFit: "cover",
      objectPosition: "left center",
      display: "block",
      borderRadius: "0",
      border: "0",
      boxShadow: "none",
    }}
  />
  </div>
</section>

      {/* ===== KAINA (VISADA DOM’e, tik parodoma/paslepiama) ===== */}
      <section
        id="kaina"
        ref={(el) => {
          pricesRef.current = el;
        }}
        className={`section pricesSection ${showPrices ? "show" : ""}`}
        style={{ display: showPrices ? "block" : "none" }}

      >
        <div className="container">
          <header className="sectionHead">
            <h2>Vestuvių filmavimo paketai</h2>
            <p className="muted">Aiškūs paketai, konkretūs terminai, jokių paslėptų priedų.</p>
          </header>

          <div className="packagesGrid">
            {/* 8H */}
            <article className="card">
              <div className="cardTop">
                <p className="tag">8 VAL. FILMAVIMAS</p>
                <h3>Svarbiausios Jūsų dienos akimirkos</h3>
                <div className="price">
                  <span className="num">700</span>
                  <span className="cur">€</span>
                </div>
              </div>

              <ul className="list">
                <li>Filmavimas nuo ceremonijos iki vidurnakčio</li>
                <li><strong>Trumpas teaser:</strong> iki 30 sek. (per 3 dienas)</li>
                <li><strong>Trumpasis filmas:</strong> 1–3 min.</li>
                <li><strong>Ilgasis filmas:</strong> 10–15 min.</li>
                <li>Profesionalus garso įrašymas (įžadai, kalbos)</li>
                <li>Filmavimas dronu*</li>
              </ul>

              <div className="meta">
                <div>🕒 Trumpasis filmas – per 1 mėnesį</div>
                <div>🕒 Ilgasis filmas – per 4 mėnesius</div>
              </div>

              <a className="btn btnPrimary btnFull" href="#kontaktai">Siųsti užklausą</a>
            </article>

            {/* 10H featured */}
            <article className="card featured">
              <div className="badge">Dažniausiai pasirenkamas</div>

              <div className="cardTop">
                <p className="tag">10 VAL. FILMAVIMAS</p>
                <h3>Daugiau laiko – daugiau emocijų</h3>
                <div className="price">
                  <span className="num">900</span>
                  <span className="cur">€</span>
                </div>
              </div>

              <ul className="list">
                <li>Daugiau pasiruošimo ir šventės akimirkų, idealu nuo videosesijos prieš ceremoniją</li>
                <li><strong>Trumpas teaser:</strong> iki 30 sek. (per 3 dienas)</li>
                <li><strong>Trumpasis filmas:</strong> 1–3 min.</li>
                <li><strong>Ilgasis filmas:</strong> 15–20 min.</li>
                <li>Profesionalus garso įrašymas</li>
                <li>Filmavimas dronu*</li>
              </ul>

              <div className="meta">
                <div>🕒 Trumpasis filmas – per 1 mėnesį</div>
                <div>🕒 Ilgasis filmas – per 4 mėnesius</div>
              </div>

              <a className="btn btnPrimary btnFull" href="#kontaktai">Siųsti užklausą</a>
            </article>

            {/* 12H */}
            <article className="card">
              <div className="cardTop">
                <p className="tag">12 VAL. FILMAVIMAS</p>
                <h3>Visa Jūsų diena – nuo pradžios iki pabaigos</h3>
                <div className="price">
                  <span className="num">1100</span>
                  <span className="cur">€</span>
                </div>
              </div>

              <ul className="list">
                <li>Pilnas dienos filmavimas nuo pasiruošimo iki vidurnakčio</li>
                <li><strong>Trumpas teaser:</strong> iki 30 sek. (per 3 dienas)</li>
                <li><strong>Trumpasis filmas:</strong> 1–3 min.</li>
                <li><strong>Ilgasis filmas:</strong> 20–25 min.</li>
                <li>Profesionalus garso įrašymas</li>
                <li>Filmavimas dronu*</li>
              </ul>

              <div className="meta">
                <div>🕒 Trumpasis filmas – per 1 mėnesį</div>
                <div>🕒 Ilgasis filmas – per 4 mėnesius</div>
              </div>

              <a className="btn btnPrimary btnFull" href="#kontaktai">Siųsti užklausą</a>
            </article>

            {/* 12H + 2OP */}
            <article className="card">
              <div className="cardTop">
                <p className="tag">12 VAL. FILMAVIMAS + 2 VIDEOOPERATORIAI</p>
                <h3>Platesnis pasakojimas, daugiau kampų</h3>
                <div className="price">
                  <span className="num">1500</span>
                  <span className="cur">€</span>
                </div>
              </div>

              <ul className="list">
                <li>Dvi kameros – daugiau emocijų ir detalių</li>
                <li>Pilnas dienos filmavimas</li>
                <li><strong>Trumpas teaser:</strong> iki 30 sek. (per 3 dienas)</li>
                <li><strong>Trumpasis filmas:</strong> 1–3 min.</li>
                <li><strong>Ilgasis filmas:</strong> 30–40 min.</li>
                <li>Profesionalus garso įrašymas</li>
                <li>Filmavimas dronu*</li>
              </ul>

              <div className="gift">🎁 Nemokama „Love Story“ videosesija (Šiaulių rajone)</div>

              <div className="meta">
                <div>🕒 Trumpasis filmas – per 1 mėnesį</div>
                <div>🕒 Ilgasis filmas – per 4 mėnesius</div>
              </div>

              <a className="btn btnPrimary btnFull" href="#kontaktai">Siųsti užklausą</a>
            </article>
          </div>

          <p className="footnote">* Filmavimas dronu galimas esant palankioms oro ir vietos sąlygoms.</p>
        </div>
      </section>

      {/* ===== APIE ===== */}
      <section className="section" id="apie">
        <div className="container split">
          <div>
            <h2>Susipažinkime</h2>
            <p className="text">
              Kiekviena vestuvių istorija verta būti įamžinta taip, kaip ji yra –{" "}
              <strong>tikra, jausminga ir sava</strong>.
            </p>
            <p className="text">
              Mums svarbiausia ne pozavimas ar surežisuotos akimirkos, o{" "}
              <strong>emocijos, ryšys ir buvimas čia ir dabar</strong>.
            </p>
            <p className="text">
              Filmuojant fotosesijų metu visada palaikome <strong>lengvą, gyvą atmosferą</strong> – be
              įtampos ir dirbtinumo. Dažnai netrūksta ir juoko, nes mums svarbu, kad jaustumėtės{" "}
              <strong>laisvai ir natūraliai</strong>.
            </p>

            <a className="btn btnGhost" href="#kontaktai">Parašyti mums</a>
          </div>

          


        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section className="section" id="portfolio">
        <div className="container">
          <header className="sectionHead">
            <h2>Mūsų darbai</h2>
            <p className="muted">Tegul kalba vaizdas.</p>
          </header>

          <div className="grid3">
  <div className="videoWrap">
    <iframe
      src="https://customer-q583zy6elioal2xj.cloudflarestream.com/c495ed621d0d44d872ed89d516e6c2cc/iframe?poster=https%3A%2F%2Fcustomer-q583zy6elioal2xj.cloudflarestream.com%2Fc495ed621d0d44d872ed89d516e6c2cc%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
      title="Video 1"
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
    />
  </div>

  <div className="videoWrap">
    <iframe
      src="https://customer-q583zy6elioal2xj.cloudflarestream.com/272e05b69e5865678f1304174077e8a2/iframe?poster=https%3A%2F%2Fcustomer-q583zy6elioal2xj.cloudflarestream.com%2F272e05b69e5865678f1304174077e8a2%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D1m52s%26height%3D600"
      title="Video 2"
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
    />
  </div>

  <div className="videoWrap">
    <iframe
      src="https://customer-q583zy6elioal2xj.cloudflarestream.com/8908da84454ab84c3e2e88e9a5bcd833/iframe?poster=https%3A%2F%2Fcustomer-q583zy6elioal2xj.cloudflarestream.com%2F8908da84454ab84c3e2e88e9a5bcd833%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D5s%26height%3D600"
      title="Video 3"
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
    />
  </div>
  <div className="videoWrap">
    <iframe
      src="https://customer-q583zy6elioal2xj.cloudflarestream.com/dc8392928f925f9c21648070e9d2cd7a/iframe?poster=https%3A%2F%2Fcustomer-q583zy6elioal2xj.cloudflarestream.com%2Fdc8392928f925f9c21648070e9d2cd7a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D2m5s%26height%3D600"
      title="Video 4"
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
    />
  </div>
   <div className="videoWrap">
    <iframe
      src="https://customer-q583zy6elioal2xj.cloudflarestream.com/6ec98165a4901aa2ff857a0aadb49069/iframe?poster=https%3A%2F%2Fcustomer-q583zy6elioal2xj.cloudflarestream.com%2F6ec98165a4901aa2ff857a0aadb49069%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D1m43s%26height%3D600"
      title="Video 5"
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
    />
  </div>
 <div className="videoWrap">
    <iframe
      src="https://customer-q583zy6elioal2xj.cloudflarestream.com/fc6b1b0f18211aca1d07217f9fe8c7c8/iframe?poster=https%3A%2F%2Fcustomer-q583zy6elioal2xj.cloudflarestream.com%2Ffc6b1b0f18211aca1d07217f9fe8c7c8%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D1m57s%26height%3D600"
      title="Video 6"
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

        </div>
      </section>

      {/* ===== KONTAKTAI ===== */}
      <section className="section" id="kontaktai">
        <div className="container">
          <header className="sectionHead">
            <h2>Parašykite mums apie savo dieną</h2>
            <p className="muted">
              Atsakome per <strong>24 valandas</strong>. Jei data laisva – susisieksime su Jumis asmeniškai.
            </p>
          </header>

          <form className="form" method="post" action="#">
            <label><span>Vardai</span><input type="text" placeholder="Jūsų vardai" required /></label>
            <label><span>El. paštas</span><input type="email" placeholder="jusu@email.lt" required /></label>
            <label><span>Vestuvių data</span><input type="date" required /></label>
            <label><span>Šventės vieta</span><input type="text" placeholder="Miestas / vieta" required /></label>
            <label className="full"><span>Žinutė (nebūtina)</span><textarea rows={5} placeholder="Trumpai papasakokite apie savo dieną – mums tai labai padeda 😊" /></label>
            <button className="btn btnPrimary btnFull" type="submit">Siųsti užklausą</button>
            <p className="smallMuted">Atvykimas visoje Lietuvoje įskaičiuotas į visus paketus.</p>
          </form>
        </div>
      </section>

      <footer className="section footer">
        <div className="container">
          <p className="smallMuted">© {new Date().getFullYear()} SimoFilmai</p>
        </div>
      </footer>
    </main>
  );
}
