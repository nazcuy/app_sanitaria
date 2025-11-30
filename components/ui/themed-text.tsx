import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type ThemedTextType = 'title' | 'subtitle' | 'default' | 'defaultSemiBold' | 'link';

interface ThemedTextProps extends TextProps {
    type?: ThemedTextType;
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode;
}

export function ThemedText({
    style,
    type = "default",
    children,
    ...props
}: ThemedTextProps) {
    const typeStyles = [
        styles.base,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "defaultSemiBold" && styles.defaultSemiBold,
        type === "link" && styles.link,
    ];

    return (
        <Text
            style={[...typeStyles.filter(Boolean), style]}
            {...props}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    base: {
        color: "#000",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        color: "#666",
    },
    defaultSemiBold: {
        fontSize: 16,
        fontWeight: "600",
    },
    link: {
        color: "#007AFF",
        fontWeight: "600",
    },
});
