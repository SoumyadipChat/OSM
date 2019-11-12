export interface User{
    id?:number,
    username:string,
    password:string,
    email:string
}

export interface Credentials{
    username:string,
    password:string
}

export interface Playlist{
    id?:number,
    username:string,
    playlist:string,
    isDefault:string
}