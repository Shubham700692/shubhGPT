import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";
import { useNavigate } from "react-router-dom";



function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
     const [user, setUser] = useState(null);

    const navigate = useNavigate();
const isLoggedIn = Boolean(localStorage.getItem("token"));


    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("https://shubhgpt.onrender.com/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);

    useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // ✅ ensure valid user object
      if (parsedUser?.username) {
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
}
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/chat");
}




    return (
        <div className="chatWindow">
            <div className="navbar">
                <span><b>shubhGPT</b><i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            { isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                   

                    {user?.username ? (
      <>
      <div className="dropDownItem" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div> 
      </>
    ) : (
      <>
           
            <div
          className="dropDownItem"
          onClick={() => navigate("/login")}
        >
          <i className="fa-solid fa-right-to-bracket"></i> Login
        </div>

        <div
          className="dropDownItem"
          onClick={() => navigate("/signup")}
        >
          <i className="fa-solid fa-user-plus"></i> Sign Up
        </div>
      </>
    
    
      
    )
            }  
                </div>
            }
     
        
             
            <Chat></Chat>

            <ScaleLoader color="#fff" loading={loading}>
            </ScaleLoader>
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                    >
                           
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;