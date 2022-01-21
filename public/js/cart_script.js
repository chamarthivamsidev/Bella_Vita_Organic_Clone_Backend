// function removeProduct(documentId) {
//   fetch(`https://bellavitaorganic-cloned.herokuapp.com/cart/${documentId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((res) => {
//       window.location.href = `https://bellavitaorganic-cloned.herokuapp.com/cart/${res.item.shopping_bag_id}`;
//     })
//     .catch((err) => {
//       console.log("err:", err);
//     });
// }

let pro=document.querySelector("#countinue-shopping-ahref");
pro.addEventListener("click", function() {
  window.location.href = "./product.html"
})


let cartData = JSON.parse(localStorage.getItem("cart_items")) || [];
// console.log(cartData);
showCartItems(cartData);

//For display cart item
function showCartItems(data) {
  let cartItemDiv = document.getElementsByClassName("cart-item")[0];
  cartItemDiv.innerHTML = null;

  data.map(function (item, index) {
    // Create the card, give it its class and innerHTML
    const card = document.createElement("div");
    card.className = "card";

    let a=document.createElement("div")
    a.className = "item-card"

    let img=document.createElement("img")
    img.src=item.Img_url
    img.addEventListener("click", function () {
      localStorage.setItem("brod_view", JSON.stringify(item));
      window.location.href = "./prodView.html";
    });

    let b=document.createElement("div")
    b.className="item-text"
    
    let c=document.createElement("div")
    c.className="head-item-name"
    c.addEventListener("click", function () {
      localStorage.setItem("brod_view", JSON.stringify(item));
      window.location.href = "./prodView.html";
    });

    let d=document.createElement("p")
    d.className="item-name"
    d.innerText=item.Name;

    c.append(d);

    let e=document.createElement("h4");
    e.className="item-price"
    e.innerText="Rs."+ item.Price;

    let f=document.createElement("div");
    f.className="qty-div"

    let g=document.createElement("p");
    g.innerText="Quantity:"
    f.appendChild(g);

    b.append(c, e, f);
    a.append(img, b)
    
    // Created the button, give its classes and innerHTML
    const ext = document.createElement("div");
    ext.id = "external-part";

    const btn = document.createElement("div");
    btn.className = "ui qty-box";

    //decrementing qty
    let dec = document.createElement("button");
    dec.id = "dec";
    dec.innerText = "-";
    dec.addEventListener("click", () => {
      let currQty = item.Qty;
      currQty--;
      item.Qty = currQty;
      qty.value = currQty;
      window.location.reload();
      localStorage.setItem("cart_items", JSON.stringify(data));
      if (qty.value == 0) {
        // if Item qty is Zero then remove from cart
        removeItem(index);
      }
    });

    //qty input box
    let qty = document.createElement("input");
    qty.type = "number";
    qty.id = "qty";
    qty.value = item.Qty;

    //incrementing qty
    let inc = document.createElement("button");
    inc.id = "inc";
    inc.innerText = "+";
    inc.addEventListener("click", () => {
      let currQty = item.Qty;
      currQty++;
      item.Qty = currQty;
      qty.value = currQty;
      window.location.reload();
      localStorage.setItem("cart_items", JSON.stringify(data));
    });

    //remove from cart
    let remove_div = document.createElement("div");
    remove_div.classList = "remove";
    let remo = document.createElement("button");
    remo.innerHTML = `<button type="button" class="btn-close" disabled aria-label="Close"></button>
    <span>Remove</span>
    `;
    remo.classList = "left";
    //Adding function to remove item when click on remove button
    remo.addEventListener("click", () => {
      removeItem(index);
    });

    remove_div.appendChild(remo);

    btn.append(dec, qty, inc);

    // ext.appendChild(btn, remove_div)
    ext.append(btn, remove_div);
    // Append the button to the created card
    card.append(a,ext);

    // Add the card to the hard coded html div
    cartItemDiv.append(card);
  });
}

// remove item when click on remove cross button
function removeItem(index) {
  cartData.splice(index, 1);
  localStorage.setItem("cart_items", JSON.stringify(cartData));
  window.location.reload();
  // before aadding updated cart list, remove previous data from html
  cartItemDiv.innerHTML = null;
  showCartItems(cartData);
}

//cart Item Total value:
cart_total_value(cartData);
function cart_total_value(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    let pri = +data[i].Price;
    let q = +data[i].Qty;
    sum += pri * q;
  }
  document.getElementById("cartValue").innerText = "Rs. " + sum;
  localStorage.setItem("bella_cartValue", sum);
}

// checkout button -On click switch to checkout page
let go_to_checkou = document.getElementById("go_to_checkout");
go_to_checkout.addEventListener("click", () => {
  let obj = {
    cart: 0,
    delivery: 1,
    cod: 0,
    payment: 0,
  };
  localStorage.setItem("check_status", JSON.stringify(obj));
  window.location.href = "./checkout.html";
});

// bottom slideshow

import {
  sticky_view,
  getStars,
  slider,
  whatsappChat,
} from "./utility.js";

// importing data.js file for product data
import { bestsellerList } from "./data.js";

// sticky bellacash and whatapp icon display
let st = document.getElementsByClassName("sticky-view")[0];
st.innerHTML = sticky_view();
whatsappChat();

// displaying slider items
const sdata = JSON.parse(bestsellerList());
slider(sdata, 0, cartData, cart_total_value, showCartItems); //hare 0 is passing as arguments for class index where i want to inject html
