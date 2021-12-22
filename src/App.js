import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FileSearch } from './components/FileSearch'
import { FileList } from './components/FileList'
import { TabList } from './components/TabList'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const data = [{
  name: '文档名字1',
  id: 1,
  body: '简介1。。。',
  createdAt: '1'
},{
  name: '文档名字2',
  id: 2,
  body: '## 简介2。。。',
  createdAt: '2'
},{
  name: '文档名字3',
  id: 3,
  body: '简介3。。。',
  createdAt: '3'
}]

function App() {
  return (
    <div className="App row container-fluid">

        <div className='col-4 bg-light left-panel left-panel-box'>
          <div className='left-panel-content'>
            <h2 className='m-3'>我的云文档</h2>
            <FileSearch
            title='搜索文档...'
            onFileSearch={(value) => {
              console.log('搜索文档',value)
            }}>
            </FileSearch>
            <FileList></FileList>
          </div>
          <div className='left-panel-footer'>
            <button className='m-2 btn btn-dark'>新建</button>
            <button className='m-2 btn btn-dark'>导入</button>
          </div>
        </div>

        <div className='col-8 right-panel'>
          <TabList
            files={data}
            activeId={1}
            unsaveIds={[2]}
            onTabClick={(id)=>{
              console.log(id)
            }}
            onCloseTab={(id)=>{
              console.log('close',id)
            }}
          >
          </TabList>
          <SimpleMDE
            value={data[1].body}
            onChange={(value) => {console.log(value)}}
            options={{
              minHeight: '600px'
            }}
          />
        </div>

    </div>
  );
}

export default App;
