import customReact from 'custom-react';
import ReduxContext from '../ReduxContext';

export function useDispatch() {
  // @ts-ignore
  const { store } = customReact.useContext(ReduxContext);
  return store.dispatch;
}
