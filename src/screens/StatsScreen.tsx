import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Estatísticas</Text>
            <Text>Resumo semanal/mensal virá aqui</Text>
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
