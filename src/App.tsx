import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number; // keyを指定するため
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };

  // todo編集
  const handleEdit = (id: number, inputValue: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // 完了未完了
  const handleChecked = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        // toggle
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // 削除
  const handleDelete = (id: number) => {
    // idが一致した場合のみ消す
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-testid="inputTodo"
            value={inputText}
            onChange={handleChange}
            className="inputText"
            placeholder="Todoを入力"
          />
          <button
            type="submit"
            data-testid="submitAdd"
            className="submitButton"
          >
            ADD
          </button>
          <div className="remaining">未完了タスク： {todos.length}個</div>
        </form>
        {/* タスクリスト */}
        <ul className="todoList">
          {todos.map((todo) => (
            <li data-testid={"todoList_" + todo.id} key={todo.id}>
              <input
                type="text"
                data-testid={"todo_" + todo.id}
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>DELELTE</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
