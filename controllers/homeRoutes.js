const express = require('express');
const router = express.Router();
const { Post, User } = require('./../models');
const withAuth = require('./../utils/auth');


router.get('/', (req, res) => {
    res.render('homepage');
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/blog', withAuth, async (req, res) => {
    try {
      // Get all the posts from the Post table, including the associated user
      const posts = await Post.findAll({ include: User });
  
   