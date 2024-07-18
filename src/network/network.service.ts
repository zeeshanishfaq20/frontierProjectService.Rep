import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Network, Prisma } from "@prisma/client";
import { NetworkDTO } from "./DTO";
import { PrismaClient } from "@prisma/client";


@Injectable()

export class NetworkService {
    constructor(private prisma: PrismaService){ }
        async create (network: Network): Promise<Network>{
            return this.prisma.network.create({
                data: network
            })
        }
        
        // delete a network
        async delete(id: number, data: Network): Promise <Network> {
            return this.prisma.network.delete({where: {network_id: id}})
        }
}          
    


// @Injectable() 

// export class NetworkService {
//     constructor (private prisma: PrismaService) {}

//     // To findout all the networks
//     async findall(): Promise<Network[]> {
//         const networks = await this.prisma.network.findMany();
//         return networks
//     }

//     //  to findout all the networks
//     async findone(id: number): Promise <Network> {
//         const network = await this.prisma.network.findUnique({where : { network_id: id}})
//         return network;
//     }

//     // create a network
//     async create(networkDTO: NetworkDTO): Promise<Network> {
//         const createnetwork = await this.prisma.network.create({
//             data: {
//             network_name: networkDTO.network_name,
//             network_symbol: networkDTO.network_symbol,
//             network_chain_id: networkDTO.network_chain_id,
//         }})
//         return createnetwork;
//     }

//     // update an existing network
//     async update(id: number, networkDTO: NetworkDTO): Promise <Network> {
//         return this.prisma.network.update({
//             where: {network_id: id}, 
//             data : {
//                 network_name: networkDTO.network_name,
//                 network_symbol: networkDTO.network_symbol,
//                 network_chain_id: networkDTO.network_chain_id,
//                 }
//             })
//     }

//     // delete a network
//     async delete(id: number, data: Network): Promise <Network> {
//         return this.prisma.network.delete({where: {network_id: id}})
//     }
// }