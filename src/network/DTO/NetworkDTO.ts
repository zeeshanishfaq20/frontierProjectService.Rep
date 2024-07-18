import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class NetworkDTO {
    @IsString()
    @IsNotEmpty()
    network_name: string;

    @IsString()
    @IsNotEmpty()
    network_symbol: string;

    @IsString()
    @IsNotEmpty()
    network_chain_id: string;
}