# Angular.DE

Requires Ruby 2.5+

## Build Status
![Build Status](https://github.com/workshops-de/angular.de/workflows/Build%20Jekyll%20and%20Deploy%20to%20Firebase/badge.svg?branch=master)

## Installation

```
bundle install
```

## Running locally

```
$ jekyll s --incremental
```

## Build the dockerfile locally

```
$ docker build -t anguarjs-de .
```

## Shared module

We're using a git submodule to share files like templates, images and themes across all workshops_de portals. Use following command to pull and update the repository including submodule.

```
$ git pull --recurse-submodules
```
