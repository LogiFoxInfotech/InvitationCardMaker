import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  LayoutChangeEvent,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { style } from "./styles";
import { IMAGES } from "../../common/images";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sticker,
  alignArray,
  colorArray,
  fontDefulteStyle,
  fontFamilyArray,
  fontStyleArray,
  getFountArray,
  getLetterSpacingArray,
  horizontalScale,
  languageArray,
  moderateScale,
} from "../../utils";
import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";
import { Picker } from "@react-native-picker/picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ViewShot, { captureRef } from "react-native-view-shot";
import Slider from "@react-native-community/slider";
import { useWindow } from "../../common/minix";
import { COLOR } from "../../common/color";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import Dropdown from "../../components/dropdown";
import * as MediaLibrary from "expo-media-library";

const Home: React.FC = () => {
  const defultData = {
    value: "Enter Text",
    type: "label",
    x: 0,
    y: 0,
    Height: 0,
    Width: 0,
    fontStyle: "Normal",
    style: {
      fontFamily: fontFamilyArray[0].label,
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
      fontStyle: "Normal",
      style: {
        fontFamily: fontFamilyArray[0].label,
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
      fontStyle: "Normal",
      style: {
        fontFamily: fontFamilyArray[0].label,
        fontSize: 14,
        color: "black",
      },
    },
    {
      value: null,
      type: "sticker",
      x: 0,
      y: 0,
      fontStyle: "Normal",
      style: {
        fontFamily: fontFamilyArray[0].label,
        fontSize: 14,
        color: "black",
      },
    },
  ]);
  const [gifArray, setGifArray] = useState([...Sticker]);
  const [showModal, setShowModal] = useState<any>(null);
  const [selected, setSelected] = useState<any>(0);
  const [showFontOption, setShowFontOption] = useState(false);
  const [sliderType, setSliderType] = useState("");
  const { RESPONSIVE_WIDTH, RESPONSIVE_HEIGHT } = useWindow();
  const styles = style(RESPONSIVE_WIDTH, RESPONSIVE_HEIGHT);
  const viewShotRef = useRef();
  const [value, setValue] = useState(
    showModal ? fieldData[showModal]?.value : ""
  );

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
    const [dragging, setDragging] = useState(false);
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
          prevHeight + dy <= SCREEN_HEIGHT * 0.7
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
          prevWidth + dx >= 40 && prevWidth + dx <= SCREEN_WIDTH * 0.7
            ? prevWidth + dx
            : prevWidth
        );
      },
    });

    const handleLayout = (event: LayoutChangeEvent) => {
      if (borderHeight == 0 && borderWidth == 0) {
        const { height, width } = event.nativeEvent.layout;
        setBorderHeight(height);
        setBorderWidth(width + 10);
      }
    };

    const removeItem = () => {
      const newFiledData = fieldData;
      newFiledData?.splice(index, 1);
      setFieldData([...newFiledData]);
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
            zIndex: selected == index ? 99 : 1,
          },
        ]}
      >
        <Animated.View {...panResponder.panHandlers}>
          <TouchableOpacity
            onLayout={handleLayout}
            onPress={() => {
              if (fieldData[index].type != "label") {
                setShowFontOption(false);
              }
              setSelected(index);
            }}
            activeOpacity={0.8}
            style={[
              {
                borderWidth: selected == index ? 1 : 0,
                borderStyle: "dashed",
                overflow: "hidden",
              },
              borderHeight != 0 && borderWidth != 0
                ? {
                    height: borderHeight == 0 ? "auto" : borderHeight,
                    width: borderWidth == 0 ? "auto" : borderWidth,
                  }
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
                  item.value == null ? IMAGES.camera : { uri: item.value }
                }
                defaultSource={IMAGES.camera}
              />
            )}
          </TouchableOpacity>
        </Animated.View>
        {selected == index && (
          <>
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
                transform: [{ rotate: "45deg" }],
              }}
            >
              <Image
                style={{ height: 15, width: 15 }}
                source={IMAGES.zoom_out}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                position: "absolute",
                height: "100%",
                right: 0,
              }}
            >
              <View
                {...panResponderzoomH.panHandlers}
                style={{
                  padding: 5,
                  borderRadius: 15,
                  backgroundColor: "white",
                  right: -10,
                  borderWidth: 1,
                  borderColor: "#EDEDED",
                  transform: [{ rotate: "-45deg" }],
                }}
              >
                <Image
                  style={{ height: 15, width: 15 }}
                  source={IMAGES.zoom_out}
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
                position: "absolute",
              }}
            >
              <Image style={{ height: 10, width: 10 }} source={IMAGES.pencil} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeItem()}
              style={{
                padding: 1,
                borderRadius: 15,
                backgroundColor: "white",
                right: -10,
                top: -10,
                borderWidth: 1,
                borderColor: "#EDEDED",
                position: "absolute",
              }}
            >
              <Image style={{ height: 10, width: 10 }} source={IMAGES.close} />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    );
  };

  const ModalDesign = () => {
    const onChange = (item: any) => {
      let data = fieldData;
      data[showModal] = { ...data[showModal], value: item };
      setFieldData([...data]);
      setShowModal(null);
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowModal(null)}
        style={styles.centeredView}
      >
        <TouchableWithoutFeedback>
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
                data={[...gifArray, ...gifArray]}
                contentContainerStyle={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      height: RESPONSIVE_HEIGHT(0.06),
                      width: RESPONSIVE_HEIGHT(0.06),
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
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    );
  };

  const captureAndShareAsPDF = async () => {
    try {
      setSelected(null);
      const uri = await viewShotRef.current.capture();
      const base64Code = uri.split("data:image/png;base64,")[1];
      console.log("]]]]", uri);
      // const uria = await captureRef(viewShotRef, {
      //   format: 'png',
      //   quality: 1,
      // });
      // console.log(uria);

      // Convert the image URI to a PDF
      const options = {
        html: `<html>
        <head>
          <style>
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          </style>
        </head>
        <body>
          <img src="${uri}" class="img" alt="Centered Image"/>
        </body>
      </html>`,
        base64Code: false,
        base64: false,
      };
      if (Platform.OS === "web") {
        const pW = window.open("", "");
        pW.document.write(options.html);
        setTimeout(() => {
          pW.print();
          pW.document.close();
        }, 100);
      } else {
        // await Sharing.shareAsync(uri, {
        //   UTI: ".pdf",
        //   mimeType: "application/pdf",
        // });
      }
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const path = await MediaLibrary.saveToLibraryAsync(uri);

        console.log("Image successfully saved", path);
      }
      // const { uri: URI } = await Print.printToFileAsync(options);
      // await shareAsync(URI, { UTI: ".pdf", mimeType: "application/pdf" });

      // await Print.printToFileAsync(options)
      // .then(e => {
      //   console.log(e);

      // });
      // const shareOptions = {
      //   url: `file://${uri}`,
      // };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const BottomView = () => {
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
            // width: 'auto',
            alignSelf: "center",
            alignItems: "center",
          },
        ]}
      >
        <ScrollView horizontal style={styles.fd_row}>
          <Text
            disabled={selected == null && fieldData[selected]?.type != "label"}
            onPress={() =>
              selected != null && fieldData[selected]?.type === "label"
                ? (showFontOption ? setSliderType("") : null,
                  setShowFontOption(!showFontOption))
                : null
            }
            style={[
              styles.fontButtontext,
              styles.fontButton,
              {
                color:
                  selected == null || fieldData[selected]?.type != "label"
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
            onPress={() => {
              onAddFiled("sticker");
              setShowModal(fieldData.length);
            }}
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
            onPress={() => setSelected(null)}
            style={[styles.fontButtontext, styles.fontButton]}
          >
            clear
          </Text>
        </ScrollView>
      </View>
    );
  };

  const TranslatorView = () => {
    // const { translate } = useTranslator();
    return (
      <></>
      // <Dropdown
      //   style={[styles.dropDownStyle, { height: moderateScale(28) }]}
      //   maxHeight={300}
      //   labelField="label"
      //   valueField="value"
      //   selectedValue={fieldData[selected]?.language as never}
      //   onChange={async (item) => {
      //     // let _result = "Enter a URL";
      //     // while (_result == "Enter a URL") {
      //     //   _result = await translate(
      //     //     fieldData[selected]?.language ?? "en",
      //     //     item.value as never,
      //     //     fieldData[selected]?.value,
      //     //     {
      //     //       type: "google",
      //     //       timeout: 5000,
      //     //     }
      //     //   );
      //     //   _result = await translate(
      //     //     fieldData[selected]?.language ?? "en",
      //     //     item.value as never,
      //     //     fieldData[selected]?.value,
      //     //     {
      //     //       type: "google",
      //     //       timeout: 5000,
      //     //     }
      //     //   );
      //     // }
      //     // let data = fieldData;
      //     // data[selected].value = _result;
      //     // data[selected].language = item.value;
      //     // setFieldData([...data]);
      //   }}
      //   dropdownPosition={"top"}
      //   renderRightIcon={() => null}
      //   itemTextStyle={[styles.fontSizeItemText]}
      //   autoScroll
      //   selectedTextStyle={styles.selectedText}
      //   data={languageArray}
      // />
    );
  };

  return (
    <View style={styles.mainView}>
      {/* <ImageBackground
        resizeMode="contain"
        source={IMAGES.backgroundImage1}
        style={styles.backgroundImage}
      > */}
      {/* <TranslatorProvider style={{ flex: 1 }}> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* {Platform.OS != "android" ? <AndroidPermission /> : null} */}
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.mainBox}>
            <ViewShot
              style={{ flex: 1 }}
              ref={viewShotRef}
              options={{ format: "jpg", quality: 1 }}
            >
              <ImageBackground
                style={[styles.background]}
                resizeMode="contain"
                source={IMAGES.backgroundImage2}
              >
                <View style={styles.box}>
                  {fieldData.map((item: any, index: number) => (
                    <AnimatedView item={item} index={index} />
                  ))}
                </View>
                <View style={styles.bottomView}>
                  {selected != null &&
                    fieldData[selected]?.type != "gif" &&
                    showFontOption && (
                      <>
                        {sliderType == "shadow" ? (
                          <View style={styles.sliderView}>
                            <>
                              <Slider
                                minimumValue={-100}
                                style={{
                                  width: "80%",
                                  alignSelf: "center",
                                }}
                                minimumTrackTintColor={COLOR.orinet}
                                maximumTrackTintColor={COLOR.grey}
                                maximumValue={100}
                                value={
                                  fieldData[selected]["style"].shadowOffset
                                    ?.height ?? 0
                                }
                                onValueChange={(value: number) => {
                                  onChangeStyle({
                                    shadowOffset: {
                                      ...fieldData[selected]["style"]
                                        .shadowOffset,
                                      height: value,
                                    },
                                  });
                                }}
                              />
                              <Slider
                                minimumValue={-100}
                                style={{
                                  width: "80%",
                                  alignSelf: "center",
                                }}
                                minimumTrackTintColor={COLOR.orinet}
                                maximumTrackTintColor={COLOR.grey}
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
                          </View>
                        ) : (
                          sliderType == "opacity" && (
                            <View style={styles.sliderView}>
                              <Slider
                                thumbTouchSize={{ width: 40, height: 40 }}
                                minimumValue={0}
                                style={{
                                  width: "80%",
                                  height: 10,
                                  alignSelf: "center",
                                }}
                                minimumTrackTintColor={COLOR.orinet}
                                maximumTrackTintColor={COLOR.grey}
                                maximumValue={100}
                                value={
                                  fieldData[selected]["style"].opacity ?? 100
                                }
                                onValueChange={(value: number) => {
                                  onChangeStyle({ opacity: value });
                                }}
                              />
                            </View>
                          )
                        )}
                        <ScrollView scrollEnabled horizontal>
                          <View style={[styles.fontBox]}>
                            <Dropdown
                              data={getFountArray()}
                              selectedValue={
                                fieldData[selected]?.style?.fontSize
                              }
                              placeholder="FontSize"
                              onChange={(itemValue) => {
                                let data = fieldData;
                                setFieldData([...data]);
                                onChangeStyle({ fontSize: itemValue });
                              }}
                            />
                            <Dropdown
                              data={getLetterSpacingArray()}
                              selectedValue={
                                fieldData[selected]?.style?.letterSpacing
                              }
                              placeholder="LetterSpacing"
                              onChange={(itemValue) => {
                                onChangeStyle({
                                  letterSpacing: parseInt(itemValue),
                                });
                              }}
                            />
                            <Dropdown
                              data={getLetterSpacingArray()}
                              selectedValue={
                                fieldData[selected]?.style?.lineHeight
                              }
                              placeholder="LineHeight"
                              onChange={(itemValue) => {
                                onChangeStyle({
                                  lineHeight: parseInt(itemValue),
                                });
                              }}
                            />
                            <Dropdown
                              data={fontStyleArray}
                              selectedValue={fieldData[selected]?.fontStyle}
                              placeholder="FontStyle"
                              onChange={(itemValue, index) => {
                                let style = fontStyleArray[index].style;
                                let data = fieldData;
                                data[selected]["fontStyle"] = itemValue;
                                setFieldData([...data]);
                                onChangeStyle({
                                  ...fontDefulteStyle,
                                  ...style,
                                });
                              }}
                            />
                            <TranslatorView />
                            <Dropdown
                              data={alignArray}
                              selectedValue={
                                fieldData[selected]?.style?.textAlign
                              }
                              placeholder="TextAlign"
                              onChange={(itemValue, index) => {
                                onChangeStyle({ textAlign: itemValue });
                              }}
                            />
                            <Dropdown
                              data={fontFamilyArray}
                              selectedValue={
                                fieldData[selected]?.style?.fontFamily
                              }
                              placeholder="FontFamily"
                              onChange={(itemValue, index) => {
                                onChangeStyle({ fontFamily: itemValue });
                              }}
                            />
                            <Dropdown
                              data={colorArray}
                              selectedValue={fieldData[selected]?.style?.color}
                              placeholder="Color"
                              onChange={(itemValue, index) => {
                                onChangeStyle({ color: itemValue });
                              }}
                            />
                            <Pressable
                              onPress={() =>
                                setSliderType(
                                  sliderType == "shadow" ? "" : "shadow"
                                )
                              }
                              style={[
                                styles.dropDownStyle,
                                styles.optionButton,
                                {
                                  borderColor:
                                    sliderType == "shadow"
                                      ? COLOR.blue
                                      : COLOR.grey,
                                  backgroundColor:
                                    sliderType == "shadow"
                                      ? COLOR.blue
                                      : COLOR.white,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.dropDownText,
                                  {
                                    color:
                                      sliderType == "shadow"
                                        ? COLOR.white
                                        : COLOR.black,
                                  },
                                ]}
                              >
                                Shadow
                              </Text>
                            </Pressable>
                            <Pressable
                              onPress={() =>
                                setSliderType(
                                  sliderType == "opacity" ? "" : "opacity"
                                )
                              }
                              style={[
                                styles.dropDownStyle,
                                styles.optionButton,
                                {
                                  borderColor:
                                    sliderType == "opacity"
                                      ? COLOR.blue
                                      : COLOR.grey,
                                  backgroundColor:
                                    sliderType == "opacity"
                                      ? COLOR.blue
                                      : COLOR.white,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.dropDownText,
                                  {
                                    color:
                                      sliderType == "opacity"
                                        ? COLOR.white
                                        : COLOR.grey,
                                  },
                                ]}
                              >
                                Opacity
                              </Text>
                              <Text
                                style={[
                                  styles.dropDownTextValue,
                                  {
                                    color:
                                      sliderType == "opacity"
                                        ? COLOR.white
                                        : COLOR.black,
                                  },
                                ]}
                              >
                                {!isNaN(
                                  Math.floor(
                                    fieldData[selected]?.style?.opacity
                                  )
                                )
                                  ? Math.floor(
                                      fieldData[selected]?.style?.opacity
                                    )
                                  : 100}
                              </Text>
                            </Pressable>
                          </View>
                        </ScrollView>
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
      {/* </TranslatorProvider> */}
      {/* </ImageBackground> */}
    </View>
  );
};

export default Home;
