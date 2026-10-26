"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { recommendCoffee } from "../content/coffee";
import CoffeeBag from "./CoffeeBag";
import s from "./TasteFinder.module.scss";
export default function TasteFinder() {
  const [answers,setAnswers]=useState({method:"",milk:"",taste:""});
  const [result,setResult]=useState(null),[error,setError]=useState("");
  const output=useRef(null);
  const groups=[{key:"method",title:"Как готовишь кофе?",options:[["filter","Воронка / фильтр"],["espresso","Эспрессо-машина"],["french","Френч-пресс"]]},{key:"milk",title:"Как любишь пить?",options:[["black","Чёрным"],["milk","С молоком"]]},{key:"taste",title:"К чему тянет сегодня?",options:[["chocolate","Шоколад и орехи"],["fruit","Фрукты и цветы"],["balance","Сладкий баланс"]]}];
  function choose(key,value){setAnswers(current=>({...current,[key]:value}));setResult(null);setError("");}
  function find(event){event.preventDefault();if(Object.values(answers).some(value=>!value)){setError("Ответь на все три вопроса — так подбор будет осмысленным.");return;}setResult(recommendCoffee(answers));requestAnimationFrame(()=>output.current?.focus());}
  return <section className={s.finder} id="taste" aria-labelledby="taste-title"><div className={s.intro}><span>ТВОЯ ЧАШКА / БЕЗ СЛОЖНЫХ СЛОВ</span><h2 id="taste-title">Начнём<br/>с <em>твоего вкуса.</em></h2><p>Три вопроса, один ориентир. Покажем не только лот, но и логику выбора.</p><img src="/images/cup.webp" alt="Чашка чёрного кофе на деревянном столе" width="1200" height="800" loading="lazy"/></div><div><form onSubmit={find}>{groups.map((group,index)=><fieldset key={group.key}><legend><span>0{index+1}</span>{group.title}</legend><div className={s.choices}>{group.options.map(([id,label])=><label key={id} data-checked={answers[group.key]===id}><input type="radio" name={group.key} value={id} checked={answers[group.key]===id} onChange={()=>choose(group.key,id)}/><span>{label}</span></label>)}</div></fieldset>)}<p className={s.error} role="status">{error}</p><button className={s.submit}>Подобрать мой кофе <ArrowUpRight size={18}/></button></form>{result&&<section className={s.result} ref={output} tabIndex={-1} aria-label="Рекомендация кофе"><div className={s.resultTop}><div><span>ТВОЙ ОРИЕНТИР</span><h3>{result.coffee.name}</h3><p>{result.coffee.notes}</p></div><CoffeeBag {...result.coffee}/></div><ul>{result.reasons.map(reason=><li key={reason}>{reason}</li>)}</ul><div className={s.actions}><a href="#coffee">Посмотреть коллекцию <ArrowUpRight size={17}/></a><button type="button" onClick={()=>{setAnswers({method:"",milk:"",taste:""});setResult(null);setError("");}}><RotateCcw size={14}/>Пройти заново</button></div><small>Правила подбора иллюстративные. Это знакомство с ассортиментом, а не гарантия вкусовых ощущений.</small></section>}</div></section>;
}
