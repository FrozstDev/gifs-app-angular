import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScorllSateService {

  trendingScrollState = signal(0);
}
