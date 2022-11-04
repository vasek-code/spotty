import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export class MarkerCreateDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({
    each: true,
  })
  hashtags: string[];

  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => String)
  @IsOptional()
  images: string;
}
