const fslibary = require('fs')

fslibary.readFile('job applications.txt','utf-8', function read(err, data) {
    if (err) {
        throw err;
        return;
    }

    let applications = JSON.parse(data);

    function updateApplication(obj, companyName, prop, value) {
        let selector = 0;
        let updatedObj = [...obj]
        for (let n = 0; n < updatedObj.length; n++) {
            
                if (updatedObj[n].company == companyName) {
                    selector = 1
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
                            jobTitle: undefined,
                            status: undefined,
                            apprenticeship: undefined  }
            newEntry[prop] = value;
            updatedObj.push(newEntry);
            console.log('Company has been added')
            }
    
        const fsLibrary  = require('fs');
        let data = JSON.stringify(updatedObj);
        fsLibrary.writeFile('job applications.txt', data, (error) => {
        
            if (error) throw err;
        })
        
        return updatedObj;
    } 


    console.log(updateApplication(applications, 'AECOM', 'status', 'rejected'));        

});



