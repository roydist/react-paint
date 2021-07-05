import React from 'react';
import Toolbar from 'paint-area/Toolbar';
import ToolProvider from './context/ToolsContext';
import CursorProvider from './context/CursorContext';
import './App.css';
import Canvas from 'paint-area/Canvas';

const App = () => {
  return (
    <ToolProvider>
      <CursorProvider>
        <div className="paint-wrapper">
          <Toolbar></Toolbar>
          <Canvas></Canvas>
        </div>
      </CursorProvider>
    </ToolProvider>
  );
};

export default App;
