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
    let newBasketMealName = food[index].name[x];
    let newBasketMealPrice = food[index].price[x];
    let trueFalse = basket[0].name.includes(newBasketMealName);
    if (trueFalse === false) {
        pushToBasket(newBasketMealName, newBasketMealPrice);
    } else {
        let y = basket[0].name.indexOf(newBasketMealName);
        increaseAmmount(y);
    }
    renderBasket();
}

function renderBasket() {
    document.getElementById('basket').innerHTML = ``;
    if (basket[0].ammount.length == 0) {
        document.getElementById('basket').innerHTML = emptyBasketHTML();
    } else {
        for (let i = 0; i < basket[0].name.length; i++) {
            let name = basket[0].name[i];
            let price = parseFloat(basket[0].totalPrice[i]);
            let ammount = basket[0].ammount[i];
            document.getElementById('basket').innerHTML += basketItemHTML(ammount, name, price, i,);
        }
    }
    showAmmountOfItems();
    renderCosts();
}

function increaseAmmount(i) {
    let ammount = parseFloat(basket[0].ammount[i]);
    let newAmmount = ammount + 1;
    basket[0].ammount[i] = newAmmount;
    if (newAmmount >= 20) {
        calculateNewBasketValuePlus(newAmmount, i);
        renderBasket();
        document.getElementById(`plus${i}`).disabled = true;
        alert("ACHTUNG! Lieferino kann nicht sicherstellen, dass deine Bestellung angenommen wird! Bitte kontaktiere das Restaurant! Bestellmnege kann nicht weiter erhöht werden.");
    } else {
        calculateNewBasketValuePlus(newAmmount, i);
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
        checkDeliveryCosts(subTotal);
        checkMinimumOrderValue(subTotal);
    }
}

function placeOrder(i) {
    basket[0].ammount.splice(0, basket[0].ammount.length);
    basket[0].name.splice(0, basket[0].name.length);
    basket[0].price.splice(0, basket[0].price.length);
    basket[0].totalPrice.splice(0, basket[0].totalPrice.length);
    renderBasket();
    alert("Deine Testbestellung wurde erfolgreich übertragen, wird aber nie bei dir ankommen.");
}

function deleteItem(i) {
    basket[0].ammount.splice([i], 1);
    basket[0].name.splice([i], 1);
    basket[0].price.splice([i], 1);
    basket[0].totalPrice.splice([i], 1);
    renderBasket()
}

function showHideBasket() {
    document.getElementById('shoppingBasket').classList.toggle('showOverlayBasket');
}

function showAmmountOfItems() {
    let numberItemsInBasket = 0;
    if (basket[0].ammount.length <= 0) {
        document.getElementById('numberItems').innerText = ``;
    } else {
        for (let i = 0; i < basket[0].ammount.length; i++) {
            numberItemsInBasket += +basket[0].ammount[i];
            document.getElementById('numberItems').innerText = `${numberItemsInBasket}`;
        }
    }
}

function calculateNewBasketValuePlus(newAmmount, i) {
    let price = parseFloat(basket[0].price[i]);
    let newPrice = (+price * +newAmmount);
    basket[0].totalPrice[i] = parseFloat(newPrice).toFixed(2);
}

function checkMinimumOrderValue(subTotal) {
    if (subTotal >= 12) {
        document.getElementById('costs').innerHTML += orderButtonHTML();
    } else {
        document.getElementById('costs').innerHTML += minimumOrderValueHTML();
    }
}

function checkDeliveryCosts(subTotal) {
    if (subTotal >= 50) {
        let deliverCosts = 0.00;
        let totalCosts = +subTotal + +deliverCosts;
        document.getElementById('costs').innerHTML = costsHTML(subTotal, deliverCosts, totalCosts);
    } else {
        let deliverCosts = 4.99;
        let totalCosts = +subTotal + +deliverCosts;
        document.getElementById('costs').innerHTML = costsHTML(subTotal, deliverCosts, totalCosts);
    }
}

function pushToBasket(newBasketMealName, newBasketMealPrice) {
    basket[0].name.push(newBasketMealName);
    basket[0].price.push(newBasketMealPrice);
    basket[0].totalPrice.push(newBasketMealPrice);
    basket[0].ammount.push(1);
}




