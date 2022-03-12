/**
Will create a file if not exist and you have to wrt somrthing
if the file already exist only add any data (text).
*/

//Here we are using the fileSystem lib to show it 
const { exists, appendFile, writeFile } = require('fs');

const readline = require('readline');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



terminal.question('Wich File do u want to work with?\n', fileName => {
    //varu
    exists(fileName, (exists) => {
        if (exists) {
            terminal.question('The file already exists! Type something to include\n', text => {
                if (!text) {
                    console.log('Text invalid, try again...')
                    return;
                }
                appendFile(fileName, `${text}\n`, (err) => {
                    if (err) {
                        console.log('Error to add text...')
                        return;
                    }
                    console.log('Process finished sucefully!!')
                    terminal.close()
                })
            })
        }
        else {
            terminal.question('The file doesn`t exist! Type something to include\n', text => {
                if (!text) {
                    console.log('Text invalid, try again...')
                    return;
                }
                writeFile(fileName, `${text}\n`, (err) => {
                    if (err) {
                        console.log('Error to add text...')
                        return;
                    }
                    console.log('Process finished sucefully!!')
                    terminal.close()
                })
            })
        }
    })
})
