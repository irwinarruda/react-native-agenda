import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../components/globalStyles';
import GoldButton from '../components/GoldButton';

export default function RemoveLesson() {
    return (
        <View style={styles.container}>
            <GoldButton onPress={() => console.log("oi")}>Sair</GoldButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });