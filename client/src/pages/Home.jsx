import { useEffect, useState } from 'react';
import './Home.css';
import Button from '../components/Button';
import ItemList from '../components/ItemList';
import UploadForm from '../components/UploadForm';
//import { Todo } from '../global.classes';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ErrorScreen from '../components/ErrorScreen';

export default function Home(props) {
    /**
     * @type {URL}
     */
    const apiURL = props.apiURL;

    const [formToggle, setFormToggle] = useState(false);
    const [serverOffline, setServerOffline] = useState(false);
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    
    // Lifecycle hook
    useEffect(()=>{
      if (!localStorage.getItem("token")) {return navigate("/login");}
      
      downloadList()
      .then(()=>{})
      .catch(console.error);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    function toggleForm() {
      setFormToggle(!formToggle);
    }
    
    async function downloadList() {
      try {
        const syncURL = apiURL;
        syncURL.pathname = "/sync";
        const {data} = await axios.get(syncURL.toString(),{
          params: {username: localStorage.getItem("username")},
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        });
        return setItems(data.todos || []);
      }
      catch(e) {
        return serverErrorHandler(e);
      }
    }

    async function uploadList(todos) {
      try {
        const syncURL = apiURL;
        syncURL.pathname = "/sync";
        await axios.post(syncURL.toString(), { todos }, {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
          params: {username: localStorage.getItem("username")}
        })
      }
      catch(e) {
        return serverErrorHandler(e);
      }
    }

    function serverErrorHandler(e) {
      console.error(e);
      if (!e.response) {
        return setServerOffline(true);
      }
      // 401 means we have an invalid token, 403 means the username didn't match the token, 404 means the user didn't exist; so we log out
      if (e.response.code === 401 || e.response.code === 403 || e.response.code === 404) {
        return logOut();
      }
    }

    async function addItem(item) {
      const newList = [...list, item];
      await uploadList(newList);
      setList(newList);
    }
  
    async function removeItem(id) {
      const newList = list.filter(item => item._id !== id);
      await uploadList(newList);
      setList(newList);
    }

    async function setItems(items) {
      const newList = items;
      await uploadList(newList);
      setList(newList);
    }

    function logOut() {
      localStorage.removeItem("token");
      navigate("/login");
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
        {serverOffline && <ErrorScreen />}
      </div>
    );
}