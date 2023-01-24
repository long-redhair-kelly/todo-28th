/**
 * @jest-environment jsdom
 */

import React, { useState as useStateMock } from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("App test Compornent", () => {
  const setState = jest.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
  });

  describe("初期表示", () => {
    it("Todoリストタイトルが描画されていること", () => {
      render(<App />);
      const linkElement = screen.getByText(/Todoリスト/);
      expect(linkElement).toBeInTheDocument();
    });

    it("入力テキストのtypeがtextになっていること", () => {
      render(<App />);
      const todoText = screen.getByPlaceholderText("Todoを入力");
      expect(todoText).toHaveAttribute("type", "text");
    });

    it("ボタンが１つ描画されていること ", async () => {
      render(<App />);
      const buttonList = await screen.findAllByTestId("submitButton");
      expect(buttonList).toHaveLength(1);
    });
    it("ToDoリストが0個になっていること ", async () => {
      render(<App />);
      const todos = screen.queryAllByTestId(/todoList_/);
      expect(todos).toBeNull;
    });
  });

  describe("リスト追加", () => {
    it.todo(
      "空文字以外の場合、ToDoリストに追加した文字列が追加されていること "
    );
    // it("空文字以外の場合、ToDoリストに追加した文字列が追加されていること ", async () => {
    //   render(<App />);
    //   const addButton = await screen.findByTestId("submitButton");
    //   const todoText = screen.getByPlaceholderText("Todoを入力");

    //   screen.debug(addButton);

    //   userEvent.type(todoText, "hogehoge");
    //   userEvent.click(addButton);

    //   const afterTodoList = screen.queryAllByTestId(/todoList_/);
    //   expect(afterTodoList).toBeInTheDocument();
    // });

    it("空文字の場合、ToDoリストに空文字が追加されていないこと ", async () => {
      render(<App />);
      const addButton = screen.getByTestId("submitButton");

      userEvent.click(addButton);

      const afterTodoList = screen.queryAllByTestId(/todoList_/);

      expect(afterTodoList).toBeNull;
    });
  });
});
