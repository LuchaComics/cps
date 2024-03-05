//go:build wireinject
// +build wireinject

package main

import (
	"github.com/google/wire"

	"github.com/LuchaComics/cps-backend/adapter/cache/mongodbcache"
	"github.com/LuchaComics/cps-backend/adapter/emailer/mailgun"
	"github.com/LuchaComics/cps-backend/adapter/paymentprocessor/stripe"
	"github.com/LuchaComics/cps-backend/adapter/pdfbuilder"
	"github.com/LuchaComics/cps-backend/adapter/storage/mongodb"
	s3_storage "github.com/LuchaComics/cps-backend/adapter/storage/s3"
	"github.com/LuchaComics/cps-backend/adapter/templatedemailer"
	attachment_c "github.com/LuchaComics/cps-backend/app/attachment/controller"
	attachment_s "github.com/LuchaComics/cps-backend/app/attachment/datastore"
	comicsub_c "github.com/LuchaComics/cps-backend/app/comicsub/controller"
	comicsub_s "github.com/LuchaComics/cps-backend/app/comicsub/datastore"
	credit_c "github.com/LuchaComics/cps-backend/app/credit/controller"
	credit_s "github.com/LuchaComics/cps-backend/app/credit/datastore"
	customer_c "github.com/LuchaComics/cps-backend/app/customer/controller"
	eventlog_s "github.com/LuchaComics/cps-backend/app/eventlog/datastore"
	gateway_c "github.com/LuchaComics/cps-backend/app/gateway/controller"
	off_c "github.com/LuchaComics/cps-backend/app/offer/controller"
	off_s "github.com/LuchaComics/cps-backend/app/offer/datastore"
	strpayproc_c "github.com/LuchaComics/cps-backend/app/paymentprocessor/controller/stripe"
	receipt_c "github.com/LuchaComics/cps-backend/app/receipt/controller"
	receipt_s "github.com/LuchaComics/cps-backend/app/receipt/datastore"
	store_c "github.com/LuchaComics/cps-backend/app/store/controller"
	store_s "github.com/LuchaComics/cps-backend/app/store/datastore"
	user_c "github.com/LuchaComics/cps-backend/app/user/controller"
	user_s "github.com/LuchaComics/cps-backend/app/user/datastore"
	userpurchase_c "github.com/LuchaComics/cps-backend/app/userpurchase/controller"
	userpurchase_s "github.com/LuchaComics/cps-backend/app/userpurchase/datastore"
	"github.com/LuchaComics/cps-backend/config"
	"github.com/LuchaComics/cps-backend/inputport/http"
	attachment_http "github.com/LuchaComics/cps-backend/inputport/http/attachment"
	comicsub_http "github.com/LuchaComics/cps-backend/inputport/http/comicsub"
	credit_http "github.com/LuchaComics/cps-backend/inputport/http/credit"
	customer_http "github.com/LuchaComics/cps-backend/inputport/http/customer"
	gateway_http "github.com/LuchaComics/cps-backend/inputport/http/gateway"
	"github.com/LuchaComics/cps-backend/inputport/http/middleware"
	off_http "github.com/LuchaComics/cps-backend/inputport/http/offer"
	strpayproc_http "github.com/LuchaComics/cps-backend/inputport/http/paymentprocessor/stripe"
	receipt_http "github.com/LuchaComics/cps-backend/inputport/http/receipt"
	store_http "github.com/LuchaComics/cps-backend/inputport/http/store"
	user_http "github.com/LuchaComics/cps-backend/inputport/http/user"
	userpurchase_http "github.com/LuchaComics/cps-backend/inputport/http/userpurchase"
	"github.com/LuchaComics/cps-backend/provider/cpsrn"
	"github.com/LuchaComics/cps-backend/provider/jwt"
	"github.com/LuchaComics/cps-backend/provider/kmutex"
	"github.com/LuchaComics/cps-backend/provider/logger"
	"github.com/LuchaComics/cps-backend/provider/password"
	"github.com/LuchaComics/cps-backend/provider/time"
	"github.com/LuchaComics/cps-backend/provider/uuid"
)

func InitializeEvent() Application {
	// Our application is dependent on the following Golang packages. We need to
	// provide them to Google wire so it can sort out the dependency injection
	// at compile time.
	wire.Build(
		config.New,
		uuid.NewProvider,
		time.NewProvider,
		logger.NewProvider,
		jwt.NewProvider,
		kmutex.NewProvider,
		mailgun.NewEmailer,
		templatedemailer.NewTemplatedEmailer,
		password.NewProvider,
		cpsrn.NewProvider,
		mongodb.NewStorage,
		mongodbcache.NewCache,
		s3_storage.NewStorage,
		pdfbuilder.NewCBFFBuilder,
		pdfbuilder.NewPCBuilder,
		pdfbuilder.NewCCIMGBuilder,
		pdfbuilder.NewCCSCBuilder,
		pdfbuilder.NewCCBuilder,
		pdfbuilder.NewCCUGBuilder,
		stripe.NewPaymentProcessor,
		eventlog_s.NewDatastore,
		user_s.NewDatastore,
		user_c.NewController,
		customer_c.NewController,
		store_s.NewDatastore,
		store_c.NewController,
		off_s.NewDatastore,
		off_c.NewController,
		receipt_s.NewDatastore,
		receipt_c.NewController,
		userpurchase_s.NewDatastore,
		userpurchase_c.NewController,
		comicsub_s.NewDatastore,
		comicsub_c.NewController,
		strpayproc_c.NewController,
		gateway_c.NewController,
		attachment_s.NewDatastore,
		attachment_c.NewController,
		credit_s.NewDatastore,
		credit_c.NewController,
		strpayproc_http.NewHandler,
		gateway_http.NewHandler,
		user_http.NewHandler,
		receipt_http.NewHandler,
		userpurchase_http.NewHandler,
		customer_http.NewHandler,
		store_http.NewHandler,
		off_http.NewHandler,
		comicsub_http.NewHandler,
		attachment_http.NewHandler,
		credit_http.NewHandler,
		middleware.NewMiddleware,
		http.NewInputPort,
		NewApplication)
	return Application{}
}
