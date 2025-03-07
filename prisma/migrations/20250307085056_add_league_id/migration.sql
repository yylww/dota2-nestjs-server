-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "leagueId" INTEGER;

-- RenameIndex
ALTER INDEX "_AchievementToPlayer_AB_idx" RENAME TO "_AchievementToPlayer_AB_unique";

-- RenameIndex
ALTER INDEX "_AchievementToTeam_AB_idx" RENAME TO "_AchievementToTeam_AB_unique";

-- RenameIndex
ALTER INDEX "_TeamToTournament_AB_idx" RENAME TO "_TeamToTournament_AB_unique";
