import { useEffect, useState } from 'react';
import './Home.css';
import Button from '../components/Button';
import ItemList from '../components/ItemList';
import UploadForm from '../components/UploadForm';
//import { Todo } from '../global.classes';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home(props) {
    /**
     * @type {URL}
     */
    const apiURL = props.apiURL;

    const [formToggle, setFormToggle] = useState(false);
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    
    // Lifecycle hook
    useEffect(()=>{
      if (!localStorage.getItem("token")) {return navigate("/login");}
      async function sync() {
        try {
          await downloadList();
        }
        catch(e) {
          console.error(e);
          loadLocalList();
        }
      }
      sync();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    function toggleForm() {
      setFormToggle(!formToggle);
    }
    
    async function downloadList() {
      const syncURL = apiURL;
      syncURL.pathname = "/sync";
      await axios.get(syncURL,{headers: ""});
      return;
    }

    function loadLocalList() {
      const localList = localStorage.getItem("todoList");
      if (!localList) {
        setItems([]);
      }
      else {
        setItems(JSON.parse(localList));
      }
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

    function setItems(items) {
      const newList = items;

      localStorage.setItem("todoList", JSON.stringify(newList));
      setList(newList);
    }

    return (
      <div>
        <Navbar name={localStorage.getItem("username")} />
        <div className='Home'>
          <h1>Task App</h1>
          {list.length > 0 ?
            <ItemList items={list} removeCallback={removeItem}/> :
            <div><i>Get started by clicking the button below!</i></div>}
          <Button onClick={toggleForm} cancelState={formToggle}>
            {formToggle ? 'Cancel' : 'Add an item'}
          </Button>
          {formToggle && (<UploadForm submitCallback={addItem} />)}
        </div>
      </div>
    );
}