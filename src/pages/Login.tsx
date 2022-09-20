import React, { FC, useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import { CustomerType } from "../types/customer-type";
import { Customer } from "../api/api";
import * as Toast from "@radix-ui/react-toast";
import { useNavigate, Link } from "react-router-dom";
import { Authentication } from "../api/api";
import { Card, Input, Button, Form } from "antd";
import "./Login.css";
import { useQueryClient } from "react-query";

interface LoginForm extends HTMLFormControlsCollection {
  username: string;
  password: string;
}

interface FormElements extends HTMLFormElement {
  readonly elements: LoginForm;
}

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const redirectDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogin = (event: React.FormEvent<FormElements>) => {
    Authentication.login(username, password).then((data) => {
      setIsAuthenticated(true);
      queryClient.invalidateQueries("session");
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="grid h-screen place-items-center">
          <Card title="Login" className="flex flex-col">
            {/* <img src="../assets/images/logo_large.jpg" alt="logo" /> */}
            <Form onFinish={handleLogin} name="normal_login">
              <Form.Item>
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  defaultValue="username123"
                  onChange={handleUserNameChange}
                />
              </Form.Item>
              <label htmlFor="password">Password</label>

              <Form.Item>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  defaultValue="password123"
                  onChange={handlePasswordChange}
                />
                <div>
                  {error && <small className="text-danger">{error}</small>}
                </div>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Login</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </>
    );
  }
  return (
    <div className="container mt-3">
      <div className="grid h-screen place-items-center">
        <Card title="Logged In" className="flex flex-col">
          <p className="text-lg mb-3">Hi {username}. You are logged in!</p>
          <Button
            type="primary"
            className="ml-auto bg-info"
            onClick={redirectDashboard}
          >
            Enter Dashboard
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Login;