import { db } from "./firebase";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";

const addFormToDB=(uid,nameWork)=>{
    addDoc(collection(db, "Form"), {
        uid:uid,
        nameWork:nameWork,
        filter:[
            // {
            //     featuresWork: "multiple" ,
            //     question:"what2",
            //     ans:[
            //         {
            //             text:"fine",
            //             status:true
            //         },
            //         {
            //             text:"good",
            //             status:false
            //         }
            //     ]
            // }
        ]
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const getForm= (success)=>{
    onSnapshot(collection(db, "Form"), (querySnapshot) => {
        let forms = [];
        querySnapshot.forEach((doc) => {
            forms.push({...doc.data(),id:doc.id});
        });
        success( forms)
    });
}


const getPaper = (docid,getSuccess)=>{
    const docRef = doc(db, "Form", docid);

    getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            getSuccess(docSnap.data())
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
    }




const updatePaper = (docid,filter,saveSuccess) => {
    
        updateDoc(doc(db, "Form", docid), { 
            filter: filter 
        })
        .then(() => {
            console.log("Document successfully updated!");
            saveSuccess()
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

};



                   


export default {addFormToDB,getForm,getPaper,updatePaper}