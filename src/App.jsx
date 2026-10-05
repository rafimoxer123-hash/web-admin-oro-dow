import { useState } from "react";

// ───────── Data ─────────
const Y = n => "Rp" + n.toLocaleString("id-ID");
const SL = "Sego Liwet Bakar Kemangi";
// item: [nama, sub, harga, gambar, warung]
const LIWET = [
  ["Sego Liwet Bakar Ayam", "Porsi · daun pisang", 15000, "liwet_ayam", SL],
  ["Sego Liwet Bakar Tuna", "Porsi · daun pisang", 15000, "liwet_tuna", SL],
  ["Sego Liwet Bakar Teri", "Porsi · daun pisang", 15000, "liwet_teri", SL],
  ["Sego Liwet Bakar Cumi", "Porsi · daun pisang", 16000, "liwet_cumi", SL],
];
// warung: [nama, rating, info, menu, harga, tag, gambar, no, kategori]
const PETA = [
  ["Nasi Buk Hj. Supina", 4.9, "Buka 06.00–15.00", "Nasi buk komplit", 25000, "Favorit pelanggan", "nasi_buk", 3, "Makanan Berat"],
  [SL, 4.8, "Siap 10–15 menit", "Liwet bakar ayam", 15000, "Dibakar setelah dipesan", "liwet", 8, "Makanan Berat"],
  ["Sate Mari Kerjo (Marjo)", 5.0, "Siap 15–20 menit", "Sate ayam", 20000, "Bumbu kacang", "sate", 15, "Sate & Bakar"],
  ["Klepon-Ku", 4.8, "Siap 5–10 menit", "Klepon gula merah", 10000, "Gula merah cair", "klepon", 19, "Jajanan Manis"],
];
const CATS = {
  makanan: {
    t: "Makanan Berat", e: "🍚", n: 14, s: "Nasi, lauk, dan kuah hangat dari pasar.", h: "Cari nasi, rawon, atau warung...", f: ["Semua menu", "Buka sekarang", "Harga ▾"],
    ft: "Menu favorit", fs: "Pilihan mengenyangkan, dimasak saat dipesan.", lt: "Warung makanan berat", note: "🍳 Dimasak setelah dipesan, diantar hangat ke alamatmu.",
    favs: [["Nasi Buk Komplit", "Nasi, lauk, serundeng", 25000, "nasi_buk", "Nasi Buk Hj. Supina"], ["Liwet Bakar Ayam", "Porsi · daun pisang", 15000, "liwet", "Liwet Bakar Kemangi"]],
    list: [PETA[0], PETA[1],
      ["Rawon Bu Sri", 4.8, "Siap 10–15 menit", "Rawon + nasi", 22000, "Kuah hangat setiap pagi", "rawon"],
      ["Pecel Pincuk Bu Siti", 4.7, "Siap 5–10 menit", "Nasi pecel komplit", 13000, "Pilihan hemat", "pecel"]],
  },
  sate: {
    t: "Sate & Bakar", e: "🍢", n: 8, s: "Sate berbumbu dan aneka bakaran arang.", h: "Cari sate, ayam bakar, atau warung...", f: ["Semua menu", "Buka sekarang", "Harga ▾"],
    ft: "Menu favorit", fs: "Dibakar langsung, harum sampai ke rumah.", lt: "Warung sate & bakar", note: "🔥 Dibakar setelah dipesan. Waktu siap tiap warung berbeda.",
    favs: [["Sate Ayam", "10 tusuk · bumbu kacang", 20000, "sate", "Sate Ayam Pak Hasan"], ["Ayam Bakar + Nasi", "Porsi · sambal & lalapan", 23000, "ayam_bakar", "Ayam Bakar Bu Rini"]],
    list: [
      ["Sate Ayam Pak Hasan", 4.9, "Siap 15–20 menit", "Sate ayam 10 tusuk", 20000, "Bumbu kacang khas", "sate"],
      ["Ayam Bakar Bu Rini", 4.8, "Siap 15–20 menit", "Ayam bakar + nasi", 23000, "Bakar arang", "ayam_bakar"],
      ["Sate Kambing Pak Yusuf", 4.8, "Siap 15–20 menit", "Sate kambing 10 tusuk", 32000, "Kecap dan irisan cabai", "sate_kambing"],
      ["Ikan Bakar Cak Din", 4.7, "Siap 20–25 menit", "Nila bakar + nasi", 28000, "Sambal terasi segar", "ikan_bakar"]],
  },
  kopi: {
    t: "Kopi & Minuman", e: "☕", n: 7, s: "Kopi seduh, minuman segar, dan wedang.", h: "Cari kopi, es dawet, atau warung...", f: ["Semua menu", "Dingin", "Hangat", "Harga ▾"],
    ft: "Minuman favorit", fs: "Teman sarapan dan pelengkap makan siang.", lt: "Warung kopi & minuman", note: "☕ Pilih tingkat gula dan es saat menambahkan minuman.",
    favs: [["Es Kopi Susu", "Gelas · gula aren", 12000, "es_kopi", "Kopi Pasar Pak Budi"], ["Es Dawet Gula Aren", "Gelas · santan segar", 8000, "dawet", "Dawet Ayu Bu Tini"]],
    list: [
      ["Kopi Pasar Pak Budi", 4.9, "Siap 5–10 menit", "Es kopi susu", 12000, "Kopi seduh segar", "es_kopi"],
      ["Dawet Ayu Bu Tini", 4.8, "Siap 5–10 menit", "Es dawet gula aren", 8000, "Gula aren asli", "dawet"],
      ["Es Jeruk Pak Slamet", 4.7, "Siap 5–10 menit", "Es jeruk peras", 7000, "Jeruk peras segar", "es_jeruk"],
      ["Wedang Rempah Bu Lastri", 4.8, "Siap 5–10 menit", "Wedang jahe", 8000, "Hangat & berempah", "wedang"]],
  },
};

