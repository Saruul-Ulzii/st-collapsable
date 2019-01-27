# st-collapsable

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)


## What is it?
st-collapsable is a web component built with [Stencil](https://stenciljs.com/) that makes any html content collpasable. It works in pretty much same way as [BS collpsable](https://www.w3schools.com/bootstrap/bootstrap_collapse.asp) tough it has some extensions.  


## Usage
To use this component in your app, no matter what framework you are using, follow these steps:

- pop this script tag `<script async defer src='https://unpkg.com/st-collapsable@0.1.1/dist/stcollapsable.js'></script>` into your index.html
- define your collapsable content:
``` 
  <st-collapsable collapsed="false" collapsable-id="collapsable-test">
    <div>My collapsable html content</div>
  </st-collapsable>
```
- define triggers for your collapsable content (it is crucial that your trigger has class St-Collapsable__trigger and points to id of collapsable content with st-collapsable-trigger):
``` 
  <button class="St-Collapsable__trigger" st-collapsable-trigger="collapsable-test">trigger</button>
  <span class="St-Collapsable__trigger" st-collapsable-trigger="collapsable-test">trigger</span>
  <a class="St-Collapsable__trigger" st-collapsable-trigger="collapsable-test">trigger</a>
```   

## API
Properties:

- collapsable-id (string): id of your collapsable content. It is used when registering triggers for your collapsable content
- collapsed (string): decides if html content is collapsed at the begining. true by default

## Examples

``` 
  <button class="St-Collapsable__trigger" st-collapsable-trigger="collapsable-test">trigger</button>

  <st-collapsable collapsed="false" collapsable-id="collapsable-test">
    <div>My collapsable html content</div>
  </st-collapsable>

```
