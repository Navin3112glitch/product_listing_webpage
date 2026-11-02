# QuickKart – Full Stack Product Listing and Shopping Cart Application

## 1. Project Overview

QuickKart is a full-stack e-commerce product listing application developed using React.js and Django REST Framework.

The application allows users to browse products, search for products, filter products by category, sort products by price and rating, view product details, and manage a shopping cart.

It also implements user registration, login, logout, and token-based authentication using Django REST Framework.

## 2. Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router DOM

### Backend
- Python
- Django
- Django REST Framework
- Django REST Framework Token Authentication

### Database
- SQLite

### Development Tools
- Visual Studio Code
- Node.js
- npm
- Git

## 3. Project Structure

```text
quickkart/
│
├── backend/
│   ├── accounts/
│   │   ├── migrations/
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   │
│   ├── products/
│   │   ├── management/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── index.html
│
└── dataset/
    └── products.json
```

## 4. System Requirements

Install the following software:

- Python 3.12
- Node.js 22 LTS
- npm
- Visual Studio Code

## 5. Installation and Setup

### Step 1: Extract the Project

Extract the QuickKart project ZIP file.

Open the extracted `quickkart` folder in Visual Studio Code.

Open the integrated terminal.

### Step 2: Set Up the Backend

Navigate to the backend directory:

```powershell
cd backend
```

Create a Python virtual environment:

```powershell
py -3.12 -m venv venv
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, execute:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate the environment again.

Install the required dependencies:

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Step 3: Configure the Database

Apply Django database migrations:

```powershell
python manage.py migrate
```

If starting with a fresh database, import the product dataset:

```powershell
python manage.py import_products
```

The product import command reads the JSON dataset and inserts products into the database.

### Step 4: Run the Backend Server

Start the Django development server:

```powershell
python manage.py runserver
```

Backend URL:

http://127.0.0.1:8000/

Product API:

http://127.0.0.1:8000/api/products/

Keep this terminal running.

### Step 5: Set Up the Frontend

Open a second terminal in VS Code.

Navigate to the frontend directory:

```powershell
cd frontend
```

Install frontend dependencies:

```powershell
npm install
```

### Step 6: Run the Frontend

Start the React development server:

```powershell
npm run dev
```

Frontend URL:

http://localhost:5173/

Open the URL in your browser to access QuickKart.

## 6. Application Features

### Product Listing
- Displays available products.
- Shows product names, images, categories, prices and ratings.
- Uses a responsive product grid.

### Search Functionality
- Search products by name.
- Search products by category.
- Search products by description.

### Category Filtering
- Electronics
- Jewellery
- Men's Clothing
- Women's Clothing

### Product Sorting
- Price: Low to High
- Price: High to Low
- Name: A to Z
- Name: Z to A
- Highest Rated

### Pagination
- Displays eight products per page.
- Provides Previous and Next navigation.
- Supports pagination with search and filtering.

### Product Details
- Displays individual product information.
- Shows product image, description, price and rating.

### Shopping Cart
- Add products to the cart.
- Increase product quantity.
- Decrease product quantity.
- Remove products.
- Calculate total price.
- Display cart item count.

### User Authentication
- User registration.
- User login.
- User logout.
- Token-based authentication.
- Protected user profile endpoint.

### Authorization
- Restricts profile access to authenticated users.
- Returns HTTP 401 for unauthenticated requests.
- Invalidates the authentication token on logout.

## 7. API Endpoints

### Product APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products/` | Retrieve products |
| GET | `/api/products/1/` | Retrieve individual product |
| GET | `/api/products/?search=shirt` | Search products |
| GET | `/api/products/?category=electronics` | Filter products |
| GET | `/api/products/?ordering=price` | Sort products |
| GET | `/api/products/?page=2` | Retrieve another page |

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Authenticate a user |
| POST | `/api/auth/logout/` | Logout and invalidate token |
| GET | `/api/auth/profile/` | Retrieve protected user profile |

## 8. Authentication Testing

### User Registration

POST:

```text
http://127.0.0.1:8000/api/auth/register/
```

Request body:

```json
{
    "username": "navin",
    "email": "navin@example.com",
    "password": "Navin123"
}
```

### User Login

POST:

```text
http://127.0.0.1:8000/api/auth/login/
```

Request body:

```json
{
    "username": "navin",
    "password": "Navin123"
}
```

The server returns an authentication token after successful login.

### Access Protected Profile

GET:

```text
http://127.0.0.1:8000/api/auth/profile/
```

Include the following HTTP header:

```text
Authorization: Token YOUR_AUTHENTICATION_TOKEN
```

A valid token provides access to the user profile.

Without a valid token, the API returns:

```text
401 Unauthorized
```

### User Logout

POST:

```text
http://127.0.0.1:8000/api/auth/logout/
```

Include the authentication token in the request header.

The token is deleted after successful logout.

## 9. Running the Project

Two terminals are required.

**Terminal 1 – Backend**

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

**Terminal 2 – Frontend**

```powershell
cd frontend
npm run dev
```

Open:

http://localhost:5173/

## 10. Important Notes

- The backend uses SQLite as its relational database.
- The cart is currently managed using React Context API and is stored in frontend memory.
- Cart contents are not persisted in the database.
- The application uses Django REST Framework Token Authentication.
- The displayed rupee symbol does not perform automatic USD-to-INR currency conversion.
- The project is configured for local development and testing.

## 11. Conclusion

QuickKart demonstrates full-stack web application development through React.js and Django REST Framework.

It integrates product management APIs, database operations, search, filtering, sorting, pagination, shopping cart functionality, and token-based user authentication.

The project provides practical experience in frontend development, backend API development, database integration, and web application security.