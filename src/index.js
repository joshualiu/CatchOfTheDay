import React, { Component } from "react";
import { render } from "react-dom";
import StorePicker from "./components/StorePicker";
import App from "./components/App";
import Router from "./components/Router";
import "./css/style.css";

render(<Router />, document.querySelector("#main"));
