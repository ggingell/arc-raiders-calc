# ARC Raiders Calculators

The first and probably only calculator available is one for calculating optimal amount of an item to craft in order to use up whole stacks of each input item. This calculator also provides a compression ratio that helps determine whether to craft immediately or only as needed. The decision ultimately depends on the specific item and your particular play style and needs.

Makes use of data from https://github.com/RaidTheory/arcraiders-data.git.

To regenerate the data, work from the root of this repo and run:

```
git clone https://github.com/RaidTheory/arcraiders-data.git
node map-item-recipe-data.js
```

Code must be served with a proper HTTP server (file:// will not work). If you have python:

```
python -m http.server
```

