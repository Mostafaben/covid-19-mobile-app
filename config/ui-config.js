import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const SPACING = 20;
const H1 = 24;
const H2 = 20;
const H3 = 18;
const SPAN = 14;

class Colors {
  static primary = '#034c81';
  static border = '';
  static darkGrey = '#707070';
  static dark = '#3C3C3C';
  static green = '#5AC7AA';
  static lightGrey = '#ddd';
}

export { Colors, SPACING, H1, H2, SPAN, width, height, H3 };
