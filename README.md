## About the App

The app is meant for the cyclists and displays data that might be relevant to them. It shows bicycle paths in Copenhagen area on a mapbox map. The data for the paths is fetched from the Copenhagen Municipality. The line chart on the top left corner shows the hourly wind speed for the next 12h at the location chosen by the user by clicking on the map. The data is fetched from the Norwegian Meteorological Institute.

### Technical decisions

From a technical perspective the app is very simple and uses the basic fetch method for data fetching in the useEffect hook. Then the data is saved in the state with useState hook. The coordinates of a user click are retrieved from the click event, saved in the state and passed to the data uri as parameters for retrieving weather data. The data fetch error and loading are handled and clear visual indications are shown to the user without breaking the layout of the rest of the app.

### Design decisions

The main idea of the design was to follow the regular and recognizable conventions of map data visualization. The few colors that were used were chosen to match the color theme of the map and by making sure the elements are visible, stand out, but are still aesthetically pleasing. The circle marker is showing the location of the user click.

### Improvements

The institute provides a wide variety of weather data and the app could be extended by first of all adding the wind direction, which is important for cyclists, as well as weather temperature and precipitation. Making the app mobile friendly and fully responsive and adding tests would also be a priority.


## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
