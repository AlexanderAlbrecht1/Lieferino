function renderMeals() {
    document.getElementById('mealSection').innerHTML = ` `;
    for (let index = 0; index < food.length; index++) {
        let headlineMealBox = food[index].headline[0]
        document.getElementById('mealSection').innerHTML += generateMealSectionHTML(headlineMealBox);
        for (let x = 0; x < food[index].name.length; x++) {
            let meal = food[index].name[x];
            let description = food[index].description[x];
            let price = food[index].price[x];
            document.getElementById(`${headlineMealBox}`).innerHTML += generateMealDetailsHTML (index,x,meal, description, price.toFixed(2));
        }
    }
}

function addToBasket(index,x) {
    let newBasketMealName = document.getElementById(`mealName${index}${x}`);
    let newBasketMealPrice = document.getElementById(`mealPrice${index}${x}`);
    
    console.log(newBasketMealName.innerText);
    console.log(newBasketMealPrice.innerText);
    
   basket[0].name.push(newBasketMealName.innerText);
   basket[0].price.push(newBasketMealPrice.innerText);
}


function openBurgermenu(x) {
    x.classList.toggle("change");
}


