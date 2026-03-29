# 🛒 Products Website — Full Stack E-Commerce App

A full-stack e-commerce web application built with **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**. Features user authentication, product management, a shopping cart, infinite scroll, image uploads, and role-based admin controls — all deployed and live.

**Live Demo:** [products-website-using-redux.vercel.app](https://products-website-using-redux.vercel.app)

---

## 📸 Screenshots
<img width="1440" height="900" alt="Screenshot 2026-03-29 at 4 14 45 PM" src="https://github.com/user-attachments/assets/a88fafdc-a29f-4bd4-93e1-c2eea88f3921" />

### 🏠 Home — Product Listing
![Home Page](./screenshots/home.png)

### 👤 Profile — User Account
![Profile Page]("https://github.com/user-attachments/assets/a88fafdc-a29f-4bd4-93e1-c2eea88f3921")

### 🛒 Cart — Shopping Cart
![Cart Page](./screenshots/cart.png)

---

## ✨ Features

### 👤 User
- Register with profile photo upload
- Login / Logout with persistent session
- Update profile (username, email, password, avatar)
- Delete account
- Add products to cart, adjust quantity, remove items
- Search products by name
- Infinite scroll product listing

### 🔐 Admin
- Create new products with image upload
- Update existing product details and image
- Delete products
- Admin-only routes protected on both frontend and backend

### ⚙️ Technical Highlights
- **JWT authentication** using secure `httpOnly` cookies
- **Image compression** on the client before uploading
- **Cloud image storage** via ImageKit
- **Infinite scroll** with pagination (`skip` + `limit`)
- **Lazy-loaded routes** for better performance
- **Redux Toolkit** for global state management (user, cart, products, search)
- Deployed frontend on **Vercel**, backend on **Render**

---

## 🧱 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS v4      |
| State      | Redux Toolkit, React-Redux           |
| Routing    | React Router DOM v7                  |
| Forms      | React Hook Form                      |
| HTTP       | Axios                                |
| Backend    | Node.js, Express v5                  |
| Database   | MongoDB, Mongoose                    |
| Auth       | JWT (jsonwebtoken), bcrypt           |
| Images     | ImageKit, Multer                     |
| Deployment | Vercel (frontend), Render (backend)  |

---

## 📁 Project Structure

```
Products-website-using-redux/
├── front-end/
│   └── src/
│       ├── api/            # Axios instance configuration
│       ├── components/     # Reusable components (Nav, useInfiniteProducts)
│       ├── pages/
│       │   ├── admin/      # CreateProduct, ProductDetail
│       │   └── user/       # Cart, ProfileUser, SearchProducts
│       ├── routes/         # Route guards (AuthWrapper, LoginWrapper)
│       ├── store/
│       │   ├── actions/    # Async Redux actions (user, product, query)
│       │   └── reducers/   # Redux slices (userSlice, cartSlice, etc.)
│       └── utility/        # Image compression utility
└── back-end/
    └── src/
        ├── db/             # MongoDB connection
        ├── models/         # Mongoose schemas (User, Gadget)
        ├── router/         # Express routes (auth, gadgets, protect)
        └── services/       # ImageKit upload service
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)
- ImageKit account (for image uploads)

---

### 1. Clone the repository

```bash
git clone https://github.com/MdSaifu7/Products-website-using-redux.git
cd Products-website-using-redux
```

---

### 2. Backend Setup

```bash
cd back-end
npm install
```

Create a `.env` file in `back-end/`:

```env
PORT=3000
MONGO_DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend server:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd ../front-end
npm install
```

Open `src/api/AxiosConfig.jsx` and switch to the local backend URL:

```js
// For local development:
const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

// For production (already set):
// baseURL: "https://products-website-io.onrender.com"
```

Start the frontend:

```bash
npm run dev
```

App will be running at `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth Routes — `/auth`

| Method | Endpoint         | Description              | Protected |
|--------|------------------|--------------------------|-----------|
| POST   | `/register`      | Register a new user      | ❌        |
| POST   | `/login`         | Login, sets JWT cookie   | ❌        |
| PATCH  | `/user/cart`     | Update user's cart       | ✅        |
| PATCH  | `/user/update`   | Update user profile      | ✅        |

### Product Routes — `/gadgets`

| Method | Endpoint                    | Description                    | Admin Only |
|--------|-----------------------------|--------------------------------|------------|
| GET    | `/products`                 | Get products (paginated)       | ❌         |
| GET    | `/search?search=query`      | Search products by title       | ❌         |
| POST   | `/create/product`           | Create a new product           | ✅         |
| PATCH  | `/update/product/:id`       | Update a product               | ✅         |
| DELETE | `/products/:id`             | Delete a product               | ✅         |

---

## 🔐 Authentication Flow

1. User logs in → backend verifies credentials → signs a JWT → stores it in an `httpOnly` cookie
2. All protected routes send the cookie automatically via `withCredentials: true` on Axios
3. The backend `protectRoute` middleware verifies the JWT on every protected request
4. User data (non-sensitive fields) is also stored in `localStorage` to persist login across page refreshes

---

## 🌐 Deployment

| Service  | Platform | URL |
|----------|----------|-----|
| Frontend | Vercel   | [products-website-using-redux.vercel.app](https://products-website-using-redux.vercel.app) |
| Backend  | Render   | [products-website-io.onrender.com](https://products-website-io.onrender.com) |

> **Note:** The Render free tier spins down after inactivity. The first request after idle may take ~30 seconds.

---

## 👨‍💻 Author

**Md Saif Khan Ahmad**  
BCA Student — 2nd Year  
GitHub: [@MdSaifu7](https://github.com/MdSaifu7)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
