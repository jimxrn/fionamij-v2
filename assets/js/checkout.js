/*==========================================
CONFIG
==========================================*/
const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxFuz_-_DF5zIB-GJEKBt2TAJbafiYS47wF2G5vtuiSTyXIPK_Cr7gLCKTvbv_9ZZsy/exec";

const API_URL =
    "https://script.google.com/macros/s/AKfycbzJm4X3iiUV4A1suUPvE_WMSQH34lgHT7PFksZbToMebkC29V4di-7bv1Y_0eWqL-33/exec";
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
PAYMENT METHOD
==========================================*/

const paymentOptions =
    document.querySelectorAll('input[name="payment"]');

const paymentTitle =
    document.getElementById("payment-details-title");

const paymentAccountLabel =
    document.getElementById("payment-account-label");

const paymentAccountName =
    document.getElementById("payment-account-name");

const paymentNumberLabel =
    document.getElementById("payment-number-label");

const paymentNumber =
    document.getElementById("payment-number");


function updatePaymentDetails() {

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    if (!selected) return;


    const paymentTitle =
        document.getElementById("payment-details-title");

    const paymentQr =
        document.getElementById("payment-qr");

    const paymentInstruction =
        document.getElementById("payment-instruction");


    if (selected.value === "GCash") {

        paymentTitle.textContent =
            "GCash";

        paymentInstruction.textContent =
            "Scan the QR code to complete your payment.";

        // Temporary mock QR
        paymentQr.src =
            "https://drive.google.com/thumbnail?id=1A7x3us7XPl7ZAF0jk0r0FggI28I7RcoJ&sz=w1000";
    }


    if (selected.value === "Bank Transfer") {

        paymentTitle.textContent =
            "Bank Transfer";

        paymentInstruction.textContent =
            "Scan the QR code to complete your payment.";

        // Temporary mock QR
        paymentQr.src =
            "https://drive.google.com/thumbnail?id=1f5btgUgqpFAv7kSljs5I0m4Xu9rMCNzs&sz=w1000";
    }

}


paymentOptions.forEach((option) => {

    option.addEventListener(
        "change",
        updatePaymentDetails
    );

});


updatePaymentDetails();

/*==========================================
VOUCHER
==========================================*/

let appliedVoucher = null;
let voucherDiscount = 0;

/*
 * TEMPORARY VOUCHER DATABASE
 * We'll eventually move this to Google Sheets
 * so vouchers can be managed without editing code.
 */
const VOUCHERS = {
    "WELCOME10": {
        type: "percentage",
        value: 10,
        minimumSpend: 0,
        active: true
    },

    "HIRAYA199": {
        type: "fixed",
        value: 199,
        active: true,
        restricted: true,
        emailRequired: true,
        oneTimePerRecipient: true
    }
};


/*==========================================
VOUCHER ELEMENTS
==========================================*/

const voucherInput =
    document.getElementById("voucher-code");

const applyVoucherButton =
    document.getElementById("apply-voucher");

const voucherDisplay =
    document.getElementById("voucher-display");

const subtotalElement =
    document.getElementById("summary-subtotal");

const totalElement =
    document.getElementById("summary-total");


/*==========================================
GET SUBTOTAL
==========================================*/

function getSubtotal() {

    const product =
        JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product || !product.price) {
        return 0;
    }

    return Number(product.price);
}


/*==========================================
UPDATE TOTAL
==========================================*/

function updateCheckoutTotal() {

    const subtotal = getSubtotal();

    const shipping = 0; // Shipping will be added later

    const total =
        Math.max(0, subtotal + shipping - voucherDiscount);

    console.log("UPDATE TOTAL RUNNING");
    console.log("subtotal:", subtotal);
    console.log("voucherDiscount:", voucherDiscount);
    console.log("total:", total);
    console.log("voucherDisplay:", voucherDisplay);
    console.log("totalElement:", totalElement);

    if (subtotalElement) {
        subtotalElement.textContent =
            `₱${subtotal.toLocaleString()}`;
    }

    if (totalElement) {
        totalElement.textContent =
            `₱${total.toLocaleString()}`;
    }

    if (voucherDisplay) {

        if (appliedVoucher) {

            voucherDisplay.textContent =
                `-${formatCurrency(voucherDiscount)}`;

        } else {

            voucherDisplay.textContent = "None";

        }

    }
}


