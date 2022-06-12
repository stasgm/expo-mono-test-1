import { OutputTable, Text, View } from '../../components/base';

type Props = { setShareMessage: (message: string) => void };

export default ({ setShareMessage }: Props) => {
  const data: any[] = [];

  const infoText = "You're just getting started:" + setShareMessage('Hello');

  return (
    <>
      <OutputTable data={data} />
      <View flex center>
        <Text category="h6" center>
          {infoText}
        </Text>
      </View>
    </>
  );
};
