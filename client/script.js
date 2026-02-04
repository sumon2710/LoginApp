const API = "https://loginapp-j9j7.onrender.com/api/auth";

// Register
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(
      "https://loginapp-j9j7.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      }
    );

    const data = await res.json();

    alert(data.message || "Registered");

    if (res.ok) {
      window.location.href = "index.html";
    }

  } catch (err) {
    alert("Server not reachable");
  }
}


// Login
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(
      "https://loginapp-j9j7.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await res.json();

    // ❌ Error case
    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ Success case
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      window.location.href = "profile.html";
    }

  } catch (err) {
    alert("Server not reachable");
    console.error(err);
  }
}
