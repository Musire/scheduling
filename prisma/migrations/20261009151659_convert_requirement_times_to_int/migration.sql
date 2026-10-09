/*
  Warnings:

  - Changed the type of `startsAt` on the `CoverageRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endsAt` on the `CoverageRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CoverageRequirement" DROP COLUMN "startsAt",
ADD COLUMN     "startsAt" INTEGER NOT NULL,
DROP COLUMN "endsAt",
ADD COLUMN     "endsAt" INTEGER NOT NULL;
