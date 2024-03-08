import './../App.css';
import { Component } from 'react';
import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress,geocodeByPlaceId,getLatLng,} from 'react-places-autocomplete';

export class MapContainer extends Component 
{
  constructor(props) 
  {
    super(props);
    this.state = 
    { 
      address: '' ,
      showingInfo:false,
      activeMarker: {},
      selectedPlace: {},
      defaultLoc: {
        lat: 3.1319,
        lng: 101.6841
      }
    };
  }

  onMarkerClick = (props,marker,e) => this.setState({
    selectedPlace : props,
    activeMarker : marker,
    showingInfo : true
  });

  onMapClicked = (props) => {
    if(this.state.showingInfo)
    {
      this.setState({
        showingInfo:false,
        activeMarker:null
      })
    }
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({address});
        this.setState({defaultLoc:latLng});
      })
      .catch(error => console.error('Error', error));
  };

  render() 
  {
    return (

      <div id='maps'>
         <p><h1 className='h1'>GOOGLE MAP</h1></p>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Map google={this.props.google} 
          initialCenter={{
            lat: this.state.defaultLoc.lat,
            lng: this.state.defaultLoc.lng
          }}
          center={{
            lat: this.state.defaultLoc.lat,
            lng: this.state.defaultLoc.lng
          }}
          zoom={15}>
  
          <Marker position={{
            lat: this.state.defaultLoc.lat,
            lng: this.state.defaultLoc.lng
          }}/>

        </Map>
      </div>
      
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDBwdHAdZnMudvcpHJ5RX0YY_Ra_UMuzEA')
})(MapContainer)