import { Component, Input, ElementRef, OnInit, OnChanges } from '@angular/core';
import * as D3 from 'd3';
import * as Moment from 'moment';

import style from "./chart.component.scss";

@Component({
    selector: 'area-chart',
    template: '<ng-content></ng-content>',
    styles: [style]
})
export class AreaChart implements OnChanges, OnInit {
    @Input() config: Array<number>;

    private host;
    private htmlElement: HTMLElement;


    constructor(private element: ElementRef) {
        this.htmlElement = this.element.nativeElement;
        this.host = D3.select(this.element.nativeElement);
    }

    ngOnChanges(): void {
        if (!this.config || this.config.length === 0) return;
        this.build();
    }

    ngOnInit() {
        this.build();
    }



    private build(): void {
        //var data = D3.range(1000).map(D3.randomLogNormal(Math.log(30), .4));
        var data = [
            Moment('2017-01-07 08:00').toDate(),
            Moment('2017-01-07 10:00').toDate(),
            Moment('2017-01-07 12:00').toDate(),
            Moment('2017-01-07 18:00').toDate(),
        ]

        var transformedDate = data.map(function(d) { return Moment('2000-01-01 00:00').add(d.getHours(), 'hours').toDate(); });



        var startDate = Moment('2000-01-01 00:00').toDate();
        var endDate = Moment('2000-01-01 23:59').toDate();

        var margin = { top: 10, right: 30, bottom: 30, left: 30 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = D3.scaleTime()
            .domain([startDate, endDate])
            .range([0, width]);

        var y = D3.scaleLinear().domain([0, 2]).range([0, height]);

        this.host.html('');
        var svg = this.host.append('svg');

        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "dots")
            .selectAll("path")
            .data(transformedDate)
            .enter().append("path")
            .attr("transform", function(d){ return "translate(" + x(d) + "," + y(1) + ")"})
            .attr("d", D3.symbol().size(40));

    }
}
