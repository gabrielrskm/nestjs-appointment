import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsDateString, IsEnum } from "class-validator";

export enum Status { 
   RESERVE = 'RESERVE', 
   AVAILABLE = 'AVAILABLE',
   CANCELED = 'CANCELED', 
   SUCCESS = 'SUCCESS',  
   EXPIRED = 'EXPIRED',  
}

export class createAppointmentDto{
   @IsString()
   @IsNotEmpty()
   title: string;
   @IsString()
   description?: string;
   @IsNumber()
   @IsNotEmpty()
   duration: number;
   @IsDateString()
   date: string;
   @IsBoolean()
   @IsNotEmpty()
   published: boolean;
   @IsNotEmpty()
   status: Status; // Cambiado el tipo a string
}
