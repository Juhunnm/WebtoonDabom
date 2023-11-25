import React from 'react'
import { View, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
const WINDOW_HEIGHT = Dimensions.get('window').height;

// 플랫폼 선택 영역 사이즈
const PLATFORM_SIZE = WINDOW_HEIGHT * 0.13;

const PlatformButton = ({ isChecked, onPress, image }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={image} style={styles.platformImage} />
            {!isChecked && <View style={styles.unselectedOverlay} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    platformImage: {
        height: PLATFORM_SIZE * 0.8,
        width: PLATFORM_SIZE * 0.8,
        borderRadius: PLATFORM_SIZE * 0.1,
    },
    unselectedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: PLATFORM_SIZE * 0.8,
        width: PLATFORM_SIZE * 0.8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: PLATFORM_SIZE * 0.1,
    },
});

export default PlatformButton
