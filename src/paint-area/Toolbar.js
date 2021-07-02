import React from 'react';
import classNames from "classnames";
import { useSetTool, useTool } from '../context/ToolContext';
import './Toolbar.css';

export default function Toolbar() {
    const tool = useTool();
    const setTool = useSetTool();

    return (
        <div className="toolbar-container">
            <div className={classNames({'active': tool ==='Rect'})} onClick={() => setTool('Rect')}>Rect</div>
            <div className={classNames({'active': tool ==='Circle'})} onClick={() => setTool('Circle')}>Circle</div>
            <div className={classNames({'active': tool ==='Line'})} onClick={() => setTool('Line')}>Line</div>
            <div className={classNames({'active': tool ==='Ellipse'})} onClick={() => setTool('Ellipse')}>Ellipse</div>
            <div className={classNames({'active': tool ==='Text'})} onClick={() => setTool('Text')}>Text</div>
            <div className={classNames({'active': tool ==='Star'})}  onClick={() => setTool('Star')}>Star</div>
        </div>
    );
};
