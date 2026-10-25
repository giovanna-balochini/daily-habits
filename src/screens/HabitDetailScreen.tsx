import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useHabits } from '../context/HabitContext';

type HabitDetailScreenRoute = RouteProp<RootStackParamList, 'HabitDetail'>;

export default function HabitDetailScreen() {
    const route = useRoute<HabitDetailScreenRoute>();
    const { habitId } = route.params;
    const { getHabitById } = useHabits();
    const habit = getHabitById(habitId);

    if (!habit) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hábito não encontrado</Text>
                <Text style={styles.emptyText}>
                    Este hábito pode ter sido removido. Volte e tente novamente.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📋 Detalhes do Hábito </Text>
            <Text style={styles.habitName}>{habit.name}</Text>
            <Text style={styles.hintText}>Histrico de completamento</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f8fafc',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 16,
        color: '#0f172a'
    },
    habitName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#172033',
        marginBottom: 8,
    },
    hintText: {
        fontSize: 14,
        color: '#64748B',
    },
    emptyText: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 22,
    },
});