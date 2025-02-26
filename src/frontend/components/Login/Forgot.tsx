import React from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Box, Button, Center, Container, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import classes from "./login.module.css";
import { IconArrowLeft } from "@tabler/icons-react";

const Forgot: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container size={420} my={30}>
      <Title ta='center' className={classes.title}>
        Forgot your Password?
      </Title>
      <Text c='dimmed' fz='sm' ta='center'>
        Enter your email to reset your password.
      </Text>

      <Paper withBorder className={classes.paper} shadow='md' radius='md' bg='var(--form)' p={30} mt='xl'>
        <TextInput required classNames={{ input: classes.input }} label='Email' placeholder='Enter your email' />
        <Group justify='space-between' mt='lg' className={classes.controls}>
          <Anchor c='dimmed' size='sm' className={classes.control} onClick={handleCancel}>
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to Login</Box>
            </Center>
          </Anchor>
          <Button variant='filled' color='var(--accent)' type='submit'>
            Reset Password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default Forgot;
