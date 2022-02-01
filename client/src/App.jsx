import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import ItemList from './components/ItemList';
import UploadForm from './components/UploadForm';
import { Todo } from './global.classes'

function App() {

  const [formToggle, setFormToggle] = useState(false);

  const testItems = [
    new Todo({title: "Test1", description: "TODO"}),
    new Todo({title: "Test2", description: "TODO"}),
    new Todo({title: "Test3", description: "TODO"})
  ]

  const [list, setList] = useState(testItems);

  function toggleForm() {
    setFormToggle(!formToggle);
  }

  function addItem(item) {
    setList([...list, item]);
    console.log('added item', item);
  }

  return (
    <div className='App'>
      <h1>Task App</h1>
      <ItemList items={list} />
      <Button onClick={toggleForm} state={formToggle}>
        {formToggle ? 'Cancel' : 'Add an item'}
      </Button>
      {formToggle && (<UploadForm submitCallback={addItem} />)}
    </div>
  )
}

export default App;
