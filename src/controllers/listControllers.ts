import type {  Response, NextFunction } from "express";
const handleResponse = require("../utils/responseHandler");
import type { AuthRequest } from "../middleware/authMiddleware";
const {validateName} = require("../utils/validation");
const {createListService, reorderListsService, deleteListService, updateListService} = require("../services/listServices");

const createListController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.boardId) {
           return handleResponse(res, 400, "Invalid board ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const boardId = parseInt(req.params.boardId); 
       const userId = req.user.id;                  
       const { name } = req.body;
       validateName(name);
      const createdList = await createListService(name, boardId, userId);
        handleResponse(res, createdList.status, createdList.message, createdList.data);
    } catch (error) {
        next(error);
    }
};


const reorderListsController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.boardId) {
           return handleResponse(res, 400, "Invalid board ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const boardId = parseInt(req.params.boardId); 
       const userId = req.user.id;                  
    const list: {id: number, position: number}[] = req.body;
        const updatedLists = await reorderListsService(boardId, userId, list);
      handleResponse(res, updatedLists.status, updatedLists.message, updatedLists.data);
    } catch (error) {
        next(error);
    }
};


const deleteListController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
           return handleResponse(res, 400, "Invalid list ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const listId = parseInt(req.params.id); 
       const userId = req.user.id;                  
        const deletedList = await deleteListService(listId, userId);
       handleResponse(res, deletedList.status, deletedList.message, deletedList.data);
    } catch (error) {
        next(error);
    }
}


const updateListController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
           return handleResponse(res, 400, "Invalid list ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const listId = parseInt(req.params.id); 
       const userId = req.user.id;                  
       const { name } = req.body;
        validateName(name);
      const updatedList = await updateListService(listId, name, userId);
        handleResponse(res, updatedList.status, updatedList.message, updatedList.data);
    } catch (error) {
        next(error);
    }
}

module.exports = { createListController, reorderListsController, deleteListController, updateListController };