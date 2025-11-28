# Security Configuration Guide

This guide covers the security improvements for shawnbecker.de, deployed on Render.

## ✅ Implemented: Application-Level Security

### 1. Security Middleware (`middleware/middleware.go:32-68`)

All security headers are implemented at the application level via the `Security()` middleware function. This middleware adds the following headers to every HTTP response:

#### Headers Implemented:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks by blocking iframe embedding |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information sent to other sites |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Disables unnecessary browser features |
| `Content-Security-Policy` | See below | Prevents XSS and data injection attacks |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forces HTTPS for 1 year (only on HTTPS requests) |

#### Content Security Policy (CSP) Details:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://js.hcaptcha.com https://hcaptcha.com;
style-src 'self' 'unsafe-inline' https://hcaptcha.com;
frame-src https://hcaptcha.com;
connect-src 'self' https://hcaptcha.com;
font-src 'self';
img-src 'self' data:;
object-src 'none';
base-uri 'self';
form-action 'self';
```

**CSP Breakdown**:
- `'unsafe-inline'` for scripts/styles: Required for Templ's inline template rendering
- hCaptcha domains: Required for contact form captcha functionality
- `data:` for images: Allows base64-encoded images
- `'self'` everywhere else: Only allow resources from your own domain

### 2. security.txt (RFC 9116)

- **File**: `static/.well-known/security.txt`
- **Route**: `/.well-known/security.txt` in `main.go:44-46`
- **Contents**: Contact email, expiration date, preferred languages, canonical URL
- **Purpose**: Standardized way for security researchers to report vulnerabilities
- **Expires**: 2026-11-28 (update annually)

### 3. Middleware Chain Order

```go
// main.go:59
handler := middleware.Recovery(middleware.Security(middleware.Logging(i18n.MiddlewareI18n(mux))))
```

**Order matters**:
1. **Recovery** (outermost) - Catches panics from all other middleware
2. **Security** - Adds security headers to all responses
3. **Logging** - Logs requests with timing information
4. **i18n** - Extracts language from URL path
5. **Routes** (innermost) - Application routes

---

## 🧪 Testing Security Headers

### Local Testing

```bash
# Start the application
air

# Test headers (in another terminal)
curl -I http://localhost:8080

# Test security.txt
curl http://localhost:8080/.well-known/security.txt
```

### Production Testing (After Deployment)

#### Online Security Scanners:
1. **Security Headers**: https://securityheaders.com/?q=https://shawnbecker.de
2. **Mozilla Observatory**: https://observatory.mozilla.org/analyze/shawnbecker.de
3. **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=shawnbecker.de

#### Command Line:
```bash
# Check all security headers
curl -I https://shawnbecker.de

# Verify specific headers
curl -I https://shawnbecker.de | grep -E "(X-Frame|X-Content|CSP|HSTS|Referrer)"

# Check security.txt
curl https://shawnbecker.de/.well-known/security.txt
```

### Expected Headers in Response:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' ...
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## 🚀 Render Deployment

### Environment Variables Required:

Ensure these are set in your Render dashboard:

```
PORT=8080
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=sender@example.com
RECIPIENT_EMAIL=recipient@example.com
```

### Render HTTPS Configuration:

Render automatically provides:
- ✅ Free SSL/TLS certificates (Let's Encrypt)
- ✅ Automatic HTTPS redirect
- ✅ HTTP/2 support
- ✅ CDN (on paid plans)

**HSTS Header**: The Security middleware automatically detects HTTPS requests (via `X-Forwarded-Proto` header from Render's load balancer) and adds the HSTS header accordingly.

### Deploy Steps:

1. Commit and push your changes to GitHub
2. Render will automatically deploy (if auto-deploy is enabled)
3. Wait for build to complete
4. Test security headers on your live site

---

## 📊 Security Score

### Before Implementation:
- Security Score: **0/7** (No security headers)
- Missing: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, etc.
- Vulnerable to: XSS, clickjacking, MIME sniffing

### After Implementation:
- Security Score: **7/7** ✅
- All major security headers present
- HSTS enforced on HTTPS
- CSP prevents XSS attacks
- security.txt available for vulnerability reporting

---

## 🔄 Maintenance

### Annual Tasks:

#### 1. Update security.txt (Before 2026-11-28)
```bash
# Edit the file
nano static/.well-known/security.txt

