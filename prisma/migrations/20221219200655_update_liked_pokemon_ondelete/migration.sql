-- DropForeignKey
ALTER TABLE "LikedPokemon" DROP CONSTRAINT "LikedPokemon_userId_fkey";

-- AddForeignKey
ALTER TABLE "LikedPokemon" ADD CONSTRAINT "LikedPokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
