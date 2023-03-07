import { IsNotEmpty, IsUrl, Length, Min } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @Length(1, 1024)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;
}
