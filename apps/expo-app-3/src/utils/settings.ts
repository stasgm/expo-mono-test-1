import { AppSetting, SettingsState } from './types';

export const EASY_GAME_SETTINGS: Partial<SettingsState> = {
  [AppSetting.AUTOMATIC_WORD_FIND]: false,
  [AppSetting.ALLOW_DIAGONAL]: true,
  [AppSetting.ROW_WIDTH]: 9,
  [AppSetting.NEW_CHAR_COUNT]: 2,
  [AppSetting.MIN_WORD_LETTER_COUNT]: 3,
  [AppSetting.NUM_ROWS]: 12,
} as const;

export const MEDIUM_GAME_SETTINGS = {
  [AppSetting.AUTOMATIC_WORD_FIND]: false,
  [AppSetting.ALLOW_DIAGONAL]: true,
  [AppSetting.ROW_WIDTH]: 7,
  [AppSetting.NEW_CHAR_COUNT]: 3,
  [AppSetting.MIN_WORD_LETTER_COUNT]: 4,
  [AppSetting.NUM_ROWS]: 9,
} as const;

export const HARD_GAME_SETTING = {
  [AppSetting.AUTOMATIC_WORD_FIND]: false,
  [AppSetting.ALLOW_DIAGONAL]: false,
  [AppSetting.ROW_WIDTH]: 5,
  [AppSetting.NEW_CHAR_COUNT]: 4,
  [AppSetting.MIN_WORD_LETTER_COUNT]: 4,
  [AppSetting.NUM_ROWS]: 6,
} as const;
