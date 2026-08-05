// ==========================
// PRODUCT OPTIONS
// ==========================

const productImage = document.getElementById("product-image");
const selectedColor = document.querySelector(".selected-color");
const swatches = document.querySelectorAll(".color-swatch");

swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
        swatches.forEach((button) => {
            button.classList.remove("active");

        });
        swatch.classList.add("active");
        selectedColor.textContent = swatch.getAttribute("aria-label");
        const color = swatch
            .getAttribute("aria-label")
            .toLowerCase();

        productImage.style.opacity = "0";
        setTimeout(() => {

            productImage.src =
                `assets/images/cinta-${color}.jpg`;

            productImage.style.opacity = "1";

        }, 250);

    });
});

/*==========================================
SIZE SELECTOR
==========================================*/

const selectedSize = document.querySelector(".selected-size");
const sizeButtons = document.querySelectorAll(".size-btn");

sizeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        sizeButtons.forEach((size) => {

            size.classList.remove("active");

        });

        button.classList.add("active");

        selectedSize.textContent = button.dataset.size;

    });

});

/*==========================================
SELECT PIECE
==========================================*/

const selectPieceButton = document.getElementById("select-piece-btn");

selectPieceButton.addEventListener("click", () => {

    const activeColor = document
        .querySelector(".color-swatch.active")
        .dataset.color;

    const activeSize = document
        .querySelector(".size-btn.active")
        .dataset.size;

    const selectedProduct = {

        collection: "The Cinta",

        name: "The Cinta",

        color: activeColor,

        size: activeSize,

        price: 1290,

        image: `assets/images/cinta-${activeColor.toLowerCase()}.jpg`

    };

    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(selectedProduct)
    );

    window.location.href = "checkout.html";

});