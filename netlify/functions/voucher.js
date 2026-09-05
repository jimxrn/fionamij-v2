exports.handler = async function (event) {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    valid: false,
                    discount: 0,
                    message: "Method not allowed."
                })
            };
        }

        const request = JSON.parse(event.body || "{}");

        const email = String(request.email || "")
            .trim()
            .toLowerCase();

        const code = String(request.code || "")
            .trim()
            .toUpperCase();

        const subtotal = Number(request.subtotal) || 0;

        if (!email || !code) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    valid: false,
                    discount: 0,
                    message: "Email and voucher code are required."
                })
            };
        }

        const gasUrl =
            "https://script.google.com/macros/s/AKfycbxMRHx3reEsInZnevTaeqEOne0tIY62EL64eaH1Fz2fGfLrpDzXnxcz76my0nVkOg/exec";

        const params = new URLSearchParams({
            action: "validateVoucher",
            email: email,
            code: code,
            subtotal: String(subtotal)
        });

        const response = await fetch(
            `${gasUrl}?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(
                `Voucher service returned ${response.status}`
            );
        }

        const text = await response.text();

        console.log(
            "Google Apps Script response:",
            text
        );

        const result = JSON.parse(text);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(result)
        };

    } catch (error) {

        console.error(
            "Voucher proxy error:",
            error
        );

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                valid: false,
                discount: 0,
                message: "Unable to validate voucher right now."
            })
        };
    }
};