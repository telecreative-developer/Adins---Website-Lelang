import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import FaQuestion from 'react-icons/lib/fa/cog'

export class Index extends Component {
  render() { 
    return (
      <div className='wrap-pengertianLelangPage'>
        <Grid>
          <Row>
            <Col md={12}>
                <p className='header'><span className='orange'><FaQuestion/></span> Pengertian Lelang </p>
                <hr/>
                <p className='description'> Lelang adalah proses membeli dan menjual barang atau jasa dengan cara menawarkan kepada penawar, menawarkan tawaran harga lebih tinggi. dan kemudian menjual barang kepada penawar harga tertingi, Lelang di indonesia masih tergolong proses yang tidak familiah. produk yang biasa dilakukan lelang adalah kendaraan, properti, dan komoditi. pada dasarnya semua barang dapat dilakukan lelang. ketika ada kebutuhan atas penjualan dengan cepat. atau harga tertingi, atau penjualan dalam skala banyak, maka penjualan melalui lelang adalah cara yang paling tepat</p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
 
export default Index;