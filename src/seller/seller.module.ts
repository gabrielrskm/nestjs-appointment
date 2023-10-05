import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [SellerService,JwtService,PrismaService],
  controllers: [SellerController]
})
export class SellerModule {}
