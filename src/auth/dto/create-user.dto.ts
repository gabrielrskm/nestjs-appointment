import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserWithPasswordDto{
   @IsEmail()
   email: string;
   @IsString()
   password: string;
   @IsString()
   @IsNotEmpty()
   firstName: string;
   @IsOptional()
   @IsString()
   lastName?: string;
   @IsOptional()
   @IsString()
   profilePicture?: string;
}

export class CreateUserWithProviderDto{
   @IsEmail()
   email: string;
   provider: Provider;
   @IsString()
   @IsNotEmpty()
   firstName: string;
   @IsOptional()
   @IsString()
   lastName?: string;
   @IsOptional()
   @IsString()
   profilePicture?: string;
}


export enum Provider {
   GOOGLE,
   FACEBOOK,
   TWITTER,
   GITHUB
}

