import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const saveData = () => {
    const newData = {
      name,
      phone,
      email,
      dob,
      images,
    };
    setData([...data, newData]);
    clearFields();
  };

  const clearFields = () => {
    setName('');
    setPhone('');
    setEmail('');
    setDob(new Date());
    setImages([]);
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    ImagePicker.openPicker(options)
      .then(response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setImages([...images, response.path]);
        }
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const displayData = () => {
    if (data.length === 0) {
      Alert.alert('No data to display.');
      return;
    }

    Alert.alert(
      'Stored Data',
      JSON.stringify(data, null, 2),
      [{text: 'OK', onPress: () => console.log('Data successfully displayed')}],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fill out the following information</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TouchableOpacity
        onPress={showDatepicker}
        style={styles.datePickerContainer}>
        <TextInput
          style={styles.datePickerInput}
          editable={false}
          value={dob.toDateString()}
          placeholder="Date of birth"
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={selectImage} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={saveData} style={styles.button}>
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={displayData} style={styles.button}>
        <Text style={styles.buttonText}>Display Data</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Selected Images:</Text>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{uri}} style={styles.image} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  datePickerButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  datePickerButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  datePickerContainer: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default App;
