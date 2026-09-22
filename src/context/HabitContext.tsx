import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { habitReducer, INITIAL_STATE, HabitState } from './HabitReducer';
import type {
  AddHabitPayload,
  ToggleCompletionPayload,
  UpdateHabitPayload,
} from '../types/habitActions';
import { STORAGE_KEYS } from '../utils/constants';
import { getTodayKey } from '../utils/dateUtils';
import {
  enrichHabitWithStats,
  getHabitsForDate,
} from '../utils/habitStats';
import type { HabitWithStats } from '../types/habit';

interface HabitContextValue extends HabitState {
  isLoading: boolean;
  todayHabits: HabitWithStats[];
  allHabitsWithStats: HabitWithStats[];
  addHabit: (payload: AddHabitPayload) => void;
  updateHabit: (payload: UpdateHabitPayload) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (habitId: string, date?: string) => void;
  getHabitById: (id: string) => HabitWithStats | null;
}

const HabitContext = createContext<HabitContextValue | undefined>(undefined);

interface HabitProviderProps {
  children: ReactNode;
}

export function HabitProvider({ children }: HabitProviderProps) {
  const [state, dispatch] = useReducer(habitReducer, INITIAL_STATE);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function loadFromStorage() {
      try {
        const [habitsRaw, completionsRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.HABITS),
          AsyncStorage.getItem(STORAGE_KEYS.COMPLETIONS),
        ]);

        const habits = habitsRaw ? JSON.parse(habitsRaw) : [];
        const completions = completionsRaw ? JSON.parse(completionsRaw) : [];

        dispatch({
          type: 'RESTORE_FROM_STORAGE',
          payload: { habits, completions },
        });
      } catch (err) {
        console.error('[HabitContext] Erro ao carregar dados do AsyncStorage:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadFromStorage();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    async function saveToStorage() {
      try {
        await Promise.all([
          AsyncStorage.setItem(
            STORAGE_KEYS.HABITS,
            JSON.stringify(state.habits)
          ),
          AsyncStorage.setItem(
            STORAGE_KEYS.COMPLETIONS,
            JSON.stringify(state.completions)
          ),
        ]);
      } catch (err) {
        console.error('[HabitContext] Erro ao salvar no AsyncStorage:', err);
      }
    }

    saveToStorage();
  }, [state.habits, state.completions, isLoading]);

  const todayKey = getTodayKey();

  const todayHabits = useMemo(
    () => getHabitsForDate(state.habits, state.completions, todayKey),
    [state.habits, state.completions, todayKey]
  );

  const allHabitsWithStats = useMemo(
    () =>
      state.habits.map((h) =>
        enrichHabitWithStats(h, state.completions, todayKey)
      ),
    [state.habits, state.completions, todayKey]
  );

  const value = useMemo<HabitContextValue>(
    () => ({
      ...state,
      isLoading,
      todayHabits,
      allHabitsWithStats,
      addHabit: (payload) => dispatch({ type: 'ADD_HABIT', payload }),
      updateHabit: (payload) => dispatch({ type: 'UPDATE_HABIT', payload }),
      deleteHabit: (id) => dispatch({ type: 'DELETE_HABIT', payload: { id } }),
      toggleCompletion: (habitId, date) =>
        dispatch({
          type: 'TOGGLE_COMPLETION',
          payload: {
            habitId,
            date: date ?? todayKey,
          } as ToggleCompletionPayload,
        }),
      getHabitById: (id) => {
        const habit = state.habits.find((h) => h.id === id);
        if (!habit) return null;
        return enrichHabitWithStats(habit, state.completions, todayKey);
      },
    }),
    [state, isLoading, todayHabits, allHabitsWithStats, todayKey]
  );

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
}

export function useHabits(): HabitContextValue {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}