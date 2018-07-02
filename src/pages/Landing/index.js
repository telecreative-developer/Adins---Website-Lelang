import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import {
  Icon,
  Divider,
  Input,
  Select,
  Form,
  Pagination,
  Button,
  Menu,
  Spin
} from "antd";
import { NavLink, Redirect } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import {
  DataCardCarousel,
  DataJadwalMotor,
  DataJadwalMobil,
  DataCardLocation,
  DataContentTab
} from "../AllData/DataCard";
import {
  CardCarousel,
  JadwalLelang,
  SearchLelang,
  ContentTab
} from "../Components/Card";
import { Banner } from "../Components/Partial";
import Map from "../Components/Map";
import { connect } from "react-redux";
import { fetchScheduleCar, fetchScheduleMot } from "../../actions/getSchedule";
import { fetchBrand } from "../../actions/getBrand";
import {
  fetchProductRecomended,
  fetchProductByEvent,
  fetchProductDetail
} from "../../actions/getProduct";
import { login, cekToken } from "../../actions/login";
const SubMenu = Menu.SubMenu;

const FormItem = Form.Item;
const Option = Select.Option;

class Index extends Component {
  constructor() {
    super();

    this.state = {
      merk: "",
      model: "",
      session: {},
      loading: true
    };
  }

  async componentDidMount() {
    await this.props.login("TELECREATIVE", "01042018");
    const session = JSON.parse(localStorage.getItem("session"));
    await this.setState({ session });
    await this.props.cekToken(
      session.tokenId,
      session.RoleCode,
      session.officeCode
    );
    console.log("cek token", this.props.resultCekToken);
    console.log("state session", this.state.session);
    await this.props.fetchProductRecomended(session.tokenId);
    await this.props.fetchScheduleCar(session.tokenId);
    await this.props.fetchScheduleMot(session.tokenId);
    await this.props.fetchBrand(session.tokenId);
    await this.setState({ loading: false });
  }

