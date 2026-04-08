import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class signInDto {
  @ApiProperty({ example: 'jean@mail.com' })
  @IsEmail({}, { message: 'L\'email est invalide' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class AuthPayloadDto {
  @ApiProperty({ example: 'jean@mail.com' })

  @IsEmail({}, { message: 'L\'email est invalide' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password!: string;

}
