import { StyleSheet, Text, View } from 'react-native';
import Palette from '../../utils/colors';

import { convertDateToReadableString } from '../../utils/functions';
import { CloseButton } from '../atoms/CloseButton';
import { PrimaryButton } from '../atoms/PrimaryButton';

export function Task({ name, date, description, shouldDisplayDate, onClosePress, onEditPress }) {
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
                    <View style={styles.closeButonContainer}>
                        <CloseButton onPress={onClosePress}></CloseButton>
                    </View>
                </View>
                <View>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.updateButtonContainer}>
                    <PrimaryButton onPress={onEditPress}>Editar</PrimaryButton>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: Palette.primary400,
        borderColor: Palette.primary200,
        borderRadius: 5,
        borderWidth: 3,
        padding: 8,
        margin: 12
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: Palette.primary800
    },
    nameContainer: {
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: Palette.primary800
    },
    dateString: {
        fontSize: 18,
        color: Palette.primary400
    },
    dateStringContainer: {
        paddingHorizontal: 18
    },
    closeButonContainer: {
        position: 'absolute',
        top: 0,
        right: 5
    },
    updateButtonContainer: {
        flex: 1,
        width: '50%',
        alignSelf: 'flex-end',
        margin: 10,
        marginTop: 20
    }
});