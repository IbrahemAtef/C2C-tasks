# Comparing Node.js Core Modules: `http`, `http2`, and `https`

#### Node.js HTTP module is a built-in library that allows developers to create web servers and handle HTTP requests and responses, making it a fundamental part of building web applications in NodeJS, as well as communicate with other APIs using HTTP 1.1, HTTP 2, and HTTPS.

## Architecture

#### The HTTP module extends two built-in classes:

- **Net module:** Provides network API for creating stream-based TCP servers or clients.
- **Events module:** Provides an event-driven architecture using `EventEmitter` class.

## 1. Purpose of Each Module

### **`http`**

- Provides an implementation of **HTTP/1.1**.
- Used to create HTTP servers and clients.
- Good for basic web applications, APIs, and simple services.
- Handle different HTTP methods like GET, POST, etc.
- Work with URL parameters and query strings.

### **`http2`**

- Provides support for HTTP/2 protocol.
- Supports multiplexing, header compression, and server push.
- Improves performance, especially over high-latency connections.
- **Proper Stream Management**: remember to close streams when they're no longer needed, and monitor the number of concurrent streams.

### **`https`**

- Like http, but with TLS/SSL encryption.

- **Encrypts Data:** Protects sensitive information like passwords, credit card numbers, and personal data from eavesdropping.

- **Authenticates Servers:** Verifies that clients are communicating with the intended server.

- **Ensures Data Integrity:** Prevents data from being modified or corrupted during transfer.
- **Builds Trust:** Visual indicators (like the padlock icon) increase user confidence.

- **Improves SEO:** Search engines prioritize HTTPS websites in search results.

- **Enables Modern Features:** Many web APIs (like Geolocation, Service Workers) require HTTPS.

## 2. Key technical differences between HTTP/1.1 and HTTP/2

|      Feature       |                    HTTP/1.1                    |                   HTTP/2                   |
| :----------------: | :--------------------------------------------: | :----------------------------------------: |
|  Protocol Format   |                   Text-based                   |                Binary-based                |
|    Multiplexing    |       No (requires multiple connections)       | Yes (multiple streams over one connection) |
| Header Compression |                      None                      |                Yes (HPACK)                 |
|    Server Push     |                       No                       |                    Yes                     |
|    Flow Control    |                     Basic                      |            Advanced, per-stream            |
|   Prioritization   |                       No                       |                    Yes                     |
|  Latency Handling  |         Higher (head-of-line blocking)         |          Lower (parallel streams)          |
|     Encryption     | Optional (http is unencrypted, https adds TLS) |       Often used with TLS (via ALPN)       |

## 3. When to use each module in a real-world application

### **`http`**

- Internal services, prototypes, or testing.
- When encryption isn’t needed.
- Lightweight local APIs.

### **`http2`**

- High-performance APIs with many simultaneous requests.
- Applications needing server push (e.g., push CSS/JS to client).
- Large-scale systems where reduced latency is critical.
- Modern browsers and clients that support HTTP/2.

### **`https`**

- Public-facing APIs or websites where security is required.
- Any situation handling sensitive data (login forms, payment systems).
- Complying with security regulations (e.g., GDPR, PCI DSS).
