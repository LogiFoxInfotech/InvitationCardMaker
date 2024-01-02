import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LayoutChangeEvent,
  Linking,
  Modal,
  PanResponder,
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Images } from "./assets/image/images";
import { Dropdown } from "react-native-element-dropdown";
import {
  Sticker,
  alignArray,
  colorAray,
  fontDefulteStyle,
  fontFamilyAray,
  fontStyleArray,
  getFountArray,
  getOpacityArray,
  languageArray,
} from "./assets/Commen";
import { Font } from "./assets/fonts/Font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Slider from "react-native-slider";
import { TranslatorProvider, useTranslator } from "react-native-translator";
import ViewShot from "react-native-view-shot";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import WebView from "react-native-webview";

const App = () => {
  const defultData = {
    value: "Enter Text",
    x: 0,
    y: 0,
    Height: 0,
    Width: 0,
    style: {
      fontFamily: "Playfair_Display-Regular",
      fontSize: 14,
      color: "black",
      textAlign: "center",
    },
  };
  const [fieldData, setFieldData] = useState<any>([
    {
      value: "Katha Invitation Card",
      type: "label",
      x: 0,
      y: 0,
      Height: 0,
      Width: 0,
      style: {
        fontFamily: "Playfair_Display-Regular",
        fontSize: 18,
        color: "black",
      },
    },
    {
      value: "Enter Text",
      type: "label",
      x: 0,
      y: 0,
      Height: 0,
      Width: 0,
      style: {
        fontFamily: "Playfair_Display-Regular",
        fontSize: 14,
        color: "black",
      },
    },
    {
      value: null,
      type: "sticker",
      x: 0,
      y: 0,
      style: {
        fontFamily: "Playfair_Display",
        fontSize: 14,
        color: "black",
      },
    },
  ]);
  const [gifArray, setGifArray] = useState([...Sticker]);
  const [showModal, setShowModal] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [showFontOption, setShowFontOption] = useState(false);
  const [sliderType, setSliderType] = useState("");

  const onDelete = (index: number) => {
    setFieldData(fieldData.filter((item: any, ind: number) => index != ind));
    if (selected > index) {
      setSelected(selected - 1);
    }
  };

  const onChangeStyle = (style: any, key: any = "style") => {
    let data = fieldData;
    data[selected][key] = { ...data[selected][key], ...style };
    setFieldData([...data]);
  };

  const onChangeposition = (
    index: number,
    position: { x: number; y: number }
  ) => {
    let data = fieldData;
    data[index] = {
      ...data[index],
      x: position.x,
      y: position.y,
    } as never;
    setFieldData([...data]);
  };

  const AnimatedView = ({ item, index }: { item: any; index: number }) => {
    let position = useRef(
      new Animated.ValueXY({ x: item.x, y: item.y })
    ).current;
    // State to track if the card is being dragged
    const [dragging, setDragging] = useState(false);
    // Create a pan responder to handle touch events
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setDragging(true);
        },
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: position.x,
              dy: position.y,
            },
          ],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
          onChangeposition(index, {
            x: position.x as never,
            y: position.y as never,
          });
          let data = fieldData;
          data[index] = {
            ...data[index],
            x: position.x,
            y: position.y,
          } as never;
          setFieldData([...data]);
          setDragging(false);
          position.extractOffset();
        },
      })
    ).current;

    const [borderWidth, setBorderWidth] = useState(
      item.Width ? item.Width : item.type == "sticker" ? moderateScale(60) : 0
    );
    const [borderHeight, setBorderHeight] = useState(
      item.Height ? item.Height : item.type == "sticker" ? moderateScale(60) : 0
    );
    const [textScale, setTextScale] = useState(item.style.fontSize);

    useEffect(() => {
      let data = fieldData;
      data[index] = {
        ...data[index],
        Height: borderHeight,
        Width: borderWidth,
        style: {
          ...data[index].style,
          fontSize: textScale,
        },
      } as never;
      setFieldData(data);
    }, [borderHeight, borderWidth]);

    const panResponderzoomV = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;
        setBorderHeight((prevHeight: number) => 
        prevHeight + dy >= (item.type == "sticker" ? 40 : 20) &&
        prevHeight + dy <= Dimensions.get("window").height * 0.7
          ? prevHeight + dy
          : prevHeight
      );
      },
    });
    const panResponderzoomH = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;
        setBorderWidth((prevWidth: number) =>
        prevWidth + dx >= 40 &&
        prevWidth + dx <= Dimensions.get("window").width * 0.7
          ? prevWidth + dx
          : prevWidth
      );
      },
    });

    const handleLayout = (event: LayoutChangeEvent) => {
      if (borderHeight == 0 && borderWidth == 0) {
        const { height, width } = event.nativeEvent.layout;
        setBorderHeight(height);
        setBorderWidth(width);
      }
    };

    return (
      <Animated.View
        style={[
          {
            marginTop: index == 0 ? moderateScale(10) : moderateScale(5),
            transform: position.getTranslateTransform(),
            opacity: dragging ? 0.8 : 1,
            flexDirection: "row",
            position: "absolute",
            justifyContent: "center",
            alignSelf: "center",
            zIndex: selected == index ? 99 : 1
          },
        ]}
      >
        <Animated.View {...panResponder.panHandlers}>
          <TouchableOpacity
            onLayout={handleLayout}
            onPress={() => setSelected(index)}
            style={[
              {
                borderWidth: selected == index ? 1 : 0,
                borderStyle: "dashed",
                overflow: "hidden",
              },
              borderHeight != 0 && borderWidth != 0
                ? { height: borderHeight == 0 ? "auto" : borderHeight, width: borderWidth  == 0 ? "auto" :  borderWidth}
                : {},
            ]}
          >
            {item.type != "sticker" ? (
              <Text
                style={[
                  {
                    ...item.style,
                    fontSize: moderateScale(item.style.fontSize),
                    ...(item?.style?.opacity && {
                      opacity: item?.style?.opacity / 100,
                    }),
                    ...(item?.style?.fontStyle && item?.style?.fontStyle),
                    shadowOpacity: 1,
                    shadowRadius: 5,
                  },
                ]}
              >
                {item.value}
              </Text>
            ) : (
              <Image
                style={{
                  height: borderHeight - 2,
                  width: borderWidth - 2,
                  resizeMode: "stretch",
                }}
                source={
                  item.value == null ? Images.camera : { uri: item.value }
                }
                defaultSource={Images.camera}
              />
            )}
          </TouchableOpacity>
        </Animated.View>
        {selected == index && (
          <>
            {/* <TouchableOpacity
              onPress={() => onDelete(index)}
              style={{
                padding: 5,
                borderRadius: 15,
                backgroundColor: "white",
                top: -10,
                right: -10,
                borderWidth: 1,
                borderColor: "#EDEDED",
                height: 25,
                position: "absolute",
              }}
            >
              <Image style={{ height: 15, width: 15 }} source={Images.delete} />
            </TouchableOpacity> */}
            <View
              {...panResponderzoomV.panHandlers}
              style={{
                padding: 5,
                borderRadius: 15,
                backgroundColor: "white",
                // right: -10,
                top: borderHeight - 10,
                borderWidth: 1,
                borderColor: "#EDEDED",
                height: 25,
                position: "absolute",
                alignSelf: "center",
                transform: [{rotate: "45deg"}]
              }}
            >
              <Image
                style={{ height: 15, width: 15 }}
                source={Images.zoom_out}
              />
            </View>
            <View style={{
              justifyContent: "center",
              position: "absolute",
              height: "100%",
              right: 0
            }}>
            <View
              {...panResponderzoomH.panHandlers}
              style={{
                padding: 5,
                borderRadius: 15,
                backgroundColor: "white",
                right: -10,
                borderWidth: 1,
                borderColor: "#EDEDED",
                height: 25,
                transform: [{rotate: "-45deg"}]
              }}
            >
              <Image
                style={{ height: 15, width: 15 }}
                source={Images.zoom_out}
              />
            </View>
            </View>
            <TouchableOpacity
              onPress={() => setShowModal(index)}
              style={{
                padding: 5,
                borderRadius: 15,
                backgroundColor: "white",
                left: -10,
                top: -10,
                borderWidth: 1,
                borderColor: "#EDEDED",
                height: 25,
                position: "absolute",
              }}
            >
              <Image style={{ height: 15, width: 15 }} source={Images.pencil} />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    );
  };

  const ModalDesign = () => {
    const [value, setValue] = useState(fieldData[showModal].value);
    const onChange = (item: any) => {
      let data = fieldData;
      data[showModal] = { ...data[showModal], value: item };
      setFieldData([...data]);
      setShowModal(null);
    };

    return (
      (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {fieldData[selected]?.type == "label" ? (
              <>
                <TextInput
                  returnKeyType="done"
                  style={styles.input}
                  value={value}
                  onChangeText={setValue}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => onChange(value)}
                >
                  <Text style={styles.textStyle}>submit</Text>
                </Pressable>
              </>
            ) : (
              <FlatList
                data={gifArray}
                contentContainerStyle={{
                  flex: 1,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      height: horizontalScale(80),
                      width: horizontalScale(80),
                      marginVertical: moderateScale(10),
                    }}
                    onPress={() => onChange(item)}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ flex: 1 }}
                      source={{ uri: item }}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      )
    );
  };

  const 
  BottomView = () => {
    const onAddFiled = (type: string) => {
      setFieldData([
        ...fieldData,
        { ...defultData, value: type == "sticker" ? null : "Enter Text", type },
      ]);
      setSelected(fieldData.length);
    };

    return (
      <View
        style={[
          styles.bottomBox,
          {
            borderTopLeftRadius: showFontOption ? 0 : 15,
            borderTopRightRadius: showFontOption ? 0 : 15,
          },
        ]}
      >
        <View style={styles.fd_row}>
          <Text
            disabled={selected == null || fieldData[selected]?.type == "gif"}
            onPress={() => setShowFontOption(!showFontOption)}
            style={[
              styles.fontButtontext,
              styles.fontButton,
              {
                color:
                  selected == null || fieldData[selected]?.type == "gif"
                    ? "gray"
                    : "black",
              },
            ]}
          >
            F
          </Text>
          <Text
            onPress={() => onAddFiled("label")}
            style={[styles.fontButtontext, styles.fontButton]}
          >
            Add Filed
          </Text>
          <Text
            onPress={() => {onAddFiled("sticker")
          setShowModal(fieldData.length)}}
            style={[styles.fontButtontext, styles.fontButton]}
          >
            Add Stiker
          </Text>
          <Text
            onPress={captureAndShareAsPDF}
            style={[styles.fontButtontext, styles.fontButton]}
          >
            Share
          </Text>
          <Text
            onPress={()=>setSelected(null)}
            style={[styles.fontButtontext, styles.fontButton]}
          >
            clear
          </Text>
        </View>
      </View>
    );
  };

  const TranslatorView = () => {
    const { translate } = useTranslator();
    return (
      <Dropdown
        style={[styles.dropDownStyle, { height: moderateScale(28) }]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={fieldData[selected]?.language as never}
        onChange={async (item) => {
          let _result = "Enter a URL";
          while (_result == "Enter a URL") {
            _result = await translate(
              fieldData[selected]?.language ?? "en",
              item.value as never,
              fieldData[selected]?.value,
              {
                type: "google",
                timeout: 5000,
              }
            );
            _result = await translate(
              fieldData[selected]?.language ?? "en",
              item.value as never,
              fieldData[selected]?.value,
              {
                type: "google",
                timeout: 5000,
              }
            );
          }
          let data = fieldData;
          data[selected].value = _result;
          data[selected].language = item.value;
          setFieldData([...data]);
        }}
        dropdownPosition={"top"}
        renderRightIcon={() => null}
        itemTextStyle={[styles.fontSizeItemText]}
        autoScroll
        selectedTextStyle={styles.selectedText}
        data={languageArray}
      />
    );
  };
  const viewShotRef = useRef();

  const captureAndShareAsPDF = async () => {
    try {
      setSelected(null)
      const uri = await viewShotRef.current.capture();

      // Convert the image URI to a PDF
      const options = {
        html: `      <html>
        <head>
          <style>
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%; /* 100% of the viewport height */
              width: 110%; /* 100% of the viewport height */
              background-color: red;
              margin: 0;
            }
            img {
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>  
          <img src="${uri}" alt="Centered Image">
        </body>
      </html>`,
        fileName: 'captured_screen',
        directory: 'Documents',
        // padding: 0,
        // paddingLeft: 0,
        // paddingRight: 0,
        // paddingTop: 0,
        // paddingBottom: 0
      };
      const pdfFile = await RNHTMLtoPDF.convert(options);
      const shareOptions = {
        type: 'application/pdf',
        title: 'Share as PDF',
        url: `file://${pdfFile.filePath}`,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
        
      } catch (error) {
        console.error('Error requesting storage permission:', error);
      }
    };

    // Trigger the permission request
    requestStoragePermission();
  }, []);


  return (
    <TranslatorProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.mainBox}>
          <ViewShot style={{flex: 1}} ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            <ImageBackground
              style={styles.background}
              resizeMode="stretch"
              source={Images.backgroundImage1}
            >
              <View style={styles.box}>
                {fieldData.map((item: any, index: number) => (
                  <AnimatedView item={item} index={index} />
                ))}
              </View>
              <View>
                {selected != null &&
                  fieldData[selected]?.type != "gif" &&
                  showFontOption && (
                    <>
                      <View style={{ backgroundColor: "white" }}>
                        {sliderType == "shadow" ? (
                          <>
                            <Slider
                              thumbTouchSize={{ width: 40, height: 40 }}
                              minimumValue={-100}
                              style={{ width: "80%", alignSelf: "center" }}
                              maximumValue={100}
                              value={
                                fieldData[selected]["style"].shadowOffset?.height ?? 0
                              }
                              onValueChange={(value: number) => {
                                onChangeStyle({
                                  shadowOffset: {
                                    ...fieldData[selected]["style"].shadowOffset,
                                    height: value,
                                  },
                                });
                              }}
                            />
                            <Slider
                              thumbTouchSize={{ width: 40, height: 40 }}
                              minimumValue={-100}
                              style={{ width: "80%", alignSelf: "center" }}
                              maximumValue={100}
                              value={
                                fieldData[selected]["style"].shadowOffset
                                  ?.width ?? 0
                              }
                              onValueChange={(value: number) => {
                                onChangeStyle({
                                  shadowOffset: {
                                    ...fieldData[selected]["style"]
                                      .shadowOffset,
                                    width: value,
                                  },
                                });
                              }}
                            />
                          </>
                        ) : (
                          sliderType == "opacity" && (
                            <Slider
                              thumbTouchSize={{ width: 40, height: 40 }}
                              minimumValue={0}
                              style={{ width: "80%", alignSelf: "center" }}
                              maximumValue={100}
                              value={fieldData[selected]["style"].opacity ?? 1}
                              onValueChange={(value: number) => {
                                onChangeStyle({ opacity: value });
                              }}
                            />
                          )
                        )}
                      </View>
                      <View style={[styles.fontBox]}>
                        <ScrollView scrollEnabled horizontal>
                          <Dropdown
                            style={[
                              styles.dropDownStyle,
                              { height: moderateScale(28) },
                            ]}
                            placeholder="Select fontSize"
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={
                              fieldData[selected]?.style?.fontSize as never
                            }
                            onChange={(item) => {
                              let data = fieldData;
                              setFieldData([...data]);
                              onChangeStyle({ fontSize: item.value });
                            }}
                            dropdownPosition={"top"}
                            renderRightIcon={() => null}
                            itemTextStyle={[styles.fontSizeItemText]}
                            autoScroll
                            selectedTextStyle={styles.selectedText}
                            data={getFountArray()}
                          />
                          <Dropdown
                            style={[
                              styles.dropDownStyle,
                              { height: moderateScale(28) },
                            ]}
                            placeholder="Select letterSpacing"
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={
                              fieldData[selected]?.style?.letterSpacing as never
                            }
                            onChange={(item) =>
                              onChangeStyle({ letterSpacing: item.value })
                            }
                            dropdownPosition={"top"}
                            renderRightIcon={() => null}
                            itemTextStyle={[styles.fontSizeItemText]}
                            autoScroll
                            selectedTextStyle={styles.selectedText}
                            data={getFountArray()}
                          />
                          <Dropdown
                            style={[
                              styles.dropDownStyle,
                              { height: moderateScale(28) },
                            ]}
                            placeholder="Select lineHeight"
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={
                              fieldData[selected]?.style?.lineHeight as never
                            }
                            onChange={(item) =>
                              onChangeStyle({ lineHeight: item.value })
                            }
                            dropdownPosition={"top"}
                            renderRightIcon={() => null}
                            itemTextStyle={[styles.fontSizeItemText]}
                            autoScroll
                            selectedTextStyle={styles.selectedText}
                            data={getFountArray()}
                          />
                          <Dropdown
                            style={[
                              styles.dropDownStyle,
                              { height: moderateScale(28) },
                            ]}
                            placeholder="Select fontStyle"
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={fieldData[selected]?.fontStyle as never}
                            onChange={(item) => {
                              let data = fieldData;
                              data[selected]["fontStyle"] = item.label;
                              setFieldData([...data]);
                              onChangeStyle({
                                ...fontDefulteStyle,
                                ...item.style,
                              });
                            }}
                            dropdownPosition={"top"}
                            renderRightIcon={() => null}
                            itemTextStyle={[styles.fontSizeItemText]}
                            autoScroll
                            selectedTextStyle={styles.selectedText}
                            data={fontStyleArray}
                          />
                          <TranslatorView />
                          <Dropdown
                            style={[
                              styles.dropDownStyle,
                              { height: moderateScale(28) },
                            ]}
                            placeholder="Select textAlign"
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={fieldData[selected]?.style?.textAlign}
                            onChange={(item) => {
                              onChangeStyle({ textAlign: item.value });
                            }}
                            dropdownPosition="top"
                            renderRightIcon={() => null}
                            itemTextStyle={styles.fontSizeItemText}
                            autoScroll
                            renderItem={({ label, value }) => (
                              <Text style={styles.item}>{label}</Text>
                            )}
                            selectedTextStyle={[
                              styles.selectedText,
                              {
                                fontFamily:
                                  fieldData[selected]?.style?.fontFamily,
                              },
                            ]}
                            data={alignArray}
                          />
                          <Dropdown
                            style={[
                              styles.dropDownStyle,
                              { height: moderateScale(28) },
                            ]}
                            placeholder="Select fontFamily"
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={fieldData[selected]?.style?.fontFamily
                              .split("-Regular")
                              .join("")}
                            onChange={(item) =>
                              onChangeStyle({
                                fontFamily: `${item.value}-Regular`,
                              })
                            }
                            dropdownPosition="top"
                            renderRightIcon={() => null}
                            itemTextStyle={styles.fontSizeItemText}
                            autoScroll
                            renderItem={({ label, value }) => (
                              <Text
                                style={[
                                  styles.item,
                                  { fontFamily: `${value}-Regular` },
                                ]}
                              >
                                {label}
                              </Text>
                            )}
                            selectedTextStyle={[
                              styles.selectedText,
                              {
                                fontFamily:
                                  fieldData[selected]?.style?.fontFamily,
                              },
                            ]}
                            data={fontFamilyAray}
                          />
                          <Dropdown
                            style={[
                              styles.dropDownStyle,
                              { height: moderateScale(28) },
                            ]}
                            placeholder="Select color"
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={fieldData[selected]?.style?.color}
                            dropdownPosition="top"
                            onChange={(item) =>
                              onChangeStyle({ color: item.value })
                            }
                            renderRightIcon={() => null}
                            itemTextStyle={styles.fontSizeItemText}
                            autoScroll
                            renderItem={({ label, value }) => (
                              <Text style={[styles.item, { color: value }]}>
                                {label}
                              </Text>
                            )}
                            selectedTextStyle={[
                              styles.selectedText,
                              { color: fieldData[selected]?.style?.color },
                            ]}
                            data={colorAray}
                          />
                          <Pressable
                            onPress={() =>
                              setSliderType(
                                sliderType == "shadow" ? "" : "shadow"
                              )
                            }
                            style={[styles.dropDownStyle, styles.optionButton]}
                          >
                            <Text>shadow</Text>
                          </Pressable>
                          <Pressable
                            onPress={() =>
                              setSliderType(
                                sliderType == "opacity" ? "" : "opacity"
                              )
                            }
                            style={[styles.dropDownStyle, styles.optionButton]}
                          >
                            <Text>Opacity</Text>
                          </Pressable>
                        </ScrollView>
                      </View>
                    </>
                  )}
              </View>
            </ImageBackground>
          </ViewShot>
            <BottomView />
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal != null}
              onRequestClose={() => {
                setShowModal(null);
              }}
            >
              <ModalDesign />
            </Modal>
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </TranslatorProvider>
  );
};

