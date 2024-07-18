/*
  Warnings:

  - The primary key for the `NetworkAcc` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "NetworkAcc" DROP CONSTRAINT "NetworkAcc_pkey",
ADD COLUMN     "networkacc_id" SERIAL NOT NULL,
ALTER COLUMN "networkId" DROP DEFAULT,
ADD CONSTRAINT "NetworkAcc_pkey" PRIMARY KEY ("networkacc_id");
DROP SEQUENCE "NetworkAcc_networkId_seq";
