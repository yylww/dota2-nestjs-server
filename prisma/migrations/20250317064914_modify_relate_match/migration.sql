/*
  Warnings:

  - You are about to drop the column `relateMatchId` on the `Match` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_relateMatchId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "relateMatchId",
ADD COLUMN     "awayRelateMatchId" INTEGER,
ADD COLUMN     "homeRelateMatchId" INTEGER;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayRelateMatchId_fkey" FOREIGN KEY ("awayRelateMatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeRelateMatchId_fkey" FOREIGN KEY ("homeRelateMatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
