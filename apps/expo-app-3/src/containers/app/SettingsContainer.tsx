/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Settings, { BooleanSettingProp, ButtonProp, HeaderProp, SelectSettingProp } from '../../components/app/Settings';
import { PickerOption } from '../../components/base';
// import { reset, resetGame, setAppSetting } from '../../redux/actions';
// import { useSettings } from '../../redux/selectors';
// import { useAppDispatch } from '../../redux/store';
import { alert, AppSetting, FontSize, IconsOutlined, IconType, SettingsState } from '../../utils';

const numberOpts = <T extends number>(...arr: T[]): PickerOption<T>[] =>
  arr.map((value) => ({ label: `${value}`, value }));

const makeButton = (
  label: string,
  onPress: () => void,
  disabled: boolean,
  icon: IconType,
  title: string,
  description?: string,
): ButtonProp => ({
  label,
  onPress,
  disabled,
  icon,
  title,
  description,
  type: 'button',
});

const makeHeader = (title: string): HeaderProp => ({ title, type: 'header' });

type Props = {
  onToggleDrawer: () => void;
};

const SettingsContainer = ({ onToggleDrawer }: Props) => {
  // const settings = useSettings();
  // const dispatch = useAppDispatch();
  // const isStarted = false;

  // const saveChange = (setting: Parameters<typeof setAppSetting>[0], resetsGame = false) => {
  //   if (resetsGame && isStarted) {
  //     alert('Are you sure?', 'This will reset your current game', [
  //       {
  //         text: 'Reset it',
  //         style: 'destructive',
  //         onPress: () => {
  //           dispatch(setAppSetting(setting));
  //           dispatch(resetGame());
  //         },
  //       },
  //     ]);
  //   } else {
  //     dispatch(setAppSetting(setting));
  //   }
  // };

  const makeDifficultyOptions = () => {
    const onPressDifficulty = (difficulty: number) => () => {
      // const settingsToUpdate = [EASY_GAME_SETTINGS, MEDIUM_GAME_SETTINGS, HARD_GAME_SETTING][difficulty];
      // saveChange(settingsToUpdate, true);
    };

    return ['Easy', 'Medium', 'Hard'].map((text, i) => ({
      text,
      onPress: onPressDifficulty(i),
    }));
  };

  const makeBoolean = (
    setting: AppSetting,
    icon: IconType,
    title: string,
    description?: string,
  ): BooleanSettingProp => {
    // const state = settings[setting] as boolean;
    // const onToggle = () => saveChange({ [setting]: !state });
    const state = false as any;
    const onToggle = () => {};
    return { state, onToggle, icon, title, description, type: 'boolean' };
  };

  const makeSelect = <T extends AppSetting>(
    setting: T,
    options: PickerOption<SettingsState[T]>[],
    icon: IconType,
    title: string,
    description?: string,
    requiresReset = false,
    btns = false,
  ): SelectSettingProp<SettingsState[T]> => {
    const type = 'select';
    // const value = settings[setting];
    const value = '' as any;
    // const onSelect = (selected: SettingsState[T]) => saveChange({ [setting]: selected }, requiresReset);
    const onSelect = (selected: SettingsState[T]) => {};
    return { value, options, onSelect, icon, title, description, type, btns };
  };

  const gutters = makeBoolean(
    AppSetting.SHOW_GUTTERS,
    IconsOutlined.grid,
    'Wrapped Gutters',
    'Show wrapped characters to the left and right',
  );

  const gridLines = makeBoolean(
    AppSetting.VERTICAL_GRID_LINES,
    IconsOutlined.options,
    'Show Gridlines',
    'Show vertical grid lines',
  );

  const fontSize = makeSelect(
    AppSetting.FONT_SIZE,
    [
      { label: 'Smaller', value: FontSize.Small },
      { label: 'Larger', value: FontSize.Large },
    ],
    IconsOutlined.text,
    'Font Size',
    undefined,
    false,
    true,
  );

  const startOver = makeButton(
    'Start Over',
    () =>
      alert('Are you sure?', "You'll lose all your stats and game progress.", [
        {
          text: 'Reset',
          style: 'destructive',
          // onPress: () => dispatch(reset()),
        },
      ]),
    false,
    IconsOutlined.trash2,
    'Reset App',
    'Seeing something buggy? Want a fresh start?',
  );

  const preset = makeButton(
    'Choose Difficulty',
    () => {
      alert(
        'Choose Difficulty',
        'This will overwrite any game customizations you already made',
        makeDifficultyOptions(),
      );
    },
    false,
    IconsOutlined.bulb,
    'Use a Preset',
    "We'll choose for you",
  );

  const autoDetectWords = makeBoolean(
    AppSetting.AUTOMATIC_WORD_FIND,
    IconsOutlined.search,
    'Detect Words',
    'Automatically search for words horizontally and vertically after each drop',
  );
  const diagonal = makeBoolean(
    AppSetting.ALLOW_DIAGONAL,
    IconsOutlined.expand,
    'Allow Diagonal',
    'Allow connecting characters diagonally',
  );
  // makeBoolean(
  //   AppSetting.ANIMATIONS_ENABLED,
  //   IconsOutlined.activity,
  //   'Animations',
  //   'Do you like things to move around?'
  // ),
  const rowWidth = makeSelect(
    AppSetting.ROW_WIDTH,
    numberOpts(5, 6, 7, 8, 9, 10),
    IconsOutlined.hash,
    'Game Width',
    'Number of characters per row',
    true,
  );
  const newCharCount = makeSelect(
    AppSetting.NEW_CHAR_COUNT,
    numberOpts(2, 3, 4),
    IconsOutlined.download,
    'Incoming Character Width',
    'Size of incoming characters',
    true,
  );
  const minWordLength = makeSelect(
    AppSetting.MIN_WORD_LETTER_COUNT,
    numberOpts(3, 4, 5),
    IconsOutlined.book,
    'Word Character Count',
    'Valid words must be at least this many letters',
  );
  const numRows = makeSelect(
    AppSetting.NUM_ROWS,
    numberOpts(6, 9, 12),
    IconsOutlined.menu,
    'Game Height',
    'Number of rows (more is easier)',
  );
  // makeButton(
  //   'Reset',
  //   () => dispatch(resetWalkthrough()),
  //   !hasTrippedAnyFYI,
  //   IconsOutlined.refresh,
  //   'Reset Walkthrough',
  //   'Reenable all those handy "FYI" tips'
  // ),
  // makeBoolean(
  //   AppSetting.SKIA_ENABLED,
  //   IconsOutlined.bulb,
  //   'Beta Renderer',
  //   "Do you like to use things before they're tried and true?"
  // ),

  const items = [
    makeHeader('Display'),
    gutters,
    gridLines,
    fontSize,

    makeHeader('App'),
    startOver,

    makeHeader('Game'),
    preset,
    autoDetectWords,
    diagonal,
    rowWidth,
    newCharCount,
    minWordLength,
    numRows,
  ];

  return <Settings settings={items} onToggleDrawer={onToggleDrawer} />;
};

export default SettingsContainer;
