import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Pagination, Input, Select, DatePicker, Form, Button, Divider } from 'antd'
import { JadwalLelang } from '../Components/Card'
import { DataJadwal } from '../AllData/DataCard'
import GoCalendar from 'react-icons/lib/go/calendar'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

export class Index extends Component {
  
    render() { 
      const { getFieldDecorator } = this.props.form
      const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
      }
      function handleChange(value) {
        console.log(`selected ${value}`);
      }
      
      function handleBlur() {
        console.log('blur');
      }
      
      function handleFocus() {
        console.log('focus');
      }

        return (
            <div className='page-jadwal'>
              <div className='landing-lelang'>
                <Grid>
                  <Row>
                    <Col md={6} className='searchPanel'>
                      <p style={{fontWeight:'bold'}}> CARI MOBIL / MOTOR </p>
                      <Divider/>
                      <Row>
                        <Col md={4}>
                          <h5> Free Keyword</h5>
                          <Input width='100%'/>
                        </Col>
                        <Col md={4}>
                          <h5> Lokasi  </h5>
                          <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="jack">Jakarta Barat</Option>
                            <Option value="lucy">Jakarta Timur</Option>
                            <Option value="tom">Jakarta Utara</Option>
                          </Select>
                        </Col>
                        <Col md={4}>
                          <h5> Merk </h5>
                          <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="jack">Yamaha</Option>
                            <Option value="lucy">Honda</Option>
                            <Option value="tom">Jaguar</Option>
                          </Select>
                        </Col>
                      </Row>
                      <Row style={{paddingTop:10}}>
                        <Col md={6}>
                        <h5> Model </h5>
                          <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="jack">Model A</Option>
                            <Option value="lucy">Model B</Option>
                            <Option value="tom">Model C</Option>
                          </Select>
                        </Col>
                        <Col md={6}>
                          <h5> Warna </h5>
                          <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="jack">Merah</Option>
                            <Option value="lucy">Putih</Option>
                            <Option value="tom">Hitam</Option>
                          </Select>
                        </Col>
                        
                      </Row>
                      <Row style={{paddingTop:10}}>
                        <Col md={5}>
                          <h5> Tahun </h5>
                          <Input width='100%'/>
                        </Col>
                        <Col md={2}>
                          <h5 style={{marginTop:30}}><center>S/d </center></h5>
                        </Col>
                        <Col md={5}>
                          <h5> Tahun </h5>
                          <Input width='100%'/>
                        </Col>
                      </Row>
                      <Row style={{paddingTop:15}}>
                        <Col md={6}>
                          <h5> Transport  </h5>
                          <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="jack">Mobil</Option>
                            <Option value="lucy">Motor</Option>
                          </Select>
                        </Col>
                        <Col md={6}>
                          <FormItem>
                            <h5> Tanggal</h5>
                            {getFieldDecorator('range-picker', rangeConfig)(
                              <RangePicker width='100%'/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormItem>
                            <Button type="primary" htmlType="submit" className='buttonSearch'>CARI</Button>
                          </FormItem>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col xs={12} md={12}>
                          <p style={{fontWeight:'bold', marginLeft:10}}> Hasil Pencarian </p>
                          <JadwalLelang 
                            transport='Mobil'
                            location='Jakarta'
                            date='20 Januari 2018'
                            time='08.00 - 12:00'
                            openhouse='17-19 Januari 2018'
                          />
                          <JadwalLelang 
                            transport='Motor'
                            location='Bogor'
                            date='30 November 2018'
                            time='10.00 - 14:00'
                            openhouse='26-29 November 2018'
                          />
                          <Row>
                            <Col md={3}/>
                            <Col md={7}>
                              <Pagination defaultCurrent={6} total={50} />
                            </Col>
                            <Col md={3}/>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Grid>

                <Grid style={{paddingTop:'2%'}}>
                  <div className='body-header'>
                    <p><GoCalendar id='date'/> JADWAL LELANG</p>
                    <hr/>
                  </div>
                  <Row>
                  {DataJadwal.map((data, index) => (
                    <Col xs={6} md={6} key={data.key}>
                      
                      <JadwalLelang 
                        transport={data.transport}
                        location={data.location}
                        date={data.date}
                        time={data.time}
                        openhouse={data.openhouse}
                      />
                    </Col>
                  ))}
                  </Row>
                  <Row>
                    <Col xs={12} md={4}/>
                    <Col xs={12} md={4}>
                      <div className='pagination'>
                        <Pagination defaultCurrent={6} total={50} />
                      </div>
                    </Col>
                    <Col xs={12} md={4}/>
                  </Row>
                </Grid>
              </div>
            </div>

        )
    }
}

const WrappedTimeRelatedForm = Form.create()(Index);
export default WrappedTimeRelatedForm