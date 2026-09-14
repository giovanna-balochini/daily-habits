import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type HabitDetailScreenRoute = RouteProp<RootStackParamList, 'HabitDetail'>;

export default function HabitDetailScreen() {
    const route = useRoute<HabitDetailScreenRoute>();
    const { habitId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📋 Detakhes do Hábito </Text>
            <Text>ID: {habitId}</Text>
            <Text>Histórico, streak, edição e exclusão virão aqui</Text>
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
});