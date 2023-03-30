import { UserLogin } from "./protocols/UserLogin";

const API_URL = process.env.APP_API_URL || 'http://localhost:3333';

const GET = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    
  },
}

const POST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}


export function GET_TOKEN(body: UserLogin) {
  return {
    url: API_URL + '/users/token',
    options: {
      ...POST, 
      body: JSON.stringify(body)
    },
  };
}