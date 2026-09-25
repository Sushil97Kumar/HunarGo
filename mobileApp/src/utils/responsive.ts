import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const scale = (size: number) => Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);
export const verticalScale = (size: number) => Math.round((SCREEN_HEIGHT / BASE_HEIGHT) * size);
export const moderateScale = (size: number, factor: number = 0.5) => Math.round(size + (scale(size) - size) * factor);
export const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
