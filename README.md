# 🐎🎪 Orda-js

---
Orda-js is the Javascript(or Typescript) SDK for [Orda](orda-io/orda) project. Orda project is a multi-device data synchronization platform based on
[MongoDB](https://www.mongodb.com/) (which could be other document databases such
as [CouchBase](https://www.couchbase.com/)). Orda is based on CRDT(conflict-free data types), which enables
operation-based synchronization.

In [this repository](orda-io/orda), we present the Orda Server, and introduce the concept of the Orda project. 

The library size of orda-js is just about 100KB. It works not only in browsers, but also with nodejs. 

One of the example implemented with orda-js. [Orda-JSONEditor](orda-io/orda-jsoneditor) is a sample program. 

## Install

To use Orda-js in your development, you can use npm.    
```shell
$ npm i @orda-io/orda
```


## Development

To develop the orda-js sdk, Orda Server needs to be up and running in advance.
Following [the instructions](https://github.com/orda-io/orda#getting-started), you can run the Orda Server.

```shell
$ git clone https://github.com/orda-io/orda.git
$ npm run gen:openapi  
$ npm run gen:proto-enum 
```

You can build orda-js as follows.

```shell
$ npm build:dev
$ npm build:prod
```

Orda-js can be tested with either karma or mocha. 

```shell
$ npm run test # test with karma 
$ npm run test:mocha # test with mocha 
```

# Contribute to Orda Project

----
We always welcome your participation.


# License

----
Orda-js is licensed under Apache 2.0 License that can be found in the LICENSE file. 
