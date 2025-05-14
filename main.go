package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"github.com/sashabaranov/go-openai"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

var openaiClient *openai.Client
var jwtSecret = []byte("your_jwt_secret")

// User model
type User struct {
	ID       uuid.UUID `gorm:"primaryKey;autoIncrement"`
	Username string    `gorm:"unique"`
	Password string    `json:"password"`
}

// JWT Claims
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

type ChatRequest struct {
	Message string `json:"message"` // Must match "message" in JSON
}

type ChatResponse struct {
	Reply string `json:"reply"`
}

func initDB() {
	dsn := "host=localhost user=bhavika password=bhavika dbname=chatbotdb port=5432 sslmode=disable"
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	db.AutoMigrate(&User{})
}

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func checkPassword(hashedPassword, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)) == nil
}

func generateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func registerUser(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		log.Println("Invalid registration input:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		log.Println("Error hashing password:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}
	user.Password = hashedPassword

	if err := db.Create(&user).Error; err != nil {
		log.Println("Database error while registering user:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not register user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

func loginUser(c *gin.Context) {
	var input User
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Println("Invalid login input:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var user User
	if err := db.Where("username = ?", input.Username).First(&user).Error; err != nil {
		log.Println("Invalid login attempt for:", input.Username)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if !checkPassword(user.Password, input.Password) {
		log.Println("Incorrect password for:", input.Username)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := generateJWT(user.Username)
	if err != nil {
		log.Println("Error generating JWT for user:", user.Username, err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token})
}

func initOpenAI() {
	openaiClient = openai.NewClient("your_openai_api_key")
}
func getAIResponse(message string) (string, error) {
	cmd := exec.Command("python", "ex.py", message) // Run Python script
	output, err := cmd.CombinedOutput()             // Capture both stdout and stderr
	if err != nil {
		return "", fmt.Errorf("error executing Python script: %v", err)
	}

	return strings.TrimSpace(string(output)), nil
}
func chatResponse(c *gin.Context) {
	var req ChatRequest

	// Parse JSON request
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Println("Error parsing request:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	log.Println("User message:", req.Message)

	// // Initialize Ollama client
	// client, err := api.ClientFromEnvironment()
	// if err != nil {
	// 	log.Println("Failed to initialize Ollama client:", err)
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to Ollama"})
	// 	return
	// }

	// // Define chat request
	// chatReq := api.ChatRequest{
	// 	Model: "llama3.2", // Change if using a different model
	// 	Messages: []api.Message{
	// 		{Role: "system", Content: "You are a helpful mental health chatbot."},
	// 		{Role: "user", Content: req.Message},
	// 	},
	// }

	// // Variable to store AI response
	// var aiResponse string

	// // Call Ollama API with a callback function
	// err = client.Chat(context.Background(), &chatReq, func(resp api.ChatResponse) error {
	// 	aiResponse = resp.Message.Content
	// 	return nil
	// })

	// if err != nil {
	// 	log.Println("Ollama API error:", err)
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get AI response"})
	// 	return
	// }

	// log.Println("AI Response:", aiResponse)

	// // Send response back to frontend
	// c.JSON(http.StatusOK, ChatResponse{Reply: aiResponse})
	response, err := getAIResponse(req.Message)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	c.JSON(http.StatusOK, ChatResponse{Reply: response})
}

// func chatResponse(c *gin.Context) {
// 	var req struct {
// 		Message string `json:"message"`
// 	}

// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
// 		return
// 	}
// 	// //
// 	// 	MODEL = "llama3.2"
// 	// openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

// 	// resp = openai.chat.completions.create(
// 	//  model=MODEL,
// 	//  messages=[{"role": "user", "content": "What is 2 + 2?"}]
// 	// )

// 	// print(resp.choices[0].message.content)
// 	// //
// 	openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
// 	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
// 	resp, err := client.CreateChatCompletion(c, openai.ChatCompletionRequest{
// 		Model: "llama3.2",
// 		Messages: []openai.ChatCompletionMessage{
// 			{Role: "system", Content: "You are a helpful mental health chatbot."},
// 			{Role: "user", Content: req.Message},
// 		},
// 	})
// 	if err != nil {
// 		log.Println("OpenAI error:", err)
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get AI response"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, ChatResponse{Reply: resp.Choices[0].Message.Content})

// 	// client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
// 	// resp, err := client.CreateChatCompletion(c, openai.ChatCompletionRequest{
// 	// 	Model: openai.GPT4Turbo,
// 	// 	Messages: []openai.ChatCompletionMessage{
// 	// 		{Role: "system", Content: "You are a helpful mental health chatbot."},
// 	// 		{Role: "user", Content: req.Message},
// 	// 	},
// 	// })
// 	// if err != nil {
// 	// 	log.Println("OpenAI error:", err)
// 	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get AI response"})
// 	// 	return
// 	// }

// 	// c.JSON(http.StatusOK, ChatResponse{Reply: resp.Choices[0].Message.Content})
// }

func emergencyResponse(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "If you are in crisis, please reach out to professional helplines such as the National Suicide Prevention Lifeline at 988 (US) or similar services in your country."})
}

func main() {
	initDB()
	initOpenAI()

	r := gin.Default()
	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Allow frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/register", registerUser)
	r.POST("/login", loginUser)
	r.POST("/chat", chatResponse)
	r.GET("/emergency", emergencyResponse)
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "pong"})
	})
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Welcome to the Mental Health Chatbot API!"})
	})
	r.SetTrustedProxies(nil) // Use "nil" if you're not using a proxy

	fmt.Println("Server is running on port 8080")
	r.Run(":8080")

}
