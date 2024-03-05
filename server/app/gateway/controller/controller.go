package controller

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"log/slog"
	"time"

	"go.mongodb.org/mongo-driver/mongo"

	"github.com/LuchaComics/cps-backend/adapter/cache/mongodbcache"
	pm "github.com/LuchaComics/cps-backend/adapter/paymentprocessor/stripe"
	"github.com/LuchaComics/cps-backend/adapter/templatedemailer"
	gateway_s "github.com/LuchaComics/cps-backend/app/gateway/datastore"
	store_s "github.com/LuchaComics/cps-backend/app/store/datastore"
	user_s "github.com/LuchaComics/cps-backend/app/user/datastore"
	"github.com/LuchaComics/cps-backend/config"
	"github.com/LuchaComics/cps-backend/provider/jwt"
	"github.com/LuchaComics/cps-backend/provider/kmutex"
	"github.com/LuchaComics/cps-backend/provider/password"
	"github.com/LuchaComics/cps-backend/provider/uuid"
)

type GatewayController interface {
	Register(ctx context.Context, req *gateway_s.RegisterRequestIDO) error
	Login(ctx context.Context, email, password string) (*gateway_s.LoginResponseIDO, error)
	GetUserBySessionID(ctx context.Context, sessionID string) (*user_s.User, error)
	RefreshToken(ctx context.Context, value string) (*user_s.User, string, time.Time, string, time.Time, error)
	Verify(ctx context.Context, code string) error
	Logout(ctx context.Context) error
	ForgotPassword(ctx context.Context, email string) error
	PasswordReset(ctx context.Context, code string, password string) error
	Profile(ctx context.Context) (*user_s.User, error)
	ProfileUpdate(ctx context.Context, nu *user_s.User) error
	ProfileChangePassword(ctx context.Context, req *ProfileChangePasswordRequestIDO) error
	//TODO: Add more...
}

type GatewayControllerImpl struct {
	Config           *config.Conf
	Logger           *slog.Logger
	UUID             uuid.Provider
	JWT              jwt.Provider
	Kmutex           kmutex.Provider
	Password         password.Provider
	Cache            mongodbcache.Cacher
	DbClient         *mongo.Client
	TemplatedEmailer templatedemailer.TemplatedEmailer
	PaymentProcessor pm.PaymentProcessor
	UserStorer       user_s.UserStorer
	StoreStorer      store_s.StoreStorer
}

func NewController(
	appCfg *config.Conf,
	loggerp *slog.Logger,
	uuidp uuid.Provider,
	jwtp jwt.Provider,
	kmx kmutex.Provider,
	passwordp password.Provider,
	cache mongodbcache.Cacher,
	client *mongo.Client,
	te templatedemailer.TemplatedEmailer,
	paymentProcessor pm.PaymentProcessor,
	usr_storer user_s.UserStorer,
	org_storer store_s.StoreStorer,
) GatewayController {
	s := &GatewayControllerImpl{
		Config:           appCfg,
		Logger:           loggerp,
		UUID:             uuidp,
		JWT:              jwtp,
		Kmutex:           kmx,
		Password:         passwordp,
		Cache:            cache,
		DbClient:         client,
		TemplatedEmailer: te,
		PaymentProcessor: paymentProcessor,
		UserStorer:       usr_storer,
		StoreStorer:      org_storer,
	}
	s.Logger.Debug("gateway controller initialization started...")

	// Execute the code which will check to see if we have an initial account
	// if not then we'll need to create it.
	if err := s.createInitialRootAdmin(context.Background()); err != nil {
		log.Fatal(err) // We terminate app here b/c dependency injection not allowed to fail, so fail here at startup of dynamodb.
	}

	s.Logger.Debug("gateway controller initialized")
	return s
}

func (impl *GatewayControllerImpl) GetUserBySessionID(ctx context.Context, sessionID string) (*user_s.User, error) {
	impl.Logger.Debug("gateway controller initialization started...")

	userBytes, err := impl.Cache.Get(ctx, sessionID)
	if err != nil {
		return nil, err
	}
	if userBytes == nil {
		impl.Logger.Warn("record not found")
		return nil, errors.New("record not found")
	}
	var user user_s.User
	err = json.Unmarshal(userBytes, &user)
	if err != nil {
		impl.Logger.Error("unmarshalling failed", slog.Any("err", err))
		return nil, err
	}

	impl.Logger.Debug("gateway controller initialized")
	return &user, nil
}
