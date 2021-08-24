import { ThemeProvider, StyledEngineProvider } from '@material-ui/core/styles';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { theme } from './theme';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const ThemeWrapper = ({ children }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
};

export default ThemeWrapper;
