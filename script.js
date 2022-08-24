const q = (element) => document.querySelector(element);
const qa = (element) => document.querySelectorAll(element);

pizzaJson.map((item, indice) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true);

    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let modalPizza = q('.pizzaWindowArea');
        modalPizza.style.opacity = '0';
        modalPizza.style.display = 'flex'; 
        setTimeout((param) => {  
            modalPizza.style.opacity = '1';
        }, 200);
    });

    q('.pizza-area').append(pizzaItem);
});