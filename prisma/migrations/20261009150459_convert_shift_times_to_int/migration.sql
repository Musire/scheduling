/*
  Warnings:

  - Changed the type of `startsAt` on the `Shift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endsAt` on the `Shift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "startsAt",
ADD COLUMN     "startsAt" INTEGER NOT NULL,
DROP COLUMN "endsAt",
ADD COLUMN     "endsAt" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Shift_startsAt_endsAt_idx" ON "Shift"("startsAt", "endsAt");
