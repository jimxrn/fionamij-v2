
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
/* =========================================
   CINTA COLLECTION
========================================= */

const cintaCollectionToggle =
    document.getElementById("cinta-collection-toggle");

const cintaCollectionSection =
    document.querySelector(".collection-section");

const cintaColorGrid =
    document.getElementById("cinta-color-grid");


if (
    cintaCollectionToggle &&
    cintaCollectionSection &&
    cintaColorGrid
) {

    cintaCollectionToggle.addEventListener("click", () => {

        const isOpen =
            cintaCollectionSection.classList.toggle(
                "collection-open"
            );

        cintaCollectionToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        cintaColorGrid.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );

    });


    /* =====================================
       COLOR TILE → PRODUCT CARD
    ===================================== */

    const cintaColorTiles =
        document.querySelectorAll(
            ".cinta-color-tile"
        );


    cintaColorTiles.forEach(tile => {

        tile.addEventListener("click", () => {

            const color =
                tile.dataset.collectionColor;

            const matchingColorButton =
                document.querySelector(
                    `.color-swatch[data-color="${color}"]`
                );


            if (matchingColorButton) {

                matchingColorButton.click();

            }


            const piecesSection =
                document.querySelector(".pieces");


            if (piecesSection) {

                piecesSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}
/* =========================================
   CINTA COLLECTION REVEAL
========================================= */
document.addEventListener("DOMContentLoaded", () => {

    const collectionToggle =
        document.getElementById("cinta-collection-toggle");

    const modal =
        document.getElementById("cinta-modal");

    const closeBtn =
        document.getElementById("cinta-modal-close");


    if (!collectionToggle || !modal || !closeBtn) {

        console.error("Cinta modal elements not found.");

        return;

    }


    /* =========================================
       OPEN MODAL
    ========================================= */

    collectionToggle.addEventListener("click", () => {

        modal.classList.add("is-visible");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("is-visible");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    });


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            modal.classList.remove("is-visible");

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow = "";

        }

    });

});

/* =========================================
   CINTA COLLECTION MODAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const toggle =
        document.getElementById("cinta-collection-toggle");

    const modal =
        document.getElementById("cinta-modal");

    const closeBtn =
        document.getElementById("cinta-modal-close");


    if (!toggle || !modal || !closeBtn) {

        console.error(
            "Cinta collection modal elements not found."
        );

        return;
    }


    function openCintaModal() {

        modal.classList.add("is-visible");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    function closeCintaModal() {

        modal.classList.remove("is-visible");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    toggle.addEventListener(
        "click",
        openCintaModal
    );


    closeBtn.addEventListener(
        "click",
        closeCintaModal
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeCintaModal();

            }

        }
    );

});