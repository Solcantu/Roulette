export default function createRNGArray(maxEntrys:number, arrayLength: number) {

    const newRNGArr: number[] = new Array(arrayLength).fill(-1);

    // tslint:disable-next-line: forin
    for (const e in newRNGArr) {

        newRNGArr[e] = RNG(maxEntrys);
        newRNGArr[e] = checkNumber(newRNGArr, e, newRNGArr[e], maxEntrys);

    }

    return newRNGArr;
}

function checkNumber(newRNGArr: number[], e: string, entry:number, maxEntrys: number) {

    newRNGArr.forEach((value, index) => {

        if (index.toString() !== e) {
            if (entry === value) {
                entry = checkNumber(newRNGArr, e, RNG(maxEntrys), maxEntrys);
            }
        }

    });

    return entry;

}

function RNG(maxEntrys:number) {
    return parseInt(Math.floor(Math.random() * maxEntrys).toFixed(0), 10);
}
