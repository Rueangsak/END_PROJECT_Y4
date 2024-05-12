import React, { useEffect, useState } from 'react'
import '../CSS/Add.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import serviceApi from '../firebase/serviceApi';
import { db,auth } from '../firebase/firebase';
import { useParams } from 'react-router-dom';



const AddTodoForm = ({ todo, onAddFormSubmit, onAddInputChange }) => {
  const [name, setName] = useState("");
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [newValue, setNewValue] = useState('');
  
  const handleDialogOpen = (form) => {
    setSelectedForm(form);
    setNewValue(form.nameWork);
    setDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleUpdate = () => {
    
    db.collection('Form').doc(selectedForm.id).update({ nameWork: newValue });
    handleDialogClose();
  };
  
  const addNewForm = () => {
    if (name !== "") {
      serviceApi.addFormToDB(auth.currentUser.uid, name)
    } else {
      alert("กรุณากรอกข้อมูล");
    }
  };

  //delete form
  const deleteform = (form) => {
    if (window.confirm("Do you want to delete?")) {
      db.collection("Form")
        .doc(form.id)
        .delete()
        .then(() => {
          console.log("The data was successfully deleted.");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  };



  const getSuccess = (forms) => {
    setForms(forms);
    setLoading(false);
  };

  useEffect(() => {
    serviceApi.getForm(getSuccess);
  }, []);

    


  if (loading) {
    return (
      <h1>Loading.....</h1>
    );
  }


    
  

 
  

  return (
    <>
      <form onSubmit={onAddFormSubmit} style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
        <TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" sx={{ width: '25ch' }} />
        <Button  class='button-3' variant="outlined" style={{marginLeft:20,height:40,fontSize:16}} onClick={addNewForm}>Add</Button>
      </form>
      {forms.map((form) => {
        return (
          <div class="namework" key={form.id}>
            <h1 style={{fontfamily:"serif",fontsize:14}}>{form.nameWork}</h1>
          
            <Button class='button-29'>Presentation</Button>
            <Button class='button-29' href={'/Open/' + form.id}>Open</Button>
            <Button class='button-29' onClick={() => handleDialogOpen(form)}>Edit</Button>
            <Button class='button-62'onClick={() => deleteform(form)}>Delete</Button> 
            {/* <button onClick={()=>props.deteleFilter(props.indexFilterS  how)}>Delete</button> */}
          </div>
        );
      })}
      {selectedForm && (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Update Name Work</DialogTitle>
          <DialogContent>
            <TextField value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AddTodoForm;
