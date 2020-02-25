# REST API project for DGM 4790
## Spring 2020
---
For this project I followed along with and expanded on the same "posts"/"users" functionality that was presented in Max's videos on Udemy (Abstracted to Vue instead of React).  This includes authentication; so a user must log in in order to use this API. Please note that this app is *not* yet a fully functional social media app; however it does have basic CRUD functionality for the user posts.

- ### Mongoose as my data modeling tool: 

#### Please see the following 4 files:

1. /backend/models
2. /backend/controllers
3. /backend/routes
4. /backend/app.js

- ### Cloud-based MongoDB as my data store:

I used MongoDB Atlas for this project.  The database connection code is in

- /backend/app.js

- ### At least 3 GET endpoints:

**/backend/routes/feed.routes.js - 2:**
1. GET all posts
2. GET a single post

**/backend/routes/user.routes.js - 2:**
1. GET a user for the user's profile
2. GET a user's followers/followed users

- ### At least 1 endpoint allowing user to update an item via PUT or PATCH:

**/backend/routes/feed.routes.js - 1:**
1. PUT - To update a post

**/backend/routes/user.routes.js - 2:**
1. PUT - to update a user's profile *not functional*
2. PATCH - to update a user's followings

**/backend/routes/auth.routes.js - 1:**
1. PUT - to sign up/create a new user

- ### At least 1 endpoint allowing user to create an item via POST:

**/backend/routes/feed.routes.js - 1:**
1. POST to create/save a new post

- ### At least 1 endpoint allowing user to delete an item via DELETE:

**/backend/routes/feed.routes.js - 1:**
1. DELETE to delete a post

- ### Your datastore will contain at least 25 items:

As I write this, there are 18 posts and 10 active users.  The posts are all delivered via the /feed view; the users may only be seen by looking at individual user's followers or by looking at the posts in the feed.  I will add more posts from different users before the time this is due.

- ### Your app will be deployed to production using some service like Heroku, Digital Ocean, etc.

The app, both backend and frontend, is deployed to Heroku:

- [Here is the app frontend](https://iingles-node-social-frontend.herokuapp.com/login)
- [Here is the app backend](https://iingles-node-social.herokuapp.com/)


- ### All of your source code will be properly uploaded to GitHub

#### Repository URL:
https://github.com/iingles/node-social

#### Branches: 
1. **heroku-deploy:** Code modified for deployment to Heroku
2. **master:** Code will run locally, but will not run if deployed
3. **dev:** some experimentation with Vue's local storage, authentication, and other little things
4. **new:** Temporary branch I created because I messed some things up in Git

- ### Your ReadMe file will accurately describe the server install process (if any) and how to use the APIs

1. In order to run this code locally, you must use the *master* branch of the Github repository.
2. In the **/backend** folder, run 
`npm run dev` to run node with nodemon, or
`npm start` to run the server without nodemon.
3. In the **/frontend** folder, run
`npm run serve` to run the development server, or 
`npm run build` to build out the Vue project frontend.
