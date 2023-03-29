import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Task } from './UI/Task';
import { AddTaskForm } from './UI/AddTaskForm';
import { useTasksAPI } from './hooks/useTasksAPI';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { getTasks, addTask } = useTasksAPI();

  useEffect(() => {
    getTasks().then(
      res => setTasks(res.data)
    ).catch(
      err => console.log(err)
    );
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Yo los llevo!</Text>
      </View>
      <View style={styles.button}>
        <Button title='Agregar tarea' onPress={() => setModalVisible(true)}/>
      </View>
      <FlatList
        data={tasks}
        renderItem={(task) => {
          return (
            <Task name={task.item.name} description={task.item.description} />
          )
        }}
        keyExtractor={(m, i) => i}
      />
      <Modal visible={modalVisible} animationType='slide'>
        <TouchableWithoutFeedback onPress={() => console.log('Touched!')}>
          <AddTaskForm onCancel={setModalVisible} onAdd={addTask} onAddFinish={setTasks} />
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'flex-start'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10
  },
  headerContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 20
  },
  button: {
    margin: 10
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});
