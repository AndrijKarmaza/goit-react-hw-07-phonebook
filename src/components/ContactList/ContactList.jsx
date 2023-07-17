import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import css from './ContactList.module.css';
import { selectFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  return (
    <ul className={css.contact_list}>
      {contacts.map(({ id, name, phone }) => (
        <li className={css.contact_item} key={id}>
          <p className={css.contact_data}>
            {name} : {phone}
          </p>
          <button
            className={css.contact_btn}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
