var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('voter.html', { root: 'public' });
});

router.get('/admin', function(req, res, next) {
  res.sendFile('admin.html', { root: 'public' })
});

router.get('/candidates', function(req,res,next) {
  Candidate.find(function(err, candidates) {
    if (err) return next(err);
    console.log(candidates);
    res.json(candidates);
  })
});

router.param('candidate', function(req, res, next, id) {
  var query = Candidate.findById(id);
  query.exec(function(err, candidate) {
    if (err) return next(err);
    if (!candidate) return next(new Error("Can't find candidate"));
    req.candidate = candidate;
    console.log('candidate found');
    return next()
  });
});

router.post('/candidate', function(req, res, next) {
  var candidate = new Candidate({
    name: req.body.name,
    votes: 0
  });
  candidate.save(function(err, candidate) {
    if (err) return next(err);
    console.log('new candidate saved');
    res.json(candidate)
  });
});

router.put('/:candidate/upvote', function(req, res, next) {
  //upvote a candidate
  req.candidate.incvote(function(err, candidate) {
    if (err) return next(err);
    res.json(candidate);
  });
});

router.delete('/:candidate', function(req, res, next) {
  //delete a candidate
  Candidate.remove({_id:req.candidate._id}, function(err) {
    if (err) return next(err);
    res.sendStatus(200);
  })
});

module.exports = router;
