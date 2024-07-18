import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { NetworkAcc, Prisma } from "@prisma/client";
import { NetworkAccDTO } from "./DTO";

@Injectable()
export class NetworkAccService {
    constructor(
        private prisma: PrismaService,
        ) {}

    // To find Network Acc balances
    async findall():  Promise <NetworkAcc[]> {
        const networkacc = await this.prisma.networkAcc.findMany()
        return networkacc;
    }

    // Create a Network Acc
    async create(networkAccDTO: NetworkAccDTO): Promise<NetworkAcc> {
        const create_networkacc = await this.prisma.networkAcc.create({
                data: {
                    address: networkAccDTO.address,
                    networkId: networkAccDTO.networkId, 
                    userId: networkAccDTO.userId,
                }
            })
            return create_networkacc;
        }      

      
    async getBalances(query: string): Promise<any> {
      const address = query
      const url = "https://eth-mainnet.g.alchemy.com/v2/u6Wm-lLUWvpOkpQJVLcmFCAwyCCtl68X";
      const options = {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenBalances",
          params: [address],
        }),
      };

      // fetching the token balances
      const res = await fetch(url, options);
      const response = await res.json();
      
      // Getting balances from the response
      const balances = response["result"];
      
      // Remove tokens with zero balance
      const nonZeroBalances = await balances.tokenBalances.filter((token) => {
        return token.tokenBalance !== "0";
      });
            
      // Counter for SNo of final output
      let i = 1;

      const tokenData =[]
      
      // Loop through all tokens with non-zero balance
      for (let token of nonZeroBalances) {
      
      // Get balance of token
        let balance = token.tokenBalance;
      
      // request options for making a request to get tokenMetadata
        const options = {
          method: "POST",
          headers: {
            accept: "application/json", "content-type": "application/json",},
          body: JSON.stringify({
            id: 1,
            jsonrpc: "2.0",
            method: "alchemy_getTokenMetadata",
            params: [token.contractAddress],
          }),
        };
      
      // parsing the response and getting metadata from it
        let res2 = await fetch(url, options);
        let metadata = await res2.json();
        metadata = metadata["result"];
      
      // Compute token balance in human-readable format
        balance = balance / Math.pow(10, metadata.decimals);
        balance = balance.toFixed(2);
          
      // // Check if the currency matches with the database table of cryptocurrencies
      //   try {
          const currency = metadata.name;
          console.log(currency)
      //     const currencyExists = await this.prisma.cryptoCurrency.findUnique({ where:{ name: currency}})
      //     console.log(currencyExists)
      //     // Only display the token data if the currency exists in the database table of cryptocurrencies
      //     if (currencyExists) {
          // Print name, balance, and symbol of token
            tokenData.push(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
        //   }
        // } catch (error) {
        //   console.error(error)
        }
      // Return the array of token data after processing all tokens
    return tokenData;
  }
// }

    async getCurrencyBalances(query: string): Promise<any> {
      const url = "https://eth-mainnet.g.alchemy.com/v2/u6Wm-lLUWvpOkpQJVLcmFCAwyCCtl68X";
      const parts = query.split('/');
      const address = parts[0];
      const currency = parts[1];
    
      const options = {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenBalances",
          params: [address],
        }),
      };
      
      // fetching the token balances
      const res = await fetch(url, options);
      const response = await res.json();
    
      // Getting balances from the response
      const balances = response["result"];
    
      // Remove tokens with zero balance
      const nonZeroBalances = balances.tokenBalances.filter((token) => {
        return token.tokenBalance !== "0";
      });
    
      // Counter for SNo of final output
      let i = 1;
      const tokenData = []
      // Loop through all tokens with non-zero balance
      for (let token of nonZeroBalances) {
        // Get balance of token
        let balance = token.tokenBalance;
    
        // request options for making a request to get tokenMetadata
        const options = {
          method: "POST",
          headers: {
            accept: "application/json", "content-type": "application/json",
          },
          body: JSON.stringify({
            id: 1,
            jsonrpc: "2.0",
            method: "alchemy_getTokenMetadata",
            params: [token.contractAddress],
          }),
        };
    
        // parsing the response and getting metadata from it
        let res2 = await fetch(url, options);
        let metadata = await res2.json();
        metadata = metadata["result"];
    
        // Compute token balance in human-readable format
        balance = balance / Math.pow(10, metadata.decimals);
        balance = balance.toFixed(2);
    
        // Check if the currency matches with the database table of cryptocurrencies
        const currencyName = metadata.name.toLowerCase();
        if (currencyName === currency.toLowerCase()) {
          // Print name, balance, and symbol of token
          tokenData.push(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
        }
      }
      return tokenData;
    }
  }








  
//       async getEthBalance(query: string): Promise<number> {
//         const address = query;
//         const url = "https://eth-mainnet.g.alchemy.com/v2/u6Wm-lLUWvpOkpQJVLcmFCAwyCCtl68X";
//         const options = {
//           method: "POST",
//           headers: { accept: "application/json", "content-type": "application/json" },
//           body: JSON.stringify({
//             id: 1,
//             jsonrpc: "2.0",
//             method: "eth_getBalance",
//             params: [address, "latest"],
//           }),
//         };
//         // fetching the ETH balance
//         const res = await fetch(url, options);
//         const response = await res.json();
        
