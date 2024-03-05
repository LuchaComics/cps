package controller

import (
	"context"
	"time"

	"log/slog"

	"github.com/LuchaComics/cps-backend/utils/httperror"
	"go.mongodb.org/mongo-driver/mongo"
)

func (impl *GatewayControllerImpl) Verify(ctx context.Context, code string) error {
	impl.Kmutex.Lock(code)
	defer func() {
		impl.Kmutex.Unlock(code)
	}()

	////
	//// Start the transaction.
	////

	session, err := impl.DbClient.StartSession()
	if err != nil {
		impl.Logger.Error("start session error",
			slog.Any("error", err))
		return err
	}
	defer session.EndSession(ctx)

	// Define a transaction function with a series of operations
	transactionFunc := func(sessCtx mongo.SessionContext) (interface{}, error) {

		// Lookup the user in our database, else return a `400 Bad Request` error.
		u, err := impl.UserStorer.GetByVerificationCode(sessCtx, code)
		if err != nil {
			impl.Logger.Error("database error", slog.Any("err", err))
			return nil, err
		}
		if u == nil {
			impl.Logger.Warn("user does not exist validation error")
			return nil, httperror.NewForBadRequestWithSingleField("code", "does not exist")
		}

		//TODO: Handle expiry dates.

		// Verify the user.
		u.WasEmailVerified = true
		u.ModifiedAt = time.Now()
		if err := impl.UserStorer.UpdateByID(sessCtx, u); err != nil {
			impl.Logger.Error("update error", slog.Any("err", err))
			return nil, err
		}

		//
		// Send notification to staff
		//

		o, err := impl.StoreStorer.GetByID(sessCtx, u.StoreID)
		if err != nil {
			impl.Logger.Error("database error", slog.Any("err", err))
			return nil, err
		}
		if o == nil {
			impl.Logger.Warn("store does not exist validation error")
			return nil, httperror.NewForBadRequestWithSingleField("code", "does not exist")
		}

		// If nothing was returned then proceed to send the notification and then
		// track that it was already sent.
		if o.PendingReviewEmailSent == false {
			// Send email to root staff to inform them of a pending review.
			res, err := impl.UserStorer.ListAllRootStaff(sessCtx)
			if err != nil {
				impl.Logger.Error("database error", slog.Any("err", err))
				return nil, err
			}
			var emails []string
			for _, rootUser := range res.Results {
				emails = append(emails, rootUser.Email)
			}
			if err := impl.TemplatedEmailer.SendNewStoreEmailToStaff(emails, u.StoreID.Hex()); err != nil {
				impl.Logger.Error("failed sending verification email with error", slog.Any("err", err))
				return nil, err
			}

			// Keep track of this verification sent so we don't send it again.
			o.PendingReviewEmailSent = true
			if err := impl.StoreStorer.UpdateByID(sessCtx, o); err != nil {
				impl.Logger.Error("database error", slog.Any("err", err))
				return nil, err
			}
		}

		return nil, nil
	}

	// Start a transaction
	if _, err := session.WithTransaction(ctx, transactionFunc); err != nil {
		impl.Logger.Error("session failed error",
			slog.Any("error", err))
		return err
	}

	return nil
}
