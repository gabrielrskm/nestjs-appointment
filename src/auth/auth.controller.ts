import { Controller, Get, Post, Body, UseGuards, Param, Req, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninWithPasswordDto } from './dto/sigin-user.dto';
import { CreateUserWithPasswordDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('sigin')
   async signin(@Body() data: CreateUserWithPasswordDto) {
      const res = await this.authService.register(data);
      return res;
   }

   @Post('login')
   async login(@Body() data: SigninWithPasswordDto) : Promise< object > {
      const userData = await this.authService.login(data);
      return userData;
   }

   @Get('confirm-email')
   async verify(@Query() param: any) {
      if(!param.email || !param.token) throw new BadRequestException('Invalid parameters', '400');
      const res = await this.authService.verifyToken(param.email,param.token);
      if(!res)return 'Link expired';
      return 'Mail verificated';
   }

   @Post('forget-password')
   async forgetPassword(@Body() email : string) {
      const res = await this.authService.forgetPassword(email);
      return res;
   }

   


}
