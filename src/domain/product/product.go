package product

import "time"

// User is a struct that contains the user information
type Product struct {
	ID        int
	Stock     string
	Name      string
	SKU       string
	Category  string
	Status    bool
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Service is the interface that provides user methods
type IProductService interface {
	GetAll() (*[]Product, error)
	GetByID(id int) (*Product, error)
	Create(newUser *Product) (*Product, error)
	GetOneByMap(userMap map[string]interface{}) (*Product, error)
	Delete(id int) error
	Update(id int, userMap map[string]interface{}) (*Product, error)
}
