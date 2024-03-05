package controller

import (
	"context"
	"fmt"

	"log/slog"

	s_d "github.com/LuchaComics/cps-backend/app/comicsub/datastore"
)

func (impl *ComicSubmissionControllerImpl) sendNewComicSubmissionEmails(m *s_d.ComicSubmission) error {
	//
	// ROOT
	//

	impl.Logger.Debug("sending to root staff",
		slog.Any("submission-id", m.ID))

	response, err := impl.UserStorer.ListAllRootStaff(context.Background())
	if err != nil {
		impl.Logger.Error("database list all staff error", slog.Any("error", err))
		return err
	}

	emails := []string{}
	for _, u := range response.Results {
		emails = append(emails, u.Email)
	}

	if err := impl.TemplatedEmailer.SendNewComicSubmissionEmailToStaff(emails, m.ID.Hex(), m.StoreName, fmt.Sprintf("%v, Vol. %v, Issue #%v", m.SeriesTitle, m.IssueVol, m.IssueNo), m.CPSRN); err != nil {
		impl.Logger.Error("database list all retailer error", slog.Any("error", err))
		return err
	}

	//
	// RETAILERS
	//

	impl.Logger.Debug("sending to all retailer staff",
		slog.Any("submission-id", m.ID),
		slog.Any("store-id", m.StoreID))

	response, err = impl.UserStorer.ListAllRetailerStaffForStoreID(context.Background(), m.StoreID)
	if err != nil {
		impl.Logger.Error("database list all retailer error", slog.Any("error", err))
		return err
	}

	emails = []string{} // Reset emails list from above
	for _, u := range response.Results {
		emails = append(emails, u.Email)
	}

	if err := impl.TemplatedEmailer.SendNewComicSubmissionEmailToRetailers(emails, m.ID.Hex(), m.StoreName, fmt.Sprintf("%v, Vol. %v, Issue #%v", m.SeriesTitle, m.IssueVol, m.IssueNo), m.CPSRN); err != nil {
		impl.Logger.Error("database list all retailer error", slog.Any("error", err))
		return err
	}

	return nil
}
