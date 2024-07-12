import config from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService  {
    client = new Client ();
    account;

    constructor () {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId) ;
        
        this.account = new Account (this.client)
        
    }

    async createAccouunt ({email , password , name }){
        try {
           const userAccount =await this.account.create(ID.unique() , email , password , name)

           if (userAccount) {
            // use another method which on successfull creation of user make it login automatically 
             return this.login({email , password})
           } else {
             return userAccount
           }
        } catch (error) {
            console.log("error :: CReating Account" ,error);
        }
    }

    async login({email , password }) {
        try {
           return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("error :: Login" ,error);
        }
    }   

    async getCurrentUser( ){
        try {
           return  await this.account.get( );
        } catch (error) {
            console.log("error :: Getting User" ,error);
        }

    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("error :: Logout" ,error);
        }
    }

}

const authService = new AuthService(); 


export default authService