//         // Getting ETH balance from the response
//         const balance = response["result"];
        
//         // Compute ETH balance in human-readable format
//         const ethBalance = parseFloat(web3.utils.fromWei(balance, "ether"));
        
//         return ethBalance;
//       }
// }









    // async getTokenBalances(address: string, apiKey: string): Promise<any[]> {
    //     const tokenContracts = await this.getTokenContracts(address, apiKey);
      
    //     const tokenBalances = await Promise.all(
    //       tokenContracts.map(async (contract) => {
    //         const balance = await this.getTokenBalance(contract.address, address, apiKey);
    //         return {
    //             symbol: contract.symbol,
    //             name: contract.name,
    //             balance: balance,
    //         };
    //       }),
    //     );
      
    //     return tokenBalances;
    //   }
      
    // private async getTokenContracts(address: string, apiKey: string): Promise<any[]> {
    //     const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`);
    //     const data = await response.json();
    //     const txList = data.result;
      
    //     const tokenTxList = txList.filter((tx) => tx.input.startsWith('0xa9059cbb'));
      
    //     const tokenContracts = [];
    //     for (const tx of tokenTxList) {
    //         const contractAddress = tx.to.toLowerCase();
    //         if (!tokenContracts.some((contract) => contract.address === contractAddress)) {
    //           const contract = await this.getTokenContract(contractAddress, apiKey);
    //           if (contract) {
    //             tokenContracts.push(contract);
    //           }
    //         }
    //       }
      
    //     return tokenContracts;
    //   }
      
    // private async getTokenContract(address: string, apiKey: string): Promise<any> {
    //     const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`);
    //     const data = await response.json();
      
    //     if (data.status === '0') {
    //       return null;
    //     }
      
    //     const abi = JSON.parse(data.result);
    //     const name = abi.find((item) => item.name === 'name');
    //     const symbol = abi.find((item) => item.name === 'symbol');
      
    //     if (name && symbol) {
    //       return {
    //         address: address,
    //         name: name.constant ? await this.getTokenContractValue(name, address, apiKey) : name.name,
    //         symbol: symbol.constant ? await this.getTokenContractValue(symbol, address, apiKey) : symbol.name,
    //       };
    //     } else {
    //       return null;
    //     }
    //   }
      
    //   private async getTokenContractValue(contractProperty: any, address: string, apiKey: string): Promise<any> {
    //     const response = await fetch(`https://api.etherscan.io/api?module=proxy&action=eth_call&to=${address}&data=${contractProperty.signature + address.slice(2)}&apikey=${apiKey}`);
    //     const data = await response.json();
      
    //     const value = data.result;
    //     const decodedValue = this.web3.utils.hexToUtf8(value);
      
    //     return decodedValue;
    //   }
      
    //   private async getTokenBalance(tokenAddress: string, address: string, apiKey: string): Promise<string> {
    //     const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}&tag=latest&apikey=${apiKey}`);
    //     const data = await response.json();
      
    //     const balance = data.result;
    //     const balanceInEther = this.web3.utils.fromWei(balance, 'ether');
          
    //     return balanceInEther;
    //   }
    // }


















        

    // async getBalances(address) {
    //     const apiKey = await this.configService.get<string>("ETHERSCAN_API_KEY");
    //     const url = `https://api.etherscan.io/api?module=token&action=gettokeninfo&address=${address}&tag=latest&apikey=${apiKey}`;
    //     const res = await fetch(url);
    //     const response = await res.json();
    //     const balances = response.result;
    //     console.log(balances)
    //     const tokenBalances = [];
        
    //     for (const contractAddress in balances) {
    //       const balance = balances[contractAddress];
        
    //       if (balance !== '0') {
    //         tokenBalances.push({ contractAddress, balance });
    //       }
    //     }
        
    //     return tokenBalances;
    //  }
        
    // async getMetadata(contractAddress) {
    //   const apiKey = await this.configService.get<string>("ETHERSCAN_API_KEY");
    //   const url = `https://api.etherscan.io/api?module=token&action=gettokeninfo&contractaddress=${contractAddress}&tag=latest&apikey=${apiKey}`;
    //   const res = await fetch(url);
    //   const response = await res.json();
    //   console.log(response)
    //   const metadata = response.result[0];
        
    //     return {
    //       name: metadata.name,
    //       symbol: metadata.symbol,
    //       decimals: parseInt(metadata.decimals),
    //     };
    //   }
    // }          
        
//     async getBalance(address: string) {
//       const apiKey = await this.configService.get<string>("ETHERSCAN_API_KEY");
//       const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

//       const options = {
//         method: "GET",
//       };
//       fetch(url, options)
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.error(error));
    
//         // fetching the token balances
//       let res = await fetch(url, options);
//       let response = await res.json();
      
//       // Getting balances from the response
//       const balances = response["result"];
      
//       // Remove tokens with zero balance
//       const nonZeroBalances = await balances.tokenBalances.filter((token) => {
//         return token.tokenBalance !== "0";
//       });
      
