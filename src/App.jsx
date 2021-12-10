import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(3),
      name,
      number,
    };
    const dublicate = contacts.some(c => c.name === contact.name);
    if (dublicate) {
      return alert(`${contact.name} is already in contacts.`);
    }
    setContacts([contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContacts = getContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </Container>
  );
}

export default App;
