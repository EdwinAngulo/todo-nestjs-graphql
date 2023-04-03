import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AggregationsType {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;
}
