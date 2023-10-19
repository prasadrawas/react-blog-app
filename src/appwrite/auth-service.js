import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appWriteUrl).setProject(config.projectID);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const createdAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (createdAccount) {
        return this.login({ email, password });
      } else {
        return createdAccount;
      }
    } catch (e) {
      console.log("Error creating account, error: " + e.message);
      throw e;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Error login: " + error.message);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Couldn't log out, Error," + error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Couldn't get current user, ", error);
    }

    return null;
  }
}

const authService = new AuthService();

export default authService;
