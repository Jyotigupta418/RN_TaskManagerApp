import {View, Text, StyleSheet,Button} from 'react-native';
import React from 'react';
import TodoList from '../src/components/TodoList';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const TodoApp = () => {
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={styles.txtMyDay}>{'My Day'}</Text>
      <Icon name='arrow-right'  size={30} color='black'/>
      </View>
      <TodoList />
      {/* <View style={styles.buttom}><Button title='Next-Screen' onPress={forthScreen} color={'black'}/></View> */}

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
  buttom:{
    borderWidth:1,
    marginTop:30, 
    padding:4,
    flexDirection:'row',
    alignSelf:'center',
  },
});
