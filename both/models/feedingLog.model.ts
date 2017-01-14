import { CollectionObject } from './collection-object.model';

export interface FeedingLog extends CollectionObject{
    time:number,
    owner?: string;
}