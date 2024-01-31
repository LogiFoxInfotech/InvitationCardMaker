import { Dimensions, Platform } from "react-native";

export const { width: SCREEN_WIDTH, height : SCREEN_HEIGHT} = Dimensions.get('window')

import { Fonts } from "./useFonts";

const fontFamilyArray = [{
  label: "Normal", value: 'Normal'}, 
  ...Object.keys(Fonts).map(item => ({
    label: item,
    value: item,
  }))
];

export const isWeb = Platform.OS === 'web'

const guidelineBaseWidth = 375;

export const horizontalScale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

export const moderateScale = (size: number, factor = 0.5) => {
    return size + (horizontalScale(size) - size) * factor;
};
  
const alignArray = [
  {label: 'left', value: 'left'},
  {label: 'center', value: 'center'},
  {label: 'right', value: 'right'},
];

// Bold, Underline, Italic, Capital, Small
const fontDefulteStyle = {
  fontWeight: '400',
  fontStyle: 'normal',
  textDecorationLine: 'none',
  textTransform: 'none',
};

const fontStyleArray = [
  {label: 'Normal', value: 'Normal', style: {fontWeight: '', textTransform: ''}},
  {label: 'Bold', value: 'Bold', style: {fontWeight: 'bold'}},
  {
    label: 'Underline',
    value: 'Underline',
    style: {textDecorationLine: 'underline'},
  },
  {label: 'Italic', value: 'Italic', style: {fontStyle: 'italic'}},
  {label: 'Capital', value: 'Capital', style: {textTransform: 'uppercase'}},
  {label: 'Small', value: 'Small', style: {textTransform: 'lowercase'}},
  {label: 'Title', value: 'Title', style: {textTransform: 'capitalize'}},
];
const languageArray = [
  {label: 'af', value: 'af'},
  {label: 'ga', value: 'ga'},
  {label: 'sq', value: 'sq'},
  {label: 'it', value: 'it'},
  {label: 'ar', value: 'ar'},
  {label: 'ja', value: 'ja'},
  {label: 'az', value: 'az'},
  {label: 'kn', value: 'kn'},
  {label: 'eu', value: 'eu'},
  {label: 'ko', value: 'ko'},
  {label: 'bn', value: 'bn'},
  {label: 'la', value: 'la'},
  {label: 'be', value: 'be'},
  {label: 'lv', value: 'lv'},
  {label: 'bg', value: 'bg'},
  {label: 'lt', value: 'lt'},
  {label: 'ca', value: 'ca'},
  {label: 'mk', value: 'mk'},
  {label: 'zh-CN', value: 'zh-CN'},
  {label: 'ms', value: 'ms'},
  {label: 'zh-TW', value: 'zh-TW'},
  {label: 'mt', value: 'mt'},
  {label: 'hr', value: 'hr'},
  {label: 'no', value: 'no'},
  {label: 'cs', value: 'cs'},
  {label: 'fa', value: 'fa'},
  {label: 'da', value: 'da'},
  {label: 'pl', value: 'pl'},
  {label: 'nl', value: 'nl'},
  {label: 'pt', value: 'pt'},
  {label: 'en', value: 'en'},
  {label: 'ro', value: 'ro'},
  {label: 'eo', value: 'eo'},
  {label: 'ru', value: 'ru'},
  {label: 'et', value: 'et'},
  {label: 'sr', value: 'sr'},
  {label: 'tl', value: 'tl'},
  {label: 'sk', value: 'sk'},
  {label: 'fi', value: 'fi'},
  {label: 'sl', value: 'sl'},
  {label: 'fr', value: 'fr'},
  {label: 'es', value: 'es'},
  {label: 'gl', value: 'gl'},
  {label: 'sw', value: 'sw'},
  {label: 'ka', value: 'ka'},
  {label: 'sv', value: 'sv'},
  {label: 'de', value: 'de'},
  {label: 'ta', value: 'ta'},
  {label: 'el', value: 'el'},
  {label: 'te', value: 'te'},
  {label: 'gu', value: 'gu'},
  {label: 'th', value: 'th'},
  {label: 'ht', value: 'ht'},
  {label: 'tr', value: 'tr'},
  {label: 'iw', value: 'iw'},
  {label: 'uk', value: 'uk'},
  {label: 'hi', value: 'hi'},
  {label: 'ur', value: 'ur'},
  {label: 'hu', value: 'hu'},
  {label: 'vi', value: 'vi'},
  {label: 'is', value: 'is'},
  {label: 'cy', value: 'cy'},
  {label: 'id', value: 'id'},
  {label: 'yi', value: 'yi'},
];

