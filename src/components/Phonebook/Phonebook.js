import s from './Phonebook.module.css';
import PhonebookItem from 'components/PhonebookItem/PhonebookItem';

import { useFetchContactsQuery } from 'redux/contacts/contactsSlice';

export default function Phonebook() {
  const { data, isFetching } = useFetchContactsQuery();
  return (
    <ul className={s.list}>
      {isFetching && <p>Загружаем...</p>}
      {data &&
        data.map(({ id, name, phone }) => (
          <li className={s.item} key={id}>
            <PhonebookItem name={name} number={phone} id={id} />
          </li>
        ))}
    </ul>
  );
}
