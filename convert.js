let path = require('path'); //系统路径模块
let fs = require('fs'); //文件模块

let data = JSON.parse(fs.readFileSync('./courses.json'));

const resultFilePath = "./result.md"

let courseMap = (course) => {
    datapayload = `<table>
    <tr>
        <td colspan="3">${course.title}</td>
    </tr>`
    course.chapters.forEach((chapter, index) => {
        if (index === 0)
            datapayload += `
    <tr>
        <td>${chapter}</td>
        <td rowspan="${course.chapters.length}">${course.targets}</td>
        <td rowspan="${course.chapters.length}">${course.tags.map(tag => tag + '<br/>')}</td>
    </tr>
    `
        else{
            datapayload += 
    `<tr>
        <td>${chapter}</td>
    </tr>
    `
        }
            
    })
    datapayload += '</table>\r\n\r\n'
    fs.appendFileSync(resultFilePath, datapayload, (err) => {
        if (err) throw err;
    })
}
let projectMap = (project) => {
    datapayload = `## ${project.projectTitile} \r\n\r\n`
    if (project.targets) datapayload += `#### ${project.targets}\r\n\r\n`
    fs.appendFileSync(resultFilePath, datapayload, (err) => {
        if (err) throw err;
    })
    project.lessons.forEach(courseMap)
}

fs.exists(resultFilePath, (exists) => {
    if (exists) {
        fs.unlink(resultFilePath, (err) => {
            if (err) {
                throw err;
            }
            console.log('文件: 重置成功！');
            data['system-list'].forEach(courseMap);
            data['project-list'].forEach(projectMap);
        })
    } else {
        data['system-list'].forEach(courseMap);
        data['project-list'].forEach(projectMap);
    }
});