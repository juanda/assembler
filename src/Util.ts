export class Util {
    pad(num: string, size: number): string {
        while (num.length < (size || 2)) { num = "0" + num; }
        return num;
    }

    getBinary(num: string): string {
        let n: number = parseInt(num);
        let b: string = n.toString(2);        

        return this.pad(b, 15);
    }
}