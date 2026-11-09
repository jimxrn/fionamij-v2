
/* =========================================
   FIONAMIJ MULTI-ITEM CART
========================================= */
(function () {
  "use strict";

  const CART_KEY = "fionamijCart";

  function readCart() {
    try {
      const cart = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );
      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartButton();
  }

  function getSelectedItem() {
    const colorButton = document.querySelector(
      ".color-swatch.active"
    );
    const sizeButton = document.querySelector(
      ".size-btn.active"
    );
    const quantityElement = document.getElementById(
      "quantity-value"
    );

    const color = colorButton?.dataset.color ||
      colorButton?.getAttribute("aria-label");
    const size = sizeButton?.dataset.size;

    if (!color || !size) {
      throw new Error("Please select a color and size.");
    }

    const quantity = Math.max(
      1,
      Math.floor(Number(quantityElement?.textContent) || 1)
    );

    return {
      collection: "The Cinta",
      name: "The Cinta",
      color: String(color),
      size: String(size),
      price: 1290,
      quantity,
      image: `assets/images/cinta-${String(color).toLowerCase()}.jpg`
    };
  }

  function getItemKey(item) {
    return [
      item.collection,
      item.color,
      item.size
    ].map(value => String(value).toLowerCase()).join("::");
  }

  function addToCart() {
    let item;

    try {
      item = getSelectedItem();
    } catch (error) {
      alert(error.message);
      return;
    }

    const cart = readCart();
    const existing = cart.find(
      entry => getItemKey(entry) === getItemKey(item)
    );

    if (existing) {
      existing.quantity =
        Math.max(1, Number(existing.quantity) || 1) +
        item.quantity;
    } else {
      cart.push(item);
    }

    saveCart(cart);

    const button = document.getElementById("select-piece-btn");
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Added to Cart ♡";

      setTimeout(() => {
        if (button.isConnected) {
          button.textContent = "Add to Cart";
        }
      }, 1400);
    }
  }

  function updateCartButton() {
    const button = document.getElementById("checkout-cart-btn");
    if (!button) return;

    const count = readCart().reduce(
      (total, item) =>
        total + Math.max(1, Number(item.quantity) || 1),
      0
    );

    button.textContent = `View Cart (${count}) · Checkout`;
  }

  function setupCart() {
    const addButton = document.getElementById("select-piece-btn");
    if (!addButton) return;

    addButton.textContent = "Add to Cart";

    if (!document.getElementById("checkout-cart-btn")) {
      const checkoutButton = document.createElement("button");

      checkoutButton.id = "checkout-cart-btn";
      checkoutButton.type = "button";
      checkoutButton.className = addButton.className;
      checkoutButton.style.marginTop = "10px";
      checkoutButton.textContent = "View Cart (0) · Checkout";

      checkoutButton.addEventListener("click", () => {
        if (readCart().length === 0) {
          alert("Your cart is empty. Add a piece first.");
          return;
        }

        window.location.href = "checkout.html";
      });

      addButton.insertAdjacentElement("afterend", checkoutButton);
    }

    updateCartButton();
  }

  // Intercept the old single-item checkout button.
  document.addEventListener("click", event => {
    const button = event.target.closest("#select-piece-btn");
    if (!button) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    addToCart();
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCart);
  } else {
    setupCart();
  }
})();
