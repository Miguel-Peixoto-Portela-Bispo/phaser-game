export default function getIntervalMultiplier(delta: number)
{
    const minDelta = 1000/60;
    
    return delta/minDelta;
}