export default App;

const moderateScale = (size: number, factor = 0.5) => {
  return size + (horizontalScale(size) - size) * factor;
};

const guidelineBaseWidth = 375;
const Width = Dimensions.get("window").width;

const horizontalScale = (size: number) => (Width / guidelineBaseWidth) * size;

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  box: {
    flex: 0.4,
    marginHorizontal: moderateScale(20),
    justifyContent: "center",
  },
  tempBox: {
    flex: 0.21,
    justifyContent: "space-around",
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "90%",
    borderWidth: 1,
    borderColor: "#EDEDED",
    alignItems: "flex-end",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 40,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    alignSelf: "flex-end",
  },
  textStyle: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: moderateScale(16),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  bottomBox: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    zIndex: 9999,
  },
  fontBox: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginBottom: 10,
  },
  fontSizeItemText: {
    textAlign: "center",
    fontSize: moderateScale(16),
  },
  dropDownStyle: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "white",
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(30),
    marginHorizontal: moderateScale(5),
  },
  item: {
    padding: 10,
    textAlign: "center",
    fontSize: moderateScale(14),
  },
  selectedText: {
    textAlign: "center",
    flex: 1,
    alignContent: "center",
    fontSize: moderateScale(20),
    lineHeight: moderateScale(20),
    height: moderateScale(20),
    color: "#000000",
    fontFamily: `${Font.DancingScript}-Regular`,
  },
  fd_row: {
    flexDirection: "row",
    width: "100%",
    padding: 6,
  },
  fontButton: {
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: "#FFFFFF",
  },
  fontButtontext: {
    fontSize: moderateScale(20),
    marginHorizontal: 10,
    fontWeight: "900",
    color: "#000000",
  },
  optionButton: {
    height: moderateScale(28),
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
