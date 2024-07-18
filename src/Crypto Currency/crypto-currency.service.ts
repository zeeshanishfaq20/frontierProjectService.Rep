import { Injectable } from "@nestjs/common";
import { CryptoCurrency, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CryptoCurrencyDTO } from "./DTO";

@Injectable()
export class CryptoCurrencyService{
    constructor(private prisma: PrismaService){}

    //  Store CryptoCurrency against an Address
    async create(cryptoCurrency: CryptoCurrency): Promise<CryptoCurrency> {
        return this.prisma.cryptoCurrency.create({
            data: cryptoCurrency
        })
    }

    // To Findout all the CryptoCurrencies 
    async findall(): Promise<CryptoCurrency[]> {
        return this.prisma.cryptoCurrency.findMany()
    }

    // To findout a CryptoCurrency
async findOne(name: string): Promise<CryptoCurrency> {
  const crypto = await this.prisma.cryptoCurrency.findUnique({
    where: { name: name},
  });
  return crypto;
}
}            

// @Injectable()
// export class CryptoCurrencyService{
//     constructor(private prisma: PrismaService) { }

//     async create( cryptocurrencyDTO: CryptoCurrencyDTO ): Promise<CryptoCurrency>{
        
//         // Retrieve the Network object corresponding to the given networkId
//         const network = await this.prisma.network.findUnique({
//             where: { network_id: cryptocurrencyDTO.networkId },
//             select: {network_id:true}
//         });

//         // Store CryptoCurrency Objects in Database
//         const cryptocurrency = await this.prisma.cryptoCurrency.create({
//             data: {
//                 name: cryptocurrencyDTO.name,
//                 symbol: cryptocurrencyDTO.symbol,
//                 contract_address: cryptocurrencyDTO.contract_address,
//                 network: { connect: { network_id: network.network_id}},
//                 native: cryptocurrencyDTO.native,
//             }})
//         return cryptocurrency;
//     }
// }     