package templatedemailer

import (
	"log/slog"

	mg "github.com/LuchaComics/cps-backend/adapter/emailer/mailgun"

	c "github.com/LuchaComics/cps-backend/config"
	"github.com/LuchaComics/cps-backend/provider/uuid"
)

// TemplatedEmailer Is adapter for responsive HTML email templates sender.
type TemplatedEmailer interface {
	SendNewUserTemporaryPasswordEmail(email, firstName, temporaryPassword string) error
	SendVerificationEmail(email, verificationCode, firstName string) error
	SendForgotPasswordEmail(email, verificationCode, firstName string) error
	SendNewComicSubmissionEmailToStaff(staffEmails []string, submissionID string, storeName string, item string, cpsrn string) error
	SendNewComicSubmissionEmailToRetailers(retailerEmails []string, submissionID string, storeName string, item string, cpsrn string) error
	SendNewStoreEmailToStaff(staffEmails []string, storeID string) error
	SendRetailerStoreActiveEmailToRetailers(retailerEmails []string, storeName string) error
}

type templatedEmailer struct {
	UUID    uuid.Provider
	Logger  *slog.Logger
	Emailer mg.Emailer
}

func NewTemplatedEmailer(cfg *c.Conf, logger *slog.Logger, uuidp uuid.Provider, emailer mg.Emailer) TemplatedEmailer {
	// Defensive code: Make sure we have access to the file before proceeding any further with the code.
	logger.Debug("templated emailer initializing...")
	logger.Debug("templated emailer initialized")

	return &templatedEmailer{
		UUID:    uuidp,
		Logger:  logger,
		Emailer: emailer,
	}
}
