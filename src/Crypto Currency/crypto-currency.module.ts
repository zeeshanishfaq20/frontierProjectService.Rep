import { Module } from "@nestjs/common"
import { CryptoCurrencyController } from "./crypto-currency.controller";
import { CryptoCurrencyService } from "./crypto-currency.service";

@Module({
    controllers: [CryptoCurrencyController],
    providers: [CryptoCurrencyService],
})

export class CryptoCurrencyModule{}




