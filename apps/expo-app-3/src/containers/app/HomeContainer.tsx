import Home from '../../components/home/Home';

type Props = { onToggleDrawer: () => void };

const HomeContainer = ({ onToggleDrawer }: Props) => {
  return <Home onToggleDrawer={onToggleDrawer} />;
};

export default HomeContainer;
