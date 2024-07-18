/*
  Warnings:

  - A unique constraint covering the columns `[email_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_user_id_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_address_key" ON "User"("email_address");
