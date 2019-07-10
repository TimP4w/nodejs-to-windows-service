# NodeJS to Windows Service

## Usage (with NestJS): 
Put `create_win_service.js` and `package.json` inside the dist folder where the `main.js` file is located

### In CMD
`npm install` 
\
and then `node create_win_service.js [args]` 


### Args
* --name: [a-z] separated with dashes (*required*)
* --desc: description of the service (*required without the uninstall flag*)
* --uninstall: set this flag if you want to uninstall the service 


