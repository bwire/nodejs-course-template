## my_caesar_cli 

my_caesar_cli is a simple cli tool that encodes and decodes a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

To launch the program just type: 
```bash
node my_caesar_cli 
```
and provide the necessary arguments.

The tool accepts 4 arguments (short alias and full name):

1.  **-s, --shift**: a shift (required)
2.  **-i, --input**: an input file (optional)
3.  **-o, --output**: an output file (optional)
4.  **-a, --action**: an action encode/decode (required)

If any optional argument (arguments) are not provided then the reading (writing) occurs form the standard input (putput) stream.

Examples:

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node my_caesar_cli -a decodeV -s 2  
```
