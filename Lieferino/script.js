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
   basket[0].name.push(newBasketMealName.innerText);
   basket[0].price.push(newBasketMealPrice.innerText);
   basket[0].totalPrice.push(newBasketMealPrice.innerText);
   basket[0].ammount.push(1);

   renderBasket();
   renderCosts();
}

function renderBasket() {
    document.getElementById('basket').innerHTML = ``;
    
    for (let i = 0; i < basket[0].name.length; i++) {
        let name = basket[0].name[i];
        let price = basket[0].totalPrice[i];
        let ammount =basket[0].ammount[i];
        
        
        document.getElementById('basket').innerHTML +=  /*html*/`
        <div class="ItemInBasket">
            <div id="basketAmmount">${ammount}</div>
            <div class="basketName">${name}</div>
            <div id="basketPrice">${price} Euro</div>
        </div> 
        <div class="changeAmmount">
            <img id="minus${i}" onclick="decreaseAmmount(${i})" src="/Lieferino/icons/minus-solid.svg" alt="Minus">
            <div id="NumberChangeAmmount">${ammount}</div>
            <img id="plus${i}" onclick="increaseAmmount(${i})" src="/Lieferino/icons/plus-solid.svg" alt="Plus">
        </div>
        
             
        `
        ;
        
    }
    
}

function increaseAmmount(i) {
    let ammount =basket[0].ammount[i];
    let newAmmount = ammount+1;
    basket[0].ammount[i] = newAmmount;
    let price = basket[0].price[i];
    let newPrice = (price*newAmmount);
    basket[0].totalPrice[i] = newPrice.toFixed(2);
    renderBasket();
    renderCosts();
}

function decreaseAmmount(i) {
    let ammount =basket[0].ammount[i];
    let newAmmount = ammount-1;
    basket[0].ammount[i] = newAmmount;
    let price = basket[0].price[i];
    let newPrice = (price*newAmmount);
    basket[0].totalPrice[i] = newPrice.toFixed(2);
    if (newAmmount <= 0) {
        basket[0].ammount.splice([i],1);
        basket[0].name.splice([i],1);
        basket[0].price.splice([i],1);
        basket[0].totalPrice.splice([i],1);
        renderBasket();
        document.getElementById('costs').innerHTML = ``;
    } else {
    renderBasket();
    renderCosts();
    }
}

function renderCosts() {
    document.getElementById('costs').innerHTML = ``;

    document.getElementById('costs').innerHTML = /*html*/`
            <div class="subtotal">
                <span>Zwischensumme</span>
                <div id="subtotal Value"> Euro</div>
            </div>
            <div class="deliveyCosts">
                <span>Lieferkosten</span>
                <div id="deliveryCostsValue"> Euro</div>
            </div>
            <div class="totalCosts">
                <span>Gesamtsumme</span>
                <div id="totalCostsValue"> Euro</div>
            </div>`

}


function openBurgermenu(x) {
    x.classList.toggle("change");
}


