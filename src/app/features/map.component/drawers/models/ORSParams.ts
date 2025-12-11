export class ORSParams{
    public LongitudeStart: number
    public LatitudeStart: number
    public LongitudeEnd: number
    public LatitudeEnd: number

    constructor(longitudeStart: number, latitudeStart: number, longitudeEnd: number, latitudeEnd: number){
        this.LongitudeStart = longitudeStart,
        this.LatitudeStart = latitudeStart,
        this.LongitudeEnd = longitudeEnd,
        this.LatitudeEnd = latitudeEnd
    }
}