import { Component, OnInit } from '@angular/core';
import { NgAddToCalendarService, ICalendarEvent } from '@trademe/ng-add-to-calendar';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit {
  public googleCalendarEventUrl: SafeUrl;
  public newEvent: ICalendarEvent;

  constructor
    (private _addToCalendarService: NgAddToCalendarService,
      private _sanitizer: DomSanitizer
    ) {
    this.newEvent = {
      // Event title
      title: 'My event title',
      // Event start date
      start: new Date('June 15, 2013 19:00'),
      // Event duration (IN MINUTES)
      duration: 120,
      // If an end time is set, this will take precedence over duration (optional)
      end: new Date('June 15, 2013 23:00'),
      // Event Address (optional)
      address: '1 test street, testland',
      // Event Description (optional)
      description: 'An awesome event'
    };
  }

  ngOnInit() {
    // google cal 
    this.googleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
      this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.google, this.newEvent)
    );
  }



}
