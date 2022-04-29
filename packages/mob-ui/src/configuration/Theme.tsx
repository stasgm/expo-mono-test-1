import { createTheme, lightColors } from '@rneui/themed';

const theme = createTheme({
  Button: {
    raised: true,
  },
  // lightColors: {
  //   primary: colors.primary,
  //   secondary: colors.accent,
  //   background: colors.placeholder,
  // },
});

export { createTheme, lightColors };

export default theme;
