import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import {
  CreateTodoInput,
  UpdateTodoInput,
  DeleteTodoInput,
} from './dto/inputs';
import { StatusArgs } from './dto/args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      completed: false,
    },
  ];

  count(status?: StatusArgs): number {
    if (status !== undefined)
      return this.todos.filter((todo) => todo.completed === status.status)
        .length;
    return this.todos.length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    if (statusArgs.status !== undefined)
      return this.todos.filter((todo) => todo.completed === statusArgs.status);
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo #${id} not found`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = {
      id: Math.max(...this.todos.map((todo) => todo.id), 0) + 1,
      ...createTodoInput,
    };
    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, ...data } = updateTodoInput;
    const todoUpdate = this.findOne(id);
    Object.assign(todoUpdate, data);
    this.todos = this.todos.map((todo) => (todo.id === id ? todoUpdate : todo));
    return todoUpdate;
  }

  remove(deleteTodoInput: DeleteTodoInput): Todo {
    const todo = this.findOne(deleteTodoInput.id);
    this.todos = this.todos.filter((todo) => todo.id !== deleteTodoInput.id);
    return todo;
  }
}
