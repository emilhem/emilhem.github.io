
const fs = require('fs');

fs.mkdir('build', (err) => {
  if(err) throw err;
  console.log('dir build created');
  fs.writeFile('./build/testing.html', `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Testing</title>
</head>
<body>
  <h1>Testing</h1>
</body>
</html>
`, (err) => {
    if(err) throw err;
    console.log('file created');
  });
});
