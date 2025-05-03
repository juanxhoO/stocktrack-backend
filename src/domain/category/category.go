package category

import "time"

// User is a struct that contains the user information
type Category struct {
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
	GetAll() (*[]Category, error)
	GetByID(id int) (*Category, error)
	Create(newUser *Category) (*Category, error)
	GetOneByMap(userMap map[string]interface{}) (*Category, error)
	Delete(id int) error
	Update(id int, userMap map[string]interface{}) (*Category, error)
}
