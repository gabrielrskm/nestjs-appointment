import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class SigninWithPasswordDto{
   @IsEmail()
   @IsNotEmpty()
   email: string;
   @IsString()
   @IsNotEmpty()
   password: string;
}

export class SigninWithProviderDto{
   @IsEmail()
   @IsNotEmpty()
   email: string;
   @IsNotEmpty()
   provider: Provider;
}


export enum Provider {
   GOOGLE,
   FACEBOOK,
   TWITTER,
   GITHUB
}

