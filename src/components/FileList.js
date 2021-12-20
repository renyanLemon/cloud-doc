import React, { useRef, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress"

const data = [{
  name: '文档名字1',
  id: 1,
  body: '简介1。。。',
  createdAt: '1'
},{
  name: '文档名字2',
  id: 2,
  body: '简介2。。。',
  createdAt: '2'
},{
  name: '文档名字3',
  id: 3,
  body: '简介3。。。',
  createdAt: '3'
}]

const FileList = () => {

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
      { data.map((item) => {
        return (
          currentIdEdit === item.id ? 
          <div key={item.id} className="list-group-item">
            <input defaultValue={item.name}></input>
            <button className="btn btn-success btn-sm m-2"
            onClick={() => {
              setCurrentIdEdit('')
            }}
            >保存</button>
            <button className="btn btn-outline-success btn-sm m-2"
            onClick={() => {
              setCurrentIdEdit('')
            }}
            >取消</button>
          </div> :
          <div key={item.id} 
               className="list-group-item">
            <span>{item.name}</span>
            <button className="btn btn-info btn-sm m-2" 
            onClick={() => {
              setCurrentIdEdit(item.id)
            }}>编辑</button>
            <button className="btn btn-outline-info btn-sm m-2"
            >删除</button>
          </div>
        )
      }) }
    </div>
  )
}

export { FileList }