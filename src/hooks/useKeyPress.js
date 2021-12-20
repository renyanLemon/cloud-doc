// 自定义hook：键盘事件
// 自定义hook本身就是一个function
import { useState, useEffect } from 'react'

const useKeyPress = (targetKeyCode) => {
  const [ keyPressed, setKeyPressed ] = useState(false) //键 有没有被按到

  //keyDown 与 keyUp 都要处理，如果只有keyDown，那么会造成状态无法改变
  const keyDownHandler = ({ keyCode }) => {
    if(keyCode === targetKeyCode) {
      setKeyPressed(true)
    }
  }

  const keyUpHandler = ({ keyCode }) => {
    if(keyCode === targetKeyCode) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return keyPressed
}

export default useKeyPress