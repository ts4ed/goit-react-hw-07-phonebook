import { useCreateContactMutation } from 'redux/contacts/contactsApi';
import { useFetchContactsQuery } from 'redux/contacts/contactsApi';
import { toast } from 'react-toastify';
import useLocalStorage from 'hooks/useLocalStorage';
import 'react-toastify/dist/ReactToastify.css';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');
  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const { data } = useFetchContactsQuery();

  const handleSubmit = async e => {
    e.preventDefault();
    const newContact = {
      name: name,
      phone: number,
    };

    const isExistContact = data.find(data => data.name === name);
    if (isExistContact) {
      toast.error(`${name} is already in contacts`);
    }
    if (!isExistContact) {
      try {
        await createContact(newContact);
        toast.success(`${name} add in contacts`);
        // refetch();
      } catch (error) {}
    }

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={s.container}>
      <form type="submit" onSubmit={handleSubmit} className={s.form}>
        <label className={s.input}>
          <span className={s.span}>Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label className={s.input}>
          <span className={s.span}>Number</span>
          <input
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={e => setNumber(e.target.value)}
            value={number}
          />
        </label>

        <button
          className={s.button}
          type="submit"
          disabled={!name || !number || isCreating}
        >
          {isCreating ? 'Сreate a contact....' : 'Add contact'}
        </button>
      </form>
    </div>
  );
}
