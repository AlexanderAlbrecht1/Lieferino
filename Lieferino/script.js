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
        increaseAmmountMobile(y);
    }
    renderBasket()
    saveBasket();
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
        showMobileBasket();
        document.getElementById(`plus${i}`).disabled = true;
        document.getElementById(`mobileplus${i}`).disabled = true;
        criticalValueDialog();
        saveBasket();
    } else {
        calculateNewBasketValuePlus(newAmmount, i);
        renderBasket();
        showMobileBasket();
        saveBasket();
    }
}

function increaseAmmountMobile(i) {
    let ammount = parseFloat(basket[0].ammount[i]);
    let newAmmount = ammount + 1;
    basket[0].ammount[i] = newAmmount;
    if (newAmmount >= 20) {
        calculateNewBasketValuePlus(newAmmount, i);
        renderBasket();
        showMobileBasket();
        document.getElementById(`plus${i}`).disabled = true;
        document.getElementById(`mobileplus${i}`).disabled = true;
        criticalValueDialog();
        saveBasket();
    } else {
        calculateNewBasketValuePlus(newAmmount, i);
        renderBasket();
        saveBasket();
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
        saveBasket();
    } else {
        renderBasket();
        showMobileBasket();
        saveBasket();
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
    placeOrderDialog();
    saveBasket();
}

function deleteItem(i) {
    basket[0].ammount.splice([i], 1);
    basket[0].name.splice([i], 1);
    basket[0].price.splice([i], 1);
    basket[0].totalPrice.splice([i], 1);
    renderBasket();
    showMobileBasket();
    saveBasket();
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

function placeOrderDialog() {
    document.getElementById('alertArea').innerHTML = ``;
    document.getElementById('alertArea').innerHTML = orderDialogHTML();
}

function criticalValueDialog() {
    document.getElementById('alertArea').innerHTML = ``;
    document.getElementById('alertArea').innerHTML = crtiticalValueDialogHTML();
}

function closeDialog() {
    document.getElementById('dialogArea').innerHTML = ``;
    document.getElementById('alertArea').innerHTML = ``;
}

function showMobileBasket() {
    disableScroll()
    document.getElementById('dialogArea').innerHTML = ``;
    document.getElementById('dialogArea').innerHTML = createMobileContainerHTML();
    document.getElementById('basketMobil').innerHTML = ``;
    if (basket[0].ammount.length == 0) {
        document.getElementById('basketMobil').innerHTML = mobileEmptyBasketHTML();
    } else {
        for (let i = 0; i < basket[0].name.length; i++) {
            let name = basket[0].name[i];
            let price = parseFloat(basket[0].totalPrice[i]);
            let ammount = basket[0].ammount[i];
            document.getElementById('basketMobil').innerHTML += mobileBasketItemHTML(ammount, name, price, i,);
        }
    }
    showAmmountOfItems();
    renderCostsMobile();
}

function renderCostsMobile() {
    document.getElementById('costsMobile').innerHTML = ``;
    if (basket[0].ammount.length == 0) {
        document.getElementById('costsMobile').innerHTML = ``;
    } else {
        let subTotal = 0;
        for (let i = 0; i < basket[0].totalPrice.length; i++) {
            subTotal += +basket[0].totalPrice[i];
        }
        checkDeliveryCostsMobile(subTotal);
        checkMinimumOrderValueMobile(subTotal);
    }
}

function checkDeliveryCostsMobile(subTotal) {
    if (subTotal >= 50) {
        let deliverCosts = 0.00;
        let totalCosts = +subTotal + +deliverCosts;
        document.getElementById('costsMobile').innerHTML = costsHTML(subTotal, deliverCosts, totalCosts);
    } else {
        let deliverCosts = 4.99;
        let totalCosts = +subTotal + +deliverCosts;
        document.getElementById('costsMobile').innerHTML = costsHTML(subTotal, deliverCosts, totalCosts);
    }
}

function checkMinimumOrderValueMobile(subTotal) {
    if (subTotal >= 12) {
        document.getElementById('costsMobile').innerHTML += mobileOrderButtonHTML();
    } else {
        document.getElementById('costsMobile').innerHTML += minimumOrderValueHTML();
    }
}

function disableScroll() {
    document.getElementById('html').classList.add('overflowHidden');
}

function enableScroll() {
    document.getElementById('html').classList.remove('overflowHidden');
}

function saveBasket() {
    let nameAsText = JSON.stringify(basket[0].name);
    localStorage.setItem('name',nameAsText);
    let priceAsText = JSON.stringify(basket[0].price);
    localStorage.setItem('price', priceAsText);
    let ammountAsText = JSON.stringify(basket[0].ammount);
    localStorage.setItem('ammount', ammountAsText);
    let totalPriceAsText = JSON.stringify(basket[0].totalPrice);
    localStorage.setItem('totalPrice', totalPriceAsText);
}

function loadBasket() {
    let nameAsText = localStorage.getItem('name');
    let priceAsText = localStorage.getItem('price');
    let ammountAsText = localStorage.getItem('ammount');
    let totalPriceAsText = localStorage.getItem('totalPrice');
    if (nameAsText && priceAsText && ammountAsText && totalPriceAsText) {
        basket[0].name = JSON.parse(nameAsText);
        basket[0].price = JSON.parse(priceAsText);
        basket[0].ammount = JSON.parse(ammountAsText);
        basket[0].totalPrice = JSON.parse(totalPriceAsText);
    }
}




