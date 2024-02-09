import { Transform } from 'class-transformer';
import { IsString, IsBoolean, IsArray, IsDate } from 'class-validator';

export class NoteDto {

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isActive: boolean;

  @IsBoolean()
  readonly completed: boolean;

  @IsArray()
  readonly tags: string[];

  @Transform(({value})=>new Date(value))
  @IsDate()
  readonly createdAt: Date;

  readonly author?: string
}
