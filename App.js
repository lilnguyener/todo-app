import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Book appointment for advising', completed: true },
    { key: '2', description: 'Finish project for class', completed: false },
    { key: '3', description: 'Brainstorm ideas for the presentation', completed: false },
    { key: '4', description: 'Reply to emails', completed: false },
  ]);

  const [inputText, setInputText] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);

  const addTask = () => {
    if (inputText.trim() === '') return;
    const newTask = {
      key: Date.now().toString(),
      description: inputText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputText('');
  };

  const toggleTask = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (key) => {
    setTasks(tasks.filter(task => task.key !== key));
  };

  const filteredTasks = hideCompleted ? tasks.filter(t => !t.completed) : tasks;

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity
        onPress={() => toggleTask(item.key)}
        style={[styles.circle, item.completed && styles.circleChecked]}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.taskCard}>
        <Text style={[
          styles.taskText,
          item.completed && {
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid',
            color: '#b89fc7'
          }
        ]}>
          {item.description}
        </Text>
      </View>

      <TouchableOpacity onPress={() => deleteTask(item.key)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.username}>👤 LILYNGUYENACCOUNT</Text>
        <Text style={styles.signOut}>⇥ ⚙</Text>
      </View>

      {/* Date */}
      <Text style={styles.date}>March 30th, 2026</Text>
      <View style={styles.divider} />

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={{ flex: 1 }}
      />

      {/* Add Task Input */}
      <View style={styles.addRow}>
        <Text style={styles.plusIcon}>＋</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#b89fc7"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Hide Completed Toggle */}
      <TouchableOpacity
        style={styles.hideRow}
        onPress={() => setHideCompleted(!hideCompleted)}
      >
        <Text style={styles.hideText}>
          {hideCompleted ? '🔵 SHOW COMPLETED ITEMS' : '👁 HIDE COMPLETED ITEMS'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5c6e0',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 14,
    color: '#6B2D8B',
    fontWeight: '600',
  },
  signOut: {
    fontSize: 20,
    color: '#6B2D8B',
  },
  date: {
    fontSize: 32,
    fontWeight: '900',
    color: '#6B2D8B',
    marginBottom: 8,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#6B2D8B',
    marginBottom: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#6B2D8B',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  circleChecked: {
    backgroundColor: '#6B2D8B',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskCard: {
    flex: 1,
    backgroundColor: '#fdf5c7',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#6B2D8B',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  taskText: {
    fontSize: 16,
    color: '#6B2D8B',
    textAlign: 'center',
    fontWeight: '500',
  },
  deleteBtn: {
    marginLeft: 8,
    backgroundColor: '#c9a8d8',
    borderRadius: 50,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    gap: 8,
  },
  plusIcon: {
    fontSize: 28,
    color: '#6B2D8B',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#6B2D8B',
  },
  addBtn: {
    backgroundColor: '#6B2D8B',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hideRow: {
    alignItems: 'center',
    marginBottom: 30,
  },
  hideText: {
    color: '#9e7b7b',
    fontSize: 13,
    letterSpacing: 1,
  },
});