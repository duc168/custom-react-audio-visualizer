import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import reactSvg from "rollup-plugin-react-svg";
import dts from 'rollup-plugin-dts'

const isDev = process.env.ROLLUP_ENV === 'development'
const isProd = process.env.ROLLUP_ENV === 'production'
const packageJson = isDev ?
  require("./package.json") :
  (
    isProd
      ? require("./package-pro.json")
      : require("./package.json")
  );
export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      reactSvg({
        // svgo options
        svgo: {
          plugins: [], // passed to svgo
          multipass: true
        },

        // whether to output jsx
        jsx: false,

        // include: string
        include: null,

        // exclude: string
        exclude: null
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
      }),
      // svgr()
    ],
    external: ['react', 'react-dom']
  },
  {
    // path to your declaration files root
    input: './src/index.tsx',
    output: [
      {
        file: packageJson.mainType,
        format: "cjs",
        sourcemap: true
      },
      {
        file: packageJson.moduleType,
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [dts()],
  },
];