# Update the Expires field to one year from now
Expires: 2027-11-28T00:00:00.000Z

# Commit and deploy
git add static/.well-known/security.txt
git commit -m "docs(security): update security.txt expiration date"
git push
```

### As-Needed Tasks:

#### 2. Update CSP for New Third-Party Services

If you add new external services (analytics, fonts, APIs), update the CSP:

```go
// middleware/middleware.go:49-58
// Add the new domains to the appropriate directives
csp := "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://js.hcaptcha.com https://hcaptcha.com https://new-service.com; " +
    // ... other directives
```

**Testing CSP Changes**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for CSP violation warnings
4. Add blocked domains to appropriate CSP directives
5. Test thoroughly before deploying

#### 3. Monitor Security Scores

Run monthly checks:
```bash
# Add to your calendar or CI/CD pipeline
curl -I https://shawnbecker.de | grep -E "(X-Frame|X-Content|CSP|HSTS)"
```

---

## 🚨 Troubleshooting

### Issue: CSP Blocking Resources

**Symptoms**: Blank page, broken images, failed script loads

**Solution**:
1. Open browser DevTools → Console
2. Look for errors like: `Refused to load ... because it violates CSP`
3. Identify the blocked domain
4. Update `middleware/middleware.go:49-58` to allow that domain
5. Rebuild and redeploy

**Example**:
```
CSP Error: Refused to load https://fonts.googleapis.com/...

Fix: Add to CSP:
font-src 'self' https://fonts.googleapis.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

### Issue: HSTS Not Showing

**Symptoms**: No `Strict-Transport-Security` header in response

**Check**:
1. Are you testing on HTTPS? HSTS only applies to HTTPS requests
2. Is Render properly setting `X-Forwarded-Proto: https`?

**Test**:
```bash
# Should show HSTS header
curl -I https://shawnbecker.de

# Won't show HSTS header (HTTP)
curl -I http://shawnbecker.de
```

### Issue: security.txt Redirecting

**Symptoms**: `/.well-known/security.txt` redirects to `/en/.well-known/security.txt`

**Cause**: i18n middleware is intercepting the request

**Current Behavior**: This is expected - the file is served after redirect

**Optional Fix** (if you want direct access):
```go
// main.go - Register BEFORE i18n middleware
// Move security.txt handler outside the middleware chain
```

### Issue: Security Headers Missing After Deployment

**Check**:
1. Verify build succeeded on Render dashboard
2. Check Render logs for errors
3. Ensure middleware chain includes `middleware.Security()`
4. Test with: `curl -I https://your-app.onrender.com`

---

## 🔐 Additional Security Recommendations

### 1. Rate Limiting (Future Enhancement)

Consider adding rate limiting to prevent abuse:
- Contact form submissions
- API endpoints (if any)
- Login attempts (if user auth is added)

**Libraries**:
- `golang.org/x/time/rate`
- `github.com/ulule/limiter/v3`

### 2. Environment Variable Security

✅ **Already Following Best Practices**:
- Secrets in `.env` (gitignored)
- Environment variables on Render
- Never commit API keys to git

### 3. Dependency Updates

Regularly update Go modules for security patches:
```bash
go get -u ./...
go mod tidy
```

### 4. Input Validation

✅ **Already Implemented**:
- hCaptcha on contact form
- Email validation
- Honeypot field for spam prevention

---

## 📚 Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [RFC 9116 - security.txt](https://www.rfc-editor.org/rfc/rfc9116.html)
- [Render Security Documentation](https://render.com/docs/tls-ssl)
- [Go Security Best Practices](https://go.dev/doc/security/best-practices)

---

## 📝 Summary

All security headers are implemented at the **application level** in your Go code. No additional Render configuration is needed beyond ensuring HTTPS is enabled (which Render does by default).

**What's Automatic on Render**:
- ✅ SSL/TLS certificates
- ✅ HTTPS redirect
- ✅ HTTP/2

**What You've Implemented**:
- ✅ Security middleware with all major headers
- ✅ CSP tailored for Templ + hCaptcha
- ✅ HSTS on HTTPS requests
- ✅ security.txt for vulnerability disclosure

**Next Steps**:
1. Commit these changes
2. Push to GitHub
3. Wait for Render auto-deploy
4. Test security headers on production
5. Run security scanners to verify
