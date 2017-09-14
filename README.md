# DOMify

DOMify is a library that makes things like event handling, document manipulation, and Ajax requests much simpler.

#### Some features include:
* appending/removing content to/from the end of a specified element.
* addClass/removeClass methods for adding/removing a class from a specified element.
* on/off event listeners to handle events such as a click handler for a button
* $d.ajax to handle XmlHttpRequest, or XHR requests.

## Getting Started
The quickest way to get started is to download this library into your project and include the webpack output in your source code.
![](/images/head.png)

## API
$d

Dom Traversal
* children
* parents
* find

DOM Manipulation
* html
* empty
* append
* remove
* attr
* addClass
* removeClass

Event Listeners
* on
* off

$d.ajax


#### $d
`$d` is a global variable used as a wrapper for the DOMify library. It is most commonly used as a selector for HTML elements or their respective classNames and returns a DomNodeCollection object which is an array of HTML elements. `$d` can also be used to create DomNodeCollection objects giving them access to the DOMify library. You can also use `$d` to queue functions to run once the DOM is fully loaded.

The following code is a simple example of an onClick handler being added to the queue, though it is possible to have as many as needed.
![](/images/$d.png)

#### DOM Traversal
`children` returns a DomNodeCollection object of all the direct child elements of each HTML element in the original collection.

`parent` returns a DomNodeCollection object of all the parent elements of each HTML element in the original collection.

`find` returns a DomNodeCollection object containing all the elements that match the given selector.

#### DOM Manipulation
`html` returns the innerHTML for the first element if no argument is given, otherwise it iterates through each element setting the innerHTML equal to the provided argument (string).

`empty` empties the innerHTML for each element in the collection.

`append` takes a single HTML element of=r string and appends it to each DomNodeCollection element.

`remove` removes each DomNodeCollection element from the DOM.

`attr` if one argument is given the method returns the attribute for the first element in the DomNodeCollection, if two arguments are passed the method sets the attribute (first arg) to have a specified value (second arg) for each element in the collection.

`addClass` adds a class to each element in the specified collection.

`removeClass` removes a class from each element in the specified collection

#### Event Listeners
`on` adds an event listener to each element in the specified collection.

`off` removes an event listener from each element in the specified collection.

`$d.ajax` send an HTTP request and returns a promise. Accepts a POJO as an argument with any of the following attributes:
* method
* url
* success
* error
* contentType
* data
* dataType

## Example
For a live example of some key features of this library clone it and view the html file locally in your browser.
