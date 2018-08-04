# log helper

## Features
- log formatting, with date, log levels, module name and colors
- log saving with daily file rotate

## Installation
`npm install abr-log --save`

## Usage
```
> const { log } = require("abr-log")("my module name");
> log.info("my name is foo");
[2018-04-19T10:23:08.663Z] info my module name: 	my name is foo
```
and a new line has been added in the subfolder `log/04-19`.
`log.error` messages are also written to `log/error.log`.

## Available loglevels
- `log.info`
- `log.warn`
- `log.error`
- `log.debug`

## Licence
MIT
