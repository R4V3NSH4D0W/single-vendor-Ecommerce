/*
  Warnings:

  - You are about to drop the column `firstName` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber";
