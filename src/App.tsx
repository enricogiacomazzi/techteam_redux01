import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { MyCounter } from './app/components/MyCounter';
import { Container } from './app/components/Container';
import { TodoList } from './app/components/Todo/TodoList';

//const MemoCounter = React.memo(Counter);

function App() {
  return (
    <>
      <MyCounter/>
      <Container>
        <Counter/>
      </Container>
      <TodoList/>
    </>
  );
}

export default App;
