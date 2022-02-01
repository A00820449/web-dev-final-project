import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import ItemList from './components/ItemList';
import UploadForm from './components/UploadForm';
import { Todo } from './global.classes';

const apiURL = new URL(process.env.REACT_APP_API_BASE_URL);

export default function App() {

  const [formToggle, setFormToggle] = useState(false);

  const [list, setList] = useState([]);
  
  // Lifecycle hook
  useEffect(()=>{
    const localList = localStorage.getItem("todoList");
    if (!localList) {
      const testItems = [
        new Todo({title: "Test1", description: "TODO"}),
        new Todo({title: "Test2", description: "TODO"}),
        new Todo({title: "Test3", description: "TODO"})
      ];
      localStorage.setItem("todoList", JSON.stringify(testItems));
      setList(testItems);
    }
    else {
      setList(JSON.parse(localList));
    }

    console.log(`API URL: ${apiURL.toString()}`);
  },[]);

  function toggleForm() {
    setFormToggle(!formToggle);
  }

  function addItem(item) {
    const newList = [...list, item];
    localStorage.setItem("todoList", JSON.stringify(newList));
    setList(newList);
  }

  function removeItem(id) {
    const newList = list.filter(item => item._id !== id);

    localStorage.setItem("todoList", JSON.stringify(newList));
    setList(newList);
  }

  async function testAPI() {
    let url = apiURL;
    url.pathname = "/test";
    console.log('Making API call to ' + url.toString());
    const res = await fetch(url.toString());
    const data = await res.json();

    alert(`Hello ${data.hello}`);
  }

  return (
    <div className='App'>
      <h1>Task App</h1>
      {list.length > 0 ?
        <ItemList items={list} removeCallback={removeItem}/> :
        <div><i>Get started by clicking the button below!</i></div>}
      <Button onClick={toggleForm} cancelState={formToggle}>
        {formToggle ? 'Cancel' : 'Add an item'}
      </Button>
      {formToggle && (<UploadForm submitCallback={addItem} />)}
      <button onClick={testAPI}>test api</button>
    </div>
  )
}
