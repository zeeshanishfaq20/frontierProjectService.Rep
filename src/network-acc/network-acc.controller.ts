import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { NetworkAccService } from './network-acc.service';
import { NetworkAcc } from '@prisma/client';
import { NetworkAccDTO } from './DTO';
import { Request, Response } from 'express';

@Controller()
export class NetworkAccController {
    constructor(private networksAccService: NetworkAccService){}

    @Post('networkacc')
    async create(@Body() NetworkAccDTO: NetworkAccDTO): Promise<NetworkAcc> {
        return this.networksAccService.create(NetworkAccDTO) 
    }

    @Get('balances/:address')
    async getTokenBalances(@Param("address") address: string, @Res () res: Response): Promise<void> {
        try {
          const balances = await this.networksAccService.getBalances(address);
          res.status(200).json(balances);
        } catch (error) {
          console.error(error);
          res.sendStatus(500);
        }
      }
    @Get('balance/:address')
    async getCurrencyBalances(@Param('address') address: string, @Query('currency') currency?: string): Promise<any> {
      const tokenData = await this.networksAccService.getCurrencyBalances(address);
  
      // If currency query parameter is provided, filter token data by currency
      if (currency) {
        const filteredData = tokenData.filter((data) => {
          return data.toLowerCase().includes(currency.toLowerCase());
        });
        return filteredData;
      }
  
      return tokenData;
    }








//     @Get(':address/balances')  
//     async getEthBalance (req: Request, res: Response): Promise<void> {
//         try {
//           const query = req.query.address as string;
//           const ethBalance = await this.networksAccService.getEthBalance(query);
//           res.status(200).json({ ethBalance });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//       };

 
    // @Get('balances')
    // async getTokenBalances( @Query('address') address: string,) {
    //   const tokenBalances = await this.networksAccService.getBalance(address);
    //   return { tokenBalances };
    // }


// interface TokenBalance {
//   contractAddress: string;
//   balance: string;
// };

// interface TokenMetaData {
//   name: string;
//   symbol: string;
//   decimals: number;
}