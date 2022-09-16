import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constant';

const Button = ({onPress, styleContainer, title, disabled}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: disabled ? COLORS.gray : COLORS.secondary.satu,
      paddingHorizontal: 25,
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',

      ...styleContainer,
    },
    text: {
      ...FONTS.body3,
      color: COLORS.white,
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
