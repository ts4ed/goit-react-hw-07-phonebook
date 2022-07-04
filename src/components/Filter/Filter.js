import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getFilter, setFilter } from 'redux/contactsSlice/contactsSlice';
// import useLocalStorage from 'hooks/useLocalStorage';
import s from './Filter.module.css';

export default function Filter() {
  // const [filter, setFilter] = useLocalStorage('filter', '');
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <label className={s.label}>
      <span className={s.span}>Find contacts by name</span>
      <input
        placeholder="Search"
        type="text"
        value={filter}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
    </label>
  );
}
