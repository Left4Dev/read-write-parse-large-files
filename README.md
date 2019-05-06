# read-write-parse-large-files

### Goal:
Example of writing and reading of large files.
Also to implement it with ES6 and Promises but without an additional framework.

This example is useful when you are trying to implement a read function with createReadStream that works for very large files and you are getting 

```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

for files bigger than 500mb.

It calculates the Median of a large file that contains a large number of integer values seperated by ",\n".

### Instructions:
```
npm start
```
Runs the example. It generates a large file in the current folder, reads it and calculates the Median of all numbers.

```
npm build
```
Generates a cli file for Linux, MacOS and Windows.

      
cli-usage:

```
median <filename> <count> <debug-mode>

filename - name for the db to be created
count - number of random numbers to be generated
debug - enables tests and disables writing of <filename> (db)
```

License: MIT