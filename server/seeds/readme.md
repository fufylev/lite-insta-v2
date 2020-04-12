# DATA BASE 

### Faked DB
This is a faked DB created for the purpose to demonstrate my App with various users and pictures\
All metadata receives from:

* https://randomuser.me/
* https://picsum.photos/

I manually created JSON file and then upload it to the DB\
No real users or personal data.\
Metadata is open for read and write only for authorized users - I must `Sign Up => Sign in` to see the data.
##
### Usage
#### Fake seeds
This script is written on my onw\

#### Usage:
* Download `fakedDataBaseSeeds_v2.js` to your folder
* Run in terminal:
```
cd <folder's path>
node fakedDataBaseSeeds_v2
``` 
* Once script has finished the process in the same folder the file `fakedDB.json` will appear
* You can upload this fake DB to your server DB