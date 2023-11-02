import { Post } from "./post";
import { Task } from "./task";

export class User {
    constructor(public _id: string,
        public Name: string,
        public Email: string,
        public Street?: string,
        public City?: string,
        public Zipcode?: Number,
        public Tasks?: [Task],
        public Posts?: [Post]) { }
}