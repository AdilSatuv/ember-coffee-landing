import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("coffee filtering, pack price and selection work",async({page},info)=>{
 await page.goto("/#coffee");await page.getByRole("button",{name:"Хочу ярче",exact:true}).click();await expect(page.locator("#coffee article")).toHaveCount(1);
 await page.getByRole("button",{name:"1 кг",exact:true}).click();await page.getByRole("button",{name:/Выбрать — 3.*366/}).click();await expect(page.getByText("Солнечная сторона / 1 кг",{exact:true})).toBeVisible();
 await page.screenshot({path:info.outputPath("coffee-selection.png"),animations:"disabled"});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test("brew method updates recipe and form gives honest feedback",async({page})=>{await page.goto("/#brew");await page.getByRole("button",{name:"Френч-пресс",exact:true}).click();await expect(page.getByText("320 мл",{exact:true})).toBeVisible();await page.getByLabel("Электронная почта",{exact:true}).fill("reader@example.com");await page.getByRole("button",{name:"Проверить демонстрационную подписку",exact:true}).click();await expect(page.locator("#club-status")).toContainText("адрес не сохранён");});
test("page is readable and accessible with reduced motion",async({page},info)=>{await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/");await expect(page.getByRole("heading",{level:1})).toBeVisible();await page.screenshot({path:info.outputPath("home.png"),animations:"disabled"});const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();expect(result.violations.filter(v=>["serious","critical"].includes(v.impact))).toEqual([]);});

test("recipe scales with cup count and downloads locally",async({page})=>{
 await page.goto('/#brew');
 await page.getByLabel('Количество чашек',{exact:true}).selectOption('3');
 await expect(page.getByText('54 г',{exact:true})).toBeVisible();
 await expect(page.getByText('900 мл',{exact:true})).toBeVisible();
 const pending=page.waitForEvent('download');
 await page.getByRole('button',{name:'Скачать рецепт ↓',exact:true}).click();
 expect((await pending).suggestedFilename()).toBe('ember-brew-recipe.txt');
 await page.getByRole('button',{name:'Эспрессо',exact:true}).click();
 await expect(page.getByLabel('Количество чашек',{exact:true})).toBeDisabled();
 await expect(page.getByText('18 г',{exact:true})).toBeVisible();
});

test("missing page offers a useful route back",async({page})=>{const response=await page.goto('/this-page-does-not-exist/');expect(response.status()).toBe(404);await expect(page.getByText('404 / СТРАНИЦА НЕ НАЙДЕНА',{exact:true})).toBeVisible();await expect(page.getByRole('navigation',{name:'Вернуться на сайт',exact:true})).toBeVisible();});

test("taste finder explains its choice and lot details are available",async({page},info)=>{await page.goto('/#taste');await page.getByRole('button',{name:'Подобрать мой кофе',exact:true}).click();await expect(page.getByText(/Ответь на все три вопроса/)).toBeVisible();await page.getByRole('radio',{name:'Воронка / фильтр',exact:true}).check();await page.getByRole('radio',{name:'Чёрным',exact:true}).check();await page.getByRole('radio',{name:'Фрукты и цветы',exact:true}).check();await page.getByRole('button',{name:'Подобрать мой кофе',exact:true}).click();const result=page.getByRole('region',{name:'Рекомендация кофе',exact:true});await expect(result).toContainText('Солнечная сторона');await expect(result).toContainText('Воронка');await result.screenshot({path:info.outputPath('taste-finder.png')});await page.getByText('Подробнее о лоте «Солнечная сторона»',{exact:false}).click();await expect(page.getByText('Светлая / фильтр',{exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();const audit=await new AxeBuilder({page}).include('#taste').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();expect(audit.violations.filter(v=>['serious','critical'].includes(v.impact))).toEqual([]);});