/*==========================================
FORMAT CURRENCY
==========================================*/

function formatCurrency(amount) {

    return `₱${Number(amount).toLocaleString()}`;

}


/*==========================================
APPLY VOUCHER
==========================================*/
function normalizeEmail(email) {

    return email
        .trim()
        .toLowerCase();

}
/*==========================================
  APPLY VOUCHER — OMS VALIDATION
==========================================*/

async function applyVoucher() {

    if (!voucherInput) return;


    const code =
        voucherInput.value
            .trim()
            .toUpperCase();


    if (!code) {

        showVoucherModal(
            "Please enter a voucher code."
        );

        return;
    }


    /*========================================
      CUSTOMER EMAIL
    ========================================*/

    const emailInput =
        document.getElementById(
            "customer-email"
        );


    const email =
        emailInput
            ? emailInput.value.trim().toLowerCase()
            : "";


    if (!email) {

        showVoucherModal(
            "Please enter your email address before applying a voucher."
        );

        return;
    }


    /*========================================
      SUBTOTAL
    ========================================*/

    const subtotal =
        getSubtotal();


    /*========================================
      DISABLE BUTTON
    ========================================*/

    if (applyVoucherButton) {

        applyVoucherButton.disabled = true;

        applyVoucherButton.textContent =
            "Checking...";

    }
/*========================================
  CALL OMS
========================================*/

try {

    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body: JSON.stringify({
                action: "validateVoucher",
                email: email,
                code: code,
                subtotal: subtotal
            })
        }
    );


    const result =
        await response.json();


    /*----------------------------------------
      RESTORE BUTTON
    ----------------------------------------*/

    if (applyVoucherButton) {

        applyVoucherButton.disabled = false;

        applyVoucherButton.textContent =
            "Apply";

    }


    /*----------------------------------------
      INVALID
    ----------------------------------------*/

    if (!result.valid) {

        appliedVoucher = null;

        voucherDiscount = 0;

        updateCheckoutTotal();

        showVoucherModal(
            result.message ||
                "This voucher isn't available.",
            "Voucher"
        );

        return;
    }


    /*----------------------------------------
      VALID
    ----------------------------------------*/

    appliedVoucher = {

        code: result.code,

        type: result.type,

        value: result.value,

        email: email

    };


    voucherDiscount =
        Number(result.discount) || 0;


    console.log("VOUCHER RESULT:", result);
    console.log("VOUCHER DISCOUNT:", voucherDiscount);
    console.log("APPLIED VOUCHER:", appliedVoucher);
    /*----------------------------------------
      UPDATE CHECKOUT
    ----------------------------------------*/

    updateCheckoutTotal();


    voucherInput.value =
        result.code;


    showVoucherModal(
        `${result.code} applied! You saved ${formatCurrency(voucherDiscount)}.`,
        "Voucher Applied"
    );


} catch (error) {

    console.error(
        "Voucher API Error:",
        error
    );


    if (applyVoucherButton) {

        applyVoucherButton.disabled = false;

        applyVoucherButton.textContent =
            "Apply";

    }


    showVoucherModal(
        "We couldn't validate the voucher right now. Please try again.",
        "Voucher"
    );

    }

}
/*==========================================
VOUCHER MODAL
==========================================*/

const voucherModal =
    document.getElementById("voucher-modal");

const voucherModalTitle =
    document.getElementById("voucher-modal-title");

const voucherModalMessage =
    document.getElementById("voucher-modal-message");

