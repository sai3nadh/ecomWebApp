import { Injectable } from '@angular/core';
import { Observable, map, forkJoin } from 'rxjs';
import { SearchResultsService } from '../search-results/search-results.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  categories = ['Electronics', 'Clothing', 'Books'];

  constructor(private searchService: SearchResultsService) {}

  fetchCategoryData(): Observable<any[]> {
    const requests = this.categories.map(category => this.searchService.search(category).pipe(
      map(data => data.length > 0 ? data[0] : null)  // Adjust based on the structure of your data
    ));
    return forkJoin(requests);
  }
}