const colorArray = [
  {label: 'aliceblue', value: 'aliceblue'},
  {label: 'antiquewhite', value: 'antiquewhite'},
  {label: 'aqua', value: 'aqua'},
  {label: 'aquamarine', value: 'aquamarine'},
  {label: 'azure', value: 'azure'},
  {label: 'beige', value: 'beige'},
  {label: 'bisque', value: 'bisque'},
  {label: 'black', value: 'black'},
  {label: 'blanchedalmond', value: 'blanchedalmond'},
  {label: 'blue', value: 'blue'},
  {label: 'blueviolet', value: 'blueviolet'},
  {label: 'brown', value: 'brown'},
  {label: 'burlywood', value: 'burlywood'},
  {label: 'cadetblue', value: 'cadetblue'},
  {label: 'chartreuse', value: 'chartreuse'},
  {label: 'chocolate', value: 'chocolate'},
  {label: 'coral', value: 'coral'},
  {label: 'cornflowerblue', value: 'cornflowerblue'},
  {label: 'cornsilk', value: 'cornsilk'},
  {label: 'crimson', value: 'crimson'},
  {label: 'cyan', value: 'cyan'},
  {label: 'darkblue', value: 'darkblue'},
  {label: 'darkcyan', value: 'darkcyan'},
  {label: 'darkgoldenrod', value: 'darkgoldenrod'},
  {label: 'darkgray', value: 'darkgray'},
  {label: 'darkgreen', value: 'darkgreen'},
  {label: 'darkgrey', value: 'darkgrey'},
  {label: 'darkkhaki', value: 'darkkhaki'},
  {label: 'darkmagenta', value: 'darkmagenta'},
  {label: 'darkolivegreen', value: 'darkolivegreen'},
  {label: 'darkorange', value: 'darkorange'},
  {label: 'darkorchid', value: 'darkorchid'},
  {label: 'darkred', value: 'darkred'},
  {label: 'darksalmon', value: 'darksalmon'},
  {label: 'darkseagreen', value: 'darkseagreen'},
  {label: 'darkslateblue', value: 'darkslateblue'},
  {label: 'darkslategray', value: 'darkslategray'},
  {label: 'darkslategrey', value: 'darkslategrey'},
  {label: 'darkturquoise', value: 'darkturquoise'},
  {label: 'darkviolet', value: 'darkviolet'},
  {label: 'deeppink', value: 'deeppink'},
  {label: 'deepskyblue', value: 'deepskyblue'},
  {label: 'dimgray', value: 'dimgray'},
  {label: 'dimgrey', value: 'dimgrey'},
  {label: 'dodgerblue', value: 'dodgerblue'},
  {label: 'firebrick', value: 'firebrick'},
  {label: 'floralwhite', value: 'floralwhite'},
  {label: 'forestgreen', value: 'forestgreen'},
  {label: 'fuchsia', value: 'fuchsia'},
  {label: 'gainsboro', value: 'gainsboro'},
  {label: 'ghostwhite', value: 'ghostwhite'},
  {label: 'gold', value: 'gold'},
  {label: 'goldenrod', value: 'goldenrod'},
  {label: 'gray', value: 'gray'},
  {label: 'green', value: 'green'},
  {label: 'greenyellow', value: 'greenyellow'},
  {label: 'grey', value: 'grey'},
  {label: 'honeydew', value: 'honeydew'},
  {label: 'hotpink', value: 'hotpink'},
  {label: 'indianred', value: 'indianred'},
  {label: 'indigo', value: 'indigo'},
  {label: 'ivory', value: 'ivory'},
  {label: 'khaki', value: 'khaki'},
  {label: 'lavender', value: 'lavender'},
  {label: 'lavenderblush', value: 'lavenderblush'},
  {label: 'lawngreen', value: 'lawngreen'},
  {label: 'lemonchiffon', value: 'lemonchiffon'},
  {label: 'lightblue', value: 'lightblue'},
  {label: 'lightcoral', value: 'lightcoral'},
  {label: 'lightcyan', value: 'lightcyan'},
  {label: 'lightgoldenrodyellow', value: 'lightgoldenrodyellow'},
  {label: 'lightgray', value: 'lightgray'},
  {label: 'lightgreen', value: 'lightgreen'},
  {label: 'lightgrey', value: 'lightgrey'},
  {label: 'lightpink', value: 'lightpink'},
  {label: 'lightsalmon', value: 'lightsalmon'},
  {label: 'lightseagreen', value: 'lightseagreen'},
  {label: 'lightskyblue', value: 'lightskyblue'},
  {label: 'lightslategray', value: 'lightslategray'},
  {label: 'lightslategrey', value: 'lightslategrey'},
  {label: 'lightsteelblue', value: 'lightsteelblue'},
  {label: 'lightyellow', value: 'lightyellow'},
  {label: 'lime', value: 'lime'},
  {label: 'limegreen', value: 'limegreen'},
  {label: 'linen', value: 'linen'},
  {label: 'magenta', value: 'magenta'},
  {label: 'maroon', value: 'maroon'},
  {label: 'mediumaquamarine', value: 'mediumaquamarine'},
  {label: 'mediumblue', value: 'mediumblue'},
  {label: 'mediumorchid', value: 'mediumorchid'},
  {label: 'mediumpurple', value: 'mediumpurple'},
  {label: 'mediumseagreen', value: 'mediumseagreen'},
  {label: 'mediumslateblue', value: 'mediumslateblue'},
  {label: 'mediumspringgreen', value: 'mediumspringgreen'},
  {label: 'mediumturquoise', value: 'mediumturquoise'},
  {label: 'mediumvioletred', value: 'mediumvioletred'},
  {label: 'midnightblue', value: 'midnightblue'},
  {label: 'mintcream', value: 'mintcream'},
  {label: 'mistyrose', value: 'mistyrose'},
  {label: 'moccasin', value: 'moccasin'},
  {label: 'navajowhite', value: 'navajowhite'},
  {label: 'navy', value: 'navy'},
  {label: 'oldlace', value: 'oldlace'},
  {label: 'olive', value: 'olive'},
  {label: 'olivedrab', value: 'olivedrab'},
  {label: 'orange', value: 'orange'},
  {label: 'orangered', value: 'orangered'},
  {label: 'orchid', value: 'orchid'},
  {label: 'palegoldenrod', value: 'palegoldenrod'},
  {label: 'palegreen', value: 'palegreen'},
  {label: 'paleturquoise', value: 'paleturquoise'},
  {label: 'palevioletred', value: 'palevioletred'},
  {label: 'papayawhip', value: 'papayawhip'},
  {label: 'peachpuff', value: 'peachpuff'},
  {label: 'peru', value: 'peru'},
  {label: 'pink', value: 'pink'},
  {label: 'plum', value: 'plum'},
  {label: 'powderblue', value: 'powderblue'},
  {label: 'purple', value: 'purple'},
  {label: 'red', value: 'red'},
  {label: 'rosybrown', value: 'rosybrown'},
  {label: 'royalblue', value: 'royalblue'},
  {label: 'saddlebrown', value: 'saddlebrown'},
  {label: 'salmon', value: 'salmon'},
  {label: 'sandybrown', value: 'sandybrown'},
  {label: 'seagreen', value: 'seagreen'},
  {label: 'seashell', value: 'seashell'},
  {label: 'sienna', value: 'sienna'},
  {label: 'silver', value: 'silver'},
  {label: 'skyblue', value: 'skyblue'},
  {label: 'slateblue', value: 'slateblue'},
  {label: 'slategray', value: 'slategray'},
  {label: 'slategrey', value: 'slategrey'},
  {label: 'snow', value: 'snow'},
  {label: 'springgreen', value: 'springgreen'},
  {label: 'steelblue', value: 'steelblue'},
  {label: 'tan', value: 'tan'},
  {label: 'teal', value: 'teal'},
  {label: 'thistle', value: 'thistle'},
  {label: 'tomato', value: 'tomato'},
  {label: 'turquoise', value: 'turquoise'},
  {label: 'violet', value: 'violet'},
  {label: 'wheat', value: 'wheat'},
  {label: 'white', value: 'white'},
  {label: 'whitesmoke', value: 'whitesmoke'},
  {label: 'yellow', value: 'yellow'},
  {label: 'yellowgreen', value: 'yellowgreen'},
];

