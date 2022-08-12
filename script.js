const q = (element) => document.querySelector(element);
const qa = (element) => document.querySelectorAll(element);

pizzaJson.map((item, indice) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true);

    q('.pizza-area').append(pizzaItem);
});