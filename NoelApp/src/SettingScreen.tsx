import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Share,
  Alert,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './model/mode'; 

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export default function DetailsScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const [isRateAppVisible, setRateAppVisible] = useState(false); // Trạng thái mở/đóng đánh giá
  const [rating, setRating] = useState(0); // Số sao được chọn
  const [review, setReview] = useState(''); // Nội dung nhận xét

  // Hàm chia sẻ ứng dụng
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

  // Hàm gửi đánh giá
  const handleRatingSubmit = () => {
    if (rating === 0 || review.trim() === '') {
      Alert.alert('Vui lòng chọn số sao và nhập nhận xét.');
      return;
    }

    Alert.alert('Cảm ơn!', `Bạn đã đánh giá ${rating} sao\nNhận xét: ${review}`);
    setRating(0);
    setReview('');
    setRateAppVisible(false); // Đóng modal
  };

  // Giao diện FlatList
  return (
    <View style={styles.container}>
      <View style={styles.layoutContainerTop}>
        <View style={styles.textContain}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={require('./image/back2.png')} />
          </TouchableOpacity>
          <Text style={styles.boldText}>
            Settings{'\n'}
          </Text>
          <Text style={styles.text}>
            Allows users to customize features and functions of an app
          </Text>
        </View>
        <Image style={styles.image} source={require('./image/santastuckinpipe.png')} />
      </View>

      <View style={styles.layoutContainer}>
        <FlatList
          data={[
            {
              id: '1',
              image: require('./image/Group1221.png'),
              boldText: 'Share App',
              screen: 'ShareApp',
            },
            {
              id: '2',
              image: require('./image/Group34796.png'),
              boldText: 'Rate App',
              screen: 'RateApp',
            },
            {
              id: '3',
              image: require('./image/Group34797.png'),
              boldText: 'Policy',
              screen: 'Policy',
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
                if (item.screen === 'ShareApp') {
                  onShare();
                }
                if (item.screen === 'RateApp') {
                  setRateAppVisible(true);
                }
              }}
            >
              <View style={styles.viewSetting}>
                <Image style={styles.imageItemContainer} source={item.image} />
                <Text style={styles.itemboldText}>{item.boldText}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal Đánh giá App */}
      <Modal
        visible={isRateAppVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRateAppVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.modalTitle}>Đánh giá ứng dụng</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity key={index} onPress={() => setRating(index)}>
                  <Text style={index <= rating ? styles.starSelected : styles.star}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập nhận xét của bạn..."
              value={review}
              onChangeText={setReview}
              multiline
            />
            <Button title="Gửi đánh giá" onPress={handleRatingSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { position: 'absolute', top: 30, left: 10 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  layoutContainerTop: {
    width: '100%',
    height: 200,
    padding: 24,
    backgroundColor: '#2C5D2F',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
  },
  textContain:{
    flex: 1,
  },
  image:{
    width:90,
    height:120,
    marginTop:25
  },
  text:{
    color:'#fff',
    textAlign: 'center'
  },
  boldText: { marginTop: 80, color: '#fff', fontSize: 23, textAlign: 'center' },
  layoutContainer: {
    alignContent:'center',
    width: 320,
    height: 500,
    padding: 20,
    backgroundColor: '#2C5D2F',
    top:20,
    borderColor: '#F10203',
    borderRadius: 25,
    marginLeft:20
  },
  itemContainer: {
    top:80,
    margin:10,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#781A1B',
    borderRadius: 10,
    padding: 25,
  },
  viewSetting: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ratingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  textItemContain:{
    color:'#781A1B',
    textAlign: 'center'
  },
  itemboldText:{
    color:'#fff',
    textAlign: 'center',
    left:40,
    fontSize:16,
    fontWeight: 'bold',
  },
  imageItemContainer:{
    width:24,
    height:25,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  stars: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  star: { fontSize: 30, color: '#ccc' },
  starSelected: { fontSize: 30, color: '#FFD700' },
  textInput: { height: 100, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});
