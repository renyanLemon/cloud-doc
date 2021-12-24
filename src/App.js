import React, { useState } from 'react';

import { FileSearch } from './components/FileSearch'
import { FileList } from './components/FileList'
import { TabList } from './components/TabList'
import SimpleMDE from "react-simplemde-editor";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css";

const data = [{
  title: '文档名字11',
  id: 1,
  body: '简介11。。。',
  createdAt: '11'
},{
  title: '文档名字22',
  id: 2,
  body: '## 简介22。。。',
  createdAt: '22'
},{
  title: '文档名字3',
  id: 3,
  body: '简介3。。。',
  createdAt: '3'
}]

function App() {

  const [ files, setFiles ] = useState(data)
  const [ activeFileID, setActiveFileID ] = useState('')
  const [ openedFileIDs, setOpenedFileIDs ] = useState([])
  const [ unsavedFileIDs, setUnsavedFileIDs ] = useState([])
  const [ searchedFiles, setSearchedFiles ] = useState([])

  // 能计算出来，就不要放 state 里面
  //计算所有打开的文件
  const openedFiles = openedFileIDs.map( openID => {
    return files.find(file => file.id === openID)
  })

  //计算当前激活的文件
  const activeFile = files.find( file => file.id === activeFileID)

  //点击打开文件
  const fileClick = (fileID) => {
    //设置当前点击的文件高亮
    setActiveFileID(fileID)
    //如果当前点击的文件没有打开，点击该文件打开
    if(!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }

  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }

  const tabClose = (id) => {
    const tabsWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabsWithout)
    if(tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0])
    }else {
      setActiveFileID('')
    }
  }

  const fileChange = (id, value) => {
    const newFiles = files.map(file => {
      if(file.id === id) {
        file.body = value
      }
      return file
    })
    setFiles(newFiles)
    if(!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const deleteFile = (id) => {
    const newFiles = files.filter(file => file.id !== id)
    setFiles(newFiles)
    //如果当前删除的文件已经打开，删除打开的文件
    tabClose(id)
  }

  const updateFileName = ( id, title ) => {
    const newFiles = files.map( file => {
      if(file.id === id) {
        file.title = title
      }
      return file
    })
    setFiles(newFiles)
  }

  const fileSearch = (keyword) => {
    const newFiles = files.filter( file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }

  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : files
  

  return (
    <div className="App container-fluid">

        <div className='left-page bg-light left-panel left-panel-box'>
          <div className='left-panel-content'>
            <h2 className='m-3'>我的云文档</h2>
            <FileSearch
            title='搜索文档...'
            onFileSearch={fileSearch}
            ></FileSearch>

            <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
            ></FileList>

          </div>
          <div className='left-panel-footer'>
            <button className='m-2 btn btn-dark'>新建</button>
            <button className='m-2 btn btn-dark'>导入</button>
            <button type="button" 
              class="m-2 btn btn-dark" 
              data-bs-toggle="tooltip" 
              data-bs-placement="top" 
              title="将本地md文件批量转换成html">
                批量转换
              </button>
          </div>
        </div>

        <div className='right-page right-panel'>
          { !activeFile && 
            <div className='start-page'>
              选择或创建新的 Markdown 文档
            </div>
          }
          { activeFile &&
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              >
              </TabList>
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {fileChange(activeFile.id, value)}}
                options={{
                  minHeight: '600px'
                }}
              />
            </>
          }
          
        </div>

    </div>
  );
}

export default App;
