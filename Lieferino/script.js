

function renderMeals() {
    document.getElementById('mealSection').innerHTML = ` `;
    for (let index = 0; index < food.length; index++) {
        let headlineMealBox = food[index].headline[0]
        document.getElementById('mealSection').innerHTML += generateMealSectionHTML(headlineMealBox);
        for (let x = 0; x < food[index].name.length; x++) {
            let meal = food[index].name[x];
            let description = food[index].description[x];
            let price = food[index].price[x];
            document.getElementById(`${headlineMealBox}`).innerHTML += generateMealDetailsHTML(index, x, meal, description, price.toFixed(2));
        }
    }

}

function addToBasket(index, x) {
    let newBasketMealName = document.getElementById(`mealName${index}${x}`);
    let newBasketMealPrice = document.getElementById(`mealPrice${index}${x}`);
    let priceAsNumber = parseFloat(newBasketMealPrice.innerText);
    let trueFalse = basket[0].name.includes(newBasketMealName.innerText);
    if (trueFalse === false) {
        basket[0].name.push(newBasketMealName.innerText);
        basket[0].price.push(priceAsNumber);
        basket[0].totalPrice.push(priceAsNumber);
        basket[0].ammount.push(1);
    } else {
        let y = basket[0].name.indexOf(newBasketMealName.innerText);
        increaseAmmount(y);
    }
    renderBasket();
}

function renderBasket() {
    document.getElementById('basket').innerHTML = ``;
    if (basket[0].ammount.length == 0) {
        document.getElementById('basket').innerHTML = `
        <div class="emptyBasket">
            <img src="/Lieferino/icons/basket-shopping-solid.svg" alt="">
            <span>Dein Warenkorb ist noch leer. Füge Gerichte aus der Karte hinzu um zu bestellen.</span>
        </div>`;
    } else {
        for (let i = 0; i < basket[0].name.length; i++) {
            let name = basket[0].name[i];
            let price = parseFloat(basket[0].totalPrice[i]);
            
            let ammount = basket[0].ammount[i];
            document.getElementById('basket').innerHTML +=  /*html*/`
        <div class="ItemInBasket">
            <div id="basketAmmount">${ammount}</div>
            <div class="basketName">${name}</div>
            <div id="basketPrice">${price.toFixed(2).replace(".",",")} Euro</div>
        </div> 
        <div class="edit">
            <img onclick="deleteItem(${i})" class="trash" src="/Lieferino/icons/trash-solid.svg" alt="">
            <div class="changeAmmount">
                <img id="minus${i}" onclick="decreaseAmmount(${i})" src="/Lieferino/icons/minus-solid.svg" alt="Minus">
                <div id="NumberChangeAmmount">${ammount}</div>
                <img id="plus${i}" onclick="increaseAmmount(${i})" src="/Lieferino/icons/plus-solid.svg" alt="Plus">
            </div>  
        </div>       
        `
                ;
        }
    }
    renderCosts();
}

function increaseAmmount(i) {
    let ammount = parseFloat(basket[0].ammount[i]);
    let newAmmount = ammount + 1;
    basket[0].ammount[i] = newAmmount;
    if (newAmmount === 20) {
        alert("ACHTUNG! Lieferino kann nicht sicherstellen, dass deine Bestellung angenommen wird! Bitte kontaktiere das Restaurant!");
        renderBasket();
    } else {
        let price = parseFloat(basket[0].price[i]);
        let newPrice = (+price * +newAmmount);
        basket[0].totalPrice[i] = parseFloat(newPrice).toFixed(2);
        renderBasket(); 
    }
}

function decreaseAmmount(i) {
    let ammount = basket[0].ammount[i];
    let newAmmount = ammount - 1;
    basket[0].ammount[i] = newAmmount;
    let price = basket[0].price[i];
    let newPrice = (price * newAmmount);
    basket[0].totalPrice[i] = newPrice.toFixed(2);
    if (newAmmount <= 0) {
        deleteItem(i);
    } else {
        renderBasket();
    }
}

function renderCosts() {
    document.getElementById('costs').innerHTML = ``;
    

    if (basket[0].ammount.length == 0) {
        document.getElementById('costs').innerHTML = ``;
    } else {
        let subTotal = 0;
        for (let i = 0; i < basket[0].totalPrice.length; i++) {
            subTotal += +basket[0].totalPrice[i];
        }
        if (subTotal >= 50) {
            let deliverCosts = 0.00;
            let totalCosts = +subTotal + +deliverCosts;

        document.getElementById('costs').innerHTML = /*html*/`
            <div class="subtotal">
                <span>Zwischensumme</span>
                <div id="subtotalValue">${subTotal.toFixed(2).replace(".",",")} Euro</div>
            </div>
            <div class="deliveyCosts">
                <span>Lieferkosten</span>
                <div id="deliveryCostsValue">${deliverCosts.toFixed(2).replace(".",",")} Euro</div>
            </div>
            <div class="totalCosts">
                <span>Gesamtsumme</span>
                <div id="totalCostsValue">${totalCosts.toFixed(2).replace(".",",") } Euro</div>
            </div>
           `
            
        } else {
            let deliverCosts = 4.99;
            let totalCosts = +subTotal + +deliverCosts;

        document.getElementById('costs').innerHTML = /*html*/`
            <div class="subtotal">
                <span>Zwischensumme</span>
                <div id="subtotalValue">${subTotal.toFixed(2).replace(".",",")} Euro</div>
            </div>
            <div class="deliveyCosts">
                <span>Lieferkosten</span>
                <div id="deliveryCostsValue">${deliverCosts.toFixed(2).replace(".",",")} Euro</div>
            </div>
            <div class="totalCosts">
                <span>Gesamtsumme</span>
                <div id="totalCostsValue">${totalCosts.toFixed(2).replace(".",",")} Euro</div>
            </div>
           `
        }

        if (subTotal >= 12) {
            document.getElementById('costs').innerHTML += /*html*/`
             <div onclick="placeOrder()" class="orderButton">
                    <img src="/Lieferino/icons/bitcoin.svg" alt="Bitcoin">
                    <span>Bestellen</span>
                    <img src="/Lieferino/icons/credit-card-regular.svg" alt="">
                </div>
            `;
        } else {
            document.getElementById('costs').innerHTML += /*html*/`
             <div class="minimumOrderValue">
                    <img src="/Lieferino/icons/basket-shopping-solid.svg" alt="">
                    <span>Du hast den Mindestbestellwert von 12,00 EUro noch nicht erreicht. Bitte lege weitere Artikel in deinen Warenkorb um zu bestellen</span>          
                </div>`
        }
    }



}

function placeOrder(i) {
    basket[0].ammount.splice(0, basket[0].ammount.length);
    basket[0].name.splice(0, basket[0].name.length);
    basket[0].price.splice(0, basket[0].price.length);
    basket[0].totalPrice.splice(0, basket[0].totalPrice.length);
    alert("Deine Testbestellung wurde erfolgreich übertragen, wird aber nie bei dir ankommen.");
    renderBasket();

}

function deleteItem(i) {
    basket[0].ammount.splice([i], 1);
    basket[0].name.splice([i], 1);
    basket[0].price.splice([i], 1);
    basket[0].totalPrice.splice([i], 1);
    renderBasket()
}

function checkDeliverCosts(x) {
    if (x >= 50) {
        let deliverCosts = 0.00;
        return deliverCosts;
    } else {
        let deliverCosts = 4.99;
        return deliverCosts;
    }

}

function showHideBasket() {
    document.getElementById('shoppingBasket').classList.toggle('showOverlayBasket');
}





