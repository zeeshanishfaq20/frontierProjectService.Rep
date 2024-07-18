/*
  Warnings:

  - You are about to drop the column `token` on the `VerificationCode` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "VerificationCode_token_key";

-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "token";
