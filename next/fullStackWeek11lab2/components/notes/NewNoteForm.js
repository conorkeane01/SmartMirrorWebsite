import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewNoteForm.module.css';

function NewNoteForm(props) {
  const titleInputRef = useRef();
  //const imageInputRef = useRef();
  //const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    //const enteredImage = imageInputRef.current.value;
    //const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const noteData = {
      notingId: enteredTitle,
      title: enteredTitle,
      //image: enteredImage,
     // address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddNote(noteData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Note Title (must be unique: it's the note ID)</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Note</button>
        </div>
      </form>
    </Card>
  );
}

export default NewNoteForm;
