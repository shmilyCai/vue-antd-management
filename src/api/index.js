import {get} from "@http/request";

export const listApi = (params)=>get("/list/api",params);
export const login = (params)=>get("/login",params);
export const listDeleteApi = (params)=>get("/list/api",params);
export const getUserInfo = (params)=>get("/list/api",params);