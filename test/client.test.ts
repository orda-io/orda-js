import { assert } from 'chai';
import { CreateLocalClientConfig } from '../src/config';
import {Client} from '../src/client';
// import Client from './client';

describe("Can create clients", () => {
    it("Should create a client", () => {
        let conf = CreateLocalClientConfig("hello");
        let client = new Client(conf, "hello");
        // client.sendClientRequest();
        console.log(client);
    });
})