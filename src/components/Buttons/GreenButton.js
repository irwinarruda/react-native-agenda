import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../globalStyles';

export default function GoldButton(props) {
    return (
        <TouchableOpacity 
            style={ styles.greenButton }
            activeOpacity={0.7}
            {...props}
        >
            <Text style={globalStyles.bold_white_14_karla}>{ props.children }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    greenButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 30,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: '#2DCC69',
        borderRadius: 5,
    },
});