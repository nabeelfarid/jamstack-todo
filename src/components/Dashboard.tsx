import React, { useContext, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { IdentityContext } from "../utils/IdentityContextProvider";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikMuiTextField from "./FormikMuiTextField";
import { Button } from "gatsby-theme-material-ui";
import { gql, useMutation, useQuery } from "@apollo/client";
import Error from "./Error";
import Loader from "./Loader";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      done
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      id
      title
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      done
    }
  }
`;

const Dashboard = (props: RouteComponentProps) => {
  const { user, identity } = useContext(IdentityContext);
  const [addTodo, { loading: addTodoLoading }] = useMutation(ADD_TODO);
  const [updateTodoDone, { loading: updateTodoDoneLoading }] = useMutation(
    UPDATE_TODO_DONE
  );
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const handleCreateTodo = async (
    values: {
      title: string;
      done: boolean;
    },
    formikHelpers: FormikHelpers<{
      title: string;
      done: boolean;
    }>
  ) => {
    try {
      await addTodo({ variables: { title: values.title } });
      formikHelpers.resetForm();
      await refetch();
    } catch (error) {
      console.log("Create/Edit Todo", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleToggle = async (todo: Todo) => {
    await updateTodoDone({ variables: { id: todo.id } });
  };

  return (
    <>
      <Box mt={2}>
        <Formik
          initialValues={{ title: "", done: false }}
          validationSchema={Yup.object({
            title: Yup.string().trim().required().min(1).max(50),
          })}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleCreateTodo}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2} justify="center" alignItems="stretch">
                <Grid item xs={6}>
                  <FormikMuiTextField
                    name="title"
                    label="Add Todo"
                    variant="outlined"
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    startIcon={
                      props.isSubmitting && (
                        <CircularProgress color="secondary" size="1rem" />
                      )
                    }
                    disabled={props.isSubmitting || addTodoLoading}
                    style={{ height: "100%" }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>

              {/* <hr />
              <pre>{JSON.stringify(props.errors, null, 4)}</pre>
              <pre>{JSON.stringify(props.values, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </Box>
      {error && <Error error={error} />}
      {loading && <Loader />}
      {data && data.todos.length > 0 && (
        <Box mt={2}>
          <Card variant="outlined">
            <CardContent>
              <List>
                {data.todos
                  // .sort((a, b) => b.id - a.id)
                  .map((todo, index) => (
                    <React.Fragment key={`Todo-${todo.id}`}>
                      <ListItem
                        key={`ListItem-${todo.id}`}
                        button
                        dense
                        onClick={() => {
                          setSelectedTodo(todo);
                          handleToggle(todo);
                        }}
                        disabled={updateTodoDoneLoading}
                      >
                        <ListItemIcon>
                          <Checkbox
                            color="primary"
                            edge="start"
                            checked={todo.done}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": todo.id.toString(),
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={todo.title} />
                      </ListItem>
                      {updateTodoDoneLoading &&
                      selectedTodo &&
                      selectedTodo.id === todo.id ? (
                        <LinearProgress color="secondary" />
                      ) : (
                        index < data.todos.length - 1 && (
                          <Divider
                            variant="fullWidth"
                            component="li"
                            key={`Divider-${todo.id}`}
                          />
                        )
                      )}
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
