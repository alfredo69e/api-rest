# DSi-Mongoose Auto-Increment


Mongoose plugin for auto-increment number ID.

## Install

```bash
npm install --save dsi-mongoose-auto-increment
```

## Usage

```js
var mongoose = require('mongoose');
var dincrement = require('dsi-mongoose-auto-increment');

//for global:
mongoose.plugin(dincrement);

//for individual model:
CustomSchema.plugin(dincrement);

//for custom property in your model:
CustomSchema.plugin(dincrement, {column: '_ColumnName_'});


```

## License

ISC © [Mushraful Hoque Anik]
