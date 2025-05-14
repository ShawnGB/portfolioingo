package i18n

import (
	"net/http"

	"github.com/a-h/templ"
	goi18n "github.com/nicksnyder/go-i18n/v2/i18n"
)

type PageContext struct {
	L             *goi18n.Localizer
	ActiveLang    string
	BasePath      string
	OriginalQuery string
}

func (pc PageContext) T(messageID string) string {
	if pc.L == nil {
		// Fallback, falls kein Localizer vorhanden ist
		return messageID
	}
	return pc.L.MustLocalize(&goi18n.LocalizeConfig{MessageID: messageID})
}

// LanguageSwitchURL gibt jetzt templ.SafeURL zurück.
func (pc PageContext) LanguageSwitchURL(targetLangCode string) templ.SafeURL {
	// Die Logik zur Pfad-Generierung bleibt gleich.
	path := "/" + targetLangCode
	if pc.BasePath != "/" {
		path += pc.BasePath
	} else {
		path += "/"
	}

	if pc.OriginalQuery != "" {
		path = path + "?" + pc.OriginalQuery
	}
	// HINZUGEFÜGT: Der generierte String-Pfad wird mit templ.URL() umgewandelt.
	return templ.URL(path)
}

// CurrentLangLink gibt jetzt templ.SafeURL zurück.
func (pc PageContext) CurrentLangLink(pathSegment string) templ.SafeURL {
	// Die Logik zur Pfad-Generierung bleibt gleich.
	if pathSegment == "" {
		pathSegment = "/"
	} else if pathSegment[0] != '/' {
		pathSegment = "/" + pathSegment
	}

	// ActiveLang sollte von der Middleware immer korrekt gesetzt werden.
	// Ein Fallback hier könnte sein:
	// activeLang := pc.ActiveLang
	// if activeLang == "" {
	//     activeLang = defaultLang.String() // Benötigt Zugriff auf defaultLang
	// }
	// Für die Lernübung verlassen wir uns darauf, dass ActiveLang gesetzt ist.

	path := "/" + pc.ActiveLang
	if pathSegment != "/" {
		path += pathSegment
	} else {
		path += "/"
	}
	// HINZUGEFÜGT: Der generierte String-Pfad wird mit templ.URL() umgewandelt.
	return templ.URL(path)
}

func NewPageContext(r *http.Request) PageContext {
	localizer := GetLocalizer(r.Context())
	activeLang := GetActiveLang(r.Context())
	basePath := GetBasePath(r.Context())
	originalQuery := r.URL.RawQuery

	return PageContext{
		L:             localizer,
		ActiveLang:    activeLang,
		BasePath:      basePath,
		OriginalQuery: originalQuery,
	}
}
