# People Fully Vaccinated per Hundred Versus GDP per Capita Grouped by Population Size

https://observablehq.com/@f16ea6bbcc9f4cf7/scatterplot-including-hover-effect-from-the-d3-js-graph-gal/2@229

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/d/c198120b82bda565@229.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@f16ea6bbcc9f4cf7/scatterplot-including-hover-effect-from-the-d3-js-graph-gal/2";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
