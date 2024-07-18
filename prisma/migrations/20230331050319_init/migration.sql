/*
  Warnings:

  - The primary key for the `CryptoCurrency` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CryptoCurrency" DROP CONSTRAINT "CryptoCurrency_pkey",
ALTER COLUMN "networkId" DROP DEFAULT;
DROP SEQUENCE "CryptoCurrency_networkId_seq";
