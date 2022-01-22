//sticky navbar
window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    navbar.classList.add("header_box_shadow");
  } else {
    navbar.classList.remove("sticky");
    navbar.classList.remove("header_box_shadow");
  }
}

// onclick event for admin & cart icon
let close_btn = document.querySelectorAll(".closebtn");
let admin_icon = document.getElementById("header_admin");
let cart_icon = document.getElementById("cart_icon_div");
let checkout_btn = document.getElementById("checkout_btn");
let view_cart = document.getElementById("view_cart_btn");
let search_icon = document.getElementById("header_search");
let search_box = document.getElementById("search_box");
let close_search = document.getElementById("close_search");
let company_logo = document.getElementById("company_logo");

// let check_status = JSON.parse(localStorage.getItem("check_status"));

// checkout_btn.addEventListener("click", () => {
//   for (let key in check_status) {
//     key == "delivery" ? (check_status[key] = "1") : (check_status[key] = "0");
//   }
//   localStorage.setItem("check_status", JSON.stringify(check_status));
//   window.location.href = "./checkout.html";
// });

// view_cart.addEventListener("click", () => {
//   window.location.href = "./cart.html";
// });

close_btn[0].addEventListener("click", () => {
  document.getElementById("mySidenav_login").style.width = "0";
});

close_btn[1].addEventListener("click", () => {
  document.getElementById("mySidenav_cart").style.width = "0";
  //   window.location.reload();
});

admin_icon.addEventListener("click", () => {
  document.getElementById("mySidenav_login").style.width = "360px";
});

cart_icon.addEventListener("click", () => {
  document.getElementById("mySidenav_cart").style.width = "360px";
});

search_icon.addEventListener("click", () => {
  search_box.style.display = "block";
});

close_search.addEventListener("click", () => {
  search_box.style.display = "none";
});

company_logo.addEventListener("click", () => {
  window.location.href = "https://bellavitaorganic-cloned.herokuapp.com/";
});

// variable declaration

let login = document.getElementById("side_navbar_login");
let login_details = document.getElementById("side_navbar_login_details");
let login_btn = document.getElementById("login_btn");
let logout = document.getElementById("logout_btn");
let create_acc_btn = document.getElementById("create_acc_btn");
let header_cart_qty = document.getElementById("header_cart_qty");
let side_navbar_cart = document.getElementById("side_navbar_cart");
let empty_cart = document.getElementById("side_navbar_empty_cart");
let sidenav_cart_items = document.getElementById("sidenav_cart_items");
let header_all_pro = document.getElementById("header_all_pro");

login.style.display = "block";
// Create Account
create_acc_btn.addEventListener("click", () => {
  window.location.href = "https://bellavitaorganic-cloned.herokuapp.com/signup";
});

// Redirecting to Product Page
header_all_pro.addEventListener("click", () => {
  window.location.href =
    "https://bellavitaorganic-cloned.herokuapp.com/products";
});

// Login Authentification

login_btn.addEventListener("click", () => {
  Login();
});

async function Login() {
  let login_data = {
    email: document.getElementById("email").value,
    password: document.getElementById("pwd").value,
  };

  login_data = JSON.stringify(login_data);

  let login_api = `http://localhost:3333/users/login`;

  //fetch request

  let resposne = await fetch(login_api, {
    method: "POST",

    body: login_data,

    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await resposne.json();
  console.log("data:", data);

  if (data.status === true) {
    console.log(data.details);
    localStorage.setItem("uid", JSON.stringify(data.details.user_id));
    
    alert("Done");
  } else {
    document.getElementById("error_message").style.visibility = "visible";
  }
}
