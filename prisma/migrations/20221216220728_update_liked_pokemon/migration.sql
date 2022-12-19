/*
  Warnings:

  - Made the column `relationId` on table `LikedPokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LikedPokemon" ALTER COLUMN "relationId" SET NOT NULL,
ADD CONSTRAINT "LikedPokemon_pkey" PRIMARY KEY ("relationId");
