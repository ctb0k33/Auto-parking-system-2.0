import { Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants';

/**
 * Button component for displaying a customizable button within the app.
 * 
 * @param {Object} props - The props object for the Button component.
 * @param {string} props.title - The text to display on the button.
 * @param {(event: GestureResponderEvent) => void;} props.onPress
 * @param {boolean} [props.disabled=false] - Optional. If true, the button is disabled and cannot be pressed.
 * @returns A Pressable component configured as a button with custom styles.
 */

export default function Button({ title, onPress, disabled = false }) {
    return (
        <Pressable
            style={disabled ? [styles.button, styles.disabled] : styles.button}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 60,
        elevation: 3,
        backgroundColor: COLORS.PURPLE,
    },
    disabled: {
        backgroundColor: COLORS.GREY_2,
    },
    text: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '600',
        color: COLORS.WHITE,
    },
});
