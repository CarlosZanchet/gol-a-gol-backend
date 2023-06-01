/*
  Warnings:

  - You are about to drop the `Partida` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Partida" DROP CONSTRAINT "Partida_timeMandanteId_fkey";

-- DropForeignKey
ALTER TABLE "Partida" DROP CONSTRAINT "Partida_timeVIsitanteId_fkey";

-- DropTable
DROP TABLE "Partida";

-- DropTable
DROP TABLE "Time";
