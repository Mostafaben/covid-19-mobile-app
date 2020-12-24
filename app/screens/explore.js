import React from 'react';
import { useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Button,
  Linking,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spacer from '../components/spacer';
import {
  Colors,
  H1,
  H2,
  H3,
  SPACING,
  SPAN,
  width,
} from './../../config/ui-config';
const headerImage = require('./../../assets/stethoscope.png');

import { advices, symptoms } from './../../config/data';

export default function ExploreScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerCard}>
          <Image
            source={headerImage}
            style={[styles.headerImage]}
            resizeMode="contain"
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: H2,
              maxWidth: width * 0.5,
              marginBottom: SPACING * 0.5,
            }}
          >
            Coronavirus (COVID‑19)
          </Text>
          <Text style={{ color: 'white', maxWidth: width * 0.5 }}>
            There are three simple actions we must all do to keep on protecting
            each other
          </Text>
        </View>

        <View style={{ padding: SPACING, paddingBottom: 0 }}>
          <Text style={{ fontWeight: 'bold', fontSize: H2 }}>
            Are you feeling sick ?
          </Text>
          <Text>
            if you feel sick with any of COVID-19 symptoms please call or SMS
            immediately for help
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:3030`)}>
            <View style={styles.btn}>
              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
              >
                Call Now
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: H2, fontWeight: 'bold', margin: SPACING }}>
          Advices
        </Text>
        <FlatList
          data={advices}
          horizontal
          style={{ marginLeft: SPACING }}
          snapToInterval={width}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.adviceContainer}>
                <Image
                  source={item.image}
                  style={styles.adviceImage}
                  resizeMode="contain"
                />
                <Text style={{ textAlign: 'center' }}>{item.content}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => 'advice' + index}
        />

        <Text style={{ fontSize: H2, fontWeight: 'bold', margin: SPACING }}>
          Symptoms of coronavirus
        </Text>

        <Animated.FlatList
          data={symptoms}
          horizontal
          snapToInterval={width}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'sym' + index}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [60, 0, -60],
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
            });
            return (
              <View style={styles.symContainer}>
                <Animated.Image
                  source={item.image}
                  style={{
                    transform: [
                      {
                        scale,
                      },
                    ],
                    width: 60,
                    height: 60,
                    marginRight: SPACING,
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    maxWidth: width * 0.6,
                    alignContent: 'space-between',
                  }}
                >
                  <Animated.Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: H3,
                      opacity,
                      marginBottom: SPACING * 0.5,
                      textTransform: 'capitalize',
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                  >
                    {item.title}
                  </Animated.Text>
                  <Text style={{ color: Colors.darkGrey }}>{item.content}</Text>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          {symptoms.map((value, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const animate = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });
            return (
              <Animated.View
                key={'indicator' + index}
                style={{
                  width: SPACING / 2,
                  height: SPACING / 2,
                  opacity: animate,
                  backgroundColor: Colors.darkGrey,
                  transform: [{ scale: animate }],
                  borderRadius: 10,
                  marginHorizontal: 3,
                }}
              ></Animated.View>
            );
          })}
        </View>
        <Spacer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  headerCard: {
    backgroundColor: Colors.primary,
    elevation: 7,
    borderRadius: SPACING,
    marginHorizontal: SPACING,
    padding: SPACING,
  },
  headerImage: {
    position: 'absolute',
    width: width * 0.3,
    right: 20,
    top: 20,
    height: 110,
  },

  adviceContainer: {
    width: 110,
    marginRight: SPACING,
  },
  adviceImage: {
    width: 110,
    height: 110,
    marginBottom: SPACING * 0.5,
  },
  symContainer: {
    width: width - SPACING * 2,
    marginHorizontal: SPACING,
    backgroundColor: 'white',
    borderRadius: SPACING,
    padding: SPACING,
    marginBottom: SPACING,
    flexDirection: 'row',
  },
  btn: {
    width: width * 0.4,
    height: 50,
    borderRadius: 8,
    marginTop: SPACING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0 , 255 ,100)',
  },
});
