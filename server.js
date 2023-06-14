
import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js";
import fetch from 'node-fetch';  

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
    });

    /*app.post("/goNews", (req, res) => {
      req.logOut(err => console.log(err));
      res.redirect("/news");
    });*/
      

      app.get("/news", (req, res) => { 
        res.sendFile(path.join(__dirname, "public/news.html"));
      })

      app.get("/allNews", (req, res) => { 
        fetch("https://www.mockachino.com/220cebc5-2bc2-49/news")
        .then(response => response.json())
        .then(data => {
          res.json(data);  
        })
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
}

new NewspaperBackendServer();