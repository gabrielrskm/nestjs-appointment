import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserWithPasswordDto, CreateUserWithProviderDto } from './dto/create-user.dto';
import { SigninWithPasswordDto, SigninWithProviderDto } from './dto/sigin-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as nodemailer from 'nodemailer';
import { enviroment } from 'src/constants/constant';

@Injectable()
export class AuthService {
   constructor(private readonly prismaService: PrismaService,
               private jwtService : JwtService) { }
   

   async login(user: SigninWithPasswordDto) : Promise< object > {
      const userData = await this.prismaService.user.findUnique({
         where: { email: user.email }
      })
      if (!userData) throw new NotFoundException('User not found', '404');
      const isMatch = await bcrypt.compare(user.password, userData.security.hash);
      if (!isMatch) throw new UnauthorizedException('Invalid password', '401');
      const token = await this.jwtService.signAsync({ id: userData.id, email: userData.email });
      const data = { token, user: userData.email, userId: userData.id };
      return data;
   }

   async register(user: CreateUserWithPasswordDto) {
      const password = await bcrypt.hash(user.password, 10);
      let res = undefined;
      try {
         res = await this.prismaService.user.create({
            data: {
               email: user.email,
               security: {hash: password,verifyqued: false},
               profile: { 
                  firstName: user.firstName,
                  lastName: user.lastName,
                  profilePicture: user.profilePicture,
               }
            }
         })
      }
      catch (e) {
         throw new ConflictException('User already exists', '409');
      }
      const token = await this.jwtService.signAsync({ id: res.id, email: res.email });
      const data = { token, user: res.email, userId: res.id };

      const message = `
      <h1>Verify your email</h1>
      <a href="http://localhost:3000/auth/verify?token=${token}">Click here to verify your email</a>
      `
      this.verifyEmail(res.email,token,message);
      return data;
   }

   async loginProvider (user : SigninWithProviderDto) {
      
   }

   async registerProvider (user : CreateUserWithProviderDto) {
      
   }

   async logout(id: string) {
      
   }

   async delete(id: string) {
      
   }

  

   async verify(email : string, token : string) {
      
   }


   async forgetPassword(email : string) {
      return 'resizeBy';
   }

   private async verifyEmail(email : string, token : string,message: string) {
      const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 465,
         secure: true,
         auth: {
           // TODO: replace `user` and `pass` values from <https://forwardemail.net>
           user: enviroment.GOOGLE_USER_APP,
           pass: enviroment.GOOGLE_PASS_APP
         }
      });
      let info = undefined;
      try {
         info = await transporter.sendMail({
            from: process.env.GOOGLE_USER_APP,
            to: email,
            subject: "Verify your email",
            text: "Verify your email",
            html: message
         
         })
         console.log("Message sent: %s", info.messageId);
      }
      catch (e) {
         throw new NotFoundException('User not found', '404');
      }


   }
}
