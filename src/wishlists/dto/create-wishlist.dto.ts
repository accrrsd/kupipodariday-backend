import { IsNotEmpty, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @Length(1, 1500)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsOptional()
  itemsId: number[];
}
