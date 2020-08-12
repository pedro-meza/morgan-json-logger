const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const { QueryLogger } = require('./index');

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const moxios = require('moxios');


describe('Test query logger', () => {

  it('should convert ms duration to verbose time', async () => {

    let queryUrl = 'http://test';

    const queryLogger = new QueryLogger(queryUrl);
    let msDuration = 987;
    expect(queryLogger.formatTime(msDuration)).to.equal('987ms');

    msDuration += 1000;
    expect(queryLogger.formatTime(msDuration)).to.equal('1s 987ms');

    let fiveMinutes = 5 * MINUTE;
    msDuration += fiveMinutes;
    expect(queryLogger.formatTime(msDuration)).to.equal('5min 1s 987ms');

    let sevenHours = 7 * HOUR;
    msDuration += sevenHours;
    expect(queryLogger.formatTime(msDuration)).to.equal('7h 5min 1s 987ms');
  });

  it('should convert ms duration to verbose time', async () => {

    let queryUrl = 'http://test';

    const queryLogger = new QueryLogger(queryUrl);
    let msDuration = 987;
    expect(queryLogger.formatTime(msDuration)).to.equal('987ms');

    msDuration += 1000;
    expect(queryLogger.formatTime(msDuration)).to.equal('1s 987ms');

    let fiveMinutes = 5 * MINUTE;
    msDuration += fiveMinutes;
    expect(queryLogger.formatTime(msDuration)).to.equal('5min 1s 987ms');

    let sevenHours = 7 * HOUR;
    msDuration += sevenHours;
    expect(queryLogger.formatTime(msDuration)).to.equal('7h 5min 1s 987ms');
  });

  it('should log api given just an uri', async function() {

    let queryUrl = 'http://digitalSmiths';
    let messageObj = {message: 'returned data'};

    moxios.install();

    moxios.stubRequest(queryUrl, {
      status: 200,
      response: {message: 'returned data'}
    })

    const queryLogger = new QueryLogger(queryUrl);
    let getResults = await queryLogger.get();
    expect(getResults.data.message).to.equal(messageObj.message);

    let log = queryLogger.logJSON();
    expect(queryLogger.getResults().message).to.equal(messageObj.message);
    expect(log.uri).to.equal(queryUrl);
    expect(log.results.message).to.equal(messageObj.message);
  });


});
