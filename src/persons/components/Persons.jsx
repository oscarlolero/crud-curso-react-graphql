import {useEffect, useState} from "react";
import {useSearchPerson} from "../custom-hooks.js";

const Persons = ({persons}) => {

  const {getPerson, data} = useSearchPerson();
  const [person, setPerson] = useState(null);

  const showPerson = async (name) => {
    console.log('search', name)
    await getPerson({variables: {nameToSearch: name}});
  };

  useEffect(() => {
    if (data) {
      setPerson(data.findPerson);
    }
  }, [data]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <p>{person.phone}</p>
        <p>{person.street}</p>
        <p>{person.age}</p>
        <p>{person.address.city}</p>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {
        persons.map(person => {
          return (
            <div key={person.id} onClick={() => showPerson(person.name)}>
              <p>{person.name}</p>
            </div>
          );
        })
      }
    </div>
  );
};

export default Persons;
