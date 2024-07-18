/*
  Warnings:

  - You are about to drop the column `network_id` on the `CryptoCurrency` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_id` on the `ExchangeAcc` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `ExchangeAcc` table. All the data in the column will be lost.
  - You are about to drop the column `network_id` on the `NetworkAcc` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `NetworkAcc` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[exchangeId]` on the table `ExchangeAcc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `ExchangeAcc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `NetworkAcc` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exchangeId` to the `ExchangeAcc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ExchangeAcc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network_chain_id` to the `Network` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `NetworkAcc` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExchangeAcc_user_id_key";

-- DropIndex
DROP INDEX "Network_network_id_key";

-- DropIndex
DROP INDEX "NetworkAcc_network_id_key";

-- AlterTable
ALTER TABLE "CryptoCurrency" DROP COLUMN "network_id",
ADD COLUMN     "networkId" SERIAL NOT NULL,
ADD CONSTRAINT "CryptoCurrency_pkey" PRIMARY KEY ("networkId");

-- AlterTable
ALTER TABLE "ExchangeAcc" DROP COLUMN "exchange_id",
DROP COLUMN "user_id",
ADD COLUMN     "exchangeId" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
CREATE SEQUENCE network_network_id_seq;
ALTER TABLE "Network" ADD COLUMN     "network_chain_id" TEXT NOT NULL,
ALTER COLUMN "network_id" SET DEFAULT nextval('network_network_id_seq'),
ADD CONSTRAINT "Network_pkey" PRIMARY KEY ("network_id");
ALTER SEQUENCE network_network_id_seq OWNED BY "Network"."network_id";

-- AlterTable
ALTER TABLE "NetworkAcc" DROP COLUMN "network_id",
DROP COLUMN "user_id",
ADD COLUMN     "networkId" SERIAL NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "NetworkAcc_pkey" PRIMARY KEY ("networkId");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeAcc_exchangeId_key" ON "ExchangeAcc"("exchangeId");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeAcc_userId_key" ON "ExchangeAcc"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NetworkAcc_userId_key" ON "NetworkAcc"("userId");

-- AddForeignKey
ALTER TABLE "NetworkAcc" ADD CONSTRAINT "NetworkAcc_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("network_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NetworkAcc" ADD CONSTRAINT "NetworkAcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoCurrency" ADD CONSTRAINT "CryptoCurrency_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("network_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeAcc" ADD CONSTRAINT "ExchangeAcc_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "Exchange"("exchange_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeAcc" ADD CONSTRAINT "ExchangeAcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
