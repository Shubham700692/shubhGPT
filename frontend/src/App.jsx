import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";
import { BrowserRouter } from "react-router-dom";
import {Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/Login.jsx";
import Signup from "../src/pages/Signup.jsx"; // or components
import ChatLayout  from './ChatLayout.jsx';
import ChatBox from './chatBox.jsx';



function App() {

    const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  
  return (
    <div className='app'>
     
          
 
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route
        path="/"
        element={currentUser ? <ChatLayout /> : <Navigate to="/login" replace />}
      />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatBox />} />
       <Route
        path="*"
        element={
          users.length === 0 ? (
            <Navigate to="/signup" replace />
          ) : currentUser ? (
            // <Navigate to="/chatbox" replace />
            <ChatLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      </Routes>
  
   

    </div>
    
  )
}

export default App
