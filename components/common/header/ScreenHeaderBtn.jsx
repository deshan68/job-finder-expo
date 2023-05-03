import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./screenheader.style";
import { TouchableOpacity } from "react-native-gesture-handler";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
