/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";

describe("App.tsx のテスト", () => {
  // test.todo("ADD ボタン押下でtodoリストに追加されること");
  test.todo("todoリストの任意のcheckboxにチェックすると非活性になること");
  test.todo("todoリストの任意のDELボタン押下でリストから削除されること");

  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Todoリスト/);
    expect(linkElement).toBeInTheDocument();
  });
});
