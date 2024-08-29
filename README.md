# IAK Blog API

A RESTful API for managing a blog. This API allows users to create, read, update, and delete blog posts, along with user authentication, searching and other features.

## Features

- **User Authentication**: JWT-based authentication.
- **CRUD Operations**: Create, read, update, and delete blog posts and comments.
- **Search**: Search posts by title and content.
- **Rate Limiting**: Limits API calls to 10 requests per minute.

## Installation

1. **Clone the Repository**:

   
   git clone https://github.com/irshadkhan589/iak-blog.git
   cd blog-api
   

2. **Install Dependencies**:

   
   npm install
   

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory with the following variables:

     PORT=3000
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     

## API Endpoints

### User Authentication

- **Register**: `POST /api/auth/register`
  - **Request Body**: `{ "username": "user", "password": "pass" }`
  - **Response**: `{ "token": "<jwt-token>" }`

- **Login**: `POST /api/auth/login`
  - **Request Body**: `{ "username": "user", "password": "pass" }`
  - **Response**: `{ "token": "<jwt-token>" }`


### Posts

- **Create Post**: `POST /api/posts`
  - **Headers**: `Authorization: Bearer <jwt-token>`
  - **Request Body**: `{ "title": "Post Title", "content": "Post content","tags":[Post tags array],"category":"Post category" }`
  - **Response**: `{ "post": { ... } }`

- **Get All Posts**: `GET /api/posts`
  - **Response**: `{ "posts": [{ ... }],}`

- **Get Post by ID**: `GET /api/posts/:id`
  - **Response**: `{ "post": { ... } }`

- **Update Post**: `PUT /api/posts/:id`
  - **Headers**: `Authorization: Bearer <jwt-token>`
  - **Request Body**: `{ "title": "Updated Title", "content": "Updated content", "tags":[Post tags array],"category":"Post category" }`
  - **Response**: `{ "post": { ... } }`

- **Delete Post**: `DELETE /api/posts/:id`
  - **Headers**: `Authorization: Bearer <jwt-token>`
  - **Response**: `{ "message": "Post deleted successfully" }`

### Search

- **Search Posts**: `GET /api/posts/search`
  - **Query Params**: `q` (search query)
  - **Response**: `{ "posts": [{ ... }], }`

## Deployment

To deploy this API using AWS Lambda and Serverless Framework:

1. **Deploy**:

   
   sls deploy
   

2. **Configure `serverless.yml`**:
   - Ensure `serverless.yml` is configured for AWS Lambda with Node.js 18 runtime.

   

3. **Testing Locally**:
   - Run the following command to test the API locally:

     
     npx nodemon src/app
     

## Testing

Run unit tests with Mocha and Chai:


npm test
