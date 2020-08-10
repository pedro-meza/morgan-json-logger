#### using library ####
    // in the express app.js

    var express = require('express');
    var app = express();   
    
    var morgan = require('morgan'); 
    const nodejsLogger = require('nodejs-logger');

    const overrideValues =  {
      url: ':url',
      status: ':status'
    }
    // CONSTRUCTOR 
    // let nodeJSLogger = new NodeJSLogger(app-name, morgan, skipUrlList, overrideValues);

    let logger = new NodeJSLogger(
            'test-app',
            morgan,
            ['/v5/test-app/management/health','/v5/test-app/properties'],
            overridValues)
        );
    app.use(logger.getMorgan());
    
#### Output ####

    {"date":"2020-07-28T22:15:32.153Z",
     "method":"GET","url":"/v5/nsearch/properties",
     "status":"200","response_time":"7.731",
     "user_agent":"PostmanRuntime/7.26.1"
     }
     
#### Running tests ####

    npm test
    
    
    
