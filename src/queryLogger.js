axios = require('axios');

module.exports = class  queryLogger {
  constructor(uriQuery, params) {
    this.uriQuery = uriQuery;
    this.params = params;
    this.startDate = null;
    this.endDate = null;
    this.results = null;
  }

  async get() {
    try {
      this.startDate = new Date();
      [this.results, this.endDate] = await executeQuery(this.uriQuery, this.params);
      return this.results;
    } catch (err) {
      throw err;
    }
  }

  getTimeMS() {
    if (!this.startDate || !this.endDate) {
      throw new Error(`StartDate: ${this.startDate} and EndDate: ${this.endDate} must be initialized!`);
    }
    let duration = this.endDate.getTime() - this.startDate.getTime();
    return duration;
  }

  getTimeFormated() {
    try {
      let duration = this.getTimeMS();
      return this.formatTime(duration);
    } catch (err) {
      throw err;
    }
  }

  formatTime(duration) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;


    let hours, minutes, seconds, ms = null;
    let timeFormat = '';

    if (duration >= HOUR) {
      [hours, duration] = timeFunc(duration, HOUR);
      timeFormat += `${hours}h `;
    }
    if (duration >= MINUTE) {
      [minutes, duration] = timeFunc(duration, MINUTE);
      timeFormat += `${minutes}min `;
    }
    if (duration >= SECOND) {
      [seconds, duration] = timeFunc(duration, SECOND);
      timeFormat += `${seconds}s `;
    }
    ms = duration;
    timeFormat += `${ms}ms`
    return timeFormat;
  }

  getResults() {
    try {
      if (this.results && this.results.data) {
        return this.results.data;
      } else {
        return {};
      }
    } catch (err) {
      throw err;
    }
  }

  logJSON() {
    return {
      uri: this.uriQuery,
      results: this.results.data,
      time: this.getTimeMS(),
      formattedTime: this.getTimeFormated(),
      startTime: this.startDate.toString(),
      endTime: this.endDate.toString()
    };
  }

  log() {
    return JSON.stringify({
      uri: this.uriQuery,
      results: this.results.data,
      time: this.getTimeMS(),
      formattedTime: this.getTimeFormated(),
      startTime: this.startDate.toString(),
      endTime: this.endDate.toString()
    });
  }
}

const executeQuery = async(url, params) => {
  try {
    let results = null;

    if (params) {
      results = await axios({
        url,
        params
      });
    } else {
      results = await axios.get(url);
    }
    const endTime = new Date();
    return [results, endTime];
  } catch (err) {
    throw err;
  }
}

const timeFunc = (duration, SPAN) => {
  let count = Math.floor(duration / SPAN);
  return [count, duration - count * SPAN];
}
