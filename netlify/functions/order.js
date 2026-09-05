exports.handler = async function (event) {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    message: "Method not allowed."
                })
            };
        }

        const orderApiUrl =
            "https://script.google.com/macros/s/AKfycbzJm4X3iiUV4A1suUPvE_WMSQH34lgHT7PFksZbToMebkC29V4di-7bv1Y_0eWqL-33/exec";

        const response = await fetch(orderApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: event.body || "{}"
        });

        const text = await response.text();

        console.log(
            "Google Apps Script order response:",
            text
        );

        return {
            statusCode: response.status,
            headers: {
                "Content-Type": "application/json"
            },
            body: text
        };

    } catch (error) {

        console.error(
            "Order proxy error:",
            error
        );

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                message: "Unable to submit order right now."
            })
        };
    }
};