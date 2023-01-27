/**
 * @jest-environment jsdom
 */

import React, { useState as useStateMock } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

// it("App Snapshot", () => {
//   const app = renderer.create(<App />).toJSON();
//   expect(app).toMatchSnapshot();
// });

describe("App test Compornent", () => {
  const setState = jest.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
  });

  describe("Snapshot Testing", () => {
    it("toMatchSnapshot", () => {
      const app = render(<App />);
      expect(app).toMatchSnapshot();
    });
  });

  describe("初期表示", () => {
    it("Todoリストタイトルが描画されていること", async () => {
      render(<App />);
      // タイトル
      expect(screen.getByText(/Todoリスト/)).toBeTruthy();
    });

    it("入力テキストがtextタイプで描画されていること", async () => {
      render(<App />);
      // 入力テキスト
      const todoText = screen.getByPlaceholderText("Todoを入力");
      expect(todoText).toHaveAttribute("type", "text");
    });

    it("ADDボタンが描画されていること", async () => {
      render(<App />);
      // ADDボタン
      const addButton = screen.getByRole("button");
      expect(addButton).toBeTruthy();
    });

    it("Todoリストが空になっていること", async () => {
      render(<App />);
      // Todoリスト
      const todos = screen.queryAllByTestId(/todoList_/);
      expect(todos).toBeNull;
    });
  });

  describe("リスト追加", () => {
    it("空文字以外の場合、ToDoリストに追加した文字列が追加されていること ", async () => {
      render(<App />);

      // const headerTitle = screen.getByText("Todoリスト");
      const addButton = screen.getByRole("button");
      const todoText = screen.getByPlaceholderText(
        "Todoを入力"
      ) as HTMLInputElement;
      const inputTodo = "変更後";

      fireEvent.change(todoText, {
        target: { value: inputTodo },
      });
      expect(todoText.value).toBe(inputTodo);

      userEvent.type(todoText, inputTodo);
      userEvent.click(addButton);

      const afterTodoList = screen.queryAllByRole("listitem");
      expect(afterTodoList).not.toBeNull;
    });

    it("空文字の場合、ToDoリストに空文字が追加されていないこと ", async () => {
      render(<App />);
      const addButton = screen.getByRole("button");

      userEvent.click(addButton);

      const afterTodoList = screen.queryAllByRole("listitem");

      expect(afterTodoList).toBeNull;
    });
  });
});