//       console.log(`Token balances of ${address}: \n`);
      
//       // Counter for SNo of final output
//       let i = 1;
      
//       // Loop through all tokens with non-zero balance
//       for (let token of nonZeroBalances) {
      
//         // Get balance of token
//         let balance = token.tokenBalance;
      
//         // request options for making a request to get tokenMetadata
//         const options = {
//           method: "GET",
//         };
//         fetch(url, options)
//           .then(response => response.json())
//           .then(data => console.log(data))
//           .catch(error => console.error(error));
      
//         // parsing the response and getting metadata from it
//         let res2 = await fetch(url, options);
//         let metadata = await res2.json();
//         metadata = metadata["result"];
      
//         // Compute token balance in human-readable format
//         balance = balance / Math.pow(10, metadata.decimals);
//         balance = balance.toFixed(2);
      
//         // Print name, balance, and symbol of token
//         console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
//       }
//     }    
// }      


// async getBalance(address: string): Promise<any> {
//   // EtherScan API Key
//   const apiKey = await this.configService.get<string>("ETHERSCAN_API_KEY");
//   const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xaEcD92aEC5BfBe2f5a02DB2DeE90733897360983&address=0xaEcD92aEC5BfBe2f5a02DB2DeE90733897360983&tag=latest&apikey=${apiKey}`;
  
//   // fetching the token balances
//   let res = await fetch(url);
//   let response = await res.json();

//   // Getting balances from the response
//   const balances = response["result"];
//   console.log(balances)

//   // Remove tokens with zero balance
//   const nonZeroBalances = await balances.tokenBalances.filter((token) => {
//     return token.tokenBalance !== "0";
//   });

//   console.log(`Token balances: \n`);

//   // Counter for SNo of final output
//   let i = 1;

//   // Loop through all tokens with non-zero balance
//   for (let token of nonZeroBalances) {

//     // Get balance of token
//     let balance = token.tokenBalance;

//     // parsing the response and getting metadata from it
//     let res2 = await fetch(url);
//     let metadata = await res2.json();
//     metadata = metadata["result"];

//     // Compute token balance in human-readable format
//     balance = balance / Math.pow(10, metadata.decimals);
//     balance = balance.toFixed(2);

//     // Print name, balance, and symbol of token
//     console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
//   }
// }
// }


        // Get Token balances of all the currencies
  //       async getBalance(address: string): Promise<any>{
          
  //         // EtherScan API Key
  //         const apiKey = await this.configService.get<string>("ETHERSCAN_API_KEY");

  //         // Etherscan URL for making requests
  //         const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

  //         // fetching the token balances
  //         const res = await fetch(url);
  //         const response = await res.json();

  //         // getting the token balances from the response
  //         const balances = response['result'];

  //         const tokenBalances = [];
        
  //         // loop through all tokens with non-zero balance
  //         for (const contractAddress in balances) {
  //           const balance = balances[contractAddress];

  //           // add token balance to array if non-zero
  //           if (balance !== '0') {
  //             tokenBalances.push({
  //             contractAddress,
  //             balance,

  //             });
  //           }
  //         }

  //         return tokenBalances;
  //   }
    
  //   async getMetadata(contractAddress: string): Promise<any> {
  //     // Etherscan API key
  //     const apiKey = await this.configService.get<string>("ETHERSCAN_API_KEY");
  
  //     // Etherscan URL for making requests
  //     const url = `https://api.etherscan.io/api?module=account&action=balance&contractaddress=${contractAddress}&apikey=${apiKey}`;
  
  //     // fetching the token metadata
  //     const res = await fetch(url);
  //     const response = await res.json();
  //     console.log(response)
  
  //     // getting the metadata from the response
  //     const metadata = response['result'][0];
  
  //     return {
  //       name: metadata.name,
  //       symbol: metadata.symbol,
  //       decimals: parseInt(metadata.decimals),
  //     };
  //   }
  // }
    // To findout a Network Acc
    // async findOne(id: number):  Promise <NetworkAcc | null> {
    //     const network_acc = await this.prisma.networkAcc.findUnique({
    //         where: { networkacc_id: id },
    //     })
    //     return network_acc;
    // }

    // Update a Network Acc
    // async update(id: number, user, network, networkaccDTO: NetworkAccDTO): Promise<NetworkAcc> {
    //     const update_networkacc = await this.prisma.networkAcc.update({
    //         data:{
    //             user: { connect: { id: user.id}},
    //             network: { connect: { network_id: network.network_id}},
    //             address: networkaccDTO.address,
    //         },
    //         where:{networkacc_id: id}
    //     })
    //     return update_networkacc;
    // }

    //  Delete a Network Acc
    // async delete(id: number): Promise<NetworkAcc> {
    //     const delete_networkacc = await this.prisma.networkAcc.delete({where: {networkacc_id: id}
    //     })
    //     return delete_networkacc;
    // }

// interface TokenBalance {
//   contractAddress: string;
//   balance: string;
// };

// interface TokenMetaData {
//   name: string;
//   symbol: string;
//   decimals: number;
// }
