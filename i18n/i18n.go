package i18n

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

var bundle *i18n.Bundle

var (
	supportedLangs = []language.Tag{language.English, language.German}
	defaultLang    = language.English
)

type i18nContextKey string

const (
	keyLocalizer  = i18nContextKey("localizer")
	keyActiveLang = i18nContextKey("activeLang")
	keyBasePath   = i18nContextKey("basePath")
)

func Init(localesDir string) {
	bundle = i18n.NewBundle(defaultLang)
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)

	enPath := localesDir + "/en.json" // Construct path for en.json
	dePath := localesDir + "/de.json" // Construct path for de.json

	if _, err := os.Stat(enPath); os.IsNotExist(err) {
		log.Printf("WARN: i18n: %s not found. Skipping load.", enPath)
	} else {
		bundle.MustLoadMessageFile(enPath)
		log.Printf("INFO: i18n: %s loaded.", enPath)
	}

	if _, err := os.Stat(dePath); os.IsNotExist(err) {
		log.Printf("WARN: i18n: %s not found. Skipping load.", dePath)
	} else {
		bundle.MustLoadMessageFile(dePath)
		log.Printf("INFO: i18n: %s loaded.", dePath)
	}

	log.Println("INFO: i18n bundle initialized.")
}

func MiddlewareI18n(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		currentPath := r.URL.Path

		// Skip i18n processing for static files and special routes
		if strings.HasPrefix(currentPath, "/static/") ||
			currentPath == "/robots.txt" ||
			currentPath == "/sitemap.xml" ||
			strings.HasPrefix(currentPath, "/.well-known/") {
			next.ServeHTTP(w, r)
			return
		}

		var langCodeToUse string
		var basePath string = currentPath

		trimmedPath := strings.TrimPrefix(currentPath, "/")
		segments := strings.SplitN(trimmedPath, "/", 2)

		if len(segments) > 0 && segments[0] != "" {
			potentialLangCode := segments[0]
			isSupported := false
			for _, supportedTag := range supportedLangs {
				if potentialLangCode == supportedTag.String() {
					isSupported = true
					break
				}
			}

			if isSupported {
				langCodeToUse = potentialLangCode
				if len(segments) > 1 {
					basePath = "/" + segments[1]
				} else {
					basePath = "/"
				}
				r.URL.Path = basePath
			}
		}

		if langCodeToUse == "" {

			targetPathWithLang := "/" + defaultLang.String()
			if basePath == "/" || basePath == "" {
				targetPathWithLang += "/"
			} else {
				if !strings.HasPrefix(basePath, "/") {
					targetPathWithLang += "/"
				}
				targetPathWithLang += basePath
			}

			if currentPath != targetPathWithLang {
				targetURL := url.URL{
					Path:     targetPathWithLang,
					RawQuery: r.URL.RawQuery,
				}
				http.Redirect(w, r, targetURL.String(), http.StatusFound) // Using StatusFound (302) for temporary redirect
				return
			}

			langCodeToUse = defaultLang.String()

		}

		localizer := i18n.NewLocalizer(bundle, langCodeToUse)

		ctx := r.Context()
		ctx = context.WithValue(ctx, keyLocalizer, localizer)
		ctx = context.WithValue(ctx, keyActiveLang, langCodeToUse)
		ctx = context.WithValue(ctx, keyBasePath, basePath)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetLocalizer(ctx context.Context) *i18n.Localizer {
	val, ok := ctx.Value(keyLocalizer).(*i18n.Localizer)
	if !ok {

		log.Println("i18n: WARNING no localiser found, reverting to default")

		return i18n.NewLocalizer(bundle, defaultLang.String())
	}
	return val
}

func GetActiveLang(ctx context.Context) string {
	if val, ok := ctx.Value(keyActiveLang).(string); ok {
		return val
	}
	return defaultLang.String() // Fallback to default language string if not found
}

func GetBasePath(ctx context.Context) string {
	if val, ok := ctx.Value(keyBasePath).(string); ok {
		return val
	}
	return "/" // Fallback to root path if not found
}
