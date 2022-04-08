import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Container from '@mui/material/Container';
import store from './store';
import './App.css';
import ListsPage from './routes/Lists/Lists.page';
import ListPage from './routes/List/List.page';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F69234',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#000',
            contrastText: '#FFF',
        },
        background: {
            default: '#E5E5E5',
            paper: '#FFF',
        },
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg" sx={{ paddingTop: 11 }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Navigate to="/lists" replace />} />
                            <Route path="/lists" element={<ListsPage />}>
                                <Route path=":id" element={<ListPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Container>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
