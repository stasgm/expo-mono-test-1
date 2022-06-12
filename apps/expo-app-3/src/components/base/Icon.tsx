// eslint-disable-next-line no-restricted-imports
import { Icon, IconProps } from '@ui-kitten/components';

import { IconType } from '../../utils';

type Props = {
  name: IconType;
} & Omit<IconProps, 'name'>;

export default (props: Props) => <Icon {...props} />;
