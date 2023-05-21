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
    
    const apiKey = 'b4741c10237d470898eac3698ae142a9';
    const url = `https://newsapi.org/v2/everything?q=${title}&language=es&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const articles = data.articles.map(article => ({
        title: article.title,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source,
        url: article.url
      }));

      const responseData = {
        title: title,
        news: articles
      };

      res.json(responseData);
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
      res.status(500).json({ error: 'Error al obtener las noticias' });
    }
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
