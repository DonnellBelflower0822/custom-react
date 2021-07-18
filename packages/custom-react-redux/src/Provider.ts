import CustomReact from 'custom-react';
import ReduxContext from './ReduxContext';

export default function Provider(props) {
  const { store } = props;
  return CustomReact.createElement(
    ReduxContext.Provider,
    {
      value: {
        store
      }
    },
    props.children
  );
}