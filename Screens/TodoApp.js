import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import TodoList from '../src/components/TodoList';

const TodoApp = () => {
  const [dark, setDark] = useState(false);

  return (
    <View style={{ ...styles.container, backgroundColor: dark ? 'black' : '#f1f1f1' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin:8 }}>
        <Text style={{...styles.txtMyDay, color: dark ? 'white' : 'black'}}>{'To-dos'}</Text>
        <Text style={{fontSize:25, color:'yellow', alignSelf:'center', marginRight:10}} onPress={() => { setDark(!dark) }}>
          {dark ? '☀️' : '🌙'}
        </Text>
      </View>
      <TodoList dark={dark} style={{ color: dark ? 'white' : 'black' , backgroundColor: dark ? 'orange' : 'orange' }}/>
    </View>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtMyDay: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttom: {
    borderWidth: 1,
    marginTop: 30,
    padding: 4,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
