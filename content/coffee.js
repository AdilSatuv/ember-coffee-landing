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
export function coffeePrice(id, weight) {
  const coffee = coffees.find(item => item.id === id);
  if (!coffee || ![250, 1000].includes(weight)) throw new RangeError("Unknown coffee or weight");
  return weight === 250 ? coffee.price : coffee.price * 3.4;
}
