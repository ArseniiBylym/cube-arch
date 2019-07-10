import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
       background: {
           default: '#efefef',
       }
    },
    typography: {
        fontFamily: ['-apple-system', 'Jura', 'Roboto', 'sans-serif'].join(','),
    },
});

export const MaterialThemeProvider = props => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
};
