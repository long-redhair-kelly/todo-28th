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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!inputText) {
      return;
    }

    // 新しいTodo作成
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    console.log("***inputText: ", inputText);
    setInputText(inputText);
  };

  // todo編集
  const handleEdit = (id: number, inputValue: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    console.log(deepCopy);

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
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
            placeholder="Todoを入力"
          />
          <button
            type="submit"
            data-testid="submitButton"
            className="submitButton"
          >
            ADD
          </button>
          <div className="remaining">未完了タスク： {todos.length}個</div>
        </form>
        {/* タスク設定が完了したら */}
        <ul className="todoList">
          {todos.map((todo) => (
            <li data-testid={"todoList_" + todo.id} key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>DEL</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
