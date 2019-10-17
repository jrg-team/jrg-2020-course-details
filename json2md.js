#!/usr/bin/env node

let fs = require('fs'); //文件模块
let srcFilePath = (process.argv[2] && String(process.argv[2])) || "./courses.json"
let data = JSON.parse(fs.readFileSync(srcFilePath));

const resultFilePath = `./results/result.md`

let printTags = (tags, separator) => {
    let storeTags = tags
    if (typeof tags === 'string') storeTags = tags.split(separator)
    return storeTags.map(tag => tag + '<br/>')
}
 
let courseMap = (course) => {
    datapayload = `<table border=1>
    <thead>
        <tr>
            <th colspan="3">${course.title}</th>
        </tr>
    </thead>
    <tbody>`
    course.chapters.forEach((chapter, index) => {
        if (index === 0)
            datapayload += `
    <tr>
        <td>${chapter}</td>
        <td rowspan="${course.chapters.length}">${course.targets}</td>
        <td rowspan="${course.chapters.length}">${printTags(course.tags)}</td>
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
    datapayload += `</tbody>
</table>\r\n\r\n`
    fs.appendFileSync(resultFilePath, datapayload, (err) => {
        if (err) throw err;
    })
}
let projectMap = (project) => {
    datapayload = `#### ${project.projectTitile} \r\n\r\n`
    if (project.targets) datapayload += `${project.targets}\r\n\r\n`
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