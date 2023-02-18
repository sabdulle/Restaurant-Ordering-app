import {menuArray} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menueItems = document.getElementById('menue-items')
const orders = document.getElementById('order')
const btn = document.getElementsByClassName('btn')
const orderBtn = document.getElementById('order-food')
const payBtn = document.getElementById('pay-btn')
const payment = document.getElementById('payment')
const orderSection = document.getElementById('order-section')
const orderSent = document.getElementById('order-sent')
const name = document.getElementById('name')
const totalBill = document.getElementById('total-bill')

document.addEventListener('click', function(e) {
  if (e.target.id) {
    orderItem(e.target.id);
      orderSection.classList.add("show");
     calculateBill()
  }
 
});

function calculateBill(){
    
    let total = 0;
    const billPrices = document.querySelectorAll('h4.total-bill');

    billPrices.forEach(function(price) {
      const priceText = price.innerText;
      const digitsOnly = priceText.replace(/\D/g, ''); // extract digits only
      const priceNum = parseInt(digitsOnly); // parse as integer
      if (!isNaN(priceNum)) {
        total += priceNum;
      }
    });
  
    const totalBill = document.getElementById('total-bill')
     totalBill.innerText = `$${total}`
}

if (orderBtn) {
  orderBtn.addEventListener('click', function() {
    payment.classList.toggle("show");
  });
  
}

 

if (payBtn){
  payBtn.addEventListener('click', function(e) {
      orderSent.classList.toggle("show");
        payment.classList.toggle("show");
        orderSection.setAttribute("id", "hide");
        orderBtn.classList.add('hide')
        orderSent.innerHTML = `
    <h2>Thanks ${name.value}! Your order is on the way!</h2>
    `
      e.preventDefault();      
  });
}

function orderItem(menuId){

let orderedItem = menuArray.filter(function(item){
  return item.id === parseInt(menuId, 10);
});

let order = '';
  
  orderedItem.forEach(function(item){
    order = `
      <div class="bill">
        <div class="bill-name">
          <h3>${item.name}</h3>
          <h6 class="removeBtn" data-index="${uuidv4()}">remove</h6>
        </div>
        <h4 class="total-bill">$ ${item.price} </h4>
      </div>
    `
  });

  orders.innerHTML += order;

  const removeBtns = document.querySelectorAll(".removeBtn");
 
  removeBtns.forEach(function(btn) {
    
    btn.addEventListener("click", function() {
      //const index = this.getAttribute("data-index"); 
      btn.parentElement.parentElement.remove() 
      calculateBill()
    });
  });

}

function renderOrder(menuId) {
   let orderedItem = menuArray.filter(function(item){
    return item.id === parseInt(menuId, 10);
  });
  let order = "";
  orderedItem.forEach(function(item){
    order += `
      <div class="bill">
        <div class="bill-name">
          <h3>${item.name}</h3>
          <h6 class="removeBtn" data-index="${uuidv4()}">remove</h6>
        </div>
        <h4>$ ${item.price} </h4>
      </div>
    `
  });
  orders.innerHTML = order;
}


function menueItem(){
    let  renderMenueItems = ''
    
     menuArray.forEach(function(item){
       renderMenueItems += `
        <div class= "menue-item">
            <div class="img">${item.emoji}</div>
            <div class="menu-info">
                <h3>${item.name} </h3>
                <h6>${item.ingredients} </h6>
                <h4>$ ${item.price} </h4>
            </div>
            <i id ="${item.id}" class="btn fa-thin fa-plus"></i>
        </div>
        
        `
    })

    return renderMenueItems;
}

function render(){
    menueItems.innerHTML = menueItem()
    
}

render()
