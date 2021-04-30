module.exports = {
"extends": ["airbnb", "plugin:prettier/recommended"],
    "plugins": ["mocha"],
    "rules": {
      "prettier/prettier": [
        "error",
        {
          "singleQuote": true,
          "semi": true,
            "endOfLine": "auto"
        }
      ],
      "no-plusplus": "off",
      "max-classes-per-file": "off",
      "react/jsx-filename-extension": "off",
      "react/prefer-stateless-function": "off",
      "react/state-in-constructor": "off",
      "import/prefer-default-export": "off"
    },
    "env": {
      "browser": true,
      "node": true
    },
  }
