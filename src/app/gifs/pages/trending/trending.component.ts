import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScorllSateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html'
})
export default class TrendingComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScorllSateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll( event: Event ) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight });
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    console.log({scrollTop});
    this.scrollStateService.trendingScrollState.set(scrollTop);
    console.log({scrollStateService: this.scrollStateService.trendingScrollState()});


    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }

  }
}
