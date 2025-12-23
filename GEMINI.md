## Project Overview

This project is a modern portfolio website built with Go. It features server-side rendering with Templ, dynamic interactions with HTMX, and full internationalization support for English and German. The backend is built with the native `net/http` package and uses a middleware chain for logging, recovery, and security.

The project is well-structured, with clear separation of concerns between handlers, views, and internationalization logic. It uses a handler factory pattern to reduce boilerplate code and component composition for building the UI.

## Building and Running

### Prerequisites

- Go 1.21 or higher
- [Templ CLI](https://templ.guide/quick-start/installation) installed
- [Air](https://github.com/cosmtrek/air) for development (optional but recommended)

```bash
# Install Templ
go install github.com/a-h/templ/cmd/templ@latest

# Install Air (optional)
go install github.com/cosmtrek/air@latest
```

### Getting Started

1.  **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd go-folio
    ```

2.  **Install Dependencies**

    ```bash
    go mod download
    ```

3.  **Configure Environment Variables**

    Create a `.env` file in the project root:

    ```env
    PORT=8080
    HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
    RESEND_API_KEY=your_resend_api_key
    SENDER_EMAIL=sender@example.com
    RECIPIENT_EMAIL=recipient@example.com
    ```

4.  **Generate Templ Templates**

    ```bash
    templ generate
    ```

5.  **Run the Application**

    **Development with hot reload (recommended):**

    ```bash
    air
    ```

    **Manual build and run:**

    ```bash
    go build -o ./tmp/main .
    ./tmp/main
    ```

    The application will be available at `http://localhost:8080`

## Development Conventions

-   **Templating:** The project uses Templ for type-safe server-side rendering. All `.templ` files are located in the `views/` directory and must be compiled to Go code using `templ generate` before building the application.
-   **Internationalization:** All user-facing strings are managed through the `go-i18n` library. The translation files are located in `i18n/locales/`. All routes are prefixed with a language code (`/en/` or `/de/`).
-   **Routing:** The application uses the native `net/http` package for routing. The routes are defined in `main.go`. A handler factory pattern is used to create simple page handlers, reducing boilerplate code.
-   **Styling:** The project uses plain CSS for styling. The CSS files are located in the `static/css/` directory.

## Testing

The project uses Playwright for end-to-end testing. The tests are located in the `.playwright-mcp/` directory. To run the tests, you will need to have Node.js and npm installed.

### Running the Tests

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Run the Tests**

    ```bash
    npx playwright test
    ```
