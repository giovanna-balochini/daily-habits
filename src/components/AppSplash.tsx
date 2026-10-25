import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../utils/theme';

export default function AppSplash() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Meus Hábitos</Text>
      <Text style={styles.subtitle}>
        Construa sua rotina, um dia de cada vez.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xxl,
  },
  logo: {
    width: 132,
    height: 132,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
