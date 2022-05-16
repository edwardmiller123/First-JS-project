updateApplication('job applications.txt', 'new company', 'date', '16/05/22'); 

/*
Input a file to write to, a company, a property and the value of that property to be added to the list 
Example: updateApplication('list.txt','new company', 'date', '16/05/22' )
To remove a company: updateApplication('list.txt', 'new company', 'delete', _)
Text file must be in form [].
*/

function updateApplication(file, companyName, prop, value) {

    const fslibary = require('fs')

    fslibary.readFile(file,'utf-8', function read(err, data1) {
        if (err) {
            throw err;
            return;
        }
            let updatedObj = [...JSON.parse(data1)]
            let selector = 0
            if (prop == 'delete') {
                
                for (let m = 0; m < updatedObj.length; m++) {
                    if (updatedObj[m].company == companyName) {
                        selector = 1;
                        updatedObj.splice(m,1);
                        console.log(companyName + ' has been deleted');
                    }
                }
                if (prop == 'delete' && selector === 0){
                    console.log('That company is not in the list.');
                    return;
                }
            } else {
                for (let n = 0; n < updatedObj.length; n++) {
                    
                        if (updatedObj[n].company == companyName) {
                            selector = 2;
                            if (updatedObj[n][prop] === undefined || updatedObj[n].hasOwnProperty(prop) == false ) {
                                updatedObj[n][prop] = value;
                                console.log(companyName + ' application has been updated')
                            } else {
                                console.log(prop + ' has value ' + updatedObj[n][prop]);
                            }
                            } 
                }
                if (selector == 0) {
                    let newEntry = {company: companyName,
                                    recruiter: undefined,
                                    date: undefined,
                                    'Job Title': undefined,
                                    status: undefined,
                                    apprenticeship: undefined  }
                    newEntry[prop] = value;
                    updatedObj.push(newEntry);
                    console.log('Company has been added')
                    }
                }
                const fsLibrary  = require('fs');
                let data2 = JSON.stringify(updatedObj);
                fsLibrary.writeFile(file, data2, (error) => {
                
                    if (error) throw err;
                })
                
                return updatedObj;
    });
}


