# 🛒 E-commerce Nth Order Discount System
This project is a back-end service simulating a simplified e-commerce checkout and admin system. Its core feature is a single-use coupon generation system that triggers after every $N$th placed order.

## ✨ Features
* Cart Calculation: Calculates the subtotal of a cart based on static product prices.
* Sequential Ordering: Tracks the global order count in an in-memory store.
* $N$th Order Logic: Automatically marks the $N$th order (and every subsequent $N$th order) as eligible for coupon generation.
* Single-Use Coupon: An Admin endpoint generates a unique, single-use 10% discount code for the last eligible order.
* Redemption: The generated code can be used once on a subsequent order.
* In-Memory Store: All data (orders, coupon codes) is kept in memory and resets upon server restart.


⚙️ Technology Stack
Technology,Purpose
Node.js,Runtime Environment
TypeScript,"Primary Language, ensuring strong typing"
Express.js,Web Framework for API creation
ts-node,Runs TypeScript files directly during development


------------------------------------

## 🚀 Setup and Installation

### Prerequisites:
    * Node.js (v18+)
    * npm or yarn

## Steps:
1. Clone the Repository:
```bash
git clone [Your Repository URL]
cd ecommerce
```

2. Install Dependencies:
```bash
npm install
```

3. Create .env File: Create a file named .env in the project root and define the discount configuration.
```bash
# .env
# The 'n' value: Every NTH_ORDER_TRIGGER order gets a coupon.
NTH_ORDER_TRIGGER=5 

# The fixed discount percentage
DISCOUNT_PERCENTAGE=10
```

## ▶️ Running the Application
1. Start the Server (Development Mode)
```bash
npm run dev
```
The server will start on http://localhost:3000.

## API Endpoints
The API is divided into two primary services: Client (Checkout) and Admin.

## Base URL
http://localhost:3000/api/v1

1. Client Endpoint

Request Body (Example)
```bash
{
  "cartItems": [
    {"productId": "P001", "quantity": 2}, 
    {"productId": "P003", "quantity": 1} 
  ],
  "couponCode": "D-A1B2C3D4"  // Optional. Include only when redeeming.
}
```

2. Admin Endpoints


## Demonstration Flow (Testing the N Logic)The full system can be demonstrated by following this sequence (assuming N=5):

