import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import InputModal from './InputModal';
import {MMKV} from 'react-native-mmkv';
import notifee from '@notifee/react-native';

const DATA = [
  {
    task: 'Create TODO App',
    taskTime: '2024-02-01',
    taskDay: 'Monday',
    isDone: false,
  },
  {
    task: 'Send email to John',
    taskTime: '2024-02-02',
    taskDay: 'Tuesday',
    isDone: false,
  },
  {
    task: 'Do Leetcode',
    taskTime: '2024-02-03',
    taskDay: 'Thursday',
    isDone: false,
  },
];

const TodoItem = ({data, onPress, textColor, taskTime, taskDay, onRemove}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.containerTodoItem,
        backgroundColor: textColor === 'black' ? '#ffffff' : '#222222',
      }}>
      {data?.isDone ? (
        <Text style={{fontSize: 16, marginLeft: 15, color: 'green'}}>✅</Text>
      ) : (
        <Text style={{fontSize: 20, marginLeft: 15, color: 'red'}}>☐️</Text>
      )}

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              ...styles.txtTodoItem,
              textDecorationLine: data?.isDone ? 'line-through' : 'none',
              color: textColor,
            }}>
            {data?.task}
          </Text>
          <Text
            style={{
              ...styles.txtTodoItem,
              fontWeight: 'light',
              color: 'red',
            }}>
            {taskTime} {taskDay ? ', ' : ''} {taskDay}
          </Text>
        </View>
        <TouchableOpacity onPress={onRemove}>
          <Text
            style={{
              fontSize: 12,
              color: 'red',
              fontWeight: 'bold',
              marginRight: 15,
            }}>
            ❌
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const TodoList = ({style, dark}) => {
  const [tasks, setTasks] = useState(DATA);
  const [showInput, setShowInput] = useState(false);
  const storage = new MMKV();

  useEffect(() => {
    loadTasks();
  }, []);


  useEffect(() => {
    tasks.forEach(task => {
      const {taskTime} = task;

      if (isTaskTimeToday(taskTime)) {
        scheduleNotification();
      }
    });
  }, [tasks]);
  

  const isTaskTimeToday = taskTime => {
    const today = new Date().toISOString().split('T')[0];
    return today === taskTime;
  };

  const scheduleNotification = async () => {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'alarm',
        name: 'Default Channel',
      });
  
      tasks.forEach(async task => {
        if (isTaskTimeToday(task.taskTime)) {
          await notifee.displayNotification({
            title: 'Todo Reminder',
            body: `Don't forget to: ${task.task}`,
            android: {
              channelId,
              pressAction: {
                id: 'alarm',
              },
            },
          });
        }
      });
    } catch (error) {
      console.error('Failed to schedule notifications:', error);
    }
  };
  
  const loadTasks = async () => {
    try {
      const storedTasks = storage.getString('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async updatedTasks => {
    try {
       storage.set('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const onSave = (newTask, selectedDate, selectedWeekday) => {
    setShowInput(false);
    const updatedTasks = [
      {
        task: newTask,
        taskTime: selectedDate,
        taskDay: selectedWeekday,
        isDone: false,
      },
      ...tasks,
    ];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const onPressTaskItem = index => {
    const tempTask = [...tasks];
    tempTask[index] = {...tempTask[index], isDone: !tempTask[index].isDone};
    const doneTasks = tempTask.filter(task => task.isDone);
    const undoneTasks = tempTask.filter(task => !task.isDone);
    const updatedTasks = [...undoneTasks, ...doneTasks];
    setTasks(updatedTasks);
  };

  const onRemoveTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const onCancle = () => {
    setShowInput(prev => !prev);
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <InputModal
        visible={showInput}
        onChangeText={t => {
          onSave(t);
          console.log(t);
        }}
        onSave={onSave}
        oncancle={onCancle}
        dark={dark}
      />

      <FlatList
        style={{flex: 1}}
        data={tasks}
        renderItem={({item, index}) => {
          return (
            <TodoItem
              data={item}
              taskTime={item?.taskTime}
              taskDay={item?.taskDay}
              onPress={() => {
                onPressTaskItem(index);
              }}
              textColor={style.color}
              onRemove={() => {
                onRemoveTask(index);
              }}
            />
          );
        }}
      />

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          right: -10,
          backgroundColor: style.backgroundColor,
          height: 40,
          width: 80,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 30,
        }}
        onPress={() => {
          setShowInput(prev => !prev);
        }}>
        <Text style={{fontSize: 30, color: style.color ? 'white' : 'black'}}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  containerTodoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  txtTodoItem: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});
