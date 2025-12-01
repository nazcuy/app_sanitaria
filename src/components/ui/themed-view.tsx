import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface ThemedViewProps extends ViewProps {
    darkColor?: string;
    lightColor?: string;
}

export function ThemedView({ style, ...props }: ThemedViewProps) {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: '#FFFFFF' },
                style,
            ]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    container: {},
});