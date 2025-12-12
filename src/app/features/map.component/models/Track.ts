import { EntityType } from "./EntityType"
import { Surface } from "./Surface"

export interface Track {
    idTrack: string
    distance: number
    ascent: number
    descent: number
    name: string
    isPrivate: boolean
    polyLine: string
    createdAt: string | Date
    updatedAt: string | Date | null
    createdBy: string
    updatedBy: string | null
    surfaces: Surface[]
    entityTypes: EntityType[]
}

export interface TrackToCreate {
    distance: number
    ascent: number
    descent: number
    polyline: string
    name: string | null
    isPrivate: boolean
    surfaces: string | null
    entityTypes: string | null
    createdBy: string
}