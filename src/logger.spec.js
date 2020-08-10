const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const MorganJsonLogger = require('./index');

describe('Test morgan nodeJS logger', () => {

  it('should allow ability to initialize with one skip URL', async () => {
    const healthUrl = '/v5/test-app/management/health';
    let skipUrlList = [
      healthUrl
    ];

    let morgan = {};

    let morganJsonLogger = new MorganJsonLogger('test-app', morgan, skipUrlList);
    let skipFn = morganJsonLogger.getSkip();

    // test app name
    morganJsonLogger.getAppName().should.equal('test-app');

    // matching Url

    let req = {};
    req.baseUrl = healthUrl;
    skipFn.skip(req).should.equal(true);

    // not matching Url

    let badreq = {};
    badreq.baseUrl = '/v5/test-app/management/not-health';
    skipFn.skip(badreq).should.equal(false);

  });

  it('should allow ability to initialize with multiple skip URLs', async () => {
    const healthUrl = '/v5/test-app/management/health';
    const propertiesUrl = '/v5/test-app/properties';
    let skipUrlList = [ healthUrl, propertiesUrl];
    let morgan = {};
    let morganJsonLogger = new MorganJsonLogger('test-app', morgan, skipUrlList);
    let skipFn = morganJsonLogger.getSkip();

    // matching Url

    let req = {};
    req.baseUrl = healthUrl;
    skipFn.skip(req).should.equal(true);

    // not matching Url

    let badreq = {};
    badreq.baseUrl = '/v5/test-app/management/not-health';
    skipFn.skip(badreq).should.equal(false);
  });

  it('should allow override of default log values', async () => {

    const overridValues =  {
      url: ':url',
      status: ':status'
    }

    let morgan = {};

    let morganJsonLogger = new MorganJsonLogger('test-app', morgan, null, overridValues);
    let oValuesStr = JSON.stringify(morganJsonLogger.getOverrideValues());
    oValuesStr.should.equal(JSON.stringify(overridValues));
  });
});


