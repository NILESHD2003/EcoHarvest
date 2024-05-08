import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal} from 'react-native';

export default function Loader({visibility}:{visibility: boolean}) {
  return (
    <Modal visible = {visibility}>
      <View>
        <Text>Loading</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
