// import {assert} from 'assert';
import { ok } from 'assert'
import { Code } from '../src/Code';

describe('Code tests', () => {
    var code: Code;

    beforeEach(() => {
        code = new Code();
    });

    it('generate dest', () => {       

        ok(code.dest(null) == "000");
        ok(code.dest("M") == "001");
        ok(code.dest("D") == "010");
        ok(code.dest("MD") == "011");
        ok(code.dest("A") == "100");
        ok(code.dest("AM") == "101");
        ok(code.dest("AD") == "110");
        ok(code.dest("AMD") == "111");
    });

    it('generate jump', () => {
        ok(code.jump(null) == "000");
        ok(code.jump("JGT") == "001");
        ok(code.jump("JEQ") == "010");
        ok(code.jump("JGE") == "011");
        ok(code.jump("JLT") == "100");
        ok(code.jump("JNE") == "101");
        ok(code.jump("JLE") == "110");
        ok(code.jump("JMP") == "111");
    });

    it('generate comp', () => {
        ok(code.comp("0") == "0101010");
    });
});