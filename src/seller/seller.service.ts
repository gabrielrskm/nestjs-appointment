import { Injectable } from '@nestjs/common';
import { createAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class SellerService {

   constructor(private prismaService : PrismaService) {
      
   }

   async createAppointment(value: createAppointmentDto, date: Date) {

      const seller = await this.prismaService.user.findUnique({
         where: {
            email: value.emailSeller
         }
      })
      const result = await this.prismaService.appointment.create({
         data: {
            sellerID: seller.id,
            title: value.title,
            description: value.description,
            duration: value.duration,
            date: date,
            published: value.published,
            status: $Enums.Status.AVIABLE,
         }
      })

   }

   async getAllAppointment(emailSeller : string) {
      const result = this.prismaService.appointment.findMany({
         where: {
            sellerID: emailSeller
         }
      })

      return result
   }
}
