import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import type { HabitFrequency, Weekday } from '../types/habit';
import { HABIT_COLORS, HABIT_ICONS, WEEKDAY_LABELS, getColorForIcon } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useHabits } from '../context/HabitContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NewHabitScreen() {
  const [habitName, setHabitName] = useState('');
  const [habitIcon, setHabitIcon] = useState<string>(HABIT_ICONS[0]);
  const [habitColor, setHabitColor] = useState<string>(getColorForIcon(HABIT_ICONS[0]));
  const [habitFrequency, setHabitFrequency] = useState<HabitFrequency>({
    type: 'daily',
  });
  const [specificDays, setSpecificDays] = useState<Weekday[]>([]);
  const [hasTouchedHabitName, setHasTouchedHabitName] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { addHabit } = useHabits();

  const habitNameError =
    hasTouchedHabitName && habitName.trim().length === 0
      ? 'Informe o nome do hábito.'
      : undefined;

  function toggleWeekday(day: number) {
    setSpecificDays((prev) => {
      if (prev.includes(day as any)) {
        return prev.filter((d) => d !== (day as any));
      }
      return [...prev, day as any];
    });
  }

  function handleFrequencyChange(type: 'daily' | 'weekly' | 'specific_days') {
    setHabitFrequency({ type });
    if (type !== 'specific_days') {
      setSpecificDays([]);
    }
  }

  function handleSubmit() {
    if (habitName.trim().length === 0) {
      setHasTouchedHabitName(true);
      return;
    }

    const frequency =
      habitFrequency.type === 'specific_days'
        ? {
            type: 'specific_days' as const,
            specificDays: specificDays.length > 0 ? specificDays : ([0, 1, 2, 3, 4, 5, 6] as any),
          }
        : habitFrequency;

    addHabit({
      name: habitName.trim(),
      icon: habitIcon,
      color: habitColor,
      frequency,
    });

    navigation.goBack();
  }

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
        onBlur={() => setHasTouchedHabitName(true)}
        autoFocus
        returnKeyType="done"
      />
      {habitNameError && (
        <Text style={styles.errorText}>{habitNameError}</Text>
      )}

      <Text style={styles.label}>Escolha um ícone</Text>
      <View style={styles.iconGrid}>
        {HABIT_ICONS.map((icon) => (
          <TouchableOpacity
            key={icon}
            style={styles.iconGridItem}
            onPress={() => {
              setHabitIcon(icon);
              setHabitColor(getColorForIcon(icon));
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconButton,
                habitIcon === icon && {
                  borderColor: habitColor,
                  borderWidth: 2.5,
                  backgroundColor: `${habitColor}15`,
                },
              ]}
            >
              <Text style={styles.iconButtonEmoji}>{icon}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Escolha uma cor</Text>
      <View style={styles.colorRow}>
        {HABIT_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={styles.colorButtonWrapper}
            onPress={() => setHabitColor(color)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.colorButton,
                { backgroundColor: color },
                habitColor === color && {
                  borderWidth: 3,
                  borderColor: '#172033',
                  transform: [{ scale: 1.1 }],
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Com que frequência?</Text>
      <View style={styles.frequencyRow}>
        <TouchableOpacity
          style={[
            styles.frequencyChip,
            habitFrequency.type === 'daily' && {
              backgroundColor: '#6366F1',
              borderColor: '#6366F1',
            },
          ]}
          onPress={() => handleFrequencyChange('daily')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.frequencyChipText,
              habitFrequency.type === 'daily' && { color: '#fff' },
            ]}
          >
            Diariamente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.frequencyChip,
            habitFrequency.type === 'weekly' && {
              backgroundColor: '#6366F1',
              borderColor: '#6366F1',
            },
          ]}
          onPress={() => handleFrequencyChange('weekly')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.frequencyChipText,
              habitFrequency.type === 'weekly' && { color: '#fff' },
            ]}
          >
            Semanalmente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.frequencyChip,
            habitFrequency.type === 'specific_days' && {
              backgroundColor: '#6366F1',
              borderColor: '#6366F1',
            },
          ]}
          onPress={() => handleFrequencyChange('specific_days')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.frequencyChipText,
              habitFrequency.type === 'specific_days' && { color: '#fff' },
            ]}
          >
            Dias específicos
          </Text>
        </TouchableOpacity>
      </View>

      {habitFrequency.type === 'specific_days' && (
        <View style={styles.weekdayRow}>
          {Object.entries(WEEKDAY_LABELS).map(([dayStr, label]) => {
            const day = Number(dayStr);
            const isSelected = specificDays.includes(day as any);

            return (
              <TouchableOpacity
                key={dayStr}
                style={[
                  styles.weekdayChip,
                  isSelected && {
                    backgroundColor: '#6366F1',
                    borderColor: '#6366F1',
                  },
                ]}
                onPress={() => toggleWeekday(day)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.weekdayChipText,
                    isSelected && { color: '#fff' },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: habitName.trim().length > 0 ? habitColor : '#c7d2fe' },
        ]}
        disabled={habitName.trim().length === 0}
        onPress={handleSubmit}
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
    color: '#172033',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  errorText: {
    marginTop: -16,
    marginBottom: 16,
    fontSize: 12,
    fontWeight: '600',
    color: '#ef4444',
  },
  textInput: {
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#172033',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    marginBottom: 24,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginBottom: 24,
  },
  iconGridItem: {
    flexBasis: '20%',
    padding: 4,
  },
  iconButton: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  iconButtonEmoji: {
    fontSize: 24,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 24,
  },
  colorButtonWrapper: {
    width: '10%',
    padding: 6,
  },
  colorButton: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  frequencyRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  frequencyChip: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frequencyChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  weekdayChip: {
    flexBasis: '13%',
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdayChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
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
