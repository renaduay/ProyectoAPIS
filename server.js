import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js";



const __dirname = fs.realpathSync('.');

class NewspaperBackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    this._auth = new Authorization(app);

    app.get('/lookup/:title', this._doLookup);
    app.post('/save/', this._doSave);
    app.get('/login/', this._login);
    app.get('/auth/google/', passport.authenticate('google', {
      scope: ['email', 'profile']
    }));
    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
    app.get('/', this._auth.checkAuthenticated, this._goHome);

    app.post("/logout", (req, res) => {
      req.logOut(err => console.log(err));
      res.redirect("/login");

      app.get("/news", (req, res) => {
        fetch("https://www.mockachino.com/220cebc5-2bc2-49/news")
        .then(response => response.json())
        .then(data => {
          res.jsonStringify(data);
        })
      })
    });

    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  }

  async _doLookup(req, res) {
    const routeParams = req.params;
    const title = routeParams.title;

}

async _doSave(req, res) {


}
}


new NewspaperBackendServer();
