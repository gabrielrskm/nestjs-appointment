import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, SellerModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
