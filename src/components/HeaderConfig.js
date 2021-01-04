import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import logo from '../../assets/pro-cris-w.png';
import ConfigButtonHandler from './ConfigButtonHandler';

export default function HeaderMain({animatedBar, setAnimatedBar}) {
    const [configButton, setConfigButton] = React.useState(false);
    const animatedBarScreenWidth = (Dimensions.get('window').width - (Dimensions.get('window').width / 2)); 
    const navigation = useNavigation();   
  
    React.useEffect(() => {
        if(animatedBar === 0) {
            navigation.navigate('AddLesson');
        } else {
            navigation.navigate('RemoveLesson');
        }
    }, [animatedBar]);

    function rightButtonPress() {
        setAnimatedBar(animatedBarScreenWidth);
    }
    function leftButtonPress() {
        setAnimatedBar(0);
    }
    function configButtonPress() {
        setConfigButton(!configButton);
    }
    return (
        <View style={styles.containerHeader}>
            <View style={styles.topContainer}>
                <View>
                    <Image style={styles.logoImage} source={logo} />
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.4} onPress={configButtonPress}>
                        <Entypo name="dots-three-vertical" size={24} color="#CCC4F2" />
                    </TouchableOpacity>
                </View>
            </View>
            {configButton? (
                <ConfigButtonHandler currentPage={false} />
            ): null}
            
        </View>    
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        height: '100%',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#7C6FBD',
        position: 'relative',
    },
    topContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 0,
    },  
    logoImage: {
        width: 131,
        resizeMode: 'contain',
    },
    configContainer: {
        width: 150,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 10,
        right: '15%',
        backgroundColor: '#FBFAFF',
    },
    configContainerButton: {
        borderBottomColor: '#CCC591',
        borderBottomWidth: 1, 
        paddingVertical: 10,      
    },
}); 