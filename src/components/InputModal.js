import { View, Text, Modal, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import CalenderModal from './CalenderModal';

const InputModal = ({ visible, onSave , oncancle, onChangeText, dark}) => {
  const [text, setText] = useState('');
  const [modalHeight, setModalHeight] = useState('30%');
  const [showCalender, setShowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedWeekday, setSelectedWeekday] = useState('');


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setModalHeight('58%');
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setModalHeight('30%');
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSave = () => {
    onSave(text, selectedDate, selectedWeekday); 
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.rootContainer}>
        <View style={{ ...styles.container, height: modalHeight ,  backgroundColor: dark ? '#212121' : 'white'}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
          <Text style={{ fontSize:22, alignSelf: 'center',  color : '#F6B800', fontWeight: 'bold',}} onPress={()=>{oncancle()}}>Cancel</Text>
            <Text style={{ fontSize:22, alignSelf: 'center',  color : '#F6B800', fontWeight: 'bold'}}>New To-Do</Text>
          <Text  style={{ fontSize:22, alignSelf: 'center',  color : '#F6B800', fontWeight: 'bold', }}  onPress={handleSave} >Add</Text>
          </View>
          <TextInput
            placeholder="Enter task"
            multiline
            numberOfLines={2}
            maxLength={70}
            onChangeText={setText}
            style={{
              fontSize: 20,
              marginTop: 20,
              marginBottom:15,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 15,
              backgroundColor: dark ? 'grey' : 'rgba(0,0,0,0.3)',
              color: dark ? 'white' : 'black',
              paddingLeft: 10,
            }}
          />
          <Text style={{ fontSize: 25, color: 'yellow', marginVertical: 10, marginLeft: 10 }} onPress={() => setShowCalender(prev => !prev)}>🔔 <Text style={{color: '#F6B800', fontSize:21, fontWeight:'600'}}> Reminder</Text></Text>

          <CalenderModal visible={showCalender} dark={dark} oncancle={() => setShowCalender(prev => !prev)} onSave={(date, weekday) => {
          setSelectedDate(date); 
          setShowCalender(prev => !prev); 
          setSelectedWeekday(weekday);
        }}/>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 10,
  },
});
