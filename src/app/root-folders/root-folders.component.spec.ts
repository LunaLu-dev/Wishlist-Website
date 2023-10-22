import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootFoldersComponent } from './root-folders.component';

describe('RootFoldersComponent', () => {
  let component: RootFoldersComponent;
  let fixture: ComponentFixture<RootFoldersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootFoldersComponent]
    });
    fixture = TestBed.createComponent(RootFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
