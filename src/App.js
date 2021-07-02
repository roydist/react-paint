// @ts-nocheck
import React from 'react';
import Toolbar from './paint-area/Toolbar';
import PaintArea from './paint-area/PaintArea';
import ToolProvider from './context/ToolContext';
import  MouseProvider from './context/MouseContext';
import './App.css';

const App = () => {
    return (
        <ToolProvider>
         
              <div className="paint-wrapper">
                <Toolbar></Toolbar>
                <PaintArea></PaintArea>
              </div>
        
        </ToolProvider>

    );
}

export default App;