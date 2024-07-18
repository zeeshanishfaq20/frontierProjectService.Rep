import { Controller, Post, Body, Query, Get, Param } from "@nestjs/common";
import { CryptoCurrency } from "@prisma/client";
import { CryptoCurrencyService } from "./crypto-currency.service";
import { CryptoCurrencyDTO } from "./DTO";
import * as data from "./networks-crypto.json";

@Controller()
export class CryptoCurrencyController{
    constructor(private cryptoCurrencyService: CryptoCurrencyService) { }
        
    @Post("cryptodata")
    async cryptodata(): Promise<any> {
        const crypto = data.crypto;
               
        for (let i = 0; i < crypto.length; i++) {
        const cryptos = crypto[i]

            await this.cryptoCurrencyService.create({
                name: cryptos.name,
                symbol: cryptos.symbol,
                contract_address: cryptos.contract_address,
                native: cryptos.native,
                networkId: cryptos.networkId
            });
        }
        return "Database seeded successfully"
    }

    @Get()
    async findAll(): Promise<CryptoCurrency[]>{
        return this.cryptoCurrencyService.findall();
    }

    @Get(":name")
    async find(@Param('name') name: string): Promise<CryptoCurrency> {
        return this.cryptoCurrencyService.findOne(name)
    }
}

// @Controller("cryptocurrency")
// export class CryptoCurrencyController{
//     constructor(private cryptocurrencyService: CryptoCurrencyService) { }

// @ Post()
// async create(
//     @Body() cryptocurrencyDTO: CryptoCurrencyDTO,
//     ) {
//         console.log(cryptocurrencyDTO)
//         const crypto_currency = this.cryptocurrencyService.create(
//         cryptocurrencyDTO
//         );
//     return crypto_currency
//     }
// }