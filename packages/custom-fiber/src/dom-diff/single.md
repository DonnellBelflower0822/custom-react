# dom-diff

> 老的fiber和新的jsx的对比，生成新的Fiber链表的过程

## 单节点

> 新旧节点的type和key一样才能复用。

### type不同(key的默认值为索引)
<div>
  <h1>h1</h1>
</div>

-------

<div>
  <h2>h1</h2>
</div>

> 提交操作

1. div.removeChild(h1)
2. div.removeChild(h2)

### type和key不同

<div>
  <h1 key='h1'>h1</h1>
</div>

-------

<div>
  <h2 key='h2'>h2</h2>
</div>

> 提交操作
1. div.removeChild(h1)
2. div.removeChild(h2)

### type和key不同

<div>
  <h1 key='h1'>h1</h1>
  <h2 key='h2'>h2</h2>
  <h3 key='h3'>h3</h3>
</div>

-------

<div>
  <h2 key='h2'>h2</h2>
</div>

> 提交操作
1. div.removeChild(h1)
2. div.removeChild(h3)  // 删除剩余节点


### type和key一样

<div>
  <h1 key='h1'>h1</h1>
</div>

-------

<div>
  <h1 key='h1'>h1 new</h1>
</div>

> 提交操作

1. 复用老节点和fiber
2. 属性对比，如果有变化，则会把fiber节点标记为更新

h1.innerHTML = 'h1-new'

### key一样，type不一样

<div>
  <h1 key='h1'>h1</h1>
  <h2 key='h2'>h2</h2>
</div>

-------

<div>
  <p key='h1'>p</p>
</div>

> 提交操作

1. 把老节点全部删除，
2. 插入新节点

div.removeChild(h1)
div.removeChild(h2)
div.appendChild(p)

## 多节点

- 两轮遍历
- 第一轮：处理更新情况：属性和类型type更新
- 第二轮：新增，删除，移动
- 位置高的不动，位置低的动

### key和type一样

<ul>
  <li key="A">A</li>
  <li key="B">B</li>
  <li key="C">C</li>
  <li key="D">D</li>
</ul>
--------
<ul>
  <li key="A">A-new</li>
  <li key="B">B-new</li>
  <li key="C">C-new</li>
  <li key="D">D-new</li>
</ul>

> 提交

1. 更新A
2. 更新B
3. 更新C
4. 更新D


### 22

<ul>
  <li key="A">A</li>
  <li key="B">B</li>
  <li key="C">C</li>
  <li key="D">D</li>
</ul>
--------
<ul>
  <div key="A">A-new</div>
  <li key="B">B-new</li>
  <li key="C">C-new</li>
  <li key="D">D-new</li>
</ul>

> 提交

0. 删除老的li-A
1. 插入div-A
2. 更新B
3. 更新C
4. 更新D

### 33

<ul>
  <li key="A">A</li>
  <li key="B">B</li>
  <li key="C">C</li>
  <li key="D">D</li>
  <li key="E">E</li>
  <li key="F">F</li>
</ul>
--------
<ul>
  <li key="A">A-new</li>
  <li key="C">C-new</li>
  <li key="E">E-new</li>
  <li key="B">B-new</li>
  <li key="G">G</li>
</ul>

> 提交

第一轮遍历，遇到key不一样，立即退出第一轮循环

1. 更新A

第二轮
// key为元素key，值是老fiber节点
const map = {B:B,C:C,D:D,E:E,F:F}

// 遍历新节点
C节点求map找。
如果找到，老的fiber和stateNode可以复用
把C标记更新

