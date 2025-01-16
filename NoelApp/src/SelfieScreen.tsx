import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, PermissionsAndroid, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchCamera } from 'react-native-image-picker';
import { useState, useEffect } from 'react';
import { RootStackParamList } from './model/mode';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export default function DetailsScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isFrontCamera] = useState(false);

  // Hàm yêu cầu quyền camera
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'y.c quyền truy cập.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Yêu cầu quyền camera khi component mount
  useEffect(() => {
    requestCameraPermission();
  }, []);

  // Hàm chụp ảnh
  const takePhoto = () => {
    launchCamera(
      {
        cameraType: isFrontCamera ? 'front' : 'back', // Toggle giữa camera trước và sau
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error:', response.errorMessage);
        } else {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri ?? null); // Nếu uri là undefined, thay thế bằng null
          } else {
            console.log('No image selected');
          }
        }
      }
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.layoutContainerTop}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> 
          <Image
            style={styles.backIcon}
            source={require('./image/back2.png')}
          >
          </Image> 
        </TouchableOpacity>
        <View style={styles.textContain}>
          <Text style={styles.boldText}>Christmas selfie {'\n'}</Text>
          <Text style={styles.text}>
            is a fun and festive way to capture and share moments of joy, decorations, and holiday spirit during the Christmas season.
          </Text>
        </View>
        <Image style={styles.image} source={require('./image/santawithblackglasses.png')} />
      </View>
      <ImageBackground
        style={styles.layoutContainer}
        source={require('./image/avt.jpg')}
      >
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <View style={styles.butonTakephoto}>
            <Image 
              style={styles.icon}
              source={require('./image/camera.png')}
            ></Image>
            <Text style={styles.buttonText}>Take Photo</Text>
        </View>
        </TouchableOpacity>
      </ImageBackground>
      {/* Hiển thị ảnh nếu đã chụp */}
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  icon:{
    width:20,
    height:20
  },
  butonTakephoto:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  overlayImage:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    marginLeft: 90,
    marginRight: 90,
  },
  layoutContainerTop: {
    width: '100%',
    height: 200,
    padding: 24,
    backgroundColor: '#2C5D2F',
    borderColor: '#2C5D2F',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContain: {
    flex: 1,
  },
  boldText: {
    marginTop: 45,
    color: '#fff',
    textAlign: 'center',
    fontSize: 23,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 120,
    marginTop: 25,
  },
  layoutContainer: {
    alignContent:'center',
    width: 320,
    height: 500,
    padding: 20,
    top:20,
    marginLeft:20
  },
  button: {
    top:250,
    left:40,
    backgroundColor: '#2C5D2F',
    padding: 10,
    borderRadius: 20,
    margin: 5,
    width: 190,
    height:45,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});