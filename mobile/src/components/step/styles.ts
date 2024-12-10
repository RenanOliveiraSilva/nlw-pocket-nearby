import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/styles/theme';

export const s = StyleSheet.create({
    container: {
        width: '100%', //Entre aspas pois % é um caractere especial
        flexDirection: 'row',
        gap: 16,
    },
    title: {
        fontSize: 16,
        fontFamily: fontFamily.semiBold,
        color: colors.gray[600],
    
    },
    description: {
        fontSize: 14,
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
        marginTop: 4,
    },
    details: {
        flex: 1,
    }

});