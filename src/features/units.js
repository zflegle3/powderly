//C to F
export const cToF = (degCIn) => {
    let degFOut = (degCIn*9/5) +32;
    return(degFOut.toFixed(1));
};

//KPH to MPH
export const kphToMph = (kphIn) => {
    let mphOut = kphIn*0.621371;
    return(mphOut.toFixed(1));
};

//CM to IN
export const cmToIn = (cmIn) => {
    let inOut = cmIn/44.704;
    return(inOut.toFixed(1));
}