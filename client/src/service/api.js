import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'http://localhost:8000';

export const RegisterUser = async (formData) => {
  try {
    const response = await axios.post(`${usersUrl}/register`, formData);
    return response;
  } catch (error) {
    console.error('Error fetching users Calling on Register API:', error);
    throw error; // Re-throw the error so it can be caught by the caller
  }
};
export const SignInUser = async (user) => {
  try {
    const response = await axios.post(`${usersUrl}/signin`, user);
    return response;
  } catch (error) {
    console.error('Error fetching users Calling on SignIN API:', error);
    throw error; // Re-throw the error so it can be caught by the caller
  }
};

export const getUsers = async (month,year,filter) => {
    try {
      const response = await axios.get(`${usersUrl}/all/admin/${year}/${month}`); return response;
    } catch (error) {
      console.error('Error fetching users Calling on getUsers API:', error);
      throw error; // Re-throw the error so it can be caught by the caller
    }
  };
  export const getSalary = async (id,users) => {
    console.log(users);
    try {
      const response = await axios.post(`${usersUrl}/staffSalary/staffDash/${id}`,users); return response;
    } catch (error) {
      console.error('Error fetching users Calling on getSalary API:', error);
      throw error; // Re-throw the error so it can be caught by the caller
    }
  };
  export const SearchStaff = async (user) => {
    try {
      const response = await axios.get(`${usersUrl}/search`, {
        params: user,
      });
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Re-throw the error so it can be caught by the caller
    }
  };
export const addUser = async (year,month,user) => {
    return await axios.post(`${usersUrl}/data-entry/${year}/${month}`, user);
}

export const deleteUser = async (id,month,year) => {
    return await axios.delete(`${usersUrl}/${id}/${month}/${year}`);
}
export const getUser = async (id, month,year) => {
    try {
        return await axios.get(`${usersUrl}/${id}/${year}/${month}`);
    } catch (error) {
        console.error("Error calling getUser api in api.js", error);
        throw error; // Rethrow the error to handle it in the component
    }
}

export const EditUser = async (id,month,year, user) => {
    return await axios.put(`${usersUrl}/${id}/${year}/${month}`, user)
}
// export const getStudent =async(user)=>{
//     return await axios.post(`${usersUrl}/Student`,user)
// }