import { ok } from 'assert';
import { Util } from '../src/Util';

describe('Util tests', () => {    

    it('getBinary', () => {
        let util = new Util();
        ok(util.getBinary('12') ==  "000000000001100", util.getBinary('12'));
        ok(util.getBinary('122') == "000000001111010");
        ok(util.getBinary('142') == "000000010001110");
        ok(util.getBinary('54') ==  "000000000110110");
        ok(util.getBinary('234') == "000000011101010");
        ok(util.getBinary('45') ==  "000000000101101");
        ok(util.getBinary('511') == "000000111111111");
        ok(util.getBinary('0') ==   "000000000000000");
        ok(util.getBinary('65') ==  "000000001000001");
        ok(util.getBinary('323') == "000000101000011");
        ok(util.getBinary('16') ==  "000000000010000");


    });
});
