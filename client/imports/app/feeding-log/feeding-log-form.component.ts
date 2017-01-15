import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { FeedingLogs } from '../../../../both/collections/feedingLogs.collection'

import template from './feeding-log-form.component.html';


@Component({
    selector: 'feeding-log-form',
    template
})
export class FeedingLogFormComponent {
    addForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {

        var date = {
            year: moment().year(),
            month: moment().month() + 1,
            day: moment().date()
        };
        var time = {
            hour: moment().hour(),
            minute: moment().minute()
        };

        this.addForm = this.formBuilder.group({
            date: [date, Validators.required],
            hour: [time.hour, Validators.required],
            minute: [time.minute, Validators.required]
        });
    }

    addLogging(): void {

        if (!Meteor.userId()) {
            alert('Please log in to add a party');
            return;
        }

        if (this.addForm.valid) {
            var inputYear = this.addForm.value.date.year;
            var inputMonth = this.addForm.value.date.month;
            var inputDay = this.addForm.value.date.day;

            var inputHour = this.addForm.value.hour;
            var inputMinute = this.addForm.value.minute;

            var logDate = moment()
                .year(inputYear)
                .month(inputMonth - 1)
                .date(inputDay)
                .hour(inputHour)
                .minute(inputMinute)
                .valueOf();

            FeedingLogs.insert({ time: logDate, owner: Meteor.userId() });

            var date = {
                year: moment().year(),
                month: moment().month() + 1,
                day: moment().date() + 1
            };
            var time = {
                hour: moment().hour(),
                minute: moment().minute()
            };

            this.addForm.reset({ date: date, hour: time.hour, minute: time.minute});
        }

    }

    addLogEntry(): void {
        FeedingLogs.insert({ time: Date.now() })
    }

}