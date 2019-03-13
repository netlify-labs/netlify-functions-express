import React from 'react'

const App = (props) => {
  const list = props.data.map((user) => {
    return (
      <li>{user.name}</li>
    )
  })

  return (
    <div>
      <h1 onClick={() => { console.log('hi') }}>
        This is SSR React!
      </h1>
      {list}
    </div>
  )
}

export default App
