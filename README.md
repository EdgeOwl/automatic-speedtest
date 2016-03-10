# Automatic Speed Test

Automates the running of an internet speed test every X minutes, logging results
to a CSV file.

This tool makes use of [http://speedtest.net/](speedtest.net) and the [speed-test](https://github.com/sindresorhus/speed-test) CLI tool

## Installation

Download the latest version from the __Releases__ page.

Run `npm install`

Invoke speedtest.js from node, optionally passing it a path to write the results to,
and the period between tests in minutes.

## Usage

```
Usage: node speedtest.js [Results Path] [Delay in minutes]
```

By default, the results path is results.csv in the current working directory,
and the delay is 15 minutes between each test.
