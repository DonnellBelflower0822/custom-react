import store from './store';
import { Provider } from 'react-redux';
import Counter1 from './counter1'
import Counter2 from './counter2'

export default function Root() {
  return (
    <Provider store={store}>
      <Counter1 />
      <Counter2 />
    </Provider>
  )
}

