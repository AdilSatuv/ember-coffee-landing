import test from "node:test";
import assert from "node:assert/strict";
import { recommendCoffee, coffeeProfiles, coffees } from "../content/coffee.js";
test("preferences affect the recommendation and explanations",()=>{
 assert.equal(recommendCoffee({method:"filter",milk:"black",taste:"fruit"}).coffee.id,"ethiopia");
 assert.equal(recommendCoffee({method:"espresso",milk:"milk",taste:"fruit"}).coffee.id,"brasil");
 assert.equal(recommendCoffee({method:"french",milk:"black",taste:"balance"}).coffee.id,"colombia");
 const result=recommendCoffee({method:"espresso",milk:"milk",taste:"chocolate"});
 assert.ok(result.reasons.some(text=>text.includes("молоко")));
 assert.throws(()=>recommendCoffee({method:"",milk:"black",taste:"fruit"}),RangeError);
});
test("all 18 valid answer combinations resolve to a complete known profile",()=>{
 for(const method of ["filter","espresso","french"])for(const milk of ["black","milk"])for(const taste of ["chocolate","fruit","balance"]){const result=recommendCoffee({method,milk,taste});assert.ok(coffees.some(item=>item.id===result.coffee.id));assert.equal(result.reasons.length,4);}
 for(const coffee of coffees){const profile=coffeeProfiles[coffee.id];assert.ok(profile.processing&&profile.roast&&profile.tip);assert.ok(profile.acidity>=1&&profile.acidity<=5);assert.ok(profile.body>=1&&profile.body<=5);}
});
