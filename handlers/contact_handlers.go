package handlers

import (
	"log"
	"mymodules/gofolio/components"
	"mymodules/gofolio/utils"
	"net/http"
	"os"
)

func renderContact(w http.ResponseWriter, r *http.Request, data components.ContactFormData, statusCode int) {
	w.WriteHeader(statusCode)
	if err := components.Contact(data).Render(r.Context(), w); err != nil {
		log.Printf("Error rendering 'components.Contact' component: %v. Status Code: %d. Form ErrorMessage: '%s', Form SuccessMessage: '%s'", err, statusCode, data.ErrorMessage, data.SuccessMessage)
	}
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	var formData components.ContactFormData

	if r.Method == http.MethodPost {
		if err := r.ParseForm(); err != nil {
			log.Printf("Error parsing form: %v", err)
			formData.ErrorMessage = "An internal error occurred. Please try again later."
			renderContact(w, r, formData, http.StatusInternalServerError)
			return
		}

		formData.FirstName = r.FormValue("firstname")
		formData.LastName = r.FormValue("lastname")
		formData.Email = r.FormValue("email")
		formData.Phone = r.FormValue("phone")
		formData.Service = r.FormValue("service")
		formData.Message = r.FormValue("message")

		if formData.FirstName == "" || formData.LastName == "" || formData.Email == "" || formData.Message == "" {
			formData.ErrorMessage = "Please fill out all required fields (First Name, Last Name, Email, and Message)."
			renderContact(w, r, formData, http.StatusBadRequest)
			return
		}

		resendAPIKey := os.Getenv("RESEND_API_KEY")
		senderEmail := os.Getenv("SENDER_EMAIL")
		recipientEmail := os.Getenv("RECIPIENT_EMAIL")

		if resendAPIKey == "" || senderEmail == "" || recipientEmail == "" {
			log.Println("Handler: Email environment variables not (fully) set.")
			formData.ErrorMessage = "Your message could not be sent due to a server configuration issue. Please use the email address in the footer."
			renderContact(w, r, formData, http.StatusInternalServerError)
			return
		}

		emailCfg := utils.SendContactMailConfig{
			ResendAPIKey:   resendAPIKey,
			SenderEmail:    senderEmail,
			RecipientEmail: recipientEmail,
		}

		_, emailErr := utils.SendContactMail(emailCfg, formData)
		if emailErr != nil {
			log.Printf("Handler: Error from utils.SendContactMail: %v\n", emailErr)
			formData.ErrorMessage = "Your message could not be sent. Please try again later or use the email address in the footer."
			renderContact(w, r, formData, http.StatusInternalServerError)
			return
		}

		log.Printf("Handler: Email successfully processed for %s %s (%s) and dispatch initiated.\n", formData.FirstName, formData.LastName, formData.Email)
		successFormData := components.ContactFormData{
			SuccessMessage: "Your message was sent successfully! I will get back to you as soon as possible.",
		}
		renderContact(w, r, successFormData, http.StatusOK)
		return

	} else if r.Method == http.MethodGet {
		renderContact(w, r, formData, http.StatusOK)
		return
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
