package handlers

import (
	"net/http"

	"mymodules/gofolio/i18n"

	"github.com/a-h/templ"
)

// PageRenderer is a function that renders a Templ component
type PageRenderer func(i18n.PageContext) templ.Component

// NewPageHandler creates a simple page handler from a component renderer
// This eliminates repetitive boilerplate for simple page handlers
func NewPageHandler(renderer PageRenderer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		pCtx := i18n.NewPageContext(r)
		component := renderer(pCtx)
		component.Render(r.Context(), w)
	}
}
