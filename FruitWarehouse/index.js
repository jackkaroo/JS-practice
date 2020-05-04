/*
 * Update title
 * Add new fruit
 */

const fruits=[
  {id:1, title:'Apple', price:20, kg:1.2, img:'https://m.dom-eda.com/uploads/images/catalog/item/86df51de21/c25c94fe96_1000.jpg'},
  {id:2, title:'Phisalis', price:40, kg: 3, img:'https://m.dom-eda.com/uploads/images/catalog/item/9e44b0f42a/c91ce9ec36_1000.jpg'},
  {id:3, title:'Mango', price:80, kg:8, img:'https://m.dom-eda.com/uploads/topics/preview/00/00/03/15/25b9d340f9_1000.jpg'},
  {id:2, title:'Banana', price:60, kg:1, img:'https://m.dom-eda.com/uploads/images/catalog/item/7e6fd19d46/0c87fefc9a_1000.jpg'},
  {id:3, title:'Strawberry', price:180, kg:10, img:'https://m.dom-eda.com/uploads/images/catalog/item/deac340ab0/e99157e58f_1000.jpg'},
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" src=${fruit.img}>
             <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <div class="card-btn">
                  <div class="card__btn__addKg">
                      <h5 class="fruit__kg">${fruit.kg}kg</h5>
                      <button class="btn fa fa-plus"></button>
                  </div>
                  <div class="card__btn__price__delete">
                      <a href="#" class="btn btn-outline-info price">Price</a>
                      <a href="#" class="btn btn-outline-danger delete">Delete</a>
                  </div>
                </div>
             </div>
        </div>
    </div>  
    
    `

function render() {
  clearDom()
  const html = fruits.map(fruit => toHTML(fruit)).join('')
  document.querySelector('#fruit__container__row').innerHTML = html
  for(let i=fruits.length-1; i>=0;i--) {
    document.getElementsByClassName("price")[i].onclick = function () {
      getItemPrice(fruits[i])
    };
    document.getElementsByClassName("delete")[i].onclick = function () {
      deleteItem(fruits[i])
    };
    document.getElementsByClassName("fa fa-plus")[i].onclick = function () {
      changeFruitWeight(fruits[i])
    };
  }
  document.getElementsByClassName("fruit__container_header_bth__add__fruit")[0].onclick = function () {
    addNewItem()
  };
}

render()

function clearDom(){
  document.querySelector('#fruit__container__row').innerHTML = ''
}

function getItemPrice(item){
  const modal = createPriceModal(item)
  modal.open()
}

function createPriceModal(item) {
  const modal = $.modal({
    title: `${item.title}`,
    closeable: true,
    content: `<p>Price of this fruit is ${item.price} uah.</p>`,
    footerButtons: [{text: 'Ok', type: 'primary', handler() {modal.close()}}]
  })
  return modal
}

function deleteItem(item){
  const modal = createDeleteModal(item)
  modal.open()
}

function createDeleteModal(item) {
  const modal = $.modal({
    title: `${item.title}`,
    closeable: true,
    content: `<p>Are you sure you want to delete ${item.title}?</p>`,
    footerButtons: [
      {text: 'Delete', type: 'primary', handler() {
          deleteItemFromDom(item)
          modal.close()
        }},
      {text: 'Cancel', type: 'danger', handler() {modal.close()}},
    ]
  })
  return modal
}

function deleteItemFromDom(item){
  let index = fruits.indexOf(item)
  fruits.splice(index, 1);
  render()
}

function addNewItem(){
  const modal = createAddItemModal()
  modal.open()

}

function createAddItemModal(){
  const modal = $.modal({
    title: 'Add new fruit',
    closeable: true,
    content: `<form name="form_add_item">
        <p><p>Enter fruit title:</p> <input type="text"  id="new_fruit_title"></p>
        <p><p>Enter fruit price:</p> <input type="number"  id="new_fruit_price"></p>
        <p><p>Enter fruit kg:</p> <input type="number"  id="new_fruit_kg"></p>
        <p><p>Enter fruit img link:</p> <input type="text"  id="new_fruit_img"></p>
`,
    footerButtons: [
      {text: 'Add', type: 'primary', handler() {
          let newFruitTitle = document.getElementById("new_fruit_title").value
          let newFruitPrice = document.getElementById("new_fruit_price").value
          let newFruitKg = document.getElementById("new_fruit_kg").value
          let newFruitImg = document.getElementById("new_fruit_img").value
          if(!(newFruitTitle===''||newFruitPrice===NaN)) {
            addNewItemToArray(newFruitTitle, newFruitPrice,newFruitKg, newFruitImg)
            modal.close()
            modal.destroy()
          }
        }
      },
      {text: 'Cancel', type: 'danger', handler() {modal.close()}},
    ]
  })
  return modal
}

function addNewItemToArray(newFruitTitle,newFruitPrice,newFruitKg,newFruitImg){
  let exist = true
  for(let i=0;i<fruits.length;i++) {
    if (fruits[i].title.toLowerCase() === newFruitTitle.toLowerCase()) {
      exist = false
      fruits[i].price = newFruitPrice || fruits[i].price
      fruits[i].kg = newFruitKg || fruits[i].kg
      fruits[i].img = newFruitImg || fruits[i].img
      render()
    }
  }
  if(exist) {
    let lastId = fruits[fruits.length - 1].id
    const newFruit = {
      id: lastId + 1,
      title: `${newFruitTitle}`,
      price: parseFloat(newFruitPrice),
      kg: parseFloat(newFruitKg) || 1,
      img: `${newFruitImg || 'https://m.dom-eda.com/uploads/images/catalog/item/86df51de21/c25c94fe96_1000.jpg'}`
    }
    fruits.push(newFruit)
    render()
  }
}

function changeFruitWeight(item) {
  const modal = $.modal({
    title: 'Update weight',
    closeable: true,
    content: ` <p><p>Enter fruit kg:</p> <input type="number"  id="new_fruit_kg"></p>`,
    footerButtons: [
      {text: 'Add', type: 'primary', handler() {
          let newFruitKg = document.getElementById("new_fruit_kg").value
          item.kg=newFruitKg
          modal.close()
          render()
        }},
      {text: 'Cancel', type: 'danger', handler() {modal.close()}},
    ]
  })
  modal.open()
}

