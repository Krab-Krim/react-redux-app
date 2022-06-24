import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    taskPost,
    // getPosts,
} from "./store/task";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
    const state = useSelector(getTasks());
    // const post = useSelector(getPosts());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };

    const postTask = () => {
        dispatch(taskPost());
    };

    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    console.log("Index state", state)
    // console.log("Index post", post)

    return (
        <>
            <h1> App</h1>
            <ul>
                {state.map((el) => {
                    return (
                        <li key={el.id}>
                            <p>{el.title}</p>
                            <p> {`Completed: ${el.completed}`}</p>
                            <button onClick={() => dispatch(completeTask(el.id))}>
                                Complete
                            </button>
                            <button onClick={() => changeTitle(el.id)}>
                                Change title
                            </button>
                            <button onClick={() => deleteTask(el.id)}>
                                Delete
                            </button>
                            <hr />
                        </li>
                )})}
            </ul>

            <button onClick={() => postTask()}>
                Post task
            </button>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
