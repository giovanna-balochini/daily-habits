import type { Habit, HabitCompletion } from '../types/habit';
import type { HabitAction } from '../types/habitActions';

export interface HabitState {
  habits: Habit[];
  completions: HabitCompletion[];
}

export const INITIAL_STATE: HabitState = {
  habits: [],
  completions: [],
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function habitReducer(state: HabitState, action: HabitAction): HabitState {
  switch (action.type) {
    case 'ADD_HABIT': {
      const newHabit: Habit = {
        id: generateId(),
        name: action.payload.name,
        icon: action.payload.icon,
        color: action.payload.color,
        frequency: action.payload.frequency,
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        habits: [...state.habits, newHabit],
      };
    }

    case 'UPDATE_HABIT': {
      const { id, ...updates } = action.payload;
      return {
        ...state,
        habits: state.habits.map((h) =>
          h.id === id ? { ...h, ...updates } : h
        ),
      };
    }

    case 'DELETE_HABIT': {
      return {
        habits: state.habits.filter((h) => h.id !== action.payload.id),
        completions: state.completions.filter(
          (c) => c.habitId !== action.payload.id
        ),
      };
    }

    case 'TOGGLE_COMPLETION': {
      const { habitId, date } = action.payload;
      const existingIndex = state.completions.findIndex(
        (c) => c.habitId === habitId && c.date === date
      );

      if (existingIndex >= 0) {
        return {
          ...state,
          completions: state.completions.filter((_, i) => i !== existingIndex),
        };
      }

      const newCompletion: HabitCompletion = {
        habitId,
        date,
        completedAt: new Date().toISOString(),
      };
      return {
        ...state,
        completions: [...state.completions, newCompletion],
      };
    }

    case 'RESTORE_FROM_STORAGE': {
      return {
        habits: action.payload.habits ?? [],
        completions: action.payload.completions ?? [],
      };
    }

    default:
      return state;
  }
}
