import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type ToDo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

type Prop = {
  todos: ToDo[];
};

export const TodoList = ({ todos = [] }: Prop) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
