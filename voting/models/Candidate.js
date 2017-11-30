let mongoose = require('mongoose');
let CandidateSchema = new mongoose.Schema({
  name: String,
  votes: {type:Number,default: 0}
});

CandidateSchema.methods.incvote = function(cb) {
  this.votes += 1;
  this.save(cb);
};
mongoose.model('Candidate', CandidateSchema);
