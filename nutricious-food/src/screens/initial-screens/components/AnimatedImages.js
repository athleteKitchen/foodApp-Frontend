import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const images = [
  require('../../../../assets/fitness-1-transperent.png'),
  require('../../../../assets/fitness-2-transperent.png'),
  require('../../../../assets/fitness-3-transperent.png'),
  require('../../../../assets/fitness-4-transperent.png'),
  require('../../../../assets/fitness-foods-transperent.png'),
];

const AnimatedImageComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Animated.View
          key={index}
          entering={FadeInLeft.duration(900)}
          exiting={FadeOutRight.duration(500)}
          style={[
            styles.imageContainer,
            { display: currentIndex === index ? 'flex' : 'none', alignItems: 'center' },
          ]}
        >
          <Image
            source={image}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel={"gym-freepik"}
          />
        </Animated.View>
      ))}
    </View>
  );
};

export default AnimatedImageComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: -hp(7)
},
imageContainer: {
    position: 'absolute',
},
image: {
    width: wp(120),
    height: hp(60),
    paddingHorizontal: wp(10)
  },
});
