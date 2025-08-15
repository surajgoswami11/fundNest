const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.APIBASEURL;

// Remove token handling - we're using cookies now
const handleTokenExpiry = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("fundnest-user");
    window.location.href = "/login";
  }
};

// UPDATE ALL REQUESTS TO USE COOKIES INSTEAD OF TOKEN HEADERS
export async function getapiData(url) {
  const apiUrl = `${baseUrl}/${url}`;

  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      credentials: "include", // ADD THIS FOR COOKIES
      headers: {
        "Content-Type": "application/json",
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

  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      credentials: "include", // ADD THIS FOR COOKIES
      headers: {
        "Content-Type": "application/json",
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

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      credentials: "include", // ADD THIS FOR COOKIES
      headers: {
        "Content-Type": "application/json",
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

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      credentials: "include", // ADD THIS FOR COOKIES
      headers: {
        "Content-Type": "application/json",
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

export async function postApiFormDataToken(url, data) {
  const apiUrl = `${baseUrl}/${url}`;

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      credentials: "include", // ADD THIS FOR COOKIES
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
    console.log("Error:", error.message);
    return { success: false, message: "Network Error" };
  }
}

export async function deleteApiData(url) {
  const apiUrl = `${baseUrl}/${url}`;

  try {
    const result = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include", // ADD THIS FOR COOKIES
      headers: {
        "Content-Type": "application/json",
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

  try {
    const result = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include", // ADD THIS FOR COOKIES
      headers: {
        "Content-Type": "application/json",
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

  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      credentials: "include", // ADD THIS FOR COOKIES
      headers: {
        "Content-Type": "application/json",
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

  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      credentials: "include", // ADD THIS FOR COOKIES
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
