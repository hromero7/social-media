import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthProvider from "./context/AuthContext";
import PostProvider from "./context/PostContext";
import MessageProvider from "./context/MessageContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </PostProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
