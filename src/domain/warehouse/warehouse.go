package warehouse

import "time"

// User is a struct that contains the user information
type Warehouse struct {
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
	GetAll() (*[]Warehouse, error)
	GetByID(id int) (*Warehouse, error)
	Create(newUser *Warehouse) (*Warehouse, error)
	GetOneByMap(userMap map[string]interface{}) (*Warehouse, error)
	Delete(id int) error
	Update(id int, userMap map[string]interface{}) (*Warehouse, error)
}
