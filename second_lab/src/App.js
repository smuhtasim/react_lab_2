import './App.css';
import TimerList from './TimerList';
import { TimerContext } from './Context/TimerContext';
import { useState } from 'react';

function App() {
  const [timerContext, setTimerContext] = useState(require('./data.json'))
  return (
    <div className="App">
      <TimerContext.Provider value = {{timerContext, setTimerContext}}>
      <TimerList />
      </TimerContext.Provider>
    </div>
  );
}

export default App;
