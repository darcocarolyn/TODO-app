# todo-app

This is a React Native app that displays a task list which allows users to add, edit, delete and mark tasks as completed or not. It consists of 3 screens, the Login screen, the Register screen, and the TODO screen which contains the app itself. 

The Login screen has two input fields, one for the username and another for the password, where the user can enter their login credentials. If the user enters incorrect login credentials, an error message will be displayed below the login button, informing them that the username or password is incorrect. If the user doesn’t have login credentials, they can press the Register button, which will navigate the user to the Register screen where they can create a new account. If the user successfully logs in, the component navigates to the TODO App screen.

The Register screen allows users to input their personal information and register a new account. The component has form validation logic to ensure that user inputs are valid. If any of the inputs are validated as incorrect on the onBlur function, an error message will appear and will stay there until the user inputs the correct information. If the form has been successfully submitted once they press Register, a success message will show and the user can navigate back to the Login screen and login using their username and password.

As mentioned earlier, the TODO screen allows users to add, edit, delete and mark tasks as completed or not. They can also filter their to-do list by selecting the buttons: All, Completed, or Not Completed, which will filter the items accordingly based on the completed boolean, or they can search in the filter bar which will show any items that contain the same characters that the user inputs in the text field. In addition, the app displays the username of the user’s account and the current date to help the user keep track of their todo list. There is also a Sign Out button which will return the user to the Login screen.

