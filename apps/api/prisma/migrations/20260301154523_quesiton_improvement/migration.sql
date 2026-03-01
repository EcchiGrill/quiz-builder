/*
  Warnings:

  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - Added the required column `answers` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer",
ADD COLUMN     "answers" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
