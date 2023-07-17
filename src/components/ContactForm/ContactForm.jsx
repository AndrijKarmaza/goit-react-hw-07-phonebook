import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux//operations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ContactForm.module.css';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const inputChange = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        return setName(value);

      case 'number':
        return setPhone(value);

      default:
        return;
    }
  };

  const formSubmit = evt => {
    evt.preventDefault();

    contacts.find(element => element.name === name)
      ? Notify.info(`${name} is already in contacts.`)
      : dispatch(addContact({ name, phone }));

    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={formSubmit}>
      <label>
        <span className={css.labelText}>Name</span>
        <input
          value={name}
          onChange={inputChange}
          type="text"
          name="name"
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <span className={css.labelText}>Number</span>
        <input
          value={phone}
          onChange={inputChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.btnAdd}>
        Add contact
      </button>
    </form>
  );
};
