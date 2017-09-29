import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  
  let component: ToolbarComponent;

  beforeEach(() => {
    component = new ToolbarComponent();
  });

  it('should update the selected sort property and emit an event with the that property value', () => {
    let sortProperty = 'description';
    let spy = spyOn(component.selectedSortPropChange, 'emit');

    component.onSelectSortProp(sortProperty);

    expect(component.selectedSortProp).toBe(sortProperty);
    expect(spy).toHaveBeenCalledWith(sortProperty);
  });

});
