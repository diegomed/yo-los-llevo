import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal } from 'react-native';

import { Task } from '../components/molecules/Task';
import { AddTaskForm } from '../components/organisms/AddTaskForm';
import { useTasksAPI } from '../hooks/useTasksAPI';

export default function Feed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const { getTasks, addTask } = useTasksAPI();

  function fetchData() {
    setIsLoading(true);
    setIsFetching(true);
    getTasks().then(
      res => {
        setTasks(res.data);
        setIsLoading(false);
        setIsFetching(false);
      }
    ).catch(
      err => console.log(err)
    );
  }

  useEffect(() => {
    fetchData();
  }, [modalVisible])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Yo los llevo!</Text>
      </View>
      <View style={styles.button}>
        <Button title='Agregar tarea' onPress={() => setModalVisible(true)}/>
      </View>
      {!isLoading && tasks.length === 0 ? <Text style={styles.noTasksMsg}>No hay tareas pendientes.</Text> : null}
      <FlatList
        data={tasks}
        renderItem={task => {
          const dateCurrentTask = new Date(task.item.date);
          const datePreviousTask = tasks[task.index - 1] ? new Date(tasks[task.index - 1].date) : null;
          return (
            <Task
              name={task.item.name}
              date={task.item.date}
              description={task.item.description}
              shouldDisplayDate={datePreviousTask ? dateCurrentTask.getTime() !== datePreviousTask.getTime() : true} />
          )
        }}
        keyExtractor={task => task.id}
        refreshing={isFetching}
        onRefresh={fetchData}
      />
      <Modal visible={modalVisible} animationType='slide'>
        <AddTaskForm onCancel={setModalVisible} onSubmit={addTask} />
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
  noTasksMsg: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 100
  }
});
