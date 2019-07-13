import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
       background: {
           default: '#efefef',
       },
       primary: {
           light: '#444444a4',
           main: '#444',
           dark: '#333',

       }
    },
    typography: {
        fontFamily: ['-apple-system', 'Jura', 'Roboto', 'sans-serif'].join(','),
    },
    overrides: {
        MuiInputLabel: {
            animated: {
                fontSize: '1.3rem',
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '1.3rem',
                lineHeight: '1.6rem'
            }
        }
    }
});

export const MaterialThemeProvider = props => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
};
