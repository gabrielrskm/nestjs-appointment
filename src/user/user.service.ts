import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
   constructor(private readonly prismaService: PrismaService) {}

   async getUser(uid : string): Promise<User> {
      const user = await this.prismaService.user.findFirst({
         where: { id : uid }
      });
      return user;
   }

   async setUser(data: User): Promise<Boolean> {
      const user = await this.prismaService.user.create({
         data
      });
      if (!user) return true;
      return false;
      
   }
}
