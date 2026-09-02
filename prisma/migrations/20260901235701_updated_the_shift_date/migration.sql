/*
  Warnings:

  - Added the required column `shiftDate` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "shiftDate" TIMESTAMP(3) NOT NULL;
