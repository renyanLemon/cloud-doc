import React, { useRef, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress"

import './FileList.scss'

const FileList = ({ files, onFileClick, onFileDelete, onSaveEdit}) => {

  const [ currentIdEdit, setCurrentIdEdit ] = useState('')

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  useEffect(() => {
    if(enterPressed) {
      setCurrentIdEdit('')
    }
    if(escPressed) {
      setCurrentIdEdit('')
    }
  })

  return (
    <div className="list-group">
      { files.map((item) => {
        return (
          currentIdEdit === item.id ? 
          <div key={item.id} className="list-group-item">
            <input defaultValue={item.title}></input>
            <button className="btn btn-success btn-sm m-2"
            onClick={() => {
              onSaveEdit(item.id, 999)
              setCurrentIdEdit('')
            }}
            >保存</button>
            <button className="btn btn-default btn-sm m-2"
            onClick={() => {
              setCurrentIdEdit('')
            }}
            >取消</button>
          </div> :
          <div key={item.id} 
               className="list-group-item">
            <span className="file-title"
            onClick={() =>{
              onFileClick(item.id)
            }}>{item.title}</span>
            <button className="btn btn-info btn-sm m-2" 
            onClick={() => {
              setCurrentIdEdit(item.id)
            }}>编辑</button>
            <button className="btn btn-default btn-sm m-2"
            onClick={() => {
              onFileDelete(item.id)
            }}>删除</button>
          </div>
        )
      }) }
    </div>
  )
}

export { FileList }