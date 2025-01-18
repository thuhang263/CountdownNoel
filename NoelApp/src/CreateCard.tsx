import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, PanResponder, Animated, Alert } from 'react-native';
import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';

import { RootStackParamList } from './model/mode';
import IconItem from '../src/component/IconItem';

interface IconType {
  id: string;
  image: any;
  x: number;
  y: number;
  scale: Animated.Value;
}

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CardScreen'>;

const CreateCard = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const [topIcons, setTopIcons] = useState<IconType[]>([]);
  const viewShotRef = useRef<ViewShot | null>(null);

  useEffect(() => {
    loadIcons();
  }, []);

  const handleAddIcon = (icon: Omit<IconType, 'scale'>) => {
    setTopIcons([...topIcons, { ...icon, scale: new Animated.Value(1) }]);
  };

  const updateIconPosition = (index: number, x: number, y: number) => {
    const updatedIcons = [...topIcons];
    updatedIcons[index].x = x;
    updatedIcons[index].y = y;
    setTopIcons(updatedIcons);
  };

  const renderIconOnTop = (icon: IconType, index: number) => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        updateIconPosition(index, icon.x + gestureState.dx, icon.y + gestureState.dy);
      },
      onPanResponderRelease: () => {},
    });

    return (
      <PinchGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { scale: icon.scale } }], { useNativeDriver: false })}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.oldState === 4) {
            icon.scale.setValue(Math.max(0.5, Math.min(event.nativeEvent.scale, 3)));
          }
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            position: 'absolute',
            left: icon.x,
            top: icon.y,
            transform: [{ scale: icon.scale }],
          }}
        >
          <TouchableOpacity>
            <Image source={icon.image} style={styles.iconImage} />
          </TouchableOpacity>
        </Animated.View>
      </PinchGestureHandler>
    );
  };

  const saveView = async () => {
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
  
        // Thêm timestamp để làm ID duy nhất
        const newCard = { id: new Date().getTime().toString(), uri };
  
        // Lấy danh sách cũ
        const savedCards = await AsyncStorage.getItem('savedCards');
        const cards = savedCards ? JSON.parse(savedCards) : [];
  
        // Thêm card mới vào danh sách
        cards.push(newCard);
  
        // Lưu lại vào AsyncStorage
        await AsyncStorage.setItem('savedCards', JSON.stringify(cards));
  
        Alert.alert('Thành công', 'Card đã được lưu.');
        navigation.navigate('CardScreen'); // Điều hướng
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể chụp View.');
        console.error(error);
      }
    } else {
      Alert.alert('Lỗi', 'viewShotRef hiện đang là undefined.');
    }
  };
  
  const loadIcons = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('savedCards');
      if (savedCards) {
        const parsedCards = JSON.parse(savedCards);
        console.log('Danh sách cards:', parsedCards); // Debugging
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách cards.');
      console.error(error);
    }
  };
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={require('./image/back.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.savebtn} onPress={saveView}>
            <Image style={styles.backIcon} source={require('./image/save.png')} />
          </TouchableOpacity>
        </View>
        <ViewShot ref={viewShotRef} style={styles.layoutContainerTop}>
          {topIcons.map((icon, index) => renderIconOnTop(icon, index))}
        </ViewShot>
        <View style={styles.layoutContainerBottom}>
          <FlatList
            data={IconItem}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleAddIcon({ id: item.id, image: item.image, x: 100, y: 100 })}
              >
                <Image source={item.image} style={styles.imageItem} />
              </TouchableOpacity>
            )}
            numColumns={4}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CreateCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  savebtn: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 10,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 10,
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  layoutContainerTop: {
    flex: 5,
    marginTop: 30,
    backgroundColor: '#DED2C1',
    borderRadius: 30,
    borderColor: '#2C5D2F',
    borderWidth: 1,
  },
  layoutContainerBottom: {
    flex: 3,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#BB0D0D',
    borderWidth: 1,
    padding: 10,
  },
  imageItem: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    margin: 10,
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
