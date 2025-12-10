export type PointType = 'start' | 'end'

export interface PointCoords {
    lon: number,
    lat: number
}

export interface RoutePoints {
    start: PointCoords | null
    end: PointCoords | null
}