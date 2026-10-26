export const coffees = [
  { id: "brasil", name: "Тёплый берег", origin: "БРАЗИЛИЯ / СЕРРАДО", notes: "Шоколад · фундук · карамель", mood: "classic", color: "#c34e2b", price: 790, number: "01", description: "Округлый, спокойный вкус для первого кофе в день. Особенно хорош с молоком." },
  { id: "ethiopia", name: "Солнечная сторона", origin: "ЭФИОПИЯ / СИДАМА", notes: "Персик · жасмин · бергамот", mood: "bright", color: "#dbb344", price: 990, number: "02", description: "Лёгкий и выразительный лот. Для тех, кто любит находить в чашке новые оттенки." },
  { id: "colombia", name: "Длинный разговор", origin: "КОЛУМБИЯ / УИЛА", notes: "Красное яблоко · какао · мёд", mood: "balanced", color: "#67866c", price: 890, number: "03", description: "Сочная середина между классикой и открытием. Кофе, с которым не хочется спешить." },
];
export const recipes = {
  filter: { label: "Воронка", dose: "18 г", water: "300 мл", time: "2:30–3:00", grind: "Средний помол", steps: ["Промой фильтр горячей водой и засыпь кофе.", "Влей 50 мл воды, подожди 30 секунд.", "Плавно долей воду до 300 мл за два подхода."] },
  french: { label: "Френч-пресс", dose: "20 г", water: "320 мл", time: "4:00", grind: "Крупный помол", steps: ["Прогрей колбу и засыпь свежемолотый кофе.", "Залей воду и аккуратно перемешай.", "Через четыре минуты медленно опусти поршень."] },
  espresso: { label: "Эспрессо", dose: "18 г", water: "36 г в чашке", time: "0:25–0:30", grind: "Тонкий помол", steps: ["Равномерно распредели кофе в сухой корзине.", "Утрамбуй и сразу начни приготовление.", "Ориентируйся на вкус: цифры — отправная точка."] },
};
export const coffeeProfiles = {
  brasil: { processing: "Натуральная", roast: "Средняя / эспрессо", acidity: 2, body: 4, brewing: "Эспрессо, френч-пресс, кофе с молоком", story: "В этом демонстрационном лоте мы ищем привычное и тёплое: сладкую ореховую основу, плотную чашку и мягкое послевкусие.", tip: "Начни с эспрессо 18 г → 36 г. Для молочного напитка сохрани насыщенную основу и добавь молоко по вкусу." },
  ethiopia: { processing: "Мытая", roast: "Светлая / фильтр", acidity: 4, body: 2, brewing: "Воронка, капельная кофеварка, чёрный кофе", story: "Концепция этого лота — прозрачная чашка с цветочными и фруктовыми ассоциациями. Выразительный вариант для медленного знакомства со вкусом.", tip: "Начни с воронки 18 г → 300 мл. Если чашка кажется слишком резкой, попробуй чуть мельче помол и сравни результат." },
  colombia: { processing: "Мытая", roast: "Средняя / универсальная", acidity: 3, body: 3, brewing: "Воронка, френч-пресс, эспрессо", story: "Идея лота — соединить сочность яблока со спокойной сладостью какао. Универсальный характер для тех, кто меняет способ приготовления под настроение.", tip: "Попробуй френч-пресс 20 г → 320 мл или воронку. Сравни одну и ту же чашку горячей и немного остывшей." },
};
export function rankCoffees({method,milk,taste}) {
 if (!["filter","espresso","french"].includes(method) || !["black","milk"].includes(milk) || !["chocolate","fruit","balance"].includes(taste)) throw new RangeError("Incomplete taste preferences");
 const tasteId={chocolate:'brasil',fruit:'ethiopia',balance:'colombia'}[taste];
 const methodId={espresso:'brasil',filter:'ethiopia',french:'colombia'}[method];
 const milkId=milk==='milk'?'brasil':'ethiopia';
 return coffees.map((coffee,index)=>{const breakdown={taste:coffee.id===tasteId?3:0,method:coffee.id===methodId?2:0,milk:coffee.id===milkId?(milk==='milk'?2:1):0};return {coffee,index,breakdown,score:breakdown.taste+breakdown.method+breakdown.milk};}).sort((a,b)=>b.score-a.score||a.index-b.index);
}
export function compareCoffees(answers) {
 const ranking=rankCoffees(answers),alternative=ranking[1];
 const values={method:[['filter','воронка / фильтр'],['espresso','эспрессо-машина'],['french','френч-пресс']],milk:[['black','чёрный кофе'],['milk','кофе с молоком']],taste:[['chocolate','шоколад и орехи'],['fruit','фрукты и цветы'],['balance','сладкий баланс']]};
 let change=null;
 for(const [key,options]of Object.entries(values))for(const [value,label]of options)if(!change&&value!==answers[key]&&rankCoffees({...answers,[key]:value})[0].coffee.id===alternative.coffee.id)change={key,value,label};
 return {best:ranking[0],alternative,tied:ranking[0].score===alternative.score,change};
}
export function recommendCoffee({ method, milk, taste }) {
  const id = rankCoffees({method,milk,taste})[0].coffee.id;
  const flavour = { chocolate: "шоколад и орехи", fruit: "фрукты и цветы", balance: "сладкий баланс" }[taste];
  const reasons = [id === "brasil" ? "У «Тёплого берега» плотная шоколадно-ореховая основа: она подходит и для эспрессо, и для добавления молока." : id === "ethiopia" ? "«Солнечная сторона» — лёгкий фруктово-цветочный профиль, который интересно раскрывать в чёрной чашке." : "«Длинный разговор» соединяет сочность и сладость; это спокойная середина между классикой и яркими открытиями.", "Твой вкусовой ориентир — «" + flavour + "». Мы также учли способ приготовления и молоко, поэтому выбор может быть компромиссом между тремя ответами.", method === "filter" ? "Воронка поможет рассмотреть отдельные оттенки чашки." : method === "espresso" ? "Для эспрессо начни с базового рецепта и подстрой помол под выбранный лот." : "Френч-пресс подчеркнёт тело и плотность напитка.", milk === "milk" ? "Молоко смягчит кислотность и часть тонких нот: попробуй маленькую чёрную чашку для сравнения." : "Без молока будет проще почувствовать собственный характер зерна."];

  return { coffee: coffees.find(item=>item.id===id), reasons };
}
export function coffeePrice(id, weight) {
  const coffee = coffees.find(item => item.id === id);
  if (!coffee || ![250, 1000].includes(weight)) throw new RangeError("Unknown coffee or weight");
  return weight === 250 ? coffee.price : coffee.price * 3.4;
}
export function scaleRecipe(method, cups) {
  if (!Object.hasOwn(recipes, method) || ![1,2,3].includes(cups)) throw new RangeError("Unknown recipe or portions");
  const base = recipes[method], portions = method === "espresso" ? 1 : cups;
  if (method === "espresso") return { ...base, portions };
  return { ...base, portions, dose: `${parseInt(base.dose) * portions} г`, water: `${parseInt(base.water) * portions} мл`, steps: base.steps.map(step => step.replace("50 мл", `${50 * portions} мл`).replace("300 мл", `${300 * portions} мл`)) };
}
export function recipeText(method, cups) {
  const item = scaleRecipe(method, cups);
  return ["EMBER / ТВОЙ КОФЕЙНЫЙ РИТУАЛ", item.label, `Порций: ${item.portions}`, `Кофе: ${item.dose}`, `Вода / выход: ${item.water}`, `Время: ${item.time}`, item.grind, "", ...item.steps.map((step,index) => `${index+1}. ${step}`), "", "Базовый рецепт. Отрегулируй помол и время под зерно и оборудование."].join("\n");
}
