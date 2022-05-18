updateApplication("job applications.txt", "new company", "date", "18/05/22");

/*
Input a file to write to, a company, a property and the value of that property to be added to the list 
Example: updateApplication('list.txt','new company', 'date', '16/05/22' )
To remove a company: updateApplication('list.txt', 'new company', 'delete', _)
To query a property: updateApplication('list.txt', 'new company', 'property you want', '?')
To query all info on company application: updateApplication('list.txt', 'new company', 'anything other than delete', '??')
To query whole list: updateApplication('list.txt', '?', '?', '?')
Text file must be in form [].
*/

function updateApplication(file, companyName, prop, value) {
  const fslibary = require("fs");
  let regex1 = /[a-z]|^\?$/;
  let regex2 = /^\?$|^\?\?$|\w+|[\d+\/\d+\/\d+]/;
  let regex3 = /^\?$/;
  if (regex1.test(prop) == true && regex2.test(value) == true) {
    fslibary.readFile(file, "utf-8", function read(err, data1) {
      if (err) {
        throw err;
        return;
      }
      let updatedObj = [...JSON.parse(data1)];
      let selector = 0;
      if (companyName == "?" && prop == "?" && value == "?") {
        console.log(updatedObj);
      } else {
        if (prop == "delete") {
          for (let m = 0; m < updatedObj.length; m++) {
            if (updatedObj[m].company == companyName) {
              selector = 1;
              updatedObj.splice(m, 1);
              console.log(companyName + " has been deleted");
            }
          }
          if (prop == "delete" && selector === 0) {
            console.log("That company is not in the list.");
            return;
          }
        } else {
          for (let n = 0; n < updatedObj.length; n++) {
            if (updatedObj[n].company == companyName) {
              selector = 2;
              if (value == "delete") {
                updatedObj[n][prop] = undefined;
                console.log(prop + " has been removed");
              } else if (
                ((updatedObj[n][prop] === undefined ||
                  updatedObj[n].hasOwnProperty(prop) == false) &&
                  regex3.test(prop) == false) ||
                (updatedObj[n][prop] != value && value != "?" && value != "??")
              ) {
                updatedObj[n][prop] = value;
                console.log(companyName + " application has been updated");
              } else if (value == "?" || value == updatedObj[n][prop]) {
                //fix here when value of prop is unefined
                console.log(prop + " has value " + updatedObj[n][prop]);
                return;
              } else if (value == "??") {
                console.log(updatedObj[n]);
                return updatedObj[n];
              }
            }
          }
          if (
            selector == 0 &&
            value != "?" &&
            value != "??" &&
            value != "delete"
          ) {
            let newEntry = {
              company: companyName,
              recruiter: undefined,
              date: undefined,
              jobTitle: undefined,
              status: undefined,
              apprenticeship: undefined,
            };
            newEntry[prop] = value;
            updatedObj.push(newEntry);
            console.log("Company has been added");
          } else if (
            selector == 0 &&
            (value == "?" || value == "??" || value == "delete")
          ) {
            console.log("That company is not in the list.");
            return;
          }
        }
        let data2 = JSON.stringify(updatedObj);
        const fsLibrary = require("fs");
        fsLibrary.writeFile(file, data2, (error) => {
          if (error) throw err;
        });

        return updatedObj;
      }
    });
  } else {
    console.log("Wrong format.");
    return;
  }
}
