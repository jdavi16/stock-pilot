import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../scripts/AuthContext";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Anchor, Button, Checkbox, Container, Flex, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import classes from "./login.module.css";

const Login: React.FC = () => {
  const [type, toggle] = useToggle(["login", "register"]);
  const { setIsLoggedIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });
  useEffect(() => {
    setIsLoggedIn(false); // Ensure user is logged out when navigating to the login page
  }, [setIsLoggedIn]);

  const handleForgot = () => {
    navigate("/forgot");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: form.values.username,
        password: form.values.password,
      });

      console.log("Login response:", response.data);
      if (response.data.message === "Login successful") {
        // Store token for session management

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("lastName", response.data.lastName);

        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError("There was a problem logging in");
      }
    } catch (err: unknown) {
      console.error("Error during login:", err);
      setError("Invalid username or password");
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        firstName: form.values.firstName,
        lastName: form.values.lastName,
        email: form.values.email,
        username: form.values.username,
        password: form.values.password,
      });

      toggle();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError("Error with Registration");
      }
    }
  };
  return (
    <Container size={420} my={40}>
      <Title ta='center' className={classes.title} mb={20}>
        {type === "register" ? "Create an Account" : "Welcome Back!"}
      </Title>
      <Text c='dimmed' size='sm' ta='center' mt={5}>
        {type === "register" ? "Already have an account?\t" : "Do not have an account yet?\t"}
        <Anchor size='sm' component='button' className={classes.anchor} onClick={(e) => toggle()}>
          {type === "register" ? "Login" : "Create Account"}
        </Anchor>
      </Text>
      <Paper withBorder shadow='md' radius='lg' bg='var(--form)' className={classes.paper} p={30} mt={10}>
        <form onSubmit={type === "register" ? handleRegister : handleLogin}>
          <Stack>
            {type === "register" && (
              <>
                <Flex display='row' align='center' gap='md'>
                  <TextInput required classNames={{ input: classes.input }} label='First Name' placeholder='Enter First Name' value={form.values.firstName} onChange={(e: ChangeEvent<HTMLInputElement>) => form.setFieldValue("firstName", e.target.value)} />
                  <TextInput required classNames={{ input: classes.input }} label='Last Name' placeholder='Enter Last Name' value={form.values.lastName} onChange={(e: ChangeEvent<HTMLInputElement>) => form.setFieldValue("lastName", e.target.value)} />
                </Flex>
                <TextInput required classNames={{ input: classes.input }} label='Email' placeholder='Enter Email' value={form.values.email} onChange={(e: ChangeEvent<HTMLInputElement>) => form.setFieldValue("email", e.target.value)} />
              </>
            )}
            <TextInput required classNames={{ input: classes.input }} label='Username' placeholder='Enter Username' value={form.values.username} onChange={(e: ChangeEvent<HTMLInputElement>) => form.setFieldValue("username", e.target.value)} />
            <PasswordInput required classNames={{ input: classes.input }} label='Password' placeholder='Enter Password' value={form.values.password} onChange={(e: ChangeEvent<HTMLInputElement>) => form.setFieldValue("password", e.target.value)} />

            {type === "login" && (
              <Group justify='space-between' mt='lg' gap={30}>
                <Checkbox label='Remember me' color='var(--accent2)' classNames={{ input: classes.checkbox, icon: classes.icon }} />
                <Anchor className={classes.anchor} component='button' size='sm' onClick={handleForgot}>
                  Forgot Password?
                </Anchor>
              </Group>
            )}
            <Button fullWidth variant='filled' color='var(--accent)' type='submit' mt={30}>
              {upperFirst(type)}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
