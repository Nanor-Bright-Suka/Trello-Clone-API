
const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");


const prisma = new PrismaClient().$extends(withAccelerate());


async function getAllBoardsService(userId: number) {
  return await prisma.board.findMany({
    where: {
      boardAuthorId: userId
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function createBoardService(boardName: string, userId: number, background_color?: string | null, background_image?: string | null) {
 const boards = await prisma.board.create({
    data: {
        name: boardName,
        boardAuthorId: userId,
        backgroundColor: background_color,
        backgroundImage: background_image,
      
    }
 })
 return boards;
}


async function deleteBoardService(boardId: number, userId: number) {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
  });
  if (!board) {
    return {
      message: "Board not found",
      status: 404,
      success: false,
      data: null
    }
  }

  if (board.boardAuthorId !== userId) {
    return {
      message: "Unauthorized: You can only delete your own boards",
      status: 403,
      success: false,
      data: null
    };
  }

  const popedOut = await prisma.board.delete({
    where: { id: boardId },
  });
  return {
    message: "Board deleted successfully",
    status: 200,
    success: true,
    data: popedOut
  }
}


async function getBoardDetailsService(boardId: number, userId: number) {
 const board = await prisma.board.findUnique({
  where: { id: boardId },
  include: {
    list: {  
      orderBy: { position: "asc" },
      include: {
        card: { orderBy: { position: "asc" } },
      },
    },
  },
});


  if (!board) {
    return {
      message: "Board not found",
      status: 404,
      success: false,
      data: null
    };
  }

  if (board.boardAuthorId !== userId) {
    return {
      message: "Not authorized to view this board",
      status: 403,
      success: false,
      data: null
    };
  }

  return {
    message: "Board details fetched successfully",
    status: 200,
    success: true,
    data: board
  };
}

module.exports = { getAllBoardsService, createBoardService, deleteBoardService, getBoardDetailsService };