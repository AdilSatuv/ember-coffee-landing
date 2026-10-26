"use client";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { coffees, coffeePrice, recipes, scaleRecipe, recipeText } from "../content/coffee";
import { downloadText } from "../lib/download";
import CoffeeBag from "./CoffeeBag";
import s from "./Landing.module.scss";
export function Collection() {
  const [mood, setMood] = useState("all");
  const [weight, setWeight] = useState(250);
  const [chosen, setChosen] = useState(null);
  return <section className={s.collection} id="coffee" aria-labelledby="collection-title">
    <div className={s.sectionTop}><span>01 / КОФЕ С ХАРАКТЕРОМ</span><span>ТРИ НАСТРОЕНИЯ. ОДНО ТВОЁ.</span></div>
    <div className={s.sectionHeading}><h2 id="collection-title">Какое у тебя<br /><em>сегодня утро?</em></h2><p>Выбирай не по сложным словам.<br />Выбирай по тому, что любишь.</p></div>
    <div className={s.filters}><div role="group" aria-label="Вкус кофе">{[["all","Весь кофе"],["classic","Люблю классику"],["bright","Хочу ярче"],["balanced","Ищу баланс"]].map(([id,label])=><button key={id} aria-pressed={mood===id} onClick={()=>setMood(id)}>{label}</button>)}</div><div role="group" aria-label="Вес упаковки">{[250,1000].map(value=><button key={value} aria-pressed={weight===value} onClick={()=>setWeight(value)}>{value===250?"250 г":"1 кг"}</button>)}</div></div>
    <div className={s.products}>{coffees.filter(coffee=>mood==="all"||coffee.mood===mood).map(coffee=><article key={coffee.id} className={s.product}>
      <div className={s.productVisual} style={{"--wash":coffee.color+"22"}}><CoffeeBag {...coffee} /><span className={s.roundStamp}>100%<br />АРАБИКА</span></div>
      <div className={s.productMeta}><span>{coffee.origin}</span><span>{weight===250?"250 Г":"1 КГ"}</span></div><h3>{coffee.name}</h3><p>{coffee.notes}</p>
      <button className={s.productButton} onClick={()=>setChosen({...coffee,weight})}>Выбрать — {Math.round(coffeePrice(coffee.id,weight)).toLocaleString("ru-RU")} ₽<ArrowUpRight size={19}/></button>
    </article>)}</div>
    <p className={s.resultCount} aria-live="polite">Лотов в подборке: {coffees.filter(coffee=>mood==="all"||coffee.mood===mood).length}</p>
    {chosen&&<aside className={s.selection} aria-live="polite"><Check size={22}/><div><strong>{chosen.name} / {chosen.weight===250?"250 г":"1 кг"}</strong><p>{chosen.description} Это демо: заказ не оформляется.</p></div><button onClick={()=>setChosen(null)} aria-label="Закрыть выбранный кофе">Закрыть</button></aside>}
  </section>;
}
export function BrewGuide() {
  const [method,setMethod]=useState("filter");const [cups,setCups]=useState(1);const recipe=scaleRecipe(method,cups);
  return <section id="brew" className={s.brew}><div><span className={s.eyebrow}>03 / МАЛЕНЬКИЙ ЕЖЕДНЕВНЫЙ РИТУАЛ</span><h2>Хороший кофе.<br /><em>Твои правила.</em></h2><p>Немного внимания — и любимая чашка дома.<br />Начни с рецепта, а дальше доверься вкусу.</p><div className={s.brewMethods} role="group" aria-label="Способ приготовления">{Object.entries(recipes).map(([id,item])=><button key={id} aria-pressed={method===id} onClick={()=>setMethod(id)}>{item.label}<ArrowRight size={17}/></button>)}</div></div><div className={s.recipe} aria-live="polite"><div className={s.recipeTop}><span>РЕЦЕПТ / {recipe.label.toUpperCase()}</span><span>↗</span></div><label className={s.portions} htmlFor="brew-portions"><span id="brew-portions-label">Количество чашек</span><select id="brew-portions" aria-labelledby="brew-portions-label" value={recipe.portions} disabled={method==="espresso"} onChange={event=>setCups(Number(event.target.value))}>{[1,2,3].map(value=><option key={value} value={value}>{value}</option>)}</select></label>{method==="espresso"&&<p>Для эспрессо указан рецепт одной порции.</p>}<div className={s.recipeStats}><div><strong>{recipe.dose}</strong><span>КОФЕ</span></div><div><strong>{recipe.water}</strong><span>ВОДА / ВЫХОД</span></div><div><strong>{recipe.time}</strong><span>ВРЕМЯ</span></div></div><p>{recipe.grind} · вода 92–96 °C для воронки и френч-пресса</p><ol>{recipe.steps.map(step=><li key={step}>{step}</li>)}</ol><small>Базовые ориентиры. Для большого объёма отрегулируй помол и время. Результат зависит от зерна, воды и оборудования.</small><button className={s.recipeDownload} onClick={()=>downloadText("ember-brew-recipe.txt",recipeText(method,cups))}>Скачать рецепт ↓</button></div></section>;
}
export function CoffeeClub() {
  const [email,setEmail]=useState("");const [message,setMessage]=useState("");
  return <section className={s.club} id="club"><span className={s.eyebrow}>04 / ОСТАВАЙСЯ НА ТЁПЛОЙ СТОРОНЕ</span><h2>У хорошего кофе<br />есть <em>продолжение.</em></h2><div><p>Новые лоты, рецепты и истории о кофе.<br />Без шума. Только то, что хочется прочитать.</p><form onSubmit={event=>{event.preventDefault();setMessage(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())?"Всё готово! Это демонстрация: адрес не сохранён, письма отправляться не будут.":"Укажи корректную электронную почту.");}} noValidate><label htmlFor="club-email">Электронная почта</label><div className={s.emailRow}><input id="club-email" type="email" autoComplete="email" value={email} onChange={event=>setEmail(event.target.value)} placeholder="you@example.com" required aria-describedby="club-status"/><button aria-label="Проверить демонстрационную подписку"><ArrowUpRight/></button></div><p id="club-status" role="status">{message||"Демонстрационная форма. Данные никуда не отправляются."}</p></form></div></section>;
}
