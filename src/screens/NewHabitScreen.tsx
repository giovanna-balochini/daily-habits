import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import type { HabitFrequency, Weekday } from '../types/habit';
import { HABIT_COLORS, HABIT_ICONS } from '../utils/constants';

export default function NewHabitScreen() {
  const [habitName, setHabitName] = useState('');
  const [habitIcon, setHabitIcon] = useState(HABIT_ICONS[0]);
  const [habitColor, setHabitColor] = useState(HABIT_COLORS[0]);
  const [habitFrequency, setHabitFrequency] = useState<HabitFrequency>({
    type: 'daily',
  });
  const [specificDays, setSpecificDays] = useState<Weekday[]>([]);
  const [hasTouchedHabitName, setHasTouchedHabitName] = useState(false);

  const habitNameError =
    hasTouchedHabitName && habitName.trim().length === 0
      ? 'Informe o nome do hábito.'
      : undefined;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>➕ Novo Hábito</Text>

            <Text style={styles.label}>Defina um hábito</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Ex.: Beber 2L de água"
                placeholderTextColor="#94a3b8"
                value={habitName}
                onChangeText={setHabitName}
                autoFocus
                returnKeyType="done"
            />

            <TouchableOpacity
                style={[
                    styles.saveButton,
                    habitName.trim().length === 0 && styles.saveButtonDisabled,
                ]}
                disabled={habitName.trim().length === 0}
                onPress={() => console.log('Salvar:', { habitName, habitIcon, habitColor, habitFrequency })}
                activeOpacity={0.7}
            >
                <Text style={styles.saveButtonText}>Salvar hábito</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    contentContainer: {
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 24,
        color: '#0f172a',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
    },
    textInput: {
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#0f172a',
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        marginBottom: 24,
    },
    saveButton: {
        marginTop: 8,
        height: 52,
        backgroundColor: '#6366f1',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#c7d2fe',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});