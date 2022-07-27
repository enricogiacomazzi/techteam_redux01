import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks';
import { decrement, increment, RootState } from '../store';


export const MyCounter:React.FC = () => {
    const dispach = useAppDispatch();
    const {value} = useAppSelector(s => s.myCounter);

    console.log('myCounter render');

    return <h1>
        <button onClick={() => dispach(decrement())}>-</button>
        <span style={{margin: '10px'}}>{value}</span>
        <button  onClick={() => dispach(increment())}>+</button>
        </h1>
}