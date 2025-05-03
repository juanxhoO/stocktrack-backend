package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	_ "github.com/gbrayhan/microservices-go/docs"
	"github.com/gbrayhan/microservices-go/src/infrastructure/repository"
	"github.com/gbrayhan/microservices-go/src/infrastructure/rest/middlewares"
	"github.com/gbrayhan/microservices-go/src/infrastructure/rest/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:6767

// @securityDefinitions.basic  BasicAuth

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
	router := gin.Default()
	router.Use(cors.Default())
	DB, err := repository.InitDB()
	if err != nil {
		panic(fmt.Errorf("error inicializando la base de datos: %w", err))
	}

	router.Use(middlewares.ErrorHandler())
	router.Use(middlewares.GinBodyLogMiddleware)
	router.Use(middlewares.CommonHeaders)
	routes.ApplicationRouter(router, DB)

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}
	s := &http.Server{
		Addr:           ":" + port,
		Handler:        router,
		ReadTimeout:    18000 * time.Second,
		WriteTimeout:   18000 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	fmt.Printf("Servidor corriendo en http://localhost:%s\n", port)
	if err := s.ListenAndServe(); err != nil {
		panic(strings.ToLower(err.Error()))
	}
}
