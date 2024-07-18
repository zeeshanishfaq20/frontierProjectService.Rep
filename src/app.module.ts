import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CryptoCurrencyModule } from './Crypto Currency/crypto-currency.module';
import { NetworkModule } from './network/network.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { NetworkAccModule } from './network-acc/network-acc.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, NetworkModule, NetworkAccModule,CryptoCurrencyModule, ConfigModule.forRoot({isGlobal: true,})],
})
export class AppModule {}