const voucherModalClose =
    document.getElementById("voucher-modal-close");


function showVoucherModal(message, title = "Voucher") {

    if (!voucherModal) return;

    voucherModalTitle.textContent = title;

    voucherModalMessage.textContent = message;

    voucherModalMessage.style.whiteSpace = "pre-line";

    voucherModal.classList.add("active");

}


function closeVoucherModal() {

    if (!voucherModal) return;

    voucherModal.classList.remove("active");

    voucherModal.style.display = "";

}


/*==========================================
MODAL OK BUTTON
==========================================*/

if (voucherModalClose) {

    voucherModalClose.addEventListener(
        "click",
        function () {

            const isOrderSubmitted =
                voucherModalTitle &&
                voucherModalTitle.textContent ===
                    "Order Submitted";


            closeVoucherModal();


            /*====================================
              RESET ONLY AFTER ORDER SUBMITTED
            ====================================*/

            if (isOrderSubmitted) {

                /* Clear customer details */

                const customerFields = [
                    "customer-name",
                    "customer-mobile",
                    "customer-email"
                ];

                customerFields.forEach(function (id) {

                    const field =
                        document.getElementById(id);

                    if (field) {
                        field.value = "";
                    }

                });


                /* Clear shipping details */

                const shippingFields = [
                    "region",
                    "province",
                    "city",
                    "barangay",
                    "street",
                    "zipCode"
                ];

                shippingFields.forEach(function (id) {

                    const field =
                        document.getElementById(id);

                    if (field) {
                        field.value = "";
                    }

                });


                /* Clear payment selection */

                document
                    .querySelectorAll(
                        'input[name="payment"]'
                    )
                    .forEach(function (radio) {

                        radio.checked = false;

                    });


                /* Clear receipt */

                if (receiptInput) {

                    receiptInput.value = "";

                }


                /* Clear receipt preview */

                if (receiptPreview) {

                    receiptPreview.src = "";

                    receiptPreview.style.display =
                        "none";

                }


                /* Clear voucher */

                if (voucherInput) {

                    voucherInput.value = "";

                }

                appliedVoucher = null;

                voucherDiscount = 0;


                /* Refresh checkout */

                window.location.reload();

            }

        }
    );

}
/*==========================================
APPLY BUTTON
==========================================*/

if (applyVoucherButton) {

    applyVoucherButton.addEventListener(
        "click",
        applyVoucher
    );

}


/*==========================================
INITIAL TOTAL
==========================================*/

updateCheckoutTotal();
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

            region: "",

            province: "",

            city: "",

            barangay: "",

            street: document.getElementById("shipping-address").value.trim(),

            zipCode: "",

        },

        payment: {

            method:
                document.querySelector(
                    'input[name="payment"]:checked'
                )?.value || ""

        },

        product: product,

        voucher: appliedVoucher
            ? {
                code: appliedVoucher.code,
                type: appliedVoucher.type,
                value: appliedVoucher.value,
                discount: voucherDiscount
        }   
        : null,

        pricing: {
                subtotal: getSubtotal(),
                voucherDiscount: voucherDiscount,
                total: Math.max(
                    0,
                    getSubtotal() - voucherDiscount
            )
        }    

    };

}
/*==========================================
ORDER VALIDATION
==========================================*/

function validateOrder(order) {

    const missing = [];


    /*----------------------------------------
      CUSTOMER DETAILS
    ----------------------------------------*/

    if (!order.customer.fullName?.trim()) {

        missing.push("Full Name");

    }

    if (!order.customer.mobile?.trim()) {

        missing.push("Mobile Number");

    }

    if (!order.customer.email?.trim()) {

        missing.push("Email Address");

    }


    /*----------------------------------------
      SHIPPING DETAILS
    ----------------------------------------*/

    if (!order.shipping.street?.trim()) {
    missing.push("Shipping Address");
    }


    /*----------------------------------------
      PAYMENT
    ----------------------------------------*/

    if (!order.payment?.method) {

        missing.push("Payment Method");

    }


    /*----------------------------------------
      RECEIPT
    ----------------------------------------*/

    if (
        !receiptInput ||
        !receiptInput.files ||
        !receiptInput.files.length
    ) {

        missing.push("Proof of Payment");

    }


    /*----------------------------------------
      SHOW ALL MISSING FIELDS
    ----------------------------------------*/

    if (missing.length > 0) {

        showValidationModal(missing);

        return false;

    }


    return true;

}
/*==========================================
  FIONAMIJ VALIDATION MODAL
==========================================*/

