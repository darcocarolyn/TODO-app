import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';


const DATA = [
  {
    key: '1',
    description: 'Complete 30 minute workout',
    completed: false
  },
  {
    key: '2',
    description: 'Complete assignment',
    completed: true
  },
  {
    key: '3',
    description: 'Attend zoom meeting',
    completed: false
  },
];


const Item = ({ item, onToggleCompleted, onEdit, updateTaskName, isEditing }) => {
  const [isChecked, setChecked] = useState(item.completed);

  const handleToggleCompleted = () => {
    setChecked(!isChecked);
    onToggleCompleted(item.key, !isChecked);
  };

  const handleEdit = () => {
    onEdit(item.key, true);
  };

  const handleSave = (key, newName) => {
    onEdit(key, false);
    updateTaskName(key, newName);
  };

  return (
    <View style={style.item}>
      {isEditing ? (
        <EditItem item={item} onSave={handleSave} onEdit={onEdit} />
      ) : (
        <>
          <Checkbox
            value={isChecked || false}
            onValueChange={handleToggleCompleted}
            style={style.checkbox}
          />
          <Text
            style={isChecked ? style.completed : style.notCompleted}
          >
            {item.description}
          </Text>
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesomeIcon
              style={style.edit}
              size={15}
              icon={faPen}
            />
          </TouchableOpacity>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const EditItem = ({ item, onSave, onEdit }) => {
  const [editedName, setEditedName] = useState(item.description);

  const handleSave = (key, newName) => {
    onEdit(key, false);
    onSave(key, newName);
  };

  return (
    <View style={style.editItem}>
      <TextInput
        style={style.editInput}
        value={editedName}
        onChangeText={setEditedName}
      />
      <TouchableOpacity onPress={() => handleSave(item.key, editedName)}>
        <Text style={style.saveButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
function filterData(data, filter) {
  switch (filter) {
    case 'Completed':
      return data.filter((item) => item.completed);
    case 'Not Completed':
      return data.filter((item) => !item.completed);
    default:
      return data;
  }
}
function TODOScreen({ navigation, route }) {
  const [newTask, setNewTask] = React.useState('');
  const [count, setCount] = useState(4);
  const [data, setData] = useState(DATA);
  const [editedItems, setEditedItems] = useState({});
  const [filter, setFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(DATA.filter(item => item.description.includes(filterText)));
    const [filterText, setFilterText] = useState('');
  const { username } = route.params;


  const updateTaskName = (key, newName) => {
    const index = data.findIndex((item) => item.key === key);
    const newData = [...data];
    newData[index] = { ...newData[index], description: newName };
    setData(newData);
    setEditedItems({ ...editedItems, [key]: false });
  };

  // Gets current date
  const current = new Date();
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let currentMonth = month[current.getMonth()];
  const date = `${currentMonth} ${current.getDate()}, ${current.getFullYear()}`;


  //Update task based on checkbox
const updateTaskStatus = (key, completed) => {
  const index = data.findIndex((item) => item.key === key);
  const newData = [...data];
  newData[index] = { ...newData[index], completed };
  setData(newData);
const filtered = filterData(newData, filter);
    setFilteredData(filtered);
};

useEffect(() => {
  const filtered = filterData(data, filter);
  setFilteredData(filtered);
}, [data, filter]);

const handleSignOut = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={style.container}>
      
      <View style={style.header}>
      <Text style={style.title}>Hello, {username}!</Text>
      <Text style={style.date}>Today’s Date: {date}</Text>
      <Text style={style.list}>Task List</Text>
      </View>

      <View style={style.filterOptions}>
        <TouchableOpacity onPress={() => setFilter('All')}>
          <Text style={filter=== 'All' ? style.activeFilter : style.filter}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Completed')}>
          <Text style={filter === 'Completed' ? style.activeFilter : style.filter}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Not Completed')}>
          <Text style={filter=== 'Not Completed' ? style.activeFilter : style.filter}>Not Completed</Text>
        </TouchableOpacity>
      </View>
      <View>
 <TextInput
        placeholder='Filter...'
        style={style.textFilter}
        value={filterText}
        onChangeText={(text) => {
          setFilterText(text);
          setFilteredData(data.filter(item => item.description.toLowerCase().includes(text)));
        }}
      />

</View>

     <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Item
            item={item}
            onToggleCompleted={updateTaskStatus}
            onEdit={(key, value) => setEditedItems({ ...editedItems, [key]: value })}
            updateTaskName={updateTaskName}
            isEditing={editedItems[item.key]}
          />
        )}
        keyExtractor={(item) => item.key}
      />
<TextInput
  placeholder={'Add new task here...'}
  style={style.input}
  value={newTask}
  onChangeText={setNewTask}
  returnKeyType="go"
  onSubmitEditing={() => {
    if (newTask !== '') {
      const newKey = `${count}`;
      const newTaskObject = { key: newKey, description: newTask };
      setData([...data, newTaskObject]);
      setNewTask('');
      setCount(count + 1);
    }
  }}
/>
      <TouchableOpacity 
      style={style.signOut}
      onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfff1',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#3066be',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  title: {
    fontSize: 25,
    color: 'white'
  },
  date: {
    fontSize: 20,
        color: 'white'

  },
  list: {
    fontSize: 18,
        color: 'white'

  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 15,
    margin: 10,
    paddingEnd: 5,
    backgroundColor: '#ffffff',
    elevation: 10,
    /*textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    */
  },
  description: {
    fontSize: 20,
  },
  checkbox: {
    margin: 10,
    flexDirection: 'row-reverse'
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  notCompleted: {
    textDecorationLine: 'none',
    textDecorationStyle: 'solid'
  },
  input: {
    backgroundColor: '#D3D3D3',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',  
  },
  edit: {
    padding: 10
  },
  filter: {
        margin: 10,
  },
  textFilter: {
    borderWidth: 2,
    borderRadius: 5,
  backgroundColor: "#B4C5E4",
  },
  filterOptions: {
    flexDirection: 'row',
  },
  activeFilter: {
    textDecorationLine: 'underline',
     textDecorationColor: '#3066be',
    textDecorationWidth: 10,
  },
  signOut: {
  alignItems: 'center',
backgroundColor: "#B4C5E4",
borderRadius:15,
padding: 10,
margin: 20
  }
});
export default TODOScreen