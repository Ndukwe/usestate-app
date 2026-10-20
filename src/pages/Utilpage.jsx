
import { useState, useEffect } from "react";

function UtilPage() {
  // Store users from the API
  const [users, setUsers] = useState([]);

  // Store loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch users
    const getUsers = async () => {
      try {

        const response = await fetch(
          "https://dummyjson.com/quotes"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        setUsers(data.quotes);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>

            <h3>{user.quote}</h3>
            
           
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default UtilPage;
