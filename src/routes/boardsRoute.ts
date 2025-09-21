
const express = require('express');
const router = express.Router();
const {getAllBoardsController, createBoardController, deleteBoardController,getBoardDetailsController} = require("../controllers/boardControllers");
const authMiddleware = require("../middleware/authMiddleware");

// Get all boards
 router.get("/", authMiddleware, getAllBoardsController);

//Create boards
 router.post("/", authMiddleware, createBoardController)

//  Get a single board
router.get("/:boardId", authMiddleware, getBoardDetailsController)

// //  Delete a board
router.delete("/:id", authMiddleware, deleteBoardController)


module.exports = router;
