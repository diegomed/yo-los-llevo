import { StyleSheet, Text, View } from 'react-native';

export function Task(props) {
    return (
        <View style={styles.taskContainer}>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{props.name}</Text>
            </View>
            <View>
                <Text>{props.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        margin: 12
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 14
    },
    nameContainer: {
        marginVertical: 5
    }
});