// ───────── Gaya ─────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600&family=Inter:wght@400;500;600;700&display=swap');
:root{--g:#17352A;--o:#E3963A;--b:#F2EBDD;--l:#E3DCCB;--m:#6F6F66}
*{box-sizing:border-box}body{display:block;margin:0;background:#FCF8F0;font-family:Inter,sans-serif;color:#1C1C1C}
button{font:inherit;cursor:pointer;border:0;background:none;padding:0;color:inherit}
h1,h2,h3{font-family:Fraunces,serif;font-weight:600;color:var(--g);margin:0}h2{font-size:30px}p{color:var(--m);font-size:14px;margin:6px 0 0}
.w{max-width:1440px;margin:0 auto;padding:0 80px}.pg{padding-top:36px;padding-bottom:64px}
.nav{border-bottom:1px solid var(--l)}.nv{display:flex;justify-content:space-between;align-items:center;height:88px}
.logo{display:flex;align-items:center;gap:14px;cursor:pointer}.logo b{width:40px;height:40px;border-radius:10px;background:var(--g);display:grid;place-items:center;font-weight:400}.logo h3{font-size:24px;color:#1C1C1C}
nav{display:flex;gap:8px;align-items:center}.tab{padding:12px 18px;border-radius:12px;font-size:15px}.tab.on{background:var(--g);color:#fff;font-weight:700}
.ic{width:42px;height:42px;border-radius:10px;border:1px solid var(--l);background:#fff;margin-left:8px}
.loc{background:#fff;border-bottom:1px solid var(--l);padding:18px 0;font-size:14px}
.hero{background:var(--g);color:#fff;padding:56px 0}.hero h1{color:#fff;font-size:54px;line-height:1.1;margin:18px 0}.hero em{color:var(--o);font-style:normal}.hero p{color:#ffffffb3;line-height:1.6;max-width:470px;font-size:16px}
.hg{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}.hd{display:flex;justify-content:space-between;align-items:center}
.tg{background:#ffffff1f;color:#F2C46D;padding:8px 14px;border-radius:20px;font-size:12px;font-weight:600}.bc{font-size:14px;cursor:pointer}
.eb{width:72px;height:72px;border-radius:16px;background:#ffffff1a;display:grid;place-items:center;font-size:32px}
.bs{display:flex;gap:12px;margin-top:26px}.btn{border-radius:12px;padding:14px 22px;font-weight:700;font-size:14px;background:var(--g);color:#fff}
.btn.o{background:var(--o);color:#1C1C1C}.btn.ol{border:1px solid #ffffff59}.btn.w1{width:100%}
.col{position:relative;border-radius:20px;overflow:hidden;height:320px;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr}
.col .cap{position:absolute;left:18px;bottom:16px;color:#fff;font-size:14px}.col .cap small{display:block;color:#ffffffb3;font-size:12px;margin-top:2px}
.col .bg{position:absolute;right:16px;top:16px;background:var(--o);color:#1C1C1C;padding:8px 14px;border-radius:20px;font-size:12px;font-weight:700}
.im{background:#D8CDB4;overflow:hidden}.im img{width:100%;height:100%;object-fit:cover;display:block}
.card{background:#fff;border:1px solid var(--l);border-radius:16px;overflow:hidden;text-align:left;display:block;width:100%}
.ph{position:relative}.bd{position:absolute;left:12px;top:12px;background:#fff}
.cb{padding:18px;display:flex;flex-direction:column;gap:6px}.cb small{color:var(--m);font-size:13px}
.pr{display:flex;justify-content:space-between;align-items:center;margin-top:10px}.pr strong{font-size:20px;color:var(--g)}
.plus{width:36px;height:36px;border-radius:10px;background:var(--g);color:#fff;font-size:20px}
.pill{background:var(--b);color:var(--g);padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;width:fit-content;display:inline-block}
.chip{border:1px solid var(--l);background:#fff;padding:11px 18px;border-radius:24px;font-size:14px}.chip.on{background:var(--g);color:#fff;border-color:var(--g);font-weight:600}.chip.s{background:var(--b);font-weight:600}
.fl{display:flex;gap:12px;flex-wrap:wrap}.ct{display:flex;justify-content:space-between;align-items:center}
.sr{width:470px;height:44px;border:1px solid var(--l);border-radius:12px;padding:0 16px;font:inherit;font-size:14px;background:#fff}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:36px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.sp{display:flex;justify-content:space-between;align-items:center}.sp b{font-size:13px;color:var(--g)}
.nt{background:var(--b);border-radius:12px;padding:16px 18px;font-size:14px;margin-top:20px}
.rw{display:flex;gap:16px;cursor:pointer;margin-top:12px;height:115px}.rw>div:last-child{padding:14px 0;display:flex;flex-direction:column;gap:5px}.rw p{margin:0;color:#3A3A34}
.st{color:#C77A1E;font-weight:700}.more{padding:16px;text-align:center;font-weight:700;color:var(--g);margin-top:12px}
.bk{font-weight:700;color:var(--g);font-size:14px;margin-bottom:18px}
.ban{position:relative;height:130px;border-radius:20px;overflow:hidden;margin:6px 0 30px}.ov{position:absolute;inset:0;background:#17352Ab3;color:#fff;padding:24px 28px}.ov h2{color:#fff}.ov small{font-size:12px}
.bar{position:fixed;left:0;right:0;bottom:0;background:var(--g);color:#fff;padding:16px 0}.bar .w{display:flex;justify-content:space-between;align-items:center}.bar small{display:block;font-size:12px;opacity:.7}
.cg{display:grid;grid-template-columns:2fr 1fr;gap:24px;align-items:start;margin-top:20px}.gh{background:var(--b);padding:14px 18px;display:flex;justify-content:space-between;font-weight:700;font-size:14px}
.li{display:flex;gap:14px;align-items:center;padding:14px 18px;border-top:1px solid var(--l);font-size:14px}.li div:nth-child(2){flex:1}.li small{display:block;color:var(--m);font-size:12px}
.sm{padding:22px}.sm div{display:flex;justify-content:space-between;padding:6px 0;font-size:14px;color:var(--m)}.sm .t{color:#1C1C1C;font-weight:700;border-top:1px solid var(--l);margin:8px 0 16px;padding-top:12px}
.info{background:var(--b);border-radius:12px;padding:12px 16px;font-size:13px;margin-top:16px}
.ok{text-align:center;max-width:480px;margin:0 auto}.ck{width:64px;height:64px;border-radius:50%;background:var(--g);color:#fff;display:grid;place-items:center;font-size:28px;margin:20px auto 16px}
.dt div{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px dashed var(--l);font-size:14px}.dt div:last-child{border:0}.dt div b{font-weight:700}.dt div span{color:var(--m)}
.pf{display:flex;align-items:center;gap:24px;padding:28px}.av{width:84px;height:84px;border-radius:50%;background:var(--g);color:#fff;display:grid;place-items:center;font:600 32px Fraunces,serif}
.sx{display:flex;gap:12px;margin-left:auto}.sx>div{background:var(--b);border-radius:12px;padding:16px;width:152px;font-size:12px;color:var(--m)}.sx b{display:block;color:#1C1C1C;font-size:26px;margin-top:10px}
.ak{padding:24px;margin-bottom:24px}.ak h2{font-size:24px;margin-bottom:16px}.rr{display:flex;justify-content:space-between;align-items:center;padding:14px 0}.rr+.rr{border-top:1px solid var(--l)}.rr small{display:block;color:var(--m);font-size:13px;margin-top:4px}
.pb{background:var(--b);color:var(--g);padding:12px 18px;border-radius:10px;font-size:13px;font-weight:700}.bx{width:44px;height:44px;border-radius:10px;background:var(--b);display:grid;place-items:center}
footer{background:var(--g);color:#ffffffb3;padding:36px 0;font-size:14px}footer .w{display:flex;justify-content:space-between}
`;

// ───────── Komponen ─────────
const Img = ({ n, s }) => (
  <div className="im" style={s}>
    <img src={`/img/${n}.jpg`} alt="" onError={e => e.target.remove()} />
  </div>
);

const Card = ({ i, b, st, add, h = 245 }) => (
  <div className="card">
    <div className="ph"><Img n={i[3]} s={{ height: h }} />{b && <span className="pill bd">{b}</span>}</div>
    <div className="cb">
      <b>{i[0]}</b>{st && <small>{i[4]}</small>}<small>{i[1]}</small>
      <div className="pr"><strong>{Y(i[2])}</strong><button className="plus" onClick={() => add(i)}>+</button></div>
    </div>
  </div>
);

const Row = ({ s, go }) => (
  <div className="card rw" onClick={() => go("stall", s)}>
    <Img n={s[6]} s={{ width: 125 }} />
    <div>
      <b>{s[0]}</b>
      <p><span className="st">★ {s[1].toFixed(1)}</span> &nbsp;{s[2]}</p>
      <p>{s[3]} · {Y(s[4])}</p>
      <span className="pill">{s[5]}</span>
    </div>
  </div>
);

function Nav({ pg, go }) {
  const a = { home: 0, map: 1, stall: 1, cat: 1, cart: 2, done: 2, akun: 3 }[pg];
  return (
    <header className="nav"><div className="w nv">
      <div className="logo" onClick={() => go("home")}><b>🌿</b><h3>Pasar Oro-Oro Dowo</h3></div>
      <nav>
        {[["🏠", "Beranda", "home"], ["🗺️", "Warung", "map"], ["🧺", "Keranjang", "cart"], ["👤", "Akun", "akun"]].map(([e, t, p], i) => (
          <button key={p} className={"tab" + (a === i ? " on" : "")} onClick={() => go(p)}>{e} {t}</button>
        ))}
        <button className="ic">🔔</button>
      </nav>
    </div></header>
  );
}

// ───────── Halaman ─────────
function Home({ go }) {
  const imgs = ["liwet", "pizza", "rawon", "nasi_buk", "sate", "burger"];
  return (
    <>
      <section className="hero"><div className="w hg">
        <div>
          <span className="tg">🍳 Dimasak Fresh · Pasar Buka 05.00–17.00</span>
          <h1>Satu Aplikasi, <em>Ragam Kuliner Legendaris</em> Pasar</h1>
          <p>Pesan langsung dari warung legendaris pasar — dimasak fresh begitu pesanan masuk, diantar hangat ke rumahmu.</p>
          <div className="bs">
            <button className="btn o" onClick={() => go("map")}>Pesan Kuliner Sekarang</button>
            <button className="btn ol" onClick={() => go("map")}>🗺️ Jelajahi Peta Warung Kuliner</button>
          </div>
        </div>
        <div className="col">
          {imgs.map(n => <Img key={n} n={n} />)}
          <span className="bg">40+ Warung Aktif</span>
          <div className="cap"><b>Ragam Kuliner Pasar</b><small>Dari 40+ warung legendaris</small></div>
        </div>
      </div></section>
      <div className="w pg">
        <h2>Pilih kuliner favoritmu</h2><p>Pilih kategori, kami arahkan ke warung dengan menu siap masak hari ini.</p>
        <div className="g4" style={{ margin: "24px 0 48px" }}>
          {[["makanan", "🍚", "Makanan Berat", 14], ["sate", "🍢", "Sate & Bakar", 8], ["map", "🍡", "Jajanan Manis", 16], ["kopi", "☕", "Kopi & Minuman", 7]].map(([k, e, t, n]) => (
            <button key={k} className="card cb" style={{ padding: 20 }} onClick={() => (k === "map" ? go("map") : go("cat", k))}>
              <span className="bx">{e}</span><b style={{ marginTop: 14 }}>{t}</b><small>{n} warung</small>
            </button>
          ))}
        </div>
        <h2>Warung kuliner favorit minggu ini</h2><p>Dipilih dari rating dan kecepatan penyajian.</p>
        <div className="g2" style={{ marginTop: 24, gap: 16 }}>
          {[PETA[0], PETA[1]].map(s => (
            <div key={s[0]} className="card" style={{ cursor: "pointer" }} onClick={() => go("stall", s)}>
              <Img n={s[6]} s={{ height: 220 }} />
              <div className="cb"><b>{s[0]}</b><small><span className="st">★ {s[1].toFixed(1)}</span> &nbsp;{s[2]}</small></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function MapP({ go }) {
  const [f, sf] = useState("Semua");
  const L = f === "Semua" ? PETA : PETA.filter(s => s[8] === f);
  return (
    <div className="w pg">
      <button className="bk" onClick={() => go("home")}>← Kembali ke Home</button>
      <div className="ct"><div><h2>Peta Warung Kuliner</h2><p>40+ warung kuliner aktif untuk dilihat menu dan estimasi masak.</p></div><input className="sr" placeholder="🔍 Cari nama warung atau menu..." /></div>
      <div className="fl" style={{ margin: "20px 0 24px" }}>
        {["Semua", "Makanan Berat", "Sate & Bakar", "Jajanan Manis", "Minuman"].map(t => <button key={t} className={"chip" + (f === t ? " on" : "")} onClick={() => sf(t)}>{t}</button>)}
      </div>
      <div className="g3">
        {L.map(s => (
          <div key={s[0]} className="card" style={{ cursor: "pointer" }} onClick={() => go("stall", s)}>
            <div className="ph"><Img n={s[6]} s={{ height: 190 }} /><span className="pill bd">Kuliner · No. {String(s[7]).padStart(2, "0")}</span></div>
            <div className="cb"><b>{s[0]}</b><small><span className="st">★ {s[1].toFixed(1)}</span> &nbsp;{s[8]}</small></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatP({ k, go, add }) {
  const c = CATS[k];
  return (
    <>
      <div className="loc"><div className="w">📍 Dikirim ke <b>Jl. Veteran, Malang</b> ▾</div></div>
      <section className="hero" style={{ padding: "30px 0 34px" }}><div className="w hd">
        <div>
          <a className="bc" onClick={() => go("home")}>← Beranda / Kategori kuliner</a>
          <h1 style={{ fontSize: 48, margin: "14px 0 8px" }}>{c.t}</h1>
          <p style={{ margin: 0 }}><b style={{ color: "#F2C46D" }}>{c.n} warung</b> · {c.s}</p>
        </div>
        <div className="eb">{c.e}</div>
      </div></section>
      <div className="w pg">
        <div className="ct">
          <div className="fl">{Object.entries(CATS).map(([x, y]) => <button key={x} className={"chip" + (x === k ? " on" : "")} onClick={() => go("cat", x)}>{y.t}</button>)}</div>
          <input className="sr" placeholder={"🔍 " + c.h} />
        </div>
        <div className="fl" style={{ margin: "14px 0 36px" }}>{c.f.map((t, i) => <span key={t} className={"chip" + (i ? "" : " s")}>{t}</span>)}</div>
        <div className="g2">
          <div>
            <h2>{c.ft}</h2><p>{c.fs}</p>
            <div className="g2" style={{ gap: 20, marginTop: 24 }}>{c.favs.map((i, j) => <Card key={i[0]} i={i} b={j ? "Favorit" : "Terlaris"} st add={add} />)}</div>
            <div className="nt">{c.note}</div>
          </div>
          <div>
            <div className="sp"><h2>{c.lt}</h2><b>Terpopuler ▾</b></div>
            <p>4 dari {c.n} warung · menu tersedia hari ini</p>
            {c.list.map(s => <Row key={s[0]} s={s} go={go} />)}
            <button className="card more" onClick={() => go("map")}>Lihat {c.n - 4} warung lainnya →</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Stall({ s, go, add }) {
  const m = s[0].includes("Liwet") ? LIWET : [[s[3], "Porsi", s[4], s[6], s[0]]];
  return (
    <div className="w pg" style={{ paddingBottom: 120 }}>
      <button className="bk" onClick={() => go("map")}>← Peta Warung</button>
      <div className="ban">
        <Img n={s[6]} s={{ position: "absolute", inset: 0 }} />
        <div className="ov"><h2>{s[0]}</h2><small>★ {s[1].toFixed(1)} (410 pesanan) · Kuliner{s[7] ? ` · No. ${String(s[7]).padStart(2, "0")}` : ""} · Dimasak fresh · {s[2]}</small></div>
      </div>
      <h2>Menu tersedia</h2>
      <p>{s[0].includes("Liwet") ? "Dibungkus daun pisang, dibakar begitu pesanan masuk." : "Dimasak fresh begitu pesanan masuk."}</p>
      <div className="g3" style={{ marginTop: 20 }}>{m.map(i => <Card key={i[0]} i={i} add={add} h={120} />)}</div>
    </div>
  );
}

function Cart({ cart, go }) {
  const L = Object.values(cart), sub = L.reduce((s, { i, q }) => s + i[2] * q, 0), g = {};
  L.forEach(x => (g[x.i[4]] = g[x.i[4]] || []).push(x));
  return (
    <div className="w pg">
      <button className="bk" onClick={() => go("map")}>← Lanjut pesan</button>
      <h2>Keranjang Pesanan</h2><p>Menu dikelompokkan per warung, diantar dalam satu jadwal.</p>
      <div className="info">🍳 Dimasak fresh begitu diterima warung — estimasi tiba <b>25–35 menit</b>.</div>
      <div className="cg">
        <div>
          {!L.length && <p style={{ padding: 24 }}>Keranjang masih kosong. Pilih menu dari warung dulu.</p>}
          {Object.entries(g).map(([n, xs]) => (
            <div key={n} className="card" style={{ marginBottom: 16 }}>
              <div className="gh"><span>{n}</span><span>{Y(xs.reduce((s, { i, q }) => s + i[2] * q, 0))}</span></div>
              {xs.map(({ i, q }) => (
                <div key={i[0]} className="li"><Img n={i[3]} s={{ width: 44, height: 44, borderRadius: 8 }} /><div><b>{i[0]}</b><small>{i[1]}</small></div><span style={{ color: "#6F6F66" }}>x{q}</span><b>{Y(i[2] * q)}</b></div>
              ))}
            </div>
          ))}
        </div>
        <div className="card sm">
          <div><span>Subtotal menu</span><span>{Y(sub)}</span></div>
          <div><span>Ongkos kirim</span><span>{Y(L.length ? 8000 : 0)}</span></div>
          <div className="t"><span>Total bayar</span><span>{Y(L.length ? sub + 8000 : 0)}</span></div>
          <button className="btn o w1" disabled={!L.length} onClick={() => go("done", sub + 8000)}>Konfirmasi Pesanan</button>
        </div>
      </div>
    </div>
  );
}

function Done({ total, back }) {
  const id = "#OOD-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-041";
  return (
    <div className="w pg ok">
      <div className="ck">✓</div><h2>Pesanan dikonfirmasi</h2>
      <p>Warung mulai memasak pesananmu. Kami kabari begitu makanan siap diantar hangat.</p>
      <div className="card dt" style={{ padding: "8px 24px", margin: "28px 0" }}>
        <div><span>Nomor pesanan</span><b>{id}</b></div><div><span>Estimasi tiba</span><b>25–35 menit</b></div>
        <div><span>Alamat</span><b>Jl. Veteran, Malang</b></div><div><span>Total bayar</span><b>{Y(total)}</b></div>
      </div>
      <button className="btn" onClick={back}>Kembali ke Beranda</button>
    </div>
  );
}

function Akun() {
  const R = ({ a, b, c }) => <div className="rr"><div><b>{a}</b><small>{b}</small></div><span className="pb">{c}</span></div>;
  return (
    <div className="w pg">
      <h1 style={{ fontSize: 40, marginBottom: 28 }}>Akun</h1>
      <div className="card pf">
        <div className="av">LM</div>
        <div><h2>Lionel Messi</h2><p>+62 812 3456 7890</p></div>
        <button className="btn" style={{ marginLeft: 120 }}>Edit Profil</button>
        <div className="sx">{[["Pesanan aktif", 2], ["Riwayat", 18], ["Favorit", 6]].map(([a, b]) => <div key={a}>{a}<b>{b}</b></div>)}</div>
      </div>
      <div className="g2" style={{ marginTop: 28, gap: 28, alignItems: "start", gridTemplateColumns: "1fr 1.25fr" }}>
        <div>
          <div className="card ak"><h2>Pesanan Saya</h2><R a="Pesanan aktif" b="2 pesanan sedang diproses" c="Lihat semua" /><R a="Riwayat pesanan" b="Lihat semua transaksi" c="Lihat" /></div>
          <div className="card ak"><h2>Alamat Tersimpan</h2><div className="rr" style={{ padding: 0 }}><div style={{ display: "flex", gap: 14, alignItems: "center" }}><span className="bx">📍</span><div><b>Alamat utama</b><small>Jl. Veteran No. 12, Malang</small></div></div><span className="pb">Ubah</span></div></div>
        </div>
        <div>
          <div className="card ak"><h2>Warung Favorit</h2>
            <div className="g2" style={{ gap: 20 }}>{[["nasi_buk", "Nasi Buk Hj. Supina"], ["liwet", "Sego Liwet Bakar"]].map(([n, t]) => <div key={n}><Img n={n} s={{ height: 160, borderRadius: 12 }} /><div style={{ marginTop: 10 }}><b>{t}</b><small style={{ display: "block", color: "#6F6F66", fontSize: 12, marginTop: 6 }}>Makanan Berat</small></div></div>)}</div>
          </div>
          <div className="card ak rr" style={{ padding: 22 }}><div style={{ display: "flex", gap: 14, alignItems: "center" }}><span className="bx">🤝</span><div><b>Bantuan</b><small>FAQ, bantuan pesanan, dan kontak dukungan</small></div></div><span>▸</span></div>
        </div>
      </div>
      <hr style={{ border: 0, borderTop: "1px solid #E3DCCB", margin: "12px 0 28px" }} />
      <button className="card" style={{ width: 200, padding: 14, textAlign: "center", color: "#C77A1E", fontWeight: 700 }}>Keluar</button>
    </div>
  );
}

// ───────── App ─────────
const key = i => i[4] + "|" + i[0];
export default function App() {
  const [v, sv] = useState({ p: "home" });
  const [cart, sc] = useState(() => Object.fromEntries(LIWET.slice(0, 2).map(i => [key(i), { i, q: 1 }])));
  const go = (p, a) => { sv({ p, a }); window.scrollTo(0, 0); };
  const add = i => sc(c => ({ ...c, [key(i)]: { i, q: (c[key(i)]?.q || 0) + 1 } }));
  const L = Object.values(cart), total = L.reduce((s, { i, q }) => s + i[2] * q, 0), count = L.reduce((s, { q }) => s + q, 0);
  const page = {
    home: <Home go={go} />, map: <MapP go={go} />, akun: <Akun />, cart: <Cart cart={cart} go={go} />,
    cat: v.p === "cat" && <CatP k={v.a} go={go} add={add} />,
    stall: v.p === "stall" && <Stall s={v.a} go={go} add={add} />,
    done: <Done total={v.a} back={() => { sc({}); go("home"); }} />,
  }[v.p];
  return (
    <>
      <style>{CSS}</style>
      <Nav pg={v.p} go={go} />
      {page}
      {v.p === "stall" && <div className="bar"><div className="w"><div><small>Total keranjang</small><b>{Y(total)}</b></div><button className="btn o" onClick={() => go("cart")}>Lihat Keranjang ({count})</button></div></div>}
      <footer><div className="w"><span>© Pasar Oro-Oro Dowo</span><span>Malang</span></div></footer>
    </>
  );
}
