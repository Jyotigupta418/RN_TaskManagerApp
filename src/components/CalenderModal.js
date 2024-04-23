import { View, Text, Modal, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalenderModal = ({ visible, onSave, oncancle, dark }) => {
    const [selectedWeekday, setSelectedWeekday] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleSave = () => {
      onSave(selectedDate, selectedWeekday);
    };

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{ ...styles.rootContainer, height: 300, }}>

                <View style={{ ...styles.container, backgroundColor: dark ? '#212121' : 'white' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 , width: '80%'}}>
                        <Text style={{ fontSize: 16, alignSelf: 'center', color: '#F6B800', fontWeight: 'bold', }} onPress={() => { oncancle() }}>Cancel</Text>
                        <Text style={{ fontSize: 16, alignSelf: 'center', color: dark ? '#fff' : '#555', fontWeight: 'bold' }}>Schedule Reminder</Text>
                        <Text style={{ fontSize: 16, alignSelf: 'center', color: '#F6B800', fontWeight: 'bold', }} onPress={handleSave} >Save</Text>
                    </View>

                    <Text style={{ fontSize:18, marginTop: 30, marginBottom:15,marginLeft: 20, color : dark ? '#fff' : '#666', fontWeight: 'bold'}}>Remind Me On</Text>

                    <Calendar
                        theme={{
                            backgroundColor: dark ? '#212121' : '#ffffff',
                            calendarBackground: dark ? '#212121' : '#ffffff',
                            monthTextColor: dark ? '#ffffff' : '#000000',
                            textSectionTitleColor: dark ? '#00adf5' : '#b6c1cd',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: dark ? '#ffffff' : '#2d4150',
                            textDisabledColor: dark ? '#1d4150' : '#d9e'
                            
                        }}

                        onDayPress={day => {
                            setSelectedDate(day.dateString);
                            const selectedDay = new Date(day.dateString);
                            const weekdayNumber = selectedDay.getDay();
                            setSelectedWeekday(weekdays[weekdayNumber]);
                        }}
                        markedDates={{
                            [selectedDate]: {selected: true, disableTouchEvent: true, marked: true},
                          }}
                    />

                    <Text style={{ fontSize: 16, color: '#F6B800', fontWeight: 'bold', marginVertical: 15 }}>Selected date: <Text style={{ fontSize: 14, alignSelf: 'center', color: dark ? '#fff' : '#666', fontWeight: 'bold', }} >{selectedDate}, {selectedWeekday}</Text> </Text>
                    <View style={{ height: 15 }}></View>
                </View>

            </View>
        </Modal>
    );
};

export default CalenderModal;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      container: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 20,
      },
});
