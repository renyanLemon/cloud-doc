import React, { useState } from 'react';

import { FileSearch } from './components/FileSearch'
import { FileList } from './components/FileList'
import { TabList } from './components/TabList'
import SimpleMDE from "react-simplemde-editor";
import { v4 as uuidv4 } from 'uuid';
import fileHelper from './utils/fileHelper';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css";

const { join } = window.require('path')
const { BrowserWindow, app } = window.require('@electron/remote')

const Store = window.require('electron-store')
const fileStore = new Store({'name': 'Files Data'})

function App() {
  // fileStore.set('files', [])
  const fileLists = fileStore.get('files') || []
  const [ files, setFiles ] = useState(fileLists)
  const [ activeFileID, setActiveFileID ] = useState('')
  const [ openedFileIDs, setOpenedFileIDs ] = useState([])
  const [ unsavedFileIDs, setUnsavedFileIDs ] = useState([])
  const [ searchedFiles, setSearchedFiles ] = useState([])
  const savedLocation = app.getPath('documents')

  //能计算出来，就不要放 state 里面
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

  //新建文件
  const createNewFile = () => {
    const newFiles = [
      ...files,
      {
        id: uuidv4(),
        title: '',
        body: '## 请输入 Markdown',
        createdAt: new Date().getTime(),
        isNew: true,
        isUpdate: false,
      }
    ]
    setFiles(newFiles)
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
    console.log(777,files)
    const newFiles = files.reduce((result, item) => {
      if(item.id === id) {
        fileHelper.deleteFile(item.path).then(() => {})
        console.log(9998,result,item)
        return result || []
      }else {
        console.log(999,result,item)
        return result.push(item)
      }
    }, [])
    // setFiles(newFiles)
    // fileStore.set('files', newFiles)
    // console.log(999, fileStore.get('files'));
    //如果当前删除的文件已经打开，删除打开的文件
    // tabClose(id)
  }

  const cancelFile = (param) => {
    let newFiles
    if(param.isUpdate) {
      newFiles = files.map(item => {
        if(item.id === param.id) {
          item.isUpdate = false
        }
        return item
      })
    }else {
      newFiles = files.filter(file => file.id !== param.id)
    }
    setFiles(newFiles)
  }

  const fileEdit = ( id ) => {
    const newFiles = files.map( file => {
      if(file.id === id) {
        file.isUpdate = true
      }
      return file
    })
    setFiles(newFiles)
  }

  const saveFileName = (id, title) => {
    const objFile = {
      id: id,
      title: title,
      path: join(savedLocation, `${title}.md`)
    }
    let storeFiles = fileStore.get('files')
    const newFiles = files.map( file => {
      if(file.id === id) {
        if(file.isNew) {
          file.isNew = false
          fileHelper.writeFile(join(savedLocation, `${title}.md`), file.body).then(() => {
            fileStore.set('files', [...storeFiles, objFile])
            setFiles([...storeFiles, objFile])
            console.log(888, fileStore.get('files'));
          })
        }else {
          file.isUpdate = false
          fileHelper.renameFile(join(savedLocation, `${file.title}.md`), join(savedLocation, `${title}.md`)).then(() => {
            const newFiles = storeFiles.map(item => {
              if(item.id === id) {
                item = {...objFile}
              }
              return item
            })
            fileStore.set('files', newFiles)
            setFiles(newFiles)
            console.log(999, fileStore.get('files'));
          })
        }
      }
      return file
    })
    
  }

  const fileSearch = (keyword) => {
    const newFiles = files.filter( file => file.title.includes(keyword))
    console.log(888111, keyword, files, newFiles)
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
            onSaveEdit={saveFileName}
            onFileCancel={cancelFile}
            onFileEdit={fileEdit}
            ></FileList>

          </div>
          <div className='left-panel-footer'>
            <button 
            onClick={createNewFile}
            className='m-2 btn btn-dark'>新建</button>
            <button className='m-2 btn btn-dark'>导入</button>
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
