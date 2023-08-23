//THIS FILE IS A SIMPLE INSTANCE OF THE BACKEND API

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

//importing
import connectDB from "./mongodb/connect.js";

//routes
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


//configuring dotenv
//allows us to pool all our env vars from .env file
dotenv.config();

//The line of code `const app = express();` is typically used in Node.js applications that utilize the Express framework. Here's what it does:

// 1. It declares a constant variable named `app` using the `const` keyword.
// 2. It assigns the value returned by the `express()` function to the `app` variable.

// In the context of Node.js and Express, the `express()` function is a top-level function exported by the Express module. It creates a new instance of an Express application, which acts as the foundation for building web applications.

// By assigning the result of `express()` to the `app` variable, you gain access to various methods and middleware provided by the Express framework. These methods allow you to define routes, handle HTTP requests, set up middleware functions, and configure your application's behavior.

// After this line of code, you can use the `app` variable to define your application's routes, handle requests, and set up additional middleware as needed. For example, you might add route handlers with `app.get()`, `app.post()`, or other HTTP method functions to handle specific types of requests.
const app = express();

//app.use(cors());: This line adds the CORS (Cross-Origin Resource Sharing) middleware to the Express application. CORS is used to allow or restrict cross-origin HTTP requests between different domains. By using app.use(cors()), you enable CORS for all routes in your application, allowing requests from different origins to access your server's resources.
app.use(cors());

//app.use(express.json({limit: '50mb'}));: This line adds the express.json() middleware to parse JSON data in incoming requests. The {limit: '50mb'} option sets the maximum request body size to 50 megabytes. This is useful when you expect to receive large JSON payloads in your requests. The middleware automatically parses the request body if it is in JSON format and makes it available in req.body for further processing in your application.
app.use(express.json({ limit: "50mb" }));

//middleware
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//setting routes
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

//STARTING THE APP using async funct
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

//calling funct
startServer();
