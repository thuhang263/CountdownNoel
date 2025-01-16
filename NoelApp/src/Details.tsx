import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './model/mode'; // Import từ file types.ts

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export default function DetailsScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.layoutContainerTop}>
        <Image 
          style={styles.image}
          source={require('./image/image1363.png')}
        />
        <View style={styles.textContain}>
          <Text style ={styles.boldText}>
          Marry Christmas {'\n'}          
          </Text>
          <Text style ={styles.text}>
            making your Christmas season even more vibrant!
          </Text>
        </View>
      </View>
      <View style={styles.layoutContainer}>
        <FlatList
          data={[
            {
              id: '1',
              image: require('./image/calendar31dec.png'),
              boldText: 'Christmas Countdown\n',
              contentText: 'helps you count down the days,\n hours, minutes, and seconds until\n Christmas, adding excitement and\n joy to the holiday season.',
              screen: 'CountdownScreen',
            },
            {
              id: '2',
              image: require('./image/envelopex.png'),
              boldText: 'Christmas Card\n',
              contentText: 'is a heartfelt way to share holiday\n greetings, warm wishes, and\n festive cheer with friends and\n loved ones during the Christmas\n season.',
              screen: 'CardScreen',
            },
            {
              id: '3',
              image: require('./image/santawithblackglasses.png'),
              boldText: 'Christmas selfie\n',
              contentText: 'is a fun and festive way to capture\n and share moments of joy,\n decorations, and holiday spirit\n during the Christmas season.',
              screen: 'SelfieScreen',
            },
            {
              id: '4',
              image: require('./image/image1749.png'),
              boldText: 'Photo Library\n',
              contentText: 'is a collection of stored photos that\n allows you to organize, access, and\n share your favorite moments easily.',
              screen: 'PhotoLibraryScreen',
            },
            {
              id: '5',
              image: require('./image/santastuckinpipe.png'),
              boldText: 'Setting\n',
              contentText: 'allows users to customize\n features and functions of\n an app.',
              screen: 'SettingScreen',
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigation.navigate(item.screen as typeof RootStackParamList)}
              >
              <Image style={styles.imageItemContainer} source={item.image} />
              <View>
                <Text style={styles.itemboldText}>{item.boldText}</Text>
                <Text style={styles.itemContenttext}>{item.contentText}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
  },
  layoutContainerTop:{
      width: '100%',
      height: 200,
      padding: 24,
      backgroundColor: '#2C5D2F',
      borderColor: '#2C5D2F',
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30,
      flexDirection:'row'
  },
  layoutContainer:{
    alignContent:'center',
    width: 320,
    height: 145,
    padding: 20,
    backgroundColor: '#BB0D0D',
    top:20,
    borderColor: '#F10203',
    borderRadius: 25,
    flex: 1,
    marginLeft:20
  },
  overlayContain:{
    backgroundColor: 'lightblue', // Màu sắc của các khung 
    margin: 5,
  },
  image:{
    width:129,
    height:130,
    marginTop:25
  },
  textContain:{
    flex: 1,
  },
  boldText:{
    marginTop:80,
    color:'#fff',
    textAlign: 'center',
    fontSize:23,
  },
  text:{
    color:'#fff',
    textAlign: 'center'
  },
  itemContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  imageItemContainer:{
    width:62,
    height:65,
  },
  textItemContain:{
    color:'#fff',
    textAlign: 'center'
  },
  itemText:{
    color:'#fff',
    textAlign: 'center',
    fontSize:23,
  },
  itemboldText:{
    color:'#BB0D0D',
    textAlign: 'center',
    fontSize:16,
    fontWeight: 'bold',
  },
  itemContenttext:{
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
  },
});
