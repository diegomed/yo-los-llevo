import { Pressable, StyleSheet, Text, View } from "react-native";
import Palette from "../../utils/colors";

export function CloseButton({ onPress }) {
    return (
        <View style={style.closeButtonView}>
            <Pressable onPress={onPress}>
                <Text style={style.closeButton}>x</Text>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    closeButton: {
        color: Palette.primary200,
        fontWeight: 'bold',
        fontSize: 22
    },
    closeButtonView: {
        backgroundColor: Palette.primary800,
        width: 35,
        height: 35,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28
    }
});