import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent, IonList, IonSlides, isPlatform } from '@ionic/angular';
import { ParallaxDirective } from '../directives/parallax.directive';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  data = null;

  opts = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  }

  categorySlidesVisible = false;
  activeCategory = 0;
  @ViewChildren(IonList, { read: ElementRef}) lists: QueryList<ElementRef>;
  listElements: [];
  @ViewChild(IonContent) content: IonContent;


  constructor(private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) { }

	ngOnInit() {
			this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json').subscribe((res: any) => {
				this.data = res;
        console.log(res);
			});
      const headerHeight = isPlatform('ios') ? 44:56;
      this.document.documentElement.style.setProperty('--header-position', `calc(env(safe-area-inset-top) + ${headerHeight}px)`)
    }

	ngAfterViewInit() {
    // this.lists.changes.subscribe( => {
    //   this.listElements = this.lists.toArray();
    // });
  }

  selectCategory(index){
    // const child = this.listElements[index].nativeElement;
    // this.content.scrollToPoint(0, child.offsetTop -120, 1000);
  }

  onScroll(ev){
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 500;
  }
}
