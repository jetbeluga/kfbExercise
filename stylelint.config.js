module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: ['stylelint-scss', 'stylelint-selector-bem-pattern'],
  rules: {
    'plugin/selector-bem-pattern': {
      preset: 'suit',
    },
    'max-nesting-depth': 5,
    'selector-class-pattern': /^([A-Z][a-zA-Z0-9]*)?(-[a-z0-9][a-zA-Z0-9]*)?(--[a-z0-9][a-zA-Z0-9]*)?$|^(u|is|has|js)(-[a-z0-9][a-zA-Z0-9]*)+$/,
  },
};
