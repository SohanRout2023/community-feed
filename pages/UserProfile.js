import React, { useState } from "react";
import { gql } from "@apollo/client";
import client from "./client"; // Adjust path as needed

const query = gql`
  query GetComments {
    getTodos {
      id
      user {
        id
        name
        email
        username
        phone
      }
      comments
    }
  }
`;

export async function getServerSideProps() {
  try {
    const { data } = await client.query({ query });
    return {
      props: {
        todos: data.getTodos,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        todos: [],
        error: error.message,
      },
    };
  }
}

function UserProfile({ todos, error }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (error) return <h2>Error fetching comments: {error}</h2>;

  const filteredTodos = todos.filter(
    (todo) =>
      todo.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>User Details</h1>
      <input
        type="text"
        placeholder="Search by name or username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.user?.id || "N/A"}</td>
              <td>{todo.user?.name || "N/A"}</td>
              <td>{todo.user?.email || "N/A"}</td>
              <td>{todo.user?.username || "N/A"}</td>
              <td>{todo.user?.phone || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
