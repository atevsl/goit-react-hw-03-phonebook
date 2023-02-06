import React from 'react';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(newContact.name + ' is already in contacts');
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  filterHendler = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  deleteItem = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  showFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(
      localStorage.getItem('contacts')
    );
    contactsFromLocalStorage &&
      this.setState({ contacts: contactsFromLocalStorage });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <ContactForm onSubmit={this.addContact} />
        {this.state.contacts.length === 0 ? (
          <p>there are no contacts</p>
        ) : (
          <>
            <Filter onInputHendler={this.filterHendler}></Filter>
            <ContactList
              deleteItem={this.deleteItem}
              filteredContacts={this.showFilteredContacts()}
            ></ContactList>
          </>
        )}
      </div>
    );
  }
}
export default App;
