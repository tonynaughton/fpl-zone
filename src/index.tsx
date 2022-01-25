import ReactDOM from 'react-dom';
import Typography from '@mui/material/Typography';
import './index.css'
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@emotion/react';

const customTheme = createTheme({
  typography: {
    fontFamily: [
      'Grandstander',
      'Roboto Condensed'
    ].join(',')
  }
})

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Typography variant='h3' component="h1" className="app-heading">
          Welcome to FPL Zone!
        </Typography>
      </div>
    </ThemeProvider>
  );
}

ReactDOM.render( <App/>, document.getElementById('root'));
