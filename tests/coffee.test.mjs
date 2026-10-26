import test from "node:test";
import assert from "node:assert/strict";
import { coffees, coffeePrice, recipes } from "../content/coffee.js";
test("coffee pack prices preserve the bulk discount",()=>{for(const coffee of coffees){assert.equal(coffeePrice(coffee.id,250),coffee.price);assert.ok(coffeePrice(coffee.id,1000)<4*coffee.price);assert.ok(coffeePrice(coffee.id,1000)>coffee.price);}});
test("unsupported products and packs are rejected",()=>{assert.throws(()=>coffeePrice("missing",250),RangeError);assert.throws(()=>coffeePrice("brasil",500),RangeError);});
test("each recipe includes practical preparation instructions",()=>{for(const recipe of Object.values(recipes)){assert.equal(recipe.steps.length,3);assert.ok(recipe.dose&&recipe.water&&recipe.time&&recipe.grind);}});
