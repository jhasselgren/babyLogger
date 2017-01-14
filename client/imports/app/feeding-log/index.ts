import { FeedingLogListComponent} from "./feeding-log-list.component"
import { FeedingLogFormComponent } from './feeding-log-form.component'
import { OrderByPipe } from 'angular-pipes/src/array/order-by.pipe';

export const FEEDING_LOGS_DECLERATIONS = [
    FeedingLogListComponent,
    FeedingLogFormComponent,
    OrderByPipe
];