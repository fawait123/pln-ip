import { EncryptStorage } from "encrypt-storage";

// Example of secret_key variable in an .env file
// const encryptStorage = new EncryptStorage(process.env.SECRET_KEY, options);
const encryptStorage = new EncryptStorage("secret-key-value", {
  stateManagementUse: true,
});

export { encryptStorage };
