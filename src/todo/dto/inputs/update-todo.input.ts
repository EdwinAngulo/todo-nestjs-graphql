import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsBoolean,
  Min,
  IsInt,
  IsOptional,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'Todo id' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'Todo title', nullable: true })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  title?: string;

  @Field(() => String, { description: 'Todo description', nullable: true })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  completed?: boolean;
}
