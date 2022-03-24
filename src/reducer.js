export const initialState = {
  list: [],
  map: null,
  center: [47.498045, 19.0385183],
  selectedPoint: null,
  selectedFilters: [],
  isFilterOn: false,
  locationRequired: false,
  showList: false,
  showFilters: false,
  showPopup: false,
  showMenu: false,
};

export default function mapReducer(state, action) {
  switch (action.type) {
    case 'SetMap':
      return {
        ...state,
        map: action.map
      };
    case 'SetList':
      return {
        ...state,
        list: action.list
      };
    case 'SetCenter':
      return {
        ...state,
        center: action.center
      };
    case 'SetCategories':
      return {
        ...state,
        selectedFilters: action.selectedFilters
      };
    case 'SetSelectedPoint':
      return {
        ...state,
        selectedPoint: action.point
      };
    case 'ToggleList':
      return {
        ...state,
        showList: action.showList
      };
    case 'ToggleFilters':
      return {
        ...state,
        showFilters: action.showFilters
      };
    case 'TogglePopup':
      return {
        ...state,
        showPopup: action.showPopup
      };
    case 'ToggleMenu':
      return {
        ...state,
        showMenu: action.showMenu
      };
    case 'SetFilterOn':
      return {
        ...state,
        isFilterOn: action.isFilterOn
      };
    case 'SetLocator':
      return {
        ...state,
        locationRequired: true
      };
    default:
      return state;
  }
}
