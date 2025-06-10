import js            from "@eslint/js";
import globals       from "globals";
import vuePlugin     from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import vueParser from "vue-eslint-parser"
import process from "node:process";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js, vue: vuePlugin,  },
    languageOptions: { globals: globals.browser },
    extends: [
      "js/recommended",
      vuePlugin.configs["flat/essential"],
    ],

    rules: {
      //------------------------------------------------------------------
      // Indentatie
      //------------------------------------------------------------------
      indent: ["error", 2, { SwitchCase: 1 }],      // 2 spaties overal
      //------------------------------------------------------------------
      // Debugger / console afhankelijk van omgeving
      //------------------------------------------------------------------
      "no-debugger":      isProd ? "error" : "off",
      "no-console": [
        isProd ? "error" : "warn",
        { allow: ["warn", "error"] },               // console.warn/error mag altijd
      ],

      //------------------------------------------------------------------
      // Vue-specifieke uitzonderingen
      //------------------------------------------------------------------
      "vue/no-v-html":        "off", // v-html toegestaan
      "vue/no-v-text":        "off", // v-text toegestaan
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 3,    // max. 3 attrib. in één regel
          multiline: { max: 1 }, // multiregel ⇒ 1 attribuut per regel
        },
      ],
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {         
      parser: vueParser,                    
      parserOptions: {
        parser: js,                        
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      indent: "off",                       
      "vue/script-indent": ["error", 2,     
        { baseIndent: 1, switchCase: 1 }],
      "vue/html-indent":  ["error", 2,      
        { baseIndent: 1 }]
    },
  },
]);