  static defaultProps = {
    center: { lat: 40.744679, lng: -73.948542 },
    zoom: 11
  };
  render() {
    const responsive = {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1024: {
        items: 3
      }
    };

    return this.state.loading ? null : (
      <div>
        <Banner />
        {console.log(this.props.receivedproductrecomend)}
        {this.props.receivedproductrecomend == [] ? (
          <div>
            <Spin size="large" />
          </div>
        ) : (
          <Grid className="wrap-cardCarousel">
            <Row>
              <p className="titleHeader"> REKOMENDASI MOBIL / MOTOR </p>
              <AliceCarousel
                duration={400}
                autoPlay={true}
                infinite={false}
                startIndex={1}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                responsive={responsive}
                autoPlayInterval={2000}
                autoPlayActionDisabled={true}
                onSlideChange={this.onSlideChange}
                onSlideChanged={this.onSlideChanged}
              >
                {this.props.receivedproductrecomend
                  .slice(0, 10)
                  .map((data, Index) => (
                    <Col xs={12} md={12}>
                      <CardCarousel
                        key={data.UnitKeyFinder}
                        nameBrand={data.UnitName}
                        image={
                          "http://moziru.com/images/lamborghini-clipart-cool-car-19.png"
                        }
                        merek={data.AuctionLotUnitSpecs[0].SpecValue}
                        model={data.AuctionLotUnitSpecs[1].SpecValue}
                        tipe={data.AuctionLotUnitSpecs[2].SpecValue}
                        no_pol={data.AuctionLotUnitSpecs[3].SpecValue}
                        color={data.AuctionLotUnitSpecs[11].SpecValue}
                        price={data.AuctionLot.FinalBasePrice}
                      />
                    </Col>
                  ))}
              </AliceCarousel>
            </Row>
          </Grid>
        )}

        <Grid className="wrap-cardCarouselMobile">
          <Row>
            <AliceCarousel
              duration={400}
              autoPlay={true}
              infinite={false}
              startIndex={1}
              fadeOutAnimation={true}
              mouseDragEnabled={true}
              playButtonEnabled={true}
              responsive={responsive}
              autoPlayInterval={2000}
              autoPlayDirection="rtl"
              autoPlayActionDisabled={true}
              onSlideChange={this.onSlideChange}
              onSlideChanged={this.onSlideChanged}
            >
              {DataCardCarousel.map((data, index) => (
                <Col xs={12} md={12} key={data.key}>
                  <CardCarousel
                    name={data.name}
                    image={data.image}
                    merek={data.merek}
                    model={data.model}
                    tipe={data.tipe}
                    at_mt={data.at_mt}
                    color={data.color}
                    price={data.price}
                    openhouse={data.openhouse}
                  />
                </Col>
              ))}
            </AliceCarousel>
          </Row>
        </Grid>

        {/*
        <Grid>
          <Row>
          <Col md={2}>
            <Menu
              onClick={({item, key}) => this.setState({merek: key})}
              style={{ width: '100%' }}
              defaultOpenKeys={['sub1']}
              selectedKeys = {[this.state.merek]}
              mode="inline">
              <SubMenu onTitleClick={({key}) => this.setState({merek: ''})} key="all" title={<span><span>All</span></span>}>
                <SubMenu key="sub1" title={<span><span>Mobil</span></span>}>
                  <Menu.Item key="Avanza">Avanza</Menu.Item>
                  <Menu.Item key="Toyota">Xenia</Menu.Item>
                </SubMenu>
            </Menu>
          </Col>
          <Col md={10}>
          {this.state.merek === '' ? (
            DataContentTab.map((d, index) => (
              <Col md={4} key={index}>
              <ContentTab
                name={d.name}
                image={d.image}
                merek={d.merek}
                model={d.model}
                tipe={d.tipe}
                at_mt={d.at_mt}
                warna={d.warna}
                price={d.price}
                button={d.button} />
              </Col>
            ))
          ) : (
            DataContentTab.filter(data => data.merek === this.state.merek).map((d, index) => (
              <Col md={4} key={index}>
              <ContentTab
                name={d.name}
                image={d.image}
                merek={d.merek}
                model={d.model}
                tipe={d.tipe}
                at_mt={d.at_mt}
                warna={d.warna}
                price={d.price}
                button={d.button} />
              </Col>
            ))
          )}
          </Col>
          </Row>
        </Grid>*/}

        <Grid style={{ paddingTop: "3%", paddingBottom: "3%" }}>
          <Row>
            <Col md={5} className="searchPanel">
              <p style={{ fontWeight: "bold" }}> CARI MOBIL / MOTOR </p>
              <Divider />
              <Row>
                <Col md={6}>
                  <p> Free Keyword</p>
                  <Input width="100%" />
                </Col>
                <Col md={6}>
                  <p> Lokasi </p>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Jakarta Barat</Option>
                    <Option value="lucy">Jakarta Timur</Option>
                    <Option value="tom">Jakarta Utara</Option>
                  </Select>
                </Col>
              </Row>
              <Row style={{ paddingTop: 10 }}>
                <Col md={6}>
                  <p> Merek </p>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={value => this.setState({ merk: value })}
                  >
                    {this.props.receivedbrand.map(merk => (
                      <Option value={merk.value} key={merk.id}>
                        {merk.value}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col md={6}>
                  <p> Model </p>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={value => this.setState({ model: value })}
                  >
                    {this.state.merk == "" ? (
                      <Option value="select" disabled>
                        Please Select Model
                      </Option>
                    ) : (
                      this.props.receivedbrand
                        .filter(merk => merk.value === this.state.merk)
                        .map(merk =>
                          merk.models.map(model => (
                            <Option value={model.value} key={model.id}>
                              {model.value}
                            </Option>
                          ))
                        )
                    )}
                  </Select>
                </Col>
              </Row>
              <Row style={{ paddingTop: 10 }}>
                <Col md={12}>
                  <p> Tahun </p>
                  <Input width="100%" />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormItem>
                    {this.state.merk === "" && this.state.model === "" ? (
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="buttonSearch"
                        disabled
                      >
                        CARI
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="buttonSearch"
                      >
                        CARI
                      </Button>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col md={1} />
            <Col md={6}>
              <Row id="hasilPencarian">
                <p style={{ fontWeight: "bold", marginLeft: 10 }}>
                  {" "}
                  Hasil Pencarian{" "}
                </p>
                {DataCardLocation.map((data, index) => (
                  <Col md={12} key={data.key}>
                    <SearchLelang
                      number={data.number}
                      name={data.name}
                      police={data.police}
                      pajak={data.pajak}
                      price={data.price}
                      bundle={data.bundle}
                      year={data.year}
                      type={data.type}
                      image={data.image}
                    />
                  </Col>
                ))}
              </Row>
              <Row>
                <Col xs={1} md={3} />
                <Col xs={10} md={7}>
                  <Pagination defaultCurrent={6} total={50} />
                </Col>
                <Col xs={1} md={3} />
              </Row>
            </Col>
          </Row>
        </Grid>

        <div className="landing-lelang">
          <Grid>
            <div className="body-header">
              <p>
                <Icon id="date" type="calendar" /> JADWAL LELANG TERDEKAT
              </p>
              <hr />
            </div>
            <Row>
              <Col xs={12} md={12}>
                <Row>
                  <AliceCarousel
                    duration={400}
                    autoPlay={false}
                    startIndex={1}
                    infinite={false}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    responsive={responsive}
                    autoPlayInterval={2000}
                    autoPlayActionDisabled={true}
                    onSlideChange={this.onSlideChange}
                    onSlideChanged={this.onSlideChanged}
                  >
                    {this.props.schedulecar == [] ? (
                      <div>
                        <Spin size="large" />
                      </div>
                    ) : (
                      this.props.schedulecar.map((data, index) => (
                        <Col xs={12} md={12} key={data.auctionEventId}>
                          <JadwalLelang
                            transport={" MOBIL"}
                            eventCode={data.eventCode}
                            eventNumber={data.eventNumber}
                            location={data.auctionHouseProvince}
                            date={data.eventDate.date}
                            startTime={data.eventDate.startTime}
                            endTime={data.eventDate.endTime}
                            timeZone={data.timezone}
                            openhouse={data.openHouseDate.date}
                          />
                        </Col>
                      ))
                    )}
                  </AliceCarousel>
                </Row>
              </Col>
            </Row>
            <NavLink to="/jadwal">
              <p className="lihatJadwal"> Lihat Semua Jadwal </p>
            </NavLink>
          </Grid>
        </div>

        <div style={{ paddingBottom: "4%" }}>
          <Map />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  schedulecar: state.schedulecar,
  schedulemot: state.schedulemot,
  receivedbrand: state.receivedbrand,
  receivedproductrecomend: state.receivedproductrecomend,
  receivedproductbyevent: state.receivedproductbyevent,
  receivedproductdetail: state.receivedproductdetail,
  sessionPersistance: state.sessionPersistance,
  resultCekToken: state.resultCekToken
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
  fetchProductRecomended: tokenId => dispatch(fetchProductRecomended(tokenId)),
  fetchProductByEvent: (tokenId, eventId) =>
    dispatch(fetchProductByEvent(tokenId, eventId)),
  fetchProductDetail: (tokenId, lotId) =>
    dispatch(fetchProductDetail(tokenId, lotId)),
  fetchScheduleCar: tokenId => dispatch(fetchScheduleCar(tokenId)),
  fetchScheduleMot: tokenId => dispatch(fetchScheduleMot(tokenId)),
  fetchBrand: tokenId => dispatch(fetchBrand(tokenId)),
  cekToken: (token, officeCode, roleCode) =>
    dispatch(cekToken(token, officeCode, roleCode))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
