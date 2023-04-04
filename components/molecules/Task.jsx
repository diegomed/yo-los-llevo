import { StyleSheet, Text, View } from 'react-native';

import { convertDateToReadableString } from '../../utils/functions';

export function Task({ name, date, description, shouldDisplayDate }) {
    return (
        <>
            {shouldDisplayDate && (
                <View style={styles.dateStringContainer}>
                    <Text style={styles.dateString}>{convertDateToReadableString(date)}</Text>
                </View>
            )}
            <View style={styles.taskContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <View>
                    <Text>{description}</Text>
                </View>
            </View>
        </>
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
    },
    dateString: {
        fontSize: 18,
        color: 'silver'
    },
    dateStringContainer: {
        paddingHorizontal: 18
    }
});