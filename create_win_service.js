#! /usr/bin/env node
var Service = require('node-windows').Service;
var flags = require('flags');

/* Flags */
flags.defineString('name', '', 'The name of the service');
flags.defineString('desc', '', 'The description of the service')
flags.defineBoolean('uninstall', false, 'Uninstall service')
flags.parse();

var uninstall = flags.get('uninstall');
var name = flags.get('name');
var desc = flags.get('desc');
var path = __dirname + "main.js";

if (!name || !path || (!desc && !uninstall)) {
  console.log("You need to provide a name and description!")
} else {
  if (name.search(/[a-z\-]*$/) > 0) {
    console.log("The name has to be charachters and dashes only");
  } else {
    var svc = new Service({
      name: name,
      description: desc,
      script: path,
      env: [{
        name: "USERPROFILE",
        value: process.env["USERPROFILE"] 
      },
      {
        name: "HOME",
        value: process.env["USERPROFILE"]
      }]
    });

    if (!uninstall) {
      svc.install();

    } else {
      svc.uninstall();
    }

    svc.on('install',function(){
      svc.start();
      console.log("Service " + name + ".exe" + " installed");
    });
    
    svc.on('uninstall',function(){
      console.log("Uninstalled.")
      console.log("Now execute in a privileged CMD: 'sc delete " + name + ".exe'")
    });
      
    svc.on('error',function(){
      console.log("Something went wrong!");
    });
      
    svc.on('alreadyinstalled',function(){
      console.log("Service already installed!");
    });
  }
}

  


