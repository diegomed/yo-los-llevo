import { Pressable, StyleSheet, Text, View } from "react-native";
import Palette from "../../utils/colors";

export function PrimaryButton({ children, onPress, isAccent }) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable onPress={onPress} style={[styles.buttonInnerContainer, { backgroundColor: isAccent ? Palette.primary200 : Palette.primary800 }]} android_ripple={{ color: Palette.primary600 }}>
                <Text style={[styles.buttonText, { color: isAccent ? Palette.primary600 : Palette.primary000 }]}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterConteiner: {
        margin:4
    },
    buttonInnerContainer: {
        backgroundColor: Palette.primary200,
        borderRadius: 28,
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    buttonText: {
        textAlign: 'center',
        color: Palette.primary800
    }
});