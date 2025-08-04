const baseUrl = process.env.APIBASEURL;

export async function getapiData(url) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await result.json(); // Parse response body once
    if (!result.ok) {
      console.log(`Error: ${data.message || "failed to data"}`);
      return { success: false, message: data.message || "failed to data" };
    }

    return data;
  } catch (error) {
    console.log("Network error", error.message);
    return { success: false, message: "Network error" };
  }
}

// get data with token
//@ when orders lis

export async function getWithToken(url) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    if (!result.ok) {
      console.log(`Erorr: ${data.message}`);
      return { success: false, message: data.message };
    }
    return data;
  } catch (error) {
    console.log("Network error", error.message);
  }
}

// when add to cart and address etc
// @ post api need with token

export async function postWithToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(result);

    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function postApiData(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function postApiFormDataToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: "include",
    });

    if (result) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export async function deleteApiData(url) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const result = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.log(`Error ${error.message}`);
    return { success: false, message: error.message };
  }
}

export async function deleteWithToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const result = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function updateWithToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function updateWithFormToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}
