import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FileSearch } from './components/FileSearch'
import { FileList } from './components/FileList'

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
          <h1>this is the right</h1>
        </div>

    </div>
  );
}

export default App;
