import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Keyboard } from 'react-native';

export function AddTaskForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  function submitTask() {
      onSubmit({ name, date, description })
          .then(res => onCancel(false))
          .catch(err => console.log(err));
  }

  return (
      <View style={styles.modalContainer}>
        <View style={styles.nameAndDateContainer}>
          <TextInput placeholder='Su nombre y apellido...' style={[styles.input, { width: '55%' }]} onChangeText={(name) => setName(name)}/>
          <TextInput placeholder='DD/MM/YYYY' style={[styles.input, { width: '30%' }]} onChangeText={(date) => setDate(date)}/>
        </View>
        <TextInput
          placeholder='Cual es la tarea...'
          multiline={true}
          numberOfLines={10}
          style={styles.textarea}
          onBlur={Keyboard.dismiss}
          onChangeText={(desc) => setDescription(desc)}/>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Cancelar' onPress={() => onCancel(false)}/>
          </View>
          <View style={styles.button}>
            <Button title='Agregar' onPress={() => submitTask()}/>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite'
  },
  input: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    width: '55%',
    backgroundColor: 'white'
  },
  textarea: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    height: 200,
    textAlignVertical: 'top',
    width: '90%',
    backgroundColor: 'white'
  },
  nameAndDateContainer: {
    flexDirection: 'row'
  }
});