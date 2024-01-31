import * as Font from 'expo-font';

export const Fonts = {
    DancingScriptBold: require('../assets/fonts/DancingScript-Bold.ttf'),
    DancingScriptMedium: require('../assets/fonts/DancingScript-Medium.ttf'),
    DancingScriptRegular: require('../assets/fonts/DancingScript-Regular.ttf'),
    DancingScriptSemiBold: require('../assets/fonts/DancingScript-SemiBold.ttf'),

    EBGaramondBold: require('../assets/fonts/EBGaramond-Bold.ttf'),
    EBGaramondBoldItalic: require('../assets/fonts/EBGaramond-BoldItalic.ttf'),
    EBGaramondExtraBold: require('../assets/fonts/EBGaramond-ExtraBold.ttf'),
    // Add more fonts as needed...

    InconsolataBlack: require('../assets/fonts/Inconsolata-Black.ttf'),
    InconsolataBold: require('../assets/fonts/Inconsolata-Bold.ttf'),
    InconsolataExtraBold: require('../assets/fonts/Inconsolata-ExtraBold.ttf'),
    // Add more fonts...

    LoraBold: require('../assets/fonts/Lora-Bold.ttf'),
    LoraBoldItalic: require('../assets/fonts/Lora-BoldItalic.ttf'),
    LoraItalic: require('../assets/fonts/Lora-Italic.ttf'),
    // Add more fonts...

    PlayfairDisplayBlack: require('../assets/fonts/PlayfairDisplay-Black.ttf'),
    PlayfairDisplayBlackItalic: require('../assets/fonts/PlayfairDisplay-BlackItalic.ttf'),
}

export const loadFonts = async () => {
    await Font.loadAsync(Fonts);
  };
  