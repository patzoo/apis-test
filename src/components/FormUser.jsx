import React, { useState } from "react";

export default function FormUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    setContacts([...contacts, { email, password }]);
  }
  return (
    <>
      <form>
        <label>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} type="email" />
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        <button onClick={handleSubmit} className="btn btn-success">
          Submit
        </button>
      </form>
      <ul className="mt-5" style={{ color: "black" }}>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.email} - {contact.password}
          </li>
        ))}
      </ul>
    </>
  );
}
