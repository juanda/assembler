import {assert} from 'types-assert/assert';

import { Parser } from './Parser';
import { parse } from 'querystring';

describe('Parser tests', () => {
    var parser;

    beforeEach(() => {
        parser = new Parser();
    });

    it('there are more commands', () => {
        assert(parser.hasMoreCommands(), true);
    });
});