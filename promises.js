/*Will create a file if not exist and you have to wrt somrthing
if the file already exist only add any data (text).
*/
//Here we are using the fileSystem lib to show it 
const { existsSync, appendFile, writeFile } = require('fs');
//promissify to turn funcs that work with callbacks in promises
const { promisify } = require('util');
//passing the callback parameter, to the promise parameter
const writeFileAsync = promisify(writeFile);
const appendFileAsync = promisify(appendFile);
const readline = require('readline');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*Here we had to add this because the terminal question variable
was written in a wrong callback way w the value before the error
and w that we couldnt use promisify to turn it in a promise var*/
const functionToPromise = (func, ...args) => {
/*it will work in the following way, u can pass the func and it will
return the arguments list, and we`ll work with them, doesnt matter how
many it is, only matters that we know that the first is a func*/
    return new Promise(resolve => func(...args, resolve))
    //spreading the paremeters and passing the value as resolve like the callback to catch the right data
}

/*if the first parameter in the callback was error
we would only using it, referencing the variable escope*/
const questionFunc = terminal.question.bind(terminal);
/*when the question async be called will pass a msg as parameter
ans start a promise*/
const questionAsync =  msg => functionToPromise(questionFunc, `${msg}`);

//Here we´re using promises w asyncFunc, to turn the code clearer 
//inside a closure for autoCall itself 
(async function mainFunc() {
    try {
        const fileName = await questionAsync('Wich File do u want to work with ?');
        const text = await questionAsync ('Type something to include: ');
        const fileExists = existsSync(fileName)
        //Getting everything we want to know, now I`ll check if exists
        if(fileExists) {
            await appendFileAsync(fileName, `/n${text}`);
            console.log(`${text} added to ${fileName}`)
        }
        await writeFileAsync(fileName, text);
    } catch(err) {
    console.log('Ops, something happened')
    }/*here is the first line that we added, when the promise is over sucefully
    or with an error will call the last step that is finally*/
    finally {
        console.log('Process finished sucefully!!')
        terminal.close()
    }
})();


/**
Creates a file if not exist and adds a text
Has to add any data (text) if the file exists


//Here we are using the fileSystem lib to show it 
const { exists, appendFile, writeFile } = require('fs');

const readline = require('readline');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
terminal.question('Wich File do u want to work with?\n', fileName => {
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
*/
