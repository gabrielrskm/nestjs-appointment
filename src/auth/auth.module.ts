import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from './auth.guard';

@Module({

  imports: [JwtModule.registerAsync({
    useFactory: () => {
      return {
        signOptions: { expiresIn: '4d' },
        secret: process.env.JWT_SECRET,
      };
    },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthGuard],
})
export class AuthModule {}
