exports.handler = async function (event) {
    try {
        const params = event.queryStringParameters || {};

        const collection = params.collection || "";
        const size = params.size || "";
        const color = params.color || "";

        const gasUrl =
            "https://script.google.com/macros/s/AKfycbxFuz_-_DF5zIB-GJEKBt2TAJbafiYS47wF2G5vtuiSTyXIPK_Cr7gLCKTvbv_9ZZsy/exec";

        const query = new URLSearchParams({
            action: "getStock",
            collection: collection,
            size: size,
            color: color
        });

        const response =
            await fetch(`${gasUrl}?${query.toString()}`);

        const text =
            await response.text();

        if (!response.ok) {
            return {
                statusCode: response.status,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    stock: 0,
                    message: "Stock request failed."
                })
            };
        }

        const result =
            JSON.parse(text);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(result)
        };

    } catch (error) {
        console.error("STOCK PROXY ERROR:", error);

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                stock: 0,
                message: "Unable to retrieve stock."
            })
        };
    }
};