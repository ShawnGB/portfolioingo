package handlers

import (
	"mymodules/gofolio/components"
	"mymodules/gofolio/utils"
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	component := components.Home()
	component.Render(r.Context(), w)
}

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	component := components.About()
	component.Render(r.Context(), w)
}

func ServiceHandler(w http.ResponseWriter, r *http.Request) {
	component := components.Services()
	component.Render(r.Context(), w)
}

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	component := components.Projects()
	component.Render(r.Context(), w)
}

func ArtsHandler(w http.ResponseWriter, r *http.Request) {
	images, err := utils.GetImageFilenames()
	if err != nil {
		http.Error(w, "Unable to load images", http.StatusInternalServerError)
		return
	}

	component := components.Arts(images)
	component.Render(r.Context(), w)
}

func Contacthandler(w http.ResponseWriter, r *http.Request) {
	component := components.Contact()
	component.Render(r.Context(), w)
}
