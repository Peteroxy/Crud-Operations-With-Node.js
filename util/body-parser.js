module.exports = async (requests) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            requests.on("data", (chunk) => {
                body += chunk;
            });

            requests.on("end", () => {
                resolve(JSON.parse(body));
            })

        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}