import products from "./products.js";

const productContainer = document.getElementById("product-container");
const basketNumber = document.getElementById("basketNumber");

let cartItems = JSON.parse(localStorage.getItem("Basket")) || [];

function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const toggleButton = document.getElementById("toggleButton");
    const body = document.body;
    // toggleButton
    toggleButton.addEventListener("click", function () {
      if (body.style.backgroundColor === "lightskyblue") {
        body.style.backgroundColor = "black";
      } else {
        body.style.backgroundColor = "lightskyblue";
      }

      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        if (card.style.backgroundColor === "white") {
          card.style.backgroundColor = "lightgreen";
        } else {
          card.style.backgroundColor = "white";
        }
      });
      const scrollhome = document.getElementById("scroll");

      if (scrollhome.style.color === "black") {
        scrollhome.style.color = "white";
      } else {
        scrollhome.style.color = "black";
      }
    });
    // toggleButton
    const image = document.createElement("img");
    image.classList.add("imageDiv");
    image.src = product.image;
    image.alt = product.name;

    const title = document.createElement("h2");
    title.classList.add("titleH2");
    title.innerText = product.name;

    const description = document.createElement("p");
    description.classList.add("descriptionP");
    description.innerText = product.description;

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");

    const priceOwn = document.createElement("p");
    priceOwn.classList.add("priceOwn");
    priceOwn.innerText = `${product.price}$`;

    const button = document.createElement("button");
    button.classList.add("addCart");
    button.innerText = "Add to Cart";

    button.addEventListener("click", () => {
      addToCart(product.id);
      updateBasketCount();
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "The product has been added to the cart",
        showConfirmButton: false,
        timer: 1500,
      });
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);

    if (product.sale) {
      const discountedPrice = product.price - product.saleAmount;

      const priceSale = document.createElement("p");
      priceSale.classList.add("priceSale");
      priceSale.innerText = `${discountedPrice.toFixed(2)}$`;

      priceContainer.appendChild(priceOwn);
      priceContainer.appendChild(priceSale);
      card.appendChild(priceContainer);

      const saleDiv = document.createElement("div");
      saleDiv.classList.add("saleDiv");
      const saleDivp = document.createElement("h2");
      saleDivp.innerText = "Special Offer";
      saleDivp.classList.add("saleH1");
      saleDiv.appendChild(saleDivp);
      card.appendChild(saleDiv);
      // Ustundeki xett
      const eyriXett = document.createElement("div");
      eyriXett.classList.add("eyriXett");
      card.appendChild(eyriXett);
    } else {
      priceContainer.appendChild(priceOwn);
      card.appendChild(priceContainer);
    }

    card.appendChild(button);
    productContainer.appendChild(card);

    if (!product.sale) {
      priceOwn.style.fontSize = "1.5rem";
      priceOwn.style.marginLeft = "87px";
      priceOwn.style.color = "green";
      priceOwn.style.fontWeight = "600";
    }
  });
}
displayProducts(products);

// Baskete elave etmek
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  cartItems.push(product);
  localStorage.setItem("Basket", JSON.stringify(cartItems));
}

//Basket Number Edit
function updateBasketCount() {
  basketNumber.style.display = "block";
  basketNumber.innerText = cartItems.length;
}
 
// Category
const categories = ["iphone", "samsung", "huawei", "nokia", "asus", "xiaomi"];

categories.forEach((category) => {
  const categoryLi = document.getElementById(category);
  categoryLi.addEventListener("click", () => {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    displayProducts(filteredProducts);

    categories.forEach((aaa) => {
      if (aaa !== category) {
        const aaaLi = document.getElementById(aaa);
        aaaLi.classList.remove("active");
      }
    });
    categoryLi.classList.add("active");
  });
});

const allphoneLi = document.getElementById("allphones");

allphoneLi.addEventListener("click", () => {
  displayProducts(products);
  categories.forEach((category) => {
    const categoryLi = document.getElementById(category);
    categoryLi.classList.remove("active");
  });
  allphoneLi.classList.remove("active");
});
// Category
// ---------------

// Find
const inputText = document.getElementById("input");
const findIcon = document.getElementById("magnifier");
const NotFound = "Not Found";

findIcon.addEventListener("click", function () {
  const searchText = inputText.value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
  );

  if (filteredProducts.length > 0) {
    displayProducts(filteredProducts);
  } else {
    productContainer.innerHTML = `<p style=" font-size: 5rem; margin-left: 100px;
    ">${NotFound}</p>`;
  }
});
// Find
