import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type TasksList = {
    items: Task[];
};

const initialState: TasksList = {
    items: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded(state, action: PayloadAction<Task>) {
            state.items.push(action.payload);
        },
        taskToggled(state, action: PayloadAction<string>) {
            const task = state.items.find((item) => item.id === action.payload);

            if (task) {
                task.completed = !task.completed;
            }
        },
    }
});

export const { taskAdded, taskToggled } = tasksSlice.actions;
export default tasksSlice.reducer;