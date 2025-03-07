-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "relateMatchId" INTEGER;

-- AlterTable
ALTER TABLE "_AchievementToPlayer" ADD CONSTRAINT "_AchievementToPlayer_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AchievementToPlayer_AB_unique";

-- AlterTable
ALTER TABLE "_AchievementToTeam" ADD CONSTRAINT "_AchievementToTeam_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AchievementToTeam_AB_unique";

-- AlterTable
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TeamToTournament_AB_unique";

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_relateMatchId_fkey" FOREIGN KEY ("relateMatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
