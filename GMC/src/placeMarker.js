

export function markers(){
    const N = 30;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: 7 + Math.random() * 30,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        }));
    return gData;

}