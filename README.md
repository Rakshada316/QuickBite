# 🍔 QuickBite – Online Food Ordering System

QuickBite is a simple online food ordering web application developed using **Node.js and Express.js**. This project demonstrates **server-side validation** by checking customer details and order information before accepting an order.

## 🎯 Project Objective

The main objective of this project is to understand and implement server-side validation using Express.js.

## ✨ Features

- Simple and responsive food ordering interface.
- Customer name validation.
- Mobile number validation (exactly 10 digits).
- Food item selection.
- Quantity validation (between 1 and 10).
- Multiple validation error messages displayed together.
- Order success and error pages.
- Server-side form handling using Express.js.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js

## 📁 Project Structure

```text
QuickBite/
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── public/
    └── index.html
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Open the project folder

```bash
cd QuickBite
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

### 5. Open the application

Visit the following URL in your browser:

```text
http://localhost:3000
```

## ✅ Server-Side Validation Rules

| Field | Validation Rule |
|---|---|
| Customer Name | Must contain 2–50 letters and spaces |
| Mobile Number | Must contain exactly 10 digits |
| Food Item | Must be a valid menu option |
| Quantity | Must be a number between 1 and 10 |

If the submitted data is invalid, the server displays appropriate error messages. If all validations pass, the application displays an order confirmation page.

## 📚 Learning Outcomes

- Understanding Express.js routes.
- Handling POST requests.
- Processing HTML form data.
- Implementing server-side validation.
- Displaying success and error responses.
- Running a Node.js web application.

## 👨‍💻 Project Information

**Project Name:** QuickBite – Online Food Ordering System  
**Purpose:** Academic project demonstrating server-side validation using Express.js.

---

*Developed for educational purposes.*