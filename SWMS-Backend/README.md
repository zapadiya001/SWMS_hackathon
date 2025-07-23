
#  🗑️ Smart Waste Management System – Backend

  

This is the **Express.js backend** for the **Smart Waste Management System**, built during a 24-hour hackathon at **Darshan University (July 19–20, 2025)**. The backend manages user authentication, waste classification APIs, eco-point tracking, Razorpay integration, and MongoDB data storage.

  

---

  

##  🚀 Features

  

- ✅ JWT-based user authentication

- 🧠 Waste classification API (via image input)

- 🌱 Eco point reward system

- 💳 Razorpay payment gateway integration

- 🗄️ MongoDB data storage

- 🔒 Secure RESTful API endpoints

  

---

  

##  🛠️ Tech Stack

  

-  **Node.js** + **Express.js**

-  **MongoDB** + **Mongoose**

-  **JWT** for authentication

-  **Razorpay SDK** for payments

-  **Multer / Cloudinary**  *(optional: for image upload support)*

-  **dotenv**, **CORS**

  

---

  

##  📁 Project Structure

  

```bash

/backend

├──  controllers/

├──  models/

├──  routes/

├──  middleware/

├──  utils/

├──  .env

├──  index.js

└──  package.json

  

```

  
  

---

  

##  ⚙️ Setup Instructions

  

###  1. Clone the Repository

  

```bash

git  clone  https://github.com/zapadiya001/SWMS-hackathon

cd  smart-waste-backend

  

```

###  2. Install Dependencies

  

```bash

npm  install

```

  

###  3. Create a .env File

Create a .env file in the root directory using the following format:

  

env

```bash

PORT=0000

MONGODB_URI=mongodb+srv://username:password@cluster0.example.mongodb.net/db_name

RAZORPAY_KEY_ID=rzp_test_dummyKeyId12345

RAZORPAY_KEY_SECRET=dummySecretKey123456789

JWT_SECRET=your_jwt_secret_here

```

🔐 Note: Keep your .env file private. Never commit it to version control.

  

4. Start the Server

  

```bash

node  index.js

```

Server will start at: http://localhost:PORT