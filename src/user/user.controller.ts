import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '../common/decorator/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { HttpService } from '@nestjs/axios';

@ApiTags('User')
@Controller('user')
export class UserController {

   constructor(private readonly userService: UserService,
               private readonly httpService : HttpService) { }

   @Auth(Role.USERVERYFY)
   @Get()
   async getUserByTag() {
      
   }
}
