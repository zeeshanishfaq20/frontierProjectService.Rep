/*
  Warnings:

  - You are about to drop the column `hash` on the `VerificationCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "hash";
