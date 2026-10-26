import s from "./Landing.module.scss";
export default function CoffeeBag({ color = "#c34e2b", number = "01", name = "Тёплый берег", hero = false }) {
  return <div className={`${s.bag} ${hero ? s.heroBag : ""}`} style={{ "--bag-color": color, "--label-ink": color === "#c34e2b" ? "#ffffff" : "#111111" }} role="img" aria-label={`Дизайн упаковки EMBER: ${name}`}>
    <div className={s.bagSeal} /><span className={s.bagBrand}>ember<span>®</span></span>
    <div className={s.bagStamp}>SMALL BATCH<br />BIG CHARACTER</div>
    <div className={s.bagLabel}><span>COFFEE COLLECTION</span><strong>{number}</strong><b>{name}</b><span>СВЕЖАЯ ОБЖАРКА / 250 Г</span></div>
    <div className={s.bagBottom}>ROASTED WITH INTENTION ↗</div>
  </div>;
}
