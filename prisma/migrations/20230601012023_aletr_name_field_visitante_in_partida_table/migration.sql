/*
  Warnings:

  - You are about to drop the column `placar_visante` on the `Partida` table. All the data in the column will be lost.
  - Added the required column `placar_visitante` to the `Partida` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partida" DROP COLUMN "placar_visante",
ADD COLUMN     "placar_visitante" BIGINT NOT NULL;
