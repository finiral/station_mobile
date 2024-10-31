// CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      <View
        style={[
          styles.emphasisBar,
          {
            left: `${(100 / state.routes.length) * state.index}%`, // Position the emphasis bar
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={handlePress}
            style={styles.tab}
          >
            <MaterialIcons
              name={options.tabBarIcon}
              size={24}
              color={isFocused ? '#000' : '#555'}
            />
            <Text style={{ color: isFocused ? '#000' : '#555', fontSize: 12 }}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  emphasisBar: {
    position: 'absolute',
    height: 4,
    width: `${100 / 3}%`, // Adjust based on the number of tabs
    backgroundColor: '#2161eb',
    top: 0,
    transition: 'left 0.2s', // Smooth transition for the emphasis bar
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
});

export default CustomTabBar;
