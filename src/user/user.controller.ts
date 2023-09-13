import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/decorator/role.enum';

@Controller('user')
export class UserController {

   constructor(private readonly userService: UserService) {
      
   }

   @UseGuards(AuthGuard)
   @Roles(Role.Admin)
   @Get()
   async getUser(@Param('id') id : string ) {
      const user = await this.userService.getUser(id)
      return 'Hello World!';
   }
}
