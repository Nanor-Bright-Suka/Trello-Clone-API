import type { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
const handleResponse = require("../utils/responseHandler");
const validateUserInput = require("../utils/validUserInput");
const {createCardService, reorderCardsService, deleteCardService , updateCardService}= require("../services/cardServices");        


const createCardController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.listId) {
           return handleResponse(res, 400, "Invalid list ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const listId = parseInt(req.params.listId);
        const userId = req.user.id;
        const { content }: { content: string } = req.body;
        validateUserInput(content);
        const createdCard = await createCardService(content, listId, userId);
        handleResponse(res, createdCard.status, createdCard.message, createdCard.data);
    } catch (error) {
        next(error);
    }
};

const reorderCardsController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.boardId) {
           return handleResponse(res, 400, "Invalid board ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const boardId = parseInt(req.params.boardId);
        const userId = req.user.id;
        const cards : { id: number, position: number, listId: number }[] = req.body;
        const reorderedCards = await reorderCardsService(boardId, userId, cards);
      handleResponse(res, reorderedCards.status, reorderedCards.message, reorderedCards.data);
    } catch (error) {
        next(error);
    }
}

const deleteCardController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
           return handleResponse(res, 400, "Invalid card ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const cardId = parseInt(req.params.id);
        const userId = req.user.id;                  
        const deletedCard = await deleteCardService(cardId, userId);
        handleResponse(res, deletedCard.status, deletedCard.message, deletedCard.data);
    } catch (error) {
        next(error);
    }
}

const updateCardController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
           return handleResponse(res, 400, "Invalid card ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const cardId = parseInt(req.params.id);
        const userId = req.user.id;                  
        const { content }: { content: string } = req.body;
        validateUserInput(content);
        const updatedCard = await updateCardService(cardId, userId, content);
        handleResponse(res, updatedCard.status, updatedCard.message, updatedCard.data);
    } catch (error) {
        next(error);
    }
}
module.exports = {createCardController, reorderCardsController, deleteCardController, updateCardController};