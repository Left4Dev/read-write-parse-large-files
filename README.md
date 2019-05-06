# read-write-parse-large-files

### Goal:
Implement an example of writing and reading of large files with ES6 and Promises but without an additional framework.

This example is useful when trying to implement a read function with createReadStream that works for very large files and getting 

```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

for files bigger than 500mb.

The script calculates the median of a large file that contains a large number of integer values seperated by ",\n".
# Requirements:
tested with
nodejs 10.14.2

### Instructions:
```
npm start
```
Runs the example. It generates a large file in the current folder, reads it and calculates the median of all given numbers.

```
npm build
```
Generates a cli file for Linux, MacOS and Windows.

      
cli-usage:

```
median <filename> <count> <debug>

filename - name for the db to be created
count - number of random numbers to be generated
debug - enables tests and disables writing of <filename> (db)
```

License: MIT
