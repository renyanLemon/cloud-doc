import React, { useRef, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress"

import './FileList.scss'

const FileList = ({ files, onFileClick, onFileDelete, onSaveEdit, onFileCancel, onFileEdit}) => {

  const [ changeList, setChangeList ] = useState({})
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  return (
    <div className="list-group">
      { files.map((item) => {
        return (
          item.isNew || item.isUpdate ? 
          <div key={item.id} className="list-group-item">
            <input defaultValue={item.title} 
            onChange={(event) => {
              let newChangeList = {...changeList}
              newChangeList[item.id] = event.target.value
              setChangeList(newChangeList)
              // onUpdateFileName(item.id, event.target.value)
            }} 
            placeholder="请输入文件名称"></input>
            <button className="btn btn-success btn-sm m-2"
            onClick={() => {
              onSaveEdit(item.id, changeList[item.id])
            }}
            >保存</button>
            <button className="btn btn-default btn-sm m-2"
            onClick={() => {
              onFileCancel(item)
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
              onFileEdit(item.id)
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