function showValidationModal(missing) {

    const modal =
        document.getElementById("validation-modal");

    const list =
        document.getElementById("validation-missing-list");

    list.innerHTML = "";

    missing.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

    modal.classList.add("active");

}


function closeValidationModal() {

    const modal =
        document.getElementById("validation-modal");

    modal.classList.remove("active");

}


document
    .getElementById("validation-modal-close")
    .addEventListener(
        "click",
        closeValidationModal
    );
/*==========================================
CONVERT RECEIPT
==========================================*/

function convertReceiptToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => {

            const base64 = reader.result.split(",")[1];

            resolve({

                fileName: file.name,

                mimeType: file.type,

                base64: base64

            });

        };

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}
/*==========================================
  SUBMIT ORDER
==========================================*/

async function submitOrder(order) {

    try {

        const file =
            receiptInput.files[0];

        const receipt =
            await convertReceiptToBase64(file);

        order.receipt = receipt;

        console.log(
            "Sending to:",
            API_URL
        );

        console.log(
            "Payload:",
            order
        );

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify(order)

            });


        console.log(
            "Response Status:",
            response.status
        );


        const text =
            await response.text();

        console.log(
            "Raw Response:",
            text
        );


        const result =
            JSON.parse(text);


        /*====================================
          ORDER SUCCESS
        ====================================*/

        if (result.success) {

            /*--------------------------------
              REDEEM HIRAYA199
            --------------------------------*/

            if (
                order.voucher &&
                order.voucher.code ===
                    "HIRAYA199"
            ) {

                const redeemResponse =
                    await fetch(
                        APPS_SCRIPT_URL,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify({

                                    action:
                                        "redeemVoucher",

                                    email:
                                        order.customer.email,

                                    code:
                                        order.voucher.code,

                                    orderId:
                                        result.orderId

                                })

                        }
                    );


                const redeemResult =
                    await redeemResponse.json();


                console.log(
                    "Voucher Redemption:",
                    redeemResult
                );


                if (!redeemResult.success) {

                    console.error(
                        "Voucher redemption failed:",
                        redeemResult.message
                    );

                }

            }

            hideProcessingModal();

            showVoucherModal(
                `Thank you for your order ♡\n\nOrder ID\n${result.orderId}`,
                "Order Submitted"
            );


        } else {

            hideProcessingModal();

            alert(result.message);

        }
        
        
    }


    catch (error) {

        hideProcessingModal();

        console.error(
            "Submit Order Error:",
            error
        );

        alert(
            error.message
        );

    }

}
/*==========================================
  FIONAMIJ PROCESSING MODAL
==========================================*/

function showProcessingModal() {

    const modal =
        document.getElementById("processing-modal");

    if (modal) {

        modal.classList.add("active");

    }

}


function hideProcessingModal() {

    const modal =
        document.getElementById("processing-modal");

    if (modal) {

        modal.classList.remove("active");

    }

}
/*==========================================
COMPLETE ORDER
==========================================*/

const completeOrderButton =
    document.getElementById("complete-order");

if (completeOrderButton) {

    completeOrderButton.addEventListener("click", async () => {

        const order = buildOrder();

        console.log(order);

        if (!validateOrder(order)) {

            return;

        }

        showProcessingModal();

        await submitOrder(order);

    });

}