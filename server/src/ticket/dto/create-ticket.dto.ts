import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  epic?: string;

  @IsOptional()
  @IsString()
  learning_outcomes?: string;

  @IsOptional()
  @IsString()
  reflections?: string;

  @IsOptional()
  @IsNumber()
  comfort_level?: number;

  @IsOptional()
  @IsString()
  link?: string;
}
