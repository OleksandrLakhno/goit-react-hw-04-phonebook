import { useState,useEffect } from "react";
import shortid from "shortid";
// import Section from "components/Section";
import FormContact from "components/FormContact";
import ContactList from "components/ContactList";
import Filter from "components/Filter/Filter";
import useLocalStorage from "components/hooks/hooks";


function App () { 
  const [contacts , setContacts] = useLocalStorage('contacts',[
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  
  const [filter , setFilter] = useState('');

  useEffect(() => { 
    console.log('Змонтувалось');
    const contactJson = localStorage.getItem('contacts');
    const contactParce = JSON.parse(contactJson);
  },[]);

   const addContact = data => { 
    const { name,number } = data;
    
    contacts.some(contact => contact.name === name) ?
      alert(`${name} is already exist`) : setContacts(prevState => [...prevState, { id: shortid.generate(),name:name,number:number }]);
    // const add = {
    //   id: shortid.generate(),
    //   name,
    //   number,
    // };
    // this.setState(prevState => ({
    //   contacts: [add,...prevState.contacts],
    // }));
  };

  // formSubmitHendle = data => { 
  //   console.log(data);
  // };

 const  deleteContaktItem = (contactId) => {
   setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
    console.log(contactId);
  };

 const changeFilter = e => { 
    setFilter(e.currentTarget.value);
  };

  const  filterForm = () => { 
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.toLowerCase().includes(normalizeFilter));
  };
  const filtred = filterForm();
    return (
      <div>
        {/* <Section title='Phonebook'> */}
        <h1>Phonebook</h1>
          <FormContact onSubmit={addContact}/>
      {/* </Section> */}

        {/* <Section title='Contacts'> */}
        <h2>Contacts</h2>
          <Filter value={filter} changeFilter={changeFilter}/>
          <ContactList options={filtred} onDeleteContactItem={deleteContaktItem}/>
      {/* </Section> */}
      </div>
    )
};

export default App;
