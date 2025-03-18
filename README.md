# Backend Setup (Go)

# Create project directory
mkdir travel-website
cd travel-website

# Create backend directory
mkdir backend
cd backend

# Initialize Go module
go mod init travel-website

# Install required Go packages
go get github.com/gorilla/mux
go get github.com/rs/cors
go get gorm.io/gorm
go get gorm.io/driver/sqlite

# Create main.go file
# [Copy the Go backend code from the first artifact here]

# Run the backend
go run main.go

# Frontend Setup (React)

# Create React app (in a new terminal)
cd travel-website
npx create-react-app frontend

# Navigate to frontend directory
cd frontend

# Install required packages
npm install react-router-dom
npm install bootstrap
npm install react-bootstrap

# Create the necessary directories
mkdir -p src/components
mkdir -p src/pages

# Create the necessary files
# [Create all the React component files from the second artifact]

# Add Bootstrap Icons to public/index.html
# Add this line in the <head> section:
# <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

# Start the React app
npm start