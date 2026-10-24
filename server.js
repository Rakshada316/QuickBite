const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// GET route: Display the food ordering form
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Reusable page design for success and error responses
function resultPage(title, message, details, isSuccess) {
    const color = isSuccess ? "#16a34a" : "#dc2626";
    const icon = isSuccess ? "✓" : "✕";
    const heading = isSuccess ? "Order Placed Successfully!" : "Order Failed";
    const subtitle = isSuccess
        ? "Thank you for choosing QuickBite."
        : "Oops! Something needs to be corrected.";

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} | QuickBite</title>
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }

            body {
                min-height: 100vh;
                background: #fff8f1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                color: #292524;
            }

            .card {
                width: 100%;
                max-width: 480px;
                background: white;
                padding: 40px 30px;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 12px 40px #0000000d;
            }

            .logo {
                color: #f4511e;
                font-size: 25px;
                font-weight: bold;
                margin-bottom: 30px;
            }

            .icon {
                width: 75px;
                height: 75px;
                border-radius: 50%;
                background: ${color}18;
                color: ${color};
                font-size: 42px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 22px;
            }

            h1 {
                font-size: 26px;
                margin-bottom: 12px;
                color: ${color};
            }

            .subtitle {
                color: #777;
                line-height: 1.6;
                margin-bottom: 25px;
            }

            .details {
                background: #fff8f1;
                border-radius: 12px;
                padding: 18px;
                margin-bottom: 25px;
                line-height: 1.8;
                overflow-wrap: anywhere;
            }

            a {
                display: block;
                background: #f4511e;
                color: white;
                text-decoration: none;
                padding: 14px;
                border-radius: 9px;
                font-weight: bold;
                transition: background 0.2s;
            }

            a:hover {
                background: #d93d10;
            }

            .footer {
                margin-top: 22px;
                color: #999;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <main class="card">
            <div class="logo">🍔 QuickBite</div>
            <div class="icon">${icon}</div>
            <h1>${heading}</h1>
            <p class="subtitle">${subtitle}</p>
            <div class="details">${details}</div>
            <a href="/">← Back to QuickBite</a>
            <p class="footer">Fresh food, happy mood!</p>
        </main>
    </body>
    </html>`;
}

// POST route: Validate the submitted order
app.post("/order", (req, res) => {
    const { name, mobile, food, quantity } = req.body;
   const errors = [];

if (!name || !mobile || !food || !quantity) {
  errors.push("Please fill in all fields.");
}

if (name && !/^[A-Za-z ]{2,50}$/.test(name.trim())) {
  errors.push("Please enter a valid name using letters only.");
}

if (mobile && !/^\d{10}$/.test(mobile)) {
  errors.push("Mobile number must contain exactly 10 digits.");
}

if (food && !["Pizza", "Burger", "Sandwich", "Pasta"].includes(food)) {
  errors.push("Please select a valid food item.");
}

if (quantity && (!/^\d+$/.test(quantity) || Number(quantity) < 1 || Number(quantity) > 10)) {
  errors.push("Quantity must be between 1 and 10.");
}

if (errors.length > 0) {
  const details = errors
    .map(error => `<p style="color:#dc2626;font-weight:bold;">${error}</p>`)
    .join("");

  return res.status(400).send(
    resultPage("Order Failed", "Please correct the following errors:", details, false)
  );
}

    // Success response
    const safeName = name.trim().replace(/[&<>"']/g, "");
    const safeFood = food;

    const details = `
        <p><strong>Customer:</strong> ${safeName}</p>
        <p><strong>Food Item:</strong> ${safeFood}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p style="color:#16a34a;font-weight:bold;margin-top:10px;">
            Your order has been received!
        </p>
    `;

    res.send(
        resultPage(
            "Order Successful",
            "Your order has been placed.",
            details,
            true
        )
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`QuickBite running at http://localhost:${PORT}`);
});