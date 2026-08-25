/*
  Warnings:

  - Added the required column `roleId` to the `CoverageRequirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "CoverageRequirement" ADD COLUMN     "roleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "status" "ScheduleStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "roleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAreaRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAreaRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAvailability" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Role_areaId_idx" ON "Role"("areaId");

-- CreateIndex
CREATE INDEX "Role_active_idx" ON "Role"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Role_areaId_name_key" ON "Role"("areaId", "name");

-- CreateIndex
CREATE INDEX "UserAreaRole_userId_idx" ON "UserAreaRole"("userId");

-- CreateIndex
CREATE INDEX "UserAreaRole_areaId_idx" ON "UserAreaRole"("areaId");

-- CreateIndex
CREATE INDEX "UserAreaRole_roleId_idx" ON "UserAreaRole"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAreaRole_userId_areaId_roleId_key" ON "UserAreaRole"("userId", "areaId", "roleId");

-- CreateIndex
CREATE INDEX "UserAvailability_userId_dayOfWeek_idx" ON "UserAvailability"("userId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "CoverageRequirement_roleId_dayOfWeek_idx" ON "CoverageRequirement"("roleId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "Schedule_status_idx" ON "Schedule"("status");

-- CreateIndex
CREATE INDEX "Shift_roleId_idx" ON "Shift"("roleId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAreaRole" ADD CONSTRAINT "UserAreaRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAreaRole" ADD CONSTRAINT "UserAreaRole_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAreaRole" ADD CONSTRAINT "UserAreaRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAvailability" ADD CONSTRAINT "UserAvailability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverageRequirement" ADD CONSTRAINT "CoverageRequirement_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
