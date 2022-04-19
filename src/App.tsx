import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import TodoList from './components/TodoList';
import GlobalStyle from './themes/GlobalStyle';
import { defaultTheme } from './themes/theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TodoList></TodoList>
    </ThemeProvider>
  );
}

export default App;
