import { Controller, Post,Body, Get , Req} from '@nestjs/common';
import { createAppointmentDto } from './dto/create-appointment.dto';
import { SellerService } from './seller.service';
import { JwtService } from '@nestjs/jwt';
import { RequestOptions } from 'http';
import { ApiTags } from '@nestjs/swagger';

import { Role } from '../common/decorator/role.enum';
import { Auth } from '../auth/decorator/auth.decorator';

@Auth(Role.SELLER)
@ApiTags('Seller')
@Controller('seller')
export class SellerController {

   constructor(private sellerService: SellerService,
      private jwtService : JwtService) {
      
   }

   @Post('create-appointment')
   async createAppointment(@Body() value: createAppointmentDto, @Req() obj: RequestWithUser) {
     const res = await this.sellerService.createAppointment(obj.user.id, value);
      return res
   }

   @Get('get-all')
   async getAll(@Req() req: RequestOptions) {
      
      const token = req.headers.authorization.toString().split(' ')[1];
      const data : any = this.jwtService.decode(token);
      const res = await this.sellerService.getAllAppointment(data.id);
      return res
   }
   
}
