const fs = require('fs');
const csv=require('csvtojson');
const mkdirp = require('mkdirp');

const dir = './';
const outputDir = './output/';
mkdirp.sync(outputDir);

const writeFile = ({fileName, fileContent}) => {
    fs.writeFile(fileName, fileContent, function (err) {
        if (err) return console.log(err);
    });
};

fs.readdir(dir, (err, files) => {
    if (err) {
        throw err;
    }

    files.filter(x => x.replace('.csv') !== x).forEach(file => {
        csv()
        .fromFile(file)
        .then((jsonObjArr)=>{
            console.log(jsonObjArr);

            const [json] = jsonObjArr;
            const jsonString = JSON.stringify(json);

            const fileName = `${outputDir}/${file.replace('.csv', '.json')}`;
            const fileContent = jsonString;
            writeFile({ fileName, fileContent });
        })
    });
});



