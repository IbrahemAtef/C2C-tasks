const http = require("http");

const hostname = "127.0.0.1"; // Localhost
const port = 3000; // Port to listen on

// Create an HTTP server
const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Set default response header for JSON
  res.setHeader("Content-Type", "application/json");

  // Route: GET /todos
  if (method === "GET" && pathname === "/") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Welcome to the server" }));
  } else if (method === "GET" && pathname === "/about") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "This is the about route" }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Start the server and listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
