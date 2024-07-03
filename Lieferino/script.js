let food = {
    "burger": {
        "name": ['Hamburger', 'Cheesburger', 'Kreuzburger'],
        "description": ['Burger belegt mit hausgemachtem Veganem Patty aus Erbsenproteinbasis, Grünsalat, eingelegten Gurken, Tomaten, Zwiebeln und hausgemachter veganer Sauce', 'Wie Hamburger + veganem Gouda und veganem Cheddar', 'Wie Hamburger + vegnem Bacon'],
        "price": [8.50, 9.30, 9.50],
    },
    "SideDishes": {
        "name": ['Pommes A', 'Kroketten B', 'Süßkaroffelpommes C'],
        "price": [2, 3.95, 5.69],
    },
}

function renderMeals() {
    document.getElementById('mealSection').innerHTML = ``;
    for (let index = 0; index < food.length; index++) {
        const element = food[index];
        
    }
}

function openBurgermenu(x) {
    x.classList.toggle("change");
}
