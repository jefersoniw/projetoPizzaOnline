let modalQt = 1
let cart = []
let pizzaModal = 0

const q = element => document.querySelector(element)
const qa = element => document.querySelectorAll(element)

pizzaJson.map((item, indice) => {
  let pizzaItem = q('.models .pizza-item').cloneNode(true)

  pizzaItem.setAttribute('data-key', item.id)
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector(
    '.pizza-item--price'
  ).innerHTML = `R$ ${item.price.toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

  pizzaItem.querySelector('a').addEventListener('click', e => {
    e.preventDefault()
    pizzaModal = parseInt(
      e.target.closest('.pizza-item').getAttribute('data-key')
    )
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

//BOTÕES MAIS MENOS E CLIQUES DOS TAMANHOS
q('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if (modalQt > 1) {
    modalQt--
    q('.pizzaInfo--qt').innerHTML = modalQt
  }
})

q('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQt++
  q('.pizzaInfo--qt').innerHTML = modalQt
})

qa('.pizzaInfo--size').forEach((item, index) => {
  item.addEventListener('click', e => {
    q('.pizzaInfo--size.selected').classList.remove('selected')
    item.classList.add('selected')
  })
})

//ADICIONANDO AO CARRINHO
q('.pizzaInfo--addButton').addEventListener('click', () => {
  let tamanho = parseInt(
    q('.pizzaInfo--size.selected').getAttribute('data-key')
  )

  let indentifier = pizzaModal + '@' + tamanho

  let key = cart.findIndex(item => item.indentifier == indentifier)

  if (key > -1) {
    cart[key].qt += modalQt
  } else {
    cart.push({
      indentifier: indentifier,
      pizza: pizzaModal,
      tamanho: tamanho,
      qt: modalQt
    })
  }

  updateCart()
  closeModal()
})

//ATUALIZANDO CARRINHO E MOSTRANDO NA TELA
const updateCart = () => {
  if (cart.length > 0) {
    q('aside').classList.add('show')
    q('.cart').innerHTML = ''

    for (let i in cart) {
      let pizzaItem = pizzaJson.find(item => item.id == cart[i].pizza)
      let cartItem = q('.models .cart--item').cloneNode(true)

      let pizzaSizeName
      switch (cart[i].tamanho) {
        case 0:
          pizzaSizeName = 'P'
          break
        case 1:
          pizzaSizeName = 'M'
          break
        case 2:
          pizzaSizeName = 'G'
          break
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

      q('.cart').append(cartItem)
    }
  } else {
    q('aside').classList.remove('show')
  }
}
