import React, { useState } from "react";
import { gql } from "@apollo/client";
import client from "./client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      content
      createdAt
      comments
      user {
        id
        name
        email
      }
    }
  }
`;

export async function getServerSideProps() {
  // Fetch data server-side
  const { data } = await client.query({ query });

  return {
    props: {
      todos: data.getTodos,
    },
  };
}

function Home({ todos }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rows based on the search term (user name or email)
  const filteredTodos = todos.filter(
    (todo) =>
      todo?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by User Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="todos-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Content</th>
            <th>Comments</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id} className="todo-row">
              <td>{todo?.user?.name || "N/A"}</td>
              <td>{todo?.user?.email || "N/A"}</td>
              <td>{todo.content}</td>
              <td>{todo.comments}</td>
              <td>{new Date(todo.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Community-Feed Application. All Rights Reserved.</p>
        <p>
          Created by <a href="https://github.com/SohanRout2023" target="_blank" rel="noopener noreferrer">Sohan Kumar Rout</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
