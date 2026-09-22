import type { Habit, HabitCompletion, HabitFrequency } from './habit';

export type AddHabitPayload = {
    name: string;
    icon: string;
    color: string;
    frequency: HabitFrequency;
};

export type UpdateHabitPayload = {
    id: string;
    name?: string;
    icon?: string;
    color?: string;
    frequency?: HabitFrequency;
};

export type ToggleCompletionPayload = {
    habitId: string;
    date: string;
};

export type RestoreFromStoragePayload = {
    habits: Habit[];
    completions: HabitCompletion[];
};

export type HabitAction = 
    | { type: 'ADD_HABIT'; payload: AddHabitPayload }
    | { type: 'UPDATE_HABIT'; payload: UpdateHabitPayload }
    | { type: 'DELETE_HABIT'; payload: { id: string } }
    | { type: 'TOGGLE_COMPLETION'; payload: ToggleCompletionPayload }
    | { type: 'RESTORE_FROM_STORAGE'; payload: RestoreFromStoragePayload };
