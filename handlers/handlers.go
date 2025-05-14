package handlers

import (
	"mymodules/gofolio/components"
	"mymodules/gofolio/i18n"
	"mymodules/gofolio/utils"
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	pCtx := i18n.NewPageContext(r)

	component := components.Home(pCtx)
	component.Render(r.Context(), w)
}

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	pCtx := i18n.NewPageContext(r)

	component := components.About(pCtx)
	component.Render(r.Context(), w)
}

func ServiceHandler(w http.ResponseWriter, r *http.Request) {
	pCtx := i18n.NewPageContext(r)

	component := components.Services(pCtx)
	component.Render(r.Context(), w)
}

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	pCtx := i18n.NewPageContext(r)

	component := components.Projects(pCtx)
	component.Render(r.Context(), w)
}

func ArtsHandler(w http.ResponseWriter, r *http.Request) {
	pCtx := i18n.NewPageContext(r)

	images, err := utils.GetImageFilenames()
	if err != nil {
		http.Error(w, "Unable to load images", http.StatusInternalServerError)
		return
	}

	component := components.Arts(images, pCtx)
	component.Render(r.Context(), w)
}
