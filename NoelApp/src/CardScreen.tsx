import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './model/mode';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

type FlatListDataItem = {
  id: string;
  image: any;
  screen: "ScreenCard";
};

const CardScreen = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const [viewShotUri, setViewShotUri] = useState<string | null>(null);

  useEffect(() => {
    const loadViewShotUri = async () => {
      try {
        const uri = await AsyncStorage.getItem('viewShotUri');
        if (uri) {
          setViewShotUri(uri);
        }
      } catch (error) {
        console.error('Failed to load view shot URI', error);
      }
    };

    loadViewShotUri();
  }, []);

  const flatListData: FlatListDataItem[] = [
    { id: '1', image: require('./image/Group3.png'), screen: 'ScreenCard' },
    { id: '2', image: require('./image/Group6.png'), screen: 'ScreenCard' },
    { id: '3', image: require('./image/Group4.png'), screen: 'ScreenCard' },
    { id: '4', image: require('./image/Group8.png'), screen: 'ScreenCard' },
    { id: '5', image: require('./image/Group9.png'), screen: 'ScreenCard' },
    { id: '6', image: require('./image/Group7.png'), screen: 'ScreenCard' },
  ];

  // Thêm ảnh mới lưu vào danh sách
  if (viewShotUri) {
    flatListData.push({ id: 'saved_view', image: { uri: viewShotUri }, screen: 'ScreenCard' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.layoutContainerTop}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> 
          <Image style={styles.backIcon} source={require('./image/back2.png')} />
        </TouchableOpacity>
        <Image style={styles.image} source={require('./image/Bell.png')} />
        <View style={styles.textContain}>
          <Text style={styles.boldText}>
            Christmas Card {'\n'}
          </Text>
          <Text style={styles.text}>
            is a heartfelt way to share holiday greetings, warm wishes, and festive cheer with friends and loved ones during the Christmas season.
          </Text>
        </View>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          key={2}
          data={flatListData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.screen, { image: item.image })}
            >
              <View style={styles.imageItemWrapper}>
                <Image style={styles.imageItem} source={item.image} />
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateCard')}> 
        <Image style={styles.iconImage} source={require('./image/Vector.png')} />
        <Text style={styles.buttonText}>Create Card</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute', 
    top: 30,              
    left: 10,             
    zIndex: 10,           
    padding: 5,          
  },
  backIcon: {
    width: 24,  
    height: 24, 
    resizeMode: 'contain', 
  },
  iconImage: {
    width: 14,
    height: 15,
    left: 25,
  },
  layoutContainerTop: {
    width: '100%',
    height: 200,
    padding: 24,
    backgroundColor: '#2C5D2F',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2C5D2F', 
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: 150,
    height: 50,  
    borderRadius: 15,
    alignItems: 'center',
    left: 100,
    bottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    left: 30,
  },
  image: {
    width: 110,
    height: 110,
    marginTop: 25,
  },
  textContain: {
    flex: 1,
  },
  boldText: {
    marginTop: 30,
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
  },
  flatListContainer: {
    flex: 1,
    padding: 16,
  },
  imageItemWrapper: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    right: 20,
  },
  imageItem: {
    width: 160,
    height: 210,
  },
  savedViewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  savedViewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedViewImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});

export default CardScreen;
