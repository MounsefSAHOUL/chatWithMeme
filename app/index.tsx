import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ChatFaceElement, ChatFaceType } from 'types/type';

//expo://192.168.1.134:8082

import { chatFaceData as initialChatFaceData } from '../constants/datas';

const Home = () => {
  const router = useRouter();
  const [chatFaceData, setChatFaceData] = useState<ChatFaceType>(initialChatFaceData);
  const [selectedChatFace, setSelectedChatFace] = useState<ChatFaceElement>({});

  const textColorAnimation = useSharedValue(0);
  const imageAnimation = useSharedValue(0);

  useEffect(() => {
    setChatFaceData(chatFaceData);
    checkFaceId(0 as number);
  }, []);

  const checkFaceId = (id: number) => {
    //const id = await AsyncStorage.getItem('chatFaceId');

    setSelectedChatFace(chatFaceData[id]);
  };

  //console.log('test all heoros', chatFaceData);
  //console.log('test selected heors', selectedChatFace.image);

  useEffect(() => {
    if (selectedChatFace?.primary) {
      textColorAnimation.value = withTiming(1, { duration: 500 });
    }
    if (selectedChatFace?.image) {
      imageAnimation.value = withTiming(1, { duration: 500 });
    }
  }, [selectedChatFace]);

  const animatedTextColorStyle = useAnimatedStyle(() => ({
    color: selectedChatFace?.primary,
    opacity: textColorAnimation.value,
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: imageAnimation.value,
  }));

  const onChatFacePress = (id: number) => {
    setSelectedChatFace(chatFaceData[id - 1]);
    //await AsyncStorage.setItem('chatFaceId', (id - 1).toString());
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView>
        <View style={{ alignItems: 'center', paddingTop: 90 }}>
          <Animated.Text style={[animatedTextColorStyle, { fontSize: 30 }]}>Hello,</Animated.Text>
          <Animated.Text style={[animatedTextColorStyle, { fontSize: 30, fontWeight: 'bold' }]}>
            I am {selectedChatFace.name}
          </Animated.Text>
          <Animated.Image
            source={selectedChatFace?.image}
            style={[
              animatedImageStyle,
              { height: 150, width: 150, marginTop: 20, borderRadius: 10 },
            ]}
            resizeMode="contain"
          />

          <Text style={{ marginTop: 30, fontSize: 25 }}>How Can I help you?</Text>

          <View
            style={{
              marginTop: 20,
              backgroundColor: '#F5F5F5',
              alignItems: 'center',
              height: 120,
              padding: 10,
              borderRadius: 10,
            }}>
            <FlatList
              data={chatFaceData}
              horizontal
              renderItem={({ item }: { item: ChatFaceElement }) => {
                if (item.id != selectedChatFace.id) {
                  return (
                    <TouchableOpacity
                      style={{ margin: 10 }}
                      onPress={() => onChatFacePress(item.id as number)}>
                      <Image
                        source={item.image}
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  );
                }
                return null;
              }}
            />
            <Text style={{ marginTop: 5, fontSize: 17, color: '#B0B0B0' }}>
              Choose Your Fav ChatBuddy
            </Text>
          </View>
          <TouchableOpacity
            style={[
              { backgroundColor: selectedChatFace.primary },
              {
                marginTop: 40,
                padding: 17,
                width: Dimensions.get('screen').width * 0.6,
                borderRadius: 100,
                alignItems: 'center',
              },
            ]}
            onPress={() => router.push({ pathname: '/chat', params: { id: selectedChatFace.id } })}>
            <Text style={{ fontSize: 16, color: '#fff' }}>Let's Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
