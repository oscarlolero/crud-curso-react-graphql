import {useAddPerson} from "../custom-hooks.js";
import {useEffect, useState} from "react";

export const PersonForm = () => {
  //const { addPerson, data: addPersonData, error: addPersonError, loading: addPersonLoading } = useAddPerson(); opcion 1
  // const addPersonHook = useAddPerson(); //opcion 2 // Usarlas como addPersonHook.data, addPersonHook.error, etc
  const {addPerson, error, loading} = useAddPerson();
  const [errorState, setErrorState] = useState(false);

  const [test, setTest] = useState(true);

  useEffect(() => {
    if (error) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
  }, [error]);

  const [name, setName] = useState('nametest');
  const submit = async (event) => {
    event.preventDefault();

    const street = event.target.street.value;
    const city = event.target.city.value;
    const age = Number(event.target.age.value);
    const budget = Number(event.target.budget.value);
    const phone = event.target.phone.value;

    await addPerson({name, street, city, age, budget, phone});

    // event.target.name.value = ''
    // event.target.street.value = ''
    // event.target.city.value = ''
    // event.target.age.value = ''
    // event.target.budget.value = ''
  };

  return (
    <div>
      {test && <h1>test</h1>}
      <h2>Add a person</h2>
      {errorState && <p>Something went wrong.</p>}
      {
        loading ? <p>Adding..</p> : <p>Not adding.</p>
      }
      <form onSubmit={submit}>
        <div>
          name <input name="name" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div>
          street <input name="street" defaultValue="streeet"/>
        </div>
        <div>
          city <input name="city" defaultValue="cityyy"/>
        </div>
        <div>
          age <input name="age" type="number" defaultValue="23"/>
        </div>
        <div>
          budget <input name="budget" type="number" defaultValue="213123"/>
        </div>
        <div>
          phone <input name="phone" defaultValue="4625252525"/>
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};
