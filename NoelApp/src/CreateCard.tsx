import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, PanResponder, Animated } from 'react-native';
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './model/mode';


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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]); // State lưu trữ các icon đã chọn

  function handleAddIcon(icon: Omit<IconType, 'scale'>) {
    setTopIcons([...topIcons, { ...icon, scale: new Animated.Value(1) }]);
  }

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
        onGestureEvent={Animated.event([
          { nativeEvent: { scale: icon.scale } },
        ], { useNativeDriver: false })}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.oldState === 4) { // End of gesture
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

  function handlePress(boldText: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerTop}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> 
            <Image
              style={styles.backIcon}
              source={require('./image/back.png')}
              >
            </Image> 

          </TouchableOpacity>
          <TouchableOpacity style ={styles.savebtn}>
              <Image
                style={styles.backIcon}
                source={require('./image/check.png')}
                >
              </Image> 
          </TouchableOpacity>
        </View>

        <View style={styles.layoutContainerTop}>
          {topIcons.map((icon, index) => renderIconOnTop(icon, index))}
        </View>

        <View style={styles.spacer}>
        <FlatList
          data={[
            { id: '1', boldText: 'Sticker' },
            { id: '2', boldText: 'Color BG' },
            { id: '3', boldText: 'Image' },
            { id: '4', boldText: 'Font' },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                {
                  backgroundColor:
                    item.boldText === 'Sticker' && modalVisible ? '#ADD8E6' : 'transparent',
                },
                {
                  borderWidth: item.boldText === 'Sticker' && modalVisible ? 2 : 0,
                },
                {
                  borderColor:
                    item.boldText === 'Sticker' && modalVisible ? '#0000FF' : 'transparent',
                },
              ]}
              onPress={() => handlePress(item.boldText)} // Pass tên icon vào hàm handlePress
            >
              <Text style={styles.itemboldText}>{item.boldText}</Text>
            </TouchableOpacity>
          )}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>


        <View style={styles.layoutContainerBottom}>
          <FlatList
            data={[
              { id: '1', image: require('./image/create/tree.png') },
              { id: '2', image: require('./image/create/cookiewithwhite.png') },
              { id: '3', image: require('./image/create/candy.png') },
              { id: '4', image: require('./image/create/cookie.png') },
              { id: '5', image: require('./image/create/cristmas.png') },
              { id: '6', image: require('./image/create/gingerbread.png') },
              { id: '7', image: require('./image/create/glove.png') },
              { id: '8', image: require('./image/create/Group2.png') },
              { id: '9', image: require('./image/create/Group16.png') },
              { id: '10', image: require('./image/create/PinkChristmas.png') },
              { id: '11', image: require('./image/create/shopping.png') },
              { id: '12', image: require('./image/create/snowman.png') },
              { id: '13', image: require('./image/create/Pink.png') },
              { id: '14', image: require('./image/create/treeangel.png') },
              { id: '15', image: require('./image/create/Yellow.png') },
              { id: '16', image: require('./image/create/Businesswoman.png') },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  handleAddIcon({ id: item.id, image: item.image, x: 100, y: 100 })
                }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  savebtn:{
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 0,             // Khoảng cách từ đỉnh màn hình
    right: 10,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khc
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 0,             // Khoảng cách từ đỉnh màn hình
    left: 10,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khc
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backIcon: {
    width: 24,  // Chiều rộng ảnh
    height: 24, // Chiều cao ảnh
    resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
  },
  itemboldText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  layoutContainerTop: {
    flex: 5,
    marginTop:30,
    backgroundColor: '#DED2C1',
    borderRadius: 30,
    borderColor: '#2C5D2F',
    borderWidth: 1,
  },
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  spacer: {
    flex: 0.5,
    backgroundColor: '#fff',
    borderColor: '#2C5D2F',
    borderWidth: 1,
    borderRadius: 30,
  },
  layoutContainerBottom: {
    flex: 3,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#BB0D0D',
    borderWidth: 1,
    padding: 10,
  },
  containerImage: {
    width: 20,
    height: 20,
  },
  imageItem: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    margin: 10,
    left:10
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  separator: {
    width: 10,
  },

});

export default CreateCard;
