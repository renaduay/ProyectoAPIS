class Login {
    constructor() {
      const loginForm = document.querySelector('#login-form');
      this._doLogin = this._doLogin.bind(this);
      loginForm.addEventListener('submit', this._doLogin);
    }
  
    _doLogin(event) {
      event.preventDefault();
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
  
      const loginBody = {
        username: username,
        password: password
      };
  
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody)
      };
  
      return fetch('/login/', fetchOptions)
        .then(user => (window.location.href = '/'));
    }
  }
  
  const login = new Login();
  