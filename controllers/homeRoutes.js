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
  
      // Render the blog page with the posts as bootstrap cards
      res.render('blogpage', { 
        posts: posts.map(post => ({
          id: post.id,
          textContent: post.textContent,
          date: post.date,
          time: post.time,
          userName: post.User?.name
        }))
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

router.post('/blog', withAuth, async (req, res) => {
try {
  // Create a new post with the current user's ID
  await Post.create({
    textContent: req.body.textContent,
    userId: req.session.user_id
  });

  // Redirect back to the blog page
  res.redirect('/blog');
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});

module.exports = router;