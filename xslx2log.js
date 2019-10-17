let path = require('path'); //系统路径模块
let fs = require('fs'); //文件模块
let Excel = require('exceljs');

const srcFilePath = "./courses1.xlsx"
const resultFilePath = "./result.md"

let workbook = new Excel.Workbook();
workbook.xlsx.readFile(srcFilePath)
    .then(() => {
        let worksheet = workbook.getWorksheet('courses')
        let needFlag = false
        worksheet._rows.forEach((_row) => {
            let cells = _row._cells
            let value = cells[0] && cells[0].value
            if(value !== null && value!== undefined) {
                if( value === (cells[1] && cells[1].value)) {
                    console.log(']\n},')
                    console.log('{')
                    console.log('\"title\": \"' + value + '\",')
                }
                else if (value === "学习主题") {
                    needFlag = true
                }
                else if (needFlag === true) {
                    needFlag = false
                    console.log('\"targets\": \"' + String(cells[1] && cells[1].value) + '\",')
                    console.log('\"tags\": \"' + String(cells[2] && cells[2].value) + '\",')
                    console.log("\"chapters\": [")
                    console.log('      \"' + value + '\",')
                }
                else console.log('      \"' + value + '\",')
            }
        })
        console.log('}')
    });