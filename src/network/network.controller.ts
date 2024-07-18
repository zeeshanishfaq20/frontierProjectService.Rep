import { Delete, Put, Post, Body, Param, Get, Controller, UseGuards } from "@nestjs/common";
import { NetworkService } from "./network.service";
import { Network } from "@prisma/client";
import { NetworkDTO } from "./DTO";
import { PrismaService } from "src/prisma/prisma.service";
import * as data from "./networks-crypto.json";

@Controller()
export class NetworkController{
    constructor(private networkService: NetworkService) {}

    @Post("networkdata")
    async importdata(): Promise<any> {
        const networks = data.networks;
        
        for (let i = 0; i < networks.length; i++) {
            const network = networks[i]

            await this.networkService.create({
                network_id: network.id,
                network_name: network.name,
                network_symbol: network.symbol,
                network_chain_id: network.chain_id,
            });
        }
        return "Database seeded successfully"
    }

    // Delete a network
    @Delete(":id")
    async delete(@Param('id') id: string, @Body() data: Network): Promise<Network> {
        return this.networkService.delete(+id, data)
    }
}    

// @Controller ("networks")
// export class NetworkController{
//     constructor(private networkService:NetworkService) { }

//     @Get()
//     async findall(): Promise<Network[]> {
//         return this.networkService.findall();
//     }

//     @Get(':id')
//     async findone(@Param('id') id: string ): Promise<Network> {
//         return this.networkService.findone(+id)
//     }

//     @Post()
//     async create(@Body() NetworkDTO: NetworkDTO): Promise<Network> {
//         return this.networkService.create(NetworkDTO)
//     }

//     @Put()
//     async update(@Param('id') id: string ,@Body() data: Network): Promise<Network> {
//         return this.networkService.update(+id, data)
//     }

//     @Delete(":id")
//     async delete(@Param('id') id: string, @Body() data: Network): Promise<Network> {
//         return this.networkService.delete(+id, data)
//     }

// }