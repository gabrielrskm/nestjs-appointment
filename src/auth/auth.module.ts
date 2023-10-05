import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from './guards/auth.guard';
import { enviroment } from '../common/constants/constant';

@Module({

  imports: [JwtModule.registerAsync({
    useFactory: () => {
      return {
        signOptions: { expiresIn: '4d' },
        secret: enviroment.JWT_SECRET,
      };
    },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthGuard],
})
export class AuthModule {}
