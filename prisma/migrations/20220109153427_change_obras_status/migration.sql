/*
  Warnings:

  - The values [ATIVO,COMPLETO,CANCELADO,HIATO] on the enum `ObraStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `author` column on the `obras` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `artist` column on the `obras` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `CategoriesOnObras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChaptersOnObras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `alternatives_titles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ObraStatus_new" AS ENUM ('ativo', 'completo', 'cancelado', 'hiato');
ALTER TABLE "obras" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "obras" ALTER COLUMN "status" TYPE "ObraStatus_new" USING ("status"::text::"ObraStatus_new");
ALTER TYPE "ObraStatus" RENAME TO "ObraStatus_old";
ALTER TYPE "ObraStatus_new" RENAME TO "ObraStatus";
DROP TYPE "ObraStatus_old";
ALTER TABLE "obras" ALTER COLUMN "status" SET DEFAULT 'ativo';
COMMIT;

-- DropForeignKey
ALTER TABLE "CategoriesOnObras" DROP CONSTRAINT "CategoriesOnObras_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnObras" DROP CONSTRAINT "CategoriesOnObras_obraId_fkey";

-- DropForeignKey
ALTER TABLE "ChaptersOnObras" DROP CONSTRAINT "ChaptersOnObras_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "ChaptersOnObras" DROP CONSTRAINT "ChaptersOnObras_obraId_fkey";

-- DropForeignKey
ALTER TABLE "alternatives_titles" DROP CONSTRAINT "alternatives_titles_obraId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_chapterId_fkey";

-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "pages" TEXT[];

-- AlterTable
ALTER TABLE "obras" ADD COLUMN     "alternativesTitles" TEXT[],
DROP COLUMN "author",
ADD COLUMN     "author" TEXT[],
DROP COLUMN "artist",
ADD COLUMN     "artist" TEXT[],
ALTER COLUMN "status" SET DEFAULT E'ativo';

-- DropTable
DROP TABLE "CategoriesOnObras";

-- DropTable
DROP TABLE "ChaptersOnObras";

-- DropTable
DROP TABLE "alternatives_titles";

-- DropTable
DROP TABLE "pages";

-- CreateTable
CREATE TABLE "_CategoryToObra" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ChapterToObra" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToObra_AB_unique" ON "_CategoryToObra"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToObra_B_index" ON "_CategoryToObra"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChapterToObra_AB_unique" ON "_ChapterToObra"("A", "B");

-- CreateIndex
CREATE INDEX "_ChapterToObra_B_index" ON "_ChapterToObra"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToObra" ADD FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToObra" ADD FOREIGN KEY ("B") REFERENCES "obras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToObra" ADD FOREIGN KEY ("A") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToObra" ADD FOREIGN KEY ("B") REFERENCES "obras"("id") ON DELETE CASCADE ON UPDATE CASCADE;
