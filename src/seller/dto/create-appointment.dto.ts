import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString,IsDateString } from "class-validator";

export class createAppointmentDto{
   @IsEmail()
   @IsNotEmpty()
   emailSeller: string;
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
   status: Status
   @IsOptional()
   @IsString()
   userId?: string;
   
}

export enum Status { 
   
   'RESERVE',
   'AVIABLE',
   'CANCELED',
   'SUCCESS',
   'EXPIRED',
 }