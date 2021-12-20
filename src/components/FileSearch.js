import React, { useRef, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress"

const FileSearch = (props) => {

  const [ value, setValue ] = useState('')

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  useEffect(() => {
    if(enterPressed) {
      props.onFileSearch(value)
    }
    if(escPressed) {
      searchRef.current.value = ''
      setValue('')
    }
  })

  return (
    <div className="d-flex">
      <div>
        <input onInput={(val) => {
          setValue(val.target.value)
        }} ref={searchRef}
        placeholder={props.title}
        className="m-2"></input>
      </div>
      <div>
        <button 
          className="btn btn-primary btn-sm m-2" 
          onClick={() => {
            props.onFileSearch(value)
          }}>搜索</button>
        <button 
        className="btn btn-outline-primary btn-sm bg-white"
        onClick={() => {
          searchRef.current.value = ''
          setValue('')
        }}>清空</button>
      </div>
    </div>
  )
}

// 类型检查
FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}

// 默认属性
FileSearch.defaultProps = {
  title: '请输入搜索内容...'
}

export { FileSearch } 

