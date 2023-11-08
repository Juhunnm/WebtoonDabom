import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
    const ref = useRef(null);
  return (
    <Stack.Navigator>
            {/* 메인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="Home" component={BottomTabNavigation} options={{
                    title: '웹툰다봄',
                    headerLeft: null, //뒤로가기 버튼을 없앰
                    headerRight: () => (//헤더바 오른쪽에 배치할 놈들
                        <View style={styles.headerRight}>
                            <MaterialCommunityIcons name="bell" size={24} color="black" style={styles.icons} />
                        </View>
                    )
                }} />
            </Stack.Group>
        </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        marginRight: 20,
    }
});

export default StackNavigation
