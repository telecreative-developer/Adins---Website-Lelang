import React, { Component } from "react";
import { Grid, Row, Col, ProgressBar } from "react-bootstrap";
import {
  Icon,
  Divider,
  Input,
  Select,
  Form,
  Pagination,
  Button,
  // Menu,
  Spin
} from "antd";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
// import { dataAdins } from "../AllData/DataCard";
import {
  CardCarousel,
  JadwalLelang,
  SearchLelang,
  // ContentTab
} from "../Components/Card";
import { Banner } from "../Components/Partial";
// import Map from "../Components/Map";
import { connect } from "react-redux";
import { fetchScheduleCar, fetchScheduleMot } from "../../actions/getSchedule";
import { fetchBrand } from "../../actions/getBrand";
import {
  fetchProductRecomended,
  fetchProductGradeB,
  fetchProductAll,
  fetchProductByEvent,
  fetchProductDetail
} from "../../actions/getProduct";
import { fetchAdmFee } from "../../actions/getAdmFee";
import { fetchMerek, fetchModel, fetchTipe, fetchMerekWithColor, fetchModelWithColor, fetchTipeWithColor } from "../../actions/searchProduct";
import { login, cekToken } from "../../actions/login";
// const SubMenu = Menu.SubMenu;

const FormItem = Form.Item;
const Option = Select.Option;

const paginate = (array, page_size, page_number) => {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
};

class Index extends Component {
  constructor() {
    super();

    this.state = {
      merk: "",
      model: "",
      tipe: "",
      warna: "",
      session: {},
      loading: true,
      progress: 0,
      resultSearch: "Not Yet Search",
      pageSize: 2,
      current: 1
    };
  }

  onChange = page => {
    this.setState({
      current: page
    });
  };

  async componentDidMount() {
    await this.props.login("TELECREATIVE", "01042018");
    await this.setState({ progress: 15 });
    const session = JSON.parse(localStorage.getItem("session"));
    await this.setState({ session });
    await this.setState({ progress: 30 });
    await this.props.cekToken(
      session.tokenId,
      session.RoleCode,
      session.officeCode
    );
    await this.setState({ progress: 45 });
    await this.props.fetchScheduleCar(session.tokenId);
    await this.setState({ progress: 60 });
    await this.props.fetchScheduleMot(session.tokenId);
    await this.props.fetchProductAll(session.tokenId);
    await this.setState({ progress: 75 });
    await this.props.fetchBrand(session.tokenId);
    await this.setState({ progress: 80 });
    await this.props.fetchProductRecomended(session.tokenId);
    if(this.props.receivedproductrecomend !== null){
      await this.props.fetchProductGradeB(session.tokenId);
    }
    await this.getImageRecomend(
      this.props.receivedproductrecomend.map(
        data => data.AuctionLot.AuctionLotId
      )
    );
    await this.setState({ progress: 95 });
    await this.props.fetchAdmFee(session.tokenId);
    await this.setState({ loading: false });
  }

  async getImageRecomend(lotId) {
    for (let i = 0; i < lotId.length; i++) {
      this.props.fetchProductDetail(this.state.session.tokenId, lotId[i]);
    }
  }

  async handleSearch() {
    const { session, merk, model, tipe, warna } = this.state;
    if (merk !== "" && model !== "" && tipe !== "" && warna !== "") {
      await this.props.fetchTipeWithColor(session.tokenId, merk, model, tipe, warna);
    } else if (merk !== "" && model !== "" && tipe === "" && warna !== "") {
      await this.props.fetchModelWithColor(session.tokenId, merk, model, warna);
    } else if (merk !== "" && model === "" && tipe === "" && warna !== "") {
      await this.props.fetchMerekWithColor(session.tokenId, merk, warna);
    } else if (merk !== "" && model !== "" && tipe !== "" && warna === "") {
      await this.props.fetchTipe(session.tokenId, merk, model, tipe);
    } else if (merk !== "" && model !== "" && tipe === "" && warna === "") {
      await this.props.fetchModel(session.tokenId, merk, model);
    } else if (merk !== "" && model === "" && tipe === "" && warna === "") {
      await this.props.fetchMerek(session.tokenId, merk);
    }
    await this.setState({ resultSearch: this.props.receivedsearchproduct });
  }

