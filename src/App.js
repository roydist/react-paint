// @ts-nocheck
import React from 'react';
import Toolbar from 'paint-area/Toolbar';
import PaintArea from 'paint-area/PaintArea';
import ToolProvider from 'context/ToolContext';
import  CursorProvider from 'context/CursorContext';
import './App.css';

const App = () => {
    return (
        <ToolProvider>
         <CursorProvider>
              <div className="paint-wrapper">
                <Toolbar></Toolbar>
                <PaintArea></PaintArea>
              </div>
              </CursorProvider>
        </ToolProvider>

    );
}

export default App;