import test from "node:test";
import assert from "node:assert/strict";
import {scaleRecipe,recipeText} from "../content/coffee.js";
test("scaled filter recipe updates the ingredients and instruction volumes",()=>{const recipe=scaleRecipe("filter",3);assert.equal(recipe.dose,"54 г");assert.equal(recipe.water,"900 мл");assert.ok(recipe.steps[1].includes("150 мл"));assert.ok(recipe.steps[2].includes("900 мл"));assert.ok(recipeText("filter",3).includes("Порций: 3"));});
test("espresso basket is not multiplied and unknown portions are rejected",()=>{assert.equal(scaleRecipe("espresso",3).dose,"18 г");assert.equal(scaleRecipe("espresso",3).portions,1);assert.throws(()=>scaleRecipe("filter",0),RangeError);});
