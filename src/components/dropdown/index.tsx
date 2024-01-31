import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { style } from "./styles";
import { useWindow } from "../../common/minix";

const Dropdown = ({
  data,
  selectedValue,
  placeholder,
  onChange,
}: {
  data: any;
  selectedValue: string;
  placeholder: string;
  onChange: (itemValue: string, index?: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH } = useWindow();

  const styles = style(RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        onChange(item?.value, index)
        setIsOpen(false)
      }} style={styles.renderItemView}>
        <Text style={styles.renderItemText}>{item?.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.mainView}>
      <Text style={styles.title}>{placeholder}</Text>
      {selectedValue ? <Text style={styles.selectedText}>{selectedValue}</Text> : null }
      <Modal animationType="slide" visible={isOpen} transparent>
        <TouchableOpacity activeOpacity={1} onPress={() => setIsOpen(false)} style={styles?.listMainView} />
          <View style={styles.listView}>
            <FlatList data={data} renderItem={renderItem} />
          </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default Dropdown;
