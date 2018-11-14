import path from "path";
import babel from "rollup-plugin-babel";

const external = id => !id.startsWith(".") && !id.startsWith("/");

export default {
  input: path.resolve(__dirname, "modules/index.js"),
  output: { file: path.resolve(__dirname, "react-router.js"), format: "esm" },
  external,
  plugins: [
    babel({
      runtimeHelpers: true,
      plugins: [["@babel/transform-runtime", { useESModules: true }]]
    })
  ]
};
