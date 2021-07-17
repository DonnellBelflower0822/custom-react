import { DOM } from '../interface';
import { updateQueue } from '../react/Component';

export function addEvent(dom: DOM, type: string, listener: () => void) {
  // 将事件处理放到dom身上
  const store = dom.store || (dom.store = {});
  store[type] = listener;

  // 将事件挂载到document身上
  if (!document[type]) {
    document[type] = dispatchEvent;
  }
}

// 合成事件： 
// 是浏览器的原生事件的跨浏览器包装器。处理浏览器兼容问题
// 拥有和浏览器原生事件相同的接口
let syntheticEvent = {};

function createSyntheticEvent(event) {
  for (const key in event) {
    syntheticEvent[key] = event[key];
  }
}

function resetSyntheticEvent() {
  for (const key in syntheticEvent) {
    syntheticEvent[key] = event[key];
  }
}

// 同一处理事件触发
function dispatchEvent(e) {
  updateQueue.isBatchingUpdate = true;

  const { type } = e;
  let { target } = e;
  const eventType = `on${type}`;

  createSyntheticEvent(e);

  // 通过事件源递归向上找，模拟事件冒泡
  while (target) {
    const { store } = target;
    if (store?.[eventType]) {
      // 原生事件的this为undefined
      const listener = store[eventType];
      listener(syntheticEvent);
    }

    target = target.parentNode;
  }

  resetSyntheticEvent();

  updateQueue.batchUpdate();
}