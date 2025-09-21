# Backend folder

# Trello_Clone_Backend

A RESTful API backend for a Trello-like project management application.
Built with Node.js, Express, Typescript and Prisma.
This API allows users to manage Boards, Lists, and Tasks with full CRUD operations and authentication.

================================================================================

Features:
  - User registration and authentication (JWT-based)
  - Create, Read, Update, Delete Boards, Lists, and Tasks


================================================================================

Tech_Stack:
  - Node.js           : JavaScript runtime
  - Express           : Web framework for REST APIs
  - Prisma            : ORM for database interaction
  - PostgreSQL        : Relational database
  - JWT               : JSON Web Tokens for authentication
  - dotenv            : Environment variable management
  - cors              : Cross-Origin Resource Sharing
- Typescript          : Type safety
================================================================================

Getting_Started:

  Prerequisites:
    - Node.js >= 18
    - PostgreSQL database
    - npm or yarn

  Installation:
    1. Clone the repository:
      git clone 
    2. Navigate to the project:
       cd trello-clone-backend
    3. Install dependencies:
       npm install
    4. Start the development server:
       npm run dev

================================================================================

API_Endpoints:

 Routes
app.use("/api/v1/auth", authRoutes)

router.post('/register', validateRegisterUser, register);
  
Parameters (username, password, email)
router.post('/login',validateLoginUser, login);Parameters (email, password)


Boards Route
app.use("/api/v1/boards", boardsRoutes);

// Get all boards
 router.get("/", getAllBoardsController);

Parameters: No parameters


//Create boards
 router.post("/", authMiddleware, createBoardController)

Parameters: (boardName, background_color, background_image)



//  Get a single board
router.get("/:boardId", authMiddleware, getBoardDetailsController)

Parameters: (boardId(req.params))

// //  Delete a board
router.delete("/:id", authMiddleware, deleteBoardController)

Parameters: (boardId)


Lists
app.use("/api/v1", listsRoute);

Create List Controller 
router.post("/boards/:boardId/lists", authMiddleware, createListController);

Parameters: (name, boardId(req.params))

Reorder Lists
router.patch("/boards/:boardId/lists/reoder", authMiddleware, reorderListsController);

Parameters: (boardId(req.params), list)
list: {id: number, position: number}[] 

Delete Lists
router.delete("/list/:id",authMiddleware,  deleteListController);

Parameters: (listId(req.params))

Update List
router.put("/list/:id", authMiddleware, updateListController);

Parameters: (name, listId(req.params))


Cards
app.use("/api/v1", cardsRoute);

Create Card
router.post("/lists/:listId/card", authMiddleware, createCardController)

Parameters: (content, listId(req.params))

Reorder Card
router.patch("/boards/:boardId/cards/reorder", authMiddleware,reorderCardsController);

Parameters: (boardId(req.params, cards))
 cards: { id: number, position: number, listId: number }[] 


Delete Card
router.delete("/card/:id",authMiddleware, deleteCardController);

Parameters: cardId(req.params)

Update Card
router.put("/card/:id", authMiddleware, updateCardController);

Parameters: (cardId(req.params), content)




================================================================================

Authentication:
  - JWT-based authentication
 

================================================================================

Database (Prisma Data Platform):
  - Uses Prisma to interact with PostgreSQL
  - Run migrations:
      npx prisma migrate dev
  - Use Prisma Studio to inspect the database:
      npx prisma studio

================================================================================

Contributing:
  1. Fork the repository
  2. Create a new branch:
       git checkout -b feature-name
  3. Commit your changes:
       git commit -m "Add some feature"
  4. Push to the branch:
       git push origin feature-name
  5. Open a pull request

================================================================================

License:
  MIT License © Nanor Bright Suka && Tetteh Raphael
