import { EntityType } from "./EntityType"
import { Surface } from "./Surface"

export interface Spot {
  IdSpot: string
  Latitude: number
  Longitude: number
  Elevation: number | null
  Name: string | null
  IsPrivate: boolean | null
  CreatedAt: string | null
  UpdatedAt: string | null 
  DeletedAt: string | null 
  CreatedBy: string | null
  UpdatedBy: string | null 
  DeletedBy: string | null 
  Surfaces: Surface[] | null
  EntityTypes: EntityType[] | null 
}