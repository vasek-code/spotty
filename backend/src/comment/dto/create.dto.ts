import { IsNumber, IsString, Max, Min } from "class-validator";

export class CommentCreateDto {
  @IsString()
  markerId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  body: string;
}
