/*
  Warnings:

  - You are about to drop the column `postion` on the `List` table. All the data in the column will be lost.
  - Added the required column `position` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."List" DROP COLUMN "postion",
ADD COLUMN     "position" INTEGER NOT NULL;
