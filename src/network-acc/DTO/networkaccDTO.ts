import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class NetworkAccDTO{
    constructor() { }

    @IsString()
    @IsNotEmpty()
    address: string

    @IsInt()
    @IsNotEmpty()
    networkId: number

    @IsString()
    @IsNotEmpty()
    userId: string

}