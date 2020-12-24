import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { Ionicons } from '@expo/vector-icons';

import { Colors, SPACING, width } from './../../config/ui-config';
import { pages } from './../../config/data';

export default function BottomNavigation({ navigation }) {
  const [selectedPage, setSelectedPage] = React.useState(0);

  function changePage(index) {
    navigation.navigate(pages[index].route);
    setSelectedPage(index);
  }

  return (
    <View style={styles.container}>
      {pages.map((page, index) => {
        return (
          <TouchableScale
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  selectedPage == index ? 'white' : 'transparent',
              },
            ]}
            key={'icon' + index}
            onPress={() => changePage(index)}
          >
            <Ionicons
              name={page.iconName}
              size={selectedPage == index ? 22 : 24}
              color={selectedPage != index ? 'white' : Colors.primary}
            />
          </TouchableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    height: 70,
    borderRadius: 40,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING * 2,
  },
});
