import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const {onToggleButton, tg} = useTelegram();
  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <button onClick={onToggleButton}>toggle</button>
      </header>
    </div>
  );
}

export default App;
