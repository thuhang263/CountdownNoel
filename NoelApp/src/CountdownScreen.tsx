import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './model/mode'; // Import từ file types.ts
import DHMSTimer from './untils/DHMSTimes';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export default function CountdownScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
    const startDate = "2024-12-25T00:00:00Z";
    const targetDate = new Date(new Date(startDate).getTime() + 7 * 60 * 60 * 1000); 

  function alert(arg0: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> 
        <Image
          style={styles.backIcon}
          source={require('./image/back2.png')}
        >
        </Image> 
      </TouchableOpacity>
      <View style={styles.layoutContainerTop}>
        <Image 
          style={styles.image}
          source={require('./image/Bell.png')}
        />
        <View style={styles.textContain}>           
          <Text style ={styles.boldText}>
          Christmas Countdown {'\n'}          
          </Text>
          <Text style ={styles.text}>
            helps you count down the days,{'\n'} 
            hours, minutes, and seconds until{'\n'} 
            Christmas, adding excitement and{'\n'}
            joy to the holiday season.
          </Text>
        </View>
      </View>
      <View>
        <View>
        {/* Days Hours Minutes Seconds */}
        <DHMSTimer
        
        />
        </View>
        <Image 
            style={styles.imageContent}
            source={require('./image/santawithsnowballangle.png')}
          />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1, 
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30,              // Khoảng cách từ đỉnh màn hình
    left: 10,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khc
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backIcon: {
    width: 24,  // Chiều rộng ảnh
    height: 24, // Chiều cao ảnh
    resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
  },
  layoutContainerTop:{
      width: '100%',
      height: 200,
      padding: 24,
      backgroundColor: '#2C5D2F',
      borderColor: '#2C5D2F',
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30,
      flexDirection:'row',
      justifyContent:'space-between'
  },
  image:{
    width:110,
    height:110,
    marginTop:25,
  },
  textContain:{
    flex: 1,
  },
  boldText:{
    marginTop:30,
    color:'#fff',
    textAlign: 'center',
    fontSize:20,
  },
  text:{
    color:'#fff',
    textAlign: 'center',
    fontSize:13
  },
  imageContent:{
    width:240,
    height:220,
    marginLeft:65
  },
  
})