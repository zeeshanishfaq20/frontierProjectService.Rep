/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_token_key" ON "VerificationCode"("token");
