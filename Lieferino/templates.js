function generateMealSectionHTML(headlineMealBox) {
    return /*html*/ `
              <div id=${headlineMealBox}>
                  <h1>${headlineMealBox}</h1>
              </div>
              `
}

function generateMealDetailsHTML (meal, description, price) {
return /*html*/`
<div class="mealDetails">
   <div class="mealDetailsText">
       <span class="mealName">${meal}</span>  
       <span class="mealDescription">${description}</span> 
       <span class="mealPrice">${price} Euro</span> <br>
   </div>
   <img id="buttonAddToBasket" src="/Lieferino/icons/cart-plus-solid.svg" alt="">
</div>
  `
}