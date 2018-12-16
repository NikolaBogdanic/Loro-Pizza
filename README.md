<p align="center">
  <img src="https://angular.club/assets/images/loro-pizza-header-logo.svg" width="600px">
</p>
<br/>

## Getting Started

1. Download the latest version of [Node.js](https://nodejs.org/en/download/) and install it.

2. Open the terminal and install Angular CLI:

```bash
npm install - g @angular/cli
```

3. `cd` into the directory in which you will clone the repository.

4. Clone the repository:

```bash
git clone https://github.com/NikolaBogdanic/Loro-Pizza.git
```

5. Install all the required dependencies:

```bash
npm install
```

6. Add new project to your [Firebase Console](https://console.firebase.google.com/)

7. Click on the <b>Add Firebase to your web app</b> button and copy all the properties inside the <b>config</b> object.

8. Paste the properties to <b>firebaseConfig</b> object inside the <b>environment.ts</b> file.

9. Click on the <b>Set up sign-in method</b> button inside the Authentication section of the Firebase.

10. Enable both options inside the <b>Email/Password</b> provider and click Save.

11. Click on the <b>Create database</b> button inside the Database section of the Firebase.

12. Add the <b>toppings</b> collection and following documents to it:

```bash
toppings: {
    { displayName: "Pepperoni", name: "pepperoni", timestamp: 0000000000001 },
    { displayName: "Basil", name: "basil", timestamp: 0000000000002 },
    { displayName: "Bacon", name: "bacon", timestamp: 0000000000003 },
    { displayName: "Mozzarella", name: "mozzarella", timestamp: 0000000000004 },
    { displayName: "Chili", name: "chili", timestamp: 0000000000005 },
    { displayName: "Olive", name: "olive", timestamp: 0000000000006 },
    { displayName: "Prosciutto", name: "prosciutto", timestamp: 0000000000007 },
    { displayName: "Cherry tomato", name: "cherry-tomato", timestamp: 0000000000008 },
    { displayName: "Corn", name: "corn", timestamp: 0000000000009 },
    { displayName: "Mushroom", name: "mushroom", timestamp: 0000000000010 },
    { displayName: "Onion", name: "onion", timestamp: 0000000000011 },
    { displayName: "Tomato sauce", name: "tomato-sauce", timestamp: 0000000000012 }
}
```

13. Inside Database rules change the 4th line of code to:

```bash
allow read, write: if request.auth.id != null;
```

You can also checkout the <b>[Demo](http://angular.club)</b>.

Have fun! :pizza:
