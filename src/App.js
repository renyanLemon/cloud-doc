import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FileSearch } from './components/FileSearch'
import { FileList } from './components/FileList'

function App() {
  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col-4 bg-light left-panel'>
          <FileSearch
          title='我的云文档'
          onFileSearch={(value) => {
            console.log(1111,value)
          }}>
          </FileSearch>
          <FileList>

          </FileList>
        </div>
        <div className='col-8 right-panel'>
        <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
