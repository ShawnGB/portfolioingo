# Go-Folio

A modern portfolio website built with Go, featuring server-side rendering with Templ, dynamic interactions with HTMX, and full internationalization support.

## Features

- **Server-Side Rendering**: Type-safe HTML templating with [Templ](https://templ.guide/)
- **Internationalization**: Full i18n support for English and German
- **Dynamic Interactions**: Enhanced UX with HTMX for seamless form submissions
- **Contact Form**: Integrated with hCaptcha validation and email delivery via Resend API
- **Responsive Design**: Mobile-friendly portfolio showcasing projects, art, and services
- **Hot Reload**: Development workflow with [Air](https://github.com/cosmtrek/air) for instant feedback

## Tech Stack

- **Backend**: Go 1.x with native `net/http`
- **Templating**: [Templ](https://github.com/a-h/templ) - Type-safe Go templating
- **Frontend Enhancement**: [HTMX](https://htmx.org/) for dynamic interactions
- **Internationalization**: [go-i18n](https://github.com/nicksnyder/go-i18n)
- **Email Service**: [Resend API](https://resend.com/)
- **Captcha**: [hCaptcha](https://www.hcaptcha.com/)

## Prerequisites

- Go 1.21 or higher
- [Templ CLI](https://templ.guide/quick-start/installation) installed
- [Air](https://github.com/cosmtrek/air) for development (optional but recommended)

```bash
# Install Templ
go install github.com/a-h/templ/cmd/templ@latest

# Install Air (optional)
go install github.com/cosmtrek/air@latest
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd go-folio
```

### 2. Install Dependencies

```bash
go mod download
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=8080
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=sender@example.com
RECIPIENT_EMAIL=recipient@example.com
```

### 4. Generate Templ Templates

```bash
templ generate
```

### 5. Run the Application

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

## Development

### Working with Templ Templates

Templ files (`.templ`) are located in the `views/` directory and must be compiled to Go code before building:

```bash
# Generate once
templ generate

# Watch mode (auto-regenerate on changes)
templ generate --watch
```

Generated `*_templ.go` files are automatically created in the same directories but are gitignored.

### Hot Reload with Air

The `.air.toml` configuration automatically:
- Runs `templ generate` before each build
- Watches for changes in `.go`, `.templ`, `.html`, and `.css` files
- Excludes generated `*_templ.go` files to prevent rebuild loops

### Adding New Pages

1. Create a new Templ component in `views/pages/`
2. Run `templ generate` to generate the Go code
3. Register the route in `main.go` using the handler factory:

```go
mux.HandleFunc("/new-page", handlers.NewPageHandler(pages.NewPage))
```

4. Add translations in `i18n/locales/en.json` and `i18n/locales/de.json`

### Internationalization

All routes are prefixed with a language code (`/en/`, `/de/`). The i18n middleware:
- Extracts the language from the URL
- Redirects paths without language prefix to the default language (English)
- Injects localization context into request handlers

**In Templ components:**

```go
// Access translations
pCtx.T("translation.key")

// Generate language-prefixed links
pCtx.CurrentLangLink("/about")

// Generate language switch URLs
pCtx.LanguageSwitchURL("de")
```

## Project Structure

```
.
├── main.go                 # Application entry point, route registration
├── handlers/               # HTTP request handlers
│   ├── page_handler.go    # Handler factory for simple pages
│   ├── handlers.go        # Special handlers (arts with image caching)
│   └── contact_handlers.go # Contact form handler
├── views/                  # Templ templates (source .templ files only)
│   ├── layouts/           # Layout components (base, navigation, footer)
│   ├── pages/             # Page templates
│   └── forms/             # Form components
├── i18n/                   # Internationalization
│   ├── i18n.go            # i18n middleware and utilities
│   ├── pagecontext.go     # PageContext for template rendering
│   └── locales/           # Translation JSON files
├── middleware/             # HTTP middleware (logging, recovery)
├── static/                 # Static assets (CSS, images, sitemap)
├── utils/                  # Utility functions (email, images)
└── tmp/                    # Air build output (gitignored)
```

## Architecture

### Request Flow

1. **HTTP Request** → Routes registered in `main.go`
2. **i18n Middleware** → Extracts language from URL, injects context
3. **Handler** → Creates `PageContext`, renders Templ component
4. **Templ Component** → Renders HTML with localized content

### Design Patterns

- **Handler Factory Pattern**: Eliminates boilerplate for simple page handlers
- **Component Composition**: Modular, reusable layout components
- **Middleware Chain**: Recovery → Logging → i18n → Routes

## Contact Form

The contact form demonstrates HTMX integration:

1. **GET /contact** - Renders full page with empty form
2. **POST /contact** - Processes submission:
   - Honeypot spam protection
   - hCaptcha verification
   - Field validation
   - Email delivery via Resend API
   - HTMX partial response updates form without full page reload

## Deployment

### Building for Production

```bash
# Generate templates
templ generate

# Build binary
go build -o gofolio .

# Run
./gofolio
```

### Environment Variables

Ensure all required environment variables are set in your production environment:
- `PORT` - Server port (default: 8080)
- `HCAPTCHA_SECRET_KEY` - Required for contact form
- `RESEND_API_KEY` - Required for email delivery
- `SENDER_EMAIL` - Email address for sending contact form submissions
- `RECIPIENT_EMAIL` - Your email address to receive contact form submissions

## License

[Add your license information here]

## Author

[Add your information here]
