import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserWithPasswordDto, CreateUserWithProviderDto } from './dto/create-user.dto';
import { LoginWithPasswordDto, SigninWithProviderDto } from './dto/sigin-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as nodemailer from 'nodemailer';
import { enviroment } from '../common/constants/constant';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
   constructor(private readonly prismaService: PrismaService,
               private jwtService : JwtService) { }
   

   async login(user: LoginWithPasswordDto) : Promise< object > {
      const userData = await this.prismaService.user.findUnique({
         where: { email: user.email }
      })
      if (!userData) throw new NotFoundException('User not found', '404');
      const isMatch = await bcrypt.compare(user.password, userData.security.hash);
      if (!isMatch) throw new UnauthorizedException('Invalid password', '401');
      const token = await this.jwtService.signAsync({ id: userData.id, email: userData.email,role: userData.role });
      return {token, user: userData.email, userId: userData.id, role: userData.role};
   }

   async register(user: CreateUserWithPasswordDto) {
      const password = await bcrypt.hash(user.password, 10);
      let res = undefined;
      try {
         res = await this.prismaService.user.create({
            data: {
               email: user.email,
               security: {hash: password},
               profile: { 
                  firstName: user.firstName,
                  lastName: user.lastName,
                  profilePicture: user.profilePicture,
               },
               role : Role.USER
            }
         })
      }
      catch (e) {
         throw new ConflictException('User already exists', '409');
      }
      const tokenEmail = await this.jwtService.signAsync({ id: res.id, email: res.email, role: 'USERVERYFY' });

      const message = `
      <h1>Verify your email</h1>
      <a href="http://localhost:3000/auth/confirm-email?code=${tokenEmail}">Click here to verify your email</a>
      `
      this.sendVerifyEmail(res.email, message);
      const token = await this.jwtService.signAsync({ id: res.id, email: res.email, role: res.role });
      const data = { tokenEmail, user: res.email, userId: res.id };

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

   async verifyToken(token : string) {
      try {
         const payload: any = this.jwtService.decode(token);
         console.log(payload);
         await this.jwtService.verifyAsync(token, { secret: enviroment.JWT_SECRET });
         return payload.id;
      }
      catch {
         return null;
       }
   }

   async forgetPassword(email: string) {
      const userData = await this.prismaService.user.findUnique({
         where: { email:email }
      })
      if (!userData) throw new NotFoundException('User not found', '404');
      const token = await this.jwtService.signAsync({ id: userData.id, email: userData.email, role: userData.role });
      const message = `
      <h1>Click here to login via email, and then change your password</h1>
      <a href="http://localhost:3000/auth/confirm-forget-password?code=${token}">Click here to verify your email</a>
      `
      await this.sendVerifyEmail(userData.email, message);
      return
   }

   private async sendVerifyEmail(email : string, message : string) {
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

   async resendEmailVerification(email: string) {
      const res = await this.prismaService.user.findUnique({
         where: { email: email }
      });
      const token = await this.jwtService.signAsync({ id: res.id, email: res.email });
      const data = { token, user: res.email, userId: res.id };

      const message = `
      <h1>Verify your email</h1>
      <a href="http://localhost:3000/auth/confirm-email?email=${res.email}&token=${token}">Click here to verify your email</a>
      `
      this.sendVerifyEmail(res.email,message);
      return data;
   }

   async confirmMail (id : string) {
      const userData = await this.prismaService.user.findUnique({
         where: { id: id }
      })
      await this.prismaService.user.update({
         where: { id: userData.id },
         data: {
            role: 'USERVERYFY'
         }
      });
      const token = await this.jwtService.signAsync({ id: userData.id, email: userData.email, role : userData.role });
      return token;

      
   }
}
