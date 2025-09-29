# 🛒 MERN E-Commerce  

A full-stack **E-Commerce Web Application** built with the **MERN stack**, featuring authentication, product management, shopping cart, secure Stripe payments, and Redis caching for performance.  

---

## ✨ Features  
- 🔐 **Authentication & Authorization** – Secure login/register with JWT & Redis  
- 🛍️ **Product Catalog** – Browse, search, and filter products  
- 🛒 **Shopping Cart** – Add/remove items with real-time updates  
- 💳 **Payments** – Secure checkout using Stripe  
- 📦 **Order Management** – Track past orders and statuses  
- ⚡ **Performance Boost** – Redis caching for optimized responses  

---

## 🛠️ Tech Stack  
- **Frontend:** React, Redux, TailwindCSS  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Caching:** Redis  
- **Payments:** Stripe  
- **Other Tools:** JWT, REST APIs  

---

## 📂 Project Structure  
src/
├── backend/
│ ├── controllers/ # Auth, Products, Orders
│ ├── models/ # Database Schemas
│ ├── routes/ # API Endpoints
│ ├── utils/ # JWT, Redis, Stripe Helpers
│
├── frontend/
│ ├── components/ # Reusable UI Components
│ ├── pages/ # Pages (Home, Cart, Checkout)
│ ├── redux/ # State Management
│
├── tests/ # Unit & Integration Tests
docs/ # Documentation
