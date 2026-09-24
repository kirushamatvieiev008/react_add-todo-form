import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

const todosData = () => {
  return todosFromServer.map(el => {
    return {
      ...el,
      user: usersFromServer.find(us => us.id === el.userId)!,
    };
  });
};

import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [shouldShowErrTitle, setShouldShowErrTitle] = useState(false);
  const [shouldShowErrUser, setShouldShowErUser] = useState(false);
  const [toDos, setToDos] = useState(todosData());

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (shouldShowErrTitle) {
      setShouldShowErrTitle(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !userId) {
      if (!title) {
        setShouldShowErrTitle(true);
      }

      if (!userId) {
        setShouldShowErUser(true);
      }
    } else {
      setShouldShowErUser(false);
      setShouldShowErrTitle(false);
      const maxId = Math.max(...toDos.map(el => el.id));

      setToDos([
        ...toDos,
        {
          id: maxId + 1,
          title: title,
          userId: userId,
          completed: false,
          user: usersFromServer.find(us => us.id === userId)!,
        },
      ]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleChangeTitle}
          />
          {shouldShowErrTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              if (shouldShowErrUser) {
                setShouldShowErUser(false);
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {shouldShowErrUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={toDos} />
    </div>
  );
};
