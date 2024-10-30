import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StockScreen from "./components/StockScreen";
import LubrifiantForm from "./components/LubrifiantForm";
import VenteScreen from './components/VenteScreen';
import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Prelevement"
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen
          name="Prelevement"
          component={LubrifiantForm}
          options={{
            title: 'Prélever',
            tabBarIcon: 'local-gas-station',
          }}
        />
        <Tab.Screen
          name="Ventes"
          component={VenteScreen}
          options={{
            title: 'Ventes',
            tabBarIcon: 'attach-money',
          }}
        />
        <Tab.Screen
          name="Stock"
          component={StockScreen}
          options={{
            title: 'État de stock',
            tabBarIcon: 'inventory',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
