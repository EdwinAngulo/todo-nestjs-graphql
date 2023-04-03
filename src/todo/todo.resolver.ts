import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import {
  CreateTodoInput,
  UpdateTodoInput,
  DeleteTodoInput,
} from './dto/inputs';
import { StatusArgs } from './dto/args';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  create(@Args('todo') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  update(@Args('todo') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Todo, { name: 'removeTodo' })
  remove(@Args('todo') deleteTodoInput: DeleteTodoInput) {
    return this.todoService.remove(deleteTodoInput);
  }

  @Query(() => AggregationsType)
  aggregations() {
    return {
      count: this.todoService.count(),
      pending: this.todoService.count({ status: false }),
      completed: this.todoService.count({ status: true }),
    };
  }
}
