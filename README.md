This repo is the reproduction for [a bug in `rollup-plugin-babel`](https://github.com/rollup/rollup-plugin-babel/issues/271).

To reproduce:

    $ npm install
    $ ./node_modules/.bin/rollup -c packages/react-router/rollup.config.js

This will give you an error, saying it can't find the "classProperties" transform in your babel config.

    Add @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.
    packages/react-router/modules/BrowserHistory.js (4:19)
    SyntaxError: /Users/michael/Projects/rollup-plugin-babel-bug/packages/react-router/modules/BrowserHistory.js: Support for the experimental syntax 'classProperties' isn't currently enabled (4:20):

      2 |
      3 | class BrowserHistory extends React.Component {
    > 4 |   static propTypes = {};
        |                    ^
      5 |
      6 |   render() {
      7 |     return null;

    Add @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.
        at Parser.raise (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:4028:15)
        at Parser.expectPlugin (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:5348:18)
        at Parser.parseClassProperty (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:8235:12)
        at Parser.pushClassProperty (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:8199:30)
        at Parser.parseClassMemberWithIsStatic (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:8138:14)
        at Parser.parseClassMember (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:8075:10)
        at Parser.parseClassBody (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:8030:12)
        at Parser.parseClass (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:7980:10)
        at Parser.parseStatementContent (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:7305:21)
        at Parser.parseStatement (/Users/michael/Projects/rollup-plugin-babel-bug/node_modules/@babel/parser/lib/index.js:7277:17)

However, you'll notice this transform is already declared in `packages/react-router/modules/.babelrc`.

    $ cd packages/react-router
    $ ../../node_modules/.bin/rollup -c

This command works fine.

It appears that `rollup-plugin-babel` is able to find the `.babelrc` when `rollup` is run from inside `packages/react-router`, but not from the repo root. But the whole point of a file-relative config file like `.babelrc` is that it shouldn't matter what the current working directory is; they will always apply to files that are relative to their location on disk.
