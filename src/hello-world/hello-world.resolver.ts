import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'Hello World description',
  })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Random number description',
  })
  randomNumber(): number {
    return Math.random();
  }

  @Query(() => Int, {
    name: 'randomNumberFromZeroTo',
    description: 'Random number from zero to n description',
  })
  getRandomNumberFromZeroTo(
    @Args('n', { nullable: true, type: () => Int })
    n = 10,
  ): number {
    return Math.floor(Math.random() * n);
  }
}
