import React, { useEffect, useCallback, useReducer } from 'react';
import {
  TextInput,
  ScrollView,
  Text,
  View,
  Platform,
  Alert,
  StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import * as productsActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
};

const EditProductScreen = props => {
  const productId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(product => product.id === productId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      return Alert.alert('Wrong input', 'Please check the errors in the form', [
        { text: 'Okay' }
      ]);
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id='title'
          label='Title'
          errorText='Please enter a valid title!'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initalValue={editedProduct ? editedProduct.title : ''}
          initallyValid={!!editedProduct}
          required
        />
        <Input
          id='imageUrl'
          label='Image Url'
          errorText='Please enter a valid Image Url!'
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initalValue={editedProduct ? editedProduct.imageUrl : ''}
          initallyValid={!!editedProduct}
          required
        />
        {editedProduct ? null : (
          <Input
            id='price'
            label='Price'
            errorText='Please enter a valid price!'
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id='description'
          label='Description'
          errorText='Please enter a valid description!'
          autoCapitalize='sentences'
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initalValue={editedProduct ? editedProduct.description : ''}
          initallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFunction = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFunction}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
    // justifyContent: 'center',
    // alignItems: 'flex-end'
  }
});

export default EditProductScreen;
