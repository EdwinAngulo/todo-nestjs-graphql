import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min, IsInt } from 'class-validator';

@InputType()
export class DeleteTodoInput {
  @Field(() => Int, { description: 'Todo id' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  id: number;
}
