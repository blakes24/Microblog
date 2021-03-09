import { combineReducers } from "redux";
import { posts } from "./posts";
import { titles } from "./titles";
import { loading } from "./loading";
import { error } from "./error";

const rootReducer = combineReducers({ posts, titles, loading, error });

export default rootReducer;
