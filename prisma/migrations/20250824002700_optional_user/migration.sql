-- DropForeignKey
ALTER TABLE "public"."Joke" DROP CONSTRAINT "Joke_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Joke" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Joke" ADD CONSTRAINT "Joke_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
