/* eslint-disable */
import { Navigation } from "react-native-navigation";
import { ReduxComponent } from "redux/_root";

// Add all included modules in here
export function registerStackComponents() {
  registerModule({ Home })
  registerModule({ Profile })
  registerModule({ Overlays })
  registerModule({ About })
  registerModule({ DataEntry })

  info("finished");
}

// Define all modules and their components here
const Overlays = [
  { id: "AppStatus", component: require("lib/overlays/AppStatus") }
];

const About = [{ id: "About", component: require("scenes/About/About") }];

const Profile = [
  { id: "Login", component: require("scenes/Profile/Login") },
  { id: "Signup", component: require("scenes/Profile/Signup") },
  { id: "View", component: require("scenes/Profile/View") },
  { id: "Menu", component: require("scenes/Profile/Menu") },
  { id: "Edit", component: require("scenes/Profile/Edit") }
];

const Home = [
  { id: "Home", component: require("scenes/Home/Home") },
  { id: "TimeLine", component: require("scenes/Home/TimeLine") },
  { id: "Insights", component: require("scenes/Home/Insights") },
  { id: "Calendar", component: require("scenes/Home/Calendar") },
  { id: "Mood", component: require("scenes/DataEntry/Mood") }, // FIXME remove from here, use DataEntry below
  {
    id: "FeelingAddEdit",
    component: require("scenes/DataEntry/FeelingAddEdit")
  }
];

const DataEntry = [
  { id: 'Mood', component: require('scenes/DataEntry/Mood') },
  { id: 'Food', component: require('scenes/DataEntry/Food') },
  { id: 'Difficulties', component: require('scenes/DataEntry/Difficulties') },
  { id: 'Significant', component: require('scenes/DataEntry/Significant') },
  { id: 'SignificantEventsInput', component: require('scenes/DataEntry/SignificantEventsInput') },
]

// loops and registers everything
async function registerModule(object) {
  const key = Object.keys(object)[0];
  const array = object[key];
  for (const a in array) {
    const id = String(key) + '.' + array[a].id // make all components accessible through Module.Component
    const Component = array[a].component.default
    Navigation.registerComponent(
      id, 
      () => (props) => ReduxComponent(Component, props), 
      () => Component
    )
  }
}
