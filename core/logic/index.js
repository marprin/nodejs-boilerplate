'use stric';

const fs = require('fs');
const logicPath = './logic';

checkIsFileOrDirectory = (path) => {
	fs.readdir(path, (err, filenames) => {
		if(err){
			console.error(err);
			return;
		}

		for(let file of filenames){
			let currentLoop = `${path}/${file}`;
			checkFile = fs.lstatSync(currentLoop);
			console.log(__dirname);
			
			if(checkFile.isFile()){
				fs.readdir(`${__dirname}/../.${currentLoop}`, (err, file) => {
					console.log(err);
					console.log(file);
				});
				//require(currentLoop);
			}else if(checkFile.isDirectory()){
				checkIsFileOrDirectory(currentLoop);
			}
		}

	});
}

checkIsFileOrDirectory(logicPath);