const firebase = require ('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {
            apiKey: "AIzaSyA0nW_P_7W4TbaPxaGLExE2SDt0z4eQuEU",
            authDomain: "whatsapp-clone-536ee.firebaseapp.com",
            projectId: "whatsapp-clone-536ee",
            storageBucket: "whatsapp-clone-536ee.appspot.com",
            messagingSenderId: "7695932221",
            appId: "1:7695932221:web:a5d0eae88d33ef56968354",
            measurementId: "G-CKH6H7WC1N"
          };

        this.init();

    }

    init(){

        if(!this._initialized){

            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                timestampsInSnapshots: true

            }); 

            this._initialized = true;

        }   

    }
    
    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }
}