import { Controller, Get, Post, Body, Query, BadRequestException,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithPasswordDto } from './dto/sigin-user.dto';
import { CreateUserWithPasswordDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ConfirmEmailDto } from './dto/confirm-email.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('sigin')
   async signin(@Body() data: CreateUserWithPasswordDto) {
      const res = await this.authService.register(data);
      return res;
   }

   @HttpCode(200)
   @Post('login')
   async login(@Body() data: LoginWithPasswordDto) : Promise< object > {
      const userData = await this.authService.login(data);
      return userData;
   }

   @Get('confirm-email')
   async verify(@Query() param: ConfirmEmailDto) {
      if(!param.code) throw new BadRequestException('Invalid parameters', '400');
      const res = await this.authService.verifyToken(param.code);
      if (!res) {
         await this.authService.resendEmailVerification(param.code);
         return 'Link expired, please check your email';
      }
      const result = await this.authService.confirmMail(res);
      return result;
   }

   @Post('forget-password')
   async forgetPassword(@Body() email: string) {
      console.log(email)
      const res = await this.authService.forgetPassword(email);
      
      return res;
   }

   @Get('confirm-forget-password')
   async confirmForgetPassword(@Query() param: ConfirmEmailDto) {
      if(!param.code) throw new BadRequestException('Invalid parameters', '400');
      const res = await this.authService.verifyToken(param.code);
      if (!res) {
         await this.authService.resendEmailVerification(param.code);
         return 'Link expired, please check your email';
      }
      const result = await this.authService.confirmMail(res);
      return result;
   }

   


}