const getFountArray = () => {
  const data = [];
  for (let index = 0; index < 30; index++) {
    data.push({label: (index + 1).toString(), value: index + 1});
  }
  return data;
};

const getLetterSpacingArray = () => {
  const data = [];
  for (let index = 0; index <= 30; index++) {
    data.push({label: (index).toString(), value: index});
  }
  return data;
};

const getOpacityArray = () => {
  const data = [];
  for (let index = 0; index <= 100; index += 5) {
    data.push({label: index.toString(), value: index});
  }
  return data;
};

const birthdaySticker = "data:image/jpeg;base64,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"

const birthdaySticker1 = "data:image/jpeg;base64,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"
const birthdaySticker2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZm2Oa2SYhFBrTA98ImJWpJw-laWwG2UCpMSUx73110Q&s"

const Sticker = [
  birthdaySticker,
  birthdaySticker1,
  birthdaySticker2,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhFvcIZPXYzgYua0SnaR9rw7rUeXPMlfKXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQi-o5mc-y2mJfTekzA05oixoddQ2i7f5LQ&usqp=CAU',
];

export {
  fontFamilyArray,
  colorArray,
  getFountArray,
  getLetterSpacingArray,
  alignArray,
  Sticker,
  getOpacityArray,
  fontStyleArray,
  fontDefulteStyle,
  languageArray,
};
