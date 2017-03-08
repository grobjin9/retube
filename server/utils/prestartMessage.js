const colors = require('colors/safe');
const { NODE_ENV, PORT } = process.env;

const mode = NODE_ENV === 'production' ? 'production' : 'development';
const port = PORT ? PORT : 3000;

console.log(colors.green(`PORT ${port}: the app has been launched in ${mode} mode...`));