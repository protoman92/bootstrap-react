import "bootstrap-react-essentials/dist/global";

declare global {
  interface AppUser {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
  }
}
