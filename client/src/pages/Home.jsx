import { useEffect, useState } from 'react';
import './Home.css';
import Button from '../components/Button';
import ItemList from '../components/ItemList';
import UploadForm from '../components/UploadForm';
import { Todo } from '../global.classes';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Home(props) {
    const apiURL = props.apiURL;

    const [formToggle, setFormToggle] = useState(false);
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    
    // Lifecycle hook
    useEffect(()=>{
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/login");
      }
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
    },[navigate]);
  
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
      try {
        const url = apiURL;
        url.pathname = "/test";
        console.log('Making API call to ' + url.toString());
        const res = await axios.get(url.toString(), {responseType: 'json'});
  
        alert(`Hello ${res.data.hello}`);
      }
      catch(e) {
        console.error(e);
        alert("There was an error making the request");
      }
    }
  
    return (
      <div className='Home'>
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
    );
}