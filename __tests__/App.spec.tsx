/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Todoリスト", () => {
  it("toMatchSnapshot", () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });

  it("空のタスクの場合、何も変わらない", async () => {
    const todoText = "";
    render(<App />);

    const inputTodo = screen.getByTestId("inputTodo");
    const submitButton = screen.getByTestId("submitAdd");

    fireEvent.change(inputTodo, { target: { value: todoText } });
    fireEvent.click(submitButton);

    const newTodo = await screen.queryByTestId("todo_0");
    expect(newTodo).toBeNull();
  });

  it("タスクを追加する", async () => {
    const todoText = "新しいタスク";
    render(<App />);

    const inputTodo = screen.getByTestId("inputTodo");
    const submitButton = screen.getByTestId("submitAdd");

    fireEvent.change(inputTodo, { target: { value: todoText } });
    fireEvent.click(submitButton);

    const newTodo = await screen.findByTestId("todo_0");
    expect(newTodo).toHaveValue(todoText);
  });

  it("タスクを編集する", async () => {
    const todoText = "新しいタスク";
    const editedTodoText = "編集後のタスク";
    render(<App />);

    const inputTodo = screen.getByTestId("inputTodo");
    const submitButton = screen.getByTestId("submitAdd");

    fireEvent.change(inputTodo, { target: { value: todoText } });
    fireEvent.click(submitButton);

    const newTodo = await screen.findByTestId("todo_0");
    expect(newTodo).toBeInTheDocument();

    fireEvent.change(newTodo, { target: { value: editedTodoText } });

    const editedTodo = await screen.findByDisplayValue(editedTodoText);
    expect(editedTodo).toBeInTheDocument();
  });

  it("タスクの完了/未完了を切り替える", async () => {
    const todoText = "新しいタスク";
    render(<App />);

    const inputTodo = screen.getByTestId("inputTodo");
    const submitButton = screen.getByTestId("submitAdd");

    fireEvent.change(inputTodo, { target: { value: todoText } });
    fireEvent.click(submitButton);

    const newTodo = await screen.findByTestId("todo_0");
    expect(newTodo).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("タスクを削除する", async () => {
    const todoText = "新しいタスク";
    render(<App />);

    const inputTodo = screen.getByTestId("inputTodo");
    const submitButton = screen.getByTestId("submitAdd");

    fireEvent.change(inputTodo, { target: { value: todoText } });
    fireEvent.click(submitButton);

    const newTodo = await screen.findByTestId("todo_0");
    expect(newTodo).toBeInTheDocument();

    const deleteButton = screen.getByText("DEL");

    fireEvent.click(deleteButton);

    expect(newTodo).not.toBeInTheDocument();
  });
});
