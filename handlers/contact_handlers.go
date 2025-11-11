package handlers

import (
	"log"
	"net/http"
	"os"

	"mymodules/gofolio/i18n"
	"mymodules/gofolio/utils"
	"mymodules/gofolio/views/forms"

	"github.com/kataras/hcaptcha"
)

var captchaClient *hcaptcha.Client

func InitCaptchaClient() {
	secret := os.Getenv("HCAPTCHA_SECRET_KEY")
	if secret == "" {
		log.Fatal("FATAL: HCAPTCHA_SECRET_KEY is not set. Cannot initialize hCaptcha client.")
	}
	captchaClient = hcaptcha.New(secret)
	log.Println("INFO: hCaptcha client initialized successfully.")
}

func renderContactFull(w http.ResponseWriter, r *http.Request, data forms.ContactFormData, statusCode int) {
	pCtx := i18n.NewPageContext(r)
	w.WriteHeader(statusCode)
	if err := forms.Contact(data, pCtx).Render(r.Context(), w); err != nil {
		log.Printf("ERROR: Error rendering 'forms.Contact' component: %v. Status Code: %d. Form ErrorMessage: '%s', Form SuccessMessage: '%s'", err, statusCode, data.ErrorMessage, data.SuccessMessage)
	}
}

func renderContactPartial(w http.ResponseWriter, r *http.Request, data forms.ContactFormData, statusCode int) {
	pCtx := i18n.NewPageContext(r)
	w.WriteHeader(statusCode)
	if err := forms.ContactFormPartial(data, pCtx).Render(r.Context(), w); err != nil {
		log.Printf("ERROR: Error rendering 'forms.ContactFormPartial' component: %v. Status Code: %d. Form ErrorMessage: '%s', Form SuccessMessage: '%s'", err, statusCode, data.ErrorMessage, data.SuccessMessage)
	}
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	var formData forms.ContactFormData

	if r.Method == http.MethodPost {
		if err := r.ParseForm(); err != nil {
			log.Printf("ERROR: Error parsing form: %v", err)
			formData.ErrorMessage = "An internal error occurred. Please try again later."
			renderContactPartial(w, r, formData, http.StatusInternalServerError)
			return
		}

		formData.Website = r.FormValue("website")
		formData.FirstName = r.FormValue("firstname")
		formData.LastName = r.FormValue("lastname")
		formData.Email = r.FormValue("email")
		formData.Phone = r.FormValue("phone")
		formData.Service = r.FormValue("service")
		formData.Message = r.FormValue("message")

		if formData.Website != "" {
			log.Println("INFO: Honeypot field filled, contact form submission cancelled.")
			successFormData := forms.ContactFormData{
				SuccessMessage: "Your message was sent successfully! (Honeypot triggered)",
			}
			renderContactPartial(w, r, successFormData, http.StatusOK)
			return
		}

		captchaResp := captchaClient.VerifyToken(r.FormValue("h-captcha-response"))
		if !captchaResp.Success {
			log.Printf("WARN: hCaptcha verification failed: %+v", captchaResp)
			formData.ErrorMessage = "Captcha verification failed. Please try again."
			renderContactPartial(w, r, formData, http.StatusBadRequest)
			return
		}

		if formData.FirstName == "" || formData.LastName == "" || formData.Email == "" || formData.Message == "" {
			formData.ErrorMessage = "Please fill out all required fields (First Name, Last Name, Email, and Message)."
			renderContactPartial(w, r, formData, http.StatusBadRequest)
			return
		}

		resendAPIKey := os.Getenv("RESEND_API_KEY")
		senderEmail := os.Getenv("SENDER_EMAIL")
		recipientEmail := os.Getenv("RECIPIENT_EMAIL")

		if resendAPIKey == "" || senderEmail == "" || recipientEmail == "" {
			log.Println("ERROR: Email environment variables not (fully) set. Cannot send mail.")
			formData.ErrorMessage = "Your message could not be sent due to a server configuration issue. Please use the email address in the footer."
			renderContactPartial(w, r, formData, http.StatusInternalServerError)
			return
		}

		emailCfg := utils.SendContactMailConfig{
			ResendAPIKey:   resendAPIKey,
			SenderEmail:    senderEmail,
			RecipientEmail: recipientEmail,
		}

		_, emailErr := utils.SendContactMail(emailCfg, formData)
		if emailErr != nil {
			log.Printf("ERROR: Error from utils.SendContactMail: %v\n", emailErr)
			formData.ErrorMessage = "Your message could not be sent. Please try again later or use the email address in the footer."
			renderContactPartial(w, r, formData, http.StatusInternalServerError)
			return
		}

		log.Printf("INFO: Email successfully processed for %s %s (%s) and dispatch initiated.\n", formData.FirstName, formData.LastName, formData.Email)
		successFormData := forms.ContactFormData{
			SuccessMessage: "Your message was sent successfully! I will get back to you as soon as possible.",
		}
		renderContactPartial(w, r, successFormData, http.StatusOK)
		return

	} else if r.Method == http.MethodGet {
		renderContactFull(w, r, formData, http.StatusOK)
		return
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
