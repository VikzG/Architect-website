    /* Formulaire de connexion */

    function login(email, password) {
        fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Une erreur est survenue");
          })
          .then(data => {
            localStorage.setItem('jwtToken',data.token);
            console.log(data);
            window.location.href = "index_admin.html";
          })
          .catch(error => {
            console.error(error);
            alert("Adresse e-mail ou mot de passe incorrect");
          });
      }
      
      document.getElementById("form-log").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
      });
      
      
      