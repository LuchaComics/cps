package datastore

import (
	"time"

	user_s "github.com/LuchaComics/cps-backend/app/user/datastore"
)

const (
	UserStatusActive   = 1
	UserInactiveStatus = 2
)

type RegisterRequestIDO struct {
	FirstName                    string `json:"first_name"`
	LastName                     string `json:"last_name"`
	Email                        string `json:"email"`
	Password                     string `json:"password"`
	PasswordRepeated             string `json:"password_repeated"`
	ComicBookStoreName           string `json:"comic_book_store_name,omitempty"`
	Phone                        string `json:"phone,omitempty"`
	Country                      string `json:"country,omitempty"`
	Region                       string `json:"region,omitempty"`
	City                         string `json:"city,omitempty"`
	PostalCode                   string `json:"postal_code,omitempty"`
	AddressLine1                 string `json:"address_line1,omitempty"`
	AddressLine2                 string `json:"address_line2,omitempty"`
	StoreLogo                    string `json:"store_logo,omitempty"`
	HowDidYouHearAboutUs         int8   `json:"how_did_you_hear_about_us,omitempty"`
	HowDidYouHearAboutUsOther    string `json:"how_did_you_hear_about_us_other,omitempty"`
	HowLongStoreOperating        int8   `json:"how_long_store_operating,omitempty"`
	GradingComicsExperience      string `json:"grading_comics_experience,omitempty"`
	RetailPartnershipReason      string `bson:"retail_partnership_reason" json:"retail_partnership_reason,omitempty"` // "Please describe how you could become a good retail partner for CPS"
	CPSPartnershipReason         string `bson:"cps_partnership_reason" json:"cps_partnership_reason,omitempty"`       // "Please describe how CPS could help you grow your business"
	AgreeTOS                     bool   `json:"agree_tos,omitempty"`
	AgreePromotionsEmail         bool   `json:"agree_promotions_email,omitempty"`
	HasShippingAddress           bool   `json:"has_shipping_address,omitempty"`
	ShippingName                 string `json:"shipping_name,omitempty"`
	ShippingPhone                string `json:"shipping_phone,omitempty"`
	ShippingCountry              string `json:"shipping_country,omitempty"`
	ShippingRegion               string `json:"shipping_region,omitempty"`
	ShippingCity                 string `json:"shipping_city,omitempty"`
	ShippingPostalCode           string `json:"shipping_postal_code,omitempty"`
	ShippingAddressLine1         string `json:"shipping_address_line1,omitempty"`
	ShippingAddressLine2         string `json:"shipping_address_line2,omitempty"`
	WebsiteURL                   string `bson:"website_url" json:"website_url"`
	EstimatedSubmissionsPerMonth int8   `bson:"estimated_submissions_per_month" json:"estimated_submissions_per_month"`
	HasOtherGradingService       int8   `bson:"has_other_grading_service" json:"has_other_grading_service"`
	OtherGradingServiceName      string `bson:"other_grading_service_name" json:"other_grading_service_name"`
	RequestWelcomePackage        int8   `bson:"request_welcome_package" json:"request_welcome_package"`
	Timezone                     string `bson:"timezone" json:"timezone"`
}

type RegisterResponseIDO struct {
	User                   *user_s.User `json:"user"`
	AccessToken            string       `json:"access_token"`
	AccessTokenExpiryTime  time.Time    `json:"access_token_expiry_time"`
	RefreshToken           string       `json:"refresh_token"`
	RefreshTokenExpiryTime time.Time    `json:"refresh_token_expiry_time"`
}

type LoginResponseIDO struct {
	User                   *user_s.User `json:"user"`
	AccessToken            string       `json:"access_token"`
	AccessTokenExpiryTime  time.Time    `json:"access_token_expiry_time"`
	RefreshToken           string       `json:"refresh_token"`
	RefreshTokenExpiryTime time.Time    `json:"refresh_token_expiry_time"`
}
