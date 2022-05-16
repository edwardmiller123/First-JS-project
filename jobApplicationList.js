const fslibary = require('fs')

fslibary.readFile('job applications.txt','utf-8', function read(err, data) {
    if (err) {
        throw err;
        return;
    }

    let applications = JSON.parse(data);

    function updateApplication(obj, companyName, prop, value) {
        let updatedObj = [...obj]
        let selector = 0
        if (prop == 'delete') {
            
            for (let m = 0; m < updatedObj.length; m++) {
                if (updatedObj[m].company == companyName) {
                    selector = 1;
                    updatedObj.splice(m,1);
                    console.log(companyName + ' has been deleted');

                } else if (prop == 'delete' && selector === 0){
                    console.log('That company is not in the list.');
                    return;
                }
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
            let data = JSON.stringify(updatedObj);
            fsLibrary.writeFile('job applications.txt', data, (error) => {
            
                if (error) throw err;
            })
            
            return updatedObj;
        } 
    
/*
Input a company, property and the value of that property to be added to the list 
Example: updateApplication(_,'new company', 'date', '16/05/22' )
To remove a company: updateApplication(_, 'new company', 'delete', _)
*/

    updateApplication(applications, 'CouchBase', 'Job Title', 'Graduate Software Developer');        

});



