-- CreateTable
CREATE TABLE "LikedPokemon" (
    "pokemonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LikedPokemon_pokemonId_userId_key" ON "LikedPokemon"("pokemonId", "userId");

-- AddForeignKey
ALTER TABLE "LikedPokemon" ADD CONSTRAINT "LikedPokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
