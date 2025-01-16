import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from './model/mode';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('./image/Group.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Image
          style={styles.image}
          source={require('./image/Group2.png')}
        />
        <View style={styles.overlayContainer}>
          <Image
            style={styles.overlayImage}
            source={require('./image/Group1213.png')}
          />
        </View>
        <View style={styles.text}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
            <Text style={styles.buttonText}>Welcome!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    borderRadius: 25,
  },
  background: {
    flex: 1,  // Đảm bảo chiếm toàn bộ không gian
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    height: 300,
    marginLeft: 90,
    marginRight: 90,
    marginBottom: 90,
  },
  overlayContainer: {
    width: 300,
    height: 145,
    padding: 20,
    backgroundColor: '#BB0D0D',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 500,
    bottom: 111,
    borderColor: '#F10203',
    borderRadius: 25,
  },
  overlayImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    marginLeft: 90,
    marginRight: 90,
  },
  button: {
    backgroundColor: '#BB0D0D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
