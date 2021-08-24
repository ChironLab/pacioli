import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from '@material-ui/core/styles';

declare module '@material-ui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme();

type Props = {
  children: JSX.Element | JSX.Element[];
};

const ThemeWrapper = ({ children }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeWrapper;
