const request = require('request');
const fs = require('fs');
const path = require('path');

const args = process.argv;
const url = args[2];
const fileName = path.basename(args[3]);
const pathName = path.dirname(args[3]);
const fullPath = args[3];

fs.access(pathName, function(error) {
  if (error) {
    console.log("Directory does not exist. Run this program again to retry.");
  } else {
    console.log("Directory exists.");
    request(url, (error, response, body) => {  
    if (!response || error) {
      console.log(`There was an error or no response from the server. Request unsuccessful`);
    } else if (response.statusCode !== 200) {
        console.log(`There was a response but it wasn't successful. Status code: ${response.statusCode}`);
    } else {
        fs.writeFile(fullPath, body, (err) => {
          if (err) throw err;
          console.log(`Downloaded and saved ${fs.statSync(fullPath).size} bytes to ${fullPath}`);
        });
    }
    });
  }
});
