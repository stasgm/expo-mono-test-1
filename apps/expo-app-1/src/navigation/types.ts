type AppStackParamList = {
  Home: undefined;
};

type MapStackParamList = {
  MapView: undefined;
};

type TodoStackParamList = {
  TodoList: undefined;
  TodoAdd: undefined;
  TodoEdit: { id: string };
};

export { AppStackParamList, MapStackParamList, TodoStackParamList };
