import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Keyboard } from 'react-native';
import Palette from '../../utils/colors';
import { PrimaryButton } from '../atoms/PrimaryButton';

export function AddTaskForm({ onSubmit, onCancel, isUpdate, data }) {
  const [name, setName] = useState(isUpdate ? data.name : '');
  const [date, setDate] = useState(isUpdate ? data.date : '');
  const [description, setDescription] = useState(isUpdate ? data.description : '');
  const [submitButtonTitle, setSubmitButtonTitle] = useState('Agregar');

  useEffect(() => {
    setSubmitButtonTitle(isUpdate ? 'Editar' : 'Agregar');
  }, [])

  return (
      <View style={styles.modalContainer}>
        <View style={styles.nameAndDateContainer}>
          <TextInput
            placeholder='Su nombre y apellido...'
            style={[styles.input, { width: '55%' }]}
            onChangeText={(name) => setName(name)}
            value={name}
          />
          <TextInput
            placeholder='YYYY-MM-DD'
            style={[styles.input, { width: '30%' }]}
            onChangeText={(date) => setDate(date)}
            value={date}
          />
        </View>
        <TextInput
          placeholder='Cual es la tarea...'
          multiline={true}
          numberOfLines={10}
          style={styles.textarea}
          onBlur={Keyboard.dismiss}
          onChangeText={(desc) => setDescription(desc)}
          value={description}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <PrimaryButton onPress={() => onCancel(false)} isAccent>Cancelar</PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={() => onSubmit({ id: data?._id, name, date, description })}>{submitButtonTitle}</PrimaryButton>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 10
  },
  buttonContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.primary600
  },
  input: {
    borderColor: Palette.primary800,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    width: '55%',
    backgroundColor: Palette.primary200
  },
  textarea: {
    borderColor: Palette.primary800,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    height: 200,
    textAlignVertical: 'top',
    width: '90%',
    backgroundColor: Palette.primary200
  },
  nameAndDateContainer: {
    flexDirection: 'row'
  }
});