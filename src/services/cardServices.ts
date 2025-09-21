
const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");


const prisma = new PrismaClient().$extends(withAccelerate());

async function createCardService(content: string, listId: number, userId: number) {
 
  const list = await prisma.list.findUnique({
    where: { id: listId },
    include: { board: true } 
  });

  if (!list) {
    return { message: "List not found", status: 404, success: false, data: null };
  }


  if (list.board.boardAuthorId !== userId) {
    return { message: "Not authorized", status: 403, success: false, data: null };
  }

  const lastCard = await prisma.card.findFirst({
    where: { listId },
    orderBy: { position: "desc" },
  });
  const position = lastCard ? lastCard.position + 1 : 1;


  const card = await prisma.card.create({
    data: {
      content,
      listId,
      position,
    },
  });

  return { message: "Card created successfully", status: 201, success: true, data: card };
}

async function reorderCardsService(boardId: number, userId: number, cards: {id: number, position: number, listId: number}[]) {
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

  // 3. Update positions
const updates = cards.map(card =>
  prisma.card.update({
    where: { id: card.id },
    data: {
      position: card.position,
      listId: card.listId,
    },
  })
);

const updatedCards = await prisma.$transaction(updates);


  return {
    message: "Cards reordered successfully",
    status: 200,
    success: true,
    data: updatedCards
  }
}


async function deleteCardService(cardId: number, userId: number) {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
    include: { list: { include: { board: true } } },
  });
  if (!card) {
    return {
      message: "Card not found",
      status: 404,
      success: false,
      data: null
    };
  }

  if (card.list.board.boardAuthorId !== userId) {
    return {
      message: "Not authorized",
      status: 403,
      success: false,
      data: null
    };
  }

 const deleted =   await prisma.card.delete({ where: { id: cardId } });

  return {
    message: "Card deleted successfully",
    status: 200,
    success: true,
    data: deleted
  };
}

async function updateCardService(cardId: number, userId: number, content: string) {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
    include: { list: { include: { board: true } } },
  });
  if (!card) {
    return {
      message: "Card not found",
      status: 404,
      success: false,
      data: null
    };
  }

  if (card.list.board.boardAuthorId !== userId) {
    return {
      message: "Not authorized",
      status: 403,
      success: false,
      data: null
    };
  }

 const updated =   await prisma.card.update({ where: { id: cardId }, data: { content } });

  return {
    message: "Card updated successfully",
    status: 200,
    success: true,
    data: updated
  };
};

module.exports = {
  createCardService,
  reorderCardsService,
  deleteCardService,
  updateCardService
};