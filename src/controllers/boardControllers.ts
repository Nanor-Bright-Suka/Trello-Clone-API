import type { Response, NextFunction } from "express";
 const handleResponse = require("../utils/responseHandler");
const {validateName, validateColor, validateBgImg} = require("../utils/validation")
const {getAllBoardsService, createBoardService, deleteBoardService, getBoardDetailsService} = require("../services/boardServices")
import type { AuthRequest } from "../middleware/authMiddleware";



interface CreateBoardBody {
  boardName: string;
  background_color?: string | null;
  background_image?: string | null;
}


 const getAllBoardsController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
  return handleResponse(res, 401, "Unauthorized: User information missing", req.user);
 }
       const userId = req.user.id;
      const boards = await getAllBoardsService(userId);
      if (!boards.length) {
        return handleResponse(res, 200, "No boards found", []);
      }
      handleResponse(res, 200, "Boards fetched Successfully", boards);
    } catch (err) {
      next(err);
    }
  };
  

const createBoardController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
  return handleResponse(res, 401, "Unauthorized: User information missing", req.user);
 }

  const userId = req.user.id; 

    const {boardName, background_color, background_image } = req.body as CreateBoardBody;
    validateName(boardName);
    validateColor(background_color);
    validateBgImg(background_image);

    const createdBoards = await createBoardService( 
      boardName,
      userId, 
      background_color, 
      background_image
     );
    if (!createdBoards) {
      return handleResponse(res, 400, "Board creation failed", null);
    } 
    handleResponse(res, 201, "Board Created Successfully", createdBoards);
  } catch (error) {
    next(error);
  }
};



 const getBoardDetailsController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

       if (!req.params.boardId  ) {
           return handleResponse(res, 400, "Invalid board ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }

        const boardId = parseInt(req.params.boardId);
        const userId = req.user.id;
        const boardDetails = await getBoardDetailsService(boardId, userId);
        handleResponse(res, boardDetails.status, boardDetails.message, boardDetails.data);
  } catch (error) {
    next(error);
  }
};



 const deleteBoardController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
  if (!req.params.id  ) {
           return handleResponse(res, 400, "Invalid board ID.", null);
        }
        if (!req.user) {
           return handleResponse(res, 401, "Unauthorized", null);
        }
      const boardId = parseInt(req.params.id)
     const userId = req.user.id;
    const deletedBoards = await deleteBoardService(boardId, userId);

    handleResponse(res, deletedBoards.status, deletedBoards.message, deletedBoards.data);
  } catch (error) {
    next(error);
  }
};

 module.exports = {getAllBoardsController, createBoardController, deleteBoardController, getBoardDetailsController};




