/// <reference types="react-scripts" />
import "bootstrap-react-essentials/dist/global";

declare global {
  interface AppUser {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
  }
}
