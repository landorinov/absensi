import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combine } from './reducers';

const store = configureStore({ reducer: combine }, applyMiddleware(thunk))

export default store;