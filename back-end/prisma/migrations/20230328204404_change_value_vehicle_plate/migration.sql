/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `supplies` table. All the data in the column will be lost.
  - Added the required column `vehiclePlate` to the `supplies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "supplies" DROP CONSTRAINT "supplies_vehicleId_fkey";

-- AlterTable
ALTER TABLE "supplies" DROP COLUMN "vehicleId",
ADD COLUMN     "vehiclePlate" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "supplies" ADD CONSTRAINT "supplies_vehiclePlate_fkey" FOREIGN KEY ("vehiclePlate") REFERENCES "vehicles"("plate") ON DELETE RESTRICT ON UPDATE CASCADE;
