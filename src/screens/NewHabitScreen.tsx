import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import type { HabitFrequency, Weekday } from '../types/habit';
import {
  HABIT_COLORS,
  HABIT_ICONS,
  WEEKDAY_LABELS,
  WEEKDAY_ORDER,
  getColorForIcon,
} from '../utils/constants';
import { useHabits } from '../context/HabitContext';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  shadows,
  spacing,
} from '../utils/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ALL_WEEKDAYS: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

const FREQUENCY_OPTIONS: { type: HabitFrequency['type']; label: string }[] = [
  { type: 'daily', label: 'Diário' },
  { type: 'weekly', label: 'Semanal' },
  { type: 'specific_days', label: 'Dias' },
];

export default function NewHabitScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addHabit } = useHabits();

  const [habitName, setHabitName] = useState('');
  const [habitIcon, setHabitIcon] = useState<string>(HABIT_ICONS[0]);
  const [habitColor, setHabitColor] = useState<string>(
    getColorForIcon(HABIT_ICONS[0])
  );
  const [frequencyType, setFrequencyType] =
    useState<HabitFrequency['type']>('daily');
  const [specificDays, setSpecificDays] = useState<Weekday[]>([]);
  const [showNameError, setShowNameError] = useState(false);

  const trimmedName = habitName.trim();
  const isNameValid = trimmedName.length > 0;

  function handleSelectIcon(icon: string) {
    setHabitIcon(icon);
    setHabitColor(getColorForIcon(icon));
  }

  function handleSelectFrequency(type: HabitFrequency['type']) {
    setFrequencyType(type);

    if (type !== 'specific_days') {
      setSpecificDays([]);
    }
  }

  function toggleWeekday(day: Weekday) {
    setSpecificDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function handleSubmit() {
    if (!isNameValid) {
      setShowNameError(true);
      return;
    }

    const frequency: HabitFrequency =
      frequencyType === 'specific_days'
        ? {
            type: 'specific_days',
            specificDays:
              specificDays.length > 0 ? specificDays : ALL_WEEKDAYS,
          }
        : { type: frequencyType };

    addHabit({
      name: trimmedName,
      icon: habitIcon,
      color: habitColor,
      frequency,
    });

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionLabel}>Nome do hábito</Text>
          <TextInput
            style={[styles.input, showNameError && !isNameValid && styles.inputError]}
            placeholder="Ex.: Beber 2L de água"
            placeholderTextColor={colors.textMuted}
            value={habitName}
            onChangeText={(text) => {
              setHabitName(text);
              if (showNameError && text.trim().length > 0) {
                setShowNameError(false);
              }
            }}
            onBlur={() => setShowNameError(true)}
            autoFocus
            returnKeyType="done"
          />
          {showNameError && !isNameValid && (
            <Text style={styles.errorText}>Informe o nome do hábito.</Text>
          )}

          <Text style={styles.sectionLabel}>Ícone</Text>
          <View style={styles.iconGrid}>
            {HABIT_ICONS.map((icon) => {
              const isSelected = habitIcon === icon;

              return (
                <TouchableOpacity
                  key={icon}
                  style={styles.iconGridItem}
                  onPress={() => handleSelectIcon(icon)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View
                    style={[
                      styles.iconButton,
                      isSelected && {
                        backgroundColor: `${habitColor}14`,
                        borderColor: habitColor,
                      },
                    ]}
                  >
                    <Text style={styles.iconEmoji}>{icon}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>Cor</Text>
          <View style={styles.colorRow}>
            {HABIT_COLORS.map((color) => {
              const isSelected = habitColor === color;

              return (
                <TouchableOpacity
                  key={color}
                  style={styles.colorItem}
                  onPress={() => setHabitColor(color)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View
                    style={[
                      styles.colorRing,
                      isSelected && {
                        borderColor: color,
                      },
                    ]}
                  >
                    <View
                      style={[styles.colorSwatch, { backgroundColor: color }]}
                    >
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={colors.textInverse}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>Frequência</Text>
          <View style={styles.segmented}>
            {FREQUENCY_OPTIONS.map((option) => {
              const isSelected = frequencyType === option.type;

              return (
                <TouchableOpacity
                  key={option.type}
                  style={[styles.segment, isSelected && styles.segmentActive]}
                  onPress={() => handleSelectFrequency(option.type)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      isSelected && styles.segmentTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {frequencyType === 'specific_days' && (
            <View style={styles.weekdayRow}>
              {WEEKDAY_ORDER.map((day) => {
                const isSelected = specificDays.includes(day);

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.weekdayChip,
                      isSelected && {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => toggleWeekday(day)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text
                      style={[
                        styles.weekdayText,
                        isSelected && styles.weekdayTextActive,
                      ]}
                    >
                      {WEEKDAY_LABELS[day]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              !isNameValid && styles.saveButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isNameValid}
            activeOpacity={0.85}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.saveButtonText,
                !isNameValid && styles.saveButtonTextDisabled,
              ]}
            >
              Salvar hábito
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  sectionLabel: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.md,
  },
  input: {
    height: 50,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.bodyLg,
    color: colors.textPrimary,
    marginBottom: spacing.xxl,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    marginTop: -spacing.lg,
    marginBottom: spacing.xl,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.danger,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.xl,
  },
  iconGridItem: {
    width: '20%',
    padding: spacing.xs,
  },
  iconButton: {
    aspectRatio: 1,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 22,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.xl,
  },
  colorItem: {
    width: '20%',
    padding: spacing.xs,
  },
  colorRing: {
    aspectRatio: 1,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSwatch: {
    width: '82%',
    height: '82%',
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmented: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  segment: {
    flex: 1,
    height: 38,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.surface,
    ...shadows.subtle,
  },
  segmentText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.textPrimary,
    fontWeight: fontWeight.semibold,
  },
  weekdayRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  weekdayChip: {
    flex: 1,
    height: 40,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayText: {
    fontSize: 11,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  weekdayTextActive: {
    color: colors.textInverse,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  saveButton: {
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: colors.surfaceMuted,
  },
  saveButtonText: {
    fontSize: fontSize.bodyLg,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
  },
  saveButtonTextDisabled: {
    color: colors.textMuted,
  },
});
