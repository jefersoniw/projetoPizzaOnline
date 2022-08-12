const q = (element) => document.querySelector(element);
const qa = (element) => document.querySelectorAll(element);

pizzaJson.map((item, indice) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true);

    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    q('.pizza-area').append(pizzaItem);
});