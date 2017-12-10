var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
  Name:{
    type: String,
    trim: true,
    required: true
  },
  Sequence:{
    type: Number,
    required: false
  }
});

function init(schema,options){
    if(!options || !options.column){
        if(!schema.hasOwnProperty('_id'))
            schema.add({_id:{type: Number,unique:true}});
    }
}

var Counter = mongoose.model('Counter',counterSchema);

module.exports = function autoIncrementPlugin(schema, options){

  init(schema,options);

  schema.pre('save', function(next){
    var doc = this;
    Counter.findOneAndUpdate({Name: doc.constructor.collection.name}, {$inc:{Sequence:1}, Name: doc.constructor.collection.name}, {upsert: true}, function(err, counter){
      if(err)
        return next(err);
      if(!options || !options.column)
          options = {column: '_id'};
      doc[options.column] = (!counter || !counter.Sequence)? 0:counter.Sequence;
      next();
    });
  });

}

