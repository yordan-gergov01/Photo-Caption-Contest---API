# Photo Caption Contest API

RESTful API for a Photo Caption Contest application where users can:
- Register and log in
- Upload photos
- Add captions to photos
- View and delete their own content

The API is built with Node.js, Express, Sequelize (PostgreSQL) and includes JWT authentication, caching, rate limiting, and API documentation with Swagger.


## Features

- Authentication & Authorization using JWT
- User management (register, login, profile, logout)
- Photo management (upload, fetch, delete)
- Caption management (add, fetch, delete)
- Caching with node-cache
- Security with Helmet, CORS, Rate limiting, and Cookie-based JWT handling
- API Documentation with Swagger UI
- Custom error handling


## Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL with Sequelize ORM
- Authentication: JWT + bcrypt for password hashing
- Documentation: Swagger (OpenAPI 3.0)
- Caching: NodeCache
- Security: Helmet, Rate limiting, CORS


## Project Structure


├── config/

│   └── db.js

├── controllers/     

│   ├── authController.js

│   ├── captionsController.js

│   ├── photosController.js

│   └── userController.js

├── docs/

│   └── swagger.yaml    

├── middlewares/

│   └── protect.js       

│   └── errorHandler.js   

├── models/              

│   ├── User.js

│   ├── Photo.js

│   └── Caption.js

├── routes/   

│   ├── usersRoutes.js

│   ├── photosRoutes.js

│   └── captionsRoutes.js

├── utils/

│   ├── appError.js      

│   └── NodeCache.js   

├── app.js          

└── server.js            


## Database Schema

<img width="1638" height="612" alt="photo_captions_db" src="https://github.com/user-attachments/assets/b84e0edf-02e4-4362-89ce-1bc860380015" />


## API Documentation

The API is documented using Swagger (OpenAPI 3.0).
After starting the server, visit:

http://localhost:3000/api-docs


## Setup and Installation

1. Clone the repository

   https://github.com/yordan-gergov01/Photo-Caption-Contest---API.git
   cd photo-caption-contest-api

2. Install dependencies

   npm install

3. Configure environment variables

## Database
DB_HOST=localhost
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

## JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN
JWT_COOKIE_EXPIRES_IN

## Bcrypt
SALT_ROUNDS


4. Run miggartions (if needed only)
   npx sequelize-cli db:migrate


5. Start development server

   npm run watch (with nodemon)

