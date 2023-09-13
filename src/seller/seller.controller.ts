import { Controller, Post,Body,BadRequestException, Get, Request , Req, Param, UseGuards} from '@nestjs/common';
import { createAppointmentDto } from './dto/create-appointment.dto';
import { SellerService } from './seller.service';
import { JwtService } from '@nestjs/jwt';
import { RequestOptions } from 'http';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('seller')
export class SellerController {

   constructor(private sellerService: SellerService,
      private jwtService : JwtService) {
      
   }

   @Post('create-appointment')
   async createAppointment(@Body() value: createAppointmentDto) {
      
      const date = new Date(value.date);
      console.log(date)
      if(date.toString()  === 'Invalid Date') throw new BadRequestException('Invalid date format', '400');
      const res = await this.sellerService.createAppointment(value, date);
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
