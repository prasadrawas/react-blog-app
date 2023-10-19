import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

export class PostService {
  client = new Client();
  storage;
  database;

  constructor() {
    this.client.setEndpoint(config.appWriteUrl).setProject(config.projectID);
    this.storage = new Storage(this.client);
    this.database = new Databases(this.client);
  }

  // Database methods
  async createPost({ title, content, status, featuredImage, userId }) {
    try {
      return await this.database.createDocument(
        config.databaseID,
        config.collectionID,
        ID.unique(),
        {
          title,
          content,
          status,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("Error creating post, error: " + error);
    }

    return null;
  }

  async updatePost(id, { title, content, status, featuredImage }) {
    try {
      return await this.database.updateDocument(
        config.databaseID,
        config.collectionID,
        id,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("Error updating post, error" + error);
    }

    return null;
  }

  async deletePost(id) {
    try {
      return await this.database.deleteDocument(
        config.databaseID,
        config.collectionID,
        id
      );
    } catch (error) {
      console.log("Error deleting post, error: " + error);
    }
    return null;
  }

  async getPost(id) {
    try {
      return await this.database.getDocument(
        config.databaseID,
        config.collectionID,
        id
      );
    } catch (error) {
      console.log("Error getting post, error: " + error);
    }

    return null;
  }

  async getPosts(queries = []) {
    try {
      return await this.database.listDocuments(
        config.databaseID,
        config.collectionID,
        queries
      );
    } catch (error) {
      console.log("Error getting posts, error: " + error);
      throw error;
    }
  }

  // Storage methods
  async uploadFile(file) {
    try {
      return await this.storage.createFile(config.bucketID, ID.unique(), file);
    } catch (error) {
      console.log("Error uploading file, error: " + error);
    }

    return null;
  }


  async deleteFile(id) {
    try {
      return await this.storage.deleteFile(config.bucketID, id);
    } catch (error) {
      console.log("Error deleting file, error: " + error);
    }
    return null;
  }

  getFilePreview({ fileId }) {
    return this.storage.getFilePreview(config.bucketID, fileId);
  }
}

const postService = new PostService();

export default postService;
