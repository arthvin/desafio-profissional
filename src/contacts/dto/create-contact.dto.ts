import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(120)
  email?: string;

  @IsOptional()
  @Matches(/^[0-9+\-() ]{6,30}$/)
  @MaxLength(30)
  phone?: string;
}
