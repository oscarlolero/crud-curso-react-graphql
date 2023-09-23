import {useEditNumber} from "../custom-hooks.js";

export const PhoneForm = () => {

  const {editNumber} = useEditNumber()

  const submit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const phone = event.target.phone.value;

    await editNumber(name, phone);

    console.log('added')

  };

  return (
    <div>
      <h2>Change number</h2>
      <form onSubmit={submit}>
        <div>
          name <input name="name"/>
        </div>
        <div>
          phone <input name="phone"/>
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};
