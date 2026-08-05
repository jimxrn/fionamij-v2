Known Integration Notes

- Do not manually set Content-Type: application/json when submitting directly to an Apps Script Web App unless you intentionally handle CORS/preflight.
- payload.product.collection must exactly match the Collection value in the Products sheet.
- payload.product.size must exactly match the Size value in the Products sheet (e.g. "L", not "Large").