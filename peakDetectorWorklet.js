// javascript port of: https://stackoverflow.com/questions/22583391/peak-signal-detection-in-realtime-timeseries-data/48895639#48895639

function sum(a) {
  return a.reduce((acc, val) => acc + val);
}

function mean(a) {
  return sum(a) / a.length;
}

function stddev(arr) {
  const arr_mean = mean(arr);
  const r = function (acc, val) {
    return acc + (val - arr_mean) * (val - arr_mean);
  };
  return Math.sqrt(arr.reduce(r, 0.0) / arr.length);
}

function smoothed_z_score(y, params) {
  var p = params || {};
  // init cooefficients
  const lag = p.lag || 5;
  const threshold = p.threshold || 3.5;
  const influence = p.influence || 0.5;

  if (y === undefined || y.length < lag + 2) {
    return Array(y.length).fill(0);
  }

  // init variables
  var signals = Array(y.length).fill(0);
  var filteredY = y.slice(0);
  const lead_in = y.slice(0, lag);
  var avgFilter = [];
  avgFilter[lag - 1] = mean(lead_in);
  var stdFilter = [];
  stdFilter[lag - 1] = stddev(lead_in);

  for (var i = lag; i < y.length; i++) {
    if (Math.abs(y[i] - avgFilter[i - 1]) > threshold * stdFilter[i - 1]) {
      if (y[i] > avgFilter[i - 1]) {
        signals[i] = +1; // positive signal
      } else {
        signals[i] = -1; // negative signal
      }
      // make influence lower
      filteredY[i] = influence * y[i] + (1 - influence) * filteredY[i - 1];
    } else {
      signals[i] = 0; // no signal
      filteredY[i] = y[i];
    }

    // adjust the filters
    const y_lag = filteredY.slice(i - lag, i);
    avgFilter[i] = mean(y_lag);
    stdFilter[i] = stddev(y_lag);
  }

  return signals;
}

class PeakDetectionProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    // current sample-frame and time at the moment of instantiation
    // to see values change, you can put these two lines in process method
    this.size = 1024;
    this.intermediate = new Float32Array(this.size);
    this.intermediate.fill(0);
  }
  static get parameterDescriptors() {
    return [
      {
        name: "lag",
        defaultValue: 5,
        minValue: 5,
        maxValue: 128,
      },
      {
        name: "threshold",
        defaultValue: 3.5,
        minValue: 1,
        maxValue: 20,
      },
      {
        name: "influence",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
    ];
  }
  _updateIntermediate(values) {
    // update Intermediate in-place with static array
    for (var i = 0; i < this.size - values.length; i++) {
      this.intermediate[i] = this.intermediate[i + values.length];
    }
    for (var i = 0; i < values.length; i++) {
      this.intermediate[this.size - values.length + i] = values[i];
    }
    return this.intermediate;
  }
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const signals = smoothed_z_score(
      this._updateIntermediate(input[0]),
      parameters.lag[0],
      parameters.threshold[0],
      parameters.influence[0]
    );
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = signals[i];
      }
    });
    return false;
  }
}

registerProcessor("peakDetector", PeakDetectionProcessor);
