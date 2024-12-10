import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/styles/theme';

export const s = StyleSheet.create({
    logo: {
        width: 48,
        height: 48,
        marginTop: 24,
        marginBottom: 28
    },
    title: {
        fontSize: 24,
        fontFamily: fontFamily.bold,
        color: colors.gray[600],
        marginBottom: 12
        
    },
    subtitle: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
        marginBottom: 12
    }
});