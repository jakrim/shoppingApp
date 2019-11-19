import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const EditProductScreen = props => {
  return (
    <FlatList>
      <View style={styles.screen}>
        <Text> textInComponent </Text>
      </View>
    </FlatList>
  );
};

const styles = StyleSheet.create({
  screen: {}
});

export default EditProductScreen;
