# todo-28th
## アプリ実行方法
- ターミナル上で `package.json`のあるディレクトリに移動する
```
cd todo-28th
```
- アプリ起動
```
% yarn dev
yarn run v1.22.19
$ vite

  VITE v3.2.5  ready in 836 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
- 任意のブラウザで下記urlにアクセス
```
http://localhost:5173/
```

## jestを手動で実行
- ターミナル上で以下を実行
```
% yarn test
```

### エラーがある場合のjest結果
```
 % yarn test
yarn run v1.22.19
$ jest
 FAIL  __tests__/App.spec.tsx (7.747 s)
  Todoリスト
    ✓ toMatchSnapshot (36 ms)
    ✓ 空のタスクの場合、何も変わらない (42 ms)
    ✓ タスクを追加する (24 ms)
    ✓ タスクを編集する (11 ms)
    ✓ タスクの完了/未完了を切り替える (104 ms)
    ✕ タスクを削除する (15 ms)

  ● Todoリスト › タスクを削除する

    TestingLibraryElementError: Unable to find an element with the text: DEL. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="App"
        >
          <div>
            <h2>
              Todoリスト
            </h2>
            <form>
              <input
                class="inputText"
                data-testid="inputTodo"
                placeholder="Todoを入力"
                type="text"
                value=""
              />
              <button
                class="submitButton"
                data-testid="submitAdd"
                type="submit"
              >
                ADD
              </button>
              <div
                class="remaining"
              >
                未完了タスク： 
                1
                個
              </div>
            </form>
            <ul
              class="todoList"
            >
              <li
                data-testid="todoList_0"
              >
                <input
                  data-testid="todo_0"
                  type="text"
                  value="新しいタスク"
                />
                <input
                  type="checkbox"
                />
                <button>
                  DELETE
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </body>

       99 |     expect(newTodo).toBeInTheDocument();
      100 |
    > 101 |     const deleteButton = screen.getByText("DEL");
          |                                 ^
      102 |
      103 |     fireEvent.click(deleteButton);
      104 |

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at node_modules/@testing-library/dom/dist/query-helpers.js:76:38
      at node_modules/@testing-library/dom/dist/query-helpers.js:52:17
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (__tests__/App.spec.tsx:101:33)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   97.41 |      100 |   77.77 |   97.41 |                   
 App.tsx  |   97.41 |      100 |   77.77 |   97.41 | 64-66             
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 1 total
Tests:       1 failed, 5 passed, 6 total
Snapshots:   1 passed, 1 total
Time:        8.802 s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
### エラーがない場合のjest結果
```
% yarn test
yarn run v1.22.19
$ jest
 PASS  __tests__/App.spec.tsx (5.342 s)
  Todoリスト
    ✓ toMatchSnapshot (36 ms)
    ✓ 空のタスクの場合、何も変わらない (23 ms)
    ✓ タスクを追加する (44 ms)
    ✓ タスクを編集する (11 ms)
    ✓ タスクの完了/未完了を切り替える (101 ms)
    ✓ タスクを削除する (35 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 App.tsx  |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   1 passed, 1 total
Time:        6.431 s, estimated 8 s
Ran all test suites.
✨  Done in 10.69s.
```
