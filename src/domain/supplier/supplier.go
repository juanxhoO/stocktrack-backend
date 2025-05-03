package supplier

import "time"

// User is a struct that contains the user information
type Supplier struct {
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
	GetAll() (*[]Supplier, error)
	GetByID(id int) (*Supplier, error)
	Create(newUser *Supplier) (*Supplier, error)
	GetOneByMap(userMap map[string]interface{}) (*Supplier, error)
	Delete(id int) error
	Update(id int, userMap map[string]interface{}) (*Supplier, error)
}
