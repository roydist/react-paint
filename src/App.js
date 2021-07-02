import React, { createContext, useReducer } from 'react';
import Toolbar from './paint-area/Toolbar';
import { PaintArea } from './paint-area/PaintArea';
import './App.css';
export const  ToolContext = createContext(null);

const App = () => {
  const [tool, dispatch] = useReducer((state, newTool) => newTool, null);

    return (
      <div className="paint-wrapper">
        <ToolContext.Provider value={ tool }>
          <Toolbar dispatch={dispatch}></Toolbar>
          <PaintArea></PaintArea>
        </ToolContext.Provider>
      </div>
    );
}

export default App;