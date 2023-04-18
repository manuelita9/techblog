const express = require('express');
const router = express.Router();
const { Post, User } = require('./../models');
const withAuth = require('./../utils/auth');


router.get('/', (req, res) => {
    res.render('homepage');
  });
  
 