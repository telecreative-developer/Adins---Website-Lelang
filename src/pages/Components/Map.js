import React, { Component } from 'react'
import { compose, withProps } from "recompose"
import { Grid, Row, Col } from 'react-bootstrap'
import GoCalendar from 'react-icons/lib/go/calendar'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -6.1596475, lng: 106.8830528 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -6.1596475, lng: 106.8830528 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )
  
export class Map extends Component {    
    state = {
        isMarkerShown: false,
      }
    
      componentDidMount() {
        this.delayedShowMarker()
      }
    
      delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 3000)
      }
    
      handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
      }
    render() { 
        return (
            <div>
                <div className='location-lelang'>
                <Grid>
                  <div className='body-header'>
                    <p><GoCalendar id='date'/> LOKASI LELANG</p>
                    <hr/>
                  </div>
                  <Row>
                    <Col xs={12} md={12}>
                        <MyMapComponent
                          isMarkerShown={this.state.isMarkerShown}
                          onMarkerClick={this.handleMarkerClick}
                      />
                      <div className='wrap-location'>
                        <p className='sub-location'>RND Indonesia - Jakarta </p>
                      </div>
                      <div className='body-location'>
                        <p>Jl. Lorem ipsum No 7 Sudirman</p>
                        <p>Jakarta Selatan, 1340</p>
                        <p>Indonesia</p>
                        <p>(021) 864-0987| +62-859-9870-444 </p>
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </div>

            </div>
        )
    }
}
 
export default Map;