import React from 'react'

function mock(offset = 0, limit = 5) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        Array.from(new Array(limit)).map((_, index) => {
          return {
            id: index + offset + 1,
            name: 'name' + (index + offset + 1)
          }
        })

      )
    }, 1000);
  })
}


function useRequest() {
  const [offset, setOffset] = React.useState(0)
  const [data, setData] = React.useState([])

  function loadMore() {
    // 设置为null
    setData(null)
    mock(offset).then(newData => {
      // 这里获取的还是原来的值，不是最新值
      setData([...data, ...newData])
      setOffset(offset + newData.length)
    })
  }

  React.useEffect(loadMore, [])

  return [data, loadMore]
}

function App() {
  const [data, loadMore] = useRequest()

  if (data === null) {
    return '加载更多'
  }

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.id}:{item.name}</li>
        ))}
      </ul>
      <button onClick={loadMore}>加载更多</button>
    </div>
  )
}

export default App