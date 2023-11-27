const crypto =require("crypto")
const requestBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file")

module.exports = async (req, res) => {
    if (req.url === "/api/movies")
        try {
           let body = await requestBodyParser(req)
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end();
        } catch (error) {
            console.log(error);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Validation Failed", message: "Request Body is not defined" }));
        }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
    };
}