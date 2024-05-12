import { db,auth } from "./firebase";



const addFormToDB=(uid,nameWork)=>{
    db.collection("Form").add({
        uid:uid,
        nameWork:nameWork,
        filter:[
            // {
            //     featuresWork: "multiple" ,   
            //     question:"what",
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
    db.collection("Form").where("uid", "==", auth.currentUser.uid)
        .onSnapshot((querySnapshot) => {
        let forms = [];
        querySnapshot.forEach((doc) => {    
            forms.push({...doc.data(),id:doc.id});
        });
        success( forms)
    });
}

const getPaper = (docid,getSuccess)=>{  
    let docRef = db.collection("Form").doc(docid);

    docRef.get().then((docid) => {
        if (docid.exists) {
            console.log("Document data:", docid.data());
            getSuccess(docid.data())
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
    }

const updatePaper = (docid,filter,saveSuccess) => {
    
        db.collection('Form').doc(docid).update({ 
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