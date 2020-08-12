module.exports = class MorganJsonLogger {
  constructor(appName, morgan, skipUrlList, overrideValues) {
    this.appName = appName;
    this.morgan =  morgan;
    this.skipUrlList = skipUrlList;
    this.overrideValues = overrideValues;
  }

  getMorgan() {
    return this.morgan(this.getOutputFn(), this.getSkip());
  }

  getAppName() {
    return this.appName;
  }

  getSkip() {
    try {
      if (this.skipUrlList) {
        return {
          skip: (req, res) => {
            for (let skipUrl of this.skipUrlList) {
              if (req.baseUrl === skipUrl) return true;
            }
            return false;
          }
        } // end return
      } else {
        return null;
      }

    } catch (err) {
      throw err;
    }
  } // end get Skip List

  getOutputFn() {
    if (this.overrideValues) {
      return outputJSON(this.overrideValues);
    } else {
      return outputJSON(defaultValues);
    }
  }

  getOverrideValues() {
    return this.overrideValues;
  }
} // end class

const defaultValues =  {
  date: ':date[iso]',
  method: ':method',
  url: ':url',
  status: ':status',
  response_time: ':response-time',
  user_agent: ':user-agent'
}

const outputJSON = (obj) => {
  try {
    var keys = Object.keys(obj);
    var token = /^:([-\w]{2,})(?:\[([^\]]+)\])?$/;

    return function (tokens, req, res) {
      var data = {};
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = token.exec(obj[key]);
        let methodVal = null;
        if (tokens[val[1]]) {
          methodVal = tokens[val[1]](req, res, val[2]);
        }
        data[key] = val !== null ? methodVal : obj[key];
      }
      console.log(JSON.stringify(data));
    }
  } catch (err) {
    throw err;
  }
}
