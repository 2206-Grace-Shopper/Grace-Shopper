const API_URL = "http://localhost:4000/api";

export async function LoginPerson(event) {
    try {
        const loginEmail = event.target[0].value;
        const loginPassword = event.target[1].value;
        const response = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        });
        const result = await response.json();
        return result;
      
    } catch (error) {
        throw error
    }
}

export async function RegisterPerson(event) {
    try {
      const registerEmail = event.target[0].value;
      const registerPassword = event.target[1].value;
      const registerFullName = event.target[2].value;
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: registerFullName,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error
    }
  }

  export async function getAllPlants() {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const routines = await response.json();
    return routines;
}


  export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const product = await response.json();
    return product
  }
  
export async function getOrderHistory(userId, token) {
  const response = await fetch(`${API_URL}/orderHistory/${userId}`, 
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const history = await response.json();
  return history;
}

export async function getMyInfo (token) {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

  
  