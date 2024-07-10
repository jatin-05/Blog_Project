import { ReducerType } from "@reduxjs/toolkit";
import config from "../config/config";
import { Client, Account, ID  , Storage, Databases, Query} from "appwrite";


export class Service  {
    client = new Client ();
    databases;
    bucket ; 
    constructor(){
        this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId);
        this.databases = new Databases (this.client);
        this.bucket = new Storage (this.client  )
    }

    async createPost ({title , slug , content, featuredImage, status ,userId}) {
      try {
        return await this.databases.createDocument( 
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          slug,
          {
              title,
              content,
              featuredImage,
              status,
              userId
          }
        )
      } catch (error) {
        console.log("error Creating the Blog :: error",error)
      }
    }


    async updatePost (slug ,{title, content, featuredImage , status}){
      try {
        return await this.databases.updateDocument( 
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          slug,
          {
            title,
            content,
            featuredImage,
            status
          }
        )
      } catch (error) {
        console.log("error Updating the Blog :: error",error)
      }
    }
   

    async deletePost (slug){
      try {
        await this.databases.deleteDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          slug
        )
        return true
      } catch (error) {
        console.log("error :: Deleting the BLog :: error", error);
        return false
      }

    }

    async getPost(slug){
      try {
        return await this.databases.getDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          slug
        )
      } catch (error) {
        console.log("error Getting a Blog :: error", error);
        return false
      }
    }

    // async getAllPost(){
    //   try {
    //     // this will give all the documents in the collection id means that we will also get documents whose status is not active
    //     return this.databases.listDocuments(
    //       config.appwriteDatabaseId,
    //       config.appwriteCollectionId

    //     )
    //   } catch (error) {
    //     console.log("error Getting all Blogs :: error", error);
    //     return false
    //   }
    // }


    async getAllPosts(/*querries = [Query.equal("status", "active")]*/){
      try {
        return await this.databases.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          [Query.equal("status", "active")]
        )
      } catch (error) {
        console.log("error :: Getting all Blogs :: error", error);
      }
    }

    async uploadFile(file){
      try {
        return await this.bucket.createFile(
          config.appwriteBucketId,
          ID.unique,
          file
        )
      } catch (error) {
        console.log("error :: Uploading File :: error", error);
      }
    }

    async deleteFile(fileId){ 
      try {
        await this.bucket.deleteFile(
          config.appwriteBucketId,
          fileId
        )
      } catch (error) {
        console.log("error :: Deete File :: error", error);
      }
    }

    getFilePreview(fileId){
      return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
      )
    }

}




const service = new Service()
export default service