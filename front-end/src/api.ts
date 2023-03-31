import { RegisterSupply } from "./protocols/RegisterSupply";
import { RegisterVehicle } from "./protocols/RegisterVehicle";
import { UpdadeSupply } from "./protocols/UpdateSupply";
import { UserLogin } from "./protocols/UserLogin";

const API_URL = process.env.APP_API_URL || 'http://localhost:3333';

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

export function VALID_TOKEN(token: string) {
  return {
    url: API_URL + '/users/token/valid',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function CREATE_USER(body: UserLogin) {
  return {
    url: API_URL + '/users/register',
    options: {
      ...POST, 
      body: JSON.stringify(body)
    },
  };
}

export function GET_VEHICLE(token: string, plate:string) {
  return {
    url: API_URL + `/vehicle/${plate}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GET_VEHICLE_LIST(token: string) {
  return {
    url: API_URL + '/vehicle',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GET_VEHICLE_DETAILS(token: string, plate: string) {
  return {
    url: API_URL + `/details/vehicle/${plate}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GET_SUPPLY(token: string, id:number) {
  return {
    url: API_URL + `/supply/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GET_SUPPLY_LIST(token: string) {
  return {
    url: API_URL + '/supply',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GET_SUPPLY_DETAILS(token: string, id: number) {
  return {
    url: API_URL + `/details/supply/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function CREATE_VEHICLE(token: string, body: RegisterVehicle) { 
  return {
    url: API_URL + `/vehicle`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
       },
      body: JSON.stringify(body)
     },
  };
}

export function CREATE_SUPPLY(token: string, body: RegisterSupply) {  
  return {
    url: API_URL + `/supply`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
       },
      body: JSON.stringify(body)
     },
  };
}

export function UPDATE_VEHICLE(token: string, body: RegisterVehicle) {
  return {
    url: API_URL + '/vehicle',
    options: {
     method: 'PATCH',
     headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
     body: JSON.stringify(body)
    },
  };
}

export function UPDATE_SUPPLY(token: string, body: UpdadeSupply) {
  return {
    url: API_URL + '/supply',
    options: {
     method: 'PATCH',
     headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
     body: JSON.stringify(body)
    },
  };
}

export function DELETE_VEHICLE(token: string, plate: string) {
  return {
    url: API_URL + `/vehicle/${plate}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function DELETE_SUPPLY(token: string, id: number) {
  return {
    url: API_URL + `/supply/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}