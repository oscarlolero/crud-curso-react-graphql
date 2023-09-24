import Persons from './persons/components/Persons.jsx';
import './App.css';
import {PersonForm} from "./persons/components/PersonForm.jsx";
import {usePersons} from "./persons/custom-hooks.js";
import {PhoneForm} from "./persons/components/PhoneForm.jsx";
import LoginForm from "./login/components/LoginForm.jsx";
import {useUser} from "./login/custom-hooks.js";
///https://fullstackopen.com/es/part8/servidor_graph_ql
///https://fullstackopen.com/es/part8/servidor_graph_ql
///https://fullstackopen.com/es/part8/servidor_graph_ql
///https://fullstackopen.com/es/part8/servidor_graph_ql
///https://fullstackopen.com/es/part8/servidor_graph_ql
///https://fullstackopen.com/es/part8/servidor_graph_ql
function App() {

  const {data, error, loading} = usePersons();
  const {token, setToken, logout} = useUser();

  if (error) return <div>error...</div>;
  return (
    <div className="App">
      <>
        {
          loading
            ? <div>loading...</div>
            : <Persons persons={data?.allPersons}/>
        }
      </>

      {
        token
          ? <button onClick={() => logout(setToken)}>Logout</button>
          : <LoginForm setToken={setToken}/>
      }
      <PhoneForm/>
      <PersonForm/>
    </div>
  );
}

export default App;
