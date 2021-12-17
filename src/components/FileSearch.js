import React, { useRef, useState, useEffect } from "react"
import PropTypes from 'prop-types'

const FileSearch = (props) => {
  const [ value, setValue ] = useState('')
  const searchRef = useRef(null)
  useEffect(() => {
    searchRef.current.focus()
  }, [])

  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keyCode } = event
      if(keyCode === 13) {
        props.onFileSearch(value)
      }else if(keyCode === 27) {
        searchRef.current.value = ''
        setValue('')
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup',handleInputEvent)
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
        className="btn btn-default btn-sm bg-white"
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

