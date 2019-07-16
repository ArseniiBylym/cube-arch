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
           light: '#333333a4',
           main: '#444',
           dark: '#333',
       },
       secondary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: "#fff"
    }
    },
    typography: {
        fontFamily: ['-apple-system', 'Jura', 'Roboto', 'sans-serif'].join(','),
    },
    overrides: {
        MuiInputLabel: {
            animated: {
                fontSize: '1.3rem',
                '@media (max-width:600px)': {
                    fontSize: '1rem',
                },
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '1.3rem',
                lineHeight: '1.6rem',
            },
        },
        MuiDialog: {
            paper: {
                '@media (max-width:600px)': {
                    margin: '20px'
                },
            }
        },
        MuiTableCell: {
            root: {
                fontSize: '1.2rem'
            },
            head: {
                fontSize: '1rem'
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
