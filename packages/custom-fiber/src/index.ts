interface VDOM {
  type: string;
  key: string;
  props?: {
    children?: VDOM[];
  };
}

interface Fiber extends Omit<VDOM, 'props'> {
  tag: string;

  return?: Fiber;
  sibling?: Fiber;
  child?: Fiber;

  props?: {
    children: Fiber[] | VDOM[];
  };

  stateNode?: HTMLElement;

  flags?: string;

  firstEffect?: Fiber;
  lastEffect?: Fiber;
  nextEffect?: Fiber;
}

const FIBER_TAG = {
  // fiber根节点
  TAG_ROOT: 'TAG_ROOT',
  // 元素dom节点
  TAG_HOST: 'TAG_HOST',
};
const Placement = 'Placement';

// 虚拟dom
const vdom: VDOM = {
  type: 'div',
  key: 'A',
  props: {
    children: [
      {
        type: 'div',
        key: 'b1',
        props: {
          children: [
            {
              type: 'div',
              key: 'c1',
              props: { children: [] }
            }
          ]
        }
      },
      {
        type: 'div',
        key: 'b2',
        props: { children: [] }
      },
    ]
  }
};

const rootFiber: Fiber = {
  tag: FIBER_TAG.TAG_ROOT,
  type: vdom.type,
  key: 'ROOT',
  stateNode: document.getElementById('root'),
  props: {
    children: [vdom]
  }
};


let workInProgress: Fiber;

function workLoop() {
  while (workInProgress) {
    workInProgress = preformeUnitOfWork(workInProgress);
  }

  commitRoot(rootFiber);
}

function commitRoot(rootFiber: Fiber) {
  let currentEffect = rootFiber.firstEffect;

  while (currentEffect) {
    const { flags } = currentEffect;
    switch (flags) {
      case Placement:
        commitPlacment(currentEffect);
        break;

      default:
        break;
    }

    currentEffect = currentEffect.nextEffect;
  }
}

function commitPlacment(currentEffect: Fiber) {
  const parent = currentEffect.return.stateNode;
  parent.appendChild(currentEffect.stateNode);
}

// 执行工作单元
function preformeUnitOfWork(workInProgress: Fiber) {
  // 开始工作: 创建children的fiber
  beforeWork(workInProgress);

  if (workInProgress.child) {
    // 有大儿子，处理大儿子的儿子们
    return workInProgress.child;
  }

  // 处理workInProgress弟弟
  while (workInProgress) {
    // 如果没儿子，当前fiber结束
    completeUnitOfWork(workInProgress);

    // 有没有弟弟
    if (workInProgress.sibling) {
      return workInProgress.sibling;
    }

    // 找叔叔
    // 先workInProgress变成父亲
    workInProgress = workInProgress.return;
  }
}

// 没儿子就结束工作单元
function completeUnitOfWork(workInProgress: Fiber) {
  console.log('completeUnitOfWork', workInProgress.key);

  // 真实DOM
  let stateNode;

  switch (workInProgress.tag) {
    case FIBER_TAG.TAG_HOST:
      stateNode = createStateNode(workInProgress);
      break;

    default:
      break;
  }

  // 在完成工作单元，判断当前的fiber节点有没有对应dom操作
  makeEffectList(workInProgress);
}

/**
 * 副作用列表
 * 包含有副作用的fiber节点：需要增删改的节点
 * 对于初次渲染是全部节点
 * @param completeWork 
 */
function makeEffectList(completeWork: Fiber) {
  let returnFiber = completeWork.return;

  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = completeWork.firstEffect;
    }

    if (completeWork.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork.firstEffect;
      }

      returnFiber.lastEffect = completeWork.lastEffect;
    }

    if (completeWork.flags) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork;
      } else {
        returnFiber.firstEffect = completeWork;
      }

      returnFiber.lastEffect = completeWork;
    }
  }

}

function createStateNode(workInProgress: Fiber) {
  if (workInProgress.tag === FIBER_TAG.TAG_HOST) {
    const stateNode = document.createElement(workInProgress.type);
    workInProgress.stateNode = stateNode;
  }

  return workInProgress.stateNode;
}

function beforeWork(workInProgress: Fiber) {
  console.log('workInProgress', workInProgress.key);
  const vdomChildren = workInProgress.props.children;

  // 先生出儿子
  return reconcileChildren(workInProgress, vdomChildren);
}

function reconcileChildren(returnFiber: Fiber, vdomChildren: VDOM[]) {
  let firstFiber: Fiber;
  let previousFiber: Fiber;

  for (let i = 0; i < vdomChildren.length; i += 1) {
    const currentFiber = createFiber(vdomChildren[i]);

    // 新节点，需要插入
    currentFiber.flags = Placement;

    currentFiber.return = returnFiber;

    if (!firstFiber) {
      firstFiber = currentFiber;
    } else {
      previousFiber.sibling = currentFiber;
    }

    previousFiber = currentFiber;
  }

  // 父fiber 的child指向 大儿子fiber
  returnFiber.child = firstFiber;

  // 构建后返回大儿子
  return firstFiber;
}

function createFiber(vdom: VDOM): Fiber {
  return {
    // 原生dom节点
    tag: FIBER_TAG.TAG_HOST,
    // 虚拟dom
    type: vdom.type,
    key: vdom.key,
    props: vdom.props
  } as Fiber;
}

// 当前执行工作单元
workInProgress = rootFiber;
workLoop();
