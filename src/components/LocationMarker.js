import React ,{useState,useMemo,useRef} from 'react'
import {useMapEvents,Tooltip,Polyline,Marker} from 'react-leaflet'
import L from 'leaflet';
import {connect} from 'react-redux';
import {toggleUserLocated, SetCoords, GetLocData} from '../actions/locations'
import { Button, Paper, Typography } from '@material-ui/core'

const limeOptions = { color: 'red' }

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
function LocationMarker(props) {
    const [position, setPosition] = useState(null)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [LocationConfirmed, setLocConf] = useState(null)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker._latlng)
          setLatitude(marker._latlng.lat)
          setLongitude(marker._latlng.lng)
          props.SetCoords(marker._latlng.lat, marker._latlng.lng)
        }
      },
    }),
    [],
  )
    const map = useMapEvents({
      click() {
          if(!props.UserLocated){
            map.locate()

          }
      },
      locationfound(e) {
        setPosition(e.latlng)
        setLatitude(e.latlng.lat)
        setLongitude(e.latlng.lng)
        console.log(e.latlng)
        props.SetCoords(e.latlng.lat, e.latlng.lng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    const SaveUserPosition = () => {
      props.GetLocData(latitude, longitude)
      setLocConf(true)
    }   
  
    return position === null ? null : (<>
      <Polyline pathOptions={limeOptions} positions={props.locRoute} />
      <Marker eventHandlers={eventHandlers} ref={markerRef} position={position} draggable={LocationConfirmed === false}>
       
        <Tooltip permanent className='marker-tooltip'>
        
          <div style={{padding:'.5em' }}>
                {LocationConfirmed === null
                ? <>
                <Typography>Are you here?</Typography>
                <Button variant='contained' onClick={() => SaveUserPosition()} size='small'>Yes</Button>
                <Button variant='contained' onClick={() => setLocConf(false)} size='small'>No I'm not</Button>
                </>
                :null

                }
            
            {LocationConfirmed === true
            ?<Paper style={{width:'200px', height:'fit-content', padding:'.5em'}}>
              <Typography variant='h5'>{props.neighbourhood}</Typography>
              <Typography  variant='subtitle1'>{props.locDistance + 'km | ' + props.locPrice + 'Birr'}</Typography>
            </Paper>
            :null
          }

            {LocationConfirmed === false
                ?<>
                    <Typography>Drag marker to your position</Typography>
                    <Button variant='contained' fullWidth onClick={() => SaveUserPosition()} size='small'>I am Here</Button>
                </>
                :null
            }
          </div>
        </Tooltip>
      </Marker>
      </>
    )
  }


const mapStateToProps = (state) => ({
    UserLocated: state.locations.UserLocated,
    locPrice:state.locations.locPrice,
    locDistance: state.locations.locDistance,
    locRoute: state.locations.locRoute,
    locInfoFetched: state.locations.locInfoFetched,
    locCreated: state.locations.locCreated
  })
export default connect(mapStateToProps, {toggleUserLocated, SetCoords, GetLocData})(LocationMarker)