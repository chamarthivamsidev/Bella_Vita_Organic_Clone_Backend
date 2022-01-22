// checkout button -On click switch to checkout page
let go_to_checkout = document.getElementById("go_to_checkout");
go_to_checkout.addEventListener("click", () => {
    let obj = {
        cart: 0,
        delivery: 1,
        cod: 0,
        payment: 0,
    };
    localStorage.setItem("check_status", JSON.stringify(obj));
    window.location.href = "https://bellavitaorganic-cloned.herokuapp.com/checkout";
});

module.exports=localStorage.getItem("uid") 