let sucess = document.getElementById("sucess");
let container = document.getElementById("container");
let home_btn = document.getElementById("home_btn");
let spinner = document.getElementById("spin");
let uid = localStorage.getItem("uid");

home_btn.addEventListener("click", () => {
  window.location.href = "https://bellavitaorganic-cloned.herokuapp.com";
});
document.querySelectorAll(".payment_method").forEach((el) => {
  el.addEventListener("mouseover", () => {
    el.style.backgroundColor = "teal";
    el.style.color = "white";
  });
  el.addEventListener("mouseleave", () => {
    el.style.backgroundColor = "white";
    el.style.color = "black";
  });
});

// setting total amount

getCartProducts(uid);
async function getCartProducts(uid) {
  let res = await fetch(
    `https://bellavitaorganic-cloned.herokuapp.com/cart/api/${uid}`
  );
  data = await res.json();
  // cart_items = data.bag;
  localStorage.setItem("totalprice", JSON.stringify(data.totalval));
  document.getElementById("price").innerHTML = `₹ ${data.totalval}.00`;
}

// form validation

let submit = document.getElementById("card_btn");
submit.addEventListener("click", () => {
  let card_number = document.getElementById("card_number");
  let card_name = document.getElementById("card_name");
  let doe = document.getElementById("doe");
  let cvv = document.getElementById("cvv");

  if (
    card_number.value === "" ||
    card_name.value === "" ||
    doe.value === "" ||
    cvv.value === ""
  ) {
    alert("All the fields are mandatory");
  } else {
    container.style.opacity = "0.2";
    spinner.style.display = "block";
    setTimeout(() => {
      sucess.style.display = "block";
    }, 2000);
    // setTimeout(() => {
    //   alert("Hey Provide Path");
    // }, 5000);
  }
  card_number.value === ""
    ? (card_number.style.borderColor = "red")
    : (card_number.style.borderColor = "rgb(219, 216, 216)");

  card_name.value === ""
    ? (card_name.style.borderColor = "red")
    : (card_name.style.borderColor = "rgb(219, 216, 216)");

  doe.value === ""
    ? (doe.style.borderColor = "red")
    : (doe.style.borderColor = "rgb(219, 216, 216)");

  cvv.value === ""
    ? (cvv.style.borderColor = "red")
    : (cvv.style.borderColor = "rgb(219, 216, 216)");
});
