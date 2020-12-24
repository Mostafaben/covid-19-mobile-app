import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import Spacer from '../components/spacer';
import {
  Colors,
  H1,
  H2,
  H3,
  height,
  SPACING,
  SPAN,
  width,
} from './../../config/ui-config';

const axios = require('axios').default;

const categories = [
  'health',
  'entertainment',
  'general',
  'science',
  'sports',
  'technology',
];
const itemsPerPage = 3;
const errorImage = require('./../../assets/error.png');

export default function NewsScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const animateTitle = useRef(new Animated.Value(0)).current;
  const translateX = animateTitle.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });
  useEffect(() => {
    getArticles(page);
    Animated.timing(animateTitle, {
      duration: 300,
      useNativeDriver: true,
      toValue: 1,
    }).start();
  }, [category]);

  function getArticles(selectedPage) {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=${categories[category]}&country=us&page=${selectedPage}&pageSize=${itemsPerPage}&apiKey=c7f6dc8449b9443590d4f383aabb514b`
      )
      .then((res) => {
        setPage(selectedPage + 1);
        setArticles(res.data.articles);
        setLoading(false);
        setIsRefreshing(false);
      })
      .catch(() => {
        setLoading(false);
        setIsRefreshing(false);
        setArticles([]);
      });
  }

  function RefreshArticles() {
    setIsRefreshing(true);
    getArticles(0);
  }
  function changeCategory(index) {
    if (index != category) {
      animateTitle.setValue(0);
      setCategory(index);
    }
  }

  return (
    <View style={styles.container}>
      <Animated.Text
        style={{
          fontSize: H1,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          letterSpacing: 0,
          marginHorizontal: SPACING,
          opacity: animateTitle,
          transform: [{ translateX }],
        }}
      >
        {categories[category]}
      </Animated.Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: SPACING * 0.5, height: 80 }}
        keyExtractor={(item, index) => 'category' + index}
        renderItem={({ item, index }) => {
          return (
            <TouchableScale
              onPress={() => changeCategory(index)}
              style={{ height: 42 }}
            >
              <View
                style={[
                  styles.categoryContainer,
                  {
                    backgroundColor:
                      category === index ? Colors.primary : '#bbb',
                  },
                ]}
              >
                <Text
                  style={{
                    color: 'white',
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableScale>
          );
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={RefreshArticles}
          />
        }
      >
        {loading ? (
          <ActivityIndicator size={'large'} color={Colors.primary} />
        ) : articles.length === 0 ? (
          <View
            style={{
              height: height * 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={errorImage} style={[{ width: 100, height: 100 }]} />
          </View>
        ) : (
          articles.map((article, index) => (
            <ArticleCard key={'article' + index} article={article} />
          ))
        )}
        <Spacer />
      </ScrollView>
    </View>
  );
}

function ArticleCard({ article }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
      <View style={styles.articleContainer}>
        <Image style={styles.articleImg} source={{ uri: article.urlToImage }} />
        <Text style={styles.articleTime}>
          {new Date(article.publishedAt).toDateString()}
        </Text>
        <View>
          <Text style={styles.articleTitle} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={styles.articleSummary} numberOfLines={3}>
            {article.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING * 2,
  },

  articleImg: {
    width: 90,
    height: 90,
    borderRadius: SPACING * 0.5,
    backgroundColor: Colors.lightGrey,
    marginRight: SPACING * 0.5,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: 180,
  },
  articleTime: {
    color: Colors.darkGrey,
    fontSize: 10,
    position: 'absolute',
    top: 15,
    right: SPACING,
  },
  articleSummary: {
    fontSize: 12,
    maxWidth: width * 0.6,
    color: Colors.darkGrey,
  },
  articleContainer: {
    marginHorizontal: SPACING * 0.5,
    marginVertical: SPACING * 0.25,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: SPACING * 0.5,
    borderRadius: SPACING,
  },
  categoryContainer: {
    paddingHorizontal: SPACING,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.primary,
    marginVertical: SPACING,
    marginHorizontal: 5,
  },
});
