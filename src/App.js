// App.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyForm from "./components/MyForm";
import CryptoJS from "crypto-js";

const Button = styled.button`
  background: ${(props) => (props.primary ? "blue" : "white")};
  color: ${(props) => (props.primary ? "white" : "blue")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
  cursor: pointer;
`;

const App = () => {
  const [decryptedData, setDecryptedData] = useState("");
  const secretKey = "12345678901234567890123456789012";

  const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/publishable-key")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data.data.key);
        const decrypted = decrypt(data.data.key, secretKey);
        setDecryptedData(decrypted);
        console.log("Decrypted data:", decrypted);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div>
      <Button>Normal Button</Button>
      <Button primary>Primary Button</Button>
      <br />
      <MyForm />
    </div>
  );
};

export default App;
