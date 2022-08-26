let modalQt = 1

const q = element => document.querySelector(element)
const qa = element => document.querySelectorAll(element)

pizzaJson.map((item, indice) => {
  let pizzaItem = q('.models .pizza-item').cloneNode(true)

  pizzaItem.setAttribute('data-key', indice)
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector(
    '.pizza-item--price'
  ).innerHTML = `R$ ${item.price.toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

  pizzaItem.querySelector('a').addEventListener('click', e => {
    e.preventDefault()

    modalQt = 1

    q('.pizzaBig img').src = item.img
    q('.pizzaInfo h1').innerHTML = item.name
    q('.pizzaInfo--desc').innerHTML = item.description

    q('.pizzaInfo--size.selected').classList.remove('selected')
    qa('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add('selected')
      }

      size.querySelector('span').innerHTML = item.sizes[sizeIndex]
    })

    q('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`

    q('.pizzaInfo--qt').innerHTML = modalQt

    let modalPizza = q('.pizzaWindowArea')
    modalPizza.style.opacity = '0'
    modalPizza.style.display = 'flex'
    setTimeout(param => {
      modalPizza.style.opacity = '1'
    }, 200)
  })

  q('.pizza-area').append(pizzaItem)
})

//EVENTOS DO MODAL
const closeModal = () => {
  q('.pizzaWindowArea').style.opacity = '0'
  setTimeout(i => {
    q('.pizzaWindowArea').style.display = 'none'
  }, 500)
}

qa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(item => {
  item.addEventListener('click', closeModal)
})
