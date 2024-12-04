import { View, Text } from 'react-native';

export function Title({ children, wrapperStyles, textStyles }) {
    return (
        <View style={wrapperStyles}>
            <Text style={textStyles}>{children}</Text>
        </View>
    );
}