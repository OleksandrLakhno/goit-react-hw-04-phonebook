import { useState} from "react";
import PropTypes from 'prop-types';
import shortid from "shortid";
import f from './Form.module.css';

function FormContact({ onSubmit}) { 
    const [parameters, setParameters] = useState({name:'',number:''});

   const inputNameId = shortid.generate();
    const inputNumberId = shortid.generate();

    const handleChange = e => { 
        const { name, value } = e.currentTarget;
        console.log(e.currentTarget.value);
        setParameters({ ...parameters,[name]: value });
    };

    const handleSubmit = e => { 
        e.preventDefault();
        console.log(parameters);
        onSubmit(parameters);
        reset();
    };

   const reset = () => { 
        setParameters({name:'',number:''})
    };

     
        return (
            <form className={f.form} onSubmit={handleSubmit}>
                    <span>Name</span>
                <label htmlFor={inputNameId}>
                    <input className={f.label}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={handleChange}
                        value={ parameters.name}
                        id={inputNameId}
                        
                    />
                </label>
                <label htmlFor={inputNumberId}>
                    <span>Number</span>
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={handleChange}
                        value={ parameters.number}
                        id={inputNumberId}
                    />
                </label>
                <button type="submit" > Add contact</button>
            </form>
        )
};

FormContact.propTypes = {
    onSubmit:PropTypes.func.isRequired,
};

export default FormContact;