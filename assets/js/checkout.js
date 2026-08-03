/*==========================================
LOAD SELECTED PRODUCT
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const product = JSON.parse(
        localStorage.getItem("selectedProduct")
    );

    if (!product) {

        return;

    }

    /*==========================================
    PRODUCT IMAGE
    ==========================================*/

    const checkoutImage = document.getElementById("checkout-product-image");

    if (checkoutImage) {

        checkoutImage.src = product.image;
        checkoutImage.alt = `${product.name} in ${product.color}`;

    }
    const summaryImage = document.getElementById("summary-product-image");

    if (summaryImage) {

        summaryImage.src = product.image;
        summaryImage.alt = `${product.name} in ${product.color}`;

    }

    /*==========================================
    PRODUCT DETAILS
    ==========================================*/

    const checkoutColor = document.getElementById("checkout-color");
    const summaryColor = document.getElementById("summary-color");
    const summarySize = document.getElementById("summary-size");

    if (checkoutColor) {

        checkoutColor.textContent = product.color;

    }

    if (summaryColor) {

        summaryColor.textContent = product.color;

    }

    if (summarySize) {

        summarySize.textContent = product.size;

    }

    /*==========================================
    PRODUCT NAME
    ==========================================*/

    document.querySelectorAll(".product-name").forEach((element) => {

        element.textContent = product.name;

    });

    /*==========================================
    PRODUCT PRICE
    ==========================================*/

    document.querySelectorAll(".product-price").forEach((element) => {

        element.textContent =
            `₱${product.price.toLocaleString()}`;

    });

});

/*==========================================
RECEIPT PREVIEW
==========================================*/

const receiptInput =
    document.getElementById("payment-proof");

const receiptPreview =
    document.getElementById("receipt-preview");

const uploadIcon =
    document.querySelector(".upload-icon");

if (receiptInput && receiptPreview) {

    receiptInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) {

            return;

        }

        const reader = new FileReader();

        reader.onload = (e) => {

            receiptPreview.src = e.target.result;

            receiptPreview.style.display = "block";

            const uploadTitle =
            document.getElementById("upload-title");

            const uploadDescription =
            document.getElementById("upload-description");

            const uploadFormats =
            document.getElementById("upload-formats");

            const uploadStatus =
             document.getElementById("upload-status");

            if (uploadTitle) {

                uploadTitle.textContent = "Replace Receipt";

            }

            if (uploadDescription) {

                 uploadDescription.style.display = "none";

            }

            if (uploadFormats) {

                uploadFormats.style.display = "none";

            }

            if (uploadStatus) {

                uploadStatus.style.display = "block";

            }

            if (uploadIcon) {

                uploadIcon.style.display = "none";

            }

        };

        reader.readAsDataURL(file);

    });

}