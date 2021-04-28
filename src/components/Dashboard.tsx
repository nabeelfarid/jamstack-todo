import React, { Reducer, useContext, useReducer } from "react";
import { RouteComponentProps } from "@reach/router";
import { IdentityContext } from "../../IdentityContextProvider";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikMuiTextField from "./FormikMuiTextField";
import { Button, IconButton } from "gatsby-theme-material-ui";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

enum TodoActionTypes {
  ADD_Todo = "ADD_Todo",
  TOGGLE_Todo = "TOGGLE_Todo",
}

interface TodoReducerAction {
  type: TodoActionTypes;
  payload: Todo;
}

const TodoReducer: Reducer<Todo[], TodoReducerAction> = (state, action) => {
  switch (action.type) {
    case TodoActionTypes.ADD_Todo: {
      return [...state, action.payload as Todo];
    }
    case TodoActionTypes.TOGGLE_Todo: {
      const newState = state.filter((trans) => trans.id !== action.payload.id);
      let todo = state.find((trans) => trans.id === action.payload.id);
      if (todo) {
        todo = { ...todo, done: !todo.done };
      }
      newState.push(todo);
      return newState;
    }
    default:
      return state;
  }
};

const Dashboard = (props: RouteComponentProps) => {
  const { user, identity } = useContext(IdentityContext);
  const [todos, dispatch] = useReducer(TodoReducer, []);

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
      const newId = todos.length == 0 ? 0 : todos[todos.length - 1].id + 1;
      dispatch({
        type: TodoActionTypes.ADD_Todo,
        payload: { id: newId, title: values.title, done: values.done },
      });
      formikHelpers.resetForm();
    } catch (error) {
      console.log("Create/Edit Todo", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleToggle = (todo: Todo) => {
    console.log(todo);
    dispatch({
      type: TodoActionTypes.TOGGLE_Todo,
      payload: todo,
    });
  };

  console.log(todos);

  return (
    <>
      <Box mt={2}>
        <Formik
          initialValues={{ title: "", done: false }}
          validationSchema={Yup.object({
            title: Yup.string().strict().trim().required().min(1).max(50),
          })}
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
                      props.isSubmitting && <CircularProgress size="1rem" />
                    }
                    disabled={props.isSubmitting}
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
      {todos && todos.length > 0 && (
        <Box mt={2}>
          <Card variant="outlined">
            <CardContent>
              <List>
                {[...todos]
                  .sort((a, b) => b.id - a.id)
                  .map((todo, index) => (
                    <React.Fragment key={`Todo-${todo.id}`}>
                      <ListItem
                        key={`ListItem-${todo.id}`}
                        button
                        dense
                        onClick={() => {
                          handleToggle(todo);
                        }}
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
                      {index < todos.length - 1 && (
                        <Divider
                          variant="fullWidth"
                          component="li"
                          key={`Divider-${todo.id}`}
                        />
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
