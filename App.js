import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  ScrollView,
  CheckBox,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      errors: {},
      text: '',
      date: '',
      checkedCount: 0,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="e.g Assignment"
            value={this.state.text}
            style={styles.input}
            onChangeText={value => this.updateTask(value)}
          />
          <DatePicker
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2020-05-01"
            maxDate="2021-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={styles.input}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        </View>
        <Button onPress={() => this.addTask()} title="Add Task" />
        <Text>Number Of Tasks Checked: {this.state.checkedCount}</Text>
        <ScrollView style={styles.list}>
          {this.state.tasks.map((task, i) => (
            <View key={i} style={{ flexDirection: 'row'}}>
              <Text> {i+1}</Text>
              <CheckBox
                value={this.state.tasks[i]['check']}
                onValueChange={e => this.onChecked(e, i)}
              />
              <Text  >
                {task['name']} Due date is:{task['date']}
              </Text>
              <Button
                onPress={e => this.deleteTask(e, i)}
                title="Delete Task"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
  updateTask = val => {
    this.setState({
      text: val,
    });
  };
  updateDate = dat => {
    this.setState({
      date: dat,
    });
  };

  addTask = () => {
    this.setState(state => {
      const task = {};
      if(state.text == '') {
        Alert.alert("PLease enter task name")
          return
      }
      if(state.date == ''){
        Alert.alert("PLease enter Due date")
          return
      }
      task['name'] = state.text;
      task['date'] = state.date;
      task['check'] = false;

      return {
        tasks: [...state.tasks, task],
        text: '',
        date: '',
        errors: {},
      };
    });
  };
  deleteTask = (e, i) => {
    this.setState(state => {
      let flag = 0;
      const taskscopy = [...this.state.tasks];
      let count = state.checkedCount;
      const task = taskscopy[i];
      if (task['check'] == true) {
        task['check'] = false;
        flag = 1;
      }
      taskscopy[i] = task;
      console.log(task);
      taskscopy.splice(i, 1);
      count = count - flag;
      return {
        tasks: taskscopy,
        checkedCount: count,
      };
    });
  };
  onChecked = (e, i) => {
    this.setState(state => {
      let flag = 0;
      const taskscopy = [...this.state.tasks];
      let count = this.state.checkedCount;
      let task = taskscopy[i];
      console.log(task);
      if (task['check'] == false) {
        task['check'] = true;
        flag = 1;
      } else {
        task['check'] = false;
        flag = -1;
      }
      console.log(task);
      taskscopy[i] = task;
      count = count + flag;
      return {
        checkedCount: count,
        tasks: taskscopy,
      };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  header: {
    height: 60,
    paddingTop: 18,
    backgroundColor: 'coral',
    width: 400,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
});
