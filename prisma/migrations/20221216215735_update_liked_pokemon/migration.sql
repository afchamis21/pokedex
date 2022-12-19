/*
  Warnings:

  - Changed the type of `pokemonId` on the `LikedPokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LikedPokemon" DROP COLUMN "pokemonId",
ADD COLUMN     "pokemonId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LikedPokemon_pokemonId_userId_key" ON "LikedPokemon"("pokemonId", "userId");
