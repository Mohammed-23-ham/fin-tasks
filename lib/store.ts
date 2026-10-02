import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasks/taskSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            tasks: tasksReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];