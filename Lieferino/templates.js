function generateMealSectionHTML(headlineMealBox) {
    return /*html*/ `
              <div  id=${headlineMealBox}>
                  <h1 class="margin">${headlineMealBox}</h1>
              </div>
              `
}

function generateMealDetailsHTML(index, x, meal, description, price) {
    return /*html*/`
<div onclick="addToBasket(${index}, ${x})" class="mealDetails">
   <div  class="mealDetailsText">
       <span id="mealName${index}${x}" class="mealName">${meal}</span>  
       <span class="mealDescription">${description}</span> 
       <div class="price">
            <div id="mealPrice${index}${x}" class="mealPrice">${price.replace(".", ",")}</div> 
            <span> Euro</span>
       </div>
   </div>
   <img id="buttonAddToBasket" src="/Lieferino/icons/cart-plus-solid.svg" alt="">
</div>
  `
}

function emptyBasketHTML() {
    return /*html*/ `
    <div class="emptyBasket">
        <img src="/Lieferino/icons/basket-shopping-solid.svg" alt="">
        <span>Dein Warenkorb ist noch leer. Füge Gerichte aus der Karte hinzu um zu bestellen.</span>
    </div>`
}

function basketItemHTML(ammount, name, price, i,) {
    return /*html*/`
    <div class="ItemInBasket">
        <div id="basketAmmount">${ammount}</div>
        <div class="basketName">${name}</div>
        <div id="basketPrice">${price.toFixed(2).replace(".", ",")} Euro</div>
    </div> 
    <div class="edit">
        <img onclick="deleteItem(${i})" class="trash" src="/Lieferino/icons/trash-solid.svg" alt="">
        <div class="changeAmmount">
            <button id="minus${i}" onclick="decreaseAmmount(${i})" >
                <img  src="/Lieferino/icons/minus-solid.svg" alt="Minus">
            </button>
            <div id="NumberChangeAmmount">${ammount}</div>
            <button id="plus${i}" onclick="increaseAmmount(${i})">
                <img src="/Lieferino/icons/plus-solid.svg" alt="Plus">
            </button>
        </div>  
    </div>       
    `
}

function costsHTML(subTotal, deliverCosts, totalCosts) {
    return /*html*/`
    <div class="subtotal">
        <span>Zwischensumme</span>
        <div id="subtotalValue">${subTotal.toFixed(2).replace(".", ",")} Euro</div>
    </div>
    <div class="deliveyCosts">
        <span>Lieferkosten</span>
        <div id="deliveryCostsValue">${deliverCosts.toFixed(2).replace(".", ",")} Euro</div>
    </div>
    <div class="totalCosts">
        <span>Gesamtsumme</span>
        <div id="totalCostsValue">${totalCosts.toFixed(2).replace(".", ",")} Euro</div>
    </div>
   `
}

function orderButtonHTML() {
    return /*html*/`
    <div onclick="placeOrder()" class="orderButton">
           <img src="/Lieferino/icons/bitcoin.svg" alt="Bitcoin">
           <span>Bestellen</span>
           <img src="/Lieferino/icons/credit-card-regular.svg" alt="">
       </div>
   `;
}

function minimumOrderValueHTML() {
    return /*html*/`
    <div class="minimumOrderValue">
           <img src="/Lieferino/icons/basket-shopping-solid.svg" alt="">
           <span>Du hast den Mindestbestellwert von 12,00 Euro noch nicht erreicht. Bitte lege weitere Artikel in deinen Warenkorb um zu bestellen</span>          
       </div>
    `;
}

function orderDialogHTML() {
    return /*html*/ ` 
    <div onclick="closeDialog()" class="dialogBackgroundDesktop">
        <div class="dialog">
            <h1>! ! Hurra ! !</h1>
            <span>Deine Testbestellung wurde erfolgreich "übertragen", wird aber nie bei dir ankommen.</span>
        </div>
        </div>
    </div>
    `
}

function crtiticalValueDialogHTML() {
    return /*html*/ `
    <div onclick="closeDialog()" class="dialogBackgroundDesktop">
        <div class="dialog">
            <h1>Kritische Bestellmenge</h1>
            <span>
                Lieferino kann nicht sicherstellen, dass deine Bestellung angenommen wird! <br> 
                Bitte kontaktiere das Restaurant! <br> <br> 
                Bestellmenge kann nicht weiter erhöht werden.
            </span>
        </div>
        </div>
    </div>
    `
}

function mobileEmptyBasketHTML() {
    return /*html*/ `
    <div class="dialogBackground">
        <div class="orderDialog">
            <div class="emptyBasket">
                <span class="closeButton" onclick="closeDialog(), enableScroll()">Warenkorb schließen</span>
                <img src="/Lieferino/icons/basket-shopping-solid.svg" alt="">
                <span>Dein Warenkorb ist noch leer. Füge Gerichte aus der Karte hinzu um zu bestellen.</span>
            </div>
            <div id="costsMobile">
            </div>
        </div>
    </div>
    `
}

function mobileOrderButtonHTML() {
    return /*html*/`
    <div onclick="placeOrder()" class="orderButton">
           <img src="/Lieferino/icons/bitcoin.svg" alt="Bitcoin">
           <span>Bestellen</span>
           <img src="/Lieferino/icons/credit-card-regular.svg" alt="">
       </div>
   `;
}

function mobileBasketItemHTML(ammount, name, price, i,) {
    return /*html*/`
    <div class="ItemInBasket">
        <div id="basketAmmount">${ammount}</div>
        <div class="basketName">${name}</div>
        <div id="basketPrice">${price.toFixed(2).replace(".", ",")} Euro</div>
    </div> 
    <div class="edit">
        <img onclick="deleteItem(${i})" class="trash" src="/Lieferino/icons/trash-solid.svg" alt="">
        <div class="changeAmmount">
            <button id="minus${i}" onclick="decreaseAmmount(${i})" >
                <img  src="/Lieferino/icons/minus-solid.svg" alt="Minus">
            </button>
            <div id="NumberChangeAmmount">${ammount}</div>
            <button id="mobileplus${i}" onclick="increaseAmmount(${i})">
                <img src="/Lieferino/icons/plus-solid.svg" alt="Plus">
            </button>
        </div>  
    </div>      
    `
}

function createMobileContainerHTML() {
    return /*html*/ `
    <div class="dialogBackground">
        <div class="orderDialog">
            <div id="closeMobileBasket">
                <span class="closeButton" onclick="closeDialog(), enableScroll()">Warenkorb schließen</span>
                <h2>Warenkorb</h2>
                <div class="deliverOrTakeAway">
                    <div class="deliver">
                        <img src="/Lieferino/icons/bicycle-solid.svg" alt="Fahrrad">
                        <div class="deliverText">
                            <span><b>Lieferung</b></span>
                            <span>30-45 Minuten</span>
                        </div>
                    </div>
                    <div class="takeAway">
                        <img src="/Lieferino/icons/people-carry-box-solid.svg" alt="Abholung">
                        <div class="takeAwayText">
                            <span><b>Abholung</b></span>
                            <span>Nicht möglich</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="basketMobil">

            </div>
            <div id="costsMobile">

            </div>
        </div> 
    </div>  
    `
}
