/*
  Warnings:

  - You are about to drop the column `user_id` on the `VerificationCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationCode_user_id_key";

-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_token_key" ON "VerificationCode"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_userId_key" ON "VerificationCode"("userId");

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
