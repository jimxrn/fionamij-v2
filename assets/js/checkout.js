/*==========================================
CONFIG
==========================================*/

const API_URL = "PASTE_YOUR_WEB_APP_URL_HERE";


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

/*==========================================
BUILD ORDER
==========================================*/

function buildOrder() {

    const product = JSON.parse(
        localStorage.getItem("selectedProduct")
    );

    return {

        customer: {

            fullName: document.getElementById("customer-name").value.trim(),

            mobile: document.getElementById("customer-mobile").value.trim(),

            email: document.getElementById("customer-email").value.trim()

        },

        shipping: {

            region: document.getElementById("region").value.trim(),

            province: document.getElementById("province").value.trim(),

            city: document.getElementById("city").value.trim(),

            barangay: document.getElementById("barangay").value.trim(),

            street: document.getElementById("street").value.trim(),

            zipcode: document.getElementById("zipcode").value.trim()

        },

        product: product

    };

}
/*==========================================
ORDER VALIDATION
==========================================*/

function validateOrder(order) {

    if (!order.customer.fullName) {

        alert("Please enter your full name.");

        return false;

    }

    if (!order.customer.mobile) {

        alert("Please enter your mobile number.");

        return false;

    }

    if (!order.customer.email) {

        alert("Please enter your email address.");

        return false;

    }

    if (!order.shipping.region) {

        alert("Please select your region.");

        return false;

    }

    if (!order.shipping.province) {

        alert("Please enter your province.");

        return false;

    }

    if (!order.shipping.city) {

        alert("Please enter your city.");

        return false;

    }

    if (!order.shipping.barangay) {

        alert("Please enter your barangay.");

        return false;

    }

    if (!order.shipping.street) {

        alert("Please enter your street address.");

        return false;

    }

    if (!order.shipping.zipcode) {

        alert("Please enter your ZIP Code.");

        return false;

    }

    if (!receiptInput.files.length) {

        alert("Please upload your payment receipt.");

        return false;

    }

    return true;

}

/*==========================================
COMPLETE ORDER
==========================================*/

const completeOrderButton =
    document.getElementById("complete-order");

if (completeOrderButton) {

    completeOrderButton.addEventListener("click", () => {

        const order = buildOrder();

        if (!validateOrder(order)) {

            return;

        }

        console.log(order);

    });

}
