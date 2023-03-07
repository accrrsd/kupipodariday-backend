import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @MaxLength(200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
