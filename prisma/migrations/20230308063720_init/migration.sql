/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "VerificationCode" (
    "hash" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Network" (
    "network_id" INTEGER NOT NULL,
    "network_name" TEXT NOT NULL,
    "network_symbol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NetworkAcc" (
    "address" TEXT NOT NULL,
    "network_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CryptoCurrency" (
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "network_id" INTEGER NOT NULL,
    "native" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Exchange" (
    "exchange_id" INTEGER NOT NULL,
    "exchange_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExchangeAcc" (
    "exchange_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "API_key" TEXT NOT NULL,
    "API_secret" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_user_id_key" ON "VerificationCode"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Network_network_id_key" ON "Network"("network_id");

-- CreateIndex
CREATE UNIQUE INDEX "NetworkAcc_network_id_key" ON "NetworkAcc"("network_id");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoCurrency_name_key" ON "CryptoCurrency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_exchange_id_key" ON "Exchange"("exchange_id");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeAcc_user_id_key" ON "ExchangeAcc"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");
