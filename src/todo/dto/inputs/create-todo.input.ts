import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Todo title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @Field(() => String, { description: 'Todo description' })
  @IsString()
  description: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  completed: boolean;
}
