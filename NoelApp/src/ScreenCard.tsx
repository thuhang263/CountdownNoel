import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, Share } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './model/mode'; // Import từ file types.ts

type ScreenCardRouteProp = RouteProp<RootStackParamList, 'ScreenCard'>;

export default function ScreenCard() {
  const navigation = useNavigation();  // Khai báo navigation
  const route = useRoute<ScreenCardRouteProp>();
  const { image } = route.params; 
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Check out this awesome app: https://play.google.com/store/apps/details?id=com.example.app',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> 
        <Image
          style={styles.backIcon}
          source={require('./image/back.png')}
        />
      </TouchableOpacity>     
      <TouchableOpacity 
        style={styles.sharebtn} 
        onPress={onShare}
      > 
        <Image
          style={styles.backIcon}
          source={require('./image/share.png')}
        />
      </TouchableOpacity>      
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30,             // Khoảng cách từ đỉnh màn hình
    left: 10,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khác
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backIcon: {
    width: 24,  // Chiều rộng ảnh
    height: 24, // Chiều cao ảnh
    resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
  },
  image: {
    width: 400,
    height: 450,
    resizeMode: 'contain',
  },
  sharebtn: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30,             // Khoảng cách từ đỉnh màn hình
    right: 10,             // Khoảng cách từ phải màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khác
    padding: 5,           // Thêm padding để dễ nhấn
  }
});
