import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CryptoCurrencyDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    symbol: string;

    @IsString()
    @IsNotEmpty()
    contract_address: string;

    @IsBoolean()
    @IsNotEmpty()
    native: boolean;

    @IsInt()
    @IsNotEmpty()
    networkId: number
}