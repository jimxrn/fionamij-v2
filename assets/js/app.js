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