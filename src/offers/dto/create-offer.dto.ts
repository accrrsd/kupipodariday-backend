import { IsBoolean, IsNotEmpty, IsOptional, NotEquals } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  @NotEquals(0)
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;
}
