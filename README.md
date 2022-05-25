# First-JS-project
Reads and updates job application list from txt file e.g company, date , any properties you want to add etc

Input a file to write to, a company, a property and the value of that property to be added to the list 

Example: updateApplication('list.txt','new company', 'date', '16/05/22' )

To remove a company: updateApplication('list.txt', 'new company', 'delete', _)

To query a property: updateApplication('list.txt', 'new company', 'property you want', '?')

To query all info on company application: updateApplication('list.txt', 'new company', 'anything other than delete', '??')

To query whole list: updateApplication('list.txt', '?', '?', '?')

For total number of applications: updateApplication('list.txt', 'total', 'anything', 'anything') 

Text file must be in form [].
