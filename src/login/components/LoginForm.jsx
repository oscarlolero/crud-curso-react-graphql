import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../graphql-queries.js";


const LoginForm = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({variables: {username, password}});
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
    }
  }, [result.data]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
