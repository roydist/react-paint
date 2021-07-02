import React, { useContext, useEffect } from 'react';
import classNames from "classnames";
import './Toolbar.css';
import { ToolContext } from './App';

export default function Toolbar({ dispatch }) {
    const tool = useContext(ToolContext)

    useEffect(() => {
        dispatch('Rect');
    }, []);
    return (
        <div className="toolbar-container">
            <div className={classNames({'active': tool ==='Rect'})} onClick={() => dispatch('Rect')}>Rect</div>
            <div className={classNames({'active': tool ==='Circle'})} onClick={() => dispatch('Circle')}>Circle</div>
            <div className={classNames({'active': tool ==='Line'})} onClick={() => dispatch('Line')}>Line</div>
            <div className={classNames({'active': tool ==='Ellipse'})} onClick={() => dispatch('Ellipse')}>Ellipse</div>
            <div className={classNames({'active': tool ==='Text'})} onClick={() => dispatch('Text')}>Text</div>
            <div className={classNames({'active': tool ==='Star'})}  onClick={() => dispatch('Star')}>Star</div>
        </div>
    );
};
