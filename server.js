import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js"

const __dirname = fs.realpathSync('.');

//////////git//////////////////////////////////////////////////////////////////////
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
    app.get('/auth/google/',
      passport.authenticate('google', {
        scope: ['email', 'profile']
      }));
    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
    app.get('/', this._auth.checkAuthenticated, this._goHome);

    app.post("/logout", (req,res) => {
      req.logOut(err=>console.log(err));
      res.redirect("/login");
   })
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
    const query = { title: title.toLowerCase() };
    const collection = db.collection("dict");
    const stored = await collection.findOne(query);
    const response = {
      title: title,
      news: stored ? stored.news : ''
    };
    res.json(response);
  }

  async _doSave(req, res) {
    const query = { title: req.body.title.toLowerCase() };
    const update = { $set: { news: req.body.news } };
    const params = { upsert: true };
    const collection = db.collection("dict");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }
/*
  app.get("/countries", (req, res) => { /countries.
    // Make a request to the Mockacino API.
    fetch("https://www.mockachino.com/3c95beca-4ca8-41/countries") // Acá iría su endpoint creado en Mockachino.
      .then(response => response.json())
      .then(data => {
        // Return the data from the Mockachino API.
        res.json(data); // Acá escriben en la respuesta del request de su frontend, la respuesta que vino de Mockachino
      });
  });
  */
}



new NewspaperBackendServer();
