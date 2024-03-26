package httptransport

import (
	store_c "github.com/LuchaComics/cps-backend/app/store/controller"
)

// Handler Creates http request handler
type Handler struct {
	Controller store_c.StoreController
}

// NewHandler Constructor
func NewHandler(c store_c.StoreController) *Handler {
	return &Handler{
		Controller: c,
	}
}
