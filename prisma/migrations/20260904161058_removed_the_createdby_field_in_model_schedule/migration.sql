/*
  Warnings:

  - You are about to drop the column `createdById` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_createdById_fkey";

-- DropIndex
DROP INDEX "Schedule_createdById_idx";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "createdById";
