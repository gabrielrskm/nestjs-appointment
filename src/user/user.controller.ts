import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/decorator/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { profile } from 'console';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('User')
@Controller('user')
export class UserController {

   constructor(private readonly userService: UserService) {
      
   }

   @ApiBearerAuth()
   @Roles(Role.USERVERYFY)
   @UseGuards(AuthGuard, RolesGuard)
   @Get()
   async getUser(@Param('id') id : string ) {
      const user = await this.userService.getUser(id)
      const data = {
         email: user.email,
         id: user.id,
         profile: user.profile,
         createdAt: user.createdAt,
         updatedAt: user.updatedAt 
      }
      return data;
   }
}
