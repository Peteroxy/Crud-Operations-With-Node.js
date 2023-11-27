module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    //last index simply means the previous index...to  capture the last slash as there are many slashes...youll use  the index oof the blast slash plus 1

    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    if (req.url === "/api/movies") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if (!regexV4.test(id)) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID not Found" }));
    }
    else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
        res.setHeader("Content-Type", "application/json");
        let filteredMovie = req.movies.filter((movie) => {
            return movie.id === id
        });
        if (filteredMovie.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filteredMovie));
            res.end();
        }
        else {
            res.statusCode = 400;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
            res.end();
        };
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
    };
};