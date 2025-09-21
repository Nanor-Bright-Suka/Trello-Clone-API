
const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");

const prisma = new PrismaClient().$extends(withAccelerate());


async function createListService(name: string, boardId: number, userId: number) {
  
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board) {
    return {
        message: "Board not found",
        status: 404,
        success: false,
        data: null  
    }
  }

  // 2. Check authorization
  if (board.boardAuthorId !== userId) {
    return {
      message: "Not authorized",
      status: 403,
      success: false,
      data: null
    };
  }

  // 3. Get last position
  const lastList = await prisma.list.findFirst({
    where: { boardId },
    orderBy: { position: "desc" },
  });
  const position = lastList ? lastList.position + 1 : 1;


  // 4. Create list
  const list = await prisma.list.create({
    data: { name, boardId, position },
  });

  return {
    message: "List created successfully",
    status: 201,
    success: true,
    data: list
  }
}

async function reorderListsService(boardId: number, userId: number, lists: {id: number, position: number}[]) {
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board) {
    return {
        message: "Board not found",
        status: 404,
        success: false,
        data: null  
    }
  }

  // 2. Check authorization
  if (board.boardAuthorId !== userId) {
    return {
      message: "Not authorized",
      status: 403,
      success: false,
      data: null
    };
  }

  const updates = lists.map(list =>
    prisma.list.update({
      where: { id: list.id },
      data: { position: list.position},
    })
  );

  const results = await prisma.$transaction(updates);

  return {
    message: "Lists reordered successfully",
    status: 200,
    success: true,
    data: results
  }
}

async function deleteListService(listId: number, userId: number) {
  const list = await prisma.list.findUnique({
    where: { id: listId },
    include: { board: true },
  });
  if (!list) {
    return {
      message: "List not found",
      status: 404,
      success: false,
      data: null
    }
  }

  if (list.board.boardAuthorId !== userId) {
    return {
      message: "Unauthorized: You can only delete lists from your own boards",
      status: 403,
      success: false,
      data: null
    };
  }

   const listCount = await prisma.list.count({
    where: { boardId: list.boardId },
  });

  if (listCount <= 1) {
    return {
      message: "Cannot delete the only list on a board",
      status: 400,
      success: false,
      data: null,
    };
  }

  const deletedList = await prisma.list.delete({
    where: { id: listId },
  });
  return {
    message: "List deleted successfully",
    status: 200,
    success: true,
    data: deletedList
  }
}


async function updateListService(listId: number, name: string, userId: number) {
  const list = await prisma.list.findUnique({
    where: { id: listId },
    include: { board: true },
  });
  if (!list) {
    return {
      message: "List not found",
      status: 404,
      success: false,
      data: null
    }
  }

  if (list.board.boardAuthorId !== userId) {
    return {
      message: "Unauthorized: You can only update lists from your own boards",
      status: 403,
      success: false,
      data: null
    };
  }

  const updatedList = await prisma.list.update({
    where: { id: listId },
    data: { name },
  });
  return {
    message: "List updated successfully",
    status: 200,
    success: true,
    data: updatedList
  }
}

module.exports = { createListService, reorderListsService, deleteListService, updateListService };