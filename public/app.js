document.addEventListener("DOMContentLoaded", () => {
    const app = firebase.app();
    console.log(app);

    function googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                document.getElementById('user-info').textContent = `Hello, ${user.displayName}`;
                console.log(user);
            })
            .catch(error => {
                console.error("Error during sign-in:", error);
            });
    }

    function googleLogout() {
        firebase.auth().signOut()
            .then(() => {
                document.getElementById('user-info').textContent = '';
                console.log("User signed out.");
            })
            .catch(error => {
                console.error("Error during sign-out:", error);
            });
    }

    document.querySelector("button#login").addEventListener("click", googleLogin);
    document.querySelector("button#logout").addEventListener("click", googleLogout);
});