  static defaultProps = {
    center: { lat: -6.197027, lng: 106.9793295 },
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

    return this.state.loading ? (
      <div
        style={{
          marginLeft: "20%",
          paddingTop: "18%",
          marginBottom: "15%",
          width: "60%",
          justifyContent: "center"
        }}
      >
        <center>
          <ProgressBar
            active
            striped
            bsStyle="info"
            now={this.state.progress}
            style={{ justifyContent: "center" }}
          />
        </center>
      </div>
    ) : this.props.receivedproductrecomend === [] ? (
      <div style={{ paddingTop: 100 }}>
        <ProgressBar striped bsStyle="info" now={100} />
      </div>
    ) : (
      <div>
        <Banner />
        <Grid className="wrap-cardCarousel">
          <Row>
            <p className="titleHeader"> REKOMENDASI</p>
            <AliceCarousel
              duration={400}
              autoPlay={true}
              infinite={false}
              startIndex={0}
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
                  <Col xs={12} md={this.props.receivedproductrecomend.length === 1 ? 4 : this.props.receivedproductrecomend.length === 2 ? 8 : 12} lg={this.props.receivedproductrecomend.length === 1 ? 4 : this.props.receivedproductrecomend.length === 2 ? 10 : 12} lgOffset={this.props.receivedproductrecomend.length === 2 ? 1 : 0} >
                    <CardCarousel
                      key={data.UnitKeyFinder}
                      nameBrand={data.UnitName}
                      image={data.ImageUri}
                      merek={data.AuctionLotUnitSpecs[0].SpecValue}
                      model={data.AuctionLotUnitSpecs[1].SpecValue}
                      tipe={data.AuctionLotUnitSpecs[2].SpecValue}
                      no_pol={data.AuctionLotUnitSpecs[3].SpecValue}
                      color={data.AuctionLotUnitSpecs[11].SpecValue}
                      price={data.AuctionLot.FinalBasePrice}
                      number={data.number}
                      name={data.UnitName}
                      year={data.AuctionLotUnitSpecs[4].SpecValue}
                      km={data.AuctionLotUnitSpecs[12].SpecValue}
                      grade={data.UnitGrade}
                      lotNumber={data.AuctionLot.AuctionLotNumber}
                      lotId={data.AuctionLot.AuctionLotId}
                      data={data}
                    />
                  </Col>
                ))}
            </AliceCarousel>
          </Row>
        </Grid>
        <Grid className="wrap-cardCarouselMobile">
        <Row>
            <p className="titleHeader"> REKOMENDASI</p>
            <AliceCarousel
              duration={400}
              autoPlay={true}
              infinite={false}
              startIndex={0}
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
                  <Col xs={12} md={this.props.receivedproductrecomend.length === 1 ? 4 : this.props.receivedproductrecomend.length === 2 ? 8 : 12} lg={this.props.receivedproductrecomend.length === 1 ? 4 : this.props.receivedproductrecomend.length === 2 ? 10 : 12} lgOffset={this.props.receivedproductrecomend.length === 2 ? 1 : 0} >
                    <CardCarousel
                      key={data.UnitKeyFinder}
                      nameBrand={data.UnitName}
                      image={data.ImageUri}
                      merek={data.AuctionLotUnitSpecs[0].SpecValue}
                      model={data.AuctionLotUnitSpecs[1].SpecValue}
                      tipe={data.AuctionLotUnitSpecs[2].SpecValue}
                      no_pol={data.AuctionLotUnitSpecs[3].SpecValue}
                      color={data.AuctionLotUnitSpecs[11].SpecValue}
                      price={data.AuctionLot.FinalBasePrice}
                      number={data.number}
                      name={data.UnitName}
                      year={data.AuctionLotUnitSpecs[4].SpecValue}
                      km={data.AuctionLotUnitSpecs[12].SpecValue}
                      grade={data.UnitGrade}
                      lotNumber={data.AuctionLot.AuctionLotNumber}
                      lotId={data.AuctionLot.AuctionLotId}
                      data={data}
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
                  <p> Jenis Kendaraan</p>
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
                    <Option value="mobil">Mobil</Option>
                  </Select>
                </Col>
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
              </Row>
              <Row style={{ paddingTop: 10 }}>
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
                    {this.state.merk === "" ? (
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
                <Col md={6}>
                  <p> Tipe </p>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={value => this.setState({ tipe: value })}
                  >
                    {this.state.model === "" ? (
                      <Option value="select" disabled>
                        Please Select Tipe
                      </Option>
                    ) : (
                      this.props.receivedbrand
                        .filter(merk => merk.value === this.state.merk)
                        .map(merk =>
                          merk.models
                            .filter(model => model.value === this.state.model)
                            .map(model =>
                              model.tipes.map(tipe => (
                                <Option value={tipe.value} key={tipe.id}>
                                  {tipe.value}
                                </Option>
                              ))
                            )
                        )
                    )}
                  </Select>
                </Col>
              </Row>
              <Row style={{ paddingTop: 10 }}>
                <Col md={6}>
                  <p> Tahun </p>
                  <Input width="100%" />
                </Col>
                <Col md={6}>
                  <p> warna </p>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={value => this.setState({ warna: value })}
                  >
                    <Option value="merah">MERAH</Option>
                    <Option value="putih">PUTIH</Option>
                    <Option value="abu-abu">ABU - ABU</Option>
                    <Option value="hitam">HITAM</Option>
                    <Option value="biru">BIRU</Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormItem>
                    {this.state.merk === "" ? (
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
                        onClick={() => this.handleSearch()}
                      >
                        CARI
                      </Button>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col md={1} />
            {this.state.resultSearch === "Not Yet Search" ? 
              <Col md={6}>
                <Row id="hasilPencarian">
                  <p style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {" "}
                    Produk yang mungkin disukai{" "}
                  </p>
                  {paginate(
                    this.props.receivedproductall,
                    this.state.pageSize,
                    this.state.current
                  )
                    .slice(0, 10)
                    .map((data, Index) => (
                      <Col md={12} key={data.UnitKeyFinder}>
                        <SearchLelang
                          number={"1"}
                          name={data.UnitName}
                          police={data.AuctionLotUnitSpecs[3].SpecValue}
                          price={data.AuctionLot.FinalBasePrice}
                          year={data.AuctionLotUnitSpecs[4].SpecValue}
                          type={data.AuctionLotUnitSpecs[2].SpecValue}
                          image={data.ImageUri}
                          data={data}
                          merek={data.AuctionLotUnitSpecs[0].SpecValue}
                          model={data.AuctionLotUnitSpecs[1].SpecValue}
                          tipe={data.AuctionLotUnitSpecs[2].SpecValue}
                          warna={data.AuctionLotUnitSpecs[11].SpecValue}
                          km={data.AuctionLotUnitSpecs[12].SpecValue}
                          grade={data.UnitGrade}
                          lotNumber={data.AuctionLot.AuctionLotNumber}
                          lotId={data.AuctionLot.AuctionLotId}
                        />
                      </Col>
                    ))}
                </Row>
                <Row>
                  <Col xs={1} md={3} />
                  <Col xs={10} md={7}>
                    <Pagination
                      defaultCurrent={1}
                      pageSize={this.state.pageSize}
                      total={this.props.receivedproductrecomend.length}
                      current={this.state.current}
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col xs={1} md={3} />
                </Row>
              </Col>
             : this.state.resultSearch != '' ?
              <Col md={6}>
                <Row id="hasilPencarian">
                  <p style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {" "}
                    Hasil Pencarian{" "}
                  </p>
                  {paginate(
                    this.state.resultSearch,
                    this.state.pageSize,
                    this.state.current
                  ).map((data, index) => (
                    <Col md={12} key={data.UnitKeyFinder}>
                      <SearchLelang
                        number={data.number}
                        name={data.UnitName}
                        police={data.AuctionLotUnitSpecs[3].SpecValue}
                        price={data.AuctionLot.FinalBasePrice}
                        year={data.AuctionLotUnitSpecs[4].SpecValue}
                        type={data.AuctionLotUnitSpecs[2].SpecValue}
                        image={data.ImageUri}
                        lotId={data.AuctionLot.AuctionLotId}
                        data={data}
                        merek={data.AuctionLotUnitSpecs[0].SpecValue}
                        model={data.AuctionLotUnitSpecs[1].SpecValue}
                        tipe={data.AuctionLotUnitSpecs[2].SpecValue}
                        warna={data.AuctionLotUnitSpecs[11].SpecValue}
                        km={data.AuctionLotUnitSpecs[12].SpecValue}
                        grade={data.UnitGrade}
                        lotNumber={data.AuctionLot.AuctionLotNumber}
                      />
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col xs={1} md={3} />
                  <Col xs={10} md={7}>
                    <Pagination
                      defaultCurrent={1}
                      pageSize={this.state.pageSize}
                      total={this.props.receivedsearchproduct.length}
                      current={this.state.current}
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col xs={1} md={3} />
                </Row>
              </Col>
              :
              <Col md={6}>
                <Row id="hasilPencarian">
                  <p style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {" "}
                    Hasil Pencarian{" "}
                  </p>
                </Row>
                <Row>
                  <Col xs={1} md={2} />
                  <Col xs={10} md={8}>
                <p style={{ fontWeight: "bold", marginTop: 10,  }}>
                mohon maaf untuk kendaraan masih belum tersedia. Daftarkan diri Anda{" "}
                <NavLink
                  to="https://lelang.legoas.co.id/Auction/Bidder/Register"
                  target="_blank"
                >
                  disini
                </NavLink>
                </p>
                  </Col>
                  <Col xs={1} md={2} />
                </Row>
              </Col>
            }
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
                    {this.props.schedulecar === [] ? (
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
                            houseName={data.auctionHouseName}
                            houseAddress={data.auctionHouseAddress}
                            eventId={data.auctionEventId}
                            admfee={this.props.receivedadmfee.CAR}
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.6263097029314!2d106.9802200539126!3d-6.196873185633912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b937f68c20d%3A0xda5b15b4bf92449c!2skantor+pt.Digital+sarana+legoas!5e0!3m2!1sen!2sid!4v1531283557410" title="map" style={{marginLeft:"10%", width:"80%", height:600}} frameborder="0" allowfullscreen></iframe>
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
  receivedproductall: state.receivedproductall,
  receivedproductbyevent: state.receivedproductbyevent,
  receivedproductdetail: state.receivedproductdetail,
  receivedsearchproduct: state.receivedsearchproduct,
  receivedimageeveryproduct: state.receivedimageeveryproduct,
  sessionPersistance: state.sessionPersistance,
  resultCekToken: state.resultCekToken,
  receivedadmfee: state.receivedadmfee
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
  fetchProductRecomended: tokenId => dispatch(fetchProductRecomended(tokenId)),
  fetchProductGradeB: tokenId => dispatch(fetchProductGradeB(tokenId)),
  fetchProductAll: tokenId => dispatch(fetchProductAll(tokenId)),
  fetchProductByEvent: (tokenId, eventId) =>
    dispatch(fetchProductByEvent(tokenId, eventId)),
  fetchProductDetail: (tokenId, lotId) =>
    dispatch(fetchProductDetail(tokenId, lotId)),
  fetchMerekWithColor: (tokenId, merek, warna) => dispatch(fetchMerekWithColor(tokenId, merek, warna)),
  fetchModelWithColor: (tokenId, merek, model, warna) =>
    dispatch(fetchModelWithColor(tokenId, merek, model, warna)),
  fetchTipeWithColor: (tokenId, merek, model, tipe, warna) =>
    dispatch(fetchTipeWithColor(tokenId, merek, model, tipe, warna)),
  fetchMerek: (tokenId, merek) => dispatch(fetchMerek(tokenId, merek)),
  fetchModel: (tokenId, merek, model) =>
    dispatch(fetchModel(tokenId, merek, model)),
  fetchTipe: (tokenId, merek, model, tipe) =>
    dispatch(fetchTipe(tokenId, merek, model, tipe)),
  fetchScheduleCar: tokenId => dispatch(fetchScheduleCar(tokenId)),
  fetchScheduleMot: tokenId => dispatch(fetchScheduleMot(tokenId)),
  fetchBrand: tokenId => dispatch(fetchBrand(tokenId)),
  cekToken: (token, officeCode, roleCode) =>
    dispatch(cekToken(token, officeCode, roleCode)),
  fetchAdmFee: tokenId => dispatch(fetchAdmFee(tokenId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
