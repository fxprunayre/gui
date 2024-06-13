import { TestBed } from '@angular/core/testing';
import { GComponent } from './g.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'gui' title`, () => {
    const fixture = TestBed.createComponent(GComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gui');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, gui');
  });
});
