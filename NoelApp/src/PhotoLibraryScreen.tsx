import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './model/mode'; 
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

export default function PhotoLibraryScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const [selectedPhoto, setSelectedPhoto] = React.useState<any[]>([]); // Lưu ảnh đã chọn
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 30) {
        return true; // Đối với Android 11 trở lên, không sử dụng `MANAGE_EXTERNAL_STORAGE`.
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Read Photos Permission',
            message: 'App needs permission to read your photo library.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };
  

  const accessPhotoLibrary = async () => {
    console.log('Accessing photo library...');
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      console.log('Permission denied');
      return;
    }
  
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 0, // Cho phép chọn không giới hạn số lượng ảnh
    };
  
    launchImageLibrary(options, (response) => {
      console.log('Phản hồi:', response); // In chi tiết phản hồi
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Error Code:', response.errorCode);
        console.error('Error Message:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedPhoto(response.assets); // Lưu nhiều ảnh đã chọn vào state
      } else {
        console.log('No assets found.');
      }
    });
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.layoutContainerTop}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> 
          <Image
            style={styles.backIcon}
            source={require('./image/back2.png')}
          />
        </TouchableOpacity>
        <Image 
          style={styles.image}
          source={require('./image/image1749.png')}
        />
        <View style={styles.textContain}>
          <Text style={styles.boldText}>
            Photo Library {'\n'}          
          </Text>
          <Text style={styles.text}>
            is a collection of stored photos that allows you to organize, access, and share your favorite moments easily.          
          </Text>
        </View>
      </View>
  
      <View style={styles.layoutContainer}>
        <TouchableOpacity style={styles.fetchButton} onPress={accessPhotoLibrary}>
          <Text style={styles.fetchButtonText}>Access Photo Library</Text>
        </TouchableOpacity>
        {selectedPhoto.length > 0 && (
          <View style={styles.photosContainer}>
            {selectedPhoto.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo.uri }}
                style={styles.selectedPhoto}
                resizeMode="cover" // Tránh lỗi khi hiển thị ảnh
              />
            ))}
          </View>
        )}
      </View>
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
  photosContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
  },
  layoutContainer: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 109,
    height: 110,
    marginTop: 45,
  },
  textContain: {
    flex: 1,
  },
  boldText: {
    marginTop: 50,
    color: '#fff',
    textAlign: 'center',
    fontSize: 23,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  photo: {
    width: '32%',
    height: 100,
    margin: '0.5%',
    borderRadius: 10,
  },
  fetchButton: {
    backgroundColor: '#2C5D2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width:250,
    left:50,
    top:10
  },
  fetchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedPhoto: {
    width: 200,
    height: 150,
    marginTop: 20,
    borderRadius: 10,
  },
});
