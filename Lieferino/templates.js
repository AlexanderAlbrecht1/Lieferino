function generateMealSectionHTML(headlineMealBox) {
    return /*html*/ `
              <div id=${headlineMealBox}>
                  <h1>${headlineMealBox}</h1>
              </div>
              `
}

function generateMealDetailsHTML (index,x,meal, description, price) {
return /*html*/`
<div onclick="addToBasket(${index}, ${x})" class="mealDetails">
   <div  class="mealDetailsText">
       <span id="mealName${index}${x}" class="mealName">${meal}</span>  
       <span class="mealDescription">${description}</span> 
       <div class="price">
       <div id="mealPrice${index}${x}" class="mealPrice">${price.replace(".",",")}</div> <span> Euro</span>
       </div>
   </div>
   <img id="buttonAddToBasket" src="/Lieferino/icons/cart-plus-solid.svg" alt="">
</div>
  `
}