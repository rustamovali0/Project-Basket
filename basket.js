const localData = localStorage.getItem("Basket");
const basketNumber = document.getElementById("basketNumber2");
//Qiymetlerin cemi
let totalPriceSum = 0;

if (localData) {
  const data = JSON.parse(localData);
  displayProducts(data);

  // Sebetin ustundeki reqem
  basketNumber.innerText = data.length;
}
function displayProducts(data) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  const productCounts = {};

  // Her mehsulun sayi
  data.forEach((product) => {
    if (productCounts[product.id]) {
      productCounts[product.id]++;
    } else {
      productCounts[product.id] = 1;
    }
  });
  // Mehsul sayıları olan obyekti for-in e salir

  for (const productId in productCounts) {
    if (productCounts.hasOwnProperty(productId)) {
      // hasOwnProperty Objectin daxilindekileri yoxlayir ve icinde olmayanlarda false
      // olanlarda true qaytarir
      const count = productCounts[productId];

      const product = data.find((item) => item.id === parseInt(productId));

      // Kartlarin yaradilmasi
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.classList.add("imageDiv");

      image.src = product.image;
      image.alt = product.name;

      const title = document.createElement("h2");
      title.innerText = product.name;
      title.style.marginBottom = "12px";

      const countElement = document.createElement("p");
      countElement.classList.add("countElement");
      countElement.innerText = count;
      countElement.style.display = "inline";
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(countElement);

      const totalPrice = count * product.price;
      const qiymetlerinCemiP = document.createElement("p");
      qiymetlerinCemiP.classList.add("priceOwn");
      qiymetlerinCemiP.innerText = `${totalPrice.toFixed(2)}$`;

      // Mehsulda endirim varsa
      // If e daxil olur
      if (product.sale) {
        const discountedPrice = product.price - product.saleAmount;

        const priceSale = document.createElement("p");
        priceSale.classList.add("priceSale");
        priceSale.innerText = `${discountedPrice.toFixed(2)}$`;
        card.appendChild(priceSale);
        card.appendChild(qiymetlerinCemiP);

        priceSale.style.color = "red";

        const saleDiv = document.createElement("div");
        saleDiv.classList.add("saleDiv");
        const saleDivp = document.createElement("h2");
        saleDivp.innerText = "Special Offer";
        saleDivp.classList.add("saleH1");
        saleDiv.appendChild(saleDivp);
        card.appendChild(saleDiv);
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
        const eyriXett = document.createElement("div");
        eyriXett.classList.add("eyriXett");
        card.appendChild(eyriXett);
      } else {
        card.appendChild(qiymetlerinCemiP);
      }

      // eger mehsulda endirim yoxdusa if e
      // daxil olur ve yasil reng olur
      if (!product.sale) {
        qiymetlerinCemiP.style.fontSize = "1.5rem";
        qiymetlerinCemiP.style.marginLeft = "10px";
        qiymetlerinCemiP.style.color = "green";
        qiymetlerinCemiP.style.fontWeight = "600";
      }

      // Remove button funksiyasi
      const button = document.createElement("button");
      button.innerText = "Remove";
      button.classList.add("button");

      if (!product.sale) {
        button.style.marginTop = "45px";
      }

      button.addEventListener("click", () => removeProduct(product));

      card.appendChild(button);

      productContainer.appendChild(card);

      let removeall = document.getElementById("removeAll");
      removeall.addEventListener("click", function (event) {
        if (event.target) {
          localStorage.clear();
          console.log("LocalStorage Silindi");
          location.reload();
        }
      });
      // Basketdeki  mehsullarin umumi qiymeti
      const totalPrices = count * product.price;
      totalPriceSum += totalPrices;
    }
  }
}
// localStorage den productu sil

function removeProduct(product) {
  const localData = localStorage.getItem("Basket");
  if (localData) {
    const data = JSON.parse(localData);
    const updatedData = data.filter((item) => item.id !== product.id);
    localStorage.setItem("Basket", JSON.stringify(updatedData));
    // sehifeni reflesh edir

    location.reload();
  }
  
}

// Basketdeki  mehsullarin umumi qiymeti
const spanprice = document.getElementById("spanPrice");
spanprice.innerHTML = totalPriceSum.toFixed(2);

console.log(totalPriceSum);
