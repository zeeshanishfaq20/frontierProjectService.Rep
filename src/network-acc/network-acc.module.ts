import { Module } from "@nestjs/common";
import { NetworkAccController } from "./network-acc.controller";
import { NetworkAccService } from "./network-acc.service";
import { Prisma } from "@prisma/client";
import { CryptoCurrencyModule } from "src/Crypto Currency/crypto-currency.module";
import { CryptoCurrencyService } from "src/Crypto Currency/crypto-currency.service";


@Module({
    imports: [CryptoCurrencyModule],
    controllers: [NetworkAccController],
    providers: [NetworkAccService, CryptoCurrencyService]
})
export class NetworkAccModule{}