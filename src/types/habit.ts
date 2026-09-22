export type FrequencyType = 'daily' | 'weekly' | 'specific_days';

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface HabitFrequency {
    type: FrequencyType;
    specificDays?: Weekday[];
}

export interface Habit {
    id: string;
    name: string;
    icon: string;
    color: string;
    frequency: HabitFrequency;
    createdAt: string;
}

export interface HabitCompletion {
    habitId: string;
    date: string;
    completedAt: string;
}

export interface HabitWithStats extends Habit {
    currentStreak: number;
    totalCompletions: number;
    isCompletedToday: boolean;
}
