let Excel = require('exceljs');

const srcFilePath = (process.argv[2] && String(process.argv[2])) || "./courses.xlsx"

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