import counter1 from './count1.js';
import counter2 from './count2.js';

const { combineReduers } = CustomRedux

const rootReducer = combineReduers({
  counter1,
  counter2
})

export default rootReducer
