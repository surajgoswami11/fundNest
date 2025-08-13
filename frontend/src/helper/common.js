const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.APIBASEURL;

// Helper to get token
const getToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

// Helper to handle token expiry
const handleTokenExpiry = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("fundnest-user");
    // Redirect to login page
    window.location.href = "/login";
  }
};

export async function getapiData(url) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await result.json();

    if (!result.ok) {
      console.log(`Error: ${data.message || "failed to get data"}`);

      if (result.status === 401) {
        handleTokenExpiry();
      }

      return { success: false, message: data.message || "failed to get data" };
    }

    return data;
  } catch (error) {
    console.log("Network error:", error.message);
    return { success: false, message: "Network error" };
  }
}

export async function getWithToken(url) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  if (!token) {
    console.log("No token found");
    return { success: false, message: "No authentication token" };
  }

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
      console.log(`Error: ${data.message}`);

      if (result.status === 401) {
        handleTokenExpiry();
      }

      return { success: false, message: data.message };
    }

    return data;
  } catch (error) {
    console.log("Network error:", error.message);
    return { success: false, message: "Network error" };
  }
}

export async function postWithToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  if (!token) {
    console.log("No token found");
    return { success: false, message: "No authentication token" };
  }

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await result.json();

    if (!result.ok) {
      console.log(`Error: ${responseData.message}`);

      if (result.status === 401) {
        handleTokenExpiry();
      }

      return { success: false, message: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function postApiData(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    const responseData = await result.json();

    if (!result.ok) {
      console.log(`Error: ${responseData.message}`);

      if (result.status === 401 && token) {
        handleTokenExpiry();
      }

      return { success: false, message: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function postApiFormDataToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  if (!token) {
    return { success: false, message: "No authentication token" };
  }

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: "include",
    });

    const responseData = await result.json();

    if (!result.ok) {
      if (result.status === 401) {
        handleTokenExpiry();
      }
      return { success: false, message: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.log("Error:", error.message);
    return { success: false, message: "Network Error" };
  }
}

export async function deleteApiData(url) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  if (!token) {
    return { success: false, message: "No authentication token" };
  }

  try {
    const result = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await result.json();

    if (!result.ok) {
      if (result.status === 401) {
        handleTokenExpiry();
      }
      return { success: false, message: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: error.message };
  }
}

export async function deleteWithToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  if (!token) {
    return { success: false, message: "No authentication token" };
  }

  try {
    const result = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await result.json();

    if (!result.ok) {
      if (result.status === 401) {
        handleTokenExpiry();
      }
      return { success: false, message: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function updateWithToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  if (!token) {
    return { success: false, message: "No authentication token" };
  }

  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await result.json();

    if (!result.ok) {
      if (result.status === 401) {
        handleTokenExpiry();
      }
      return { success: false, message: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}

export async function updateWithFormToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;
  const token = getToken();

  if (!token) {
    return { success: false, message: "No authentication token" };
  }

  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const responseData = await result.json();

    if (!result.ok) {
      if (result.status === 401) {
        handleTokenExpiry();
      }
      return { success: false, message: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { success: false, message: "Network Error" };
  }
}
