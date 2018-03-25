// import {assert} from 'assert';
import { ok } from 'assert'
import { Code } from '../src/Code';

describe('Code tests', () => {
    var code: Code;

    beforeEach(() => {
        code = new Code();
    });

    it('generate dest', () => {       

        ok(code.dest("") == "000");
        ok(code.dest("M") == "001");
        ok(code.dest("D") == "010");
        ok(code.dest("MD") == "011");
        ok(code.dest("A") == "100");
        ok(code.dest("AM") == "101");
        ok(code.dest("AD") == "110");
        ok(code.dest("AMD") == "111");
    });

    it('generate jump', () => {
        ok(code.jump("") == "000");
        ok(code.jump("JGT") == "001");
        ok(code.jump("JEQ") == "010");
        ok(code.jump("JGE") == "011");
        ok(code.jump("JLT") == "100");
        ok(code.jump("JNE") == "101");
        ok(code.jump("JLE") == "110");
        ok(code.jump("JMP") == "111");
    });

    it('generate comp', () => {
        ok(code.comp("0")   == "0101010", "1)");
        ok(code.comp("1")   == "0111111", "2)");
        ok(code.comp("-1")  == "0111010", "3)");
        ok(code.comp("D")   == "0001100", "4)");
        ok(code.comp("A")   == "0110000", "5)");
        ok(code.comp("M")   == "1110000", "6)");
        ok(code.comp("!D")  == "0001101", "7)");
        ok(code.comp("!A")  == "0110001", "8)");
        ok(code.comp("!M")  == "1110001", "9)");
        ok(code.comp("-D")  == "0001111", "10)");
        ok(code.comp("-A")  == "0110011", "11)");
        ok(code.comp("-M")  == "1110011", "12)");
        ok(code.comp("D+1") == "0011111", "13)");
        ok(code.comp("A+1") == "0110111", "14)");
        ok(code.comp("M+1") == "1110111", "15)");
        ok(code.comp("D-1") == "0001110", "16)");
        ok(code.comp("A-1") == "0110010", "17)");
        ok(code.comp("M-1") == "1110010", "18)");
        ok(code.comp("D+A") == "0000010", "19)");
        ok(code.comp("D+M") == "1000010", "20)");
        ok(code.comp("D-A") == "0010011", "21)");
        ok(code.comp("D-M") == "1010011", "22)");
        ok(code.comp("A-D") == "0000111", "23)");
        ok(code.comp("M-D") == "1000111", "24)");
        ok(code.comp("D&A") == "0000000", "25)");
        ok(code.comp("D&M") == "1000000", "26)");
        ok(code.comp("D|A") == "0010101", "27)");
        ok(code.comp("D|M") == "1010101", "28)");

    });
});