import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal } from 'react-native';

import Palette from '../utils/colors';

import { Task } from '../components/molecules/Task';
import { AddTaskForm } from '../components/organisms/AddTaskForm';
import { useTasksAPI } from '../hooks/useTasksAPI';
import { Title } from '../components/atoms/Title';
import { PrimaryButton } from '../components/atoms/PrimaryButton';

export default function Feed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { getTasks, getTaskById, addTask, deleteTask, updateTask } = useTasksAPI();

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

  function performDelete(id) {
    deleteTask(id)
      .then(res => {
        fetchData();
      })
      .catch(err => {
        console.log(err)
      });
  }

  function upsertTask(data) {
    if (data?.id) {
      updateTask({ id: data?.id, name: data?.name, date: data?.date, description: data?.description })
        .then(res => setModalVisible(false))
        .catch(err => console.log(err));
    } else {
      addTask({ name: data?.name, date: data?.date, description: data?.description })
        .then(res => setModalVisible(false))
        .catch(err => console.log(err));
    }
  }

  function openModal(data) {
    if(data._id) {
      getTaskById(data._id)
        .then(task => {
          setTask(task.data);
          setIsUpdate(true);
          setModalVisible(true);
        })
        .catch(err => console.log(err));
    } else {
      setIsUpdate(false);
      setModalVisible(true);
    }
  }

  useEffect(() => {
    setIsUpdate(false);
    fetchData();
  }, [modalVisible])

  return (
    <View style={styles.container}>
      <Title textStyles={styles.header}>Yo Los Llevo!</Title>
      <View style={styles.button}>
        <PrimaryButton onPress={() => openModal(false)} isAccent>Agregar tarea</PrimaryButton>
      </View>
      {!isLoading && tasks.length === 0 ? <Text style={styles.noTasksMsg}>No hay tareas pendientes.</Text> : null}
      <FlatList
        data={tasks}
        renderItem={task => {
          const dateCurrentTask = new Date(task.item.date);
          const datePreviousTask = tasks[task.index - 1] ? new Date(tasks[task.index - 1].date) : null;
          return (
            <Task
              id={task.item._id}
              name={task.item.name}
              date={task.item.date}
              description={task.item.description}
              shouldDisplayDate={datePreviousTask ? dateCurrentTask.getTime() !== datePreviousTask.getTime() : true}
              onClosePress={() => performDelete(task.item._id)}
              onEditPress={() => openModal(task.item)} />
          )
        }}
        keyExtractor={task => task._id}
        refreshing={isFetching}
        onRefresh={fetchData}
      />
      <Modal visible={modalVisible} animationType='slide'>
        <AddTaskForm onCancel={setModalVisible} onSubmit={upsertTask} isUpdate={isUpdate} data={task} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.primary600,
    justifyContent: 'flex-start'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 28,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    color: Palette.primary000
  },
  button: {
    margin: 10
  },
  noTasksMsg: {
    color: Palette.primary800,
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 100
  }
});
