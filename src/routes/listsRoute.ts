        
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {createListController , reorderListsController, deleteListController, updateListController}= require("../controllers/listControllers");

router.post("/boards/:boardId/lists", authMiddleware, createListController);

router.patch("/boards/:boardId/lists/reoder", authMiddleware, reorderListsController);

router.delete("/list/:id",authMiddleware,  deleteListController);

router.put("/list/:id", authMiddleware, updateListController);

module.exports = router;