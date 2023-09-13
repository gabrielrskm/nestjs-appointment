import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninWithPasswordDto } from './dto/sigin-user.dto';
import { CreateUserWithPasswordDto } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Get()
   getHello(): string {
      return 'auth controller';
   }

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

   @Get('profile')
   async profile() {
      return 'Hello World!';
   }

   
   @Post('verify')
   async verify(@Body() token: string,email: string) {
      const res = await this.authService.verify(token,email);
      return res;
   }

   @Post('forget-password')
   async forgetPassword(@Body() email : string) {
      const res = await this.authService.forgetPassword(email);
      return res;
   }


}
