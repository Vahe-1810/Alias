import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import theme from 'theme';
import { RootStackParamList } from 'types';

type GameInProgressParams = NativeStackScreenProps<RootStackParamList>;

const SplashScreen = ({ navigation }: GameInProgressParams) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        delay: 3000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Menu');
      });
    });
  }, []);

  return (
    <View style={styles.root}>
      <Animated.View style={{ opacity }}>
        <Text style={{ color: theme.colors.text, fontSize: theme.fonts.h1, fontWeight: theme.weights.w3 }}>ALIAS</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.border,
    width: '100%',
    height: '100%',
  },
});
export default SplashScreen;
