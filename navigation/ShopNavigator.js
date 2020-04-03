import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';

import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen, {
  productsOverviewScreenOptions
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen, {
  productDetailScreenOptions
} from '../screens/shop/ProductDetailsScreen';
import CartScreen, { cartScreenOptions } from '../screens/shop/CartScreen';
import UserProductsScreen, {
  userProductsScreenOptions
} from '../screens/user/UserProductsScreen';
import EditProductsScreen, {
  editProductsScreenOptions
} from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';
import OrdersScreen, {
  ordersScreenOptions
} from '../screens/shop/OrdersScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const AdminStackNavigator = createStackNavigator();
const AuthStackNavigator = createStackNavigator();
const ShopDrawerNavigator = createDrawerNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailsScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetails: ProductDetailsScreen,
//     Cart: CartScreen
//   },
//   {
//     navigationOptions: {
//   drawerIcon: drawerConfig => (
//     <Ionicons
//       name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//       size={23}
//       color={drawerConfig.tintColor}
//     />
//   )
// },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen
//   },
//   {
//     navigationOptions: {
//   drawerIcon: drawerConfig => (
//     <Ionicons
//       name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//       size={23}
//       color={drawerConfig.tintColor}
//     />
//   )
// },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductsScreen}
        options={editProductsScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductsScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title='Logout'
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(authActions.logout());
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     }
//   }
// );

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);
