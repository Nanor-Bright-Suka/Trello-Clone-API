-- CreateTable
CREATE TABLE "public"."Board" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boardAuthorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_boardAuthorId_fkey" FOREIGN KEY ("boardAuthorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
