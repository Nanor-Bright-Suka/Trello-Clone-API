
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const{ createCardController,reorderCardsController, deleteCardController, updateCardController} = require("../controllers/cardControllers");


router.post("/lists/:listId/card", authMiddleware, createCardController)

router.patch("/boards/:boardId/cards/reorder", authMiddleware,reorderCardsController);

router.delete("/card/:id",authMiddleware, deleteCardController);

router.put("/card/:id", authMiddleware, updateCardController);


module.exports = router;