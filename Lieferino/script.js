function renderMeals() {
        document.getElementById('mealSection').innerHTML = ` `;  
        for (let index = 0; index < food.length; index++) {
            let headline = food[index].headline[0]
            document.getElementById('mealSection').innerHTML += `
            <div id=${headline}>
            <h1>${headline}</h1>
            </div>
            `;
            for (let x = 0; x < food[index].name.length; x++) {          
               let meal = food[index].name[x];
               let description = food[index].description[x];
               let price = food[index].price[x];

             document.getElementById(`${headline}`).innerHTML  += /*html*/`
             <div class="mealDetails">
             
             <div class="mealDetailsText">
             <span class="mealName">${meal}</span>  
             <span class="mealDescription">${description}</span> 
             <span class="mealPrice">${price} Euro</span> <br>
            </div>
            <img id="buttonAddToBasket" src="/Lieferino/icons/cart-plus-solid.svg" alt="">
             </div>
               `;
    
            }

        }
    
    }



function openBurgermenu(x) {
    x.classList.toggle("change");
}
